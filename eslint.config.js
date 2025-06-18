import antfu from '@antfu/eslint-config'

export default antfu({
  svelte: true,
  stylistic: true,
  ignores: [
    './src/lib/components/ui/**',
  ],
})
