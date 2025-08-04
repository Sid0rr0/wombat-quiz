<script lang='ts'>
  import { dev } from '$app/environment'
  import { injectAnalytics } from '@vercel/analytics/sveltekit'
  import '../app.css'
  import '$lib/styles/stars.css'

  injectAnalytics({ mode: dev ? 'development' : 'production' })

  const { children } = $props()
</script>

<nav class='w-full flex justify-center gap-4 px-8 py-2'>
  <a href='/'>Home</a>
  <a href='/about'>About</a>
  <a href='/contact'>Contact</a>
</nav>

<div id='stars'></div>
<div id='stars2'></div>
<div id='stars3'></div>

<div class='flex flex-col items-center justify-center min-h-screen max-w-screen overflow-hidden'>
  {@render children()}
</div>
