import { ComponentType } from 'react'

import { EnvProvider, OwnEnvProviderProps } from './env.provider'

export type WithEnvProvider<EnvKey extends string> = <Props extends {}>(
  this: OwnEnvProviderProps<EnvKey>,
  Component: ComponentType<Props>,
) => ComponentType<Props>

export function withEnvProvider<EnvKey extends string, Props extends {}>(
  this: OwnEnvProviderProps<EnvKey>,
  Component: ComponentType<Props>,
): ComponentType<Props> {
  const ownEnvProviderProps: OwnEnvProviderProps<EnvKey> = this

  // eslint-disable-next-line react/display-name
  return (props: Props) => (
    <EnvProvider {...ownEnvProviderProps}>
      <Component {...props} />
    </EnvProvider>
  )
}
