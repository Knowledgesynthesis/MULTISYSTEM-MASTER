import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function DermatologyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dermatology - Systemic Clues</h1>
        <p className="text-muted-foreground">
          Recognize life-threatening skin conditions and systemic manifestations
        </p>
      </div>

      <Card className="bg-destructive/10 border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">
            Stevens-Johnson Syndrome (SJS) / Toxic Epidermal Necrolysis (TEN)
          </CardTitle>
          <CardDescription>Medical emergency - high mortality</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Clinical Features:</h4>
            <div className="space-y-2">
              <p className="text-sm">
                • Painful skin rash with targetoid lesions and blisters
              </p>
              <p className="text-sm">• Mucosal involvement (oral, genital, ocular)</p>
              <p className="text-sm">
                • Positive Nikolsky sign (skin sloughs with lateral pressure)
              </p>
              <p className="text-sm">
                • SJS: &lt;10% BSA, TEN: &gt;30% BSA involved
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Common Triggers:</h4>
            <div className="grid md:grid-cols-2 gap-2">
              <Badge variant="outline">Allopurinol</Badge>
              <Badge variant="outline">Sulfonamides</Badge>
              <Badge variant="outline">Anticonvulsants (phenytoin, carbamazepine)</Badge>
              <Badge variant="outline">NSAIDs</Badge>
              <Badge variant="outline">Antibiotics (beta-lactams)</Badge>
            </div>
          </div>
          <div className="p-4 bg-destructive/20 rounded-lg">
            <h4 className="font-semibold mb-2">Management:</h4>
            <p className="text-sm">
              ✓ Stop offending drug immediately<br />
              ✓ ICU/burn unit admission<br />
              ✓ Supportive care (fluids, wound care)<br />
              ✓ Consider IVIG or cyclosporine<br />
              ✓ Ophthalmology consult for eye involvement
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pemphigus Vulgaris</CardTitle>
          <CardDescription>Autoimmune blistering disorder</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold">Features:</h4>
            <p className="text-sm mt-2">
              • Flaccid bullae that rupture easily (vs tense in bullous pemphigoid)
            </p>
            <p className="text-sm">
              • Oral mucosal involvement common (painful erosions)
            </p>
            <p className="text-sm">• Positive Nikolsky sign</p>
          </div>
          <div>
            <h4 className="font-semibold">Diagnosis:</h4>
            <p className="text-sm mt-2">
              • Skin biopsy with DIF: IgG deposition in intercellular spaces
              ("tombstone" pattern)
            </p>
            <p className="text-sm">• Anti-desmoglein 3 antibodies</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <h4 className="font-semibold">Treatment:</h4>
            <p className="text-sm">
              High-dose corticosteroids + steroid-sparing agents (azathioprine,
              mycophenolate)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bullous Pemphigoid</CardTitle>
          <CardDescription>Most common autoimmune blistering disease</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold">Features:</h4>
            <p className="text-sm mt-2">
              • Tense bullae on erythematous base (vs flaccid in pemphigus)
            </p>
            <p className="text-sm">• Pruritic urticarial plaques</p>
            <p className="text-sm">
              • Mucosal involvement less common than pemphigus
            </p>
            <p className="text-sm">• Negative Nikolsky sign</p>
          </div>
          <div>
            <h4 className="font-semibold">Diagnosis:</h4>
            <p className="text-sm mt-2">
              • Skin biopsy with DIF: Linear IgG/C3 at basement membrane zone
            </p>
            <p className="text-sm">• Anti-BP180/BP230 antibodies</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <h4 className="font-semibold">Treatment:</h4>
            <p className="text-sm">
              Topical or systemic corticosteroids (milder than pemphigus vulgaris)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Erythema Multiforme</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold">Features:</h4>
            <p className="text-sm mt-2">
              • Target lesions ("bulls-eye" appearance) on palms/soles
            </p>
            <p className="text-sm">• Mucosal involvement variable</p>
          </div>
          <div>
            <h4 className="font-semibold">Common Triggers:</h4>
            <div className="grid md:grid-cols-2 gap-2 mt-2">
              <div className="p-2 bg-muted rounded">
                <p className="text-sm font-medium">HSV infection (most common)</p>
              </div>
              <div className="p-2 bg-muted rounded">
                <p className="text-sm font-medium">Mycoplasma pneumoniae</p>
              </div>
              <div className="p-2 bg-muted rounded">
                <p className="text-sm font-medium">Medications</p>
              </div>
            </div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <h4 className="font-semibold">Treatment:</h4>
            <p className="text-sm">
              Self-limited; treat underlying cause. Supportive care for mild cases.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-500/10 border-blue-500/50">
        <CardHeader>
          <CardTitle>Key Differentiating Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Feature</th>
                  <th className="text-left p-2">Pemphigus Vulgaris</th>
                  <th className="text-left p-2">Bullous Pemphigoid</th>
                  <th className="text-left p-2">SJS/TEN</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">Blisters</td>
                  <td className="p-2">Flaccid</td>
                  <td className="p-2">Tense</td>
                  <td className="p-2">Flaccid, erosions</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Nikolsky</td>
                  <td className="p-2">Positive</td>
                  <td className="p-2">Negative</td>
                  <td className="p-2">Positive</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Mucosa</td>
                  <td className="p-2">Very common</td>
                  <td className="p-2">Less common</td>
                  <td className="p-2">Severe, multi-site</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Trigger</td>
                  <td className="p-2">Autoimmune</td>
                  <td className="p-2">Autoimmune</td>
                  <td className="p-2">Medication</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
