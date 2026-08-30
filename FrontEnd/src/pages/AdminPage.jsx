import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import AdminProducts from "../components/admin/AdminProducts"
import AdminProductForm from "../components/admin/AdminProductForm"
import AdminQuotes from "../components/admin/AdminQuotes"

const AdminPage = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-3">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title fw-bold" style={{ color: "#000000" }}>
                Amministrazione
              </h5>
              <hr />
              <div className="d-flex flex-column gap-2">
                <Link to="/admin" className="w-50">
                  <button className="w-50">Prodotti</button>
                </Link>
                <Link to="/admin/preventivi" className="w-50">
                  <button className="w-50">Preventivi</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          <Routes>
            <Route index element={<AdminProducts />} />
            <Route path="prodotti/nuovo" element={<AdminProductForm />} />
            <Route
              path="prodotti/modifica/:id"
              element={<AdminProductForm />}
            />
            <Route path="preventivi" element={<AdminQuotes />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
