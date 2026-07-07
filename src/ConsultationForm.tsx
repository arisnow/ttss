'use client'

import { FormspreeProvider, useForm, ValidationError } from '@formspree/react'
import { CalendarCheck, Check, MessageSquareText } from 'lucide-react'

const FORMSPREE_PROJECT_ID = process.env.NEXT_PUBLIC_FORMSPREE_PROJECT_ID
const FORMSPREE_FORM_KEY = process.env.NEXT_PUBLIC_FORMSPREE_FORM_KEY ?? 'consultation'
const formControlClass =
  'w-full border border-white/15 bg-white/6 px-3 text-base text-white outline-none focus:border-ttss-orange disabled:cursor-not-allowed disabled:opacity-60'
const fieldLabelClass =
  'grid gap-2 font-ttss-body text-[0.76rem] font-black tracking-[0.07em] text-white/70 uppercase'
const errorClass = 'text-[0.86rem] leading-[1.4] text-[#ffb6a2]'

export function ConsultationSection() {
  return (
    <section
      className="relative mx-auto grid w-[min(1160px,calc(100%_-_2rem))] grid-cols-2 items-start gap-[clamp(2rem,5vw,4rem)] py-[clamp(4rem,8vw,7rem)] max-[900px]:grid-cols-1"
      id="consulting"
    >
      <div className="grid gap-5">
        <h2 className="max-w-[11ch] font-ttss-display text-[clamp(2.55rem,4.1vw,4.5rem)] leading-[0.95] font-black text-ttss-heading uppercase max-[1280px]:max-w-[13ch]">
          Book a consultation
        </h2>
        <p className="text-[1.02rem] leading-[1.65] text-[#eaeeef]/72">
          Reach out to Tim for practical guidance on pay structures, lease decisions,
          owner-operator costs, spreadsheets, and next moves before you sign or scale.
        </p>
        <p className="text-[1.02rem] leading-[1.65] text-[#eaeeef]/72">
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
    <form
      className="grid gap-4 border border-white/15 bg-gradient-to-b from-white/8 to-white/4 p-[clamp(1rem,3vw,1.4rem)] shadow-ttss"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="_subject" value="New TTSS consultation inquiry" />
      <input type="hidden" name="source" value="Trucking The Seven Seas website" />
        <div className="flex items-center gap-3 bg-[#11171d] p-4 text-ttss-orange">
          <MessageSquareText size={25} />
          <div className="grid min-w-0 gap-1">
            <span className="font-ttss-body text-[0.72rem] font-extrabold tracking-[0.08em] text-white/55 uppercase">
              Consultation inquiry
            </span>
            <strong className="font-ttss-display text-[1.05rem] break-words text-white">
              Tell Tim what you need help with
            </strong>
          </div>
        </div>
        <label className={fieldLabelClass}>
          Name
          <input className={`${formControlClass} h-12`} required disabled={disabled || state.submitting} name="name" placeholder="Your name" />
          <ValidationError className={errorClass} errors={state.errors} field="name" />
        </label>
        <label className={fieldLabelClass}>
          Email
          <input
            className={`${formControlClass} h-12`}
            required
            disabled={disabled || state.submitting}
            name="email"
            type="email"
            placeholder="you@example.com"
          />
          <ValidationError className={errorClass} errors={state.errors} field="email" />
        </label>
        <label className={fieldLabelClass}>
          Phone
          <input className={`${formControlClass} h-12`} disabled={disabled || state.submitting} name="phone" type="tel" placeholder="Optional" />
          <ValidationError className={errorClass} errors={state.errors} field="phone" />
        </label>
        <label className={fieldLabelClass}>
          Topic
          <select
            className={`${formControlClass} h-12`}
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
        <label className={fieldLabelClass}>
          What do you want help with?
          <textarea
            className={`${formControlClass} min-h-28 resize-y py-3`}
            required
            maxLength={1600}
            name="message"
            placeholder="Share the decision, offer, spreadsheet, numbers, or questions you want Tim to look at."
            disabled={disabled || state.submitting}
          />
          <ValidationError className={errorClass} errors={state.errors} field="message" />
        </label>
        <button
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-ttss-orange px-4 font-ttss-body text-[0.82rem] font-black tracking-[0.07em] text-[#0c0b09] uppercase transition-transform hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={disabled || state.submitting}
        >
          {state.submitting ? 'Sending...' : 'Request Consultation'} <CalendarCheck size={18} />
        </button>
        <p className="text-sm leading-6 text-white/60">
          This sends your inquiry through Formspree so Tim can follow up directly.
        </p>
        <ValidationError className={errorClass} errors={state.errors} />
        {disabled && (
          <p className={errorClass} role="status">
            Formspree is not configured for this environment.
          </p>
        )}
        {state.succeeded && (
          <p className="flex items-center gap-2 text-[0.92rem] text-[#b8f5c4]" role="status">
            <Check size={17} /> Inquiry sent. Tim can follow up from here.
          </p>
        )}
      </form>
  )
}
