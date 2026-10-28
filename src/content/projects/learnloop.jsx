import { Screenshot, DiagramFigure } from '../../components/Figure.jsx'
import { LearnloopFlow } from '../../diagrams/index.js'

export const meta = {
  slug: 'learnloop',
  title: 'LearnLoop',
  kicker: 'Solo project',
  summary: 'Study-group scheduling for students, with the scheduling logic in a Node.js backend.',
  tags: ['Node.js', 'JavaScript'],
  image: { src: 'projects/learnloop/home.png', alt: 'LearnLoop screenshot' },
}

export const page = {
  kicker: 'Solo project',
  summary: 'A study-group scheduling platform for students, built solo from front end to back end.',
  hackathon: false,
  facts: [
    { label: 'What I did', value: 'Everything: front end, backend, scheduling logic' },
    { label: 'Built with', value: 'HTML, CSS, JavaScript, Node.js' },
    {
      label: 'Links',
      value: (
        <a href="https://github.com/ShlokLande" target="_blank" rel="noopener">
          github.com/ShlokLande ↗
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
          <Screenshot n={1} path="projects/learnloop/home.png" alt="LearnLoop screenshot" caption="LearnLoop's main screen." />
          <p>
            LearnLoop helps students set up study-group sessions. Students share when they&apos;re free, and the backend
            schedules sessions and handles the workflow around them automatically.
          </p>
        </>
      ),
    },
    {
      id: 'how',
      label: 'How it works',
      body: (
        <DiagramFigure n={2} caption="Availability in, scheduled study sessions out.">
          <LearnloopFlow />
        </DiagramFigure>
      ),
    },
    {
      id: 'built',
      label: 'What I built',
      body: (
        <ul className="wu-list">
          <li>A front end in plain HTML, CSS and JavaScript.</li>
          <li>A Node.js backend with the scheduling logic for study sessions.</li>
          <li>Automated handling of each session&apos;s workflow.</li>
        </ul>
      ),
    },
  ],
}
