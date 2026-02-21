export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "build/**",
      ".claude/**",
      ".jules/**",
      "public/**"
    ]
  },
  {
    // Minimal configuration to allow 'eslint .' to pass in ESLint v9
    // while the project migrates to a full flat config.
    rules: {}
  }
];
