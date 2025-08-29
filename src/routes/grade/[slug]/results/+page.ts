import type { PageLoad } from './$types'
import questions from '$lib/data/questions-transformed.json'

export const load: PageLoad = ({ params }) => {
  const grade = Number(params.slug)
  switch (grade) {
    case 3:
      return { questions: questions[grade - 1], grade }
    case 2:
      return { questions: questions[grade - 1], grade }
    case 1:
    default:
      return { questions: questions[grade - 1], grade }
  }
}
