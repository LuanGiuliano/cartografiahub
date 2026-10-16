import { useState, useEffect, useRef, useCallback } from 'react'

export default function PresentationViewer({ presentation, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(1)
  const [showThumbnails, setShowThumbnails] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const viewerRef = useRef(null)
  const touchStartXRef = useRef(null)

  const { id, titulo, subtitulo, slideCount, folder, downloadUrl } = presentation

  const getSlideUrl = (slideIndex) => {
    const formatted = String(slideIndex).padStart(2, '0')
    return `${folder}/slide_${formatted}.jpg`
  }

  const goToSlide = useCallback((index) => {
    if (index >= 1 && index <= slideCount) {
      setCurrentSlide(index)
    }
  }, [slideCount])

  const nextSlide = useCallback(() => {
    if (currentSlide < slideCount) {
      goToSlide(currentSlide + 1)
    }
  }, [currentSlide, slideCount, goToSlide])

  const prevSlide = useCallback(() => {
    if (currentSlide > 1) {
      goToSlide(currentSlide - 1)
    }
  }, [currentSlide, goToSlide])

  // Preload neighboring slides for instant transitions
  useEffect(() => {
    const nextIdx = currentSlide + 1
    const prevIdx = currentSlide - 1
    if (nextIdx <= slideCount) {
      const imgNext = new Image()
      imgNext.src = getSlideUrl(nextIdx)
    }
    if (prevIdx >= 1) {
      const imgPrev = new Image()
      imgPrev.src = getSlideUrl(prevIdx)
    }
  }, [currentSlide, slideCount, folder])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if an input is focused
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
        case 'Enter':
          e.preventDefault()
          nextSlide()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
        case 'Backspace':
          e.preventDefault()
          prevSlide()
          break
        case 'Home':
          e.preventDefault()
          goToSlide(1)
          break
        case 'End':
          e.preventDefault()
          goToSlide(slideCount)
          break
        case 'Escape':
          e.preventDefault()
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {})
          } else {
            onClose()
          }
          break
        case 'f':
        case 'F':
          e.preventDefault()
          toggleFullscreen()
          break
        case 't':
        case 'T':
          e.preventDefault()
          setShowThumbnails((prev) => !prev)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, goToSlide, slideCount, onClose])

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen?.().catch(() => {})
    } else {
      document.exitFullscreen?.().catch(() => {})
    }
  }

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return
    const diff = e.changedTouches[0].clientX - touchStartXRef.current
    if (diff > 50) {
      prevSlide()
    } else if (diff < -50) {
      nextSlide()
    }
    touchStartXRef.current = null
  }

  const progressPercent = ((currentSlide / slideCount) * 100).toFixed(1)

  return (
    <div
      ref={viewerRef}
      className={`pv-overlay ${isFullscreen ? 'is-fullscreen' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={`Apresentação: ${titulo}`}
    >
      {/* Top Header */}
      <header className="pv-header">
        <div className="pv-header-info">
          <button
            type="button"
            className="pv-btn pv-btn-back"
            onClick={onClose}
            title="Voltar para a página inicial (Esc)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Voltar</span>
          </button>

          <div className="pv-titles">
            <h2 className="pv-title">{titulo}</h2>
            {subtitulo && <span className="pv-subtitle">{subtitulo}</span>}
          </div>
        </div>

        <div className="pv-header-actions">
          {downloadUrl && (
            <a
              href={downloadUrl}
              download
              className="pv-btn pv-btn-ghost"
              title="Baixar arquivo original (.pptx)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className="pv-btn-label">Baixar PPTX</span>
            </a>
          )}

          <button
            type="button"
            className={`pv-btn pv-btn-ghost ${showThumbnails ? 'is-active' : ''}`}
            onClick={() => setShowThumbnails((prev) => !prev)}
            title="Miniaturas dos slides (T)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            <span className="pv-btn-label">Miniaturas</span>
          </button>

          <button
            type="button"
            className="pv-btn pv-btn-ghost"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Sair da tela cheia (F)' : 'Tela cheia (F)'}
          >
            {isFullscreen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            )}
          </button>

          <button
            type="button"
            className="pv-btn pv-btn-close"
            onClick={onClose}
            title="Fechar apresentação (Esc)"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="pv-progress-bar" aria-hidden="true">
        <div className="pv-progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Main Slide Area */}
      <main
        className="pv-viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Arrow Left */}
        <button
          type="button"
          className="pv-nav-arrow pv-nav-prev"
          onClick={prevSlide}
          disabled={currentSlide === 1}
          aria-label="Slide anterior"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Slide Canvas */}
        <div className="pv-canvas" onClick={(e) => {
          // Click left half goes back, right half goes forward
          const rect = e.currentTarget.getBoundingClientRect()
          const clickX = e.clientX - rect.left
          if (clickX > rect.width * 0.6) {
            nextSlide()
          } else if (clickX < rect.width * 0.4) {
            prevSlide()
          }
        }}>
          <img
            key={currentSlide}
            src={getSlideUrl(currentSlide)}
            alt={`Slide ${currentSlide} de ${slideCount}`}
            className="pv-slide-image"
            draggable="false"
          />
        </div>

        {/* Navigation Arrow Right */}
        <button
          type="button"
          className="pv-nav-arrow pv-nav-next"
          onClick={nextSlide}
          disabled={currentSlide === slideCount}
          aria-label="Próximo slide"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </main>

      {/* Bottom Floating Control Bar */}
      <footer className="pv-footer">
        <div className="pv-controls">
          <button
            type="button"
            className="pv-ctrl-btn"
            onClick={prevSlide}
            disabled={currentSlide === 1}
            title="Slide anterior (Seta esquerda / Espaço)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="pv-counter">
            <span className="pv-current">{String(currentSlide).padStart(2, '0')}</span>
            <span className="pv-divider">/</span>
            <span className="pv-total">{String(slideCount).padStart(2, '0')}</span>
          </div>

          <button
            type="button"
            className="pv-ctrl-btn"
            onClick={nextSlide}
            disabled={currentSlide === slideCount}
            title="Próximo slide (Seta direita / Espaço)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="pv-hint">
          <span>Use as setas ← → ou Espaço para navegar</span>
        </div>
      </footer>

      {/* Slide Thumbnails Drawer */}
      {showThumbnails && (
        <aside className="pv-thumbnails-drawer">
          <div className="pv-thumbnails-scroll">
            {Array.from({ length: slideCount }, (_, idx) => {
              const slideNum = idx + 1
              const isActive = slideNum === currentSlide
              return (
                <button
                  key={slideNum}
                  type="button"
                  className={`pv-thumb-card ${isActive ? 'is-active' : ''}`}
                  onClick={() => goToSlide(slideNum)}
                >
                  <img
                    src={getSlideUrl(slideNum)}
                    alt={`Slide ${slideNum}`}
                    loading="lazy"
                  />
                  <span className="pv-thumb-badge">{slideNum}</span>
                </button>
              )
            })}
          </div>
        </aside>
      )}
    </div>
  )
}
