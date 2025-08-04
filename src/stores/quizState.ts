import { browser } from '$app/environment'
import { onMount } from 'svelte'
import { writable } from 'svelte/store'

interface QuizState {
  currentQuestionIndex: number
  answers: number[]
  totalScore: number
  completed: boolean
  grade: number
}

export const initialQuizState: QuizState = {
  currentQuestionIndex: 0,
  answers: [],
  totalScore: 0,
  completed: false,
  grade: 1,
}

function copyInitialQuizState(grade = 1): QuizState {
  return JSON.parse(JSON.stringify({ ...initialQuizState, grade }))
}

function getQuizStateKey(grade: number): string {
  return `quizStateGrade${grade}`
}

export default function quizStore() {
  const quizState = writable(copyInitialQuizState())
  const { subscribe, set, update } = quizState
  let grade = 1
  subscribe(value => grade = value.grade)

  if (browser) {
    const storedQuizState = localStorage.getItem(getQuizStateKey(grade))
    if (storedQuizState) {
      quizState.set(JSON.parse(storedQuizState))
    }
  }

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
      localStorage.setItem(getQuizStateKey(state.grade), JSON.stringify(state))
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
    quizState.update(() => {
      localStorage.setItem(getQuizStateKey(grade), JSON.stringify(initialQuizState))
      return {
        ...initialQuizState,
        grade,
      }
    })
  }

  function setGrade(newGrade: number) {
    update((state) => {
      if (browser) {
        const storedQuizState = localStorage.getItem(getQuizStateKey(newGrade))
        if (storedQuizState) {
          return JSON.parse(storedQuizState)
        }
      }

      const newState = {
        ...state,
        grade: newGrade,
      }

      if (browser) {
        localStorage.setItem(getQuizStateKey(newGrade), JSON.stringify(newState))
      }

      return newState
    })
  }

  function setQuestionIndex(index: number) {
    update((state) => {
      // TODO change this to a more robust check
      if (index >= 0 && index < 25) {
        state.currentQuestionIndex = index
      }
      return state
    })
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
    setGrade,
    quizState,
    setQuestionIndex,
  }
}
