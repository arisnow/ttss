'use client'

import { useState } from 'react'
import { CalendarCheck, Check, WalletCards } from 'lucide-react'

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

const CONSULTATION_DRAFT_KEY = 'ttss:consultation-draft'

export function ConsultationSection() {
  const [selectedResponse, setSelectedResponse] = useState<string>(responseOptions[0].title)
  const [submissionMessage, setSubmissionMessage] = useState('')

  return (
    <section className="section consulting-section" id="consulting">
      <div className="consulting-copy">
        <h2>Book a straight-answer video response</h2>
        <p>
          Get practical guidance on pay structures, lease decisions, owner-operator
          costs, spreadsheets, and next moves before you sign or scale.
        </p>
        <p>
          Send Tim a focused list of up to 10 questions. He will answer them in a video
          response that can stay private between you and him, or become an anonymous
          livestream where the audience can add useful questions and point out concerns
          that may otherwise be missed.
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
          const form = event.currentTarget
          const formData = new FormData(form)
          const draft = {
            name: String(formData.get('name') || ''),
            email: String(formData.get('email') || ''),
            format: String(formData.get('format') || ''),
            response: selectedResponse,
            questions: String(formData.get('questions') || ''),
            savedAt: new Date().toISOString(),
          }
          try {
            window.localStorage.setItem(CONSULTATION_DRAFT_KEY, JSON.stringify(draft))
            setSubmissionMessage(
              'Draft saved in this browser. Connect a payment or intake workflow before using this for live requests.',
            )
          } catch {
            setSubmissionMessage(
              'Draft could not be saved in this browser. Connect a payment or intake workflow before using this for live requests.',
            )
          }
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
          Flat rate: $100. This draft stays in your browser until a payment or intake
          workflow is connected.
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
