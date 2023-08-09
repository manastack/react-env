import {
  OwnEnvProviderProps,
  useEnvContext,
  WithEnvProvider,
  withEnvProvider,
} from '@manauser/react-env'

import { FC } from 'react'

import { envConfig, EnvKey } from './config'

import './styles/global.css'

const App: FC = () => {
  const { VITE_SOME_BOOLEAN, VITE_SOME_NUMBER, VITE_SOME_STRING } =
    useEnvContext<EnvKey>()

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
      }}
    >
      <div>
        <p>
          VITE_SOME_BOOLEAN is {VITE_SOME_BOOLEAN ? 'true' : 'false'} and type
          is {typeof VITE_SOME_BOOLEAN}
        </p>
        <p>
          VITE_SOME_NUMBER is {VITE_SOME_NUMBER} and type is{' '}
          {typeof VITE_SOME_NUMBER}
        </p>
        <p>VITE_SOME_STRING is {VITE_SOME_STRING}</p>
      </div>
    </div>
  )
}

export default (withEnvProvider as WithEnvProvider<EnvKey>).apply(
  {
    env: import.meta.env,
    envConfig,
  } as OwnEnvProviderProps<EnvKey>,
  [App],
)
