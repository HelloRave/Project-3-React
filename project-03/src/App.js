import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './css/style.css';
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
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import CheckoutSuccess from './components/CheckoutSuccess';
import CheckoutCancel from './components/CheckoutCancel';

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <CartProvider>
            <ProductProvider>

              {/* Navbar */}
              <Navbar />

              <Routes>

                <Route path='/' element={<Landing />} />
                <Route path='/products' element={<ProductListing />} />
                <Route path='/products/:product_id' element={<Products />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout/success' element={<CheckoutSuccess />} />
                <Route path='/checkout/cancel' element={<CheckoutCancel />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<UserLogin />} />

              </Routes>
              
            </ProductProvider>
          </CartProvider>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
