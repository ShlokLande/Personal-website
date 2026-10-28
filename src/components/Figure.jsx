import { useState } from 'react'
import { image, imagePath } from '../lib/images.js'

/* Let a long path wrap only after a slash, never inside a name like match-a. */
const breakAtSlashes = (path) =>
  path.split('/').flatMap((part, i, all) => {
    const seg = <span key={`s${i}`}>{i < all.length - 1 ? `${part}/` : part}</span>
    return i < all.length - 1 ? [seg, <wbr key={`b${i}`} />] : [seg]
  })

/* Striped stand-in that says exactly which file to drop in. */
function Placeholder({ path, alt }) {
  return (
    <div className="ph" role="img" aria-label={`Image to add: ${alt}`}>
      <span className="ph-what">{alt}</span>
      <span className="ph-how">
        Add a file at <code>{breakAtSlashes(path)}</code>
      </span>
    </div>
  )
}

/** An image that falls back to the placeholder when the file isn't there yet (used on cards). */
export function Pic({ src, alt, placeholder }) {
  const [failed, setFailed] = useState(!src)
  return failed ? <Placeholder path={placeholder} alt={alt} /> : <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
}

/**
 * A numbered figure. Pass `src` for an image (falls back to the placeholder if
 * the file is missing), or `children` for a diagram.
 */
export default function Figure({ src, alt = '', caption, n, frame = 'plain', url, placeholder, children, wide = false }) {
  const [failed, setFailed] = useState(!src)
  let media = children
  if (!media) {
    media = failed ? (
      <Placeholder path={placeholder} alt={alt} />
    ) : (
      <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
    )
  }
  return (
    <figure className={`fig fig-${frame} ${wide ? 'fig-wide' : ''}`}>
      <div className="fig-frame">
        {frame === 'browser' && (
          <div className="fig-chrome" aria-hidden="true">
            <i />
            <i />
            <i />
            {url && <span>{url}</span>}
          </div>
        )}
        {media}
      </div>
      {caption && (
        <figcaption>
          {n != null && <span className="fig-n">Fig. {n}</span>} {caption}
        </figcaption>
      )}
    </figure>
  )
}

/** A screenshot from src/images/<path> in a browser frame, or its placeholder. */
export function Screenshot({ path, alt, url, caption, n }) {
  return <Figure src={image(path)} alt={alt} url={url} caption={caption} n={n} frame="browser" placeholder={imagePath(path)} />
}

/** A photo from src/images/<path>, or its placeholder. */
export function Photo({ path, alt, caption, n }) {
  return <Figure src={image(path)} alt={alt} caption={caption} n={n} placeholder={imagePath(path)} />
}

/** A diagram as a numbered figure. */
export function DiagramFigure({ n, caption, children }) {
  return (
    <Figure n={n} caption={caption} frame="diagram">
      {children}
    </Figure>
  )
}
