import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Index.jsx'
import Login from './pages/login/index.jsx';
import SignUp from './pages/signUp/index.jsx';
import ProductDetail from './pages/productdetail/index.jsx';
import HomePage from './pages/HomePage/index.jsx';
import MyCart from './pages/myCart/index.jsx';
import SearchPage from './pages/SearchPage/index.jsx';
import AdmProductManage from './pages/AdmPM/index.jsx';
import AdmStoreManage from './pages/AdmSM/index.jsx';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/product_detail" element={<ProductDetail />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/myCart" element={<MyCart />} />
        <Route path="/search_page" element={<SearchPage />} />
        <Route path="/control_panel/products" element={<AdmProductManage />} />
        <Route path="/control_panel/stores" element={<AdmStoreManage />} />
      </Routes>
    </Router>
  )
}

export default App