import Layout from '../components/Layout.jsx'
import PaperSheet from '../components/PaperSheet.jsx'
import FactStrip from '../components/FactStrip.jsx'
import Toc from '../components/Toc.jsx'
import { href } from '../lib/href.js'
import { meta, page, work } from '../content/solar.jsx'
import '../styles/writeup.css'

function Section({ s }) {
  return (
    <section id={s.id} className="wu-section" aria-labelledby={`${s.id}-h`}>
      <h2 id={`${s.id}-h`}>{s.label}</h2>
      {s.body}
    </section>
  )
}

export default function SolarPage() {
  const toc = [...page.intro, ...page.sections].map(({ id, label }) => ({ id, label }))
  return (
    <Layout current="solar">
      <p className="crumbs">
        <a href={href('/')}>
          <span aria-hidden="true">← </span>Home
        </a>
      </p>
      <PaperSheet className="writeup">
        <header className="wu-head">
          <p className="wu-kicker">{page.kicker}</p>
          <h1>{meta.title}</h1>
          <p className="wu-summary">{page.summary}</p>
          <FactStrip items={page.facts} />
        </header>

        <nav className="jump" aria-labelledby="jump-h">
          <h2 id="jump-h" className="jump-title">What I&apos;ve worked on</h2>
          <ol className="jump-list">
            {work.map((w) => (
              <li key={w.id}>
                <a href={`#${w.id}`}>
                  <span className="jump-name">{w.title}</span>
                  <span className="jump-line">{w.line}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="wu-body">
          <Toc items={toc} />
          <div className="wu-content">
            {page.intro.map((s) => (
              <Section key={s.id} s={s} />
            ))}
            {page.sections.map((s) => (
              <Section key={s.id} s={s} />
            ))}
            <section className="wu-section" aria-labelledby="skills-h">
              <h2 id="skills-h">Skills I used</h2>
              <ul className="wu-tags">
                {page.skills.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <nav className="next" aria-label="More">
          <a className="next-card" href={href('/#projects')}>
            <span className="next-label">Next</span>
            <span className="next-title">My projects</span>
          </a>
        </nav>
      </PaperSheet>
    </Layout>
  )
}
