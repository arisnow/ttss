'use client'

import { useState } from 'react'
import { CalendarCheck, Menu, X } from 'lucide-react'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Trucking The Seven Seas home">
        <span className="brand-mark">
          <img src="/ttss-logo-mark.png" alt="" />
        </span>
        <span>Trucking The Seven Seas</span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Primary navigation">
        <a href="#pay">Pay Breakdowns</a>
        <a href="/owner-operator">Owner Tool</a>
        <a href="#consulting">Consulting</a>
        <a href="#videos">Videos</a>
        <a href="#resources">Resources</a>
        <a className="nav-cta" href="#consulting">
          Book <CalendarCheck size={16} />
        </a>
      </nav>
    </header>
  )
}
