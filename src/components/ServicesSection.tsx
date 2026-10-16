import React from 'react';
import './ServicesSection.css';

interface ServiceItem {
  number: string;
  title: string;
  summary: string;
  capabilities: string[];
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Goods Transportation',
    summary: 'Direct Full-Truckload (FTL) and Partial-Load (PTL) carriage designed for commercial manufacturers, distributors, and trading houses.',
    capabilities: [
      'Zero-transshipment point-to-point dispatch',
      'Daily scheduled departure windows',
      'Secure tarpaulin and containerized bodies',
      'Immediate consignment documentation & e-way bill compliance'
    ],
  },
  {
    number: '02',
    title: 'Long-Distance Cargo',
    summary: 'Engineered inter-state line-haul bridging Hyderabad and coastal Goa through precision corridor navigation across Karnataka.',
    capabilities: [
      'Heavy machinery & oversized commercial freight',
      'Continuous transit driver pairs for expedited transit',
      'Real-time corridor checkpoint telemetry',
      'Tailored cargo securing for sensitive commercial items'
    ],
  },
  {
    number: '03',
    title: 'Business Logistics',
    summary: 'Dedicated contract logistics for regular shippers requiring predictable route allocations, dedicated vehicle bays, and volume rates.',
    capabilities: [
      'Scheduled recurring pickup rotations',
      'Dedicated logistics manager per commercial account',
      'Priority warehousing coordination in Hyderabad & Panaji',
      'Consolidated monthly billing with proof-of-delivery (POD)'
    ],
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <div className="services-header">
          <div className="services-header__left">
            <span className="section-eyebrow">Our Capabilities</span>
            <h2 className="services-title">Services tailored for precision freight.</h2>
          </div>
          <p className="services-header__description">
            Every shipment is executed with strict compliance, direct point-to-point transit, and meticulous cargo protection.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((service) => (
            <article key={service.number} className="service-card">
              <div className="service-card__top">
                <span className="service-card__number">{service.number}</span>
                <span className="service-card__line"></span>
              </div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__summary">{service.summary}</p>
              <ul className="service-card__list">
                {service.capabilities.map((cap, i) => (
                  <li key={i} className="service-card__list-item">
                    <span className="list-marker"></span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
