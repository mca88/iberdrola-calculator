import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import "./index.css"


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="dark text-foreground min-h-screen">
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
