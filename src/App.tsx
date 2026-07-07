import {
  ArrowRight,
  Check,
  ClipboardList,
  ExternalLink,
  FileSpreadsheet,
  Fuel,
  Gauge,
  Map,
  Play,
  Route,
  ShieldCheck,
} from 'lucide-react'
import { ConsultationSection } from './ConsultationForm'
import { PayBreakdown } from './PayBreakdown'
import { SiteHeader } from './SiteHeader'

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
  return (
    <div className="site-shell">
      <SiteHeader />

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

        <PayBreakdown />

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

        <ConsultationSection />

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
              real settlement data, public spreadsheets, and long-form video breakdowns
              instead of vague averages or sales language.
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
