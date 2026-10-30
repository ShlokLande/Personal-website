import { Screenshot, DiagramFigure } from '../../components/Figure.jsx'
import { MatchaArch } from '../../diagrams/index.js'

export const meta = {
  slug: 'match-a',
  title: 'match-a',
  kicker: 'youCode 2026, 2nd place',
  summary: 'Volunteer matching for BC nonprofits, built in under 24 hours, with live dashboards and a churn model.',
  tags: ['Next.js', 'Supabase', 'Python'],
  live: { href: 'https://match-a-seven.vercel.app', label: 'Live site' },
  image: { src: 'projects/match-a/home.png', alt: 'match-a home page' },
}

export const page = {
  kicker: 'youCode 2026, 2nd place in the SAP Non-Profit category',
  summary: 'A two-sided volunteer-matching platform for BC nonprofits, built in under 24 hours.',
  hackathon: true,
  facts: [
    { label: 'Built with', value: 'Next.js, TypeScript, Tailwind, Supabase, PostgreSQL, Python' },
    { label: 'When', value: 'youCode 2026' },
    {
      label: 'Links',
      value: (
        <a href="https://match-a-seven.vercel.app" target="_blank" rel="noopener">
          match-a-seven.vercel.app ↗
        </a>
      ),
    },
  ],
  sections: [
    {
      id: 'overview',
      label: 'Overview',
      body: (
        <>
          <Screenshot n={1} path="projects/match-a/home.png" alt="match-a home page" url="match-a-seven.vercel.app"
            caption="The landing page. Volunteers and coordinators each pick their side and sign up." />
          <p>
            match-a connects people who want to volunteer with the BC nonprofits that need them. Volunteers are matched to
            opportunities by their interests and availability. Coordinators manage their organization and can send urgent
            requests that reach volunteers right away.
          </p>
          <p>We built it in under 24 hours at youCode 2026 and placed 2nd in the SAP Non-Profit category.</p>
        </>
      ),
    },
    {
      id: 'problem',
      label: 'The problem',
      body: (
        <p>
          The SAP challenge was about strengthening BC&apos;s nonprofit workforce. The province has roughly 29,000
          nonprofits drawing on a limited pool of volunteers. We focused on two things: getting a new volunteer matched in
          minutes instead of through long forms, and giving coordinators a way to reach people quickly when something comes
          up.
        </p>
      ),
    },
    {
      id: 'how',
      label: 'How it works',
      body: (
        <>
          <DiagramFigure n={2} caption="One Next.js app with a dashboard per role, Supabase underneath, and a churn model on the side.">
            <MatchaArch />
          </DiagramFigure>
          <ul className="wu-list">
            <li>Sign-up asks about interests and availability, then matches the new volunteer to open opportunities.</li>
            <li>
              Supabase Auth gives every account a role, so volunteers land on an impact-tracking dashboard and coordinators
              land on an organization dashboard.
            </li>
            <li>Dashboards update live over Supabase Realtime WebSocket subscriptions.</li>
            <li>An urgent request from a coordinator is pushed to volunteers in real time, and they can accept with one tap.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'features',
      label: 'Features',
      body: (
        <ul className="wu-list">
          <li>Interest-based onboarding that matches new volunteers to open opportunities.</li>
          <li>Separate volunteer and coordinator dashboards, with role-based access through Supabase Auth.</li>
          <li>Dashboards that update live, without a refresh.</li>
          <li>Urgent requests that coordinators push to volunteers in real time.</li>
          <li>A churn model (logistic regression in Python) that flags volunteers at risk of dropping off.</li>
        </ul>
      ),
    },
    {
      id: 'result',
      label: 'Result',
      body: (
        <>
          <p>
            2nd place in the SAP Non-Profit category at youCode 2026, which came with an invitation to meet SAP Vancouver
            executives. The site is still live at{' '}
            <a href="https://match-a-seven.vercel.app" target="_blank" rel="noopener">match-a-seven.vercel.app</a>.
          </p>
        </>
      ),
    },
  ],
}
