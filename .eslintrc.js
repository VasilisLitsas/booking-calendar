module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'typescript-sort-keys',
    'unused-imports',
    'sort-export-all',
    'sort-destructure-keys',
    'simple-import-sort',
  ],
  rules: {
    // general
    'no-console': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    // react
    'react-hooks/exhaustive-deps': 'off',
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/no-unescaped-entities': 'off',
    'react/react-in-jsx-scope': 'off',
    // eslint plugins
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-prototype-builtins': 'off',
    'typescript-sort-keys/string-enum': 'error',
    'typescript-sort-keys/interface': 'error',
    'sort-export-all/sort-export-all': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'sort-destructure-keys/sort-destructure-keys': [
      2,
      {
        caseSensitive: true,
      },
    ],
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Packages `react` related packages come first.
          ['^react', '^@?\\w'],
          // Internal packages.
          ['^(@|components)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.?(css)$'],
        ],
      },
    ],
    // typescript
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // prettier
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['src/**/index.{ts,tsx,js,jsx}'],
      rules: {
        'sort-export-all/sort-export-all': 'error',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
