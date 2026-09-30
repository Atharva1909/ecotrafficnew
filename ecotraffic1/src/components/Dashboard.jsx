import { Car, Gauge, Cloud, Star, Lightbulb } from 'lucide-react'
import { cityOverview, levelStyles, tips } from '../data/trafficData'

// Pick a rotating "tip of the day" based on the date
const tip = tips[new Date().getDate() % tips.length]

const summaryCards = [
  { icon: Car, label: 'Current Traffic Level', value: 'High', sub: 'across monitored cities', color: '#f97316' },
  { icon: Gauge, label: 'Average Travel Speed', value: '24 km/h', sub: 'weighted by road segment', color: '#2563eb' },
  { icon: Cloud, label: 'Estimated CO₂ Emissions', value: '~4.6 t', sub: 'from monitored roads today', color: '#64748b' },
  { icon: Star, label: 'Sustainable Travel Score', value: '68/100', sub: 'city-wide travel behaviour index', color: '#16a34a' },
]

export default function Dashboard() {
  return (
    <section id="dashboard" className="section">
      <div className="container">
        <div className="hero card">
          <div>
            <span className="hero-eyebrow">Sustainability Challenge: Urban Traffic &amp; Pollution</span>
            <h1>Make Every Journey More Sustainable</h1>
            <p className="hero-text">
              EcoTraffic helps you understand traffic congestion in your city, estimate the
              environmental impact of your travel, and discover cleaner ways to move around —
              one journey at a time.
            </p>
          </div>
          <div className="hero-badge">
            <span className="hero-badge-icon">🌱</span>
            <div>
              <strong>Smarter Travel.</strong>
              <br />Cleaner Cities.
            </div>
          </div>
        </div>

        <div className="grid grid-4 summary-grid">
          {summaryCards.map(card => (
            <div key={card.label} className="card stat-card">
              <div className="stat-icon" style={{ backgroundColor: card.color + '1a', color: card.color }}>
                <card.icon size={22} />
              </div>
              <p className="stat-label">{card.label}</p>
              <p className="stat-value">{card.value}</p>
              <p className="stat-sub">{card.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-2">
          <div className="card">
            <h3 className="card-title">Traffic Overview — Monitored Cities</h3>
            <div className="city-list">
              {cityOverview.map(c => (
                <div key={c.city} className="city-row">
                  <span className="city-name">{c.city}</span>
                  <div className="city-traffic">
                    <div className="traffic-bar-bg">
                      <div
                        className="traffic-bar-fill"
                        style={{ width: `${100 - c.avgSpeed}%`, backgroundColor: c.color }}
                      />
                    </div>
                    <span className={`badge ${levelStyles[c.level].badge}`}>
                      <span className="dot" style={{ backgroundColor: levelStyles[c.level].dot }} />
                      {c.level} · {c.avgSpeed} km/h
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="note">Demo Note: Traffic information in this prototype uses simulated data and is intended for educational demonstration.</p>
          </div>

          <div className="card tip-card">
            <div className="tip-header">
              <span className="stat-icon tip-icon"><Lightbulb size={22} /></span>
              <h3 className="card-title">Today's Sustainability Tip</h3>
            </div>
            <p className="tip-text">“{tip}”</p>
            <div className="tip-footer">
              <span>Small change, big impact.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
