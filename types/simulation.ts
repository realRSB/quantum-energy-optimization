export interface SimulationConfig {
  solarCapacity: number
  windCapacity: number
  storageCapacity: number
  baseDemand: number
  simulationSpeed: number
}

export interface GridState {
  solar: {
    current: number
    capacity: number
  }
  wind: {
    current: number
    capacity: number
  }
  storage: {
    charge: number
    capacity: number
    charging: boolean
    discharging: boolean
    flowRate: number
  }
  demand: number
  curtailment: number
}

export interface OptimizationMetrics {
  totalCost: number
  curtailment: number
  efficiency: number
  emissions: number
  computeTime: number
}
