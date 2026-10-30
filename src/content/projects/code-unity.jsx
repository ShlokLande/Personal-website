export const meta = {
  slug: 'code-unity',
  title: 'Code Unity',
  kicker: 'Nonprofit I co-founded',
  summary: 'Free weekly programming lessons for youth: 24 lessons, about 10 students each week.',
  tags: ['Teaching', 'Curriculum'],
  live: { href: 'https://codeunity.wixsite.com/website-1', label: 'Website' },
}

export const page = {
  kicker: 'Nonprofit, co-founder and vice president',
  summary: 'A nonprofit I co-founded that taught free introductory programming classes to kids and teens.',
  hackathon: false,
  facts: [
    { label: 'What I did', value: 'Co-founded it; designed and taught weekly lessons' },
    { label: 'Taught', value: 'Algorithmic thinking and intro Python' },
    { label: 'Reach', value: '24 weekly lessons, about 10 students on average' },
    {
      label: 'Links',
      value: (
        <a href="https://codeunity.wixsite.com/website-1" target="_blank" rel="noopener">
          codeunity.wixsite.com ↗
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
            Code Unity ran free online programming classes for kids and teens who were new to coding. Classes were live on
            Google Meet every Saturday, and everything was posted afterwards so students could catch up or review.
          </p>
        </>
      ),
    },
    {
      id: 'format',
      label: 'How a week worked',
      body: (
        <>
          <ul className="wu-list">
            <li>A one-hour live class on Saturday afternoons.</li>
            <li>Practice problems every week, with answer keys.</li>
            <li>Recordings on YouTube and code on GitHub, shared with everyone who registered.</li>
            <li>Three instructors took turns teaching.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'mine',
      label: 'What I did',
      body: (
        <ul className="wu-list">
          <li>Co-founded the nonprofit and served as vice president.</li>
          <li>Designed lessons on algorithmic thinking and core CS concepts, written for students with no background.</li>
          <li>Taught 24 weekly lessons to an average of 10 students.</li>
        </ul>
      ),
    },
    {
      id: 'now',
      label: 'Where it is now',
      body: <p>Code Unity is paused while its founders are at university.</p>,
    },
  ],
}
