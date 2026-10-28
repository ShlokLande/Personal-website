import { useEffect, useState } from 'react'
import Layout from '../components/Layout.jsx'
import Card from '../components/Card.jsx'
import { Pic } from '../components/Figure.jsx'
import * as diagrams from '../diagrams/index.js'
import { href, asset } from '../lib/href.js'
import { image as img, imagePath } from '../lib/images.js'
import { person, projects } from '../content/site.js'
import { projectModules } from '../content/projects/index.js'
import { meta as solar } from '../content/solar.jsx'
import '../styles/home.css'

const TILTS = ['-0.8deg', '0.6deg', '-0.4deg', '0.5deg', '-0.6deg']

function cardImage(image) {
  if (!image) return null
  if (image.diagram) {
    const D = diagrams[image.diagram]
    return <D {...image.props} />
  }
  return <Pic src={img(image.src)} alt={image.alt} placeholder={imagePath(image.src)} />
}

function Intro() {
  const [email, setEmail] = useState('')
  useEffect(() => setEmail(person.emailParts.join('@')), [])
  return (
    <section className="intro" aria-labelledby="name">
      <h1 id="name">{person.name}</h1>
      <p className="intro-line">{person.line}</p>
      <ul className="intro-links">
        <li>
          <a className="pill" href={person.github} target="_blank" rel="noopener">GitHub</a>
        </li>
        <li>
          <a className="pill" href={person.linkedin} target="_blank" rel="noopener">LinkedIn</a>
        </li>
        <li>
          <a className="pill" href={email ? `mailto:${email}` : '#contact'}>Email</a>
        </li>
        <li>
          <a className="pill" href={asset(person.resume)} target="_blank" rel="noopener">Resume (PDF)</a>
        </li>
      </ul>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="block" aria-labelledby="experience-h">
      <div className="block-head">
        <h2 id="experience-h">Experience</h2>
        <p className="block-hint">Click the card for everything I&apos;ve built on the team.</p>
      </div>
      <Card
        className="card-wide"
        href={href('/solar/')}
        kicker={`${solar.when}, ${solar.where}`}
        title={solar.title}
        summary={
          <>
            <strong className="card-role">{solar.role}.</strong> {solar.team}
            <span className="card-mine">{solar.mine}</span>
          </>
        }
        tags={solar.tags}
        image={cardImage(solar.image)}
        cta="Read more"
      />
      <p className="prev-role">
        Before that: VP of Technology at Loop, a Junior Achievement student company in Calgary (2024 to 2025).
      </p>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="block" aria-labelledby="projects-h">
      <div className="block-head">
        <h2 id="projects-h">Projects</h2>
        <p className="block-hint">Hackathon builds, a nonprofit and side projects. Click a card for diagrams and details.</p>
      </div>
      <div className="grid">
        {projects.map(({ slug }, i) => {
          const m = projectModules[slug].meta
          return (
            <div key={slug} className="grid-cell" style={{ '--tilt': TILTS[i % TILTS.length] }}>
              <Card
                href={href(`/projects/${slug}/`)}
                kicker={m.kicker}
                title={m.title}
                summary={m.summary}
                tags={m.tags}
                live={m.live}
                image={cardImage(m.image)}
              />
            </div>
          )
        })}
        <div className="grid-cell">
          <a className="more-card" href={person.github} target="_blank" rel="noopener">
            <span className="more-title">More on GitHub</span>
            <span className="more-sub">Code for these and other projects</span>
            <span className="more-go" aria-hidden="true">github.com/ShlokLande ↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <Layout current="home">
      <Intro />
      <Experience />
      <Projects />
    </Layout>
  )
}
