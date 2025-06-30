import antfu from '@antfu/eslint-config'
import stylistic from '@stylistic/eslint-plugin'
import svelteTailwindcss from 'eslint-plugin-svelte-tailwindcss'

export default antfu({
  svelte: true,
  stylistic: {
    ...stylistic.configs.recommended,
  },
  ignores: [
    './src/lib/components/ui/**',
  ],
}, {
  // TODO fix - sort-classes not working
  ...svelteTailwindcss.configs['flat/base'],
  files: ['*.svelte'],
  parser: 'svelte-eslint-parser',
  plugins: ['svelte-tailwindcss'],
  rules: {
    'svelte-tailwindcss/sort-classes': [
      'error',
      { callees: ['twMerge', 'clsx'] },
    ],
  },
})
