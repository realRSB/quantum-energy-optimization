"use client"

import { Card } from "@/components/ui/card"
import { TrendingDown, TrendingUp, Minus, Cpu, AlertCircle } from "lucide-react"
import type { OptimizationMetrics } from "@/types/simulation"
import { useState, useEffect } from "react"

interface OptimizationComparisonProps {
  classicalMetrics: OptimizationMetrics
  quantumMetrics: OptimizationMetrics
  timeOfDay: number
}

export function OptimizationComparison({ classicalMetrics, quantumMetrics, timeOfDay }: OptimizationComparisonProps) {
  const [isUsingQiskit, setIsUsingQiskit] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if quantum compute time is suspiciously fast (likely fallback)
    // Real Qiskit QAOA typically takes 50-500ms, simulated takes 10-25ms
    if (quantumMetrics.computeTime > 0) {
      setIsUsingQiskit(quantumMetrics.computeTime > 30)
    }
  }, [quantumMetrics.computeTime])

  const calculateImprovement = (classical: number, quantum: number, lowerIsBetter = true) => {
    const diff = lowerIsBetter ? classical - quantum : quantum - classical
    const percent = (diff / classical) * 100
    return { diff, percent }
  }

  const costImprovement = calculateImprovement(classicalMetrics.totalCost, quantumMetrics.totalCost)
  const curtailmentImprovement = calculateImprovement(classicalMetrics.curtailment, quantumMetrics.curtailment)
  const efficiencyImprovement = calculateImprovement(classicalMetrics.efficiency, quantumMetrics.efficiency, false)
  const emissionsImprovement = calculateImprovement(classicalMetrics.emissions, quantumMetrics.emissions)

  const metrics = [
    {
      label: "Total Cost",
      classical: `$${classicalMetrics.totalCost.toFixed(0)}`,
      quantum: `$${quantumMetrics.totalCost.toFixed(0)}`,
      improvement: costImprovement,
      unit: "",
    },
    {
      label: "Curtailment",
      classical: `${classicalMetrics.curtailment.toFixed(1)} MWh`,
      quantum: `${quantumMetrics.curtailment.toFixed(1)} MWh`,
      improvement: curtailmentImprovement,
      unit: "MWh",
    },
    {
      label: "Grid Efficiency",
      classical: `${classicalMetrics.efficiency.toFixed(1)}%`,
      quantum: `${quantumMetrics.efficiency.toFixed(1)}%`,
      improvement: efficiencyImprovement,
      unit: "%",
    },
    {
      label: "CO₂ Emissions",
      classical: `${classicalMetrics.emissions.toFixed(1)} tons`,
      quantum: `${quantumMetrics.emissions.toFixed(1)} tons`,
      improvement: emissionsImprovement,
      unit: "tons",
    },
  ]

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Optimization Comparison</h2>
          <div className="text-sm text-muted-foreground">Classical vs Quantum</div>
        </div>

        {isUsingQiskit === false && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-amber-700 dark:text-amber-400">
              <span className="font-semibold">Qiskit unavailable:</span> Using simulated quantum optimization. Real
              Qiskit requires Python runtime with qiskit, qiskit-algorithms, and qiskit-optimization packages installed.
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/30">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Cpu className="w-3 h-3" />
              <span>Classical Compute</span>
            </div>
            <div className="font-mono text-lg font-semibold">{classicalMetrics.computeTime.toFixed(0)}ms</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Cpu className="w-3 h-3 text-primary" />
              <span>{isUsingQiskit ? "Quantum (Qiskit)" : "Quantum (Simulated)"}</span>
            </div>
            <div className="font-mono text-lg font-semibold text-primary">
              {quantumMetrics.computeTime.toFixed(0)}ms
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{metric.label}</span>
                <div className="flex items-center gap-2">
                  {metric.improvement.percent > 0 ? (
                    <TrendingDown className="w-4 h-4 text-green-500" />
                  ) : metric.improvement.percent < 0 ? (
                    <TrendingUp className="w-4 h-4 text-destructive" />
                  ) : (
                    <Minus className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      metric.improvement.percent > 0
                        ? "text-green-500"
                        : metric.improvement.percent < 0
                          ? "text-destructive"
                          : "text-muted-foreground"
                    }`}
                  >
                    {metric.improvement.percent > 0 ? "-" : metric.improvement.percent < 0 ? "+" : ""}
                    {Math.abs(metric.improvement.percent).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="text-xs text-muted-foreground mb-1">Classical</div>
                  <div className="font-mono text-sm">{metric.classical}</div>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <div className="text-xs text-muted-foreground mb-1">Quantum</div>
                  <div className="font-mono text-sm font-semibold text-primary">{metric.quantum}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="pt-4 border-t border-border">
          <div className="p-4 rounded-lg bg-accent/10">
            <div className="text-sm font-semibold mb-2 text-accent">
              {isUsingQiskit ? "Quantum Advantage (Qiskit QAOA)" : "Quantum Advantage (Simulated)"}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Quantum optimization reduces costs by{" "}
              <span className="font-semibold text-foreground">${costImprovement.diff.toFixed(0)}</span>, eliminates{" "}
              <span className="font-semibold text-foreground">{curtailmentImprovement.diff.toFixed(1)} MWh</span> of
              waste, and cuts emissions by{" "}
              <span className="font-semibold text-foreground">{emissionsImprovement.diff.toFixed(1)} tons</span> through
              superior dispatch decisions{" "}
              {isUsingQiskit ? "powered by QAOA algorithms" : "using quantum-inspired optimization"}.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
