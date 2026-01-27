import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products"
import CreateProduct from "./pages/CreateProduct";
import DailyReport from "./pages/DailyReport";
import CreateDailyReport from "./pages/CreateDailyReport";
import Signin from "./pages/Signin";
import Header from "./components/Header"
import Container from "./components/Container"
import Home from "./pages/Home";
import NotFoundRedirect from "./routes/NotFoundRedirect";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <>
      <Header />
      <Container>
        <Routes>
          {/* PÚBLICAS */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />

          {/* PROTEGIDAS */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path="/products/new"
            element={
              <PrivateRoute>
                <CreateProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/products/edit/:id"
            element={
              <PrivateRoute>
                <EditProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/daily-report"
            element={
              <PrivateRoute>
                <DailyReport />
              </PrivateRoute>
            }
          />

          <Route
            path="/daily-report/new"
            element={
              <PrivateRoute>
                <CreateDailyReport />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundRedirect />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
