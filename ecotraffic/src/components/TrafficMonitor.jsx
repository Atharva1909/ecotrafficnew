import { useMemo, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LabelList,
} from 'recharts'
import { Filter } from 'lucide-react'
import { roadTraffic, levelStyles, cities, levels, cityOverview } from '../data/trafficData'

export default function TrafficMonitor() {
  const [city, setCity] = useState('All Cities')
  const [level, setLevel] = useState('All Levels')

  const filtered = useMemo(
    () => roadTraffic.filter(r =>
      (city === 'All Cities' || r.city === city) &&
      (level === 'All Levels' || r.level === level)
    ),
    [city, level]
  )

  return (
    <section id="traffic" className="section section-alt">
      <div className="container">
        <div className="section-heading">
          <h2>Traffic Monitor</h2>
          <p>Live-style view of simulated congestion across major Indian cities.</p>
        </div>

        <div className="card">
          <div className="filters">
            <span className="filters-label"><Filter size={16} /> Filter by:</span>
            <select value={city} onChange={e => setCity(e.target.value)} aria-label="Filter by city">
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={level} onChange={e => setLevel(e.target.value)} aria-label="Filter by traffic level">
              {levels.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <span className="result-count">{filtered.length} road segment{filtered.length !== 1 ? 's' : ''} shown</span>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>City</th>
                  <th>Road / Area</th>
                  <th>Traffic Level</th>
                  <th>Average Speed</th>
                  <th>Estimated Delay</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(row => (
                  <tr key={row.id}>
                    <td>{row.city}</td>
                    <td>{row.road}</td>
                    <td>
                      <span className={`badge ${levelStyles[row.level].badge}`}>
                        <span className="dot" style={{ backgroundColor: levelStyles[row.level].dot }} />
                        {row.level}
                      </span>
                    </td>
                    <td>{row.avgSpeed} km/h</td>
                    <td>{row.delay} min</td>
                    <td className="status-cell">
                      <span className={`status-pill ${levelStyles[row.level].badge}`}>
                        {row.level === 'Low' ? 'Flowing' : row.level === 'Moderate' ? 'Steady' : row.level === 'High' ? 'Congested' : 'Heavy Jam'}
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan="6" className="empty-row">No road segments match the selected filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="note">Traffic data shown here is simulated for demonstration purposes.</p>
        </div>

        <div className="card chart-card">
          <h3 className="card-title">Average Speed by City (km/h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cityOverview} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="city" tick={{ fontSize: 13 }} />
              <YAxis tick={{ fontSize: 13 }} domain={[0, 60]} />
              <Tooltip formatter={(value) => [`${value} km/h`, 'Average Speed']} />
              <Bar dataKey="avgSpeed" fill="#16a34a" radius={[6, 6, 0, 0]} name="Average Speed">
                <LabelList dataKey="avgSpeed" position="top" formatter={(v) => `${v} km/h`} style={{ fontSize: 12, fill: '#334155' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}
