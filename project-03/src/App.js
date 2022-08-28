import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { UserProvider } from './context/UserContext';

import Landing from './components/Landing';
import ProductListing from './components/ProductListing';
import Products from './components/Products';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Profile from './components/Profile';
import Register from './components/Register';
import UserLogin from './components/UserLogin';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <ProductProvider>
            <Routes>

              <Route path='/' element={<Landing />} />
              <Route path='/products' element={<ProductListing />} />
              <Route path='/products/:product_id' element={<Products />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<UserLogin />} />

            </Routes>
          </ProductProvider>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
