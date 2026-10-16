import React, { useState } from 'react';
import './ContactSection.css';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cargoType: 'Full Truckload (FTL)',
    origin: 'Hyderabad, Telangana',
    destination: 'Goa (Panaji / Vasco / Madgaon)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const emailRecipient = 'Hyderabadgoa1977@gmail.com';
  const phoneNumber = '+91 98493 02205';
  const phoneTel = 'tel:+919849302205';
  const addressFormatted = 'Gaganpahad, Shamshabad, Hyderabad, Telangana';
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Gaganpahad+Shamshabad+Hyderabad';
  const whatsappUrl = `https://wa.me/919849302205?text=${encodeURIComponent(
    formData.name
      ? `Hello Hyderabad Goa Transport, I am ${formData.name}. I would like to inquire about ${formData.cargoType} (${formData.origin}). Direct contact: ${formData.phone}. Notes: ${formData.notes || 'None'}`
      : 'Hello Hyderabad Goa Transport, I would like to book cargo transport on the Hyderabad-Goa route.'
  )}`;
  const mailtoUrl = `mailto:${emailRecipient}?subject=${encodeURIComponent(
    `Cargo Transport Inquiry - ${formData.name || 'Freight Consignment'}`
  )}&body=${encodeURIComponent(
    `Consignor Name / Organization: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'N/A'}\nService Type: ${formData.cargoType}\nCorridor Route: ${formData.origin}\nNotes & Tonnage: ${formData.notes || 'N/A'}\n`
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission and transition to instant channel options
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="contact-grid">
          {/* Left Column: Direct Inquiries & Hub Information */}
          <div className="contact-details">
            <span className="section-eyebrow">Initiate Transport</span>
            <h2 className="contact-title">Direct freight booking & inquiry.</h2>
            <p className="contact-summary">
              Speak directly with our corridor dispatch desk for scheduled bookings, vehicle bay allocations, or specialized logistics consultations.
            </p>

            <div className="contact-channels">
              <div className="channel-item">
                <span className="channel-label">Dispatch & Booking Line</span>
                <a href={phoneTel} className="channel-value">{phoneNumber}</a>
                <div className="channel-quick-actions">
                  <a href={phoneTel} className="channel-action-btn">
                    <span>Call Now</span>
                  </a>
                  <a
                    href="https://wa.me/919849302205?text=Hello%20Hyderabad%20Goa%20Transport,%20I%20would%20like%20to%20inquire%20about%20cargo%20booking."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-action-btn channel-action-btn--whatsapp"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
                <span className="channel-meta">Mon – Sat · 08:00 to 20:00 IST · Instant Response</span>
              </div>

              <div className="channel-item">
                <span className="channel-label">Corporate & Freight Inquiries</span>
                <a href={`mailto:${emailRecipient}`} className="channel-value channel-value--email">
                  {emailRecipient}
                </a>
                <span className="channel-meta">Direct dispatch email · Prompt confirmation</span>
              </div>

              <div className="channel-item">
                <span className="channel-label">Hyderabad Terminal & Hub</span>
                <address className="channel-address">
                  {addressFormatted}
                </address>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-map-link"
                >
                  View on Google Maps →
                </a>
              </div>

              <div className="channel-item">
                <span className="channel-label">Goa Distribution Desk</span>
                <address className="channel-address">
                  Shed 12, Verna Industrial Estate, Verna, Goa 403722
                </address>
              </div>
            </div>
          </div>

          {/* Right Column: Minimalist Inquiry Form */}
          <div className="contact-form-container">
            {submitted ? (
              <div className="form-success-card" role="alert">
                <div className="success-icon">✓</div>
                <h3 className="success-title">Inquiry Prepared</h3>
                <p className="success-desc">
                  Thank you, <strong>{formData.name}</strong>. Your consignment request for <strong>{formData.cargoType}</strong> is ready. Connect directly with our dispatch supervisor via email or WhatsApp below:
                </p>

                <div className="success-action-buttons">
                  <a
                    href={mailtoUrl}
                    className="success-btn success-btn--primary"
                  >
                    ✉ Send Email to {emailRecipient}
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="success-btn success-btn--secondary"
                  >
                    💬 Message Dispatch on WhatsApp ({phoneNumber})
                  </a>
                  <a
                    href={phoneTel}
                    className="success-btn success-btn--outline"
                  >
                    📞 Call Dispatch Desk ({phoneNumber})
                  </a>
                </div>

                <button
                  type="button"
                  className="success-reset-btn"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      cargoType: 'Full Truckload (FTL)',
                      origin: 'Hyderabad, Telangana',
                      destination: 'Goa (Panaji / Vasco / Madgaon)',
                      notes: '',
                    });
                  }}
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form className="inquiry-form" onSubmit={handleSubmit}>
                <div className="form-header">
                  <h3 className="form-heading">Request a Corridor Quote</h3>
                  <p className="form-subheading">Fill in your consignment details below.</p>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="inquiry-name" className="field-label">Your Name or Organization *</label>
                    <input
                      id="inquiry-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Hyderabad Pharma Logistics Ltd"
                      className="field-input"
                    />
                  </div>
                </div>

                <div className="form-row form-row--two">
                  <div className="form-field">
                    <label htmlFor="inquiry-phone" className="field-label">Direct Phone *</label>
                    <input
                      id="inquiry-phone"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98000 00000"
                      className="field-input"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="inquiry-email" className="field-label">Email Address</label>
                    <input
                      id="inquiry-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="dispatch@company.com"
                      className="field-input"
                    />
                  </div>
                </div>

                <div className="form-row form-row--two">
                  <div className="form-field">
                    <label htmlFor="inquiry-cargo" className="field-label">Cargo Service Type</label>
                    <select
                      id="inquiry-cargo"
                      name="cargoType"
                      value={formData.cargoType}
                      onChange={handleChange}
                      className="field-select"
                    >
                      <option value="Full Truckload (FTL)">Full Truckload (FTL)</option>
                      <option value="Partial Truckload (PTL)">Partial Truckload (PTL)</option>
                      <option value="Express Line-Haul">Express Line-Haul</option>
                      <option value="Industrial Machinery">Industrial Machinery</option>
                      <option value="Commercial Contract Logistics">Commercial Contract Logistics</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="inquiry-origin" className="field-label">Corridor Direction</label>
                    <select
                      id="inquiry-origin"
                      name="origin"
                      value={formData.origin}
                      onChange={handleChange}
                      className="field-select"
                    >
                      <option value="Hyderabad, Telangana">Hyderabad → Goa</option>
                      <option value="Goa to Hyderabad">Goa → Hyderabad</option>
                      <option value="Intermediate Corridor">En-Route Station (Hubballi / Belagavi)</option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="inquiry-notes" className="field-label">Consignment Notes & Weight (Optional)</label>
                  <textarea
                    id="inquiry-notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Approximate tonnage, packaging type, or pickup schedule..."
                    className="field-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="form-submit-btn"
                >
                  {isSubmitting ? 'Transmitting Request...' : 'Submit Route Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
