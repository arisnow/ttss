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
  Truck,
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
    <div className="site-shell min-h-screen overflow-hidden bg-ttss-bg text-ttss-text">
      <SiteHeader />

      <main id="top">
        <section className="hero-section relative grid min-h-[78vh] items-end isolate">
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="mx-auto grid w-[min(1160px,calc(100%_-_2rem))] items-end gap-[clamp(2rem,5vw,4rem)] pt-[7.25rem] pb-[clamp(1.75rem,4.5vw,3.25rem)]">
            <div className="max-w-[780px]">
              <h1 className="max-w-[760px] font-ttss-display text-[clamp(3.8rem,8.6vw,7.2rem)] leading-[0.95] font-black text-ttss-heading uppercase max-[900px]:text-[clamp(3rem,12vw,4.55rem)]">
                See what trucking really pays
              </h1>
              <p className="mt-5 max-w-[660px] text-[clamp(1.08rem,2vw,1.35rem)] text-white/78">
                Real weekly numbers, road-tested advice, and one-on-one guidance from
                a working trucker who has run company, lease operator, owner operator
                leased on and owner operator with authority.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="inline-flex min-h-12 items-center justify-center gap-2 bg-ttss-orange px-4 font-ttss-body text-[0.82rem] font-black tracking-[0.07em] text-[#0c0b09] uppercase transition-transform hover:-translate-y-px max-[560px]:w-full" href="#pay">
                  See Pay Breakdowns <ArrowRight size={18} />
                </a>
                <a className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/20 bg-white/6 px-4 font-ttss-body text-[0.82rem] font-black tracking-[0.07em] text-white uppercase transition-transform hover:-translate-y-px max-[560px]:w-full" href="#videos">
                  <Play size={18} /> Watch Pay Breakdowns
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-3 border-y border-white/12 bg-ttss-surface max-[900px]:grid-cols-1" aria-label="Site focus">
          <div className="flex min-h-21 items-center justify-center gap-3 border-white/12 p-4 text-center font-ttss-body font-extrabold text-white/82 max-[900px]:border-b">
            <Gauge className="text-ttss-orange" size={22} />
            <span>Revenue is not take-home</span>
          </div>
          <div className="flex min-h-21 items-center justify-center gap-3 border-l border-white/12 p-4 text-center font-ttss-body font-extrabold text-white/82 max-[900px]:border-l-0 max-[900px]:border-b">
            <Fuel className="text-ttss-orange" size={22} />
            <span>Fuel and fixed costs matter</span>
          </div>
          <div className="flex min-h-21 items-center justify-center gap-3 border-l border-white/12 p-4 text-center font-ttss-body font-extrabold text-white/82 max-[900px]:border-l-0">
            <ShieldCheck className="text-ttss-orange" size={22} />
            <span>Know the numbers before you move</span>
          </div>
        </section>

        <PayBreakdown />

        <section
          className="relative mx-auto grid w-[min(1160px,calc(100%_-_2rem))] grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] items-center gap-[clamp(2rem,5vw,4rem)] py-[clamp(4rem,8vw,7rem)] max-[900px]:grid-cols-1"
          id="videos"
        >
          <div className="grid self-stretch border border-white/15 bg-gradient-to-b from-white/8 to-white/4 p-[clamp(1.2rem,3vw,1.6rem)] shadow-ttss">
            <Play className="text-[#ff2b2b]" size={34} fill="currentColor" />
            <h2 className="mt-4 font-ttss-display text-[clamp(2rem,4vw,3.3rem)] leading-[0.95] font-black text-ttss-heading uppercase">
              Latest from the channel
            </h2>
            <p className="mt-4 text-[1.02rem] leading-[1.65] text-[#eaeeef]/72">
              Final numbers videos paired with the spreadsheets behind each position,
              plus the current Amazon Relay power-only series as it develops.
            </p>
            <a
              className="mt-auto inline-flex min-h-12 w-fit items-center justify-center gap-2 border border-white/20 bg-white/6 px-4 font-ttss-body text-[0.82rem] font-black tracking-[0.07em] text-white uppercase transition-transform hover:-translate-y-px"
              href="https://www.youtube.com/@truckingthesevenseas"
              target="_blank"
              rel="noreferrer"
            >
              Visit YouTube <ArrowRight size={17} />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1" aria-label="Featured video topics">
            {videos.map((video) => (
              <article className="grid content-start gap-3 overflow-hidden border border-white/15 bg-gradient-to-b from-white/8 to-white/4 pb-4 shadow-ttss" key={video.youtubeId}>
                <div className="relative aspect-video bg-[#050607]">
                  <iframe
                    className="absolute inset-0 size-full border-0"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <span className="flex items-center gap-2 px-4 font-ttss-display text-xl font-black text-ttss-orange uppercase">
                  {video.number}
                  {video.status ? <small className="font-ttss-body text-[0.67rem] font-black tracking-[0.08em] text-white/58">{video.status}</small> : null}
                </span>
                <h3 className="px-4 font-ttss-display text-[1.35rem] leading-[1.05] font-black text-ttss-heading uppercase">
                  {video.title}
                </h3>
                <a
                  className="mx-4 inline-flex w-fit items-center gap-2 font-ttss-body text-[0.76rem] font-black tracking-[0.07em] text-ttss-orange uppercase"
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

        <section className="relative mx-auto grid w-[min(1160px,calc(100%_-_2rem))] grid-cols-[minmax(16rem,0.72fr)_minmax(0,1.28fr)] items-center gap-[clamp(2rem,5vw,4rem)] py-[clamp(4rem,8vw,7rem)] max-[900px]:grid-cols-1">
          <div className="owner-promo-icon" aria-hidden="true">
            <Truck size={46} />
          </div>
          <div className="grid gap-5">
            <h2 className="max-w-[10ch] font-ttss-display text-[clamp(2.55rem,4.1vw,4.5rem)] leading-[0.95] font-black text-ttss-heading uppercase">
              Owner operator tool
            </h2>
            <p className="text-[1.02rem] leading-[1.65] text-[#eaeeef]/72">
              Model weekly revenue, carrier terms, truck payments, insurance, maintenance,
              and working capital before committing to a trucking business setup.
            </p>
            <a className="inline-flex min-h-12 w-fit items-center justify-center gap-2 bg-ttss-orange px-4 font-ttss-body text-[0.82rem] font-black tracking-[0.07em] text-[#0c0b09] uppercase transition-transform hover:-translate-y-px" href="/owner-operator">
              Open Owner Tool <ArrowRight size={18} />
            </a>
          </div>
        </section>

        <section className="relative mx-auto grid w-[min(1160px,calc(100%_-_2rem))] grid-cols-[minmax(16rem,0.75fr)_minmax(0,1.25fr)] items-center gap-[clamp(2rem,5vw,4rem)] py-[clamp(4rem,8vw,7rem)] max-[900px]:grid-cols-1">
          <div className="story-image" aria-hidden="true">
            <Route size={42} />
          </div>
          <div className="grid gap-5">
            <h2 className="font-ttss-display text-[clamp(2.5rem,5.8vw,5.8rem)] leading-[0.95] font-black text-ttss-heading uppercase">
              Built from miles, spreadsheets, and hard lessons
            </h2>
            <p className="text-[1.02rem] leading-[1.65] text-[#eaeeef]/72">
              From company driver to lease operator, Landstar owner-operator, and
              running authority, the channel documents the numbers behind each step.
            </p>
            <ul className="m-0 grid list-none gap-3 p-0">
              <li className="flex items-center gap-3 text-white/80">
                <Map className="shrink-0 text-ttss-orange" size={20} /> Lanes, deadhead, and planning tradeoffs
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <ClipboardList className="shrink-0 text-ttss-orange" size={20} /> Pay-plan questions before you sign
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <FileSpreadsheet className="shrink-0 text-ttss-orange" size={20} /> Spreadsheet-first decision making
              </li>
            </ul>
          </div>
        </section>

        <section
          className="mx-auto grid w-[min(1160px,calc(100%_-_2rem))] grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] items-start gap-8 py-[clamp(3rem,7vw,6rem)] max-[1280px]:grid-cols-1"
          id="resources"
        >
          <div>
            <h2 className="max-w-[11ch] font-ttss-display text-[clamp(2.35rem,4vw,4.1rem)] leading-[0.95] font-black text-ttss-heading uppercase max-[1280px]:max-w-[13ch]">
              What the channel is really about
            </h2>
            <p className="mt-5 text-[1.02rem] leading-[1.65] text-[#eaeeef]/72">
              Trucking The Seven Seas documents trucking pay from the inside, using
              real settlement data, public spreadsheets, and long-form video breakdowns
              instead of vague averages or sales language.
            </p>
            <p className="mt-5 text-[1.02rem] leading-[1.65] text-[#eaeeef]/72">
              The channel follows Tim&apos;s path through company driving, lease
              operating, leased-on owner-operator work, running authority, and current
              Amazon Relay power-only numbers so drivers can compare the tradeoffs
              before making their own move.
            </p>
          </div>
          <div className="grid gap-5">
            {resourceGroups.map((group) => (
              <div className="grid border-t border-white/15" key={group.title}>
                <h3 className="py-3 font-ttss-body text-[0.78rem] font-black tracking-[0.08em] text-white/62 uppercase">
                  {group.title}
                </h3>
                {group.links.map((link) => (
                  <a
                    className="flex min-h-13 items-center justify-between gap-4 border-b border-white/15 py-3 font-ttss-display text-[clamp(1rem,1.45vw,1.3rem)] leading-[1.1] font-black text-white uppercase transition-transform hover:-translate-y-px"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    key={link.href}
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="shrink-0 text-ttss-orange" size={18} />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </section>

        <ConsultationSection />
      </main>

      <footer className="flex items-center justify-between gap-5 border-t border-white/15 bg-ttss-surface px-[clamp(1rem,4vw,4.5rem)] py-7 max-[720px]:flex-col max-[720px]:items-start">
        <a className="inline-flex w-fit items-center gap-3 font-ttss-display text-[0.95rem] font-black tracking-[0.06em] text-white uppercase" href="#top" aria-label="Trucking The Seven Seas home">
          <img className="size-12 border border-white/15 bg-[#050607] object-cover" src="/ttss-logo-mark.png" alt="" />
          <span>Trucking The Seven Seas</span>
        </a>
        <p className="text-sm leading-6 text-white/58">
          Real trucking numbers, spreadsheets, and decision tools from the road.
        </p>
      </footer>
    </div>
  )
}

export default App
