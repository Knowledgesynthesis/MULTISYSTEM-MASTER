import { Link, useLocation } from 'react-router-dom'
import {
  Activity,
  Heart,
  Shield,
  Syringe,
  FlaskConical,
  Layers,
  BookOpen,
  ClipboardCheck,
  Home,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/sepsis', label: 'Sepsis', icon: Activity },
  { path: '/dka-hhs', label: 'DKA/HHS', icon: Heart },
  { path: '/autoimmune', label: 'Autoimmune', icon: Shield },
  { path: '/infections', label: 'Infections', icon: Syringe },
  { path: '/toxicology', label: 'Toxicology', icon: FlaskConical },
  { path: '/dermatology', label: 'Dermatology', icon: Layers },
  { path: '/cases', label: 'Cases', icon: BookOpen },
  { path: '/assessment', label: 'Assessment', icon: ClipboardCheck },
]

export function Navigation() {
  const location = useLocation()

  return (
    <nav className="hidden md:flex md:w-64 flex-col border-r bg-muted/40 p-4">
      <div className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export function MobileNavigation({ open }: { open: boolean }) {
  const location = useLocation()

  if (!open) return null

  return (
    <nav className="md:hidden border-b bg-background p-4">
      <div className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
