/* A sheet of cream paper on the mat. Everything long-form sits on one. */
export default function PaperSheet({ children, as: Tag = 'article', className = '' }) {
  return <Tag className={`sheet ${className}`}>{children}</Tag>
}
