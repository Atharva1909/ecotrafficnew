import { useState } from 'react'
import { Leaf, Menu, X } from 'lucide-react'

const links = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'traffic', label: 'Traffic' },
  { id: 'calculator', label: 'Calculator' },
  { id: 'sustainable', label: 'Sustainable Travel' },
  { id: 'awareness', label: 'Awareness' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <button className="logo" onClick={() => scrollTo('dashboard')}>
          <span className="logo-icon"><Leaf size={20} /></span>
          <span>EcoTraffic</span>
        </button>

        <nav className={`nav-links ${open ? 'nav-open' : ''}`}>
          {links.map(link => (
            <button key={link.id} className="nav-link" onClick={() => scrollTo(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>

        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}
