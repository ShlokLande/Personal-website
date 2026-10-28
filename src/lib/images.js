/*
 * Screenshots and photos live in src/images/. Only files that exist get bundled,
 * so a missing image shows its placeholder without a 404 request.
 */
const files = import.meta.glob('../images/**/*.{png,jpg,jpeg,webp,gif,avif}', { eager: true, import: 'default' })

/** URL for src/images/<path>, or null if the file isn't there yet. */
export const image = (path) => files[`../images/${path}`] ?? null

/** Where to drop the file, shown on its placeholder. */
export const imagePath = (path) => `src/images/${path}`
