import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { dkaData } from '@/data/diseases/dka'
import { DKASimulator } from '@/components/modules/dka-hhs/DKASimulator'

export function DKAPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{dkaData.name}</h1>
        <p className="text-muted-foreground">
          Hyperglycemic emergency with ketoacidosis requiring stepwise management
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
          <TabsTrigger value="management">Management</TabsTrigger>
          <TabsTrigger value="simulator">Simulator</TabsTrigger>
          <TabsTrigger value="complications">Complications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pathophysiology</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{dkaData.pathophysiology}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Systemic Manifestations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {dkaData.systemicManifestations.map((manifestation, idx) => (
                  <div key={idx} className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{manifestation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-500/10 border-yellow-500/50">
            <CardHeader>
              <CardTitle>Critical Teaching Point: Potassium First!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">
                Never start insulin if potassium &lt; 3.3 mEq/L. Insulin drives
                potassium into cells, potentially causing life-threatening
                hypokalemia and cardiac arrhythmias.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diagnosis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Diagnostic Criteria (All Three Required)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <div className="p-4 bg-primary/10 border-l-4 border-primary rounded">
                  <p className="font-semibold">1. Hyperglycemia</p>
                  <p className="text-sm text-muted-foreground">
                    Glucose typically &gt;250 mg/dL
                  </p>
                </div>
                <div className="p-4 bg-primary/10 border-l-4 border-primary rounded">
                  <p className="font-semibold">2. Anion Gap Metabolic Acidosis</p>
                  <p className="text-sm text-muted-foreground">
                    pH &lt;7.3, bicarbonate &lt;18 mEq/L
                  </p>
                </div>
                <div className="p-4 bg-primary/10 border-l-4 border-primary rounded">
                  <p className="font-semibold">3. Ketones</p>
                  <p className="text-sm text-muted-foreground">
                    Serum or urine ketones positive (beta-hydroxybutyrate preferred)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Laboratory Studies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {dkaData.labs.map((lab, idx) => (
                  <div key={idx} className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{lab}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-destructive">Red Flags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {dkaData.redFlags.map((flag, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
                  >
                    <p className="text-sm font-medium">{flag}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="management" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Initial Management Sequence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dkaData.initialManagement.map((step, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <p className="flex-1 pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {dkaData.treatmentSequence && (
            <Card>
              <CardHeader>
                <CardTitle>Detailed Treatment Protocol</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dkaData.treatmentSequence.map((step) => (
                    <div
                      key={step.order}
                      className="border-l-4 border-primary pl-4 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <Badge>Step {step.order}</Badge>
                        <h4 className="font-semibold">{step.action}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {step.rationale}
                      </p>
                      <div>
                        <p className="text-sm font-medium">Monitoring:</p>
                        <ul className="text-sm text-muted-foreground list-disc list-inside">
                          {step.monitoring.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      {step.pitfalls.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-destructive">
                            Pitfalls to avoid:
                          </p>
                          <ul className="text-sm text-muted-foreground list-disc list-inside">
                            {step.pitfalls.map((pitfall, idx) => (
                              <li key={idx}>{pitfall}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="simulator">
          <DKASimulator />
        </TabsContent>

        <TabsContent value="complications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Complications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {dkaData.complications.map((complication, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-muted rounded-lg border-l-4 border-destructive"
                  >
                    <p className="font-medium">{complication}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
