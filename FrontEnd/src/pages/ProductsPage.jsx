import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../api/axios"

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState("Tutti")

  const categories = [
    "Tutti",
    "Carroponti",
    "Gru a bandiera",
    "Ascensori",
    "Accessori",
  ]

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await api.get("/prodotti")
      setProducts(res.data)
      setLoading(false)
    } catch {
      setError("Errore nel caricamento dei prodotti")
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
        <div className="spinner-border text-primary" />
      </div>
    )
  if (error)
    return <div className="alert alert-danger text-center m-5">{error}</div>

  return (
    <div className="container py-5">
      <h1
        className="display-4 text-center fw-bold"
        style={{ color: "#1a3a5c" }}
      >
        I Nostri Prodotti
      </h1>
      <p className="text-center text-secondary fs-5 mb-4">
        Scopri la nostra gamma di sistemi di sollevamento
      </p>

      <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
        {categories.map((c) => (
          <button
            key={c}
            className={`btn ${category === c ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="row g-4">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <div key={p.id} className="col-md-4">
              <div className="card h-100 shadow-sm hover-shadow transition">
                <div
                  className="card-img-top bg-light d-flex align-items-center justify-content-center"
                  style={{ height: "200px" }}
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
                    <span className="h5 text-warning fw-bold">
                      € {p.prezzo.toFixed(2)}
                    </span>
                    <Link to={`/prodotti/${p.id}`} className="btn btn-primary">
                      Dettagli
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

      <style>{`
        .hover-shadow:hover { transform: translateY(-5px); box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15)!important; }
        .transition { transition: all 0.3s ease; }
        .object-fit-contain { object-fit: contain; }
      `}</style>
    </div>
  )
}

export default ProductsPage
