'use client'

import { useState } from 'react'
import { CalendarCheck, Check, MessageSquareText } from 'lucide-react'

const CONSULTATION_DRAFT_KEY = 'ttss:consultation-draft'

export function ConsultationSection() {
  const [submissionMessage, setSubmissionMessage] = useState('')

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

      <form
        className="booking-form"
        onSubmit={(event) => {
          event.preventDefault()
          const form = event.currentTarget
          const formData = new FormData(form)
          const draft = {
            name: String(formData.get('name') || ''),
            email: String(formData.get('email') || ''),
            phone: String(formData.get('phone') || ''),
            topic: String(formData.get('topic') || ''),
            message: String(formData.get('message') || ''),
            savedAt: new Date().toISOString(),
          }
          try {
            window.localStorage.setItem(CONSULTATION_DRAFT_KEY, JSON.stringify(draft))
            setSubmissionMessage(
              'Inquiry saved in this browser. Connect an email or form workflow before using this for live requests.',
            )
          } catch {
            setSubmissionMessage(
              'Inquiry could not be saved in this browser. Connect an email or form workflow before using this for live requests.',
            )
          }
        }}
      >
        <div className="form-head">
          <MessageSquareText size={25} />
          <div>
            <span>Consultation inquiry</span>
            <strong>Tell Tim what you need help with</strong>
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
          Phone
          <input name="phone" type="tel" placeholder="Optional" />
        </label>
        <label>
          Topic
          <select name="topic" defaultValue="Pay or settlement review">
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
          />
        </label>
        <button className="button primary full" type="submit">
          Request Consultation <CalendarCheck size={18} />
        </button>
        <p className="form-note">
          This inquiry stays in your browser until an email or form workflow is
          connected.
        </p>
        {submissionMessage && (
          <p className="success-message" role="status">
            <Check size={17} /> {submissionMessage}
          </p>
        )}
      </form>
    </section>
  )
}
