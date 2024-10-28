import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import NewTournament from "./pages/NewTournament"
import ScoreBoard from "./ScoreBoard"
import Tournament from './pages/Tournament'

function App() {
  return (
    <div className = 'App'>
      <Router>
        <Link to='/'>Create a Tournament</Link>
        <br />
        <Link to='/scoreboard'>Scoreboards</Link>
        <br />
        <Link to='/tournament'>Tournament</Link>
        <Routes>
          <Route path='/' element={<NewTournament />} />
          <Route path='/scoreboard' element={<ScoreBoard />} />
          <Route path='/tournament' element={<Tournament />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
