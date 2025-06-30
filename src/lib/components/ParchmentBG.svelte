<script>
  const { children, class: className, ...others } = $props()
</script>

<div
  {...others}
  class={`letter flex flex-col items-center w-11/12 md:w-8/12 max-w-6xl p-4 pt-8 pb-16 mb-16 ${className}`}
>
  {@render children()}
</div>

<style scoped>
/* https://codepen.io/Messiah7/pen/zYJjZJ */
.letter {
  background: #1b1b1b;
  /* min-height: 100vh; */
  box-shadow:
    0 0 10px rgba(0, 0, 0, 0.3),
    0 0 300px 25px rgba(67, 89, 145, 0.6) inset;
  position: relative;
  /* padding: 2rem; */
}

.letter:before,
.letter:after {
  content: "";
  background: #1b1b1b;
  box-shadow:
    0 0 8px rgba(0, 0, 0, 0.2),
    inset 0 0 300px rgba(67, 89, 145, 0.6);
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -2;
  /* transition: 0.5s; */
}

.letter:before {
  left: -4px;
  top: 2px;
  transform: rotate(-1.5deg);
}

.letter:after {
  right: -2px;
  top: 0px;
  transform: rotate(2.4deg);
}
</style>
