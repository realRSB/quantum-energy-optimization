"use client"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Zap } from "lucide-react"
import { GridVisualization } from "@/components/grid-visualization"
import { MetricsDashboard } from "@/components/metrics-dashboard"
import { OptimizationComparison } from "@/components/optimization-comparison"
import { ControlPanel } from "@/components/control-panel"
import { useEnergySimulation } from "@/hooks/use-energy-simulation"

export function EnergySimulator() {
  const {
    isRunning,
    timeOfDay,
    config,
    classicalMetrics,
    quantumMetrics,
    gridState,
    toggleSimulation,
    resetSimulation,
    updateConfig,
  } = useEnergySimulation()

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Quantum Energy Dispatch Optimizer</h1>
                <p className="text-sm text-muted-foreground">Real-time renewable energy optimization simulator</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={toggleSimulation} size="lg" className="gap-2">
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start
                </>
              )}
            </Button>
            <Button onClick={resetSimulation} variant="outline" size="lg" className="gap-2 bg-transparent">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Grid Visualization */}
          <div className="xl:col-span-2 space-y-6">
            <GridVisualization gridState={gridState} timeOfDay={timeOfDay} />
            <OptimizationComparison
              classicalMetrics={classicalMetrics}
              quantumMetrics={quantumMetrics}
              timeOfDay={timeOfDay}
            />
          </div>

          {/* Right Column - Controls & Metrics */}
          <div className="space-y-6">
            <ControlPanel config={config} updateConfig={updateConfig} />
            <MetricsDashboard
              classicalMetrics={classicalMetrics}
              quantumMetrics={quantumMetrics}
              isRunning={isRunning}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
