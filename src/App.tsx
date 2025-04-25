import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainContentPage from './pages/MainContentPage'
import Pablo from './pages/Pablo'
import Oka from './pages/Oka'

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainContentPage />} />
        <Route path="/" element={<Pablo />} />
        <Route path="oka" element={<Oka />} />
      </Routes>
    </Router>
  )
}

export default App
