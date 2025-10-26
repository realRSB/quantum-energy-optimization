"use client"

import { Card } from "@/components/ui/card"
import { DollarSign, Zap, TrendingDown, Activity } from "lucide-react"
import type { OptimizationMetrics } from "@/types/simulation"

interface MetricsDashboardProps {
  classicalMetrics: OptimizationMetrics
  quantumMetrics: OptimizationMetrics
  isRunning: boolean
}

export function MetricsDashboard({ classicalMetrics, quantumMetrics, isRunning }: MetricsDashboardProps) {
  const savings = classicalMetrics.totalCost - quantumMetrics.totalCost
  const curtailmentReduction = classicalMetrics.curtailment - quantumMetrics.curtailment
  const efficiencyGain = quantumMetrics.efficiency - classicalMetrics.efficiency
  const emissionsReduction = classicalMetrics.emissions - quantumMetrics.emissions

  const metrics = [
    {
      icon: DollarSign,
      label: "Cost Savings",
      value: `$${savings.toFixed(0)}`,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Zap,
      label: "Curtailment Reduced",
      value: `${curtailmentReduction.toFixed(1)} MWh`,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: Activity,
      label: "Efficiency Gain",
      value: `+${efficiencyGain.toFixed(1)}%`,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      icon: TrendingDown,
      label: "Emissions Cut",
      value: `${emissionsReduction.toFixed(1)} tons`,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ]

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Quantum Benefits</h2>
          {isRunning && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-muted-foreground">Live</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {metrics.map((metric) => (
            <div key={metric.label} className={`p-4 rounded-lg ${metric.bgColor}`}>
              <div className="flex items-center gap-3">
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
                  <div className="text-lg font-bold">{metric.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border">
          <div className="p-4 rounded-lg bg-primary/5">
            <div className="text-sm font-semibold mb-2">Annual Projection</div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>
                Cost Savings: <span className="font-semibold text-foreground">${(savings * 8760).toFixed(0)}</span>
              </p>
              <p>
                Energy Saved:{" "}
                <span className="font-semibold text-foreground">{(curtailmentReduction * 365).toFixed(0)} MWh</span>
              </p>
              <p>
                CO₂ Avoided:{" "}
                <span className="font-semibold text-foreground">{(emissionsReduction * 8760).toFixed(0)} tons</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
