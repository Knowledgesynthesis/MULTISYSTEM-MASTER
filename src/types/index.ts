// Core disease types
export interface Disease {
  id: string
  name: string
  category: DiseaseCategory
  diagnosticFeatures: string[]
  initialManagement: string[]
  labs: string[]
  redFlags: string[]
  complications: string[]
  systemicManifestations: string[]
  pathophysiology: string
  treatmentSequence?: TreatmentStep[]
}

export type DiseaseCategory =
  | 'sepsis'
  | 'endocrine'
  | 'autoimmune'
  | 'infectious'
  | 'toxicology'
  | 'dermatologic'

// Treatment steps
export interface TreatmentStep {
  order: number
  action: string
  rationale: string
  monitoring: string[]
  pitfalls: string[]
}

// Case types
export interface ClinicalCase {
  id: string
  title: string
  category: DiseaseCategory
  presentation: {
    chiefComplaint: string
    vitals: VitalSigns
    symptoms: string[]
    physicalExam: string[]
  }
  labs?: LabResult[]
  imaging?: ImagingResult[]
  diagnosis: string
  learningPoints: string[]
}

export interface VitalSigns {
  temperature: number
  heartRate: number
  bloodPressure: string
  respiratoryRate: number
  oxygenSaturation: number
  mentalStatus?: string
}

export interface LabResult {
  name: string
  value: string
  unit: string
  normal: string
  interpretation?: string
}

export interface ImagingResult {
  type: string
  findings: string[]
}

// Assessment types
export interface AssessmentQuestion {
  id: string
  type: 'mcq' | 'matching' | 'pattern' | 'drag-drop'
  category: DiseaseCategory
  question: string
  options?: string[]
  correctAnswer: string | string[]
  rationale: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

// Toxicology types
export interface Toxidrome {
  name: string
  signs: string[]
  treatment: string[]
  antidote?: string
  labs: string[]
}

// Simulator state types
export interface SepsisSimulatorState {
  timeElapsed: number
  fluidGiven: number
  antibioticsGiven: boolean
  lactate: number
  map: number
  urineOutput: number
  vasopressorUsed: boolean
}

export interface DKASimulatorState {
  timeElapsed: number
  fluidGiven: number
  insulinRate: number
  glucose: number
  potassium: number
  ph: number
  anionGap: number
  transitionedToSQ: boolean
}

// User progress
export interface UserProgress {
  completedCases: string[]
  assessmentScores: { [key: string]: number }
  modulesCompleted: string[]
  lastAccessed: Date
}
