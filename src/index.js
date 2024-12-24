import React from 'react';
import ReactDOM from 'react-dom/client';
import NavigationBar from './components/NavigationBar/NavigationBar';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';
import AddressDetsilsPage from './components/AddressDetsilsPage/AddressDetsilsPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderReview from './components/OrderReview/OrderReview';
import ModifyProduct from './components/ModifyProduct/ModifyProduct';
import AddProduct from './components/AddProduct/AddProduct';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="add-address" element={<AddressDetsilsPage />} />
        <Route path="/review-order" element={<OrderReview />} />
        <Route path="/edit-product/:id" element={<ModifyProduct />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
