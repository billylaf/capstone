import { Link } from "react-router-dom"
import { Carousel } from "react-bootstrap"

const HomePage = () => {
  const services = [
    {
      icon: "/images/carroponte.png",
      title: "Montaggio Carroponti",
      desc: "Installazione professionale di carroponti per industrie e magazzini.",
    },
    {
      icon: "/images/bandiera.png",
      title: "Montaggio Gru a Bandiera",
      desc: "Soluzioni complete per il montaggio di gru a bandiera.",
    },
    {
      icon: "/images/ascensore.png",
      title: "Installazione Ascensori",
      desc: "Montaggio e collaudo di ascensori per edifici residenziali e commerciali.",
    },
    {
      icon: "/images/maintenance.png",
      title: "Manutenzione Ordinaria",
      desc: "Piani di manutenzione programmata per garantire efficienza e sicurezza.",
    },
    {
      icon: "/images/martello.png",
      title: "Riparazioni Straordinarie",
      desc: "Interventi rapidi per guasti e malfunzionamenti.",
    },
    {
      icon: "/images/consulenza.png",
      title: "Consulenza Tecnica",
      desc: "Analisi e consulenza per la scelta dei sistemi di sollevamento.",
    },
  ]

  const strengths = [
    {
      icon: "🏆",
      title: "Esperienza Decennale",
      desc: "Oltre 15 anni nel settore.",
    },
    {
      icon: "🔒",
      title: "Massima Sicurezza",
      desc: "Interventi secondo le normative.",
    },
    {
      icon: "🔝",
      title: "Qualità Garantita",
      desc: "Materiali e tecnologie all'avanguardia.",
    },
    {
      icon: "⏱️",
      title: "Tempestività",
      desc: "Interventi rapidi e puntuali.",
    },
  ]
  const lavorazioni = [
    "/images/foto1.jpg",
    "/images/foto2.jpg",
    "/images/foto3.jpg",
    "/images/foto4.jpg",
    "/images/foto5.jpg",
    "/images/foto6.jpg",
    "/images/foto7.jpg",
    "/images/foto8.jpg",
    "/images/foto9.jpg",
    "/images/foto10.jpg",
    "/images/foto11.jpg",
    "/images/foto12.jpg",
  ]

  return (
    <>
      {/* Hero Section */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%)",
        }}
      >
        <div className="container">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6">
              <h1 className="display-3 fw-bold" style={{ color: "#000000" }}>
                Sollevamenti{" "}
                <span style={{ color: "#0572e6" }}>professionali</span> per ogni
                esigenza
              </h1>
              <p className="lead text-secondary my-4">
                Midoun Impianti è specializzata nel montaggio, manutenzione e
                riparazione di carroponti, gru a bandiera e ascensori. Affidati
                a noi per la sicurezza dei tuoi sistemi.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/prodotti" className=" btn-lg ">
                  <button>Scopri i Prodotti</button>
                </Link>
                <Link to="/preventivo">
                  <button>Richiedi Preventivo</button>
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center mt-4 mt-lg-0">
              <div
                className=" bg-gradient rounded-4 d-flex align-items-center justify-content-center"
                style={{ minHeight: "300px", overflow: "hidden" }}
              >
                <img
                  src="/images/hero-image.jpg"
                  className="img-fluid rounded"
                  style={{
                    maxHeight: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carosello Lavorazioni */}
      <section className="py-5">
        <div className="container">
          <h2
            className="display-4 text-center fw-bold mb-5"
            style={{ color: "#000000" }}
          >
            Le Nostre Lavorazioni
          </h2>

          <Carousel fade interval={3000} indicators={true} controls={true}>
            {lavorazioni.map((imgSrc, index) => (
              <Carousel.Item key={index}>
                <div
                  style={{
                    minheight: "300px",
                    maxHeight: "600px",
                    borderRadius: "15px",
                    overflow: "hidden",
                    backgroundColor: "#e9ecef",
                  }}
                >
                  <img
                    className="d-block w-100 h-100"
                    src={imgSrc}
                    alt={`Lavorazione ${index + 1}`}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Services */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2
            className="display-4 text-center fw-bold"
            style={{ color: "#000000" }}
          >
            I Nostri Servizi
          </h2>
          <p className="text-center text-secondary mb-5 fs-5">
            Offriamo soluzioni complete per il mondo del sollevamento
          </p>
          <div className="row g-4">
            {services.map((s, i) => (
              <div key={i} className="col-md-4">
                <div className="card h-100 text-center shadow-sm hover-shadow transition">
                  <div className="card-body">
                    {s.icon.includes(".png") ? (
                      <img
                        src={s.icon}
                        alt={s.title}
                        className="mb-3"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <div className="display-1 mb-3">{s.icon}</div>
                    )}

                    <h4 className="card-title" style={{ color: "#000000" }}>
                      {s.title}
                    </h4>
                    <p className="card-text text-secondary">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section className="py-5">
        <div className="container">
          <h2
            className="display-4 text-center fw-bold"
            style={{ color: "#000000" }}
          >
            Perché Sceglierci
          </h2>
          <div className="row g-4 mt-3">
            {strengths.map((s, i) => (
              <div key={i} className="col-md-3">
                <div className="card h-100 text-center border-0 shadow-sm">
                  <div className="card-body">
                    <div className="display-1 mb-3">{s.icon}</div>
                    <h5 className="card-title" style={{ color: "#000000" }}>
                      {s.title}
                    </h5>
                    <p className="card-text text-secondary">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
