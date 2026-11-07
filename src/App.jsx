import { useEffect, useState } from "react";
import { trip } from "./data/trip";
import "./App.css";

function getCountdown() {
  const diff = new Date(trip.departureDate).getTime() - Date.now();

  if (diff <= 0) return null;

  return {
    DÍAS: Math.floor(diff / 86400000),
    HRS: Math.floor((diff / 3600000) % 24),
    MIN: Math.floor((diff / 60000) % 60),
    SEG: Math.floor((diff / 1000) % 60),
  };
}

function App() {
  const [countdown, setCountdown] = useState(getCountdown);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="dashboard">

      {/* ENCABEZADO */}
    <header className="header">
      <div className="logo">
        <span>🏍</span> MOTO <b>FNIDEQ</b>
      </div>

      {/* <MusicPlayer /> */}

      <div className="live-status">
        <span /> PRÓXIMA RUTA
      </div>
    </header>

      {/* PORTADA + CUENTA ATRÁS */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${trip.images.hero})` }}
      >
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-label">
            UN GRUPO. UNA AVENTURA.
          </div>

          <p className="hero-route">
            {trip.route.join("  /  ")}
          </p>

          <div className="countdown">
            {countdown ? (
              Object.entries(countdown).map(([label, value]) => (
                <div className="time-box" key={label}>
                  <strong>{String(value).padStart(2, "0")}</strong>
                  <span>{label}</span>
                </div>
              ))
            ) : (
              <div className="started">
                ¡LA AVENTURA HA COMENZADO! 🏁
              </div>
            )}
          </div>

          <div className="departure">
            <span>PUNTO DE SALIDA</span>
            <b>
              {new Date(trip.departureDate).toLocaleString("es-ES", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </b>
          </div>
        </div>

        <div className="hero-tag">
          CONDUCE CON SEGURIDAD. DISFRUTA DEL CAMINO.
        </div>
      </section>

      {/* PILOTOS */}
      {/* <section className="crew">
        <div className="section-heading">
          <div>
            <span className="orange-label">EL EQUIPO</span>
            <h2>LOS PILOTOS</h2>
          </div>

          <div className="rider-count">
            <strong>{trip.riders.length}</strong>
            <span>PILOTOS</span>
          </div>
        </div>

        <div className="rider-grid">
          {trip.riders.map((rider) => (
            <article className="rider-card" key={rider.id}>
              <div className="rider-photo">
                <div className="photo-placeholder">
                  {rider.name?.charAt(0) || "P"}
                </div>

                {rider.image && (
                  <img
                    src={rider.image}
                    alt={rider.name}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}

                <span className="rider-id">
                  {String(rider.id).padStart(2, "0")}
                </span>
              </div>

              <div className="rider-details">
                <h3>{rider.name}</h3>
                <p>{rider.motorcycle || "MOTOCICLETA"}</p>
              </div>
            </article>
          ))}
        </div>
      </section> */}
      {/* PILOTOS */}
<section className="crew">
  <div className="section-heading">
    <div>
      <span className="orange-label">EL EQUIPO</span>
      <h2>LOS PILOTOS</h2>
    </div>

    <div className="rider-count">
      <strong>{trip.riders.length}</strong>
      <span>PILOTOS</span>
    </div>
  </div>

  <div className="rider-grid">
    {trip.riders.map((rider) => (
      <article className="rider-card" key={rider.id}>
        <div className="rider-photo">
          {rider.image ? (
            <img
              src={rider.image}
              alt={rider.name}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="photo-placeholder">
              {rider.name?.charAt(0) || "P"}
            </div>
          )}

          <span className="rider-id">
            #{String(rider.id).padStart(2, "0")}
          </span>
        </div>

        <div className="rider-details">
          <h3>{rider.name}</h3>
          <p>{rider.motorcycle || "MOTOCICLETA"}</p>
        </div>
      </article>
    ))}
  </div>
</section>

      {/* RUTA */}
      <section className="journey">
        <div className="section-heading">
          <div>
            <span className="orange-label">LA AVENTURA</span>
            <h2>NUESTRA RUTA</h2>
          </div>

          <span className="route-icon">🏁</span>
        </div>

        <div className="route-timeline">
          {trip.route.map((place, index) => (
            <div className="route-point" key={`${place}-${index}`}>
              <div className="route-dot">
                {index === trip.route.length - 1 ? "🏁" : ""}
              </div>
              <span>{place}</span>
            </div>
          ))}
        </div>
      </section>
      <audio
  src="/audio/moto-ride.mp3"
  autoPlay
  loop
  controls
/>

      {/* PIE DE PÁGINA */}
      <footer className="footer">
        <span>🏍 MOTO FNIDEQ</span>
        <span>JUNTOS EN LA RUTA. JUNTOS EN LA AVENTURA.</span>
      </footer>
      
    </main>
  );
}

export default App;
