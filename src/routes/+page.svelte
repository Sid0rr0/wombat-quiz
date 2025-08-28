<script>

  import WombatCard from '$lib/components/WOMBATCard.svelte'

</script>
<main class='flex flex-col items-center gap-4 py-4 mx-8'>
  <h1 class='text-center'>Welcome to Wizards' Ordinary Magic and Basic Aptitude Test</h1>
  <p></p>
  <div class='flex flex-col md:flex-row gap-8'>
    <WombatCard title='W.O.M.B.A.T. Grade 1' link='/grade/1'>
      {#snippet content()}
        <enhanced:img src='$lib/assets/wombat-grade-1.png' alt='W.O.M.B.A.T. Grade 1' />
      {/snippet}
      {#snippet footer()}
        Take the Grade 1
      {/snippet}
    </WombatCard>
    <WombatCard title='W.O.M.B.A.T. Grade 2' link='/grade/2'>
      {#snippet content()}
        <enhanced:img src='$lib/assets/wombat-grade-2.png' alt='W.O.M.B.A.T. Grade 2' />
      {/snippet}
      {#snippet footer()}
        Take the Grade 2
      {/snippet}
    </WombatCard>
    <WombatCard title='W.O.M.B.A.T. Grade 3' link='/grade/3'>
      {#snippet content()}
        <enhanced:img src='$lib/assets/wombat-grade-3.png' alt='W.O.M.B.A.T. Grade 3' />
      {/snippet}
      {#snippet footer()}
        Take the Grade 3
      {/snippet}
    </WombatCard>
  </div>
</main>
