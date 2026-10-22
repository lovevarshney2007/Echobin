"use client";

import React, { useState } from "react";

type StakeholderTab = "campus" | "rwa" | "commercial";

export default function ProblemAndMarketMatrix() {
  const [activeTab, setActiveTab] = useState<StakeholderTab>("campus");
  const [activeExistingSolution, setActiveExistingSolution] = useState<number>(0);

  const existingSolutions = [
    {
      title: "Private Hauling Trucks",
      subtitle: "The 'Kachra Thekedaar' Model",
      icon: "local_shipping",
      tag: "Pure Financial Drain",
      flaw: "Colleges and societies pay ₹50,000 to ₹1,50,000 monthly for diesel haulers. Over 70% of hauled weight is pure water in wet food. Under SWM Rules 2016, municipal dumping yards are now refusing unsegregated loads.",
      hiddenCrime: "When hauling costs escalate, rogue contractors secretly set fire to garbage heaps behind boundary walls at midnight to make piles disappear.",
      ecoBinAdvantage: "Processes wet organics 100% in-situ. Eliminates 60% of truck haulage volume and ends midnight illegal fires.",
    },
    {
      title: "Manual 2-Bin System",
      subtitle: "Green & Blue Colored Dustbins",
      icon: "delete_sweep",
      tag: "Human Compliance Failure",
      flaw: "Relies on human behavioral discipline. Error rates exceed 40% across student dining halls and apartment lobbies. A single spoonful of wet curry ruins an entire bag of dry recyclables.",
      hiddenCrime: "Sanitation workers refuse to manually pick through soiled food waste. They dump both colored bins into the exact same collection cart.",
      ecoBinAdvantage: "Single mixed drop chute. Integrated ESP32-S3 computer vision + sensor fusion isolates dry packaging in <200 milliseconds.",
    },
    {
      title: "Open Composting Pits",
      subtitle: "Traditional Campus Pits & OWCs",
      icon: "compost",
      tag: "The Compost Trap & Stench",
      flaw: "In summer and monsoons, pits turn anaerobic, breeding flies, cockroaches, and unbearable odors. A stray plastic fork or ketchup pouch breaks mechanical shredder teeth.",
      hiddenCrime: "A 1,000-student hostel generates tons of compost monthly. Campuses have no space to use it, and local farmers refuse contaminated campus compost.",
      ecoBinAdvantage: "Airtight negative-pressure biodigestion creates Free Cooking Biogas consumed immediately on-site, plus odorless liquid fertilizer.",
    },
    {
      title: "Conventional Biogas",
      subtitle: "Gobar-Gas Floating Balloons",
      icon: "propane_tank",
      tag: "Digester Souring & Choking",
      flaw: "Indian food is high in oil, spices, and citrus. Without active pH telemetry, volatile fatty acids build up, killing methanogens within weeks and emitting rotten-egg H2S stench.",
      hiddenCrime: "Large vegetable stalks and bones choke intake pipes. Open rubber balloons lack safety shut-off solenoids, creating severe fire hazards near residential areas.",
      ecoBinAdvantage: "High-torque stainless-steel maceration (<2mm slurry) + real-time pH telemetry with auto NaHCO3 buffer dosing and fail-closed safety solenoids.",
    },
  ];

  return (
    <div className="space-y-16">
      {/* ================= 1. THE 3 BRUTAL GROUND REALITIES ================= */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-xs font-mono text-red-600 font-bold uppercase tracking-wider">
            THE UNFILTERED GROUND REALITY
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight mb-3">
          The 3 Systemic Breakdowns in Urban Waste
        </h3>
        <p className="text-sm text-on-surface-variant max-w-3xl leading-relaxed mb-8">
          The waste crisis is not an absence of recycling factories—it is the fatal failure of
          source segregation at the exact second waste is discarded.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Reality 1 */}
          <div className="p-6 rounded-xl bg-surface-container-lowest border border-outline-variant shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-red-400/50 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full pointer-events-none"></div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-mono text-sm font-bold mb-4">
                01
              </div>
              <span className="text-[11px] font-mono uppercase text-red-600 font-bold tracking-wider block mb-1">
                BEHAVIORAL FAILURE
              </span>
              <h4 className="text-lg font-bold text-on-surface mb-2">
                Human Segregation Fails &gt;40% of the Time
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                Asking students or flat residents to sort garbage fails universally. When wet food
                touches plastic and cardboard, <strong className="text-on-surface">over 80% of recyclable material value is permanently destroyed</strong>,
                and traditional biodigesters choke on plastic films.
              </p>
            </div>
            <div className="pt-3 border-t border-outline-variant/60 font-mono text-[11px] text-red-700 font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">close</span>
              <span>Colored Bins Are a ₹1,000 Illusion</span>
            </div>
          </div>

          {/* Reality 2 */}
          <div className="p-6 rounded-xl bg-surface-container-lowest border border-outline-variant shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/50 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none"></div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-mono text-sm font-bold mb-4">
                02
              </div>
              <span className="text-[11px] font-mono uppercase text-amber-700 font-bold tracking-wider block mb-1">
                THE TOXIC SHORTCUT
              </span>
              <h4 className="text-lg font-bold text-on-surface mb-2">
                Midnight Open-Air Garbage Burning
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                To avoid landfill tipping fees and diesel haulage, contractors often set fire to
                garbage heaps behind campus boundary walls at night. Burning mixed plastic and food
                releases <strong className="text-on-surface">carcinogenic Dioxins, Furans, and PM2.5</strong>,
                causing respiratory distress and risking ₹50,000 NGT fines.
              </p>
            </div>
            <div className="pt-3 border-t border-outline-variant/60 font-mono text-[11px] text-amber-800 font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
              <span>Severe Cancer Hazard &amp; NGT Penalties</span>
            </div>
          </div>

          {/* Reality 3 */}
          <div className="p-6 rounded-xl bg-surface-container-lowest border border-outline-variant shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-primary/50 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none"></div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-mono text-sm font-bold mb-4">
                03
              </div>
              <span className="text-[11px] font-mono uppercase text-primary font-bold tracking-wider block mb-1">
                FINANCIAL BLEEDING
              </span>
              <h4 className="text-lg font-bold text-on-surface mb-2">
                Hauling Fees &amp; LPG Cylinder Inflation
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                Colleges and RWAs pay ₹60,000 to ₹1.5 Lakhs every single month to haul water-dense
                food waste away, while burning through dozens of expensive commercial LPG cylinders
                (₹2,000/cylinder) to cook meals. They pay twice: once to buy energy, and once to throw it away.
              </p>
            </div>
            <div className="pt-3 border-t border-outline-variant/60 font-mono text-[11px] text-primary font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">payments</span>
              <span>₹1.5 Lakhs+ Monthly Burning Expense</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 2. TARGET CUSTOMER & BUYER MATRIX ================= */}
      <div className="p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-outline-variant">
          <div>
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider block mb-1">
              B2B BEACHHEAD &amp; BUYER PERSONAS
            </span>
            <h3 className="text-2xl font-extrabold text-on-surface tracking-tight">
              Who Suffers vs. Who Pays (The Economic Buyer)
            </h3>
          </div>

          {/* Persona Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-surface-container-low border border-outline-variant font-mono text-xs">
            <button
              onClick={() => setActiveTab("campus")}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeTab === "campus"
                  ? "bg-primary-container text-on-primary font-bold shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              1. Campus Canteens [Beachhead]
            </button>
            <button
              onClick={() => setActiveTab("rwa")}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeTab === "rwa"
                  ? "bg-primary-container text-on-primary font-bold shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              2. Gated Societies [RWAs]
            </button>
            <button
              onClick={() => setActiveTab("commercial")}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeTab === "commercial"
                  ? "bg-primary-container text-on-primary font-bold shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              3. Commercial Food Courts
            </button>
          </div>
        </div>

        {/* Dynamic Tab Body */}
        {activeTab === "campus" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-primary-fixed/30 text-primary font-mono text-xs font-bold uppercase border border-primary/20">
                Primary Beachhead: AKGEC Campus Testbed
              </div>
              <h4 className="text-xl font-bold text-on-surface">
                University Hostels &amp; Institutional Dining Halls
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Hostels house 1,000 to 3,000 students generating 150 to 400 kg of daily bulk plate waste.
                Decision-making is centralized (Campus Director / Estate Officer), eliminating long committee voting cycles.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant">
                  <span className="text-[10px] font-mono text-secondary uppercase block">The End User</span>
                  <span className="text-xs font-bold text-on-surface block mt-1">Hostel Student</span>
                  <p className="text-[11px] text-on-surface-variant mt-1">
                    Wants zero touch, zero badbu near plate drop, and no stray dog terror at night.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant">
                  <span className="text-[10px] font-mono text-secondary uppercase block">The Economic Buyer</span>
                  <span className="text-xs font-bold text-primary block mt-1">Campus Director / Dean</span>
                  <p className="text-[11px] text-on-surface-variant mt-1">
                    Wants zero municipal fines (SWM 2016), A++ Green Campus NAAC scores, and reduced mess gas bills.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant">
                  <span className="text-[10px] font-mono text-secondary uppercase block">The Beneficiary</span>
                  <span className="text-xs font-bold text-on-surface block mt-1">Canteen Contractor</span>
                  <p className="text-[11px] text-on-surface-variant mt-1">
                    Gets free cooking biogas on-site to boil tea and cook breakfast, cutting 30+ LPG cylinders/month.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-5 rounded-xl bg-surface-container border border-outline-variant font-mono text-xs space-y-3">
              <span className="text-primary font-bold uppercase block tracking-wider text-[11px]">
                CAMPUS UNIT ECONOMICS &amp; PAYBACK
              </span>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/60">
                <span className="text-secondary">Average Daily Plate Waste:</span>
                <span className="font-bold text-on-surface">250 kg/day</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/60">
                <span className="text-secondary">Current Monthly Hauling Bill:</span>
                <span className="font-bold text-red-600">₹45,000 / mo</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/60">
                <span className="text-secondary">Commercial LPG Replaced:</span>
                <span className="font-bold text-primary">~28 Cylinders (₹56,000/mo)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/60">
                <span className="text-secondary">Total Monthly Savings:</span>
                <span className="font-bold text-primary">₹75,000 – ₹1,00,000 / mo</span>
              </div>
              <div className="p-3 rounded bg-primary-fixed/20 border border-primary/30 text-on-surface font-sans text-xs">
                <strong className="font-mono text-primary font-bold">Payback Period: 16 – 20 Months</strong>
                <p className="text-[11px] text-on-surface-variant mt-0.5">
                  Full capital hardware recovery via fuel displacement + avoided waste transport fees.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "rwa" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 font-mono text-xs font-bold uppercase border border-amber-300">
                Secondary Scaled Market: High-Rise Societies
              </div>
              <h4 className="text-xl font-bold text-on-surface">
                Gated Residential Societies (RWAs &amp; HOAs)
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                200 to 1,200+ flat apartment townships with dedicated maintenance funds. The RWA Management
                Committee faces constant resident complaints over dumpster stench and increasing municipal penalty threats.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant">
                  <span className="text-[10px] font-mono text-secondary uppercase block">The End User</span>
                  <span className="text-xs font-bold text-on-surface block mt-1">Flat Residents &amp; Maids</span>
                  <p className="text-[11px] text-on-surface-variant mt-1">
                    Careless mixed disposal; wants odorless utility rooms and clean basement collection areas.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant">
                  <span className="text-[10px] font-mono text-secondary uppercase block">The Economic Buyer</span>
                  <span className="text-xs font-bold text-primary block mt-1">RWA President / Board</span>
                  <p className="text-[11px] text-on-surface-variant mt-1">
                    Controls ₹15L–₹40L monthly maintenance budget; desperate to slash hauling bills and avoid BWG fines.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant">
                  <span className="text-[10px] font-mono text-secondary uppercase block">Community Value</span>
                  <span className="text-xs font-bold text-on-surface block mt-1">Clubhouse &amp; Gardens</span>
                  <p className="text-[11px] text-on-surface-variant mt-1">
                    Free cooking gas for clubhouse cafeterias and free pathogen-safe liquid fertilizer for society parks.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-5 rounded-xl bg-surface-container border border-outline-variant font-mono text-xs space-y-3">
              <span className="text-primary font-bold uppercase block tracking-wider text-[11px]">
                500-FLAT SOCIETY UNIT ECONOMICS
              </span>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/60">
                <span className="text-secondary">Average Daily Organic Waste:</span>
                <span className="font-bold text-on-surface">350 kg/day</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/60">
                <span className="text-secondary">Current Private Hauling Contract:</span>
                <span className="font-bold text-red-600">₹80,000 / mo</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/60">
                <span className="text-secondary">Clean Recyclable Bales Sold:</span>
                <span className="font-bold text-primary">+₹12,000 / mo</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/60">
                <span className="text-secondary">Net Monthly Operating Gain:</span>
                <span className="font-bold text-primary">₹65,000 / mo</span>
              </div>
              <div className="p-3 rounded bg-primary-fixed/20 border border-primary/30 text-on-surface font-sans text-xs">
                <strong className="font-mono text-primary font-bold">Payback Period: 18 – 24 Months</strong>
                <p className="text-[11px] text-on-surface-variant mt-0.5">
                  Protects RWA against municipal BWG fines (₹50k) and eliminates foul dumpster room odors.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "commercial" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-secondary-container text-on-secondary-container font-mono text-xs font-bold uppercase border border-outline-variant">
                Enterprise Segment: Corporate Tech Parks &amp; Malls
              </div>
              <h4 className="text-xl font-bold text-on-surface">
                IT Parks, Tech Campuses &amp; Commercial Food Courts
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                High-density commercial hubs (Infosys, TCS, DLF CyberCity) generating 300 to 1,000 kg of daily cafeteria scraps.
                Driven by corporate Net-Zero mandates, ESG auditing, and ISO 14001 environmental compliance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant">
                  <span className="text-[10px] font-mono text-secondary uppercase block">The End User</span>
                  <span className="text-xs font-bold text-on-surface block mt-1">Office Employees</span>
                  <p className="text-[11px] text-on-surface-variant mt-1">
                    Fast cafeteria turnover; expects clean, modern, touchless automated disposal kiosks.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant">
                  <span className="text-[10px] font-mono text-secondary uppercase block">The Economic Buyer</span>
                  <span className="text-xs font-bold text-primary block mt-1">Facility Operations &amp; ESG</span>
                  <p className="text-[11px] text-on-surface-variant mt-1">
                    Requires automated telemetry for annual sustainability disclosures and carbon credit accounting.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant">
                  <span className="text-[10px] font-mono text-secondary uppercase block">Procurement Model</span>
                  <span className="text-xs font-bold text-on-surface block mt-1">RaaS (Zero-CapEx)</span>
                  <p className="text-[11px] text-on-surface-variant mt-1">
                    Monthly subscription financed directly through existing waste management operational budgets.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-5 rounded-xl bg-surface-container border border-outline-variant font-mono text-xs space-y-3">
              <span className="text-primary font-bold uppercase block tracking-wider text-[11px]">
                CORPORATE ESG &amp; CARBON OFFSET VALUE
              </span>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/60">
                <span className="text-secondary">Average Daily Organic Waste:</span>
                <span className="font-bold text-on-surface">500 kg/day</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/60">
                <span className="text-secondary">Annual Methane Offset:</span>
                <span className="font-bold text-primary">~18.2 Tons CO2e</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/60">
                <span className="text-secondary">Landfill Haulage Diverted:</span>
                <span className="font-bold text-primary">180+ Tons / Year</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/60">
                <span className="text-secondary">Compliance Certification:</span>
                <span className="font-bold text-on-surface">ISO 14001 &amp; SWM 2016</span>
              </div>
              <div className="p-3 rounded bg-primary-fixed/20 border border-primary/30 text-on-surface font-sans text-xs">
                <strong className="font-mono text-primary font-bold">RaaS Subscription: Net Cash Positive</strong>
                <p className="text-[11px] text-on-surface-variant mt-0.5">
                  Monthly fee is 25% lower than current tipping &amp; logistics invoices, saving money from Month 1.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= 3. EXISTING SOLUTIONS INTERACTIVE COMPARISON ================= */}
      <div>
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">
            COMPETITIVE BENCHMARKING
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight mt-1 mb-2">
            Why Current Existing Solutions Consistently Fail
          </h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Click on each existing alternative to see the ground-level point of failure and how EcoBin fixes it.
          </p>
        </div>

        {/* Existing Solutions Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {existingSolutions.map((sol, index) => (
            <button
              key={sol.title}
              onClick={() => setActiveExistingSolution(index)}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                activeExistingSolution === index
                  ? "bg-surface-container-lowest border-primary shadow-sm ring-1 ring-primary/30"
                  : "bg-surface-container-low border-outline-variant hover:bg-surface-container"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    activeExistingSolution === index ? "text-primary" : "text-secondary"
                  }`}
                >
                  {sol.icon}
                </span>
                <span className="text-[10px] font-mono uppercase text-secondary font-bold tracking-wider">
                  Option 0{index + 1}
                </span>
              </div>
              <h5 className="text-sm font-bold text-on-surface mb-0.5">{sol.title}</h5>
              <span className="text-[11px] text-on-surface-variant block truncate">{sol.subtitle}</span>
            </button>
          ))}
        </div>

        {/* Detailed Breakdown Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-100 text-red-700 font-mono text-xs font-bold uppercase border border-red-200">
                <span className="material-symbols-outlined text-[14px]">warning</span>
                <span>{existingSolutions[activeExistingSolution].tag}</span>
              </div>
              <h4 className="text-2xl font-extrabold text-on-surface">
                {existingSolutions[activeExistingSolution].title}
                <span className="text-sm text-secondary font-normal font-mono ml-2">
                  ({existingSolutions[activeExistingSolution].subtitle})
                </span>
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {existingSolutions[activeExistingSolution].flaw}
              </p>

              <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-900 text-xs font-sans">
                <strong className="font-mono text-red-700 block mb-1">
                  ⚠️ The Hidden Ground-Level Reality:
                </strong>
                <p className="text-[11px] leading-relaxed">
                  {existingSolutions[activeExistingSolution].hiddenCrime}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-xl bg-primary-fixed/20 border border-primary/30 space-y-3">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>The EcoBin Advantage</span>
              </div>
              <p className="text-xs text-on-surface font-semibold leading-relaxed">
                {existingSolutions[activeExistingSolution].ecoBinAdvantage}
              </p>
              <div className="pt-3 border-t border-primary/20 flex items-center justify-between font-mono text-[11px] text-primary font-bold">
                <span>Result:</span>
                <span>Zero Landfill · Free Energy · 18M ROI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
