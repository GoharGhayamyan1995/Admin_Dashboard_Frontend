
import Auth from './Auth';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Sidebar from "./components/sidebar/Sidebar";
import NewProduct from './pages/newProduct/NewProduct';
import UserList from './pages/userList/UserList';
import Product from './pages/product/Product'
import Categories from './pages/categories/Categories'
import NewCategory from './pages/newcategory/NewCategory';
import UpdateProduct from './pages/product/UpdateProduct';
import UpdateCategory from './pages/categories/UpdateCategory';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
   <div>
  <Routes>
    <Route path='/' element={<Auth/>} /> 
  
    <Route path='/admin' element={<ProtectedRoute><Sidebar/></ProtectedRoute>} />
    <Route path='/products' element={<ProtectedRoute><Product/></ProtectedRoute>} />
    <Route path='/userlist' element={<ProtectedRoute><UserList/></ProtectedRoute>} />
    <Route path='/prod' element={<ProtectedRoute><NewProduct/></ProtectedRoute>} />
    <Route path='/categories' element={<ProtectedRoute><Categories/></ProtectedRoute>} />
    <Route path='/category' element={<ProtectedRoute><NewCategory/></ProtectedRoute>} />
    <Route path='/updateprod/:id' element={<ProtectedRoute><UpdateProduct/></ProtectedRoute>} />
    <Route path='/updatecategory/:id' element={<ProtectedRoute><UpdateCategory/></ProtectedRoute>} />
    </Routes>
    </div>
   );
}

export default App;

  

