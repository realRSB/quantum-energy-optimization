import { Card } from "@/components/ui/card"
import { Activity, Battery, Network, Gauge, TrendingUp, Zap } from "lucide-react"

export function DispatchSection() {
  const levers = [
    {
      icon: TrendingUp,
      lever: "Reduced Generation Cost",
      impact: "5-10% improvement",
      description: "Less overcommitment to expensive backup plants through better dispatch optimization",
      quantum: "Search over many dispatch configurations (storage, ramping, network flow) faster",
    },
    {
      icon: Zap,
      lever: "Lower Curtailment",
      impact: "10-20% reduction",
      description: "Avoid wasting excess wind/solar that must be shut off due to grid constraints",
      quantum: "Better forecasting + combinatorial optimization with storage and network constraints",
    },
    {
      icon: Activity,
      lever: "Reduced Ramping Costs",
      impact: "5-15% of volatility",
      description: "Less frequent starts and smoother transitions between generation sources",
      quantum: "Optimize start/stop decisions over time with complex operational constraints",
    },
    {
      icon: Battery,
      lever: "Better Storage Utilization",
      impact: "Higher ROI",
      description: "Charge/discharge timing optimized to match supply and demand patterns",
      quantum: "Handle large scenario-based stochastic optimizations with recourse",
    },
    {
      icon: Network,
      lever: "Reduced Transmission Loss",
      impact: "1-3% savings",
      description: "Optimal routing and network reconfiguration to minimize energy loss",
      quantum: "Network rebalancing across many nodes in real-time",
    },
    {
      icon: Gauge,
      lever: "Faster Reoptimization",
      impact: "Lower penalties",
      description: "Ability to re-dispatch quickly when forecasts deviate from reality",
      quantum: "Quantum hardware in the loop provides speed advantages for adaptive control",
    },
  ]

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Renewable Energy Dispatch Optimization</h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Understanding dispatch inefficiencies and how quantum computing provides transformative solutions across
            multiple economic levers.
          </p>
        </div>

        {/* What is Dispatch */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="p-8 bg-primary/5 border-primary/20">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">What is Energy Dispatch?</h3>
              <p className="text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Dispatch</span> means deciding when and how much to run
                each generation source (solar, wind, storage, backup) to meet demand while minimizing cost and
                respecting constraints like ramping limits, transmission capacity, and grid stability.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With high renewables, variability and uncertainty are significant: clouds, wind fluctuations, demand
                swings. Classical dispatch solvers struggle at scale with many generators, storage units, network
                constraints, and uncertainty scenarios.
              </p>
              <div className="pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-destructive">Suboptimal dispatch means:</span> wasted generation
                  (curtailment), extra fossil backup usage, higher grid costs, lost revenues, and higher emissions.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Economic Levers */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Key Economic Levers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levers.map((item, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-mono text-primary font-semibold">{item.impact}</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">{item.lever}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                  <div className="pt-3 border-t border-border/50">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-accent">Quantum:</span> {item.quantum}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Research Examples */}
        <div className="max-w-5xl mx-auto space-y-6">
          <h3 className="text-2xl font-semibold mb-8 text-center">Real-World Research</h3>

          <Card className="p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-mono text-primary">OPTIMAL POWER FLOW</span>
              </div>
              <h4 className="text-lg font-semibold">Quantum Hardware-in-the-Loop for OPF</h4>
              <p className="text-muted-foreground leading-relaxed">
                Recent research implemented{" "}
                <span className="font-semibold text-foreground">AQOPF (adiabatic quantum optimal power flow)</span>{" "}
                using quantum hardware and digital simulators. In test networks (IEEE 9-bus with solar/wind), results
                matched classical Newton-Raphson solutions, demonstrating feasibility in mixed renewable systems while
                enabling real-time responsiveness.
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-mono text-accent">STOCHASTIC DISPATCH</span>
              </div>
              <h4 className="text-lg font-semibold">Two-Stage Recourse-Based Energy Management</h4>
              <p className="text-muted-foreground leading-relaxed">
                A study formulated <span className="font-semibold text-foreground">two-stage stochastic dispatch</span>{" "}
                with PV uncertainty and EV charging flexibility, solved with quantum optimization methods. The quantum
                approach handled high-dimensional uncertainty and provided efficient dispatch decisions under variable
                renewable generation scenarios.
              </p>
            </div>
          </Card>

          <Card className="p-8 bg-accent/5 border-accent/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-mono text-accent">IMPACT PROJECTION</span>
              </div>
              <p className="text-lg leading-relaxed">
                A 2017 study found that in systems with ~50% renewables, an optimized dispatch approach (versus naive)
                can reduce <span className="font-semibold text-accent">operating cost by &gt;25%</span>. McKinsey
                projects quantum-enabled decarbonization could help abate{" "}
                <span className="font-semibold text-accent">~7 gigatons of CO₂ per year by 2035</span>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
