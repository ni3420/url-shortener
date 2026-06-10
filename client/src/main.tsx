import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import { ClerkProvider } from '@clerk/clerk-react'
const queryclient=new QueryClient()
const Public_key=import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryclient}>
      <ClerkProvider publishableKey={Public_key}>
    <App />

      </ClerkProvider>

    </QueryClientProvider>
  </StrictMode>,
)
