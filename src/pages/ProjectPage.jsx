import Layout from '../components/Layout.jsx'
import PaperSheet from '../components/PaperSheet.jsx'
import FactStrip from '../components/FactStrip.jsx'
import Toc from '../components/Toc.jsx'
import NextProject from '../components/NextProject.jsx'
import { href } from '../lib/href.js'
import { projectModules } from '../content/projects/index.js'
import '../styles/writeup.css'

export default function ProjectPage({ slug }) {
  const { meta, page } = projectModules[slug]
  return (
    <Layout current="project">
      <p className="crumbs">
        <a href={href('/#projects')}>
          <span aria-hidden="true">← </span>All projects
        </a>
      </p>
      <PaperSheet className="writeup">
        <header className="wu-head">
          <p className="wu-kicker">{page.kicker}</p>
          <h1>{meta.title}</h1>
          <p className="wu-summary">{page.summary}</p>
          <FactStrip items={page.facts} tag={page.hackathon ? 'Hackathon project' : null} />
        </header>
        <div className="wu-body">
          <Toc items={page.sections.map(({ id, label }) => ({ id, label }))} />
          <div className="wu-content">
            {page.sections.map((s) => (
              <section key={s.id} id={s.id} className="wu-section" aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`}>{s.label}</h2>
                {s.body}
              </section>
            ))}
          </div>
        </div>
        <NextProject slug={slug} />
      </PaperSheet>
    </Layout>
  )
}
