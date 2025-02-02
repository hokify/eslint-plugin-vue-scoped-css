---
pageClass: "rule-details"
sidebarDepth: 0
title: "vue-scoped-css/enforce-style-type"
description: "enforce the `<style>` tags to be plain or have the `scoped` or `module` attribute"
---
# vue-scoped-css/enforce-style-type

> enforce the `<style>` tags to be plain or have the `scoped` or `module` attribute

- :gear: This rule is included in `"plugin:vue-scoped-css/all"`.

## :book: Rule Details

This rule reports invalid `<style>` tag types.

<eslint-code-block :rules="{'vue-scoped-css/enforce-style-type': ['error']}">

```vue
<template>
</template>

<!-- ✗ BAD -->
<style>
</style>

<!-- ✓ GOOD -->
<style scoped>
</style>
```

</eslint-code-block>

## :wrench: Options

Default is set to `{ allows: ['scoped'] }`.

```json
{
  "vue-scoped-css/enforce-style-type": ["error", { allows: ['scoped'] }]
}
```

- `allows` (default `['scoped']`) ... allowed types of `<style>` tags. Possible values: `plain`, `scoped`, `module`

### `allows: ['module']`

Only allow CSS Modules.

<eslint-code-block :rules="{'vue-scoped-css/enforce-style-type': ['error', { allows: ['module'] }]}">

```vue
<template>
</template>

<!-- ✓ GOOD -->
<style module>
</style>

<style module="$s">
</style>

<!-- ✗ BAD -->
<style>
</style>

<style scoped>
</style>
```

</eslint-code-block>

### `allows: ['plain']`

Only allow plain styles; no `scoped` or `module` attributes.

<eslint-code-block :rules="{'vue-scoped-css/enforce-style-type': ['error', { allows: ['plain'] }]}">

```vue
<template>
</template>

<!-- ✓ GOOD -->
<style>
</style>

<!-- ✗ BAD -->
<style scoped>
</style>

<style module>
</style>

<style module="$s">
</style>
```

</eslint-code-block>

## :books: Further reading

- [Vue Loader - Scoped CSS]
- [Vue Loader - CSS Modules]

[Vue Loader - Scoped CSS]: https://vue-loader.vuejs.org/guide/scoped-css.html
[Vue Loader - CSS Modules]: https://vue-loader.vuejs.org/guide/css-modules.html

## Implementation

- [Rule source](https://github.com/future-architect/eslint-plugin-vue-scoped-css/blob/master/lib/rules/enforce-style-type.ts)
- [Test source](https://github.com/future-architect/eslint-plugin-vue-scoped-css/blob/master/tests/lib/rules/enforce-style-type.js)
