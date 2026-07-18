import { useEffect } from 'react'

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
      <div className="orb orb1"></div><div className="orb orb2"></div><div className="orb orb3"></div>

      <nav>
        <div className="nav-inner">
          <a className="logo" href="#top">Shlok <span>Lande</span></a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a className="nav-cta" href="#contact">Get in touch</a>
          </div>
        </div>
      </nav>

      <main id="top">

        <header className="hero wrap">
          <div className="hero-content">
            <h1>Hey, I'm Shlok.<br />I turn ideas into <span className="grad">things that work</span>.</h1>
            <p className="sub">Computer Engineering student at <strong>UBC</strong> writing firmware for a solar race car on <strong>UBC Solar</strong>, shipping hackathon-winning web platforms, and teaching kids to code through a nonprofit I co-founded.</p>
            <div className="hero-btns">
              <a className="btn btn-primary" href="#projects">View my work →</a>
              <a className="btn btn-ghost" href="https://github.com/ShlokLande" target="_blank" rel="noopener">GitHub</a>
              <a className="btn btn-ghost" href="https://linkedin.com/in/shloklande" target="_blank" rel="noopener">LinkedIn</a>
            </div>
          </div>
        </header>

        <section id="about">
          <div className="wrap">
            <span className="sec-tag reveal">01 — about</span>
            <h2 className="reveal">The quick rundown</h2>
            <div className="facts-grid">
              <div className="fact-card reveal"><span className="ic">🎓</span><div><div className="k">Studying</div><div className="v">Computer Engineering @ UBC — 2nd year, Class of 2029</div></div></div>
              <div className="fact-card reveal"><span className="ic">💼</span><div><div className="k">Status</div><div className="v">Open to internships &amp; co-op opportunities</div></div></div>
              <div className="fact-card reveal"><span className="ic">☀️</span><div><div className="k">Design team</div><div className="v"><a href="https://ubcsolar.com/" target="_blank" rel="noopener">UBC Solar ↗</a> — Embedded Software</div></div></div>
            </div>
          </div>
        </section>

        <section id="experience">
          <div className="wrap">
            <span className="sec-tag reveal">02 — experience</span>
            <h2 className="reveal">Where I've been building</h2>
            <p className="sec-sub reveal">Real hardware, real users, real deadlines.</p>
            <div className="timeline">
              <div className="t-item reveal">
                <div className="t-date">2025 — Present</div>
                <h3>Embedded Software Subteam Member</h3>
                <div className="org">UBC Solar · Vancouver, BC</div>
                <ul>
                  <li>Developed firmware for a BNO08x IMU on an STM32F103 microcontroller using FreeRTOS, integrating I2C and CAN bus for real-time vehicle telemetry.</li>
                  <li>Debugged low-level I2C driver issues and implemented bus recovery routines to fix hardware communication failures during sensor bring-up.</li>
                  <li>Authored a design review document (DR0) for IMU integration architecture and 2026ed technical updates to the engineering team.</li>
                </ul>
              </div>
              <div className="t-item reveal">
                <div className="t-date">Jan 2024 — Present</div>
                <h3>Co-Founder &amp; Vice President</h3>
                <div className="org">Code Unity · Youth Coding Nonprofit</div>
                <ul>
                  <li>Co-founded a nonprofit delivering weekly programming education sessions for youth.</li>
                  <li>Design lesson plans on algorithmic thinking and core CS concepts for non-technical audiences.</li>
                </ul>
              </div>
              <div className="t-item reveal">
                <div className="t-date">Oct 2024 — Jun 2025</div>
                <h3>Vice President of Technology</h3>
                <div className="org">Loop · Junior Achievement Company · Calgary, AB</div>
                <ul>
                  <li>Led operational and technical initiatives for a student-run company in a customer-facing environment.</li>
                  <li>Coordinated cross-functional teams across sales, customer engagement, and logistics.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="wrap">
            <span className="sec-tag reveal">03 — projects</span>
            <h2 className="reveal">Things I've shipped</h2>
            <p className="sec-sub reveal">Hackathon builds, platforms, and tools.</p>
            <div className="proj-grid">
              <div className="proj-card featured reveal">
                <h3>match-a</h3>
                <p> <strong>🏆 youCode 2026 — 2nd Place, SAP Non-Profit.</strong> <br />Two-sided volunteer-matching platform for BC nonprofits, built in under 24 hours with a team of two. Live dashboards via Supabase Realtime WebSockets, plus a Python logistic-regression model that flags volunteers at risk of churning.</p>
                <div className="tags"><span className="tag">Next.js</span><span className="tag">TypeScript</span><span className="tag">Tailwind</span><span className="tag">Supabase</span><span className="tag">PostgreSQL</span><span className="tag">Python</span></div>
                <div className="proj-links"><a href="https://match-a-seven.vercel.app" target="_blank" rel="noopener">Live site ↗</a></div>
              </div>
              <div className="proj-card reveal">
                <h3>DermAI</h3>
                <p>AI-powered skincare analysis web app that uses the Google Gemini API to turn unstructured skin data into personalized, structured skincare insights.</p>
                <div className="tags"><span className="tag">Gemini API</span><span className="tag">JavaScript</span><span className="tag">Vercel</span></div>
                <div className="proj-links"><a href="https://dermai-gray.vercel.app" target="_blank" rel="noopener">Live site ↗</a></div>
              </div>
              <div className="proj-card reveal">
                <h3>LearnLoop</h3>
                <p>Study-group scheduling platform with backend scheduling logic and automated workflow handling for student study sessions.</p>
                <div className="tags"><span className="tag">Node.js</span><span className="tag">JavaScript</span><span className="tag">HTML/CSS</span></div>
                <div className="proj-links"><a href="https://github.com/ShlokLande" target="_blank" rel="noopener">GitHub ↗</a></div>
              </div>
              <div className="proj-card reveal">
                <h3>Code Unity</h3>
                <p>Co-founded nonprofit running free weekly programming sessions for youth — lesson plans on algorithmic thinking and core CS concepts, taught to learners of all levels.</p>
                <div className="tags"><span className="tag">Teaching</span><span className="tag">Curriculum Design</span><span className="tag">Leadership</span></div>
                <div className="proj-links"><a href="https://codeunity.wixsite.com" target="_blank" rel="noopener">Website ↗</a></div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="wrap">
            <span className="sec-tag reveal">04 — contact</span>
            <h2 className="reveal">Let's build something.</h2>
            <p className="sec-sub reveal">I'm looking for internship and co-op opportunities in software and embedded engineering. If my work looks interesting, I'd love to hear from you.</p>
            <div className="contact-links reveal">
              <a className="btn btn-primary" href="mailto:shloklande[at]gmail.com">shloklande@gmail.com</a>
              <a className="btn btn-ghost" href="https://linkedin.com/in/shloklande" target="_blank" rel="noopener">LinkedIn</a>
              <a className="btn btn-ghost" href="https://github.com/ShlokLande" target="_blank" rel="noopener">GitHub</a>
            </div>
          </div>
        </section>

      </main>

      <footer>
        <div className="wrap"><a href="#top">Back to top ↑</a></div>
      </footer>
    </>
  )
}
