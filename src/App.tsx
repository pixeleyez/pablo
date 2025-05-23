import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainContentPage from './pages/MainContentPage'
import Pablo from './pages/Pablo'
import Canvas from './pages/Canvas'
import Canvas2 from './pages/Canvas-2'
import Oka from './pages/Oka'

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainContentPage />} />
        <Route path="/" element={<Pablo />} />
        <Route path="oka" element={<Oka />} />
        <Route path="Canvas" element={<Canvas />} />
        <Route path="Canvas2" element={<Canvas2 />} />
      </Routes>
    </Router>
  )
}

export default App
