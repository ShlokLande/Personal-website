import { DiagramFigure } from '../../components/Figure.jsx'
import { CommuteGeohash, CommutePipeline } from '../../diagrams/index.js'

export const meta = {
  slug: 'commuteity',
  title: 'COMMUTEity',
  kicker: 'AWS hackathon',
  summary: 'Finds students who already share your commute, without sending raw GPS off the phone.',
  tags: ['AWS Lambda', 'DynamoDB', 'Bedrock'],
  image: { diagram: 'CommuteGeohash', props: { compact: true }, alt: 'Two commutes overlapping on a geohash grid' },
}

export const page = {
  kicker: 'AWS hackathon, 6 hours',
  summary: 'An app that finds students who already share your commute, so you can travel together.',
  hackathon: true,
  facts: [
    { label: 'Built with', value: 'React Native, AWS Lambda, DynamoDB, Cognito, Amazon Bedrock' },
    { label: 'When', value: 'Summer 2026' },
  ],
  sections: [
    {
      id: 'overview',
      label: 'Overview',
      body: (
        <>
          <DiagramFigure n={1} caption="Two commutes on a geohash grid. The highlighted cells are the stretch they share.">
            <CommuteGeohash />
          </DiagramFigure>
          <p>
            The hackathon theme was student success, and we picked belonging: commuters often struggle to make connections
            at school. COMMUTEity records your commute for a few days to learn your usual route, then suggests students who
            are already on it, rather than forcing a match.
          </p>
          <p>Profiles and socials are only shared once both people opt in.</p>
        </>
      ),
    },
    {
      id: 'privacy',
      label: 'Keeping location private',
      body: (
        <p>
          Raw GPS never leaves the phone. The app turns each location into a geohash, a short code for a cell on the map,
          and sends only cell codes and timestamps. Comparing two commutes then becomes comparing two sequences of cells,
          which is cheap and reveals much less than a GPS trace.
        </p>
      ),
    },
    {
      id: 'how',
      label: 'How it works',
      body: (
        <>
          <DiagramFigure n={2} caption="The AWS side: Cognito sign-in, a Lambda overlap engine over DynamoDB, and Bedrock writing the explanation.">
            <CommutePipeline />
          </DiagramFigure>
          <ul className="wu-list">
            <li>
              When a commute ends, the app calls <code>/commute/end</code> with that session&apos;s cells and times.
            </li>
            <li>A Lambda overlap engine compares completed sessions pairwise, looking for overlap that keeps recurring.</li>
            <li>Overlap scores live in DynamoDB next to the sessions and users.</li>
            <li>
              Amazon Bedrock (Claude Sonnet 4.5) turns the raw overlap numbers into a plain-language reason the two people
              match.
            </li>
            <li>New matches come back in the same response, so the app can show them straight away.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'features',
      label: 'Features',
      body: (
        <>
          <ul className="wu-list">
            <li>Sign-in with Amazon Cognito.</li>
            <li>Commutes stored as geohash cells, so raw GPS never leaves the phone.</li>
            <li>A Lambda overlap engine that finds commutes that keep overlapping.</li>
            <li>Plain-language match explanations from Amazon Bedrock.</li>
            <li>Demo routes from a trimmed copy of TransLink&apos;s GTFS feed.</li>
          </ul>
          <p className="wu-note">
            Our workshop sandbox account blocked Cognito in its default region, so we moved the stack to us-east-1 partway
            through the hackathon.
          </p>
        </>
      ),
    },
    {
      id: 'next',
      label: 'What we planned next',
      body: (
        <ul className="wu-list">
          <li>Similar-route search with vector embeddings, so near-identical routes still match.</li>
          <li>Comparing a recorded path with TransLink routes to work out which bus or train someone took.</li>
        </ul>
      ),
    },
  ],
}
