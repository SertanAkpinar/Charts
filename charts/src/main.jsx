import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import FußballerChart from './FußballerChart.jsx'
import './index.css'
import KreisChart from './kreisChart.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KreisChart />
  </StrictMode>,
)
