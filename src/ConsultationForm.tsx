'use client'

import { FormspreeProvider, useForm, ValidationError } from '@formspree/react'
import { CalendarCheck, Check, MessageSquareText } from 'lucide-react'

const FORMSPREE_PROJECT_ID = process.env.NEXT_PUBLIC_FORMSPREE_PROJECT_ID
const FORMSPREE_FORM_KEY = process.env.NEXT_PUBLIC_FORMSPREE_FORM_KEY ?? 'consultation'

export function ConsultationSection() {
  return (
    <section className="section consulting-section" id="consulting">
      <div className="consulting-copy">
        <h2>Book a consultation</h2>
        <p>
          Reach out to Tim for practical guidance on pay structures, lease decisions,
          owner-operator costs, spreadsheets, and next moves before you sign or scale.
        </p>
        <p>
          Send a short note with the decision you are working through, the numbers you
          want reviewed, and the best way to reach you. Tim can follow up with the right
          format, timing, and price once the offer is finalized.
        </p>
      </div>

      {FORMSPREE_PROJECT_ID ? (
        <FormspreeProvider project={FORMSPREE_PROJECT_ID}>
          <ConsultationForm />
        </FormspreeProvider>
      ) : (
        <ConsultationForm disabled />
      )}
    </section>
  )
}

function ConsultationForm({ disabled = false }: { disabled?: boolean }) {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_KEY)

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <input type="hidden" name="_subject" value="New TTSS consultation inquiry" />
      <input type="hidden" name="source" value="Trucking The Seven Seas website" />
        <div className="form-head">
          <MessageSquareText size={25} />
          <div>
            <span>Consultation inquiry</span>
            <strong>Tell Tim what you need help with</strong>
          </div>
        </div>
        <label>
          Name
          <input required disabled={disabled || state.submitting} name="name" placeholder="Your name" />
          <ValidationError className="error-message" errors={state.errors} field="name" />
        </label>
        <label>
          Email
          <input
            required
            disabled={disabled || state.submitting}
            name="email"
            type="email"
            placeholder="you@example.com"
          />
          <ValidationError className="error-message" errors={state.errors} field="email" />
        </label>
        <label>
          Phone
          <input disabled={disabled || state.submitting} name="phone" type="tel" placeholder="Optional" />
          <ValidationError className="error-message" errors={state.errors} field="phone" />
        </label>
        <label>
          Topic
          <select
            disabled={disabled || state.submitting}
            name="topic"
            defaultValue="Pay or settlement review"
          >
            <option>Pay or settlement review</option>
            <option>Lease decision</option>
            <option>Owner-operator costs</option>
            <option>Authority startup planning</option>
            <option>Spreadsheet help</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label>
          What do you want help with?
          <textarea
            required
            maxLength={1600}
            name="message"
            placeholder="Share the decision, offer, spreadsheet, numbers, or questions you want Tim to look at."
            disabled={disabled || state.submitting}
          />
          <ValidationError className="error-message" errors={state.errors} field="message" />
        </label>
        <button className="button primary full" type="submit" disabled={disabled || state.submitting}>
          {state.submitting ? 'Sending...' : 'Request Consultation'} <CalendarCheck size={18} />
        </button>
        <p className="form-note">
          This sends your inquiry through Formspree so Tim can follow up directly.
        </p>
        <ValidationError className="error-message" errors={state.errors} />
        {disabled && (
          <p className="error-message" role="status">
            Formspree is not configured for this environment.
          </p>
        )}
        {state.succeeded && (
          <p className="success-message" role="status">
            <Check size={17} /> Inquiry sent. Tim can follow up from here.
          </p>
        )}
      </form>
  )
}
