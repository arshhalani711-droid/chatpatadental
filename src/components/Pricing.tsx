import { useState } from 'react';
import { motion } from 'motion/react';
import { Banknote, ShieldCheck, Scale, Calculator, DollarSign, Wallet } from 'lucide-react';

export default function Pricing() {
  // Calculators state
  const [totalCost, setTotalCost] = useState(3500); // dollars
  const [insuranceCoverage, setInsuranceCoverage] = useState(50); // percentage (0-80)
  const [months, setMonths] = useState(12); // installment periods

  // Computed variables
  const netEstimatedCost = Math.max(0, totalCost - (totalCost * insuranceCoverage / 100));
  const estimatedEMI = months > 0 ? (netEstimatedCost / months) : 0;

  const basicPricingCards = [
    {
      category: "Preventive Care",
      costRange: "$150 - $450",
      assurance: "80%-100% Insured",
      procedures: ["Full mouth 3D digital transillumination diagnostics", "Ultrasonic scale and biofilm polish check", "Enamel-reinforcing calcium barrier varnish"]
    },
    {
      category: "Restorative Sol.",
      costRange: "$650 - $1,800",
      assurance: "50%-80% Insured",
      procedures: ["Microscopic root canal disinfection", "One-Visit monolithic CAD/CAM mill crowns", "Non-metal bio-compatible fillings"]
    },
    {
      category: "Premium Cosmetic",
      costRange: "$950 - $2,100",
      assurance: "Aesthetic Financing Core",
      procedures: ["Handcrafted multi-layer porcelain veneers", "Laser cool-blue desensitized teeth whitening", "Biomimetic dental crown re-shaping"]
    }
  ];

  return (
    <section id="pricing-section" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-wider text-teal-600 uppercase font-sans">Transparent Financial Care</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mt-2 font-sans">
            Clear Restoration Investment
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-light font-sans">
            Review detailed medical care rates and interact with our payment estimator to calculate customized co-payments.
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-teal-500 to-teal-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Pricing Category Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {basicPricingCards.map((pCard, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl border border-slate-200/70 p-6 shadow-xs hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-teal-800 bg-teal-50 px-2 py-1 rounded-sm uppercase">
                  {pCard.category}
                </span>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-900 tracking-tight font-sans">
                    {pCard.costRange}
                  </span>
                  <span className="text-xs text-slate-400 font-sans">/ average range</span>
                </div>

                <div className="mt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{pCard.assurance}</span>
                </div>

                {/* List items */}
                <ul className="mt-6 space-y-3">
                  {pCard.procedures.map((proc, pIdx) => (
                    <li key={pIdx} className="flex gap-2.5 items-start text-xs text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                      <span className="leading-relaxed font-sans font-light">{proc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-4">
                <span className="text-[10px] text-zinc-400 font-sans">*Final treatment quote provided after oral scan confirmation.</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Payment EMI Estimator */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200/60 p-6 sm:p-10 text-left">
          <div className="flex items-center gap-2 mb-8 border-b border-slate-200 pb-4">
            <Calculator className="h-5 w-5 text-teal-600" />
            <h3 className="text-base font-semibold text-slate-800 font-sans uppercase tracking-wider">
              Chatpata Copayment & EMI Estimator
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Input Sliders side */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Slider 1: estimated quote */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1 text-slate-500 font-sans"><Wallet className="h-4 w-4" /> Treatment Fee Scope</span>
                  <span className="text-slate-900 font-mono text-sm">${totalCost.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="100"
                  value={totalCost}
                  onChange={(e) => setTotalCost(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600 mt-3"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>$500</span>
                  <span>$5,000</span>
                  <span>$10,000</span>
                </div>
              </div>

              {/* Slider 2: insurance ratio */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1 text-slate-500 font-sans"><Scale className="h-4 w-4" /> Insurance Coverage Ratio</span>
                  <span className="text-slate-900 font-mono text-sm">{insuranceCoverage}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  step="5"
                  value={insuranceCoverage}
                  onChange={(e) => setInsuranceCoverage(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600 mt-3"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>0% (Self finance)</span>
                  <span>40%</span>
                  <span>80% (Max deductible)</span>
                </div>
              </div>

              {/* Installments duration selector */}
              <div>
                <span className="text-xs font-semibold text-slate-500 font-sans">Amortization Period (Repayment term)</span>
                <div className="grid grid-cols-4 gap-3 mt-3">
                  {[6, 12, 18, 24].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setMonths(term)}
                      className={`py-2 p-3 font-mono text-xs font-bold rounded-xl border transition-all cursor-pointer ${months === term ? 'bg-slate-900 border-slate-900 text-white shadow-md' : 'bg-white border-slate-200 hover:border-slate-350 text-slate-700'}`}
                    >
                      {term} Months
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Results Output receipt card */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-lg flex flex-col justify-between shrink-0 space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-mono leading-none text-teal-800 font-bold bg-teal-50 px-2.5 py-1 rounded-sm uppercase">Interest-Free Amortization Scope</span>
                
                <div className="border-b border-slate-100 pb-3 mt-4">
                  <p className="text-xs text-slate-400 font-sans">Net Out-of-Pocket Cost (Co-payment)</p>
                  <p className="text-2xl font-bold text-slate-900 font-mono mt-1 flex items-center">
                    <DollarSign className="h-5 w-5 text-slate-400" />
                    {Math.round(netEstimatedCost).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 font-sans">Estimated Monthly EMI</p>
                  <p className="text-3xl font-extrabold text-teal-700 font-mono mt-1.5 flex items-center">
                    <DollarSign className="h-6 w-6 text-teal-600 shrink-0" />
                    {Math.round(estimatedEMI).toLocaleString()}
                    <span className="text-xs font-semibold font-sans text-slate-400 normal-case ml-1.5 font-normal">/ month</span>
                  </p>
                </div>
              </div>

              {/* Badges assurances */}
              <div className="bg-emerald-500/[0.04] border border-emerald-500/10 rounded-xl p-3 text-xs text-emerald-800 leading-normal flex items-start gap-2.5">
                <Banknote className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="font-sans font-normal">
                  <strong className="font-semibold">0% APR Promotion</strong>: Enjoy completely interest-free dental installments when routed through CareCredit clinical codes.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
