import { Toxidrome } from '@/types'

export const toxidromes: Toxidrome[] = [
  {
    name: 'Sympathomimetic',
    signs: [
      'Tachycardia',
      'Hypertension',
      'Mydriasis (dilated pupils)',
      'Diaphoresis',
      'Hyperthermia',
      'Agitation, seizures',
    ],
    treatment: [
      'Benzodiazepines for agitation/seizures',
      'Active cooling if hyperthermic',
      'Avoid beta-blockers (unopposed alpha effect)',
    ],
    labs: [
      'Urine drug screen (amphetamines, cocaine)',
      'CK (rhabdomyolysis)',
      'Troponin (cocaine-induced MI)',
    ],
  },
  {
    name: 'Anticholinergic',
    signs: [
      'Hyperthermia',
      'Mydriasis',
      'Dry skin and mucous membranes',
      'Urinary retention',
      'Decreased bowel sounds',
      'Delirium, agitation',
      '"Mad as a hatter, blind as a bat, red as a beet, hot as a hare, dry as a bone"',
    ],
    treatment: [
      'Supportive care',
      'Benzodiazepines for agitation',
      'Physostigmine (only if severe, pure anticholinergic)',
    ],
    labs: ['ECG (QRS/QTc prolongation)', 'Drug screen if unclear'],
  },
  {
    name: 'Cholinergic',
    signs: [
      'DUMBBELSS: Diarrhea, Urination, Miosis, Bronchospasm/Bronchorrhea, Emesis, Lacrimation, Salivation, Sweating',
      'Bradycardia',
      'Fasciculations',
      'Weakness',
    ],
    treatment: [
      'Atropine (dries secretions, reverses bradycardia)',
      'Pralidoxime (if organophosphate poisoning)',
      'Decontamination (remove clothes)',
    ],
    labs: [
      'RBC/plasma cholinesterase (low in organophosphates)',
      'ABG (respiratory failure)',
    ],
  },
  {
    name: 'Opioid',
    signs: [
      'Miosis (pinpoint pupils)',
      'Respiratory depression',
      'Decreased mental status',
      'Hypotension',
      'Decreased bowel sounds',
    ],
    treatment: [
      'Naloxone (0.4-2 mg IV, titrate to respiratory effort)',
      'Airway support/ventilation',
      'Monitor for re-sedation (naloxone shorter half-life)',
    ],
    labs: ['ABG (hypercapnia)', 'Urine drug screen'],
  },
  {
    name: 'Sedative-Hypnotic',
    signs: [
      'CNS depression',
      'Slurred speech',
      'Ataxia',
      'Respiratory depression (severe cases)',
      'Hypotension',
    ],
    treatment: [
      'Supportive care',
      'Flumazenil (benzodiazepines - use cautiously, seizure risk)',
      'Airway protection if needed',
    ],
    labs: ['Urine drug screen', 'ABG if respiratory depression'],
  },
]

export const commonPoisonings = [
  {
    toxin: 'Acetaminophen',
    presentation:
      'Often asymptomatic early, then nausea/vomiting, followed by hepatotoxicity (24-72h)',
    diagnosis: 'Serum acetaminophen level at 4 hours post-ingestion',
    treatment:
      'N-acetylcysteine (NAC) if above treatment line on Rumack-Matthew nomogram',
    monitoring: ['AST/ALT', 'INR', 'Bilirubin', 'Acetaminophen levels'],
    redFlags: [
      'Ingestion >150 mg/kg',
      'Elevated AST/ALT',
      'INR elevation (hepatotoxicity)',
    ],
  },
  {
    toxin: 'Salicylates',
    presentation:
      'Tinnitus, nausea, vomiting, tachypnea, confusion, mixed respiratory alkalosis and metabolic acidosis',
    diagnosis:
      'Salicylate level >30 mg/dL, ABG shows respiratory alkalosis + high anion gap metabolic acidosis',
    treatment:
      'IV fluids, sodium bicarbonate (alkalinize urine, enhance excretion), hemodialysis if severe',
    monitoring: ['Salicylate levels', 'ABG', 'Electrolytes', 'Glucose'],
    redFlags: [
      'Altered mental status',
      'Severe acidosis',
      'Salicylate >100 mg/dL',
    ],
  },
  {
    toxin: 'Toxic Alcohols (Methanol, Ethylene Glycol)',
    presentation:
      'Initially "drunk" without ethanol smell, then high anion gap metabolic acidosis, elevated osmolar gap',
    diagnosis:
      'Anion gap + osmolar gap, vision changes (methanol), flank pain/crystals (ethylene glycol)',
    treatment:
      'Fomepizole (alcohol dehydrogenase inhibitor), hemodialysis, IV fluids, thiamine/folate/pyridoxine',
    monitoring: ['Anion gap', 'Osmolar gap', 'Renal function', 'Vision'],
    redFlags: [
      'Osmolar gap >10',
      'Severe anion gap acidosis',
      'Visual changes',
      'Renal failure',
    ],
  },
]
