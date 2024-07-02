import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Order } from "./pages/Order";
import { Cart } from "./pages/Cart";
import { Error404 } from "./pages/Error404";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoutes";
import "./App.css";
import { QrPage } from "./pages/QrPage";
import { ScanQr } from "./pages/ScanQr";
import { Kitchen } from "./pages/Kitchen";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/qr" element={<QrPage />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/qr"
          element={
            <ProtectedRoute>
              <ScanQr />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/kitchen"
          element={
            <ProtectedRoute>
              <Kitchen />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
