import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";

const apartments = [
  {
    id: 1,
    title: "Bright 1BR in Downtown",
    location: "Downtown",
    price: 1850,
    bedrooms: 1,
    description: "Sunny apartment with transit access and a shared gym.",
  },
  {
    id: 2,
    title: "Spacious 2BR Near Park",
    location: "Greenwood",
    price: 2150,
    bedrooms: 2,
    description: "Open living area, modern kitchen, and park views.",
  },
  {
    id: 3,
    title: "Studio Loft with City Views",
    location: "Midtown",
    price: 1600,
    bedrooms: 0,
    description: "High ceilings, bright windows, and easy city access.",
  },
  {
    id: 4,
    title: "3BR Family Apartment",
    location: "Brookside",
    price: 2500,
    bedrooms: 3,
    description: "Quiet street, laundry in building, and nearby schools.",
  },
];

export default function Search() {
  return (
    <div className="home-page">
      <Navbar />

      <main className="browse-page">
        <section className="browse-header">
          <h1>Browse Apartments</h1>
          <p>Explore available vacancies and find the right home for your next move.</p>
        </section>

        <section className="apartment-grid">
          {apartments.map((apartment) => (
            <article key={apartment.id} className="apartment-card">
              <h2>{apartment.title}</h2>
              <p className="apartment-location">{apartment.location}</p>
              <p className="apartment-meta">
                {apartment.bedrooms > 0 ? `${apartment.bedrooms} BR` : "Studio"} • ${apartment.price}/mo
              </p>
              <p className="apartment-description">{apartment.description}</p>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
