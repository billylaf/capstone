const Footer = () => {
  return (
    <footer className=" text-light py-5 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 style={{ color: "#0572e6" }}>Midoun Impianti</h5>
            <p>
              Specialisti in montaggio e manutenzione di sistemi di sollevamento
            </p>
          </div>
          <div className="col-md-4">
            <h5 style={{ color: "#0572e6" }}>Contatti</h5>
            <p className="mb-1">
              <i class="bi bi-telephone-fill"></i> +39 380 283 4683
            </p>
            <p className="mb-1">
              <i class="bi bi-envelope-at-fill"></i> info@midounimpianti.it
            </p>
            <p className="mb-1">
              <i class="bi bi-geo-fill"></i>Via Massa Carrara,Bologna
            </p>
            <p>P.IVA 04238581203</p>
          </div>
          <div className="col-md-4">
            <h5 style={{ color: "#0572e6" }}>Orari</h5>
            <p className="mb-1">Lun - Ven: 8:00 - 18:00</p>
            <p className="mb-1">Sab: 9:00 - 13:00</p>
            <p>Dom: Chiuso</p>
          </div>
        </div>
        <hr className="border-secondary" />
        <p className="text-center mb-0">
          &copy; 2026 Midoun Impianti - Tutti i diritti riservati
        </p>
      </div>
    </footer>
  )
}

export default Footer
