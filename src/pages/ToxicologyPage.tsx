import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { toxidromes, commonPoisonings } from '@/data/toxicology'

export function ToxicologyPage() {
  const [activeTab, setActiveTab] = useState('toxidromes')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Toxicology</h1>
        <p className="text-muted-foreground">
          Master toxidrome recognition, antidotes, and metabolic poisoning patterns
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="toxidromes">Toxidromes</TabsTrigger>
          <TabsTrigger value="poisonings">Common Poisonings</TabsTrigger>
        </TabsList>

        <TabsContent value="toxidromes" className="space-y-4">
          <Card className="bg-yellow-500/10 border-yellow-500/50">
            <CardHeader>
              <CardTitle>What is a Toxidrome?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                A toxidrome is a constellation of signs and symptoms that suggests
                exposure to a specific class of toxins. Recognizing toxidromes allows
                rapid diagnosis and targeted treatment before confirmatory testing.
              </p>
            </CardContent>
          </Card>

          {toxidromes.map((toxidrome, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="destructive">{toxidrome.name}</Badge>
                  Toxidrome
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Clinical Signs:</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {toxidrome.signs.map((sign, signIdx) => (
                      <div key={signIdx} className="p-2 bg-muted rounded text-sm">
                        • {sign}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Treatment:</h4>
                  <div className="space-y-2">
                    {toxidrome.treatment.map((tx, txIdx) => (
                      <div key={txIdx} className="p-3 bg-green-500/10 rounded-lg">
                        <p className="text-sm">{tx}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {toxidrome.labs && toxidrome.labs.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Diagnostic Studies:</h4>
                    <div className="space-y-1">
                      {toxidrome.labs.map((lab, labIdx) => (
                        <p key={labIdx} className="text-sm text-muted-foreground">
                          • {lab}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="poisonings" className="space-y-4">
          {commonPoisonings.map((poisoning, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="destructive">{poisoning.toxin}</Badge>
                  Overdose
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Clinical Presentation:</h4>
                  <p className="text-sm bg-muted p-3 rounded-lg">
                    {poisoning.presentation}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Diagnosis:</h4>
                  <p className="text-sm bg-blue-500/10 p-3 rounded-lg">
                    {poisoning.diagnosis}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Treatment:</h4>
                  <p className="text-sm bg-green-500/10 p-3 rounded-lg">
                    {poisoning.treatment}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Monitoring:</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {poisoning.monitoring.map((mon, monIdx) => (
                      <div key={monIdx} className="p-2 bg-muted rounded text-sm">
                        • {mon}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-destructive mb-2">Red Flags:</h4>
                  <div className="space-y-2">
                    {poisoning.redFlags.map((flag, flagIdx) => (
                      <div
                        key={flagIdx}
                        className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
                      >
                        <p className="text-sm font-medium">{flag}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-blue-500/10 border-blue-500/50">
            <CardHeader>
              <CardTitle>Metabolic Gap Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold">Anion Gap Metabolic Acidosis (MUDPILES):</h4>
                <p className="text-sm mt-2">
                  Methanol, Uremia, DKA, Paraldehyde/Propylene glycol, Iron/Isoniazid,
                  Lactate, Ethylene glycol, Salicylates
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Osmolar Gap (&gt;10):</h4>
                <p className="text-sm mt-2">
                  Suggests toxic alcohol ingestion (methanol, ethylene glycol, isopropanol)
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Formula: Osm gap = Measured osm - (2×Na + BUN/2.8 + Glucose/18)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
