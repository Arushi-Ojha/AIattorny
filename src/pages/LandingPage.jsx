import { useNavigate } from "react-router-dom";
import AutoCarousel from "./Carousel";
function LandingPage() {
  const navigate = useNavigate();

  function Login() {
    navigate("/login");
  }
  function Open() {
    navigate("/open");
  }
  function Donate() {
    navigate("/error");
  }

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="overlay">
          <h1 className="hero-title">AI Attorney</h1>
          <p className="hero-subtitle">
            Where justice meets intelligence — our GenAI-powered attorney
            redefines legal consultation with precision, accessibility, and trust.
          </p>
          <div className="hero-buttons">
            <button onClick={Login} className="btn-primary">
              Get Started
            </button>
            <button onClick={Open} className="btn-secondary">
              Are You a Lawyer? Join Us
            </button>
            <button onClick={Donate} className="btn-outline">
              Donate
            </button>
          </div>
        </div>
      </section>
      <AutoCarousel/>

      {/* About Section */}
      <section className="info-section">
        <h2>Why AI Attorney?</h2>
        <p>
          In a world where access to legal help is often delayed, expensive, and
          inconsistent, <strong>AI Attorney</strong> stands as a transformative
          solution. By fusing the <em>wisdom of law</em> with the
          <em> power of Generative AI</em>, we create a platform that is
          scalable, accurate, and available 24/7.
        </p>
      </section>

      {/* Features Section */}
      <section className="info-section">
        <h2>Key Features</h2>
        <ul>
          <li>
            ⚖️ <strong>Instant Legal Insights</strong> — Get clear answers to
            complex legal questions.
          </li>
          <li>
            🤝 <strong>Hybrid Collaboration</strong> — Lawyers + AI working hand
            in hand.
          </li>
          <li>
            🌍 <strong>Accessibility</strong> — Breaking barriers of geography
            and cost.
          </li>
          <li>
            🔒 <strong>Trust & Security</strong> — Every consultation is private
            and encrypted.
          </li>
        </ul>
      </section>

      {/* Vision Section */}
      <section className="info-section">
        <h2>Our Vision</h2>
        <p>
          We’re not just building a product; we’re shaping a movement. A movement
          where <strong>justice is democratized</strong>, where AI empowers
          lawyers to focus on strategy while automating repetitive tasks, and
          where clients feel heard, understood, and guided.
        </p>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Be Part of the Future of Law</h2>
        <p>
          Join us in reshaping the justice system — whether you’re a client, a
          lawyer, or a supporter.
        </p>
        <div className="cta-buttons">
          <button onClick={Login} className="btn-primary">
            Get Started
          </button>
          <button onClick={Donate} className="btn-outline">
            Donate & Support Us
          </button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
