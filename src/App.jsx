import { useEffect } from 'react'

const projects = [
  {
    name: 'match-a',
    award: '2nd place, SAP non-profit category, youCode 2026',
    desc: 'Two-sided volunteer matching platform for BC nonprofits, built in under 24 hours with a team of two. Live dashboards run on Supabase Realtime WebSockets, with a Python logistic regression model that flags volunteers at risk of churning.',
    stack: 'Next.js · TypeScript · Tailwind · Supabase · PostgreSQL · Python',
    href: 'https://match-a-seven.vercel.app',
    label: 'Live site',
  },
  {
    name: 'DermAI',
    desc: 'Skincare analysis web app that uses the Google Gemini API to turn unstructured skin data into personalized, structured recommendations.',
    stack: 'Gemini API · JavaScript · Vercel',
    href: 'https://dermai-gray.vercel.app',
    label: 'Live site',
  },
  {
    name: 'LearnLoop',
    desc: 'Study group scheduling platform with backend scheduling logic and automated workflow handling for student study sessions.',
    stack: 'Node.js · JavaScript · HTML/CSS',
    href: 'https://github.com/ShlokLande',
    label: 'GitHub',
  },
  {
    name: 'Code Unity',
    desc: 'Nonprofit running free weekly programming sessions for youth. Lesson plans cover algorithmic thinking and core CS concepts, taught to learners of all levels.',
    stack: 'Teaching · Curriculum design · Leadership',
    href: 'https://codeunity.wixsite.com',
    label: 'Website',
  },
]

const roles = [
  {
    date: '2025 – Present',
    title: 'Embedded Software Developer',
    org: 'UBC Solar, Vancouver BC',
    points: [
      'Developed firmware for a BNO08x IMU on an STM32F103 microcontroller using FreeRTOS, integrating I2C and CAN bus for real-time vehicle telemetry.',
      'Debugged low-level I2C driver issues and implemented bus recovery routines to fix hardware communication failures during sensor bring-up.',
      'Built Grafana dashboards over InfluxDB to visualize live CAN bus telemetry from the solar car, writing Flux queries to surface vehicle and driver-relay data in real time.',
    ],
  },
  {
    date: 'Jan 2024 – Present',
    title: 'Co-Founder and Vice President',
    org: 'Code Unity, youth coding nonprofit',
    points: [
      'Co-founded a nonprofit delivering weekly programming education sessions for youth.',
      'Design lesson plans on algorithmic thinking and core CS concepts for non-technical audiences.',
    ],
  },
  {
    date: 'Oct 2024 – Jun 2025',
    title: 'Vice President of Technology',
    org: 'Loop, Junior Achievement Company, Calgary AB',
    points: [
      'Led operational and technical initiatives for a student-run company in a customer-facing environment.',
      'Coordinated cross-functional teams across sales, customer engagement, and logistics.',
    ],
  },
]

export default function App() {
  useEffect(() => {
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      })
    }, { threshold: .12 })
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <nav>
        <div className="nav-inner">
          <a className="logo" href="#top">Shlok Lande</a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <main id="top">

        <header className="hero wrap">
          <h1>Shlok Lande</h1>
          <p className="role">Computer engineering student at the University of British Columbia</p>

          <div className="hero-rule" />

          <div className="hero-body">
            <p className="deck">
              I write firmware for a solar race car, build web applications, and run
              programming workshops through a nonprofit I co-founded. <em>I like
              problems that start out vague and end up working.</em>
            </p>

            <dl className="meta">
              <div className="row">
                <dt>Based in</dt>
                <dd>Vancouver, BC</dd>
              </div>
              <div className="row">
                <dt>Status</dt>
                <dd>Open to internships and co-op</dd>
              </div>
              <div className="row">
                <dt>Elsewhere</dt>
                <dd className="inline">
                  <a className="u" href="https://github.com/ShlokLande" target="_blank" rel="noopener">GitHub</a>
                  <a className="u" href="https://linkedin.com/in/shloklande" target="_blank" rel="noopener">LinkedIn</a>
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <section id="about">
          <div className="wrap sec-grid">
            <h2 className="sec-tag">About</h2>
            <div className="sec-body">
              <dl className="facts reveal">
                <div className="row">
                  <dt>Studying</dt>
                  <dd>Computer engineering, UBC. Second year, class of 2029.</dd>
                </div>
                <div className="row">
                  <dt>Design team</dt>
                  <dd>
                    <a className="u" href="https://ubcsolar.com/" target="_blank" rel="noopener">UBC Solar</a>, embedded software
                  </dd>
                </div>
                <div className="row">
                  <dt>Languages</dt>
                  <dd>C, C++, Java, Python, JavaScript, TypeScript</dd>
                </div>
                <div className="row">
                  <dt>Status</dt>
                  <dd>Open to internships and co-op</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section id="experience">
          <div className="wrap sec-grid">
            <h2 className="sec-tag">Experience</h2>
            <div className="sec-body">
              {roles.map((r) => (
                <div className="entry reveal" key={r.title}>
                  <div className="t-date">{r.date}</div>
                  <div>
                    <h3>{r.title}</h3>
                    <div className="org">{r.org}</div>
                    <ul>
                      {r.points.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="wrap sec-grid">
            <h2 className="sec-tag">Projects</h2>
            <div className="sec-body">
              <div className="index">
                {projects.map((p, i) => (
                  <div className="item reveal" key={p.name}>
                    <div className="num">{String(i + 1).padStart(2, '0')}</div>
                    <div>
                      <h3>{p.name}</h3>
                      {p.award && <p className="award">{p.award}</p>}
                      <p className="desc">{p.desc}</p>
                      <p className="stack">{p.stack}</p>
                    </div>
                    <div className="go">
                      <a className="u" href={p.href} target="_blank" rel="noopener">{p.label}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="wrap sec-grid">
            <h2 className="sec-tag">Contact</h2>
            <div className="sec-body">
              <p className="contact-lead reveal">
                I'm looking for internship and co-op opportunities. If something here
                looks relevant, I'd be glad to hear from you.
              </p>
              <div className="contact-links reveal">
                <a className="u" href="mailto:shloklande[at]gmail.com">shloklande[at]gmail.com</a>
                <a className="u" href="https://linkedin.com/in/shloklande" target="_blank" rel="noopener">LinkedIn</a>
                <a className="u" href="https://github.com/ShlokLande" target="_blank" rel="noopener">GitHub</a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer>
        <div className="foot-inner">
          <span>Shlok Lande, 2026</span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </>
  )
}
