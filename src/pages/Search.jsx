import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../AuthContext";
import "../styles/search.css";

export default function Search() {
  const [search, setSearch] = useState("");
  const [apartments, setApartments] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/apartments/")
      .then((res) => res.json())
      .then((data) => setApartments(data))
      .catch((err) => console.error(err));
  }, []);
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this apartment?"
  );

  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `http://127.0.0.1:5000/api/apartments/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    setApartments(
      apartments.filter((apartment) => apartment.id !== id)
    );

    alert("Apartment deleted successfully.");

  } catch (err) {
    alert(err.message);
  }
  };


  const handleEdit = (apartment) => {

  navigate("/post", {
    state: {
      apartment,
      editing: true,
    },
  });

  };
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
                  KES {Number(apartment.price).toLocaleString()}
                 </h3>

                 <p>
                  🛏 {apartment.bedrooms} Bedrooms
                 </p>

                 <p>
                  🚿 {apartment.bathrooms} Bathrooms
                 </p>

                 <p>{apartment.description}</p>

                 <div className="card-buttons">

                    <button
                      className="view-btn"
                    >
                      View Details
                    </button>

                    {user && apartment.user_id === user.id && (

                      <>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(apartment)}
                    >
                      ✏ Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(apartment.id)}
                    >
                      🗑 Delete
                    </button>

                    </>

                  )}

                </div>

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