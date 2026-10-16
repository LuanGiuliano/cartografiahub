import { useState, useEffect } from 'react'
import CompassRose from './components/CompassRose'
import SystemCard from './components/SystemCard'
import SystemGroup from './components/SystemGroup'
import PresentationViewer from './components/PresentationViewer'
import { sistemasPrincipais, grupos, apresentacoes } from './data/sistemas'

export default function App() {
  const [activePresentationId, setActivePresentationId] = useState(null)

  // Sincroniza com hash da URL (#apresentacao/<id>)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash.startsWith('#apresentacao/')) {
        const id = hash.replace('#apresentacao/', '')
        if (apresentacoes[id]) {
          setActivePresentationId(id)
        }
      } else if (activePresentationId) {
        setActivePresentationId(null)
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [activePresentationId])

  const handleOpenPresentation = (id) => {
    if (apresentacoes[id]) {
      window.location.hash = `#apresentacao/${id}`
      setActivePresentationId(id)
    }
  }

  const handleClosePresentation = () => {
    setActivePresentationId(null)
    if (window.location.hash.startsWith('#apresentacao/')) {
      window.history.pushState(null, '', window.location.pathname)
    }
  }

  const currentPresentation = activePresentationId ? apresentacoes[activePresentationId] : null

  return (
    <div className="page">
      <div className="page-bg" aria-hidden="true" />
      <div className="page-vignette" aria-hidden="true" />

      <header className="hero">
        <CompassRose size={92} className="hero-compass" />
        <div className="hero-text">
          <h1 className="hero-title">
            Cartografia <span>de</span> Saberes
          </h1>
          <div className="hero-ribbon">
            <span>SAGEP / SEDUC-PA</span>
          </div>
        </div>
      </header>

      <main className="content">
        <section className="cards-grid" aria-label="Sistemas principais">
          {sistemasPrincipais.map((s, i) => (
            <SystemCard
              key={s.id}
              {...s}
              onOpenPresentation={handleOpenPresentation}
              index={i}
            />
          ))}
        </section>

        <section className="groups-grid" aria-label="Diagnóstico e PDI">
          {grupos.map((g, i) => (
            <SystemGroup
              key={g.id}
              {...g}
              onOpenPresentation={handleOpenPresentation}
              index={i}
            />
          ))}
        </section>
      </main>

      <footer className="footer">
        <span>© 2026 SAGEP — SECRETARIA ADJUNTA DE GESTÃO DE PESSOAS</span>
      </footer>

      {/* Visualizador de Apresentação de Slides */}
      {currentPresentation && (
        <PresentationViewer
          presentation={currentPresentation}
          onClose={handleClosePresentation}
        />
      )}
    </div>
  )
}
