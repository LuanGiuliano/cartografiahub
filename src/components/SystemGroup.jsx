import Icon from './Icons'

/**
 * Grupo com card principal (ex.: Diagnóstico) e sub-botões (ex.: DIOP, DIFOB...).
 * Os botões podem abrir apresentações ou links externos.
 */
export default function SystemGroup({
  id,
  titulo,
  icone,
  url,
  itens,
  onOpenPresentation,
  index = 0,
}) {
  const ativo = Boolean(url)
  const HeadTag = ativo ? 'a' : 'div'
  const headProps = ativo ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <section
      id={`grupo-${id}`}
      className="system-group"
      style={{ '--delay': `${index * 100 + 350}ms` }}
    >
      <HeadTag className="group-head" {...headProps}>
        <span className="card-medal">
          <Icon name={icone} />
        </span>
        <h2 className="group-title">{titulo}</h2>
      </HeadTag>

      <div className="group-divider">
        <span />
        <em>Destinos</em>
        <span />
      </div>

      <div className="group-items">
        {itens.map((item) => {
          const isPresentation = Boolean(item.presentationId)
          const isExternal = Boolean(item.url)
          const on = isPresentation || isExternal

          const handleClick = (e) => {
            if (isPresentation) {
              e.preventDefault()
              onOpenPresentation?.(item.presentationId)
            } else if (!isExternal) {
              e.preventDefault()
            }
          }

          const Tag = isExternal ? 'a' : 'button'
          const props = isExternal
            ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' }
            : { type: 'button', onClick: handleClick }

          return (
            <Tag
              key={item.id}
              id={`btn-${item.id}`}
              className={`seal-btn ${on ? 'is-active' : 'is-pending'}`}
              title={
                isPresentation
                  ? `Ver Apresentação de ${item.sigla}`
                  : isExternal
                  ? `Acessar ${item.sigla}`
                  : `${item.sigla} — em breve`
              }
              {...props}
            >
              <span className="seal-pin" />
              <span className="seal-text">{item.sigla}</span>
              <Icon name="arrow" size={14} />
            </Tag>
          )
        })}
      </div>
    </section>
  )
}
