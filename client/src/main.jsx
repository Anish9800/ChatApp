import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from "axios"
import App from './App.jsx'
import AuthContextProvider from '../context/authContext.jsx'

axios.defaults.baseURL = 'http://localhost:3000/api/';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>,
)
