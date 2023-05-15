import React from "react";
import "./App.css";

import { BrowserRouter, RoutesProps, Route, Routes } from "react-router-dom";
import Layout from "./Layouts/DefaultLayout/Layout";
import {
  Home,
  About,
  Contact,
  OurStore,
  Blog,
  ProductCared,
  Cart,
  Login,
  SignUp,
  ForgotPassword,
  ResetPassword,
  SingleBlog,
  SingleProduct,
  Checkout,
  Chat,
  Orders,
} from "./pages";
import Verification from "./components/Verification/Verification";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="store" element={<OurStore />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="product" element={<SingleProduct />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<SingleBlog />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="chat"
              element={
                <Verification>
                  <Chat />
                </Verification>
              }
            />
            <Route
              path="ordered"
              element={
                <Verification>
                  <Orders />
                </Verification>
              }
            />
            <Route
              path="cart"
              element={
                <Verification>
                  <Cart />
                </Verification>
              }
            />
            <Route
              path="checkout"
              element={
                <Verification>
                  <Checkout />
                </Verification>
              }
            />
            <Route path="auth/login" element={<Login />} />
            <Route path="auth/sign-up" element={<SignUp />} />
            <Route path="auth/forgot-password" element={<ForgotPassword />} />
            <Route path="auth/reset-password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
