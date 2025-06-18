<script lang='ts'>
  import type { Snippet } from 'svelte'
  import * as Card from '$lib/components/ui/card/index.js'
  import Button from '@/components/ui/button/button.svelte'

  type Props = {
    title: string
    content: Snippet
    footer: Snippet
  }

  const { title, content, footer }: Props = $props()

</script>

<Card.Root>
  <Card.Header class='text-center'>
    <Card.Title>
      <h2>{title}</h2>
    </Card.Title>
  </Card.Header>
  <Card.Content>
    {@render content()}
  </Card.Content>
  <Card.Footer>
    <Card.Action class='w-full'>
      <a href='/about'>
        <Button class='w-full cursor-pointer'>{@render footer()}</Button>
      </a>
    </Card.Action>
  </Card.Footer>
</Card.Root>
