import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const Header = () => {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsOpen(false)
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-white shadow-sm te">
      <div className="container">
        <Link
          to="/"
          className="navbar-brand fw-bold"
          style={{ color: "#000000" }}
        >
          <img
            src="/images/logo_nabil.png"
            alt="MIdoun Impianti"
            className="img-fluid"
            style={{
              height: "90px",
              width: "auto",
              objectFit: "contain",
              marginRight: "10px",
            }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link fw-semibold"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/prodotti"
                className="nav-link fw-semibold"
                onClick={() => setIsOpen(false)}
              >
                Prodotti
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/preventivo"
                className="nav-link fw-semibold"
                onClick={() => setIsOpen(false)}
              >
                Preventivo
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/admin"
                    className="nav-link fw-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Amministrazione
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className=" ms-lg-2">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button>Accedi</button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
