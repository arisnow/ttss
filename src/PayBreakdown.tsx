'use client'

import { useMemo, useState } from 'react'
import { ChevronRight, TrendingUp } from 'lucide-react'

const payPaths = [
  {
    id: 'company',
    label: 'Company Driver',
    shortLabel: 'Company',
    weeks: '34 Weeks',
    gross: 'NA',
    expenses: 'NA',
    profitPerMile: '$0.54',
    net: '$61,616.67',
    note: 'Best baseline for learning freight lanes and pay language.',
  },
  {
    id: 'lease',
    label: 'Lease Operator',
    shortLabel: 'Lease',
    weeks: '20 Weeks',
    gross: '$78,844.86',
    expenses: '$47,374.84',
    profitPerMile: '$0.72',
    net: '$31,470.02',
    note: 'Looks big up top, but deductions decide the week.',
  },
  {
    id: 'landstar',
    label: 'O/O Leased On',
    shortLabel: 'O/O Leased On',
    weeks: '37 Weeks',
    gross: '$135,734.79',
    expenses: '$64,972.68',
    profitPerMile: '$0.90',
    net: '$70,762.11',
    note: 'More control, more planning, and more deadhead discipline.',
  },
  {
    id: 'authority',
    label: 'O/O W/ Authority',
    shortLabel: 'Authority',
    weeks: '52 Weeks',
    gross: '$207,080.49',
    expenses: '$129,657.73',
    profitPerMile: '$0.71',
    net: '$77,422.76',
    note: 'Spot-market upside with dispatch, compliance, and cash-flow risk.',
  },
] as const

const sectionClass =
  'relative mx-auto grid w-[min(1320px,calc(100%_-_2rem))] grid-cols-[minmax(31rem,0.9fr)_minmax(35rem,1.1fr)] items-center gap-[clamp(2rem,3.5vw,3.5rem)] py-[clamp(4rem,8vw,7rem)] max-[1280px]:grid-cols-1 max-[900px]:grid-cols-1'
const kickerLinkClass =
  'inline-flex w-fit items-center gap-1 font-ttss-body text-[0.84rem] font-black tracking-[0.07em] text-ttss-orange uppercase'
const ledgerPanelClass =
  'min-w-0 border border-white/15 bg-gradient-to-b from-white/8 to-white/4 p-[clamp(1rem,3vw,1.35rem)] shadow-ttss'
const ledgerTermClass =
  'font-ttss-body text-[0.8rem] font-extrabold tracking-[0.06em] text-white/65 uppercase'
const ledgerValueClass =
  'text-right font-ttss-display text-[clamp(1.12rem,1.8vw,1.35rem)] font-black break-words text-white'

export function PayBreakdown() {
  const [activePath, setActivePath] = useState<(typeof payPaths)[number]['id']>('landstar')
  const currentPayPath = useMemo(
    () => payPaths.find((path) => path.id === activePath) ?? payPaths[0],
    [activePath],
  )

  return (
    <section className={sectionClass} id="pay">
      <div className="grid gap-5">
        <h2 className="max-w-[13.5ch] font-ttss-display text-[clamp(2.8rem,4.15vw,4.45rem)] leading-[0.95] font-black text-ttss-heading uppercase">
          Pay breakdowns without the recruiter math
        </h2>
        <p className="text-[1.02rem] leading-[1.65] text-[#eaeeef]/72">
          Compare real weekly revenue, fuel, deductions, home time, and take-home
          context across company, lease operator, owner operator leased on and owner
          operator with authority.
        </p>
        <a className={kickerLinkClass} href="#resources">
          Open the spreadsheets <ChevronRight size={17} />
        </a>
      </div>
      <div className={ledgerPanelClass}>
        <div className="mb-4 grid grid-cols-4 gap-2 max-[900px]:grid-cols-1" role="tablist" aria-label="Trucking path">
          {payPaths.map((path) => (
            <button
              key={path.id}
              type="button"
              className={`min-h-10 min-w-0 border px-2 font-ttss-body text-[clamp(0.62rem,0.82vw,0.72rem)] font-black tracking-[0.05em] uppercase break-words transition-transform hover:-translate-y-px ${
                path.id === activePath
                  ? 'border-ttss-orange bg-ttss-orange text-[#111]'
                  : 'border-white/10 bg-white/5 text-white/70'
              }`}
              onClick={() => setActivePath(path.id)}
            >
              {path.shortLabel}
            </button>
          ))}
        </div>
        <div className="flex justify-between gap-4 bg-[#11171d] p-4 text-ttss-orange">
          <div className="grid min-w-0 gap-1">
            <span className="font-ttss-body text-[0.72rem] font-extrabold tracking-[0.08em] text-white/55 uppercase">
              Selected path
            </span>
            <strong className="font-ttss-display text-[1.05rem] text-white">
              {currentPayPath.label}{' '}
              <em className="mt-1 block not-italic text-ttss-orange">{currentPayPath.weeks}</em>
            </strong>
          </div>
          <TrendingUp size={28} />
        </div>
        <dl className="m-0 grid">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-t border-white/10 p-4 max-[560px]:grid-cols-1">
            <dt className={ledgerTermClass}>Gross Revenue</dt>
            <dd className={ledgerValueClass}>{currentPayPath.gross}</dd>
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-t border-white/10 p-4 max-[560px]:grid-cols-1">
            <dt className={ledgerTermClass}>Expenses (not fuel)</dt>
            <dd className={ledgerValueClass}>{currentPayPath.expenses}</dd>
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-t border-white/10 p-4 max-[560px]:grid-cols-1">
            <dt className={ledgerTermClass}>Profit Per Mile</dt>
            <dd className={ledgerValueClass}>{currentPayPath.profitPerMile}</dd>
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-t border-white/10 p-4 max-[560px]:grid-cols-1">
            <dt className={ledgerTermClass}>Net</dt>
            <dd className="text-right font-ttss-display text-[clamp(1.35rem,2.4vw,1.75rem)] font-black break-words text-ttss-orange">
              {currentPayPath.net}
            </dd>
          </div>
          <div className="grid gap-4 border-t border-white/10 p-4">
            <dt className={ledgerTermClass}>Notes from the road</dt>
            <dd className="m-0 text-left text-base leading-[1.55] font-medium text-white/78">
              {currentPayPath.note}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
