import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Index.jsx'
import Login from './pages/login/index.jsx';
import SignUp from './pages/signUp/index.jsx';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />

        <Route path="/" element={<Header />} />
      </Routes>
    </Router>
  )
}

export default App
