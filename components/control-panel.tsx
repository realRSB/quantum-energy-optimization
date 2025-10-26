"use client"

import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import type { SimulationConfig } from "@/types/simulation"

interface ControlPanelProps {
  config: SimulationConfig
  updateConfig: (updates: Partial<SimulationConfig>) => void
}

export function ControlPanel({ config, updateConfig }: ControlPanelProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Configuration</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Solar Capacity</Label>
              <span className="text-sm font-mono">{config.solarCapacity} MW</span>
            </div>
            <Slider
              value={[config.solarCapacity]}
              onValueChange={([value]) => updateConfig({ solarCapacity: value })}
              min={50}
              max={500}
              step={10}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Wind Capacity</Label>
              <span className="text-sm font-mono">{config.windCapacity} MW</span>
            </div>
            <Slider
              value={[config.windCapacity]}
              onValueChange={([value]) => updateConfig({ windCapacity: value })}
              min={50}
              max={500}
              step={10}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Storage Capacity</Label>
              <span className="text-sm font-mono">{config.storageCapacity} MWh</span>
            </div>
            <Slider
              value={[config.storageCapacity]}
              onValueChange={([value]) => updateConfig({ storageCapacity: value })}
              min={50}
              max={500}
              step={10}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Base Demand</Label>
              <span className="text-sm font-mono">{config.baseDemand} MW</span>
            </div>
            <Slider
              value={[config.baseDemand]}
              onValueChange={([value]) => updateConfig({ baseDemand: value })}
              min={100}
              max={600}
              step={10}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Simulation Speed</Label>
              <span className="text-sm font-mono">{config.simulationSpeed}x</span>
            </div>
            <Slider
              value={[config.simulationSpeed]}
              onValueChange={([value]) => updateConfig({ simulationSpeed: value })}
              min={1}
              max={10}
              step={1}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Adjust capacity to see impact on optimization</p>
            <p>• Higher renewable capacity increases curtailment risk</p>
            <p>• Storage helps balance intermittency</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
