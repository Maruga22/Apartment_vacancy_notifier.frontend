// API service for communicating with Python backend
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const apiService = {
  /**
   * Send notification email for a new apartment
   */
  async notifyVacancy(email, userName, apartment) {
    try {
      const response = await fetch(`${API_BASE_URL}/notify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          user_name: userName,
          apartment,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error notifying vacancy:", error);
      throw error;
    }
  },

  /**
   * Subscribe user to apartment notifications
   */
  async subscribe(email, name, location, maxPrice, minBedrooms = 1) {
    try {
      const response = await fetch(`${API_BASE_URL}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          location,
          max_price: maxPrice,
          min_bedrooms: minBedrooms,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error subscribing:", error);
      throw error;
    }
  },

  /**
   * Test email endpoint
   */
  async sendTestEmail(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/test-email?email=${encodeURIComponent(email)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error sending test email:", error);
      throw error;
    }
  },
};
