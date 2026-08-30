import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import api from "../api/axios"

const QuotePage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({
    nomeCliente: "",
    emailCliente: "",
    telefono: "",
    messaggio: "",
    prodottoId: location.state?.prodotto?.id || "",
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await api.get("/prodotti")
      setProducts(res.data)
    } catch {}
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post("/richieste", form)
      setSuccess(true)
      setForm({
        nomeCliente: "",
        emailCliente: "",
        telefono: "",
        messaggio: "",
        prodottoId: "",
      })
      setTimeout(() => navigate("/"), 3000)
    } catch {
      alert("Errore nell'invio della richiesta")
    }
    setLoading(false)
  }

  return (
    <div className="container py-5" style={{ maxWidth: "800px" }}>
      <h1
        className="display-4 text-center fw-bold"
        style={{ color: "#000000" }}
      >
        Richiedi Preventivo
      </h1>
      <p className="text-center text-secondary fs-5 mb-4">
        Compila il modulo e ti risponderemo al più presto
      </p>

      {success ? (
        <div className="alert text-center py-4">
          <h4> Richiesta inviata con successo!</h4>
          <p>Ti contatteremo al più presto.</p>
          <small className="text-secondary">Reindirizzamento in corso...</small>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          <div className="mb-3">
            <label className="form-label fw-semibold">Nome e Cognome *</label>
            <input
              type="text"
              name="nomeCliente"
              className="form-control"
              value={form.nomeCliente}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email *</label>
            <input
              type="email"
              name="emailCliente"
              className="form-control"
              value={form.emailCliente}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Telefono</label>
            <input
              type="tel"
              name="telefono"
              className="form-control"
              value={form.telefono}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Prodotto di interesse
            </label>
            <select
              name="prodottoId"
              className="form-select"
              value={form.prodottoId}
              onChange={handleChange}
            >
              <option value="">Seleziona un prodotto (opzionale)</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome} - € {p.prezzo.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Messaggio</label>
            <textarea
              name="messaggio"
              className="form-control"
              rows="4"
              value={form.messaggio}
              onChange={handleChange}
              placeholder="Descrivi la tua richiesta..."
            />
          </div>

          <button class="requestButton" type="submit" disabled={loading}>
            {loading ? "Invio in corso..." : "Invia Richiesta"}
          </button>
        </form>
      )}
    </div>
  )
}

export default QuotePage
