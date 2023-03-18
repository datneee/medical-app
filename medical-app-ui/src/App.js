import React from "react";
import "./App.css";
import { BrowserRouter, RoutesProps, Route, Routes } from "react-router-dom";
import Layout from "./Layouts/DefaultLayout/Layout";
import { Home, About, Contact } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
