# react-env

[![Testing](https://github.com/manastack/react-env/actions/workflows/test.yml/badge.svg)](https://github.com/manastack/react-env/actions/workflows/test.yml)

This package types environment variables.

## Installation

```bash
npm i @manauser/react-env
```

or

```bash
yarn add @manauser/react-env
```

or

```bash
pnpm i @manauser/react-env
```

## Usage

Suppose you have a `.env` file with the following content:

```
VITE_SOME_BOOLEAN=true
VITE_SOME_NUMBER=123
VITE_SOME_STRING=hello
```

You need set types for these variables:

```typescript
// env.ts
import { EnvType } from '@manauser/react-env'

const envList = [
  'VITE_SOME_BOOLEAN',
  'VITE_SOME_NUMBER',
  'VITE_SOME_STRING',
] as const

export type EnvKey = (typeof envList)[number]

export const envConfig: Record<EnvKey, EnvType> = {
  VITE_SOME_BOOLEAN: 'boolean',
  VITE_SOME_NUMBER: 'number',
  VITE_SOME_STRING: 'string',
}
```

Then you need to wrap you code to env-provider:

Variant 1:

```typescript jsx
// app.tsx
import { FC } from 'react'

import { envConfig, EnvKey } from './env.ts'
import { Smt } from './smt.tsx'

const App: FC = () => {
  return (
    <EnvProvider<EnvKey> env={import.meta.env} envConfig={envConfig}>
      <Smt />
    </EnvProvider>
  )
}

export default App
```

Variant 2:

```typescript jsx
// app.tsx
import { FC } from 'react'
import {
  OwnEnvProviderProps,
  WithEnvProvider,
  withEnvProvider,
} from '@manauser/react-env'

import { envConfig, EnvKey } from './env.ts'
import { Smt } from './smt.tsx'

const App: FC = () => {
  return <Smt />
}

export default (withEnvProvider as WithEnvProvider<EnvKey>).apply(
  {
    env: import.meta.env,
    envConfig,
  } as OwnEnvProviderProps<EnvKey>,
  [App],
)
```

Variant 3:

```typescript jsx
// app.tsx
import { FC } from 'react'
import {
  OwnEnvProviderProps,
  WithEnvProvider,
  withEnvProvider,
} from '@manauser/react-env'

import { envConfig, EnvKey } from './env.ts'
import { withProviders } from './providers'
import { Smt } from './smt.tsx'

const App: FC = () => {
  return <Smt />
}

export default withProviders(App)
```

where `withProviders` is a function that wraps the component in all the providers you need.  
You need to install for this case `compose-function` package.

```typescript jsx
// providers.ts
import {
  OwnEnvProviderProps,
  WithEnvProvider,
  withEnvProvider,
} from '@manauser/react-env'
import compose from 'compose-function'

import { envConfig, EnvKey } from './env.ts'

export const withProviders = compose(
  (withEnvProvider as WithEnvProvider<EnvKey>).apply.bind({
    env: import.meta.env,
    envConfig,
  } as OwnEnvProviderProps<EnvKey>),
)
```

Then you can use the variables in your code like this:

```typescript jsx
// smt.tsx
import { FC } from 'react'

import { useEnvContext } from '@manauser/react-env'

export const Smt: FC = () => {
  const { VITE_SOME_BOOLEAN, VITE_SOME_NUMBER, VITE_SOME_STRING } =
    useEnvContext()

  return (
    <ul>
      <li>
        {VITE_SOME_BOOLEAN} has type {typeof VITE_SOME_BOOLEAN}
      </li>
      <li>
        {VITE_SOME_NUMBER} has type {typeof VITE_SOME_NUMBER}
      </li>
      <li>
        {VITE_SOME_STRING} has type {typeof VITE_SOME_STRING}
      </li>
    </ul>
  )
}
```

Option for `EnvProvider`:

```typescript
export type EnvType = 'boolean' | 'number' | 'string'

export type OwnEnvProviderProps<EnvKey extends string> = {
  env: ImportMetaEnv
  envConfig: Record<EnvKey, EnvType>
}
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
