import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/common/ProtectedRoute"
import Header from "./components/common/Header"
import Footer from "./components/common/Footer"
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import QuotePage from "./pages/QuotePage"
import LoginPage from "./pages/LoginPage"
import AdminPage from "./pages/AdminPage"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1" style={{ paddingTop: "76px" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/prodotti" element={<ProductsPage />} />
              <Route path="/prodotti/:id" element={<ProductDetailPage />} />
              <Route path="/preventivo" element={<QuotePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
