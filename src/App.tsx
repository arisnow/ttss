'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ChevronRight,
  ClipboardList,
  ExternalLink,
  FileSpreadsheet,
  Fuel,
  Gauge,
  Map,
  Menu,
  Play,
  Route,
  ShieldCheck,
  TrendingUp,
  WalletCards,
  X,
} from 'lucide-react'

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

const responseOptions = [
  {
    title: 'Flat-rate video response',
    price: '$100',
    detail: 'Send a focused list of questions and get a direct video answer from Tim.',
  },
  {
    title: 'Private video',
    price: '1:1',
    detail: 'A private response between you and Tim when the topic should stay off-channel.',
  },
  {
    title: 'Anonymous livestream',
    price: 'Recommended',
    detail: 'Tim keeps you anonymous while the audience can surface useful questions.',
  },
] as const

const videos = [
  {
    number: '01',
    title: 'Final Numbers as Knight Transportation Company Driver',
    youtubeId: 'hPpP9oHtZzw',
    sheet:
      'https://docs.google.com/spreadsheets/d/1wGEHZkK7Y0jglo9Wy-lk8_KGth-wdDAONiXbmh5H6J8/edit?gid=1089462003#gid=1089462003',
    status: '',
  },
  {
    number: '02',
    title: 'Final Numbers as Knight Transportation Lease Operator',
    youtubeId: 'IjSNa1VVAxY',
    sheet:
      'https://docs.google.com/spreadsheets/d/19wKorxQCaQWMsK7rjDo1e_xHzXbFUuPUlpm7HWDv20E/edit?gid=196419355#gid=196419355',
    status: '',
  },
  {
    number: '03',
    title: 'Final Numbers as O/O Leased Onto Landstar',
    youtubeId: 'iOqV2zeAv0Q',
    sheet:
      'https://docs.google.com/spreadsheets/d/1GRc2Propb95tHqjA5SQY7fg16c67PXQ4Or0mBidh1cU/edit?gid=1522467381#gid=1522467381',
    status: '',
  },
  {
    number: '04',
    title: 'Final Numbers Running the Spot Market as O/O with Authority',
    youtubeId: 'jT1PVQRJv4Q',
    sheet:
      'https://docs.google.com/spreadsheets/d/1OM_01BVB9uGBCQtLklKFDjiGXB7sj6vvC-cWnuRusOc/edit?gid=1522467381#gid=1522467381',
    status: '',
  },
  {
    number: '05',
    title: 'Numbers Running Amazon Relay Owner Operator Power Only',
    youtubeId: 'Hbj8ZDJ2898',
    sheet:
      'https://docs.google.com/spreadsheets/d/1OM_01BVB9uGBCQtLklKFDjiGXB7sj6vvC-cWnuRusOc/edit?gid=1045399100#gid=1045399100',
    status: 'Ongoing',
  },
] as const

const synopsisPoints = [
  'Transparent trucking pay from company driver through lease operator, leased-on owner operator, authority, and Amazon Relay power-only work.',
  'Final-number videos paired with public spreadsheets so viewers can see revenue, expenses, net, and context instead of relying on recruiter math.',
  'Practical road commentary about deductions, freight choices, deadhead, home time, and the tradeoffs behind each business model.',
] as const

function App() {
  const [activePath, setActivePath] = useState<(typeof payPaths)[number]['id']>(
    'landstar',
  )
  const [selectedResponse, setSelectedResponse] = useState<string>(
    responseOptions[0].title,
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const currentPayPath = useMemo(
    () => payPaths.find((path) => path.id === activePath) ?? payPaths[0],
    [activePath],
  )

  return (
    <div className="site-shell">
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

      <main id="top">
        <section className="hero-section">
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="hero-content">
            <div className="hero-copy">
              <h1>See what trucking really pays</h1>
              <p>
                Real weekly numbers, road-tested advice, and one-on-one guidance from
                a working trucker who has run company, lease operator, owner operator
                leased on and owner operator with authority.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#consulting">
                  Book a Consultation <ArrowRight size={18} />
                </a>
                <a className="button secondary" href="#videos">
                  <Play size={18} /> Watch Pay Breakdowns
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Site focus">
          <div>
            <Gauge size={22} />
            <span>Revenue is not take-home</span>
          </div>
          <div>
            <Fuel size={22} />
            <span>Fuel and fixed costs matter</span>
          </div>
          <div>
            <ShieldCheck size={22} />
            <span>Know the numbers before you move</span>
          </div>
        </section>

        <section className="section pay-section" id="pay">
          <div className="section-copy">
            <h2>Pay breakdowns without the recruiter math</h2>
            <p>
              Compare real weekly revenue, fuel, deductions, home time, and take-home
              context across company, lease operator, owner operator leased on and
              owner operator with authority.
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

        <section className="section media-section" id="videos">
          <div className="channel-card">
            <Play size={34} fill="currentColor" />
            <h2>Latest from the channel</h2>
            <p>
              Final numbers videos paired with the spreadsheets behind each position,
              plus the current Amazon Relay power-only series as it develops.
            </p>
            <a
              className="button secondary"
              href="https://www.youtube.com/@truckingthesevenseas"
              target="_blank"
              rel="noreferrer"
            >
              Visit YouTube <ArrowRight size={17} />
            </a>
          </div>
          <div className="video-rail" aria-label="Featured video topics">
            {videos.map((video) => (
              <article className="video-tile" key={video.youtubeId}>
                <div className="video-frame">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <span className="video-number">
                  {video.number}
                  {video.status ? <small>{video.status}</small> : null}
                </span>
                <h3>{video.title}</h3>
                <a
                  className="spreadsheet-link"
                  href={video.sheet}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open spreadsheet <ExternalLink size={15} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section consulting-section" id="consulting">
          <div className="consulting-copy">
            <h2>Book a straight-answer video response</h2>
            <p>
              Get practical guidance on pay structures, lease decisions,
              owner-operator costs, spreadsheets, and next moves before you sign or
              scale.
            </p>
            <p>
              Send Tim a focused list of up to 10 questions. He will answer them in a
              video response that can stay private between you and him, or become an
              anonymous livestream where the audience can add useful questions and
              point out concerns that may otherwise be missed.
            </p>
            <div className="consult-options" aria-label="Consultation options">
              {responseOptions.map((option) => (
                <button
                  type="button"
                  key={option.title}
                  className={selectedResponse === option.title ? 'selected' : ''}
                  onClick={() => setSelectedResponse(option.title)}
                >
                  <span>
                    <strong>{option.title}</strong>
                    <small>{option.detail}</small>
                  </span>
                  <b>{option.price}</b>
                </button>
              ))}
            </div>
          </div>

          <form
            className="booking-form"
            onSubmit={(event) => {
              event.preventDefault()
              setSubmitted(true)
            }}
          >
            <div className="form-head">
              <WalletCards size={25} />
              <div>
                <span>Selected response</span>
                <strong>{selectedResponse}</strong>
              </div>
            </div>
            <label>
              Name
              <input required name="name" placeholder="Your name" />
            </label>
            <label>
              Email
              <input required name="email" type="email" placeholder="you@example.com" />
            </label>
            <label>
              Response format
              <select name="format" defaultValue="Private video">
                <option>Private video</option>
                <option>Anonymous livestream</option>
                <option>Not sure yet</option>
              </select>
            </label>
            <label>
              Your questions
              <textarea
                required
                maxLength={1600}
                name="questions"
                placeholder="Send up to 10 focused questions. Include the decision, offer, spreadsheet, or numbers you want Tim to respond to."
              />
            </label>
            <button className="button primary full" type="submit">
              Request a Video Response <CalendarCheck size={18} />
            </button>
            <p className="form-note">
              Flat rate: $100. No live video calls or authority setup reviews at this
              time.
            </p>
            {submitted && (
              <p className="success-message" role="status">
                <Check size={17} /> Request captured. Connect this form to a payment
                and intake backend before launch.
              </p>
            )}
          </form>
        </section>

        <section className="section story-section">
          <div className="story-image" aria-hidden="true">
            <Route size={42} />
          </div>
          <div className="story-copy">
            <h2>Built from miles, spreadsheets, and hard lessons</h2>
            <p>
              From company driver to lease operator, Landstar owner-operator, and
              running authority, the channel documents the numbers behind each step.
            </p>
            <ul>
              <li>
                <Map size={20} /> Lanes, deadhead, and planning tradeoffs
              </li>
              <li>
                <ClipboardList size={20} /> Pay-plan questions before you sign
              </li>
              <li>
                <FileSpreadsheet size={20} /> Spreadsheet-first decision making
              </li>
            </ul>
          </div>
        </section>

        <section className="resources-section" id="resources">
          <div>
            <h2>What the channel is really about</h2>
            <p>
              Trucking The Seven Seas documents trucking pay from the inside, using
              real settlement data, public spreadsheets, and long-form video
              breakdowns instead of vague averages or sales language.
            </p>
            <p>
              The channel follows Tim&apos;s path through company driving, lease
              operating, leased-on owner-operator work, running authority, and current
              Amazon Relay power-only numbers so drivers can compare the tradeoffs
              before making their own move.
            </p>
          </div>
          <div className="resource-list">
            {synopsisPoints.map((point) => (
              <div className="synopsis-row" key={point}>
                <Check size={18} />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <a className="footer-brand" href="#top" aria-label="Trucking The Seven Seas home">
            <img src="/ttss-logo-mark.png" alt="" />
            <span>Trucking The Seven Seas</span>
          </a>
          <h2>Ready to talk numbers?</h2>
          <p>Send a focused question list and get a straight-answer video response.</p>
        </div>
        <a className="button primary" href="#consulting">
          Request a Video Response <ArrowRight size={18} />
        </a>
      </footer>
    </div>
  )
}

export default App
