
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from './components/ui/provider.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(

  <Provider>
    <AuthProvider>
      <BrowserRouter>    
        <App />
      </BrowserRouter>
    </AuthProvider>
  </Provider>
)
