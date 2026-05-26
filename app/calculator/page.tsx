'use client'

import { useState, useMemo } from 'react'

// ─── Tax Engine ───────────────────────────────────────────────────────────────

type Bracket = [number, number, number] // [min, max, rate]
type FilingStatus = 'single' | 'married' | 'hoh'

const FED: Record<FilingStatus, Bracket[]> = {
  single: [
    [0, 11925, 0.10], [11925, 48475, 0.12], [48475, 103350, 0.22],
    [103350, 197300, 0.24], [197300, 250525, 0.32], [250525, 626350, 0.35],
    [626350, Infinity, 0.37],
  ],
  married: [
    [0, 23850, 0.10], [23850, 96950, 0.12], [96950, 206700, 0.22],
    [206700, 394600, 0.24], [394600, 501050, 0.32], [501050, 751600, 0.35],
    [751600, Infinity, 0.37],
  ],
  hoh: [
    [0, 17000, 0.10], [17000, 64850, 0.12], [64850, 103350, 0.22],
    [103350, 197300, 0.24], [197300, 250500, 0.32], [250500, 626350, 0.35],
    [626350, Infinity, 0.37],
  ],
}

const FED_STD_DEDUCTION: Record<FilingStatus, number> = { single: 15000, married: 30000, hoh: 22500 }

function bracketTax(income: number, brackets: Bracket[]): number {
  let tax = 0
  for (const [min, max, rate] of brackets) {
    if (income <= min) break
    tax += (Math.min(income, max) - min) * rate
  }
  return tax
}

type StateData = { name: string; single: Bracket[]; mfj?: Bracket[] }

const STATES: Record<string, StateData> = {
  AL: { name: 'Alabama',         single: [[0,500,.02],[500,3000,.04],[3000,Infinity,.05]] },
  AK: { name: 'Alaska',          single: [] },
  AZ: { name: 'Arizona',         single: [[0,Infinity,.025]] },
  AR: { name: 'Arkansas',        single: [[0,5000,.02],[5000,10300,.04],[10300,Infinity,.044]] },
  CA: { name: 'California',      single: [[0,10412,.01],[10412,24684,.02],[24684,38959,.04],[38959,54081,.06],[54081,68350,.08],[68350,349137,.093],[349137,418961,.103],[418961,698271,.113],[698271,Infinity,.133]] },
  CO: { name: 'Colorado',        single: [[0,Infinity,.044]] },
  CT: { name: 'Connecticut',     single: [[0,10000,.03],[10000,50000,.05],[50000,100000,.055],[100000,200000,.06],[200000,500000,.069],[500000,Infinity,.0699]] },
  DE: { name: 'Delaware',        single: [[0,2000,0],[2000,5000,.022],[5000,10000,.039],[10000,20000,.048],[20000,25000,.052],[25000,60000,.0555],[60000,Infinity,.066]] },
  FL: { name: 'Florida',         single: [] },
  GA: { name: 'Georgia',         single: [[0,Infinity,.0549]] },
  HI: { name: 'Hawaii',          single: [[0,2400,.014],[2400,4800,.032],[4800,9600,.055],[9600,14400,.064],[14400,19200,.068],[19200,24000,.072],[24000,36000,.076],[36000,48000,.079],[48000,150000,.0825],[150000,175000,.09],[175000,Infinity,.11]] },
  ID: { name: 'Idaho',           single: [[0,Infinity,.058]] },
  IL: { name: 'Illinois',        single: [[0,Infinity,.0495]] },
  IN: { name: 'Indiana',         single: [[0,Infinity,.0305]] },
  IA: { name: 'Iowa',            single: [[0,Infinity,.038]] },
  KS: { name: 'Kansas',          single: [[0,15000,.031],[15000,30000,.0525],[30000,Infinity,.057]] },
  KY: { name: 'Kentucky',        single: [[0,Infinity,.04]] },
  LA: { name: 'Louisiana',       single: [[0,12500,.0185],[12500,50000,.035],[50000,Infinity,.0425]] },
  ME: { name: 'Maine',           single: [[0,26050,.058],[26050,61600,.0675],[61600,Infinity,.0715]] },
  MD: { name: 'Maryland',        single: [[0,1000,.02],[1000,2000,.03],[2000,3000,.04],[3000,100000,.0475],[100000,150000,.0525],[150000,250000,.055],[250000,Infinity,.0575]] },
  MA: { name: 'Massachusetts',   single: [[0,1000000,.05],[1000000,Infinity,.09]] },
  MI: { name: 'Michigan',        single: [[0,Infinity,.0425]] },
  MN: { name: 'Minnesota',       single: [[0,31690,.0535],[31690,104090,.068],[104090,193240,.0785],[193240,Infinity,.0985]] },
  MS: { name: 'Mississippi',     single: [[0,10000,0],[10000,Infinity,.047]] },
  MO: { name: 'Missouri',        single: [[0,1207,0],[1207,2414,.015],[2414,3621,.02],[3621,4828,.025],[4828,6035,.03],[6035,7242,.035],[7242,8432,.04],[8432,9619,.045],[9619,Infinity,.047]] },
  MT: { name: 'Montana',         single: [[0,20500,.047],[20500,Infinity,.059]] },
  NE: { name: 'Nebraska',        single: [[0,3700,.0246],[3700,22170,.0351],[22170,35730,.0501],[35730,Infinity,.0664]] },
  NV: { name: 'Nevada',          single: [] },
  NH: { name: 'New Hampshire',   single: [] },
  NJ: { name: 'New Jersey',      single: [[0,20000,.014],[20000,35000,.0175],[35000,40000,.035],[40000,75000,.05525],[75000,500000,.0637],[500000,1000000,.0897],[1000000,Infinity,.1075]] },
  NM: { name: 'New Mexico',      single: [[0,5500,.017],[5500,11000,.032],[11000,16000,.047],[16000,210000,.049],[210000,Infinity,.059]] },
  NY: { name: 'New York',        single: [[0,17150,.04],[17150,23600,.045],[23600,27900,.0525],[27900,161550,.0585],[161550,323200,.0625],[323200,2155350,.0685],[2155350,Infinity,.0965]] },
  NC: { name: 'North Carolina',  single: [[0,Infinity,.045]] },
  ND: { name: 'North Dakota',    single: [[0,44725,.011],[44725,225975,.0204],[225975,Infinity,.029]] },
  OH: { name: 'Ohio',            single: [[0,26050,0],[26050,100000,.0275],[100000,Infinity,.035]] },
  OK: { name: 'Oklahoma',        single: [[0,1000,.0025],[1000,2500,.0075],[2500,3750,.0175],[3750,4900,.0275],[4900,7200,.0375],[7200,Infinity,.0475]] },
  OR: { name: 'Oregon',          single: [[0,4050,.0475],[4050,10200,.0675],[10200,125000,.0875],[125000,Infinity,.099]] },
  PA: { name: 'Pennsylvania',    single: [[0,Infinity,.0307]] },
  RI: { name: 'Rhode Island',    single: [[0,73450,.0375],[73450,166950,.0475],[166950,Infinity,.0599]] },
  SC: { name: 'South Carolina',  single: [[0,3200,0],[3200,6410,.03],[6410,9620,.04],[9620,12820,.05],[12820,16040,.06],[16040,Infinity,.065]] },
  SD: { name: 'South Dakota',    single: [] },
  TN: { name: 'Tennessee',       single: [] },
  TX: { name: 'Texas',           single: [] },
  UT: { name: 'Utah',            single: [[0,Infinity,.0465]] },
  VT: { name: 'Vermont',         single: [[0,45400,.0335],[45400,110050,.066],[110050,229550,.076],[229550,Infinity,.0875]] },
  VA: { name: 'Virginia',        single: [[0,3000,.02],[3000,5000,.03],[5000,17000,.05],[17000,Infinity,.0575]] },
  WA: { name: 'Washington',      single: [] },
  WV: { name: 'West Virginia',   single: [[0,10000,.0236],[10000,25000,.0315],[25000,40000,.047],[40000,60000,.0512],[60000,Infinity,.0512]] },
  WI: { name: 'Wisconsin',       single: [[0,14320,.0354],[14320,28640,.0465],[28640,315310,.053],[315310,Infinity,.0765]] },
  WY: { name: 'Wyoming',         single: [] },
  DC: { name: 'Dist. of Columbia', single: [[0,10000,.04],[10000,40000,.06],[40000,60000,.065],[60000,350000,.085],[350000,1000000,.0975],[1000000,Infinity,.1075]] },
}

const NO_TAX_STATES = new Set(['AK','FL','NV','NH','SD','TN','TX','WA','WY'])

function calcTaxes(gross: number, state: string, filing: FilingStatus) {
  // Federal
  const fedDeduction = FED_STD_DEDUCTION[filing]
  const fedTaxable = Math.max(0, gross - fedDeduction)
  const fedBrackets = FED[filing]
  const federalTax = bracketTax(fedTaxable, fedBrackets)

  // State
  const stateData = STATES[state]
  let stateTax = 0
  if (stateData && stateData.single.length > 0) {
    const brackets = (filing === 'married' && stateData.mfj) ? stateData.mfj : stateData.single
    // For married with no MFJ brackets, roughly double the thresholds
    if (filing === 'married' && !stateData.mfj) {
      const doubledBrackets: Bracket[] = stateData.single.map(([min, max, rate]) => [min * 2, max === Infinity ? Infinity : max * 2, rate] as Bracket)
      stateTax = bracketTax(gross, doubledBrackets)
    } else {
      stateTax = bracketTax(gross, brackets)
    }
  }

  // FICA
  const ssTaxable = Math.min(gross, 176100) // 2025 SS wage base
  const ssTax = ssTaxable * 0.062
  const medicareTax = gross * 0.0145 + (gross > 200000 ? (gross - 200000) * 0.009 : 0)
  const ficaTax = ssTax + medicareTax

  const totalTax = federalTax + stateTax + ficaTax
  const netPay = gross - totalTax

  return {
    gross, federalTax, stateTax, ficaTax, ssTax, medicareTax,
    totalTax, netPay,
    effectiveFedRate: federalTax / gross,
    effectiveStateRate: stateTax / gross,
    effectiveTotalRate: totalTax / gross,
  }
}

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}
function pct(n: number) { return `${(n * 100).toFixed(1)}%` }

// ─── Component ────────────────────────────────────────────────────────────────

export default function CalculatorPage() {
  const [salary, setSalary] = useState('100000')
  const [state, setState] = useState('CA')
  const [filing, setFiling] = useState<FilingStatus>('single')

  const gross = useMemo(() => {
    const n = parseInt(salary.replace(/,/g, ''), 10)
    return isNaN(n) ? 0 : Math.min(n, 5000000)
  }, [salary])

  const result = useMemo(() => gross > 0 ? calcTaxes(gross, state, filing) : null, [gross, state, filing])

  // State comparison: best and worst 5 for same salary
  const stateComparison = useMemo(() => {
    if (!gross) return []
    return Object.entries(STATES)
      .map(([code, data]) => ({ code, name: data.name, ...calcTaxes(gross, code, filing) }))
      .sort((a, b) => a.totalTax - b.totalTax)
  }, [gross, filing])

  const bestStates = stateComparison.slice(0, 5)
  const worstStates = stateComparison.slice(-5).reverse()

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', fontSize: 15,
    border: '1px solid var(--border)', background: 'white',
    color: 'var(--ink)', fontFamily: 'Georgia, serif',
    outline: 'none',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 10, fontWeight: 600,
    letterSpacing: '0.12em', textTransform: 'uppercase',
    color: 'var(--ink-muted)', marginBottom: 6,
  }

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 20 }}>
        <a href="/" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Home</a>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: 'var(--navy)' }}>Salary Calculator</span>
      </div>

      {/* Header */}
      <div style={{ borderBottom: '2px solid var(--navy)', paddingBottom: 20, marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, margin: '0 0 8px', color: 'var(--navy)' }}>
          U.S. Salary Tax Calculator
        </h1>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-muted)' }}>
          Estimate your 2025 federal + state take-home pay. Based on official IRS brackets and state revenue codes.
        </p>
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 32, alignItems: 'start' }}>

        {/* ── Inputs ── */}
        <div style={{ background: 'white', border: '1px solid var(--border)', padding: 28 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
            Your Details
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={labelStyle}>Annual Gross Salary ($)</label>
              <input
                type="text"
                value={salary}
                onChange={e => setSalary(e.target.value.replace(/[^0-9]/g, ''))}
                style={inputStyle}
                placeholder="e.g. 120000"
              />
            </div>

            <div>
              <label style={labelStyle}>State</label>
              <select
                value={state}
                onChange={e => setState(e.target.value)}
                style={inputStyle}
              >
                {Object.entries(STATES)
                  .sort((a, b) => a[1].name.localeCompare(b[1].name))
                  .map(([code, { name }]) => (
                    <option key={code} value={code}>{name} ({code})</option>
                  ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Filing Status</label>
              <select value={filing} onChange={e => setFiling(e.target.value as FilingStatus)} style={inputStyle}>
                <option value="single">Single</option>
                <option value="married">Married Filing Jointly</option>
                <option value="hoh">Head of Household</option>
              </select>
            </div>
          </div>

          {result && (
            <div style={{ marginTop: 28, padding: '16px 20px', background: 'var(--navy)', color: 'white' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a9bb5', marginBottom: 8 }}>
                Est. Annual Take-Home
              </div>
              <div style={{ fontSize: 34, fontWeight: 700, fontFamily: 'Courier New, monospace', color: 'var(--gold-lt)' }}>
                {fmt(result.netPay)}
              </div>
              <div style={{ fontSize: 12, color: '#8a9bb5', marginTop: 4 }}>
                {fmt(Math.round(result.netPay / 12))} / month &nbsp;·&nbsp; {fmt(Math.round(result.netPay / 26))} / paycheck
              </div>
            </div>
          )}
        </div>

        {/* ── Results ── */}
        <div>
          {result ? (
            <>
              {/* Visual breakdown bars */}
              <div style={{ background: 'white', border: '1px solid var(--border)', padding: 24, marginBottom: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 18, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
                  Tax Breakdown
                </div>

                {[
                  { label: 'Federal Income Tax', amount: result.federalTax, rate: result.effectiveFedRate, color: '#0b1f3a' },
                  { label: `${STATES[state]?.name ?? state} State Tax`, amount: result.stateTax, rate: result.effectiveStateRate, color: '#b8962e' },
                  { label: 'Social Security (6.2%)', amount: result.ssTax, rate: result.ssTax / result.gross, color: '#4a6a8a' },
                  { label: 'Medicare (1.45%+)', amount: result.medicareTax, rate: result.medicareTax / result.gross, color: '#6a8aaa' },
                ].map(row => (
                  <div key={row.label} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12.5 }}>
                      <span style={{ color: 'var(--ink)' }}>{row.label}</span>
                      <span style={{ fontFamily: 'Courier New, monospace', fontWeight: 600, color: 'var(--navy)' }}>
                        {fmt(row.amount)} <span style={{ color: 'var(--ink-muted)', fontWeight: 400, fontSize: 11 }}>({pct(row.rate)})</span>
                      </span>
                    </div>
                    <div style={{ height: 6, background: 'var(--paper-alt)', borderRadius: 2 }}>
                      <div style={{ height: 6, background: row.color, borderRadius: 2, width: `${Math.min(row.rate * 100 * 2.5, 100)}%`, transition: 'width 0.3s' }} />
                    </div>
                  </div>
                ))}

                <div style={{ borderTop: '2px solid var(--navy)', paddingTop: 14, marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>Total Tax Burden</span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontFamily: 'Courier New, monospace', fontWeight: 700, fontSize: 16, color: '#8b1a1a' }}>
                      {fmt(result.totalTax)}
                    </span>
                    <span style={{ color: 'var(--ink-muted)', fontSize: 12, marginLeft: 8 }}>({pct(result.effectiveTotalRate)} effective)</span>
                  </div>
                </div>
              </div>

              {/* Paycheck table */}
              <div style={{ background: 'white', border: '1px solid var(--border)' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left' }}>Pay Period</th>
                      <th>Gross</th>
                      <th>Taxes</th>
                      <th>Net Take-Home</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'Annual', div: 1 },
                      { label: 'Monthly', div: 12 },
                      { label: 'Semi-Monthly', div: 24 },
                      { label: 'Biweekly', div: 26 },
                      { label: 'Weekly', div: 52 },
                    ].map(({ label, div }) => (
                      <tr key={label}>
                        <td style={{ fontWeight: 600, color: 'var(--navy)' }}>{label}</td>
                        <td style={{ fontFamily: 'Courier New, monospace' }}>{fmt(result.gross / div)}</td>
                        <td style={{ fontFamily: 'Courier New, monospace', color: '#8b1a1a' }}>{fmt(result.totalTax / div)}</td>
                        <td className="median">{fmt(result.netPay / div)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {NO_TAX_STATES.has(state) && (
                <div style={{ marginTop: 12, padding: '10px 14px', background: '#f0faf4', borderLeft: '4px solid var(--green)', border: '1px solid #c0e0cc', borderLeftWidth: 4, fontSize: 12, color: 'var(--green)' }}>
                  <strong>{STATES[state]?.name}</strong> has no state income tax — you keep more of every dollar earned.
                </div>
              )}
            </>
          ) : (
            <div style={{ background: 'white', border: '1px solid var(--border)', padding: 32, textAlign: 'center', color: 'var(--ink-muted)' }}>
              Enter a salary to see your tax breakdown.
            </div>
          )}
        </div>
      </div>

      {/* State comparison */}
      {result && gross > 0 && (
        <div style={{ marginTop: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <h2 style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0, color: 'var(--ink-muted)' }}>
              State Comparison — {fmt(gross)} salary
            </h2>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Best */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 8 }}>
                ▲ Lowest Tax Burden
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>State</th>
                    <th>State Tax</th>
                    <th>Total Tax</th>
                    <th>Take-Home</th>
                  </tr>
                </thead>
                <tbody>
                  {bestStates.map(s => (
                    <tr key={s.code} style={{ background: s.code === state ? '#f0faf4' : undefined }}>
                      <td style={{ fontWeight: 600, color: 'var(--navy)' }}>{s.name}</td>
                      <td style={{ fontFamily: 'Courier New, monospace', fontSize: 12 }}>{pct(s.effectiveStateRate)}</td>
                      <td style={{ fontFamily: 'Courier New, monospace', fontSize: 12, color: '#8b1a1a' }}>{fmt(s.totalTax)}</td>
                      <td className="median">{fmt(s.netPay)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Worst */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8b1a1a', marginBottom: 8 }}>
                ▼ Highest Tax Burden
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>State</th>
                    <th>State Tax</th>
                    <th>Total Tax</th>
                    <th>Take-Home</th>
                  </tr>
                </thead>
                <tbody>
                  {worstStates.map(s => (
                    <tr key={s.code} style={{ background: s.code === state ? '#fff5f5' : undefined }}>
                      <td style={{ fontWeight: 600, color: 'var(--navy)' }}>{s.name}</td>
                      <td style={{ fontFamily: 'Courier New, monospace', fontSize: 12 }}>{pct(s.effectiveStateRate)}</td>
                      <td style={{ fontFamily: 'Courier New, monospace', fontSize: 12, color: '#8b1a1a' }}>{fmt(s.totalTax)}</td>
                      <td className="median">{fmt(s.netPay)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div style={{ marginTop: 48, padding: '16px 20px', background: 'white', borderLeft: '4px solid var(--gold)', border: '1px solid var(--border)', borderLeftWidth: 4 }}>
        <p style={{ margin: 0, fontSize: 12, color: 'var(--ink-muted)', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--navy)' }}>Disclaimer:</strong> This calculator provides estimates based on 2025 IRS tax brackets and state revenue codes.
          Results assume the standard deduction and do not account for additional deductions, credits, retirement contributions, or local taxes.
          For precise tax planning, consult a licensed tax professional.
        </p>
      </div>
    </>
  )
}
