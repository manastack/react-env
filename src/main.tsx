import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import App from '@app'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// TODO - create src/shared/lib/env/index.d.ts
