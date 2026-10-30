/* Facts used across pages. Edit here; layout reads from this. */

export const person = {
  name: 'Shlok Lande',
  line: 'Second-year computer engineering student at UBC, writing embedded firmware for UBC Solar. Open to co-op and internship roles.',
  github: 'https://github.com/ShlokLande',
  linkedin: 'https://linkedin.com/in/shloklande',
  // assembled in the browser so the address isn't sitting in the HTML for scrapers
  emailParts: ['shloklande', 'gmail.com'],
  resume: 'ShlokLandeResume.pdf',
}

/* Order here is the order on the home page and in "Next project". */
export const projects = [
  { slug: 'match-a', title: 'match-a', featured: true },
  { slug: 'commuteity', title: 'COMMUTEity', featured: true },
  { slug: 'code-unity', title: 'Code Unity' },
  { slug: 'dermai', title: 'DermAI' },
  { slug: 'learnloop', title: 'LearnLoop' },
]

export function nextProject(slug) {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
