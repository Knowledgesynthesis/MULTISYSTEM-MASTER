import { Disease } from '@/types'

export const dkaData: Disease = {
  id: 'dka_core',
  name: 'Diabetic Ketoacidosis (DKA)',
  category: 'endocrine',
  pathophysiology:
    'DKA results from absolute or relative insulin deficiency combined with excess counter-regulatory hormones (glucagon, cortisol, catecholamines). This leads to accelerated lipolysis, ketogenesis, hyperglycemia, osmotic diuresis, and metabolic acidosis.',
  diagnosticFeatures: [
    'Hyperglycemia (glucose typically >250 mg/dL)',
    'Anion gap metabolic acidosis (pH <7.3)',
    'Ketonemia or ketonuria',
    'Bicarbonate <18 mEq/L',
    'Nausea, vomiting, abdominal pain',
    'Kussmaul respirations (deep, rapid breathing)',
    'Fruity breath odor (acetone)',
  ],
  systemicManifestations: [
    'Cardiovascular: Tachycardia, hypotension (from dehydration)',
    'Respiratory: Kussmaul respirations to compensate acidosis',
    'GI: Nausea, vomiting, abdominal pain ("pseudoperitonitis")',
    'Renal: Polyuria initially, then oliguria with severe dehydration',
    'CNS: Altered mental status, cerebral edema (rare, pediatric)',
    'Metabolic: Severe electrolyte disturbances',
  ],
  initialManagement: [
    'Aggressive IV fluid resuscitation (1-1.5 L NS first hour)',
    'Correct potassium BEFORE starting insulin',
    'Start insulin infusion (0.1 units/kg/h)',
    'Monitor glucose hourly, electrolytes q2-4h',
    'Identify and treat precipitating cause',
  ],
  labs: [
    'BMP (glucose, potassium, bicarbonate, anion gap)',
    'ABG or VBG (pH, pCO2, bicarbonate)',
    'Serum or urine ketones (beta-hydroxybutyrate preferred)',
    'Serum osmolality',
    'Magnesium, phosphate',
    'CBC (evaluate for infection)',
  ],
  redFlags: [
    'Potassium <3.3 mEq/L (hold insulin, replace K+)',
    'pH <7.0 (severe acidosis)',
    'Altered mental status (evaluate for cerebral edema)',
    'Pregnancy (DKA in pregnancy is an emergency)',
    'Abdominal pain out of proportion (consider other causes)',
  ],
  complications: [
    'Cerebral edema (especially in children)',
    'Hypokalemia (from insulin and correction of acidosis)',
    'Hypoglycemia (from excessive insulin)',
    'Acute kidney injury',
    'ARDS',
    'Thrombotic events',
  ],
  treatmentSequence: [
    {
      order: 1,
      action: 'Confirm diagnosis: hyperglycemia + anion gap acidosis + ketones',
      rationale: 'DKA requires all three components',
      monitoring: ['Glucose', 'pH', 'Anion gap', 'Ketones'],
      pitfalls: ['Missing euglycemic DKA (SGLT2 inhibitors)'],
    },
    {
      order: 2,
      action: 'IV fluid resuscitation: 1-1.5 L NS in first hour',
      rationale:
        'Correct hypovolemia and improve tissue perfusion before insulin',
      monitoring: ['Vital signs', 'Urine output', 'Serum osmolality'],
      pitfalls: ['Starting insulin before fluids', 'Fluid overload'],
    },
    {
      order: 3,
      action: 'Check potassium level - do NOT start insulin if K+ <3.3 mEq/L',
      rationale: 'Insulin drives K+ into cells, risking life-threatening hypokalemia',
      monitoring: ['Potassium q2-4h'],
      pitfalls: ['Starting insulin without checking K+', 'Under-repleting K+'],
    },
    {
      order: 4,
      action: 'Potassium replacement if K+ <5.3 mEq/L (20-30 mEq/L in fluids)',
      rationale: 'Most patients are total body K+ depleted despite normal levels',
      monitoring: ['Potassium every 2-4 hours', 'ECG if severe abnormalities'],
      pitfalls: ['Inadequate K+ supplementation'],
    },
    {
      order: 5,
      action: 'Start regular insulin infusion: 0.1 units/kg/h (or 0.14 if no bolus)',
      rationale: 'Suppress ketogenesis and correct hyperglycemia',
      monitoring: [
        'Glucose hourly',
        'pH/bicarbonate q2-4h',
        'Anion gap',
        'Ketones',
      ],
      pitfalls: ['Insulin bolus can cause hypokalemia', 'Stopping insulin too early'],
    },
    {
      order: 6,
      action:
        'Add dextrose to fluids when glucose <200-250 mg/dL (continue insulin!)',
      rationale: 'Ketoacidosis resolution takes longer than glucose normalization',
      monitoring: ['Glucose', 'Anion gap closure', 'pH normalization'],
      pitfalls: ['Stopping insulin when glucose normalizes'],
    },
    {
      order: 7,
      action:
        'Transition to subcutaneous insulin when: pH >7.3, bicarb >15, anion gap closed',
      rationale: 'Safe to transition once ketoacidosis resolved',
      monitoring: ['Glucose', 'Continue monitoring for rebound'],
      pitfalls: [
        'Stopping IV insulin before SQ insulin onboard (overlap 1-2 hours)',
      ],
    },
  ],
}
