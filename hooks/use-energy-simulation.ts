"use client"

import { useState, useEffect, useCallback } from "react"
import type { SimulationConfig, GridState, OptimizationMetrics } from "@/types/simulation"
import {
  calculateSolarGeneration,
  calculateWindGeneration,
  calculateDemand,
  optimizeClassical,
  optimizeQuantumQiskit,
} from "@/lib/simulation-engine"

const DEFAULT_CONFIG: SimulationConfig = {
  solarCapacity: 300,
  windCapacity: 250,
  storageCapacity: 200,
  baseDemand: 400,
  simulationSpeed: 2,
}

export function useEnergySimulation() {
  const [isRunning, setIsRunning] = useState(false)
  const [timeOfDay, setTimeOfDay] = useState(6) // Start at 6 AM
  const [config, setConfig] = useState<SimulationConfig>(DEFAULT_CONFIG)
  const [gridState, setGridState] = useState<GridState>({
    solar: { current: 0, capacity: config.solarCapacity },
    wind: { current: 0, capacity: config.windCapacity },
    storage: {
      charge: config.storageCapacity * 0.5,
      capacity: config.storageCapacity,
      charging: false,
      discharging: false,
      flowRate: 0,
    },
    demand: 0,
    curtailment: 0,
  })
  const [classicalMetrics, setClassicalMetrics] = useState<OptimizationMetrics>({
    totalCost: 0,
    curtailment: 0,
    efficiency: 0,
    emissions: 0,
    computeTime: 0,
  })
  const [quantumMetrics, setQuantumMetrics] = useState<OptimizationMetrics>({
    totalCost: 0,
    curtailment: 0,
    efficiency: 0,
    emissions: 0,
    computeTime: 0,
  })

  const updateConfig = useCallback((updates: Partial<SimulationConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }))
  }, [])

  const toggleSimulation = useCallback(() => {
    setIsRunning((prev) => !prev)
  }, [])

  const resetSimulation = useCallback(() => {
    setIsRunning(false)
    setTimeOfDay(6)
    setGridState({
      solar: { current: 0, capacity: config.solarCapacity },
      wind: { current: 0, capacity: config.windCapacity },
      storage: {
        charge: config.storageCapacity * 0.5,
        capacity: config.storageCapacity,
        charging: false,
        discharging: false,
        flowRate: 0,
      },
      demand: 0,
      curtailment: 0,
    })
    setClassicalMetrics({
      totalCost: 0,
      curtailment: 0,
      efficiency: 0,
      emissions: 0,
      computeTime: 0,
    })
    setQuantumMetrics({
      totalCost: 0,
      curtailment: 0,
      efficiency: 0,
      emissions: 0,
      computeTime: 0,
    })
  }, [config])

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setTimeOfDay((prev) => {
        const next = prev + 0.1 * config.simulationSpeed
        return next >= 24 ? 0 : next
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isRunning, config.simulationSpeed])

  useEffect(() => {
    // Calculate generation
    const solarGen = calculateSolarGeneration(timeOfDay, config.solarCapacity)
    const windGen = calculateWindGeneration(timeOfDay, config.windCapacity)
    const demand = calculateDemand(timeOfDay, config.baseDemand)

    const classicalResult = optimizeClassical({
      solarGen,
      windGen,
      demand,
      storageCharge: gridState.storage.charge,
      storageCapacity: config.storageCapacity,
    })

    optimizeQuantumQiskit({
      solarGen,
      windGen,
      demand,
      storageCharge: gridState.storage.charge,
      storageCapacity: config.storageCapacity,
    }).then((quantumResult) => {
      // Update grid state with quantum optimization
      setGridState({
        solar: { current: solarGen, capacity: config.solarCapacity },
        wind: { current: windGen, capacity: config.windCapacity },
        storage: {
          charge: quantumResult.newStorageCharge,
          capacity: config.storageCapacity,
          charging: quantumResult.storageFlow > 0,
          discharging: quantumResult.storageFlow < 0,
          flowRate: quantumResult.storageFlow,
        },
        demand,
        curtailment: quantumResult.curtailment,
      })

      setQuantumMetrics(quantumResult.metrics)
    })

    setClassicalMetrics(classicalResult.metrics)
  }, [timeOfDay, config])

  return {
    isRunning,
    timeOfDay,
    config,
    classicalMetrics,
    quantumMetrics,
    gridState,
    toggleSimulation,
    resetSimulation,
    updateConfig,
  }
}
