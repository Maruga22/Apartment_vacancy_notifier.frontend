import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/search.css";

export default function Search() {
  const [search, setSearch] = useState("");
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/apartments/")
      .then((res) => res.json())
      .then((data) => setApartments(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredApartments = apartments.filter((apartment) =>
    apartment.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-page">
      <Navbar />

      <main className="browse-page">

        <section className="browse-header">
          <h1>Find Your Next Home</h1>

          <p>
            Browse apartments posted by landlords and property managers.
          </p>

          <input
            type="text"
            placeholder="Search by location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </section>

        <section className="apartment-grid">
          {filteredApartments.length > 0 ? (
            filteredApartments.map((apartment) => (
              <div className="apartment-card" key={apartment.id}>

                <img
                  src={
                    apartment.image
                      ? `http://127.0.0.1:5000/uploads/${apartment.image}`
                      : "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  alt={apartment.title}
                  className="apartment-image"
                />

                <div className="card-content">

                  <h2>{apartment.title}</h2>

                  <p className="location">
                    📍 {apartment.location}
                  </p>

                  <h3>
                    KES {Number(apartment.price).toLocaleString()}/month
                  </h3>

                  <p>
                    🛏 {apartment.bedrooms} Bedrooms
                  </p>

                  <p>
                    🚿 {apartment.bathrooms} Bathrooms
                  </p>

                  <p>{apartment.description}</p>

                </div>

              </div>
            ))
          ) : (
            <h2>No apartments found.</h2>
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
}