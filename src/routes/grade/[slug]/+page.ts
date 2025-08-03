import type { PageLoad } from './$types'
import questions from '$lib/data/questions-transformed.json'

export const load: PageLoad = ({ params }) => {
  const grade = params.slug
  switch (grade) {
    case '3':
      return { questions: questions.slice(43, 58), grade: 3 }
    case '2':
      return { questions: questions.slice(26, 43), grade: 2 }
    case '1':
    default:
      return { questions: questions.slice(0, 25), grade: 1 }
  }
}
