import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  const handleFindHome = () => {
    navigate("/search");
  };

  const handlePostVacancy = () => {
    navigate("/post");
  };

  return (
    <div className="home-page">
      <Navbar />
      
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Perfect Home</h1>
          <p className="hero-subtitle">
            Discover available apartments in your area and get notified about new vacancies
            the moment they appear.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handleFindHome}>
              🔍 Find a Home
            </button>
            <button className="btn btn-secondary" onClick={handlePostVacancy}>
              📝 Post Vacancy
            </button>
          </div>
        </div>

      </section>

    

      <Footer />
    </div>
  );
}
