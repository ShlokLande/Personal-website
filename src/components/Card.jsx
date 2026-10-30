/*
 * A paper card. The title link is stretched over the whole card, so clicking
 * anywhere opens the write-up; a "Live site" link sits above it and stays
 * separately clickable.
 */
export default function Card({ href, kicker, title, summary, tags = [], image, live, cta = 'Read more', className = '' }) {
  return (
    <article className={`card ${className}`}>
      {image && <div className="card-pic">{image}</div>}
      <div className="card-body">
        {kicker && <p className="card-kicker">{kicker}</p>}
        <h3 className="card-title">
          <a className="card-link" href={href}>
            {title}
          </a>
        </h3>
        {summary && <p className="card-summary">{summary}</p>}
        {tags.length > 0 && (
          <ul className="card-tags">
            {tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="card-foot">
        <span className="card-cta" aria-hidden="true">
          {cta}
          <svg viewBox="0 0 16 16" width="16" height="16">
            <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        {live && (
          <a className="card-live" href={live.href} target="_blank" rel="noopener">
            {live.label}
            <span aria-hidden="true"> ↗</span>
          </a>
        )}
      </div>
    </article>
  )
}
