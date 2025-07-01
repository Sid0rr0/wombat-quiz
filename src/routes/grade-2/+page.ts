import type { PageLoad } from './$types'
import questions from '$lib/data/questions-transformed.json'

export const load: PageLoad = () => {
  return { questions: questions.slice(26, 43) }
}
