import Icon from './Icons'

/**
 * Card clicável de um sistema.
 * Se tiver `presentationId`, abre o visualizador de slides interativo.
 * Se tiver `url`, navega para o link externo.
 * Se nenhum dos dois estiver configurado, mostra o selo "Em breve".
 */
export default function SystemCard({
  id,
  titulo,
  icone,
  url,
  presentationId,
  onOpenPresentation,
  index = 0,
}) {
  const isPresentation = Boolean(presentationId)
  const isExternal = Boolean(url)
  const ativo = isPresentation || isExternal

  const handleClick = (e) => {
    if (isPresentation) {
      e.preventDefault()
      onOpenPresentation?.(presentationId)
    } else if (!isExternal) {
      e.preventDefault()
    }
  }

  const Tag = isExternal ? 'a' : 'button'
  const props = isExternal
    ? { href: url, target: '_blank', rel: 'noopener noreferrer' }
    : { type: 'button', onClick: handleClick }

  const ctaLabel = isPresentation ? 'Apresentação' : isExternal ? 'Acessar' : 'Em breve'

  return (
    <Tag
      id={`card-${id}`}
      className={`system-card ${ativo ? 'is-active' : 'is-pending'}`}
      style={{ '--delay': `${index * 80}ms` }}
      title={ativo ? `${titulo} (${ctaLabel})` : `${titulo} (Em breve)`}
      {...props}
    >
      <span className="card-corner tl" />
      <span className="card-corner br" />

      <span className="card-medal">
        <Icon name={icone} />
      </span>

      <span className="card-body">
        <span className="card-title">{titulo}</span>
      </span>

      <span className="card-footer">
        <span className="card-cta">
          {ctaLabel}
          <Icon name="arrow" size={16} />
        </span>
      </span>
    </Tag>
  )
}
