import { Card } from "@/components/ui/card"
import { DollarSign, TrendingDown, Zap, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ImpactSection() {
  return (
    <section id="impact" className="py-24 lg:py-32">
      <div className="container px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Practical Dollar Impact</h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Translating efficiency percentages into real-world financial and environmental benefits for utilities and
            stakeholders.
          </p>
        </div>

        {/* Example Scenario */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="p-8 bg-primary/5 border-primary/20">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-mono text-primary">EXAMPLE SCENARIO</span>
              </div>
              <h3 className="text-xl font-semibold">Mid-Sized Utility Annual Impact</h3>

              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-mono text-primary">1</span>
                  </div>
                  <p className="leading-relaxed">
                    <span className="font-semibold text-foreground">Baseline:</span> 10,000 GWh/year dispatched at
                    $50/MWh = <span className="font-mono text-primary">$500M/year</span> dispatch cost
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-mono text-primary">2</span>
                  </div>
                  <p className="leading-relaxed">
                    <span className="font-semibold text-foreground">Fuel/Operational Savings:</span> 3% reduction =
                    <span className="font-mono text-primary"> $15M/year</span> saved
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-mono text-primary">3</span>
                  </div>
                  <p className="leading-relaxed">
                    <span className="font-semibold text-foreground">Curtailment Reduction:</span> 10% of 1,000 GWh
                    curtailed = 100 GWh extra usable clean energy (near-zero marginal cost)
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-mono text-primary">4</span>
                  </div>
                  <p className="leading-relaxed">
                    <span className="font-semibold text-foreground">Ramping Cost Reduction:</span> 20% of 6% dispatch
                    cost = <span className="font-mono text-primary">~$6M/year</span> additional savings
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Total Annual Value:</span>
                  <span className="text-3xl font-bold text-primary">$20-25M</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Excluding infrastructure investment, regulatory incentives, and emissions credits
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Scale Impact */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary mb-2">$2-4B</div>
              <div className="text-sm text-muted-foreground">U.S. Grid Annual Savings</div>
            </Card>

            <Card className="p-6 text-center">
              <TrendingDown className="w-8 h-8 text-accent mx-auto mb-3" />
              <div className="text-3xl font-bold text-accent mb-2">50-80 Mt</div>
              <div className="text-sm text-muted-foreground">CO₂ Reduction/Year (U.S.)</div>
            </Card>

            <Card className="p-6 text-center">
              <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary mb-2">95-98%</div>
              <div className="text-sm text-muted-foreground">Grid Efficiency Target</div>
            </Card>

            <Card className="p-6 text-center">
              <Users className="w-8 h-8 text-accent mx-auto mb-3" />
              <div className="text-3xl font-bold text-accent mb-2">100M+</div>
              <div className="text-sm text-muted-foreground">People Impacted</div>
            </Card>
          </div>
        </div>

        {/* Conclusion */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-accent/5 border-accent/20">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-mono text-accent">TRANSFORMATIVE POTENTIAL</span>
              </div>
              <p className="text-lg leading-relaxed">
                Quantum computing represents the{" "}
                <span className="font-semibold text-accent">most economically transformative</span> and{" "}
                <span className="font-semibold text-accent">systemically impactful</span> early-stage application in the
                energy sector. By targeting dispatch inefficiency—the largest remaining bottleneck in renewable
                adoption—quantum algorithms can unlock multi-billion-dollar annual gains while accelerating the global
                transition to clean energy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="font-mono flex-1">Download Full Research</Button>
                <Button variant="outline" className="font-mono flex-1 bg-transparent">
                  Contact Research Team
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
