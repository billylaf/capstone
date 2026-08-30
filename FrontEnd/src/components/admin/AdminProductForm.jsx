import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../api/axios"

const AdminProductForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nome: "",
    descrizione: "",
    categoria: "",
    prezzo: "",
    specifiche: "",
    disponibile: true,
  })
  const [file, setFile] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    if (isEditing) {
      fetchProduct()
    }
  }, [id])

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/prodotti/${id}`)
      const p = res.data
      setForm({
        nome: p.nome,
        descrizione: p.descrizione || "",
        categoria: p.categoria,
        prezzo: p.prezzo,
        specifiche: p.specifiche || "",
        disponibile: p.disponibile,
      })
    } catch {
      setError("Errore nel caricamento del prodotto")
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData()
    formData.append(
      "prodotto",
      new Blob(
        [
          JSON.stringify({
            nome: form.nome,
            descrizione: form.descrizione,
            categoria: form.categoria,
            prezzo: parseFloat(form.prezzo),
            specifiche: form.specifiche,
            disponibile: form.disponibile,
          }),
        ],
        { type: "application/json" },
      ),
    )

    if (file) {
      formData.append("immagine", file)
    }

    try {
      if (isEditing) {
        await api.put(`/prodotti/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      } else {
        await api.post("/prodotti", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      }
      navigate("/admin")
    } catch (err) {
      setError(err.response?.data?.message || "Errore durante il salvataggio")
    }
    setLoading(false)
  }

  return (
    <div>
      <h3 className="mb-4 text-black">
        {isEditing ? " Modifica Prodotto" : " Nuovo Prodotto"}
      </h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label fw-semibold">Nome *</label>
          <input
            type="text"
            name="nome"
            className="form-control"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Descrizione</label>
          <textarea
            name="descrizione"
            className="form-control"
            rows="3"
            value={form.descrizione}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Categoria *</label>
          <select
            name="categoria"
            className="form-select"
            value={form.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Seleziona categoria</option>
            <option value="Carroponti">Carroponti</option>
            <option value="Gru a bandiera">Gru a bandiera</option>
            <option value="Accessori">Accessori</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Prezzo (€) *</label>
          <input
            type="number"
            name="prezzo"
            className="form-control"
            step="0.01"
            min="0"
            value={form.prezzo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Specifiche tecniche</label>
          <textarea
            name="specifiche"
            className="form-control"
            rows="3"
            value={form.specifiche}
            onChange={handleChange}
            placeholder="Caratteristiche tecniche del prodotto..."
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Immagine</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            accept="image/*"
          />
          <small className="text-muted">
            {isEditing
              ? "Lascia vuoto per mantenere l'immagine corrente"
              : "Carica un'immagine per il prodotto"}
          </small>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            name="disponibile"
            className="form-check-input"
            checked={form.disponibile}
            onChange={handleChange}
          />
          <label className="form-check-label fw-semibold">
            Prodotto disponibile
          </label>
        </div>

        <div className="d-flex gap-3">
          <button
            type="submit"
            className=" btn-lg fw-semibold"
            disabled={loading}
          >
            {loading ? "Salvataggio..." : isEditing ? "Aggiorna" : "Crea "}
          </button>
          <button
            type="button"
            className=" btn-lg"
            onClick={() => navigate("/admin")}
          >
            Annulla
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminProductForm
