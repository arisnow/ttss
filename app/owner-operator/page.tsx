import { OwnerOperatorDashboard } from '../../src/owner-operator/OwnerOperatorDashboard'

export const metadata = {
  title: 'Owner-Operator Economics | Trucking The Seven Seas',
  description:
    'A local owner-operator economics worksheet for modeling lease-on revenue, truck payments, carrier deductions, and owner-paid costs.',
}

export default function OwnerOperatorPage() {
  return (
    <main className="owner-page">
      <OwnerOperatorDashboard />
    </main>
  )
}
