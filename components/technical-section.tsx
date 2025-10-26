import { Card } from "@/components/ui/card"
import { CheckCircle2, XCircle, Lightbulb } from "lucide-react"

export function TechnicalSection() {
  const advantages = [
    "Quantum parallelism analyzes massive datasets simultaneously",
    "Uncovers patterns hidden to classical computers",
    "Enables smarter grid management in real-time",
    "More accurate forecasting of renewable generation",
    "Seamless integration of solar and wind power",
  ]

  const challenges = [
    "High error rates in current quantum systems",
    "Qubit instability and short coherence times",
    "Extreme sensitivity to environmental noise",
    "Large-scale optimization requires many reliable qubits",
    "Error correction demands additional hardware overhead",
    "Complex and energy-intensive systems",
  ]

  const solutions = [
    "Advances in qubit materials and fabrication",
    "Improved error correction algorithms",
    "Enhanced device engineering for stability",
    "Longer coherence times through better isolation",
    "Lower error rates via quantum error mitigation",
  ]

  return (
    <section id="technical" className="py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Technical Landscape</h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Understanding the quantum advantage, current limitations, and the path forward for real-world renewable
            energy optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Advantages */}
          <Card className="p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Quantum Advantages</h3>
              </div>
              <ul className="space-y-3">
                {advantages.map((advantage, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Challenges */}
          <Card className="p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold">Current Hurdles</h3>
              </div>
              <ul className="space-y-3">
                {challenges.map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Solutions */}
          <Card className="p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Path Forward</h3>
              </div>
              <ul className="space-y-3">
                {solutions.map((solution, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Lightbulb className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto mt-12">
          <Card className="p-8 bg-primary/5 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-mono text-primary">BREAKTHROUGH POTENTIAL</span>
              </div>
              <p className="text-lg leading-relaxed">
                Once these technical barriers are overcome through advances in materials science and engineering,
                quantum computing will deliver on its promise of{" "}
                <span className="font-semibold text-primary">real-world breakthroughs</span> for renewable energy
                optimization and grid reliability—transforming how we manage and distribute clean energy globally.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
