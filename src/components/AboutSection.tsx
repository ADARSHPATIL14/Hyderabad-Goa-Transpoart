import React from 'react';
import './AboutSection.css';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Editorial Headline & Stance */}
          <div className="about-col about-col--lead">
            <span className="section-eyebrow">Who We Are</span>
            <h2 className="about-title">
              Moving goods.<br />
              Connecting places.
            </h2>
            <div className="about-lead-divider"></div>
            <p className="about-lead-summary">
              Hyderabad Goa Transport was founded with a singular conviction: inter-state freight should be characterized by quiet predictability, exacting punctuality, and complete peace of mind.
            </p>
          </div>

          {/* Right Column: Narrative & Key Commitments */}
          <div className="about-col about-col--details">
            <div className="about-narrative">
              <p>
                Connecting the industrial hubs of Telangana with the bustling commercial centers and ports of Goa, our dedicated corridor fleet operates on fixed, tightly monitored schedules. We eliminate intermediate terminal delays and transshipment risks.
              </p>
              <p>
                From industrial machinery, raw goods, and agricultural consignments to commercial distributor stock and private high-value shipments, each consignment receives rigorous oversight from point of origin to final destination.
              </p>
            </div>

            {/* Credibility Key Indicators */}
            <div className="about-metrics">
              <div className="metric-item">
                <span className="metric-number">720<small>km</small></span>
                <span className="metric-label">Dedicated Transit Corridor</span>
              </div>
              <div className="metric-item">
                <span className="metric-number">24<small>hr</small></span>
                <span className="metric-label">Express Line-Haul Turnaround</span>
              </div>
              <div className="metric-item">
                <span className="metric-number">100<small>%</small></span>
                <span className="metric-label">Owned & Monitored Fleet</span>
              </div>
              <div className="metric-item">
                <span className="metric-number">0<small>compromise</small></span>
                <span className="metric-label">Cargo Safety & Route Care</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
