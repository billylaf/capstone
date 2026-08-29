import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../../api/axios"

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await api.get("/prodotti")
      setProducts(res.data)
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo prodotto?"))
      return
    try {
      await api.delete(`/prodotti/${id}`)
      fetchProducts()
    } catch {
      alert("Errore durante l'eliminazione")
    }
  }

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" />
      </div>
    )

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>📦 Gestione Prodotti</h3>
        <button
          onClick={() => navigate("/admin/prodotti/nuovo")}
          className="btn btn-success"
        >
          + Nuovo Prodotto
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Immagine</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Prezzo</th>
              <th>Disponibile</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  {p.immagine ? (
                    <img
                      src={p.immagine}
                      alt={p.nome}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span>🏗️</span>
                  )}
                </td>
                <td>{p.nome}</td>
                <td>{p.categoria}</td>
                <td>€ {p.prezzo.toFixed(2)}</td>
                <td>
                  <span
                    className={`badge ${p.disponibile ? "bg-success" : "bg-danger"}`}
                  >
                    {p.disponibile ? "Sì" : "No"}
                  </span>
                </td>
                <td>
                  <Link
                    to={`/admin/prodotti/modifica/${p.id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Modifica
                  </Link>
                  <button class="button" onClick={() => handleDelete(p.id)}>
                    <svg viewBox="0 0 448 512" class="svgIcon">
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminProducts
