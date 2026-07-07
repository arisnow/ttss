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
    <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between gap-5 border-b border-white/10 bg-[#07090b]/80 px-4 py-4 backdrop-blur-lg lg:px-18">
      <a
        className="inline-flex min-w-0 items-center gap-3 font-ttss-display text-[0.98rem] font-black tracking-[0.04em] text-white uppercase"
        href={brandHref}
        aria-label="Trucking The Seven Seas home"
      >
        <span className="grid size-11 place-items-center overflow-hidden border border-white/20 bg-[#050607]">
          <img className="block size-full object-cover" src="/ttss-logo-mark.png" alt="" />
        </span>
        <span className="max-[560px]:max-w-52 max-[560px]:truncate">Trucking The Seven Seas</span>
      </a>
      <button
        className="grid size-11 place-items-center border border-white/15 bg-white/6 text-white lg:hidden"
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav
        className={`${menuOpen ? 'grid' : 'hidden'} absolute top-[calc(100%+1px)] right-0 left-0 gap-4 bg-[#07090b]/98 p-4 font-ttss-body text-[0.78rem] font-black tracking-[0.08em] uppercase lg:static lg:flex lg:items-center lg:gap-5 lg:bg-transparent lg:p-0`}
        aria-label="Primary navigation"
      >
        <a className="flex min-h-11 items-center text-white/75 transition-colors hover:text-white" href={`${sectionPrefix}#pay`}>Pay Breakdowns</a>
        <a className="flex min-h-11 items-center text-white/75 transition-colors hover:text-white" href={`${sectionPrefix}#videos`}>Videos</a>
        <a className="flex min-h-11 items-center text-white/75 transition-colors hover:text-white" href="/owner-operator">Owner Tool</a>
        <a className="flex min-h-11 items-center text-white/75 transition-colors hover:text-white" href={`${sectionPrefix}#resources`}>Resources</a>
        <a
          className="inline-flex min-h-11 items-center gap-2 bg-ttss-orange px-4 text-[#111]"
          href={`${sectionPrefix}#consulting`}
        >
          Booking <CalendarCheck size={16} />
        </a>
      </nav>
    </header>
  )
}
