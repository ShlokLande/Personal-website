import { Diagram, Box, Arrow, T, Region, C } from './kit.jsx'

/* match-a: two roles, one Next.js app, Supabase underneath, a churn model on the side. */
export function MatchaArch() {
  return (
    <Diagram w={760} h={318} label="match-a architecture: volunteers and coordinators use one Next.js app with a separate dashboard per role. Supabase handles auth roles, the Postgres database and Realtime WebSocket updates. A Python logistic-regression model reads volunteer activity and flags volunteers at risk of dropping off for coordinators.">
      <Box x={14} y={40} w={150} h={56} title="Volunteer" sub="impact dashboard" />
      <Box x={14} y={190} w={150} h={56} title="Coordinator" sub="organization dashboard" />
      <Arrow d="M164 68 C 204 68 204 114 238 114" both />
      <Arrow d="M164 218 C 204 218 204 168 238 168" both />
      <Box x={240} y={96} w={170} h={90} title="Next.js app" sub={['one app,', 'a dashboard per role']} tone="leaf" />

      <Region x={460} y={10} w={290} h={222} label="Supabase" />
      <Box x={482} y={38} w={248} h={50} title="Auth" sub="volunteer and coordinator roles" />
      <Box x={482} y={100} w={248} h={50} title="Postgres" sub="volunteers, opportunities, requests" />
      <Box x={482} y={162} w={248} h={50} title="Realtime" sub="WebSocket updates" tone="hi" />
      <Arrow d="M410 125 H478" both />
      <Arrow d="M478 187 C 444 187 444 166 412 166" label="live" lx={446} ly={206} />

      <Box x={240} y={240} w={200} h={52} title="Churn model" sub="Python, logistic regression" />
      <Arrow d="M600 232 C 600 266 480 266 444 266" label="reads activity" lx={560} ly={284} muted />
      <Arrow d="M240 266 C 200 266 186 256 166 246" dashed />
      <T x={14} y={276} size={12.5}>flags volunteers at</T>
      <T x={14} y={292} size={12.5}>risk of dropping off</T>
    </Diagram>
  )
}

/* COMMUTEity: two commutes on a geohash grid; shared cells are the overlap. */
export function CommuteGeohash({ compact = false }) {
  const cols = 12
  const rows = 6
  const s = 42
  const ox = 16
  const oy = 16
  const a = [[0, 4], [1, 4], [2, 3], [3, 3], [4, 3], [5, 2], [6, 2], [7, 2], [8, 1], [9, 1], [10, 0], [11, 0]]
  const b = [[1, 5], [2, 4], [3, 3], [4, 3], [5, 2], [6, 2], [7, 2], [8, 2], [9, 3], [10, 3], [11, 4]]
  const key = (c) => c.join(',')
  const shared = new Set(a.map(key).filter((k) => b.map(key).includes(k)))
  const center = ([c, r]) => [ox + c * s + s / 2, oy + r * s + s / 2]
  const line = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${center(p).join(' ')}`).join(' ')
  return (
    <Diagram w={compact ? 536 : 760} h={compact ? 286 : 290} label="Two students' commutes drawn over a grid of geohash cells. The cells both routes pass through are highlighted: that shared stretch is the overlap COMMUTEity looks for. Only cell IDs and times leave the phone.">
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => (
          <rect key={`${c}-${r}`} x={ox + c * s} y={oy + r * s} width={s} height={s}
            fill={shared.has(`${c},${r}`) ? C.hi : C.paper} stroke={C.line} strokeWidth="1" />
        )),
      )}
      <path d={line(a)} fill="none" stroke={C.fern} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d={line(b)} fill="none" stroke={C.ink} strokeWidth="2.2" strokeDasharray="7 6" strokeLinecap="round" strokeLinejoin="round" />
      <T x={ox + 4} y={oy + 13} size={9.5} code>c2b2qe</T>

      {!compact && (
      <g transform="translate(540 30)">
        <line x1="0" y1="8" x2="34" y2="8" stroke={C.fern} strokeWidth="3.2" strokeLinecap="round" />
        <T x={44} y={13} size={13.5} color={C.ink}>Student A&apos;s commute</T>
        <line x1="0" y1="40" x2="34" y2="40" stroke={C.ink} strokeWidth="2.2" strokeDasharray="7 6" />
        <T x={44} y={45} size={13.5} color={C.ink}>Student B&apos;s commute</T>
        <rect x="0" y="62" width="34" height="22" fill={C.hi} stroke={C.line} />
        <T x={44} y={78} size={13.5} color={C.ink}>Cells both pass through</T>
        <T x={0} y={130} size={13}>Each cell is a geohash: a short</T>
        <T x={0} y={148} size={13}>code for a patch of map.</T>
        <T x={0} y={182} size={13}>The phone sends cell codes and</T>
        <T x={0} y={200} size={13}>times, never raw GPS.</T>
      </g>
      )}
    </Diagram>
  )
}

/* COMMUTEity: the AWS side. */
export function CommutePipeline() {
  return (
    <Diagram w={760} h={300} label="COMMUTEity backend: the phone signs in with Cognito and sends geohash cells and times when a commute ends. A Lambda overlap engine compares sessions in DynamoDB pairwise, asks Amazon Bedrock to explain each match in plain language, and returns matches to the phone. Socials are only shared after both people opt in.">
      <Box x={14} y={100} w={140} h={64} title="Phone app" sub="React Native" tone="leaf" />
      <Box x={14} y={14} w={140} h={50} title="Cognito" sub="sign-in" />
      <Arrow d="M84 64 V96" both muted />
      <Arrow d="M154 120 H236" label="cells + times" lx={195} ly={110} />
      <Box x={240} y={92} w={170} h={80} title="Overlap engine" sub={['Lambda, compares', 'sessions pairwise']} tone="hi" />
      <Arrow d="M325 172 V204" both />
      <Box x={240} y={208} w={170} h={48} title="DynamoDB" sub="sessions, scores, users" />
      <Arrow d="M410 132 H492" label="overlap stats" lx={451} ly={122} />
      <Box x={496} y={100} w={160} h={64} title="Bedrock" sub="Claude Sonnet 4.5" />
      <T x={666} y={124} size={12.5}>writes the</T>
      <T x={666} y={140} size={12.5}>&ldquo;why you</T>
      <T x={666} y={156} size={12.5}>match&rdquo;</T>
      <Arrow d="M576 164 V284 H84 V168" label="matches + explanation, then mutual opt-in" lx={590} ly={276} dashed />
    </Diagram>
  )
}

/* Code Unity: the weekly loop. */
export function CodeUnityLoop() {
  return (
    <Diagram w={760} h={196} label="Code Unity's weekly loop: a one-hour live class on Saturday over Google Meet, practice problems with answer keys, the recording and code posted to YouTube and GitHub, then the next week's lesson. Instructors rotated.">
      <Box x={14} y={30} w={168} h={70} title="Live class" sub={['Saturday, 1 hour,', 'Google Meet']} tone="leaf" />
      <Arrow d="M182 65 H206" />
      <Box x={208} y={30} w={168} h={70} title="Practice problems" sub="with answer keys" />
      <Arrow d="M376 65 H400" />
      <Box x={402} y={30} w={168} h={70} title="Posted online" sub={['recording on YouTube,', 'code on GitHub']} />
      <Arrow d="M570 65 H594" />
      <Box x={596} y={30} w={150} h={70} title="Next lesson" tone="hi" />
      <Arrow d="M671 100 C 671 160 98 160 98 104" label="every week, 24 lessons in all" lx={384} ly={180} dashed />
    </Diagram>
  )
}

/* DermAI: one photo in, a routine out. */
export function DermaiFlow() {
  return (
    <Diagram w={760} h={150} label="DermAI flow: a selfie goes to the Gemini API with a prompt that asks for structured output, which comes back as skin concerns and a routine that the app turns into product recommendations.">
      <Box x={14} y={40} w={150} h={64} title="Selfie" sub="no sign-up" />
      <Arrow d="M164 72 H204" />
      <Box x={206} y={40} w={170} h={64} title="Gemini API" sub="prompt asks for structure" tone="leaf" />
      <Arrow d="M376 72 H416" />
      <Box x={418} y={40} w={150} h={64} title="Structured result" sub="concerns + routine" tone="hi" />
      <Arrow d="M568 72 H604" />
      <Box x={606} y={40} w={140} h={64} title="Recommendations" />
    </Diagram>
  )
}

/* LearnLoop: availability in, sessions out. */
export function LearnloopFlow() {
  return (
    <Diagram w={760} h={150} label="LearnLoop flow: students add their availability, Node.js scheduling logic finds a time, a study session is created, and the rest of the session workflow is handled automatically.">
      <Box x={14} y={40} w={160} h={64} title="Availability" sub="from each student" />
      <Arrow d="M174 72 H210" />
      <Box x={212} y={40} w={170} h={64} title="Scheduling logic" sub="Node.js" tone="leaf" />
      <Arrow d="M382 72 H418" />
      <Box x={420} y={40} w={150} h={64} title="Study session" tone="hi" />
      <Arrow d="M570 72 H606" />
      <Box x={608} y={40} w={138} h={64} title="Workflow" sub="handled automatically" />
    </Diagram>
  )
}
