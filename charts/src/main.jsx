import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import PieChart from './PieChart.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PieChart />
  </StrictMode>,
)
