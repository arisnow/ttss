'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  calculateOwnerOperatorModel,
  DEFAULT_BLOCK_COST_MODEL,
  formatNumber,
  formatStatementMoney,
  formatUsd,
  normalizeBlockCostModel,
  normalizeModelState,
  saveVersion,
} from './model'
import type { BlockCostModel, ModelState, ModelVersion } from './types'

type FieldDef = {
  key: keyof BlockCostModel
  label: string
  step: number
}

const STORAGE_KEY = 'ttss:owner-operator-model'

const revenueFields: FieldDef[] = [
  { key: 'blockPrice', label: 'Avg block price', step: 50 },
  { key: 'blockDays', label: 'Days / block', step: 0.5 },
  { key: 'blocksPerWeek', label: 'Blocks / week', step: 0.25 },
  { key: 'weeksPerYear', label: 'Work weeks / year', step: 1 },
  { key: 'workHoursPerWeek', label: 'Work hours / week', step: 1 },
]

const carrierFields: FieldDef[] = [
  { key: 'carrierFeePercent', label: 'Carrier fee %', step: 0.5 },
  { key: 'carrierInsuranceMonthly', label: 'Insurance total / month', step: 25 },
  { key: 'leaseAdminMonthly', label: 'ELD/admin/compliance/plates / month', step: 25 },
]

const ownerFields: FieldDef[] = [
  { key: 'truckPrice', label: 'Truck price', step: 1000 },
  { key: 'downPayment', label: 'Down payment', step: 1000 },
  { key: 'financingTermMonths', label: 'Financing term / months', step: 12 },
  { key: 'financingApr', label: 'Financing APR %', step: 0.25 },
  { key: 'maintenancePerBlock', label: 'Maintenance / block', step: 25 },
  { key: 'parkingMonthly', label: 'Truck parking / month', step: 25 },
]

export function OwnerOperatorDashboard() {
  const [state, setState] = useState<ModelState>(() => normalizeModelState({}))
  const [modelName, setModelName] = useState('Base case')
  const [hasLoadedLocalState, setHasLoadedLocalState] = useState(false)
  const output = useMemo(() => calculateOwnerOperatorModel(state.blockCostModel), [state.blockCostModel])

  useEffect(() => {
    const nextState = loadLocalState()
    setState(nextState)
    setModelName(activeVersion(nextState)?.name || 'Base case')
    setHasLoadedLocalState(true)
  }, [])

  useEffect(() => {
    if (!hasLoadedLocalState) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Browser storage can be unavailable in private or restricted modes.
    }
  }, [hasLoadedLocalState, state])

  function updateModelField(key: keyof BlockCostModel, value: string) {
    const numeric = Number(value)
    const nextModel = normalizeBlockCostModel({
      ...state.blockCostModel,
      [key]: Number.isFinite(numeric) ? numeric : 0,
    })
    const nextState = { ...state, blockCostModel: nextModel }
    setState(isEditingActiveVersion(state, modelName) ? syncActiveVersion(nextState) : nextState)
  }

  function selectVersion(id: string) {
    const version = state.modelVersions.find((candidate) => candidate.id === id)
    if (!version) return
    const nextState = normalizeModelState({
      ...state,
      activeModelId: version.id,
      blockCostModel: version.blockCostModel,
    })
    setModelName(version.name)
    setState(nextState)
  }

  function handleSaveVersion() {
    const nextState = saveVersion(state, modelName, state.blockCostModel)
    setState(nextState)
    setModelName(activeVersion(nextState)?.name || modelName)
  }

  function resetModel() {
    const nextState = normalizeModelState({})
    setState(nextState)
    setModelName(activeVersion(nextState)?.name || 'Base case')
  }

  return (
    <section className="owner-dashboard" id="owner-operator">
      <div className="owner-tool-head">
        <div>
          <h2>Owner-operator economics</h2>
          <p>
            Model a purchased tractor, lease-on deductions, and owner-paid costs before
            committing to the next business move.
          </p>
        </div>
        <button type="button" onClick={resetModel}>
          Reset local model
        </button>
      </div>

      <div className="owner-tool-layout">
        <aside className="owner-assumptions">
          <section className="owner-panel-head">
            <h3>Draft Assumptions</h3>
            <p>Saved in this browser only.</p>
          </section>

          <section className="owner-version-card">
            <h4>Model Version</h4>
            <label>
              Open version
              <select value={state.activeModelId} onChange={(event) => selectVersion(event.target.value)}>
                {state.modelVersions.map((version) => (
                  <option key={version.id} value={version.id}>
                    {version.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Version name
              <input
                value={modelName}
                maxLength={80}
                onChange={(event) => setModelName(event.target.value)}
              />
            </label>
            <button type="button" onClick={handleSaveVersion}>
              Save version
            </button>
          </section>

          <AssumptionGroup title="Revenue" fields={revenueFields} model={state.blockCostModel} onChange={updateModelField} />
          <AssumptionGroup title="Carrier Terms" fields={carrierFields} model={state.blockCostModel} onChange={updateModelField} />
          <AssumptionGroup title="Owner-Paid" fields={ownerFields} model={state.blockCostModel} onChange={updateModelField} />

          <section className="owner-summary">
            <h4>Calculated Summary</h4>
            <AssumptionRow label="Annual revenue" value={formatUsd(output.annualGross)} />
            <AssumptionRow label="Weekly revenue" value={formatUsd(output.grossPerWeek)} />
            <AssumptionRow label="Blocks / week" value={formatNumber(output.blocksPerWeek)} />
            <AssumptionRow label="Truck payment" value={`${formatUsd(output.truckPaymentMonthly)}/mo`} />
            <AssumptionRow label="Annual carrier fee" value={formatUsd(output.carrierFeeAnnual)} />
          </section>
        </aside>

        <section className="owner-statement">
          <section className="owner-statement-head">
            <h3>Lease-On Authority Discussion Sheet</h3>
            <p>Draft settlement economics with weekly, monthly, and annual views.</p>
          </section>

          <section className="owner-decision-grid">
            {output.decisionCards.map((card) => (
              <article className="owner-decision-card" key={card.label}>
                <span>{card.label}</span>
                <strong>{card.value}</strong>
                <small>{card.note}</small>
              </article>
            ))}
          </section>

          <section className="owner-statement-section">
            <header>
              <h4>Lease-On Settlement View</h4>
              <p>Draft owner-operator settlement model before final written terms.</p>
            </header>
            <SettlementTable output={output} weeksPerYear={state.blockCostModel.weeksPerYear} />
          </section>

          <section className="owner-statement-section">
            <header>
              <h4>Model Notes</h4>
              <p>Key assumptions reflected in the lease-on settlement view.</p>
            </header>
            <Notes model={state.blockCostModel} output={output} />
          </section>
        </section>
      </div>
    </section>
  )
}

function AssumptionGroup({
  title,
  fields,
  model,
  onChange,
}: {
  title: string
  fields: FieldDef[]
  model: BlockCostModel
  onChange: (key: keyof BlockCostModel, value: string) => void
}) {
  return (
    <section className="owner-assumption-group">
      <h4>{title}</h4>
      {fields.map((field) => (
        <label key={field.key}>
          {field.label}
          <input
            type="number"
            min={0}
            step={field.step}
            value={String(model[field.key] ?? DEFAULT_BLOCK_COST_MODEL[field.key])}
            onChange={(event) => onChange(field.key, event.target.value)}
          />
        </label>
      ))}
    </section>
  )
}

function AssumptionRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="owner-assumption-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function SettlementTable({
  output,
  weeksPerYear,
}: {
  output: ReturnType<typeof calculateOwnerOperatorModel>
  weeksPerYear: number
}) {
  const weeks = Math.max(1, Number(weeksPerYear) || DEFAULT_BLOCK_COST_MODEL.weeksPerYear)
  return (
    <div className="owner-table-wrap">
      <table>
        <thead>
          <tr>
            <th>Settlement line</th>
            <th>Annual</th>
            <th>Monthly</th>
            <th>Weekly</th>
          </tr>
        </thead>
        <tbody>
          {output.settlementRows.map((row) => (
            <tr className={row.type || ''} key={row.label}>
              <td>{row.label}</td>
              <td>{formatStatementMoney(row.annual)}</td>
              <td>{formatStatementMoney(row.annual / 12)}</td>
              <td>{formatStatementMoney(row.annual / weeks)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Notes({
  model,
  output,
}: {
  model: BlockCostModel
  output: ReturnType<typeof calculateOwnerOperatorModel>
}) {
  const insuranceTotalMonthly =
    model.carrierInsuranceMonthly + model.physicalDamageMonthly + model.bobtailMonthly
  const notes = [
    ['Revenue target', `Model uses ${formatUsd(output.grossPerWeek)} per week from ${formatNumber(model.blocksPerWeek)} blocks per week as the operating target.`],
    ['Carrier fee', `Model assumes a ${formatNumber(model.carrierFeePercent, '%')} carrier fee on modeled revenue.`],
    ['Fuel surcharge', 'Fuel surcharge and accessorials are assumed to pass through to the owner-operator.'],
    ['Insurance', `${formatUsd(insuranceTotalMonthly)} per month is modeled as one combined insurance deduction.`],
    ['IFTA', 'IFTA is excluded because it can be a quarterly refund or payment depending on activity.'],
    ['Truck payment', `${formatUsd(output.truckPaymentMonthly)} per month is estimated from ${formatUsd(model.truckPrice)} price, ${formatUsd(model.downPayment)} down, ${formatNumber(model.financingApr, '%')} APR, and ${formatNumber(model.financingTermMonths, ' months')}.`],
  ]
  return (
    <div className="owner-notes-grid">
      {notes.map(([label, body]) => (
        <article key={label} className="owner-note-card">
          <strong>{label}</strong>
          <p>{body}</p>
        </article>
      ))}
    </div>
  )
}

function loadLocalState(): ModelState {
  if (typeof window === 'undefined') return normalizeModelState({})
  try {
    return normalizeModelState(JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}'))
  } catch {
    return normalizeModelState({})
  }
}

function activeVersion(state: Pick<ModelState, 'modelVersions' | 'activeModelId'>): ModelVersion | null {
  return state.modelVersions.find((version) => version.id === state.activeModelId) || state.modelVersions[0] || null
}

function isEditingActiveVersion(
  state: Pick<ModelState, 'modelVersions' | 'activeModelId'>,
  modelName: string,
): boolean {
  return activeVersion(state)?.name.trim().toLowerCase() === modelName.trim().toLowerCase()
}

function syncActiveVersion(state: ModelState): ModelState {
  const now = new Date().toISOString()
  return normalizeModelState({
    ...state,
    modelVersions: state.modelVersions.map((version) =>
      version.id === state.activeModelId
        ? { ...version, blockCostModel: state.blockCostModel, updatedAt: now }
        : version,
    ),
    updatedAt: now,
  })
}
