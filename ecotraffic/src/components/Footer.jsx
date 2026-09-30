import { Leaf } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="logo-icon"><Leaf size={18} /></span>
          <div>
            <strong>EcoTraffic</strong>
            <p>Smarter Travel. Cleaner Cities.</p>
          </div>
        </div>
        <p className="footer-note">
          A college sustainability prototype built with React, Vite, Recharts and Lucide.
          Demo Note: Traffic information in this prototype uses simulated data and is intended for educational demonstration.
        </p>
      </div>
    </footer>
  )
}
