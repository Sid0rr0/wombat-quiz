<script lang='ts'>
  import type { Snippet } from 'svelte'
  import Button from '$lib/components/ui/button/button.svelte'
  import * as Card from '$lib/components/ui/card/index.js'

  type Props = {
    title: string
    content: Snippet
    footer: Snippet
    link: string
  }

  const { title, content, footer, link }: Props = $props()

</script>

<Card.Root>
  <Card.Header class='text-center'>
    <Card.Title>
      <h2>{title}</h2>
    </Card.Title>
  </Card.Header>
  <Card.Content>
    <a href={link}>
      {@render content()}
    </a>
  </Card.Content>
  <Card.Footer>
    <Card.Action class='w-full'>
      <a href={link}>
        <Button class='w-full cursor-pointer'>{@render footer()}</Button>
      </a>
    </Card.Action>
  </Card.Footer>
</Card.Root>
