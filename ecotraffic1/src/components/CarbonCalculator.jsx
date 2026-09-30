import { useMemo, useState } from 'react'
import { Calculator, Leaf, TrendingDown } from 'lucide-react'
import { vehicleTypes, EMISSION_FACTORS, comparisonOptions } from '../data/trafficData'

export default function CarbonCalculator() {
  const [vehicle, setVehicle] = useState(vehicleTypes[0].value)
  const [distance, setDistance] = useState(20)
  const [efficiency, setEfficiency] = useState(15)

  const selected = vehicleTypes.find(v => v.value === vehicle)

  // Update default efficiency when vehicle type changes
  const handleVehicleChange = (value) => {
    setVehicle(value)
    const v = vehicleTypes.find(x => x.value === value)
    setEfficiency(v.defaultEfficiency)
  }

  const result = useMemo(() => {
    const dist = parseFloat(distance) || 0
    const eff = parseFloat(efficiency) || 0
    if (dist <= 0 || eff <= 0) return null

    // For buses, efficiency is per vehicle; divide by passenger share
    const effectiveEfficiency = selected.passengerShare ? eff * selected.passengerShare : eff
    const fuelUsed = dist / effectiveEfficiency
    const co2 = fuelUsed * EMISSION_FACTORS[selected.fuel]
    const co2PerKm = co2 / dist

    return {
      fuelUsed: fuelUsed.toFixed(2),
      co2: co2.toFixed(2),
      co2PerKm: co2PerKm.toFixed(3),
    }
  }, [distance, efficiency, selected])

  return (
    <section id="calculator" className="section">
      <div className="container">
        <div className="section-heading">
          <h2>Carbon / Emission Calculator</h2>
          <p>Estimate the CO₂ impact of any trip and compare it with greener alternatives.</p>
        </div>

        <div className="grid grid-2 calc-grid">
          <div className="card">
            <h3 className="card-title"><Calculator size={18} /> Trip Details</h3>

            <label className="field">
              <span>Vehicle Type</span>
              <select value={vehicle} onChange={e => handleVehicleChange(e.target.value)}>
                {vehicleTypes.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
              </select>
            </label>

            <label className="field">
              <span>Distance Travelled (km)</span>
              <input
                type="number" min="0" step="0.5"
                value={distance}
                onChange={e => setDistance(e.target.value)}
              />
            </label>

            <label className="field">
              <span>Fuel Efficiency (km / litre)</span>
              <input
                type="number" min="0" step="0.5"
                value={efficiency}
                onChange={e => setEfficiency(e.target.value)}
              />
            </label>

            <p className="note">
              Emission factors used: Petrol = 2.31 kg CO₂/L, Diesel = 2.68 kg CO₂/L (approximate values).
            </p>
          </div>

          <div className="card result-card">
            <h3 className="card-title"><Leaf size={18} /> Your Trip Impact</h3>
            {result ? (
              <>
                <div className="result-main">
                  <span className="result-number">{result.co2}</span>
                  <span className="result-unit">kg CO₂</span>
                </div>
                <p className="result-sub">estimated emissions for this trip</p>
                <div className="result-rows">
                  <div className="result-row">
                    <span>Fuel Used</span>
                    <strong>{result.fuelUsed} L ({selected.fuel})</strong>
                  </div>
                  <div className="result-row">
                    <span>CO₂ per km</span>
                    <strong>{result.co2PerKm} kg/km</strong>
                  </div>
                  <div className="result-row">
                    <span>Vehicle</span>
                    <strong>{selected.label}</strong>
                  </div>
                </div>
              </>
            ) : (
              <p className="result-empty">Enter a valid distance and fuel efficiency to see your estimated emissions.</p>
            )}
          </div>
        </div>

        {result && (
          <div className="card">
            <h3 className="card-title"><TrendingDown size={18} /> Try a Sustainable Option</h3>
            <div className="grid grid-4 compare-grid">
              {comparisonOptions.map(opt => {
                const current = parseFloat(result.co2)
                const alt = opt.co2PerKm * (parseFloat(distance) || 0)
                const reduction = current > 0 ? Math.max(0, Math.round(((current - alt) / current) * 100)) : 0
                return (
                  <div key={opt.name} className="compare-card">
                    <p className="compare-name">{opt.name}</p>
                    <p className="compare-co2">{alt.toFixed(2)} kg CO₂</p>
                    <p className="compare-reduction">
                      {reduction >= 100 ? '🌟 100% cleaner' : `↓ ${reduction}% emissions`}
                    </p>
                    <p className="compare-note">{opt.note}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
