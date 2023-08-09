import { EnvType } from '@shared/lib/env'

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
