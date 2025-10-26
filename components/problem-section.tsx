import { Card } from "@/components/ui/card"
import { AlertTriangle, TrendingDown, Users2, Clock } from "lucide-react"

export function ProblemSection() {
  const challenges = [
    {
      icon: TrendingDown,
      category: "Economic",
      stat: "$5.8T",
      description: "Annual infrastructure investment needed for developing economies through 2030 (19% of GDP)",
      details: [
        "Integration costs rise 20-50% at high renewable penetration",
        "$7T in global fossil subsidies (2022) distorting markets",
        "Only $168B in G20 renewable support",
      ],
    },
    {
      icon: Users2,
      category: "Social",
      stat: "675M",
      description: "People at risk of lacking electricity access by 2030",
      details: [
        "13.7M renewable jobs created in 2023",
        "Only 20% of sub-Saharan Africans have reliable electricity",
        "Mining overlaps with Indigenous lands in 7% of Key Biodiversity Areas",
      ],
    },
    {
      icon: Clock,
      category: "Temporal",
      stat: "2-3x",
      description: "More capacity needed for reliability due to intermittency",
      details: [
        "Energy value reduced by 20-40% from demand mismatches",
        "Inconsistent generation from natural forces",
        "Complex storage and dispatch requirements",
      ],
    },
    {
      icon: AlertTriangle,
      category: "Environmental",
      stat: "10-50x",
      description: "More land required compared to fossil fuel infrastructure",
      details: [
        "~500,000 U.S. bird deaths annually from wind farms",
        "Habitat fragmentation from large installations",
        "Battery mineral mining environmental impact",
      ],
    },
  ]

  return (
    <section id="problem" className="py-24 lg:py-32">
      <div className="container px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">The Renewable Energy Challenge</h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            While vital for decarbonization, renewable energy presents massive challenges across stakeholders due to
            intermittency, high costs, social inequities, temporal inefficiencies, and environmental impacts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {challenges.map((challenge, index) => (
            <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                      <challenge.icon className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <div className="text-sm font-mono text-muted-foreground">{challenge.category}</div>
                      <div className="text-3xl font-bold text-destructive">{challenge.stat}</div>
                    </div>
                  </div>
                </div>

                <p className="text-foreground font-medium leading-relaxed">{challenge.description}</p>

                <ul className="space-y-2">
                  {challenge.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-12">
          <Card className="p-8 bg-accent/5 border-accent/20">
            <p className="text-center text-lg leading-relaxed">
              <span className="font-semibold text-accent">The Solution:</span> Better storage, equitable policies, and
              optimized siting through quantum-enabled dispatch optimization benefits all stakeholders—from economies to
              ecosystems.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
