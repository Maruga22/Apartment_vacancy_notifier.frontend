import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/notification-form.css";

export default function PostVacancy() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    rent: "",
    bedrooms: "1",
    description: "",
  });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.address || !formData.rent || !formData.description) {
      setError("Please fill in all required fields before saving.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setFormData({ title: "", address: "", rent: "", bedrooms: "1", description: "" });
    }, 600);
  };

  if (!isAuthenticated) {
    return (
      <div className="home-page">
        <Navbar />

        <main className="browse-page">
          <section className="browse-header">
            <h1>Sign in to post a vacancy</h1>
            <p>
              You must be logged in before you can submit a vacancy listing.
              Please sign in or create an account to continue.
            </p>
            <div className="auth-redirect-buttons">
              <button className="btn btn-primary" onClick={() => navigate("/login", { state: { from: redirectFrom } })}>
                Log In
              </button>
              <button className="btn btn-secondary" onClick={() => navigate("/signup", { state: { from: redirectFrom } })}>
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
          <h1>Post a Vacancy</h1>
          <p>Save your apartment vacancy details and notify interested users.</p>
        </section>

        <section className="notification-form-container">
          <form onSubmit={handleSubmit} className="notification-form">
            <h2>Vacancy Details</h2>

            <div className="form-group">
              <label htmlFor="title">Listing Title</label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Spacious 2BR near the park"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street address or neighborhood"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="rent">Rent ($/month)</label>
                <input
                  id="rent"
                  name="rent"
                  type="number"
                  value={formData.rent}
                  onChange={handleChange}
                  placeholder="1800"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="bedrooms">Bedrooms</label>
                <select id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange}>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Share details like amenities, parking, or move-in date."
                rows="5"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Saving..." : "Save Vacancy"}
            </button>

            {saved && (
              <div className="alert alert-success">
                ✓ Saved successfully. Your vacancy is now ready to share.
              </div>
            )}
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
