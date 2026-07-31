import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/notification-form.css";

export default function PostVacancy() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    address: "",
    rent: "",
    bedrooms: "1",
    bathrooms: "1",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const redirectFrom = location.state?.from || "/post";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSaved(false);

    try {
      const body = new FormData();

      body.append("title", formData.title);
      body.append("location", formData.address);
      body.append("price", formData.rent);
      body.append("bedrooms", formData.bedrooms);
      body.append("bathrooms", formData.bathrooms);
      body.append("description", formData.description);

      if (image) {
        body.append("image", image);
      }

      const response = await fetch(
        "http://127.0.0.1:5000/api/apartments/",
        {
          method: "POST",
          body,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to post apartment.");
      }

      setSaved(true);

      alert("Vacancy Posted Successfully!");

      setFormData({
        title: "",
        address: "",
        rent: "",
        bedrooms: "1",
        bathrooms: "1",
        description: "",
      });

      setImage(null);
      setPreview("");

      navigate("/search");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="home-page">
        <Navbar />

        <main className="browse-page">
          <section className="browse-header">
            <h1>Sign in to post a vacancy</h1>

            <p>
              You must be logged in before posting a property.
            </p>

            <div className="auth-redirect-buttons">
              <button
                className="btn btn-primary"
                onClick={() =>
                  navigate("/login", {
                    state: { from: redirectFrom },
                  })
                }
              >
                Log In
              </button>

              <button
                className="btn btn-secondary"
                onClick={() =>
                  navigate("/signup", {
                    state: { from: redirectFrom },
                  })
                }
              >
                Sign Up
              </button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="home-page">
      <Navbar />

      <main className="browse-page">

        <section className="browse-header">
          <h1>Post Apartment Vacancy</h1>

          <p>
            Fill in the details below to advertise your apartment.
          </p>
        </section>

        <section className="notification-form-container">

          <form
            className="notification-form"
            onSubmit={handleSubmit}
          >

            <h2>Apartment Details</h2>

            <div className="form-group">
              <label>Listing Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Modern 2 Bedroom Apartment"
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Westlands, Nairobi"
                required
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Rent (KES)</label>

                <input
                  type="number"
                  name="rent"
                  value={formData.rent}
                  onChange={handleChange}
                  placeholder="25000"
                  required
                />
              </div>

              <div className="form-group">
                <label>Bedrooms</label>

                <select
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                >
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4 Bedrooms</option>
                  <option value="5">Studio</option>
                </select>
              </div>

            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Bathrooms</label>

                <select
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                >
                  <option value="1">1 Bathroom</option>
                  <option value="2">2 Bathrooms</option>
                  <option value="3">3 Bathrooms</option>
                  <option value="4">4 Bathrooms</option>
                </select>
                            </div>

            </div>

            <div className="form-group">
              <label>Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe the apartment, nearby amenities, parking, security, WiFi, water availability, etc."
                required
              />
            </div>

            <div className="form-group">
              <label>Apartment Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
            </div>

            {preview && (
              <div className="image-preview">
                <img
                  src={preview}
                  alt="Preview"
                  className="preview-image"
                />
              </div>
            )}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {saved && (
              <div className="success-message">
                Apartment posted successfully!
              </div>
            )}

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Apartment"}
            </button>

          </form>

        </section>

      </main>

      <Footer />

    </div>
  );
}
             