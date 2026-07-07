'use client'

import { useState } from 'react'
import { CalendarCheck, Menu, X } from 'lucide-react'

type SiteHeaderProps = {
  brandHref?: string
  sectionPrefix?: string
}

export function SiteHeader({ brandHref = '#top', sectionPrefix = '' }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="topbar">
      <a className="brand" href={brandHref} aria-label="Trucking The Seven Seas home">
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
        <a href={`${sectionPrefix}#pay`}>Pay Breakdowns</a>
        <a href="/owner-operator">Owner Tool</a>
        <a href={`${sectionPrefix}#consulting`}>Consulting</a>
        <a href={`${sectionPrefix}#videos`}>Videos</a>
        <a href={`${sectionPrefix}#resources`}>Resources</a>
        <a className="nav-cta" href={`${sectionPrefix}#consulting`}>
          Book <CalendarCheck size={16} />
        </a>
      </nav>
    </header>
  )
}
