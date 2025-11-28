import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'  // <-- This line is critical for Tailwind
import App from './App.jsx'
import BeverageCalculator from './BeverageCalculator.jsx'
import RecipeScaler from './RecipeScaler.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/calculator" element={<BeverageCalculator />} />
        <Route path="/scaler" element={<RecipeScaler />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)