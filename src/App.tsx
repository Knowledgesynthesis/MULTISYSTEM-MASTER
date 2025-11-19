import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { Layout } from './components/layout/Layout'
import { useAppStore } from './stores/appStore'

// Pages
import { Home } from './pages/Home'
import { SepsisPage } from './pages/SepsisPage'
import { DKAPage } from './pages/DKAPage'
import { AutoimmunePage } from './pages/AutoimmunePage'
import { InfectionsPage } from './pages/InfectionsPage'
import { ToxicologyPage } from './pages/ToxicologyPage'
import { DermatologyPage } from './pages/DermatologyPage'
import { CasesPage } from './pages/CasesPage'
import { AssessmentPage } from './pages/AssessmentPage'

function App() {
  const { darkMode } = useAppStore()

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sepsis" element={<SepsisPage />} />
          <Route path="/dka-hhs" element={<DKAPage />} />
          <Route path="/autoimmune" element={<AutoimmunePage />} />
          <Route path="/infections" element={<InfectionsPage />} />
          <Route path="/toxicology" element={<ToxicologyPage />} />
          <Route path="/dermatology" element={<DermatologyPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
