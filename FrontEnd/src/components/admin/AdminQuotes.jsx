import React, { useState, useEffect } from "react"
import api from "../../api/axios"

const AdminQuotes = () => {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async () => {
    try {
      const res = await api.get("/richieste")
      setQuotes(res.data)
      setLoading(false)
    } catch {
      setError("Errore nel caricamento delle richieste")
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/richieste/${id}/stato?stato=${status}`)
      fetchQuotes()
    } catch {
      alert("Errore durante l'aggiornamento dello stato")
    }
  }

  const getStatusBadge = (status) => {
    const colors = {
      PENDING: "bg-warning",
      IN_PROGRESS: "bg-info",
      COMPLETED: "bg-success",
      REJECTED: "bg-danger",
    }
    return `badge ${colors[status] || "bg-secondary"}`
  }

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" />
      </div>
    )
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div>
      <h3 className="mb-4 text-black"> Richieste di Preventivo</h3>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Prodotto</th>
              <th>Stato</th>
              <th>Data</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {quotes.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-secondary py-4">
                  Nessuna richiesta di preventivo ricevuta
                </td>
              </tr>
            ) : (
              quotes.map((q) => (
                <tr key={q.id}>
                  <td>{q.id}</td>
                  <td>
                    <strong>{q.nomeCliente}</strong>
                  </td>
                  <td>{q.emailCliente}</td>
                  <td>{q.telefono || "-"}</td>
                  <td>{q.prodotto?.nome || "Nessun prodotto"}</td>
                  <td>
                    <span className={getStatusBadge(q.stato)}>{q.stato}</span>
                  </td>
                  <td>
                    {new Date(q.dataCreazione).toLocaleDateString("it-IT")}
                  </td>
                  <td>
                    <div className="d-flex gap-1 flex-wrap">
                      <button
                        className="text-primary"
                        onClick={() => updateStatus(q.id, "IN_PROGRESS")}
                      >
                        In Lavorazione
                      </button>
                      <button
                        className="text-success"
                        onClick={() => updateStatus(q.id, "COMPLETED")}
                      >
                        Completato
                      </button>
                      <button
                        className="text-danger"
                        onClick={() => updateStatus(q.id, "REJECTED")}
                      >
                        Rifiutato
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminQuotes
