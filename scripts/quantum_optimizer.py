"""
Quantum Energy Dispatch Optimizer using Qiskit
Implements QAOA (Quantum Approximate Optimization Algorithm) for renewable energy dispatch
"""

import json
import sys
from qiskit import QuantumCircuit
from qiskit.circuit.library import QAOAAnsatz
from qiskit_algorithms import QAOA
from qiskit_algorithms.optimizers import COBYLA
from qiskit.primitives import Sampler
from qiskit_optimization import QuadraticProgram
from qiskit_optimization.algorithms import MinimumEigenOptimizer
from qiskit_optimization.converters import QuadraticProgramToQubo
import numpy as np


def create_energy_dispatch_problem(solar_gen, wind_gen, demand, storage_charge, storage_capacity):
    """
    Formulate the energy dispatch optimization as a QUBO problem
    
    Decision variables:
    - x0: Use solar energy (0 or 1)
    - x1: Use wind energy (0 or 1)
    - x2: Charge storage (0 or 1)
    - x3: Discharge storage (0 or 1)
    - x4: Curtail excess (0 or 1)
    """
    
    qp = QuadraticProgram('energy_dispatch')
    
    # Binary decision variables
    qp.binary_var('use_solar')
    qp.binary_var('use_wind')
    qp.binary_var('charge_storage')
    qp.binary_var('discharge_storage')
    qp.binary_var('curtail')
    
    total_gen = solar_gen + wind_gen
    surplus = total_gen - demand
    
    # Objective: Minimize cost
    # Cost components: curtailment penalty, storage cycling cost, fossil backup cost
    curtailment_penalty = 5.0
    storage_cost = 2.0
    fossil_cost = 80.0
    
    # Linear coefficients (individual variable costs)
    linear = {}
    linear['use_solar'] = -10.0  # Reward for using solar
    linear['use_wind'] = -10.0   # Reward for using wind
    linear['charge_storage'] = storage_cost
    linear['discharge_storage'] = storage_cost
    linear['curtail'] = curtailment_penalty * abs(surplus)
    
    # Quadratic coefficients (interaction costs)
    quadratic = {}
    # Penalize simultaneous charging and discharging
    quadratic[('charge_storage', 'discharge_storage')] = 100.0
    # Reward using renewables together
    quadratic[('use_solar', 'use_wind')] = -5.0
    
    qp.minimize(linear=linear, quadratic=quadratic)
    
    # Constraints
    # Must meet demand: solar + wind + discharge >= demand
    if surplus < 0:
        # Deficit situation - must discharge or use fossil backup
        qp.linear_constraint(
            linear={'discharge_storage': 1},
            sense='>=',
            rhs=0,
            name='meet_demand'
        )
    
    return qp, surplus


def solve_with_qaoa(qp, reps=2):
    """
    Solve the quadratic program using QAOA
    """
    # Convert to QUBO
    converter = QuadraticProgramToQubo()
    qubo = converter.convert(qp)
    
    # Set up QAOA
    optimizer = COBYLA(maxiter=100)
    sampler = Sampler()
    qaoa = QAOA(sampler=sampler, optimizer=optimizer, reps=reps)
    
    # Solve using quantum optimization
    algorithm = MinimumEigenOptimizer(qaoa)
    result = algorithm.solve(qubo)
    
    return result


def calculate_dispatch_solution(result, solar_gen, wind_gen, demand, storage_charge, storage_capacity, surplus):
    """
    Convert quantum optimization result to dispatch decisions
    """
    # Extract decision variables
    use_solar = result.x[0] if len(result.x) > 0 else 1
    use_wind = result.x[1] if len(result.x) > 1 else 1
    charge_storage = result.x[2] if len(result.x) > 2 else 0
    discharge_storage = result.x[3] if len(result.x) > 3 else 0
    curtail = result.x[4] if len(result.x) > 4 else 0
    
    # Calculate actual energy flows
    total_gen = (solar_gen * use_solar) + (wind_gen * use_wind)
    
    storage_flow = 0
    new_storage_charge = storage_charge
    curtailment = 0
    
    if surplus > 0 and charge_storage:
        # Charge storage with excess
        max_charge = min(surplus, storage_capacity - storage_charge, storage_capacity * 0.25)
        storage_flow = max_charge
        new_storage_charge += max_charge
        curtailment = max(0, surplus - max_charge) if curtail else 0
    elif surplus < 0 and discharge_storage:
        # Discharge storage to meet demand
        deficit = abs(surplus)
        max_discharge = min(deficit, storage_charge, storage_capacity * 0.25)
        storage_flow = -max_discharge
        new_storage_charge -= max_discharge
    
    # Calculate metrics
    delivered_energy = min(total_gen + abs(storage_flow), demand)
    efficiency = (delivered_energy / (total_gen + 0.001)) * 100
    fossil_backup = max(0, demand - delivered_energy)
    
    total_cost = (fossil_backup * 80) + (curtailment * 5) + (abs(storage_flow) * 1.5)
    emissions = fossil_backup * 0.5
    
    return {
        'curtailment': curtailment,
        'storage_flow': storage_flow,
        'new_storage_charge': new_storage_charge,
        'metrics': {
            'totalCost': total_cost,
            'curtailment': curtailment,
            'efficiency': min(efficiency, 100),
            'emissions': emissions,
            'computeTime': 0  # Will be set by caller
        }
    }


def main():
    """
    Main entry point - reads input from stdin, runs quantum optimization, outputs to stdout
    """
    import time
    
    # Read input parameters
    input_data = json.loads(sys.stdin.read())
    
    solar_gen = input_data['solarGen']
    wind_gen = input_data['windGen']
    demand = input_data['demand']
    storage_charge = input_data['storageCharge']
    storage_capacity = input_data['storageCapacity']
    
    start_time = time.time()
    
    try:
        # Create optimization problem
        qp, surplus = create_energy_dispatch_problem(
            solar_gen, wind_gen, demand, storage_charge, storage_capacity
        )
        
        # Solve with QAOA
        result = solve_with_qaoa(qp, reps=2)
        
        # Calculate dispatch solution
        solution = calculate_dispatch_solution(
            result, solar_gen, wind_gen, demand, storage_charge, storage_capacity, surplus
        )
        
        # Add compute time
        compute_time = (time.time() - start_time) * 1000  # Convert to ms
        solution['metrics']['computeTime'] = compute_time
        
        # Output result as JSON
        print(json.dumps(solution))
        
    except Exception as e:
        # Fallback to simple heuristic if quantum fails
        print(json.dumps({
            'error': str(e),
            'fallback': True,
            'curtailment': 0,
            'storage_flow': 0,
            'new_storage_charge': storage_charge,
            'metrics': {
                'totalCost': 0,
                'curtailment': 0,
                'efficiency': 0,
                'emissions': 0,
                'computeTime': 0
            }
        }), file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
