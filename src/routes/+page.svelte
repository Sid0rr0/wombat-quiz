<script>

  import WombatCard from '@/components/WOMBATCard.svelte'

</script>
<main class='flex flex-col items-center gap-4 py-4'>
  <h1>Welcome to Wizards' Ordinary Magic and Basic Aptitude Test</h1>
  <p></p>
  <div class='flex gap-8'>
    <WombatCard title='W.O.M.B.A.T. Grade 1'>
      {#snippet content()}
        <enhanced:img src='$lib/assets/wombat-grade-1.png' alt='W.O.M.B.A.T. Grade 1' />
      {/snippet}
      {#snippet footer()}
        Take the Grade 1 test
      {/snippet}
    </WombatCard>
    <WombatCard title='W.O.M.B.A.T. Grade 2'>
      {#snippet content()}
        <enhanced:img src='$lib/assets/wombat-grade-1.png' alt='W.O.M.B.A.T. Grade 1' />
      {/snippet}
      {#snippet footer()}
        Take the Grade 2 test
      {/snippet}
    </WombatCard>
    <WombatCard title='W.O.M.B.A.T. Grade 3'>
      {#snippet content()}
        <enhanced:img src='$lib/assets/wombat-grade-1.png' alt='W.O.M.B.A.T. Grade 1' />
      {/snippet}
      {#snippet footer()}
        Take the Grade 3 test
      {/snippet}
    </WombatCard>
  </div>
</main>
