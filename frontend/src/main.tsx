
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css' 
import AppContextProvider from './context/AppContext.tsx'
import { Toaster } from 'sonner'
createRoot(document.getElementById('root')!).render(
  
   <AppContextProvider>
      <BrowserRouter>
        <App />
        <Toaster 
          position="top-right"
          richColors
          closeButton
        />
    </BrowserRouter>
   </AppContextProvider>
  
)
