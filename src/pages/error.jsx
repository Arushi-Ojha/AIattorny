import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-left">
          <div className="error-header">
            <div className="error-icon">⚠️</div>
            <div>
              <h1 className="error-code">404</h1>
              <p className="error-subtitle">Page Not Found</p>
            </div>
          </div>

          <h2 className="error-title">Uh-oh — this part is still under construction.</h2>

          <p className="error-description">
            Our developers are still working on this section. You can go back to the
            homepage, explore other pages, or contact support if you think this is an error.
          </p>

          <div className="error-actions">
            <button onClick={() => navigate('/')} className="btn-home">
              ⬅ Go to Homepage
            </button>

            <a href="/contact" className="btn-contact">
              Contact Support
            </a>
          </div>

          <small className="error-code-small">Error code: ERR-404-WIP</small>
        </div>

        <div className="error-right">
          <div className="error-illustration">
            <div className="progress-text">Deploy Queue</div>
            <div className="progress-bar">
              <div className="progress-fill" />
            </div>
            <div className="progress-status">Estimated availability: soon</div>
          </div>
        </div>
      </div>

      <div className="error-footer">© {new Date().getFullYear()} — Built with care by Arushi</div>
    </div>
  );
}