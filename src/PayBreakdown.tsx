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

export function PayBreakdown() {
  const [activePath, setActivePath] = useState<(typeof payPaths)[number]['id']>('landstar')
  const currentPayPath = useMemo(
    () => payPaths.find((path) => path.id === activePath) ?? payPaths[0],
    [activePath],
  )

  return (
    <section className="section pay-section" id="pay">
      <div className="section-copy">
        <h2>Pay breakdowns without the recruiter math</h2>
        <p>
          Compare real weekly revenue, fuel, deductions, home time, and take-home
          context across company, lease operator, owner operator leased on and owner
          operator with authority.
        </p>
        <a className="text-link" href="#resources">
          Open the spreadsheets <ChevronRight size={17} />
        </a>
      </div>
      <div className="ledger-panel">
        <div className="path-tabs" role="tablist" aria-label="Trucking path">
          {payPaths.map((path) => (
            <button
              key={path.id}
              type="button"
              className={path.id === activePath ? 'active' : ''}
              onClick={() => setActivePath(path.id)}
            >
              {path.shortLabel}
            </button>
          ))}
        </div>
        <div className="ledger-head">
          <div>
            <span>Selected path</span>
            <strong>
              {currentPayPath.label} <em>{currentPayPath.weeks}</em>
            </strong>
          </div>
          <TrendingUp size={28} />
        </div>
        <dl className="ledger">
          <div>
            <dt>Gross Revenue</dt>
            <dd>{currentPayPath.gross}</dd>
          </div>
          <div>
            <dt>Expenses (not fuel)</dt>
            <dd>{currentPayPath.expenses}</dd>
          </div>
          <div>
            <dt>Profit Per Mile</dt>
            <dd>{currentPayPath.profitPerMile}</dd>
          </div>
          <div className="net-row">
            <dt>Net</dt>
            <dd>{currentPayPath.net}</dd>
          </div>
          <div className="note-row">
            <dt>Notes from the road</dt>
            <dd>{currentPayPath.note}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
