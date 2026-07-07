import { OwnerOperatorDashboard } from '../../src/owner-operator/OwnerOperatorDashboard'
import { SiteHeader } from '../../src/SiteHeader'

export const metadata = {
  title: 'Owner-Operator Economics | Trucking The Seven Seas',
  description:
    'A local owner-operator economics worksheet for modeling weekly revenue, truck payments, carrier deductions, and owner-paid costs.',
  alternates: {
    canonical: '/owner-operator',
  },
  openGraph: {
    title: 'Owner-Operator Economics | Trucking The Seven Seas',
    description:
      'Model weekly revenue, truck payments, carrier deductions, and owner-paid costs in a browser-local trucking worksheet.',
    url: '/owner-operator',
  },
  twitter: {
    title: 'Owner-Operator Economics | Trucking The Seven Seas',
    description:
      'Model weekly revenue, truck payments, carrier deductions, and owner-paid costs in a browser-local trucking worksheet.',
  },
}

export default function OwnerOperatorPage() {
  return (
    <div className="site-shell">
      <SiteHeader brandHref="/" sectionPrefix="/" />
      <main className="owner-page" id="top">
        <OwnerOperatorDashboard />
      </main>
    </div>
  )
}
