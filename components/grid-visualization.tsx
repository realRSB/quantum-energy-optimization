"use client"

import { Card } from "@/components/ui/card"
import { Sun, Wind, Battery, Home, Zap, AlertTriangle } from "lucide-react"
import type { GridState } from "@/types/simulation"

interface GridVisualizationProps {
  gridState: GridState
  timeOfDay: number
}

export function GridVisualization({ gridState, timeOfDay }: GridVisualizationProps) {
  const { solar, wind, storage, demand, curtailment } = gridState

  const sources = [
    {
      icon: Sun,
      label: "Solar",
      value: solar.current,
      capacity: solar.capacity,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: Wind,
      label: "Wind",
      value: wind.current,
      capacity: wind.capacity,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      icon: Battery,
      label: "Storage",
      value: storage.charge,
      capacity: storage.capacity,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ]

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Power Grid Status</h2>
          <div className="text-sm text-muted-foreground">
            Time: <span className="font-mono">{Math.floor(timeOfDay)}:00</span>
          </div>
        </div>

        {/* Energy Sources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sources.map((source) => (
            <div key={source.label} className={`p-4 rounded-lg ${source.bgColor}`}>
              <div className="flex items-center gap-2 mb-3">
                <source.icon className={`w-5 h-5 ${source.color}`} />
                <span className="font-semibold">{source.label}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{source.value.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">MW</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${source.color.replace("text-", "bg-")}`}
                    style={{ width: `${(source.value / source.capacity) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">Capacity: {source.capacity} MW</div>
              </div>
            </div>
          ))}
        </div>

        {/* Demand & Curtailment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-primary/10">
            <div className="flex items-center gap-2 mb-3">
              <Home className="w-5 h-5 text-primary" />
              <span className="font-semibold">Demand</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{demand.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">MW</span>
            </div>
          </div>

          {curtailment > 0 && (
            <div className="p-4 rounded-lg bg-destructive/10">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <span className="font-semibold">Curtailment</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-destructive">{curtailment.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">MW wasted</span>
              </div>
            </div>
          )}
        </div>

        {/* Energy Flow Diagram */}
        <div className="pt-4 border-t border-border">
          <div className="text-sm font-semibold mb-3">Energy Flow</div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 text-center">
              <div className="text-xs text-muted-foreground mb-1">Generation</div>
              <div className="text-lg font-bold text-accent">{(solar.current + wind.current).toFixed(1)} MW</div>
            </div>
            <Zap className="w-5 h-5 text-primary" />
            <div className="flex-1 text-center">
              <div className="text-xs text-muted-foreground mb-1">Storage</div>
              <div className="text-lg font-bold text-green-500">
                {storage.charging ? "+" : storage.discharging ? "-" : ""}
                {Math.abs(storage.flowRate).toFixed(1)} MW
              </div>
            </div>
            <Zap className="w-5 h-5 text-primary" />
            <div className="flex-1 text-center">
              <div className="text-xs text-muted-foreground mb-1">Delivered</div>
              <div className="text-lg font-bold text-primary">{demand.toFixed(1)} MW</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
