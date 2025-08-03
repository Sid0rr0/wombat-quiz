<script lang='ts'>
  import type { PageProps } from './$types'
  import ParchmentBG from '$lib/components/ParchmentBG.svelte'
  import Quiz from '@/lib/components/Quiz.svelte'

  const { data }: PageProps = $props()

</script>

<ParchmentBG class='mt-4 xl:mt-16'>
  <Quiz questions={data.questions} grade={data.grade} />

</ParchmentBG>
