<script lang='ts'>
  import type { PageProps } from './$types'
  import { goto } from '$app/navigation'
  import ParchmentBG from '$lib/components/ParchmentBG.svelte'
  import { onMount } from 'svelte'
  import { Button } from '@/lib/components/ui/button'
  import quizStore from '@/stores/quizState'

  const { data }: PageProps = $props()

  const { reset, quizState, setQuestionIndex, setGrade } = quizStore()
  const grade = data.grade

  onMount(() => {
    if (data.numberOfQuestions !== $quizState.answers.length) {
      goto(`/grade/${grade}`)
    }
  })

  setGrade(grade)

  function resetQuiz() {
    reset()
    goto(`/grade/${grade}`)
  }

  function goBackToQuiz() {
    setQuestionIndex(0)
    goto(`/grade/${grade}`)
  }

  function goToNextQuiz() {
    const nextGrade = grade + 1
    goto(`/grade/${nextGrade}`)
  }
</script>

<ParchmentBG class='mt-4 xl:mt-16 flex flex-col items-center gap-8'>
  <h1>Results for Grade {grade}</h1>

  <h2>Your score: {$quizState.totalScore} points</h2>
  <div class='flex justify-between gap-8'>
    <Button class='cursor-pointer' onclick={goBackToQuiz}>Return to the quiz</Button>
    <Button class='cursor-pointer' onclick={resetQuiz}>Reset Grade {grade} Quiz</Button>
    {#if grade < 3}
      <Button class='cursor-pointer' onclick={goToNextQuiz}>Go to next Grade</Button>
    {/if}
  </div>
</ParchmentBG>
