import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function InfectionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Infectious Diseases</h1>
        <p className="text-muted-foreground">
          HIV, TB, meningitis, pneumonia, and STI management pathways
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>HIV/AIDS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Acute HIV Syndrome</h4>
              <p className="text-sm">Fever, pharyngitis, rash, lymphadenopathy</p>
              <p className="text-sm text-muted-foreground mt-2">
                2-4 weeks post-exposure, high viral load
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">CD4 Count Milestones</h4>
              <p className="text-sm">
                &lt;200: PCP, toxoplasmosis<br />
                &lt;100: Cryptococcus, histoplasmosis<br />
                &lt;50: MAC, CMV
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tuberculosis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Badge>Latent TB</Badge>
            <p className="text-sm mt-2">Positive TST/IGRA, no symptoms, CXR normal</p>
            <p className="text-sm text-muted-foreground">
              Treatment: Isoniazid 9 months or rifampin 4 months
            </p>
          </div>
          <div className="mt-4">
            <Badge variant="destructive">Active TB</Badge>
            <p className="text-sm mt-2">
              Chronic cough, night sweats, weight loss, hemoptysis
            </p>
            <p className="text-sm text-muted-foreground">
              Treatment: RIPE (Rifampin, Isoniazid, Pyrazinamide, Ethambutol) for 2
              months, then RI for 4 months
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Meningitis Decision Tree</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 bg-blue-500/10 border-l-4 border-blue-500 rounded">
            <h4 className="font-semibold">Community-Acquired</h4>
            <p className="text-sm mt-2">
              <strong>Empiric:</strong> Vancomycin + Ceftriaxone (+ Ampicillin if
              &gt;50yo or immunocompromised)
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Covers: S. pneumoniae, N. meningitidis, Listeria
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold">CSF Patterns</h4>
            <p className="text-sm mt-2">
              <strong>Bacterial:</strong> ↑WBC (PMN), ↑protein, ↓glucose<br />
              <strong>Viral:</strong> ↑WBC (lymphocyte), normal/↑protein, normal glucose<br />
              <strong>TB/Fungal:</strong> ↑WBC (lymphocyte), ↑↑protein, ↓glucose
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>STI Quick Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-semibold">Gonorrhea/Chlamydia</p>
              <p className="text-sm">
                Tx: Ceftriaxone 500mg IM + Doxycycline 100mg BID × 7 days
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-semibold">Primary Syphilis</p>
              <p className="text-sm">Tx: Benzathine penicillin G 2.4 million units IM × 1</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-semibold">Genital Herpes (HSV)</p>
              <p className="text-sm">
                First episode: Acyclovir 400mg TID × 7-10 days
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
