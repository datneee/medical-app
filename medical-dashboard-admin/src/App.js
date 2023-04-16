import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layouts/DefaultLayout/Layout";
import {
  Categories,
  Category,
  Customers,
  MainDash,
  Orders,
  Products,
} from "./Pages";
import { Verification } from "./components";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              // <Verification>
              <Layout />
              // </Verification>
            }
          >
            <Route index element={<MainDash />} />
            <Route path="categories" element={<Categories />} />

            <Route path="customers" element={<Customers />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
