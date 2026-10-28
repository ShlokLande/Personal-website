/* The "what / with / when / links" strip under a write-up's title. */
export default function FactStrip({ items, tag }) {
  return (
    <div className="facts">
      <dl className="facts-list">
        {items.map(({ label, value }) => (
          <div key={label} className="facts-item">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      {tag && <span className="facts-tag">{tag}</span>}
    </div>
  )
}
