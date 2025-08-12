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
import AdmStoreManage from './pages/AdmSM/index.jsx';
import AdmStockManage from './pages/AdmStockM/index.jsx';
import AdmStockStoresManage from './pages/StStcM/index.jsx';
import SalesReport from './pages/SalesReport/index.jsx';
import Profile from './pages/profile/index.jsx';
import StoryOrders from './pages/StoryOrders/index.jsx'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product_detail/:id" element={<ProductDetail />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/myCart" element={<MyCart />} />
        <Route path="/search_page" element={<SearchPage />} />
        <Route path="/control_panel/products" element={<AdmProductManage />} />
        <Route path="/control_panel/stores" element={<AdmStoreManage />} />
        <Route path="/control_panel/stock" element={<AdmStockManage />} />
        <Route path="/page_store/:id" element={<PageStore />} />
        <Route path="/control_panel/stores/:storeId/stock" element={<AdmStockStoresManage />} />
        <Route path="/control_panel/sales_report" element={<SalesReport />} />
        <Route path="/historico_pedidos" element={<StoryOrders />} />
      </Routes>
    </Router>
  )
}

export default App