import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import TrafficMonitor from './components/TrafficMonitor'
import CarbonCalculator from './components/CarbonCalculator'
import SustainableTravel from './components/SustainableTravel'
import Awareness from './components/Awareness'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Dashboard />
        <TrafficMonitor />
        <CarbonCalculator />
        <SustainableTravel />
        <Awareness />
      </main>
      <Footer />
    </div>
  )
}
