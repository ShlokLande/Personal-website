export const meta = {
  slug: 'learnloop',
  title: 'LearnLoop',
  kicker: 'Solo project',
  summary: 'Study-group scheduling for students, with the scheduling logic in a Node.js backend.',
  tags: ['Node.js', 'JavaScript'],
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
          <p>
            LearnLoop helps students set up study-group sessions. Students share when they&apos;re free, and the backend
            schedules sessions and handles the workflow around them automatically.
          </p>
        </>
      ),
    },
    {
      id: 'features',
      label: 'Features',
      body: (
        <ul className="wu-list">
          <li>Students share when they&apos;re free.</li>
          <li>A Node.js backend schedules study sessions automatically.</li>
          <li>Each session&apos;s workflow is handled automatically.</li>
        </ul>
      ),
    },
  ],
}
