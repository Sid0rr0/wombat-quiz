<script lang='ts'>
  import { onMount } from 'svelte'
  import Button from '@/lib/components/ui/button/button.svelte'
  import quizStore from '@/stores/quizState'

  type Props = {
    data: {
      questions: {
        text: string
        subquestion: string
        options: {
          answer: string
          points: number
        }[]
        topic: string
        number: number
        part: number
        partNumber: number
        section: string
      }[]
    }
    grade: number
  }

  const { data, grade }: Props = $props()
  const { previousQuestion, nextQuestion, submitAnswer, reset, quizState, setGrade } = quizStore()

  setGrade(grade)

  let isAnswerSubmitted = $state(false)
  let selectedAnswerIndex = $state(-1)

  // TODO possibly save the answer even if the answer is not yet submitted (cant just push it, check for q index)
  function submit(answerIndex: number, answerPoints: number) {
    submitAnswer(answerIndex, answerPoints)
    isAnswerSubmitted = true
  }

  function resetQuiz() {
    reset()
    isAnswerSubmitted = false
    selectedAnswerIndex = -1
  }

  function goToPreviousQuestion() {
    previousQuestion()
    isAnswerSubmitted = true
    selectedAnswerIndex = $quizState.answers[$quizState.currentQuestionIndex] || 0
  }

  function goToNextQuestion() {
    if (isAnswerSubmitted) {
      isAnswerSubmitted = false
      selectedAnswerIndex = -1
    }
    nextQuestion()
  }

  onMount(() => {
    if ($quizState.currentQuestionIndex < $quizState.answers?.length) {
      isAnswerSubmitted = true
      selectedAnswerIndex = $quizState.answers[$quizState.currentQuestionIndex]
    }
  })
</script>

<div class='flex flex-col xl:flex-row gap-4 justify-between items-center w-full mb-8'>
  <Button class='cursor-pointer' onclick={resetQuiz}>Reset Quiz</Button>
  <h1 class='text-3xl font-bold mb-4'>Grade {grade} Question {$quizState.currentQuestionIndex + 1}</h1>
  <span>{$quizState.totalScore === 1 ? '1 point' : `${$quizState.totalScore} points`}</span>
</div>
<!-- <p class='mb-4'>Welcome to the Grade 1 quiz section!</p> -->

<div class='flex flex-col items-center gap-4 mb-4 px-8 text-center'>
  <h2>{data.questions[$quizState.currentQuestionIndex]?.text}</h2>
  <h3>{data.questions[$quizState.currentQuestionIndex]?.subquestion}</h3>

  <div class='flex flex-col gap-2 list-[lower-alpha]'>
    {#each data.questions[$quizState.currentQuestionIndex]?.options as option, i}
      <label
        for={`answer${i}`}
        class={[
          'px-4 py-2 border-2 rounded-xl xl:w-xl',
          'has-checked:border-slate-400 has-checked:bg-blue-100 has-checked:text-blue-800',
          !isAnswerSubmitted && 'hover:bg-blue-50 hover:text-blue-800 transition-colors cursor-pointer',
        ]}
      >
        <input
          type='radio'
          name='options'
          id={`answer${i}`}
          value={option.answer}
          class='hidden'
          checked={selectedAnswerIndex === i}
          onclick={() => selectedAnswerIndex = i}
          disabled={isAnswerSubmitted}
        />
        <div class='flex items-center justify-between gap-4'>
          <span class='grow text-center'>{option.answer}</span>
          {#if isAnswerSubmitted}
            <span>{option.points}</span>
          {/if}
        </div>
      </label>

    {/each}
  </div>
</div>

<div class='flex justify-between w-full max-w-xl my-4'>
  <Button class='cursor-pointer' onclick={goToPreviousQuestion}>Previous Question</Button>
  {#if isAnswerSubmitted}
    <Button class='cursor-pointer' onclick={goToNextQuestion}>Next Question</Button>
  {:else}
    <Button
      class='cursor-pointer'
      disabled={selectedAnswerIndex === -1}
      onclick={() => submit(selectedAnswerIndex, data.questions[$quizState.currentQuestionIndex]?.options[selectedAnswerIndex]?.points || 0)}
    >
      Submit Answer
    </Button>
  {/if}
</div>

<div class='flex flex-col items-center gap-2 mt-4'>
  <span>isAnswerSubmitted: {isAnswerSubmitted}</span>
  <span>selectedAnswerIndex: {selectedAnswerIndex}</span>
  <span>grade: {$quizState.grade}</span>
</div>
