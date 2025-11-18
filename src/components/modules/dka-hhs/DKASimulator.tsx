import { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/stores/appStore'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export function DKASimulator() {
  const { dkaSimulator, updateDKASimulator, resetDKASimulator } = useAppStore()
  const [isRunning, setIsRunning] = useState(false)
  const [chartData, setChartData] = useState<any[]>([])
  const [feedback, setFeedback] = useState<string[]>([])
  const [phase, setPhase] = useState<'initial' | 'fluids' | 'insulin' | 'resolution'>('initial')

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        updateDKASimulator({
          timeElapsed: dkaSimulator.timeElapsed + 1,
        })

        // Simulate physiologic changes
        let newGlucose = dkaSimulator.glucose
        let newPotassium = dkaSimulator.potassium
        let newPH = dkaSimulator.ph
        let newAnionGap = dkaSimulator.anionGap

        // Effects of fluid resuscitation
        if (dkaSimulator.fluidGiven >= 1000 && phase === 'initial') {
          setPhase('fluids')
          setFeedback(prev => [...prev, '✓ Fluid resuscitation initiated'])
        }

        // Check potassium before allowing insulin
        if (dkaSimulator.insulinRate > 0 && dkaSimulator.potassium < 3.3) {
          setFeedback(prev => [
            ...prev,
            '⚠ DANGER: Potassium too low! Stop insulin immediately!',
          ])
          updateDKASimulator({ insulinRate: 0 })
        }

        // Effects of insulin
        if (dkaSimulator.insulinRate > 0 && dkaSimulator.potassium >= 3.3) {
          newGlucose = Math.max(150, dkaSimulator.glucose - 15)
          newPH = Math.min(7.35, dkaSimulator.ph + 0.01)
          newAnionGap = Math.max(10, dkaSimulator.anionGap - 0.5)
          newPotassium = Math.max(3.0, dkaSimulator.potassium - 0.05)
        }

        // Potassium replacement effect
        if (dkaSimulator.fluidGiven > 1000) {
          newPotassium = Math.min(5.0, newPotassium + 0.02)
        }

        updateDKASimulator({
          glucose: Math.round(newGlucose),
          potassium: parseFloat(newPotassium.toFixed(1)),
          ph: parseFloat(newPH.toFixed(2)),
          anionGap: Math.round(newAnionGap),
        })

        // Update chart data
        setChartData((prev) => [
          ...prev,
          {
            time: dkaSimulator.timeElapsed,
            glucose: newGlucose,
            pH: newPH,
            K: newPotassium,
          },
        ])

        // Check for resolution
        if (newPH > 7.3 && newAnionGap < 12 && !dkaSimulator.transitionedToSQ) {
          setPhase('resolution')
          setFeedback(prev => [
            ...prev,
            '✓ DKA resolved! Consider transitioning to subcutaneous insulin.',
          ])
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isRunning, dkaSimulator, updateDKASimulator, phase])

  const giveFluid = () => {
    const newFluidTotal = dkaSimulator.fluidGiven + 1000
    updateDKASimulator({ fluidGiven: newFluidTotal })

    const newFeedback = [...feedback]
    if (newFluidTotal === 1000) {
      newFeedback.push(
        '✓ Started IV fluids - Good first step! Check potassium before insulin.'
      )
    } else if (newFluidTotal === 2000) {
      newFeedback.push('✓ Adequate initial fluid resuscitation')
    }
    setFeedback(newFeedback)
  }

  const startInsulin = () => {
    if (dkaSimulator.potassium < 3.3) {
      setFeedback(prev => [
        ...prev,
        '❌ CRITICAL ERROR: Cannot start insulin with K+ < 3.3 mEq/L! Risk of fatal arrhythmia!',
      ])
      return
    }

    if (dkaSimulator.fluidGiven < 1000) {
      setFeedback(prev => [
        ...prev,
        '⚠ Warning: Start fluids before insulin for best outcomes',
      ])
    }

    if (dkaSimulator.insulinRate === 0) {
      updateDKASimulator({ insulinRate: 0.1 })
      setFeedback(prev => [
        ...prev,
        dkaSimulator.potassium >= 3.3
          ? '✓ Insulin infusion started at 0.1 units/kg/h'
          : '⚠ Insulin started but monitor potassium closely',
      ])
      setPhase('insulin')
    }
  }

  const addDextrose = () => {
    if (dkaSimulator.glucose < 250) {
      setFeedback(prev => [
        ...prev,
        '✓ Adding dextrose to fluids - Continue insulin to clear ketosis!',
      ])
    } else {
      setFeedback(prev => [
        ...prev,
        '⚠ Glucose still high - wait until <250 mg/dL before adding dextrose',
      ])
    }
  }

  const transitionToSQ = () => {
    if (dkaSimulator.ph > 7.3 && dkaSimulator.anionGap < 12) {
      updateDKASimulator({ transitionedToSQ: true, insulinRate: 0 })
      setFeedback(prev => [
        ...prev,
        '✓ Excellent! DKA resolved. Transition to SQ insulin with 1-2 hour overlap.',
      ])
    } else {
      setFeedback(prev => [
        ...prev,
        '⚠ Not ready to transition - need pH >7.3 AND anion gap closed (<12)',
      ])
    }
  }

  const handleReset = () => {
    resetDKASimulator()
    setIsRunning(false)
    setChartData([])
    setFeedback([])
    setPhase('initial')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>DKA Treatment Simulator</CardTitle>
          <CardDescription>
            Practice stepwise DKA management. Remember: Check potassium BEFORE
            starting insulin!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="text-2xl font-bold">
                {Math.floor(dkaSimulator.timeElapsed / 60)}:
                {(dkaSimulator.timeElapsed % 60).toString().padStart(2, '0')}
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Glucose</p>
              <p className="text-2xl font-bold">{dkaSimulator.glucose} mg/dL</p>
            </div>
            <div
              className={`p-4 rounded-lg ${
                dkaSimulator.potassium < 3.3
                  ? 'bg-destructive/20 border-2 border-destructive'
                  : 'bg-muted'
              }`}
            >
              <p className="text-sm text-muted-foreground">Potassium</p>
              <p className="text-2xl font-bold">
                {dkaSimulator.potassium.toFixed(1)} mEq/L
              </p>
              {dkaSimulator.potassium < 3.3 && (
                <p className="text-xs text-destructive font-bold mt-1">
                  TOO LOW!
                </p>
              )}
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">pH</p>
              <p className="text-2xl font-bold">{dkaSimulator.ph.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Anion Gap</p>
              <p className="text-2xl font-bold">{dkaSimulator.anionGap}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setIsRunning(!isRunning)} variant="default">
              {isRunning ? 'Pause' : 'Start'} Simulation
            </Button>
            <Button onClick={giveFluid} disabled={!isRunning}>
              Give 1L Fluids ({dkaSimulator.fluidGiven / 1000}L)
            </Button>
            <Button
              onClick={startInsulin}
              disabled={!isRunning || dkaSimulator.insulinRate > 0}
            >
              {dkaSimulator.insulinRate > 0
                ? 'Insulin Running'
                : 'Start Insulin (0.1 u/kg/h)'}
            </Button>
            <Button onClick={addDextrose} disabled={!isRunning} variant="outline">
              Add Dextrose to Fluids
            </Button>
            <Button
              onClick={transitionToSQ}
              disabled={!isRunning || dkaSimulator.transitionedToSQ}
              variant="outline"
            >
              Transition to SQ Insulin
            </Button>
            <Button onClick={handleReset} variant="outline">
              Reset
            </Button>
          </div>

          {chartData.length > 0 && (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" label={{ value: 'Time (min)', position: 'insideBottom', offset: -5 }} />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="glucose" stroke="#ef4444" name="Glucose (mg/dL)" />
                  <Line yAxisId="right" type="monotone" dataKey="pH" stroke="#3b82f6" name="pH" />
                  <Line yAxisId="right" type="monotone" dataKey="K" stroke="#10b981" name="K+ (mEq/L)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {feedback.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">Feedback:</h4>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {feedback.map((msg, idx) => (
                  <p
                    key={idx}
                    className={`text-sm p-2 rounded ${
                      msg.includes('❌') || msg.includes('DANGER')
                        ? 'bg-destructive/20 border border-destructive'
                        : msg.includes('⚠')
                        ? 'bg-yellow-500/20'
                        : 'bg-muted'
                    }`}
                  >
                    {msg}
                  </p>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Learning Points</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm font-bold text-destructive">
            ⚠ NEVER start insulin if K+ &lt; 3.3 mEq/L - risk of fatal arrhythmia!
          </p>
          <p className="text-sm">
            • <strong>Fluids first</strong>: 1-1.5 L NS in first hour before insulin
          </p>
          <p className="text-sm">
            • <strong>Potassium</strong>: Most patients need K+ replacement despite
            normal levels
          </p>
          <p className="text-sm">
            • <strong>Add dextrose</strong> when glucose &lt;250 mg/dL (but continue
            insulin!)
          </p>
          <p className="text-sm">
            • <strong>Resolution</strong>: pH &gt;7.3 AND anion gap &lt;12
          </p>
          <p className="text-sm">
            • <strong>Transition</strong>: Overlap IV and SQ insulin by 1-2 hours
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
