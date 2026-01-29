import React from 'react'
import ReactDOM from 'react-dom/client'
import moment from 'moment'
import 'moment/locale/pt-br'
import App from './App'
import './index.css'

// Configurar moment globalmente para português brasileiro
moment.locale('pt-br')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
