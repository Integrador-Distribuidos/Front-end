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
import PageStore from './pages/PageStore/index.jsx';
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/product_detail/:id" element={<ProductDetail />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/myCart" element={<MyCart />} />
        <Route path="/search_page" element={<SearchPage />} />
        <Route path="/control_panel/products" element={<AdmProductManage />} />
        <Route path="/page_store/:id" element={<PageStore />} />
      </Routes>
    </Router>
  )
}

export default App