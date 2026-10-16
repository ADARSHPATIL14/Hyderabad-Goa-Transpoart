import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-brand__name">Hyderabad Goa Transport</h3>
            <p className="footer-brand__tagline">
              Dedicated inter-state freight & commercial cargo carriage connecting Hyderabad, Telangana and coastal Goa.
            </p>
          </div>

          <div className="footer-links-group">
            <div className="footer-nav-col">
              <span className="footer-col-title">Navigation</span>
              <ul className="footer-menu">
                <li><a href="#hero">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#coverage">Corridor Route</a></li>
                <li><a href="#contact">Inquiries</a></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <span className="footer-col-title">Direct Contact</span>
              <ul className="footer-menu">
                <li>
                  <a href="tel:+919849302205" className="footer-contact-link">
                    +91 98493 02205
                  </a>
                </li>
                <li>
                  <a href="mailto:Hyderabadgoa1977@gmail.com" className="footer-contact-link">
                    Hyderabadgoa1977@gmail.com
                  </a>
                </li>
                <li>
                  <address className="footer-address">
                    Gaganpahad, Shamshabad,<br />
                    Hyderabad, Telangana
                  </address>
                </li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <span className="footer-col-title">Corridor Terminals</span>
              <ul className="footer-menu">
                <li><span>Hyderabad (Shamshabad / Gaganpahad)</span></li>
                <li><span>Raichur Transit Point</span></li>
                <li><span>Hubballi Junction</span></li>
                <li><span>Belagavi Station</span></li>
                <li><span>Goa Verna & Vasco Desk</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Hyderabad Goa Transport. All rights reserved. Commercial Carriage & Freight Line.
          </p>
          <button
            type="button"
            className="footer-back-top"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <span className="back-top-arrow">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
