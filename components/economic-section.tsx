import { Card } from "@/components/ui/card"
import { DollarSign, TrendingDown, Zap, Leaf } from "lucide-react"

export function EconomicSection() {
  const comparisonData = [
    {
      metric: "Dispatch Computation Time",
      classical: "Hours (NP-hard)",
      quantum: "Minutes (QAOA)",
    },
    {
      metric: "Grid Efficiency",
      classical: "85-90% utilization",
      quantum: "95-98% utilization",
    },
    {
      metric: "Annual U.S. Savings",
      classical: "Baseline",
      quantum: "$2-4B/year",
    },
    {
      metric: "Carbon Emissions",
      classical: "Current levels",
      quantum: "3-6% reduction",
    },
  ]

  const stakeholderImpacts = [
    {
      icon: Zap,
      stakeholder: "Utilities",
      impact: "↓ 5-10%",
      description: "Operating cost reduction through lower energy wastage and better peak load balancing",
    },
    {
      icon: DollarSign,
      stakeholder: "Governments",
      impact: "↓ Subsidy",
      description: "Reduced subsidy dependency via improved grid efficiency and less emergency reserve funding",
    },
    {
      icon: TrendingDown,
      stakeholder: "Consumers",
      impact: "↓ 3-5%",
      description: "Electricity price reduction from more stable renewable supply and reduced volatility",
    },
    {
      icon: Leaf,
      stakeholder: "Environment",
      impact: "↓ 50-80 Mt",
      description: "CO₂ reduction per year (U.S.) with indirect economic value of $5-10B via carbon avoidance",
    },
  ]

  return (
    <section id="economics" className="py-24 lg:py-32">
      <div className="container px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Economic Impact Analysis</h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Quantum-optimized dispatch directly targets the largest remaining economic bottleneck in renewable energy
            adoption, unlocking multi-billion-dollar annual gains.
          </p>
        </div>

        {/* Energy Economics Comparison */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="p-8">
            <h3 className="text-2xl font-semibold mb-6">Current Energy Economics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <h4 className="font-semibold">Fossil Fuels</h4>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    LCOE: <span className="font-mono text-foreground">$60-110/MWh</span>
                  </p>
                  <p>
                    O&M Costs: <span className="font-mono text-foreground">~$30/MWh</span>
                  </p>
                  <p>
                    Global Damages: <span className="font-mono text-foreground">$5-10T/year</span>
                  </p>
                  <p>
                    Annual Subsidies: <span className="font-mono text-foreground">~$1.3T</span>
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <h4 className="font-semibold">Renewables</h4>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    Solar LCOE: <span className="font-mono text-foreground">$25-50/MWh</span>
                  </p>
                  <p>
                    Wind LCOE: <span className="font-mono text-foreground">$30-60/MWh</span>
                  </p>
                  <p>
                    Storage Costs: <span className="font-mono text-foreground">+$15-25/MWh</span>
                  </p>
                  <p>
                    Curtailment Loss: <span className="font-mono text-foreground">5-15% wasted</span>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Classical vs Quantum Comparison */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="p-8">
            <h3 className="text-2xl font-semibold mb-6">Classical vs Quantum Dispatch</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Metric</th>
                    <th className="text-left py-3 px-4 font-semibold">Classical</th>
                    <th className="text-left py-3 px-4 font-semibold text-primary">Quantum</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="border-b border-border/50">
                      <td className="py-3 px-4 font-medium">{row.metric}</td>
                      <td className="py-3 px-4 text-muted-foreground font-mono text-sm">{row.classical}</td>
                      <td className="py-3 px-4 text-primary font-mono text-sm font-semibold">{row.quantum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Stakeholder Impact */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold mb-8 text-center">Stakeholder Impact Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stakeholderImpacts.map((item, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{item.stakeholder}</h4>
                      <span className="text-sm font-mono text-primary font-semibold">{item.impact}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-12">
          <Card className="p-8 bg-accent/5 border-accent/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-mono text-accent">EXECUTIVE SUMMARY</span>
              </div>
              <p className="text-lg leading-relaxed">
                Renewables are cheaper per unit but inefficiently dispatched. Quantum computing directly targets this
                inefficiency—the{" "}
                <span className="font-semibold text-accent">largest remaining economic bottleneck</span> in renewable
                adoption. By accelerating dispatch optimization and storage balancing, quantum algorithms unlock
                multi-billion-dollar annual gains, reduce waste, and smooth volatility across all stakeholders.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
