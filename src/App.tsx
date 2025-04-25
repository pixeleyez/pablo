import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainContentPage from './pages/MainContentPage'
import Pablo from './pages/Pablo'

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainContentPage />} />
        <Route path="/" element={<Pablo />} />
      </Routes>
    </Router>
  )
}

export default App
