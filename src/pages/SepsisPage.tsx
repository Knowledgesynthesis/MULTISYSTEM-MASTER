import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { sepsisData } from '@/data/diseases/sepsis'
import { SepsisSimulator } from '@/components/modules/sepsis/SepsisSimulator'

export function SepsisPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{sepsisData.name}</h1>
        <p className="text-muted-foreground">
          Life-threatening organ dysfunction caused by dysregulated host response to
          infection
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
              <p className="text-muted-foreground">{sepsisData.pathophysiology}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Systemic Manifestations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sepsisData.systemicManifestations.map((manifestation, idx) => (
                  <div key={idx} className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{manifestation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diagnosis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Diagnostic Features</CardTitle>
              <CardDescription>Key clinical and laboratory findings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {sepsisData.diagnosticFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-3 bg-muted rounded-lg"
                  >
                    <Badge variant="outline" className="mt-0.5">
                      {idx + 1}
                    </Badge>
                    <p className="text-sm flex-1">{feature}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Laboratory Studies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sepsisData.labs.map((lab, idx) => (
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
              <CardDescription>Warning signs requiring immediate action</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sepsisData.redFlags.map((flag, idx) => (
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
              <CardTitle>Initial Management</CardTitle>
              <CardDescription>First steps in sepsis care</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sepsisData.initialManagement.map((step, idx) => (
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

          {sepsisData.treatmentSequence && (
            <Card>
              <CardHeader>
                <CardTitle>Detailed Treatment Sequence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sepsisData.treatmentSequence.map((step) => (
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
          <SepsisSimulator />
        </TabsContent>

        <TabsContent value="complications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Complications</CardTitle>
              <CardDescription>
                Potential adverse outcomes and how to prevent them
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {sepsisData.complications.map((complication, idx) => (
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
