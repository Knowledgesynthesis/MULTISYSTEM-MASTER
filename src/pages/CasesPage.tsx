import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/stores/appStore'

const syntheticCases = [
  {
    id: 'case_sepsis_1',
    title: 'Septic Shock in the ED',
    category: 'sepsis',
    difficulty: 'intermediate',
    presentation: {
      chiefComplaint: 'Fever and confusion for 2 days',
      vitals: {
        temperature: 38.9,
        heartRate: 125,
        bloodPressure: '85/50',
        respiratoryRate: 28,
        oxygenSaturation: 92,
        mentalStatus: 'Confused, follows simple commands',
      },
      symptoms: [
        'Productive cough with purulent sputum',
        'Decreased urine output',
        'Generalized weakness',
      ],
      physicalExam: [
        'Crackles in right lower lung',
        'Warm, well-perfused extremities',
        'No rash or skin lesions',
      ],
    },
    labs: [
      { name: 'WBC', value: '18.5', unit: 'K/μL', normal: '4-11' },
      { name: 'Lactate', value: '4.2', unit: 'mmol/L', normal: '<2' },
      { name: 'Creatinine', value: '1.8', unit: 'mg/dL', normal: '0.6-1.2' },
      { name: 'Procalcitonin', value: '15', unit: 'ng/mL', normal: '<0.5' },
    ],
    diagnosis: 'Septic shock secondary to community-acquired pneumonia',
    learningPoints: [
      'Early recognition using qSOFA criteria',
      'Importance of 30 mL/kg fluid bolus within 3 hours',
      'Antibiotics within 1 hour improves survival',
      'Lactate clearance as a resuscitation goal',
    ],
  },
  {
    id: 'case_dka_1',
    title: 'New-Onset Type 1 Diabetes',
    category: 'endocrine',
    difficulty: 'intermediate',
    presentation: {
      chiefComplaint: 'Nausea, vomiting, and abdominal pain for 1 day',
      vitals: {
        temperature: 37.2,
        heartRate: 118,
        bloodPressure: '98/62',
        respiratoryRate: 26,
        oxygenSaturation: 99,
        mentalStatus: 'Alert, oriented',
      },
      symptoms: [
        'Polyuria and polydipsia for 2 weeks',
        '15 lb weight loss',
        'Fruity breath odor',
        'Deep, rapid breathing',
      ],
      physicalExam: [
        'Dry mucous membranes',
        'Decreased skin turgor',
        'Diffuse abdominal tenderness without guarding',
      ],
    },
    labs: [
      { name: 'Glucose', value: '485', unit: 'mg/dL', normal: '70-100' },
      { name: 'pH', value: '7.18', unit: '', normal: '7.35-7.45' },
      { name: 'Bicarbonate', value: '11', unit: 'mEq/L', normal: '22-28' },
      { name: 'Potassium', value: '5.2', unit: 'mEq/L', normal: '3.5-5.0' },
      { name: 'Anion Gap', value: '26', unit: '', normal: '8-12' },
      { name: 'Beta-hydroxybutyrate', value: '8.5', unit: 'mmol/L', normal: '<0.5' },
    ],
    diagnosis: 'Diabetic ketoacidosis (DKA) - new-onset type 1 diabetes',
    learningPoints: [
      'Check potassium BEFORE starting insulin',
      'Fluid resuscitation precedes insulin',
      'Continue insulin even after glucose normalizes',
      'Resolution requires pH >7.3 AND anion gap closure',
    ],
  },
  {
    id: 'case_sle_1',
    title: 'Lupus Nephritis Flare',
    category: 'autoimmune',
    difficulty: 'advanced',
    presentation: {
      chiefComplaint: 'Facial rash and leg swelling',
      vitals: {
        temperature: 37.8,
        heartRate: 88,
        bloodPressure: '145/92',
        respiratoryRate: 16,
        oxygenSaturation: 98,
      },
      symptoms: [
        'Photosensitive malar rash',
        'Bilateral leg edema',
        'Fatigue and joint pain',
        'Dark urine',
      ],
      physicalExam: [
        'Malar rash sparing nasolabial folds',
        'Bilateral pitting edema to knees',
        'Polyarthritis of hands and wrists',
      ],
    },
    labs: [
      { name: 'ANA', value: 'Positive 1:640', unit: '', normal: 'Negative' },
      { name: 'Anti-dsDNA', value: 'Positive 1:320', unit: '', normal: 'Negative' },
      { name: 'C3', value: '45', unit: 'mg/dL', normal: '90-180' },
      { name: 'C4', value: '8', unit: 'mg/dL', normal: '10-40' },
      { name: 'Creatinine', value: '2.1', unit: 'mg/dL', normal: '0.6-1.2' },
      { name: 'Urinalysis', value: '3+ protein, RBC casts', unit: '', normal: 'Negative' },
    ],
    diagnosis: 'SLE with active lupus nephritis',
    learningPoints: [
      'Low complement levels indicate active disease',
      'RBC casts are pathognomonic for glomerulonephritis',
      'Anti-dsDNA correlates with nephritis activity',
      'Aggressive immunosuppression needed for lupus nephritis',
    ],
  },
]

export function CasesPage() {
  const [selectedCase, setSelectedCase] = useState<typeof syntheticCases[0] | null>(
    null
  )
  const [showDiagnosis, setShowDiagnosis] = useState(false)
  const { completeCase, userProgress } = useAppStore()

  const handleCaseSelect = (caseData: typeof syntheticCases[0]) => {
    setSelectedCase(caseData)
    setShowDiagnosis(false)
  }

  const handleRevealDiagnosis = () => {
    setShowDiagnosis(true)
    if (selectedCase) {
      completeCase(selectedCase.id)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Clinical Cases</h1>
        <p className="text-muted-foreground">
          Practice integrated reasoning with synthetic multisystem cases
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <h3 className="font-semibold">Available Cases</h3>
          {syntheticCases.map((case_) => (
            <Card
              key={case_.id}
              className={`cursor-pointer transition-all ${
                selectedCase?.id === case_.id
                  ? 'ring-2 ring-primary'
                  : 'hover:shadow-md'
              }`}
              onClick={() => handleCaseSelect(case_)}
            >
              <CardHeader className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge>{case_.category}</Badge>
                  {userProgress.completedCases.includes(case_.id) && (
                    <Badge variant="secondary">Completed</Badge>
                  )}
                </div>
                <CardTitle className="text-base">{case_.title}</CardTitle>
                <CardDescription className="text-xs">
                  Difficulty: {case_.difficulty}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="md:col-span-2">
          {selectedCase ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedCase.title}</CardTitle>
                  <CardDescription>
                    {selectedCase.presentation.chiefComplaint}
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vital Signs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-muted rounded">
                      <p className="text-xs text-muted-foreground">Temperature</p>
                      <p className="font-semibold">
                        {selectedCase.presentation.vitals.temperature}°C
                      </p>
                    </div>
                    <div className="p-3 bg-muted rounded">
                      <p className="text-xs text-muted-foreground">Heart Rate</p>
                      <p className="font-semibold">
                        {selectedCase.presentation.vitals.heartRate} bpm
                      </p>
                    </div>
                    <div className="p-3 bg-muted rounded">
                      <p className="text-xs text-muted-foreground">BP</p>
                      <p className="font-semibold">
                        {selectedCase.presentation.vitals.bloodPressure}
                      </p>
                    </div>
                    <div className="p-3 bg-muted rounded">
                      <p className="text-xs text-muted-foreground">Resp Rate</p>
                      <p className="font-semibold">
                        {selectedCase.presentation.vitals.respiratoryRate}/min
                      </p>
                    </div>
                    <div className="p-3 bg-muted rounded">
                      <p className="text-xs text-muted-foreground">SpO2</p>
                      <p className="font-semibold">
                        {selectedCase.presentation.vitals.oxygenSaturation}%
                      </p>
                    </div>
                    {selectedCase.presentation.vitals.mentalStatus && (
                      <div className="p-3 bg-muted rounded">
                        <p className="text-xs text-muted-foreground">Mental Status</p>
                        <p className="font-semibold text-xs">
                          {selectedCase.presentation.vitals.mentalStatus}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>History & Physical</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-2">Symptoms:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedCase.presentation.symptoms.map((symptom, idx) => (
                        <li key={idx} className="text-sm">
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Physical Exam:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedCase.presentation.physicalExam.map((finding, idx) => (
                        <li key={idx} className="text-sm">
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {selectedCase.labs && (
                <Card>
                  <CardHeader>
                    <CardTitle>Laboratory Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedCase.labs.map((lab, idx) => (
                        <div key={idx} className="p-3 bg-muted rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">{lab.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Normal: {lab.normal}
                              </p>
                            </div>
                            <p className="text-lg font-bold">
                              {lab.value} {lab.unit}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-3">
                <Button onClick={handleRevealDiagnosis}>
                  {showDiagnosis ? 'Hide' : 'Reveal'} Diagnosis & Learning Points
                </Button>
              </div>

              {showDiagnosis && (
                <Card className="bg-primary/5 border-primary">
                  <CardHeader>
                    <CardTitle>Diagnosis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-lg font-semibold">{selectedCase.diagnosis}</p>
                    <div>
                      <h4 className="font-semibold mb-2">Key Learning Points:</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {selectedCase.learningPoints.map((point, idx) => (
                          <li key={idx} className="text-sm">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center text-muted-foreground p-12">
                <p>Select a case to begin</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
