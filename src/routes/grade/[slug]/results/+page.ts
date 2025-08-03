import type { PageLoad } from './$types'

export const load: PageLoad = ({ params }) => {
  const grade = params.slug

  return { grade }
}
