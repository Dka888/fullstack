import React from 'react';
import { Home } from './Pages/home/Home';
import { Routes, Route, Navigate} from 'react-router-dom';
import { PageNotFound } from './Pages/PageNotFound';
import { Categories } from './Pages/Categorires/mainCategory/Categories';
import { About } from './Pages/About/About';
import { Header } from './component/header/Header';
import { Footer } from './component/footer/Footer';
import { Contact } from './Pages/Contact/Contact';
import { ProductList } from './Pages/ProductList/ProductList';
import { Category } from './utils/Categoris';
import { Login } from './component/autorization/Login';
import { Register } from './component/autorization/Register';
import { CartItem } from './Pages/CartItem/CartItem';
import {SearchingProducts} from './component/SearchingProducts/SearchingProducts';
import { SearchContextProvider } from './utils/Context';
import { UserAccount } from './Pages/UserAccount/UserAccount';

function App() {
  return (
    <> 
    <Header/>
      <SearchContextProvider>
        <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Navigate to={'/'} />} />
      <Route path='/categories' element={<Categories />} />
      <Route path='/categories/technology' element={<ProductList category={Category.Technology} />} />
      <Route path='/categories/clothes' element={<ProductList category={Category.Clothes} />} />
      <Route path='/categories/food' element={<ProductList category={Category.Food} />} />
      <Route path='/categories/furniture' element={<ProductList category={Category.Furniture} />} />
      <Route path='/categories/garden' element={<ProductList category={Category.Garden} />} />
      <Route path='/categories/health' element={<ProductList category={Category.Health} />} />
      <Route path='/categories/sport' element={<ProductList category={Category.Sport} />} />
      <Route path='/categories/home' element={<ProductList category={Category.Home} />} />
      <Route path='/about' element={<About />} />
      <Route path='*' element={<PageNotFound />} />
      <Route path='/contact' element={ <Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/cartInfo/:id' element={<CartItem />} />
      <Route path='/products' element={ <Navigate to='/categories' />} />
      <Route path='/products/:query' element={<SearchingProducts />} />
      <Route path='/user' element={<UserAccount />} />
    </Routes>
      </SearchContextProvider>

    <Footer />
    </>
  );
}

export default App;
