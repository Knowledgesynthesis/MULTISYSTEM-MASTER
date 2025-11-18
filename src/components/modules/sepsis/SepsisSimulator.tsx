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

export function SepsisSimulator() {
  const { sepsisSimulator, updateSepsisSimulator, resetSepsisSimulator } =
    useAppStore()
  const [isRunning, setIsRunning] = useState(false)
  const [chartData, setChartData] = useState<any[]>([])
  const [feedback, setFeedback] = useState<string[]>([])

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        updateSepsisSimulator({
          timeElapsed: sepsisSimulator.timeElapsed + 1,
        })

        // Simulate physiologic changes
        let newLactate = sepsisSimulator.lactate
        let newMAP = sepsisSimulator.map
        let newUrine = sepsisSimulator.urineOutput

        // Effects of fluid resuscitation
        if (sepsisSimulator.fluidGiven >= 2000) {
          newMAP = Math.min(65, sepsisSimulator.map + 2)
          newLactate = Math.max(2.0, sepsisSimulator.lactate - 0.2)
          newUrine += 10
        }

        // Effects of antibiotics
        if (sepsisSimulator.antibioticsGiven && sepsisSimulator.timeElapsed > 60) {
          newLactate = Math.max(1.5, newLactate - 0.1)
        }

        // Effects of vasopressors
        if (sepsisSimulator.vasopressorUsed) {
          newMAP = Math.min(70, newMAP + 3)
        }

        updateSepsisSimulator({
          lactate: parseFloat(newLactate.toFixed(1)),
          map: Math.round(newMAP),
          urineOutput: Math.round(newUrine),
        })

        // Update chart data
        setChartData((prev) => [
          ...prev,
          {
            time: sepsisSimulator.timeElapsed,
            lactate: newLactate,
            MAP: newMAP,
          },
        ])
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isRunning, sepsisSimulator, updateSepsisSimulator])

  const giveFluid = () => {
    const newFluidTotal = sepsisSimulator.fluidGiven + 1000
    updateSepsisSimulator({ fluidGiven: newFluidTotal })

    const newFeedback = [...feedback]
    if (newFluidTotal === 1000) {
      newFeedback.push('✓ Started fluid resuscitation - Good! Continue to 30 mL/kg.')
    } else if (newFluidTotal >= 2000) {
      newFeedback.push('✓ Adequate fluid resuscitation achieved. Monitor for response.')
    }
    setFeedback(newFeedback)
  }

  const giveAntibiotics = () => {
    if (!sepsisSimulator.antibioticsGiven) {
      updateSepsisSimulator({ antibioticsGiven: true })
      const newFeedback = [...feedback]
      if (sepsisSimulator.timeElapsed < 60) {
        newFeedback.push('✓ Excellent! Antibiotics given within 1 hour.')
      } else {
        newFeedback.push(
          '⚠ Antibiotics given, but delayed. Each hour delay increases mortality.'
        )
      }
      setFeedback(newFeedback)
    }
  }

  const startVasopressor = () => {
    if (!sepsisSimulator.vasopressorUsed) {
      updateSepsisSimulator({ vasopressorUsed: true })
      const newFeedback = [...feedback]
      if (sepsisSimulator.fluidGiven >= 2000) {
        newFeedback.push(
          '✓ Starting vasopressor after adequate fluids - appropriate for septic shock.'
        )
      } else {
        newFeedback.push(
          '⚠ Vasopressor started, but consider more fluids first if patient is fluid-responsive.'
        )
      }
      setFeedback(newFeedback)
    }
  }

  const handleReset = () => {
    resetSepsisSimulator()
    setIsRunning(false)
    setChartData([])
    setFeedback([])
  }

  const getOutcome = () => {
    if (
      sepsisSimulator.antibioticsGiven &&
      sepsisSimulator.fluidGiven >= 2000 &&
      sepsisSimulator.lactate < 3.0 &&
      sepsisSimulator.map >= 65
    ) {
      return {
        status: 'success',
        message:
          'Excellent management! Patient stabilized with appropriate early interventions.',
      }
    } else if (sepsisSimulator.timeElapsed > 180) {
      return {
        status: 'warning',
        message:
          'Patient survived but delays in treatment may have increased morbidity.',
      }
    }
    return null
  }

  const outcome = getOutcome()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sepsis Management Simulator</CardTitle>
          <CardDescription>
            Practice early recognition and management of sepsis. Track lactate and
            MAP in real-time.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Time Elapsed</p>
              <p className="text-2xl font-bold">
                {Math.floor(sepsisSimulator.timeElapsed / 60)}:
                {(sepsisSimulator.timeElapsed % 60).toString().padStart(2, '0')}
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Lactate</p>
              <p className="text-2xl font-bold">
                {sepsisSimulator.lactate.toFixed(1)} mmol/L
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">MAP</p>
              <p className="text-2xl font-bold">{sepsisSimulator.map} mmHg</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Urine Output</p>
              <p className="text-2xl font-bold">
                {sepsisSimulator.urineOutput} mL
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setIsRunning(!isRunning)} variant="default">
              {isRunning ? 'Pause' : 'Start'} Simulation
            </Button>
            <Button onClick={giveFluid} disabled={!isRunning}>
              Give 1L Fluid ({sepsisSimulator.fluidGiven / 1000}L given)
            </Button>
            <Button
              onClick={giveAntibiotics}
              disabled={!isRunning || sepsisSimulator.antibioticsGiven}
            >
              {sepsisSimulator.antibioticsGiven
                ? 'Antibiotics Given'
                : 'Give Antibiotics'}
            </Button>
            <Button
              onClick={startVasopressor}
              disabled={!isRunning || sepsisSimulator.vasopressorUsed}
              variant="outline"
            >
              {sepsisSimulator.vasopressorUsed
                ? 'Vasopressor Running'
                : 'Start Vasopressor'}
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
                  <YAxis yAxisId="left" label={{ value: 'Lactate (mmol/L)', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'MAP (mmHg)', angle: 90, position: 'insideRight' }} />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="lactate" stroke="#ef4444" name="Lactate" />
                  <Line yAxisId="right" type="monotone" dataKey="MAP" stroke="#3b82f6" name="MAP" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {feedback.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">Feedback:</h4>
              <div className="space-y-1">
                {feedback.map((msg, idx) => (
                  <p key={idx} className="text-sm p-2 bg-muted rounded">
                    {msg}
                  </p>
                ))}
              </div>
            </div>
          )}

          {outcome && (
            <Card
              className={
                outcome.status === 'success'
                  ? 'bg-green-500/10 border-green-500'
                  : 'bg-yellow-500/10 border-yellow-500'
              }
            >
              <CardContent className="pt-6">
                <p className="font-semibold">{outcome.message}</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Learning Points</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">
            • <strong>Early antibiotics</strong> (within 1 hour) reduce mortality by 7.6%
            per hour delay
          </p>
          <p className="text-sm">
            • <strong>Fluid resuscitation</strong>: 30 mL/kg crystalloid within 3 hours
          </p>
          <p className="text-sm">
            • <strong>Lactate</strong> is a marker of tissue hypoperfusion - goal is
            clearance
          </p>
          <p className="text-sm">
            • <strong>Vasopressors</strong>: Start if MAP &lt;65 despite adequate fluids
            (septic shock)
          </p>
          <p className="text-sm">
            • <strong>Source control</strong>: Drain abscesses, remove infected devices
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
