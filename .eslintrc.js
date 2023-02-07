module.exports = {
  root: true,

  extends: ['@react-native-community', 'plugin:import/recommended'],

  rules: {
    // import
    'import/order': [
      'error',
      {alphabetize: {order: 'asc', caseInsensitive: true}},
    ],
    'import/first': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-unresolved': 'off',
    'import/no-absolute-path': 'off',

    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false,
      },
    ],

    // common
    semi: ['error', 'never'],

    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },

  settings: {
    'import/ignore': ['react-native/*'],
  },
}
