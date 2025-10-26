import { Card } from "@/components/ui/card"
import { Cpu, Leaf, DollarSign, Users } from "lucide-react"

export function WhyQuantumSection() {
  const benefits = [
    {
      icon: Cpu,
      title: "Quantum Processing Power",
      description:
        "Analyze massive datasets simultaneously through quantum parallelism, uncovering patterns hidden to classical computers.",
    },
    {
      icon: Leaf,
      title: "Environmental Impact",
      description: "Enable integration of renewable sources, reducing CO₂ emissions by hundreds of megatons per year.",
    },
    {
      icon: DollarSign,
      title: "Economic Transformation",
      description: "Reduce fuel costs by 40%, operating costs by 14%, and unlock multi-billion dollar annual gains.",
    },
    {
      icon: Users,
      title: "Global Reach",
      description: "Impact tens to hundreds of millions of people through cleaner air and more stable energy prices.",
    },
  ]

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Why Quantum for Renewable Energy?</h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Quantum computing offers unprecedented capabilities to optimize renewable energy dispatch, addressing the
            critical challenge of intermittency while maximizing efficiency and minimizing waste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Research Highlight */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="p-8 bg-primary/5 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-mono text-primary">RESEARCH HIGHLIGHT</span>
              </div>
              <p className="text-lg leading-relaxed">
                A recent study using quantum particle swarm optimization calculated a{" "}
                <span className="font-semibold text-primary">13.2% reduction in carbon emissions</span> over a 24-hour
                period with fewer than 200 algorithm iterations. Solar panels currently operate at only 20-23%
                efficiency yet comprise 6.9% of our energy supply—quantum optimization is crucial for maximizing
                renewable integration.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
