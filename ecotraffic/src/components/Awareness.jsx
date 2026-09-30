import { CloudOff, CarFront, Zap, ArrowDown } from 'lucide-react'

const cards = [
  {
    icon: CloudOff,
    title: 'Reduce Emissions',
    text: 'Less fuel consumption can reduce transportation-related emissions, improving urban air quality.',
  },
  {
    icon: CarFront,
    title: 'Reduce Congestion',
    text: 'Shared and public transportation can reduce the number of vehicles on roads, cutting travel time for everyone.',
  },
  {
    icon: Zap,
    title: 'Save Energy',
    text: 'Walking, cycling and public transport can reduce dependence on private vehicles and fossil fuels.',
  },
]

const problemFlow = ['Traffic Congestion', 'Longer Travel Time', 'More Fuel Consumption', 'Higher CO₂ Emissions', 'Environmental Impact']
const solutionFlow = ['Sustainable Travel', 'Fewer Private Vehicles', 'Lower Fuel Consumption', 'Lower Emissions']

function Flow({ steps, variant }) {
  return (
    <div className={`flow flow-${variant}`}>
      {steps.map((step, i) => (
        <div key={step} className="flow-step-wrap">
          <div className="flow-step">{step}</div>
          {i < steps.length - 1 && <ArrowDown size={18} className="flow-arrow" />}
        </div>
      ))}
    </div>
  )
}

export default function Awareness() {
  return (
    <section id="awareness" className="section">
      <div className="container">
        <div className="section-heading">
          <h2>Why Sustainable Transportation Matters</h2>
          <p>Understanding the chain from congestion to pollution — and how we can break it.</p>
        </div>

        <div className="grid grid-3">
          {cards.map(c => (
            <div key={c.title} className="card awareness-card">
              <span className="awareness-icon"><c.icon size={26} /></span>
              <h4>{c.title}</h4>
              <p>{c.text}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-2 flow-grid">
          <div className="card flow-card">
            <h3 className="card-title">The Problem Chain</h3>
            <Flow steps={problemFlow} variant="problem" />
          </div>
          <div className="card flow-card flow-card-solution">
            <h3 className="card-title">The Solution Chain</h3>
            <Flow steps={solutionFlow} variant="solution" />
          </div>
        </div>
      </div>
    </section>
  )
}
