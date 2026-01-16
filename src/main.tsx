import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PathFinderApp from './career_guidance_app'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PathFinderApp />
  </StrictMode>,
)
