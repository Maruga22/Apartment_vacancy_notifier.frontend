import { useState } from "react";
import { apiService } from "../services/api";
import "../styles/notification-form.css";

export function NotificationForm() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    location: "",
    maxPrice: "",
    minBedrooms: "1",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Subscribe user
      await apiService.subscribe(
        formData.email,
        formData.name,
        formData.location,
        parseFloat(formData.maxPrice),
        parseInt(formData.minBedrooms)
      );

      setMessageType("success");
      setMessage(`✓ Successfully subscribed! Check ${formData.email} for apartment alerts.`);

      // Reset form
      setFormData({
        email: "",
        name: "",
        location: "",
        maxPrice: "",
        minBedrooms: "1",
      });
    } catch (error) {
      setMessageType("error");
      setMessage(`✗ Error: ${error.message || "Failed to subscribe. Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notification-form-container">
      <form onSubmit={handleSubmit} className="notification-form">
        <h2>Get Apartment Alerts</h2>
        <p className="form-subtitle">Subscribe to receive email notifications for new vacancies</p>

        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Downtown, Brooklyn"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="maxPrice">Max Monthly Price ($)</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={formData.maxPrice}
              onChange={handleChange}
              placeholder="2000"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="minBedrooms">Minimum Bedrooms</label>
          <select
            id="minBedrooms"
            name="minBedrooms"
            value={formData.minBedrooms}
            onChange={handleChange}
          >
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`submit-btn ${loading ? "loading" : ""}`}
        >
          {loading ? "Subscribing..." : "Subscribe to Alerts"}
        </button>

        {message && (
          <div className={`alert alert-${messageType}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
