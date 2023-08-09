import { PropsWithChildren, ReactElement, useMemo } from 'react'

import { EnvContext, EnvContextValue } from './env.context'

export type EnvType = 'boolean' | 'number' | 'string'

export type OwnEnvProviderProps<EnvKey extends string> = {
  env: ImportMetaEnv
  envConfig: Record<EnvKey, EnvType>
}

export const EnvProvider = <EnvKey extends string>(
  props: PropsWithChildren<OwnEnvProviderProps<EnvKey>>,
): ReactElement => {
  const { children, env, envConfig } = props

  const value: EnvContextValue<EnvKey> = useMemo(
    () =>
      (Object.keys(envConfig) as EnvKey[]).reduce((acc, key) => {
        const envValue = env[key] ?? null
        if (envValue === null) {
          return { ...acc, [key]: null }
        }

        const envType: EnvType = envConfig[key]
        switch (envType) {
          case 'boolean':
            return { ...acc, [key]: envValue === 'true' }

          case 'number':
            return {
              ...acc,
              [key]: Number.isNaN(+envValue) ? null : +envValue,
            }

          default:
            return { ...acc, [key]: envValue }
        }
      }, {} as EnvContextValue<EnvKey>),
    [env, envConfig],
  )

  return <EnvContext.Provider {...{ value }}>{children}</EnvContext.Provider>
}
