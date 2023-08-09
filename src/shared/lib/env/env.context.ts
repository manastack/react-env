import { createContext } from 'react'

export type EnvContextValue<EnvKey extends string> = Record<
  EnvKey,
  boolean | null | number | string
>

export const EnvContext = (<EnvKey extends string>() =>
  createContext<EnvContextValue<EnvKey>>({} as EnvContextValue<EnvKey>))()
