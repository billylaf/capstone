import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import api from "../api/axios"
import { useAuth } from "../context/AuthContext"

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/prodotti/${id}`)
      setProduct(res.data)
      setLoading(false)
    } catch {
      setError("Prodotto non trovato")
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Sei sicuro di voler eliminare questo prodotto?"))
      return
    try {
      await api.delete(`/prodotti/${id}`)
      navigate("/prodotti")
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
  if (error)
    return <div className="alert alert-danger text-center m-5">{error}</div>
  if (!product) return null

  return (
    <div className="container py-5">
      <Link to="/prodotti" className="mb-4">
        <button>← Torna ai Prodotti</button>
      </Link>

      <div className="row g-4">
        <div className="col-md-6">
          <div
            className="bg-light rounded-4 p-5 text-center"
            style={{ minHeight: "400px" }}
          >
            {product.immagine ? (
              <img
                src={product.immagine}
                alt={product.nome}
                className="img-fluid rounded"
                style={{ maxHeight: "400px" }}
              />
            ) : (
              <span className="display-1">🏗️</span>
            )}
          </div>
          {product.immagini?.length > 0 && (
            <div className="d-flex gap-2 mt-3 flex-wrap">
              {product.immagini.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.nome} ${i + 1}`}
                  className="rounded"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="col-md-6">
          <h1 className="display-5 fw-bold" style={{ color: "#000000" }}>
            {product.nome}
          </h1>
          <span className="badge bg-secondary mb-3">{product.categoria}</span>
          <p className="lead text-secondary">{product.descrizione}</p>

          <div className="bg-light p-3 rounded-3 mb-3">
            <h5>Specifiche tecniche</h5>
            <p className="text-secondary mb-0">
              {product.specifiche || "Nessuna specifica disponibile"}
            </p>
          </div>

          <div className="d-flex align-items-center gap-3 mb-4">
            <span className="h4 text-black fw-bold">
              € {product.prezzo.toFixed(2)}
            </span>
            <span>
              {product.disponibile ? "Disponibile" : "Non Disponibile"}
            </span>
          </div>

          <div className="d-flex gap-3 flex-wrap">
            <Link to="/preventivo" state={{ prodotto: product }}>
              <button> Richiedi Preventivo</button>
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to={`/admin/prodotti/modifica/${product.id}`}
                  className=" btn-lg"
                >
                  <button className="text-primary">Modifica</button>
                </Link>
                <button onClick={handleDelete} className=" btn-lg text-danger">
                  Elimina
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
