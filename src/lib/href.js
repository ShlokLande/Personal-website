/** Internal link that respects the deploy base (e.g. /Personal-website/) and ends in a slash. */
export function href(path = '') {
  const base = import.meta.env.BASE_URL
  const clean = path.replace(/^\/+/, '')
  if (!clean) return base
  const [p, hash] = clean.split('#')
  const withSlash = p === '' || p.endsWith('/') || /\.[a-z0-9]+$/i.test(p) ? p : `${p}/`
  return base + withSlash + (hash ? `#${hash}` : '')
}

/** Asset in /public, respecting the deploy base. */
export const asset = (path) => import.meta.env.BASE_URL + path.replace(/^\/+/, '')
