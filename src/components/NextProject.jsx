import { href } from '../lib/href.js'
import { nextProject } from '../content/site.js'

export default function NextProject({ slug }) {
  const next = nextProject(slug)
  return (
    <nav className="next" aria-label="Next project">
      <a className="next-card" href={href(`/projects/${next.slug}/`)}>
        <span className="next-label">Next project</span>
        <span className="next-title">{next.title}</span>
      </a>
      <a className="next-all" href={href('/#projects')}>
        All projects
      </a>
    </nav>
  )
}
