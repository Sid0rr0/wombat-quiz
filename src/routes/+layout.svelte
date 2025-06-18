<script lang='ts'>
  import { dev } from '$app/environment'
  import { injectAnalytics } from '@vercel/analytics/sveltekit'
  import '../app.css'

  injectAnalytics({ mode: dev ? 'development' : 'production' })

  const { children } = $props()
</script>

<nav class='w-full flex justify-center gap-4 px-8 py-2'>
  <a href='/page'>Home</a>
  <a href='/about'>About</a>
  <a href='/contact'>Contact</a>
</nav>
<div class='flex flex-col items-center justify-center'>
  {@render children()}
</div>
