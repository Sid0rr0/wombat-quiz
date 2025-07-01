<script lang='ts'>
  import type { PageProps } from './$types'
  import ParchmentBG from '$lib/components/ParchmentBG.svelte'
  // import { onMount } from 'svelte'
  import Quiz from '@/lib/components/Quiz.svelte'

  const { data }: PageProps = $props()

</script>

<ParchmentBG class='mt-4 xl:mt-16'>
  <Quiz data={data} grade={3} />

</ParchmentBG>
<!--
<h1 class='text-3xl font-bold mb-4'>Grade 1</h1>
<p class='mb-4'>Welcome to the Grade 1 quiz section!</p>
<p class='mb-4'>Here you can find quizzes designed for first graders.</p>
<p class='mb-4'>Have fun learning!</p> -->
