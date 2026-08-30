import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const result = await login(email, password)
    if (result.success) {
      navigate("/admin")
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="container py-5" style={{ maxWidth: "450px" }}>
      <div className="card shadow-sm p-4">
        <h2 className="text-center fw-bold" style={{ color: "#000000" }}>
          Accesso Admin
        </h2>
        <p className="text-center text-secondary mb-4">
          Inserisci le tue credenziali per accedere all'area riservata
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className=" text-center fw-semibold"
              disabled={loading}
            >
              {loading ? "Accesso in corso..." : "Accedi"}
            </button>
          </div>
        </form>

        <p className="text-center text-muted mt-3 small">
          Accesso concesso solo ad utenti autorizzati.
        </p>
      </div>
    </div>
  )
}

export default LoginPage
