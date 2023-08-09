import { Context, useContext } from 'react'

import { EnvContext, EnvContextValue } from './env.context'

export const useEnvContext = <
  EnvKey extends string,
>(): EnvContextValue<EnvKey> =>
  useContext(EnvContext as Context<EnvContextValue<EnvKey>>)
