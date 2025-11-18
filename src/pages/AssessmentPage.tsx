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

const assessmentQuestions = [
  {
    id: 'q1_sepsis',
    category: 'sepsis',
    type: 'mcq',
    difficulty: 'intermediate',
    question:
      'A 68-year-old patient presents with fever, hypotension (BP 82/45), and lactate 4.5 mmol/L. You have given 2L of crystalloid. BP is now 88/50, MAP 63. What is the NEXT best step?',
    options: [
      'Give another 2L fluid bolus',
      'Start norepinephrine to target MAP ≥65',
      'Order a CT scan to find source',
      'Wait and reassess in 1 hour',
    ],
    correctAnswer: 'Start norepinephrine to target MAP ≥65',
    rationale:
      'After adequate fluid resuscitation (30 mL/kg), if MAP remains <65 mmHg, vasopressors should be started. Norepinephrine is first-line for septic shock. While source control is important, hemodynamic stabilization is the priority.',
  },
  {
    id: 'q2_dka',
    category: 'endocrine',
    type: 'mcq',
    difficulty: 'intermediate',
    question:
      'A patient with DKA has received 1.5L NS. Labs show: Glucose 420, pH 7.22, K+ 3.1 mEq/L. What should you do BEFORE starting insulin?',
    options: [
      'Start insulin immediately - DKA is an emergency',
      'Give potassium and recheck level before insulin',
      'Give bicarbonate to correct acidosis first',
      'Continue fluids and start insulin when glucose <300',
    ],
    correctAnswer: 'Give potassium and recheck level before insulin',
    rationale:
      'Never start insulin when K+ <3.3 mEq/L. Insulin drives potassium into cells, which could cause life-threatening hypokalemia and cardiac arrhythmias. Replete potassium first and ensure K+ ≥3.3 before starting insulin.',
  },
  {
    id: 'q3_sle',
    category: 'autoimmune',
    type: 'mcq',
    difficulty: 'advanced',
    question:
      'A patient with known SLE presents with worsening fatigue and leg edema. Labs show Cr 2.8 (baseline 1.0), urinalysis with RBC casts, C3 48 (low), C4 6 (low), and anti-dsDNA positive. What is the most likely diagnosis?',
    options: [
      'SLE flare without organ involvement',
      'Lupus nephritis',
      'Drug-induced lupus',
      'Nephrotic syndrome from minimal change disease',
    ],
    correctAnswer: 'Lupus nephritis',
    rationale:
      'RBC casts are pathognomonic for glomerulonephritis. Combined with elevated Cr, proteinuria, low complement levels, and positive anti-dsDNA (which correlates with nephritis), this indicates active lupus nephritis requiring aggressive immunosuppression.',
  },
  {
    id: 'q4_tox',
    category: 'toxicology',
    type: 'mcq',
    difficulty: 'intermediate',
    question:
      'A patient presents with altered mental status, anion gap metabolic acidosis (gap 24), and osmolar gap of 18. Visual complaints noted. What is the most likely toxin?',
    options: [
      'Ethylene glycol',
      'Methanol',
      'Isopropanol',
      'Salicylates',
    ],
    correctAnswer: 'Methanol',
    rationale:
      'Methanol poisoning presents with high anion gap metabolic acidosis, elevated osmolar gap, and visual symptoms (optic nerve toxicity from formic acid). Treatment: fomepizole and hemodialysis. Ethylene glycol causes similar lab findings but with renal symptoms and calcium oxalate crystals.',
  },
  {
    id: 'q5_derm',
    category: 'dermatologic',
    type: 'mcq',
    difficulty: 'advanced',
    question:
      'A patient on allopurinol for gout develops painful skin lesions with mucosal involvement and positive Nikolsky sign. 25% BSA is affected. What is the diagnosis?',
    options: [
      'Pemphigus vulgaris',
      'Bullous pemphigoid',
      'Stevens-Johnson syndrome/TEN',
      'Erythema multiforme major',
    ],
    correctAnswer: 'Stevens-Johnson syndrome/TEN',
    rationale:
      'SJS/TEN is characterized by painful rash with mucosal involvement, positive Nikolsky sign, and medication trigger (allopurinol is a common culprit). 25% BSA involvement = SJS-TEN overlap. This is a medical emergency requiring ICU admission and immediate discontinuation of allopurinol.',
  },
]

export function AssessmentPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showRationale, setShowRationale] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const { recordAssessmentScore } = useAppStore()

  const currentQuestion = assessmentQuestions[currentQuestionIndex]

  const handleAnswerSelect = (answer: string) => {
    if (!showRationale) {
      setSelectedAnswer(answer)
    }
  }

  const handleSubmit = () => {
    if (selectedAnswer) {
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer
      setScore((prev) => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        total: prev.total + 1,
      }))
      setShowRationale(true)

      // Record score
      recordAssessmentScore(
        currentQuestion.id,
        isCorrect ? 100 : 0
      )
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowRationale(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedAnswer(null)
      setShowRationale(false)
    }
  }

  const handleReset = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowRationale(false)
    setScore({ correct: 0, total: 0 })
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Assessment</h1>
        <p className="text-muted-foreground">
          Test your knowledge with evidence-based clinical questions
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <div className="flex gap-2">
              <Badge>{currentQuestion.category}</Badge>
              <Badge variant="outline">{currentQuestion.difficulty}</Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
            </div>
          </div>
          <CardTitle>Score: {score.correct} / {score.total}</CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswer === option
            const isCorrect = option === currentQuestion.correctAnswer
            const showCorrect = showRationale && isCorrect
            const showIncorrect = showRationale && isSelected && !isCorrect

            return (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(option)}
                disabled={showRationale}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showCorrect
                    ? 'bg-green-500/20 border-green-500'
                    : showIncorrect
                    ? 'bg-destructive/20 border-destructive'
                    : isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                } ${showRationale ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showCorrect && <span className="text-green-500 font-bold">✓</span>}
                  {showIncorrect && <span className="text-destructive font-bold">✗</span>}
                </div>
              </button>
            )
          })}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button
          onClick={handleSubmit}
          disabled={!selectedAnswer || showRationale}
        >
          Submit Answer
        </Button>
        <Button
          onClick={handlePrevious}
          variant="outline"
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          variant="outline"
          disabled={currentQuestionIndex === assessmentQuestions.length - 1 || !showRationale}
        >
          Next Question
        </Button>
        <Button onClick={handleReset} variant="outline">
          Reset Quiz
        </Button>
      </div>

      {showRationale && (
        <Card className="bg-blue-500/10 border-blue-500">
          <CardHeader>
            <CardTitle>Explanation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{currentQuestion.rationale}</p>
          </CardContent>
        </Card>
      )}

      {score.total === assessmentQuestions.length && (
        <Card className="bg-primary/10 border-primary">
          <CardHeader>
            <CardTitle>Quiz Complete!</CardTitle>
            <CardDescription>
              Final Score: {score.correct} / {score.total} (
              {Math.round((score.correct / score.total) * 100)}%)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {score.correct === score.total
                ? 'Perfect score! Excellent work!'
                : score.correct / score.total >= 0.7
                ? 'Good job! Review the questions you missed for improvement.'
                : 'Keep studying! Review the material and try again.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
