import { useMemo, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LabelList, Cell,
} from 'recharts'
import {
  Footprints, Bike, BusFront, Users, Award, Compass, Sprout,
} from 'lucide-react'
import { greenOptions, modeEmissions, travelModes } from '../data/trafficData'

const iconMap = { Footprints, Bike, BusFront, Users }

function scoreMessage(score) {
  if (score >= 80) return 'Great choice! You selected a highly sustainable travel option.'
  if (score >= 50) return 'Good choice. You can reduce emissions further by choosing public transport or cycling.'
  return 'Consider carpooling or public transport for your next trip.'
}

function recommend(dist) {
  if (dist <= 2) return { option: 'Walking or Cycling', reason: 'This is a short distance — walking or cycling produces zero direct emissions and is often just as fast in city traffic.' }
  if (dist <= 5) return { option: 'Cycling or Public Transport', reason: 'A moderate distance where cycling or a bus/metro trip keeps emissions very low per passenger.' }
  if (dist <= 15) return { option: 'Public Transport or Carpool', reason: 'For this distance, shared transport significantly cuts emissions and helps reduce road congestion.' }
  return { option: 'Public Transport or Carpool', reason: 'Long trips by private car have the highest impact — shared or public transport is the sustainable choice.' }
}

export default function SustainableTravel() {
  const [mode, setMode] = useState('')
  const [dist, setDist] = useState(6)

  const selectedMode = travelModes.find(m => m.value === mode)
  const score = selectedMode ? selectedMode.score : null
  const recommendation = useMemo(() => recommend(parseFloat(dist) || 0), [dist])

  return (
    <section id="sustainable" className="section section-alt">
      <div className="container">
        <div className="section-heading">
          <h2>Sustainable Travel</h2>
          <p>Choose a greener way — compare travel modes and see how your daily choice scores.</p>
        </div>

        <h3 className="sub-heading">Choose a Greener Way</h3>
        <div className="grid grid-4">
          {greenOptions.map(opt => {
            const Icon = iconMap[opt.icon]
            return (
              <div key={opt.title} className="card option-card">
                <span className="option-icon"><Icon size={26} /></span>
                <h4>{opt.title}</h4>
                <p>{opt.description}</p>
                <div className="option-meta">
                  <span className="option-benefit">🌿 {opt.benefit}</span>
                  <span className="option-distance">Best for: {opt.distance}</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="card chart-card">
          <h3 className="card-title">Travel Mode vs Estimated CO₂ per km (kg)</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={modeEmissions} margin={{ top: 20, right: 20, left: 0, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="mode" tick={{ fontSize: 12 }} angle={-20} textAnchor="end" interval={0} />
              <YAxis tick={{ fontSize: 13 }} />
              <Tooltip formatter={(value) => [`${value} kg CO₂/km`, 'Emissions']} />
              <Bar dataKey="co2" radius={[6, 6, 0, 0]} name="CO₂ per km">
                {modeEmissions.map((entry, i) => (
                  <Cell key={i} fill={entry.co2 === 0 ? '#16a34a' : entry.co2 < 0.1 ? '#65a30d' : '#f97316'} />
                ))}
                <LabelList dataKey="co2" position="top" formatter={(v) => v} style={{ fontSize: 12, fill: '#334155' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="note">Values are approximate per-passenger averages for educational comparison.</p>
        </div>

        <div className="grid grid-2">
          {/* Sustainability Score */}
          <div className="card">
            <h3 className="card-title"><Award size={18} /> How did you travel today?</h3>
            <div className="mode-buttons">
              {travelModes.map(m => (
                <button
                  key={m.value}
                  className={`mode-btn ${mode === m.value ? 'mode-btn-active' : ''}`}
                  onClick={() => setMode(m.value)}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {score !== null && (
              <div className="score-box">
                <div className="score-circle" style={{
                  background: `conic-gradient(${score >= 80 ? '#16a34a' : score >= 50 ? '#eab308' : '#ef4444'} ${score * 3.6}deg, #e2e8f0 0deg)`
                }}>
                  <div className="score-inner">
                    <span className="score-value">{score}</span>
                    <span className="score-total">/100</span>
                  </div>
                </div>
                <p className="score-label">Sustainability Score: {score}/100</p>
                <p className="score-message">{scoreMessage(score)}</p>
              </div>
            )}
            <p className="note">⚠️ This score is an educational awareness estimate, not a scientific measurement.</p>
          </div>

          {/* Distance Recommendation */}
          <div className="card">
            <h3 className="card-title"><Compass size={18} /> Trip Recommendation</h3>
            <label className="field">
              <span>How far are you travelling? (km)</span>
              <input type="number" min="0" step="0.5" value={dist} onChange={e => setDist(e.target.value)} />
            </label>

            <div className="recommend-box">
              <span className="recommend-tag"><Sprout size={14} /> Recommended Sustainable Option</span>
              <p className="recommend-option">{recommendation.option}</p>
              <p className="recommend-reason">{recommendation.reason}</p>
              <div className="recommend-scale">
                <span className={dist <= 2 ? 'scale-chip scale-active' : 'scale-chip'}>0–2 km</span>
                <span className={dist > 2 && dist <= 5 ? 'scale-chip scale-active' : 'scale-chip'}>2–5 km</span>
                <span className={dist > 5 && dist <= 15 ? 'scale-chip scale-active' : 'scale-chip'}>5–15 km</span>
                <span className={dist > 15 ? 'scale-chip scale-active' : 'scale-chip'}>15+ km</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
