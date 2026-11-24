import type { TopicId } from './services'

export const mainNav = [
  { path: '/', label: 'Etusivu' },
  { path: '/palvelut', label: 'Palvelut' },
  { path: '/laboratorio', label: 'Laboratorio' },
  { path: '/hinnasto', label: 'Hinnasto' },
  { path: '/yhteystiedot', label: 'Yhteystiedot' },
] as const

/** Link to the request form, optionally pre-selecting a service (and extra query params). */
export const requestHref = (topic?: TopicId, extra: Record<string, string> = {}) => {
  const p = new URLSearchParams({ ...(topic ? { palvelu: topic } : {}), ...extra }).toString()
  return `/yhteystiedot${p ? `?${p}` : ''}#tarjouspyynto`
}
