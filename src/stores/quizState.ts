import { browser } from '$app/environment'
import { onMount } from 'svelte'
import { writable } from 'svelte/store'

export const initialQuizState = {
  currentQuestionIndex: 0,
  answers: [],
  totalScore: 0,
  completed: false,
}

function copyInitialQuizState() {
  return JSON.parse(JSON.stringify(initialQuizState))
}

export default function quizStore() {
  let quizState = null
  if (browser) {
    quizState = localStorage.getItem('quizState')
  }

  const { subscribe, set, update } = writable(
    quizState ? JSON.parse(quizState) : copyInitialQuizState(),
  )

  function nextQuestion() {
    update((state) => {
      if (state.currentQuestionIndex < 24) {
        state.currentQuestionIndex += 1
      }
      else {
        state.completed = true
      }

      return state
    })
  }

  onMount(() => {
    subscribe((state) => {
      localStorage.setItem('quizState', JSON.stringify(state))
    })
  })

  function submitAnswer(index: number, score: number) {
    update((state) => {
      state.answers.push(index)
      state.totalScore += score
      return state
    })
  }

  function previousQuestion() {
    update((state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1
      }
      return state
    })
  }

  function reset() {
    set(copyInitialQuizState())
    localStorage.setItem('quizState', JSON.stringify(initialQuizState))
  }

  return {
    subscribe,
    set,
    update,
    previousQuestion,
    nextQuestion,
    reset,
    submitAnswer,
    initialQuizState: copyInitialQuizState(),
  }
}
