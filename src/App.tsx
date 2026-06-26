import { useMemo, useState } from 'react'
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ChevronRight,
  ClipboardList,
  FileSpreadsheet,
  Fuel,
  Gauge,
  Map,
  Menu,
  Play,
  Route,
  ShieldCheck,
  TrendingUp,
  Truck,
  WalletCards,
  X,
} from 'lucide-react'
import './App.css'

const payPaths = [
  {
    id: 'company',
    label: 'Company',
    gross: '$1,350',
    fuel: 'Covered',
    fixed: '$0',
    net: '$1,145',
    note: 'Best baseline for learning freight lanes and pay language.',
  },
  {
    id: 'lease',
    label: 'Lease',
    gross: '$4,850',
    fuel: '$1,420',
    fixed: '$1,210',
    net: '$1,390',
    note: 'Looks big up top, but deductions decide the week.',
  },
  {
    id: 'landstar',
    label: 'Landstar',
    gross: '$6,780',
    fuel: '$1,860',
    fixed: '$880',
    net: '$2,740',
    note: 'More control, more planning, and more deadhead discipline.',
  },
  {
    id: 'authority',
    label: 'Own Authority',
    gross: '$8,240',
    fuel: '$2,120',
    fixed: '$1,540',
    net: '$3,060',
    note: 'Spot-market upside with dispatch, compliance, and cash-flow risk.',
  },
] as const

const consultingOptions = [
  {
    title: '30-minute reality check',
    price: '$75',
    detail: 'Pressure-test a job offer, lease pitch, or pay plan before you move.',
  },
  {
    title: '60-minute deep dive',
    price: '$145',
    detail: 'Walk through your numbers, spreadsheet, deductions, and next steps.',
  },
  {
    title: 'Authority setup review',
    price: '$225',
    detail: 'Review startup costs, load-board assumptions, lanes, and risk points.',
  },
] as const

const resources = [
  'Pay spreadsheets',
  'Company vs lease checklist',
  'Owner-operator cost worksheet',
  'Questions to ask recruiters',
]

const videos = [
  'Final numbers at Knight',
  'Lease operator pay explained',
  'Landstar weekly breakdown',
]

function App() {
  const [activePath, setActivePath] = useState<(typeof payPaths)[number]['id']>(
    'landstar',
  )
  const [selectedConsult, setSelectedConsult] = useState<string>(
    consultingOptions[1].title,
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
            <Truck size={22} strokeWidth={2.2} />
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
                a working trucker who has run company, lease, Landstar, and authority
                lanes.
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
            <span>Decisions before contracts</span>
          </div>
        </section>

        <section className="section pay-section" id="pay">
          <div className="section-copy">
            <h2>Pay breakdowns without the recruiter math</h2>
            <p>
              Compare real weekly revenue, fuel, deductions, home time, and take-home
              context across company, lease, leased-on, and authority paths.
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
                  {path.label}
                </button>
              ))}
            </div>
            <div className="ledger-head">
              <div>
                <span>Selected path</span>
                <strong>{currentPayPath.label}</strong>
              </div>
              <TrendingUp size={28} />
            </div>
            <dl className="ledger">
              <div>
                <dt>Gross Revenue</dt>
                <dd>{currentPayPath.gross}</dd>
              </div>
              <div>
                <dt>Fuel</dt>
                <dd>{currentPayPath.fuel}</dd>
              </div>
              <div>
                <dt>Fixed Costs</dt>
                <dd>{currentPayPath.fixed}</dd>
              </div>
              <div className="net-row">
                <dt>Net Before Taxes</dt>
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
              Weekly-style pay recaps, spreadsheet context, carrier lessons, and the
              fine print most new drivers never get shown.
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
            {videos.map((video, index) => (
              <article className="video-tile" key={video}>
                <div className="thumbnail">
                  <Play size={24} fill="currentColor" />
                  <span>0{index + 1}</span>
                </div>
                <h3>{video}</h3>
                <p>Numbers, context, and practical takeaways from the road.</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section consulting-section" id="consulting">
          <div className="consulting-copy">
            <h2>Book a straight-answer trucking consultation</h2>
            <p>
              Get practical guidance on pay structures, lease decisions,
              owner-operator costs, spreadsheets, and next moves before you sign or
              scale.
            </p>
            <div className="consult-options" aria-label="Consultation options">
              {consultingOptions.map((option) => (
                <button
                  type="button"
                  key={option.title}
                  className={selectedConsult === option.title ? 'selected' : ''}
                  onClick={() => setSelectedConsult(option.title)}
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
                <span>Selected consult</span>
                <strong>{selectedConsult}</strong>
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
              Trucking stage
              <select name="stage" defaultValue="Lease decision">
                <option>New driver</option>
                <option>Company driver</option>
                <option>Lease decision</option>
                <option>Owner-operator</option>
                <option>Running authority</option>
              </select>
            </label>
            <label>
              What do you want help with?
              <textarea
                required
                name="message"
                placeholder="Tell me what decision, offer, or numbers you want to review."
              />
            </label>
            <button className="button primary full" type="submit">
              Request a Consultation <CalendarCheck size={18} />
            </button>
            {submitted && (
              <p className="success-message" role="status">
                <Check size={17} /> Request captured. Connect this form to a booking
                service before launch.
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
            <h2>Resources for the next decision</h2>
            <p>
              Practical worksheets and checklists built around the same question:
              what actually lands in the driver&apos;s pocket?
            </p>
          </div>
          <div className="resource-list">
            {resources.map((resource) => (
              <a href="#consulting" key={resource}>
                <span>{resource}</span>
                <ChevronRight size={18} />
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <h2>Ready to talk numbers?</h2>
          <p>Bring the offer, settlement, spreadsheet, or plan. Leave with clearer math.</p>
        </div>
        <a className="button primary" href="#consulting">
          Book a Consultation <ArrowRight size={18} />
        </a>
      </footer>
    </div>
  )
}

export default App
