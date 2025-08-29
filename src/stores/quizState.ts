import { browser } from '$app/environment'
import { onMount } from 'svelte'
import { writable } from 'svelte/store'

interface QuizState {
  currentQuestionIndex: number
  answers: number[]
  totalScore: number
  completed: boolean
  grade: number
  numberOfQuestions: number
}

export const initialQuizState: QuizState = {
  currentQuestionIndex: 0,
  answers: [],
  totalScore: 0,
  completed: false,
  grade: 1,
  numberOfQuestions: 25,
}

function copyInitialQuizState(grade = 1): QuizState {
  return JSON.parse(JSON.stringify({ ...initialQuizState, grade }))
}

function getQuizStateKey(grade: number): string {
  return `quizStateGrade${grade}`
}

export default function quizStore() {
  const quizState = writable(copyInitialQuizState())
  const { subscribe, update } = quizState
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
      if (state.currentQuestionIndex < state.numberOfQuestions - 1) {
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
    quizState.update((state) => {
      localStorage.setItem(getQuizStateKey(state.grade), JSON.stringify(initialQuizState))
      return {
        ...initialQuizState,
        answers: [],
        grade: state.grade,
        numberOfQuestions: state.numberOfQuestions,
      }
    })
  }

  function setGrade(newGrade: number, numberOfQuestions: number = 25) {
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
        numberOfQuestions,
      }

      if (browser) {
        localStorage.setItem(getQuizStateKey(newGrade), JSON.stringify(newState))
      }

      return newState
    })
  }

  function setQuestionIndex(index: number) {
    update((state) => {
      if (index >= 0 && index < state.numberOfQuestions) {
        state.currentQuestionIndex = index
      }
      return state
    })
  }

  function setIsCompleted() {
    update((state) => {
      state.completed = true
      return state
    })
  }

  return {
    subscribe,
    previousQuestion,
    nextQuestion,
    reset,
    submitAnswer,
    initialQuizState: copyInitialQuizState(),
    setGrade,
    quizState,
    setQuestionIndex,
    setIsCompleted,
  }
}
