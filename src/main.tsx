import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PathFinderAppEnhanced from './career_guidance_app_enhanced'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PathFinderAppEnhanced />
  </StrictMode>,
)
