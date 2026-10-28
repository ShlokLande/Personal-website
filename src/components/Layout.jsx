import { useEffect, useState } from 'react'
import { href, asset } from '../lib/href.js'
import { person } from '../content/site.js'
import '../styles/components.css'

function useEmail() {
  // Built after mount so the plain address never appears in the served HTML.
  const [email, setEmail] = useState('')
  useEffect(() => setEmail(person.emailParts.join('@')), [])
  return email
}

function TopBar({ current }) {
  return (
    <header className="topbar">
      <div className="topbar-in">
        <a className="brand" href={href('/')} aria-current={current === 'home' ? 'page' : undefined}>
          {person.name}
        </a>
        <nav className="topnav" aria-label="Main">
          <a className="hide-sm" href={href('/#experience')}>Experience</a>
          <a href={href('/#projects')}>Projects</a>
          <a href="#contact">Contact</a>
          <a className="pill" href={asset(person.resume)} target="_blank" rel="noopener">
            Resume
          </a>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  const email = useEmail()
  return (
    <footer id="contact" className="footer">
      <div className="footer-in">
        <h2 className="footer-title">Contact</h2>
        <ul className="footer-links">
          <li>
            <a className="pill pill-solid" href={email ? `mailto:${email}` : '#contact'}>
              {email || 'Email'}
            </a>
          </li>
          <li>
            <a className="pill" href={person.linkedin} target="_blank" rel="noopener">LinkedIn</a>
          </li>
          <li>
            <a className="pill" href={person.github} target="_blank" rel="noopener">GitHub</a>
          </li>
          <li>
            <a className="pill" href={asset(person.resume)} target="_blank" rel="noopener">Resume (PDF)</a>
          </li>
        </ul>
        <p className="footer-small">Shlok Lande, Vancouver</p>
      </div>
    </footer>
  )
}

/* Faint protractor lines in the corner of the mat, like a real cutting mat. */
function MatMarks() {
  return (
    <svg className="mat-marks" viewBox="0 0 520 520" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <path d="M520 520 L0 520" />
        <path d="M520 520 L70 260" />
        <path d="M520 520 L152 152" />
        <path d="M520 520 L260 70" />
        <path d="M520 520 L520 0" />
        <path d="M520 400 A120 120 0 0 0 400 520" />
        <path d="M520 280 A240 240 0 0 0 280 520" />
      </g>
      <g fill="currentColor" fontFamily="var(--body)" fontSize="13">
        <text x="300" y="402">30°</text>
        <text x="378" y="352">45°</text>
        <text x="430" y="300">60°</text>
      </g>
    </svg>
  )
}

export default function Layout({ children, current }) {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <TopBar current={current} />
      <main id="main" className="desk">
        {children}
      </main>
      <Footer />
      <MatMarks />
    </>
  )
}
