import { Screenshot, DiagramFigure } from '../../components/Figure.jsx'
import { DermaiFlow } from '../../diagrams/index.js'

export const meta = {
  slug: 'dermai',
  title: 'DermAI',
  kicker: 'Hackathon, built with a friend',
  summary: 'Upload a selfie and get structured skincare recommendations back from the Gemini API.',
  tags: ['Gemini API', 'JavaScript'],
  live: { href: 'https://dermai-gray.vercel.app', label: 'Live site' },
  image: { src: 'projects/dermai/home.png', alt: 'DermAI home page' },
}

const CONCERNS = ['Acne and blemishes', 'Fine lines', 'Dark spots', 'Uneven texture', 'Redness', 'Large pores', 'Dryness', 'Oil control']

export const page = {
  kicker: 'Hackathon project, built with a friend',
  summary: 'A skincare analysis web app: upload a selfie and get personalized, structured recommendations from the Gemini API.',
  hackathon: true,
  facts: [
    { label: 'What I did', value: 'Built it with a friend' },
    { label: 'Built with', value: 'Gemini API, JavaScript, Vercel' },
    {
      label: 'Links',
      value: (
        <a href="https://dermai-gray.vercel.app" target="_blank" rel="noopener">
          dermai-gray.vercel.app ↗
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
          <Screenshot n={1} path="projects/dermai/home.png" alt="DermAI home page" url="dermai-gray.vercel.app"
            caption="The DermAI landing page." />
          <p>
            DermAI looks at a selfie and suggests a skincare routine. It needs no sign-up, and results come back in seconds.
          </p>
        </>
      ),
    },
    {
      id: 'how',
      label: 'How it works',
      body: (
        <>
          <DiagramFigure n={2} caption="One photo in, a structured routine out.">
            <DermaiFlow />
          </DiagramFigure>
          <p>
            The app sends the photo to the Gemini API with a prompt that asks for structured output: the concerns it sees
            and what to do about each. Asking for structure turns a free-form model answer into something the page can
            display reliably.
          </p>
        </>
      ),
    },
    {
      id: 'covers',
      label: 'What it looks for',
      body: (
        <ul className="wu-tags">
          {CONCERNS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      ),
    },
    {
      id: 'mine',
      label: 'What I did',
      body: <p>I built DermAI with a friend as a hackathon project and we deployed it on Vercel, where it&apos;s still live.</p>,
    },
  ],
}
