import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../api/axios"

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState("Tutti")

  const categories = ["Tutti", "Carroponti", "Gru a bandiera", "Accessori"]

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await api.get("/prodotti")
      setProducts(res.data)
      setLoading(false)
    } catch {
      setError(
        "Prodotti non dispobili per il momento, ci scusiamo per il disagio",
      )
      setLoading(false)
    }
  }

  const filtered =
    category === "Tutti"
      ? products
      : products.filter((p) => p.categoria === category)

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-black" />
      </div>
    )
  if (error)
    return <div className="alert alert-danger text-center m-5">{error}</div>

  return (
    <div className="container py-5">
      <h1
        className="display-4 text-center fw-bold"
        style={{ color: "#000000" }}
      >
        I Nostri Prodotti
      </h1>
      <p className="text-center text-secondary fs-5 mb-4">
        Scopri la nostra gamma di sistemi di sollevamento
      </p>

      <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
        {categories.map((c) => (
          <button key={c} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="row g-4">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <div key={p.id} className="col-md-4 ">
              <div
                className="card h-100 shadow-sm hover-shadow transition"
                class="card"
              >
                <div
                  className="card-img-top bg-light d-flex align-items-center justify-content-center"
                  style={{ height: "300px" }}
                >
                  {p.immagine ? (
                    <img
                      src={p.immagine}
                      alt={p.nome}
                      className="img-fluid h-100 object-fit-contain"
                    />
                  ) : (
                    <span className="display-1">🏗️</span>
                  )}
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title" style={{ color: "#1a3a5c" }}>
                    {p.nome}
                  </h5>
                  <small className="text-muted">{p.categoria}</small>
                  <p className="card-text text-secondary mt-2 flex-grow-1">
                    {p.descrizione?.substring(0, 100)}
                    {p.descrizione?.length > 100 && "..."}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <Link to={`/prodotti/${p.id}`}>
                      <button>Dettagli</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p className="text-secondary">
              Nessun prodotto in questa categoria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
