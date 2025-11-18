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
import { Button } from '@/components/ui/button'
import { sleData, raData } from '@/data/diseases/autoimmune'

export function AutoimmunePage() {
  const [activeDisease, setActiveDisease] = useState<'sle' | 'ra'>('sle')
  const [activeTab, setActiveTab] = useState('overview')

  const currentDisease = activeDisease === 'sle' ? sleData : raData

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Autoimmune Diseases</h1>
        <p className="text-muted-foreground">
          Master systemic autoimmune conditions with multiorgan involvement
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          variant={activeDisease === 'sle' ? 'default' : 'outline'}
          onClick={() => setActiveDisease('sle')}
        >
          SLE
        </Button>
        <Button
          variant={activeDisease === 'ra' ? 'default' : 'outline'}
          onClick={() => setActiveDisease('ra')}
        >
          Rheumatoid Arthritis
        </Button>
      </div>

      <Card className="bg-primary/5">
        <CardHeader>
          <CardTitle>{currentDisease.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{currentDisease.pathophysiology}</p>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Clinical Features</TabsTrigger>
          <TabsTrigger value="labs">Laboratory</TabsTrigger>
          <TabsTrigger value="management">Management</TabsTrigger>
          <TabsTrigger value="complications">Complications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Diagnostic Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {currentDisease.diagnosticFeatures.map((feature, idx) => (
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
              <CardTitle>Systemic Manifestations</CardTitle>
              <CardDescription>
                Multi-organ involvement pattern
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {currentDisease.systemicManifestations.map((manifestation, idx) => (
                  <div key={idx} className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{manifestation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="labs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laboratory Studies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {currentDisease.labs.map((lab, idx) => (
                  <div key={idx} className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{lab}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {activeDisease === 'sle' && (
            <Card className="bg-blue-500/10 border-blue-500/50">
              <CardHeader>
                <CardTitle>SLE-Specific Lab Patterns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  • <strong>ANA</strong>: Sensitive (95-100%) but not specific
                </p>
                <p className="text-sm">
                  • <strong>Anti-dsDNA</strong>: Highly specific, correlates with
                  disease activity and nephritis
                </p>
                <p className="text-sm">
                  • <strong>Anti-Smith</strong>: Most specific for SLE
                </p>
                <p className="text-sm">
                  • <strong>Complement (C3/C4)</strong>: Low during active disease,
                  especially with nephritis
                </p>
                <p className="text-sm">
                  • <strong>ESR vs CRP</strong>: ESR typically elevated, CRP often
                  normal (unless serositis)
                </p>
              </CardContent>
            </Card>
          )}

          {activeDisease === 'ra' && (
            <Card className="bg-blue-500/10 border-blue-500/50">
              <CardHeader>
                <CardTitle>RA-Specific Lab Patterns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  • <strong>RF</strong>: Positive in 70-80%, but not specific
                </p>
                <p className="text-sm">
                  • <strong>Anti-CCP</strong>: Highly specific (95%), predicts erosive
                  disease
                </p>
                <p className="text-sm">
                  • <strong>Acute phase reactants</strong>: ESR and CRP correlate with
                  disease activity
                </p>
                <p className="text-sm">
                  • <strong>Anemia</strong>: Anemia of chronic disease common
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-destructive">Red Flags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {currentDisease.redFlags.map((flag, idx) => (
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
              <CardTitle>Treatment Approach</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentDisease.initialManagement.map((step, idx) => (
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
        </TabsContent>

        <TabsContent value="complications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Complications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {currentDisease.complications.map((complication, idx) => (
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
