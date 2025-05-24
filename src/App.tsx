import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainContentPage from './pages/MainContentPage'
import Pablo from './pages/Pablo'
import Canvas from './pages/Canvas'
// import Canvas2 from './pages/Canvas-2'
// import Canvas3 from './pages/canvas-3'
import Canvas4 from './pages/Canvas-4'
import Canvas5 from './pages/Canvas-5'
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
        {/* <Route path="Canvas2" element={<Canvas2 />} />
        <Route path="Canvas3" element={<Canvas3 />} /> */}
        <Route path="Canvas2" element={<Canvas4 />} />
        <Route path="Canvas3" element={<Canvas5 />} />
      </Routes>
    </Router>
  )
}

export default App
