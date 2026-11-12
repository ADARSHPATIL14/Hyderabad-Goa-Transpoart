import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RouteCoverage.css';

gsap.registerPlugin(ScrollTrigger);

interface Waypoint {
  city: string;
  state: string;
  hubType: string;
  detail: string;
}

const ROUTE_WAYPOINTS: Waypoint[] = [
  {
    city: 'Hyderabad',
    state: 'Telangana',
    hubType: 'Origin & Primary Consolidation',
    detail: 'Shamshabad & Gaganpahad terminal, Autonagar, Kukatpally & Patancheru industrial clusters',
  },
  {
    city: 'Raichur',
    state: 'Karnataka',
    hubType: 'Intermediate Transit Checkpoint',
    detail: 'Thermal & agricultural commercial belt line-haul station',
  },
  {
    city: 'Hubballi',
    state: 'Karnataka',
    hubType: 'Central Logistics Gateway',
    detail: 'Commercial cross-corridor junction with continuous telemetry',
  },
  {
    city: 'Belagavi',
    state: 'Karnataka',
    hubType: 'Western Corridor Hub',
    detail: 'Precision vehicle check & Ghat route entry clearance',
  },
  {
    city: 'Goa',
    state: 'Goa State',
    hubType: 'Terminal Delivery & Coastal Ports',
    detail: 'Direct distribution across Panaji, Vasco da Gama, Madgaon & Verna',
  },
];

export const RouteCoverage: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      });

      tl.from('.route-header > *', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
      })
      .from('.corridor-node', {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
      }, '-=0.3');
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="coverage" className="section route-section" ref={sectionRef}>
      <div className="container">
        <div className="route-header">
          <span className="section-eyebrow">Corridor Architecture</span>
          <h2 className="route-title">Direct inter-state route fidelity.</h2>
          <p className="route-subtitle">
            An uninterrupted 720 km arterial line engineered to provide dependable freight transitions between Telangana, North Karnataka, and coastal Goa.
          </p>
        </div>

        {/* Timeline Sequence */}
        <div className="corridor-track">
          {ROUTE_WAYPOINTS.map((point, index) => (
            <div key={point.city} className="corridor-node">
              <div className="corridor-node__marker-wrap">
                <div className={`corridor-node__dot ${index === 0 || index === ROUTE_WAYPOINTS.length - 1 ? 'is-terminal' : ''}`}>
                  <span className="inner-pulse"></span>
                </div>
                {index < ROUTE_WAYPOINTS.length - 1 && (
                  <div className="corridor-node__connector"></div>
                )}
              </div>
              <div className="corridor-node__info">
                <span className="corridor-node__state">{point.state}</span>
                <h4 className="corridor-node__city">{point.city}</h4>
                <span className="corridor-node__type">{point.hubType}</span>
                <p className="corridor-node__detail">{point.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
