import React from "react";
import MyForm from "./components/MyForms/MyForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Singin from "./components/MyForms/Singin";
import PageNoteFound from "./components/PageNoteFound";
import HeaderNav from "./components/MyNavbars/HeaderNav";
import { useSelector } from "react-redux";
import { PublicRoute } from "./components/PublicRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Home } from "./components/Home";
import AddProduct from "./components/Products/AddProduct";
import { ProductList } from "./components/Products/ProductList";
import Logout from "./components/Logout";
import CreateUser from "./components/UserComponets/CreateUser";
import Showusers from "./components/UserComponets/Showusers";
import Spiner from "./components/Spiner";

function App() {
  const { loading } = useSelector(state => state.alert);
  console.log(loading)
  return (
      <Router future={{ v7_relativeSplatPath: true }}>
        <HeaderNav />
        { loading ? <Spiner/> : 
          <Routes>
            <Route path="/registration" element={
              <PublicRoute>
                <MyForm />
              </PublicRoute>

            } />
            <Route path="/singIn" element={
              <PublicRoute>
                <Singin />
              </PublicRoute>

            } />

            <Route path="/logout" element={
              <PublicRoute>
                <Logout />
              </PublicRoute>

            } />

            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>

            } />
            <Route path="/addProduct" element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            } />

            <Route path="/listProduct" element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            } />
            <Route path="/createuser" element={
              <ProtectedRoute>
                <CreateUser />
              </ProtectedRoute>
            } />

            <Route path="/showusers" element={
              <ProtectedRoute>
                <Showusers />
              </ProtectedRoute>
            } />

            <Route path="*" element={<PageNoteFound />} />
          </Routes>
        }
      </Router>
  );
}

export default App;
