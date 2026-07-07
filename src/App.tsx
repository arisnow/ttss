import {
  ArrowRight,
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

const resourceGroups = [
  {
    title: 'Spreadsheets and templates',
    links: [
      {
        label: 'Startup Costs / Authority P/L Spreadsheet',
        href: 'https://docs.google.com/spreadsheets/d/1OM_01BVB9uGBCQtLklKFDjiGXB7sj6vvC-cWnuRusOc/edit?gid=1522467381#gid=1522467381',
      },
      {
        label: 'Landstar Profit / Loss Spreadsheet',
        href: 'https://docs.google.com/spreadsheets/d/1GRc2Propb95tHqjA5SQY7fg16c67PXQ4Or0mBidh1cU/edit#gid=399595632',
      },
      {
        label: 'Lease Profit / Loss Spreadsheet',
        href: 'https://docs.google.com/spreadsheets/d/19wKorxQCaQWMsK7rjDo1e_xHzXbFUuPUlpm7HWDv20E/edit?usp=sharing',
      },
      {
        label: 'Blank Template Lease P/L',
        href: 'https://docs.google.com/spreadsheets/d/1LbaqMPAmAQIDBrn4zHO3r5iUM-uPX7OfQ5btDEBgVSc/edit?usp=sharing',
      },
      {
        label: 'Lease Analysis Spreadsheet',
        href: 'https://docs.google.com/spreadsheets/d/1SzT0-iBJLLuJ5yDN0q5mGSkH2jEn_KUk4e_8Wt8aytM/edit?usp=sharing',
      },
      {
        label: 'Company Pay Spreadsheet',
        href: 'https://docs.google.com/spreadsheets/d/1wGEHZkK7Y0jglo9Wy-lk8_KGth-wdDAONiXbmh5H6J8/edit?usp=sharing',
      },
      {
        label: 'Blank Company Driver Spreadsheet',
        href: 'https://docs.google.com/spreadsheets/d/1rMlfUJn0zlyCrWnVN81fx_jlydY-1NwDids2YOVHTFk/edit#gid=838522823',
      },
      {
        label: 'Maintenance Cover Word Doc',
        href: 'https://docs.google.com/document/d/1jyN5kXH7QgomSmvE3fQZGRpmbq4Vkz0owyp0KeKb58s/edit',
      },
    ],
  },
  {
    title: 'Channel links',
    links: [
      {
        label: 'Support Tim on Buy Me a Coffee',
        href: 'https://buymeacoffee.com/truckingthesevenseas',
      },
      {
        label: 'Windshield Thoughts',
        href: 'https://www.youtube.com/channel/UC6ByG4ZeXiS7xaWhqP4B_AQ',
      },
      {
        label: 'This Week in Trucking',
        href: 'https://www.youtube.com/@thisweekintrucking',
      },
      {
        label: 'OTR Solutions Factoring Link',
        href: 'https://otrsolutions.com/referrals-inquiry-page/?tfa_37=001PZ00000PlklrYAB',
      },
    ],
  },
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
            {resourceGroups.map((group) => (
              <div className="resource-group" key={group.title}>
                <h3>{group.title}</h3>
                {group.links.map((link) => (
                  <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                    <span>{link.label}</span>
                    <ExternalLink size={18} />
                  </a>
                ))}
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
