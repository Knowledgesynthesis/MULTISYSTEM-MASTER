import { Link } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Activity,
  Heart,
  Shield,
  Syringe,
  FlaskConical,
  Layers,
  BookOpen,
  ClipboardCheck,
} from 'lucide-react'

const modules = [
  {
    title: 'Sepsis / SIRS',
    description:
      'Master sepsis recognition, early resuscitation, and management of septic shock',
    icon: Activity,
    path: '/sepsis',
    color: 'text-red-500',
  },
  {
    title: 'DKA / HHS',
    description:
      'Learn stepwise treatment of diabetic emergencies and complication prevention',
    icon: Heart,
    path: '/dka-hhs',
    color: 'text-orange-500',
  },
  {
    title: 'Autoimmune Diseases',
    description:
      'Navigate SLE, RA, vasculitis, and systemic inflammatory conditions',
    icon: Shield,
    path: '/autoimmune',
    color: 'text-purple-500',
  },
  {
    title: 'Infections',
    description: 'HIV, TB, meningitis, pneumonia, and STI management pathways',
    icon: Syringe,
    path: '/infections',
    color: 'text-green-500',
  },
  {
    title: 'Toxicology',
    description: 'Toxidrome recognition, antidotes, and metabolic poisoning',
    icon: FlaskConical,
    path: '/toxicology',
    color: 'text-yellow-500',
  },
  {
    title: 'Dermatology',
    description: 'Systemic clues from skin: SJS/TEN, pemphigus, and more',
    icon: Layers,
    path: '/dermatology',
    color: 'text-pink-500',
  },
  {
    title: 'Clinical Cases',
    description: 'Interactive case simulations with integrated reasoning',
    icon: BookOpen,
    path: '/cases',
    color: 'text-blue-500',
  },
  {
    title: 'Assessment',
    description: 'Test your knowledge with MCQs and pattern recognition drills',
    icon: ClipboardCheck,
    path: '/assessment',
    color: 'text-indigo-500',
  },
]

export function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Multisystem Master
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Master cross-organ diseases through interactive learning. Evidence-based
          education for integrated clinical reasoning.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => {
          const Icon = module.icon
          return (
            <Card
              key={module.path}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon className={`h-8 w-8 ${module.color}`} />
                  <CardTitle>{module.title}</CardTitle>
                </div>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={module.path}>
                  <Button className="w-full">Explore Module</Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>About This App</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Multisystem Master is designed to help medical professionals master
            diseases that cross organ boundaries. Our approach emphasizes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Evidence-based guidelines and current best practices</li>
            <li>Interactive simulators for complex conditions</li>
            <li>Integrated reasoning across organ systems</li>
            <li>Pattern recognition and diagnostic thinking</li>
            <li>Complication anticipation and prevention</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            All content is for educational purposes only and uses synthetic cases.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
