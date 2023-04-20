import logo from './logo.svg';
import Auth from './Auth';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Sidebar from "./components/sidebar/Sidebar";
import NewProduct from './pages/newProduct/NewProduct';
import UserList from './pages/userList/UserList';
import Product from './pages/product/Product'
import Categories from './pages/categories/Categories'
import NewCategory from './pages/newcategory/NewCategory';

function App() {
  return (
   <div>
  <Routes>
    <Route path='/' element={<Auth/>} /> 
  
    <Route path='/sidebar' element={<Sidebar/>} />
    <Route path='/products' element={<Product/>} />
    <Route path='/userlist' element={<UserList/>} />
    <Route path='/prod' element={<NewProduct/>} />
    <Route path='/categories' element={<Categories/>} />
    <Route path='/category' element={<NewCategory/>} />
    
    


  </Routes>
    

  
    </div>
   );
}

export default App;
