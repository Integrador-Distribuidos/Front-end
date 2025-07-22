import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Index.jsx'
import Login from './pages/login/index.jsx';
import SignUp from './pages/signUp/index.jsx';
import ProductDetail from './pages/productdetail/index.jsx';
import HomePage from './pages/HomePage/index.jsx';
import MyCart from './pages/myCart/index.jsx';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/product_detail" element={<ProductDetail />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/myCart" element={<MyCart />} />
      </Routes>
    </Router>
  )
}

export default App
