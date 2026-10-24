"use client";

import React, { useState } from "react";

type WasteScenarioKey = "metal" | "dry_paper" | "soiled_paper" | "acidic_food" | "greasy_plastic";

export default function PrototypeValidationSuite() {
  const [selectedScenario, setSelectedScenario] = useState<WasteScenarioKey>("metal");

  const scenarios: Record<
    WasteScenarioKey,
    {
      name: string;
      icon: string;
      headline: string;
      detectionTime: string;
      sensorAction: string;
      mechanicalAction: string;
      biologicalOutcome: string;
      safetyFailSafe: string;
      tagColor: string;
    }
  > = {
    metal: {
      name: "Steel Spoon / Loha / Iron Nail",
      icon: "hardware",
      headline: "Ferromagnetic & Non-Ferrous Metal Cutlery",
      detectionTime: "<5 ms (Instant Eddy Current)",
      sensorAction:
        "The Inductive Proximity Sensor coil mounted beneath the intake tray detects magnetic permeability shift, even if the metal spoon is completely buried under dal and rice.",
      mechanicalAction:
        "ESP32-S3 instantly fires the high-torque servo gate, diverting the cutlery away from the macerator into the dedicated Metal Scrap Bin.",
      biologicalOutcome:
        "Zero foreign metal enters the anaerobic digester. Cutlery can be reclaimed by canteen staff.",
      safetyFailSafe:
        "Current-Spike Overload Trip: In a 0.01% freak case where metal touches blades, motor current spikes, triggering a 10ms power cutoff with automated reverse rotation to prevent blade fracture.",
      tagColor: "bg-red-100 text-red-700 border-red-200",
    },
    dry_paper: {
      name: "Dry Paper & Cardboard",
      icon: "newspaper",
      headline: "Clean Cardboard Boxes & Envelopes",
      detectionTime: "<120 ms (Moisture & Optical Fusion)",
      sensorAction:
        "Capacitive moisture probe registers dielectric permittivity indicating low moisture (<15%), while the camera detects flat, fibrous geometric contours.",
      mechanicalAction:
        "Dynamic sorting gate routes the dry paper into the Dry Recyclables compartment, keeping it uncontaminated.",
      biologicalOutcome:
        "Bypasses the biodigester entirely to preserve fiber length for paper recycling mills.",
      safetyFailSafe:
        "Clean, dry paper is compressed into high-density bales and sold at premium rates to industrial paper recyclers.",
      tagColor: "bg-blue-100 text-blue-700 border-blue-200",
    },
    soiled_paper: {
      name: "Soiled Food Napkin / Gravy Tissue",
      icon: "cleaning_services",
      headline: "Wet Tissues Soaked in Dal or Oil",
      detectionTime: "<140 ms (High-Moisture Organic Class)",
      sensorAction:
        "Optical bounding classifies napkin texture while moisture probes detect >70% liquid saturation from food contact.",
      mechanicalAction:
        "Sorting gate directs the soiled tissue into the high-torque macerator along with food scraps.",
      biologicalOutcome:
        "Paper is 100% natural Cellulose (C6H10O5). Macerator shears it into a <2mm micro-pulp. In the biodigester, cellulose provides valuable organic Carbon, optimizing the Carbon-to-Nitrogen (C:N) ratio and INCREASING biogas yield!",
      safetyFailSafe:
        "Cellulose enzymatically breaks down within 72 hours; leaves zero synthetic residue in the organic fertilizer.",
      tagColor: "bg-green-100 text-green-700 border-green-200",
    },
    acidic_food: {
      name: "Acidic Citrus & Spiced Curry",
      icon: "restaurant",
      headline: "Lemon Peels, Tomato Gravies & Indian Spices",
      detectionTime: "Continuous Real-Time Telemetry",
      sensorAction:
        "Slurry tank digital pH sensor detects volatile fatty acid buildup when pH drops below 6.5.",
      mechanicalAction:
        "Automated peristaltic micro-pump actuates, dosing precise milligrams of Sodium Bicarbonate (NaHCO3) alkaline buffer.",
      biologicalOutcome:
        "Stabilizes methanogenic equilibrium, preventing biological 'souring' (acid death) that causes conventional biogas plants to fail.",
      safetyFailSafe:
        "Failsafe high/low pH alarms alert the facility dashboard if buffer levels run low.",
      tagColor: "bg-amber-100 text-amber-800 border-amber-200",
    },
    greasy_plastic: {
      name: "Greasy Plastic Takeout Box",
      icon: "takeout_dining",
      headline: "Soiled Zomato/Swiggy Polypropylene Containers",
      detectionTime: "<160 ms (Multi-Sensor Fusion)",
      sensorAction:
        "Camera classifies container geometry while weight sensors detect lightweight hollow shell. Moisture sensor differentiates surface grease from internal water mass.",
      mechanicalAction:
        "Air-knife scraper removes bulk surface food into organic chute; the rigid plastic container is routed to the Plastic Recycling Bin.",
      biologicalOutcome:
        "Plastic is 100% barred from the anaerobic digester, ensuring organic fertilizer remains free of micro-plastics.",
      safetyFailSafe:
        "Camera lens is shielded behind a recessed sapphire glass window with an automated periodic air-puff nozzle to prevent grease blindness.",
      tagColor: "bg-purple-100 text-purple-700 border-purple-200",
    },
  };

  const budgetItems = [
    {
      category: "Development Hardware",
      amount: "₹1,00,000",
      pct: 40,
      color: "bg-primary",
      details: "ESP32-S3 boards, HD camera modules, inductive metal sensors, capacitive moisture probes, load cells, servo motors.",
    },
    {
      category: "Mechanical Fabrication",
      amount: "₹75,000",
      pct: 30,
      color: "bg-primary-container",
      details: "Stainless steel SS316 macerator blade assembly, acrylic drop chute, dynamic sorting gate chassis, lab test enclosures.",
    },
    {
      category: "Lab Testing & Safety",
      amount: "₹50,000",
      pct: 20,
      color: "bg-amber-600",
      details: "20L anaerobic test digester, digital pH telemetry, peristaltic buffer micro-pumps, activated carbon filters, solenoid valves.",
    },
    {
      category: "Consumables & Reporting",
      amount: "₹25,000",
      pct: 10,
      color: "bg-secondary",
      details: "Industrial wiring, high-pressure silicone tubing, buffer chemicals, sensor calibration solutions, analytical reporting.",
    },
  ];

  return (
    <div className="space-y-16">
      {/* ================= 1. INTERACTIVE HARDWARE EDGE-CASE SIMULATOR ================= */}
      <div className="p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant shadow-xs">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">
              HARDWARE &amp; LOGIC VALIDATION
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight mb-2">
            Interactive Hardware Edge-Case Simulator
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Startup evaluators always ask: <em>&quot;What happens when someone drops a steel spoon, wet paper, or acidic curry?&quot;</em>
            Select an item below to see the exact multi-sensor logic, mechanical routing, and biological protection in action.
          </p>
        </div>

        {/* Item Selector Chips */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {(Object.keys(scenarios) as WasteScenarioKey[]).map((key) => {
            const sc = scenarios[key];
            const isSelected = selectedScenario === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedScenario(key)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-primary-container text-on-primary border-primary shadow-xs scale-102"
                    : "bg-surface-container-low text-on-surface border-outline-variant hover:bg-surface-container"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{sc.icon}</span>
                <span>{sc.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Scenario Breakdown */}
        {(() => {
          const current = scenarios[selectedScenario];
          return (
            <div className="p-6 sm:p-8 rounded-xl bg-surface-container-low border border-outline-variant">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-outline-variant/60">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase border ${current.tagColor}`}>
                      SIMULATED TEST ITEM
                    </span>
                    <span className="text-xs font-mono text-secondary">
                      Latency: <strong className="text-primary font-bold">{current.detectionTime}</strong>
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">{current.icon}</span>
                    <span>{current.headline}</span>
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Step 1: Sensor & Mechanical */}
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-surface-container-lowest border border-outline-variant">
                    <span className="text-[10px] font-mono uppercase text-secondary font-bold block mb-1">
                      STEP 1: SENSOR PERCEPTION
                    </span>
                    <p className="text-xs text-on-surface leading-relaxed">
                      {current.sensorAction}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-surface-container-lowest border border-outline-variant">
                    <span className="text-[10px] font-mono uppercase text-secondary font-bold block mb-1">
                      STEP 2: MECHANICAL ACTUATION &amp; ROUTING
                    </span>
                    <p className="text-xs text-on-surface leading-relaxed">
                      {current.mechanicalAction}
                    </p>
                  </div>
                </div>

                {/* Step 2: Biological & Failsafe */}
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-surface-container-lowest border border-outline-variant">
                    <span className="text-[10px] font-mono uppercase text-primary font-bold block mb-1">
                      STEP 3: BIOLOGICAL &amp; YIELD OUTCOME
                    </span>
                    <p className="text-xs text-on-surface leading-relaxed">
                      {current.biologicalOutcome}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-surface-container-lowest border border-outline-variant">
                    <span className="text-[10px] font-mono uppercase text-red-600 font-bold block mb-1">
                      STEP 4: HARDWARE FAILSAFE PROTECTION
                    </span>
                    <p className="text-xs text-on-surface leading-relaxed">
                      {current.safetyFailSafe}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* ================= 2. PROTOTYPE BUDGET & GRANT BREAKDOWN ================= */}
      <div className="p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant shadow-xs">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">
              PRE-INCUBATION VALIDATION GRANT
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight mb-2">
            Prototype Build &amp; Bench Validation Budget: ₹2.5 Lakhs
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Transparent, audited capital allocation for physical hardware fabrication, sensor fusion testing,
            and 20L laboratory anaerobic digester kinetics across academic and institutional living labs.
          </p>
        </div>

        {/* Visual Progress / Percentage Strip */}
        <div className="mb-6">
          <div className="h-4 w-full rounded-full overflow-hidden flex bg-surface-container">
            {budgetItems.map((item) => (
              <div
                key={item.category}
                style={{ width: `${item.pct}%` }}
                className={`${item.color} h-full transition-all`}
                title={`${item.category}: ${item.amount} (${item.pct}%)`}
              />
            ))}
          </div>
        </div>

        {/* Budget Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {budgetItems.map((item) => (
            <div
              key={item.category}
              className="p-5 rounded-xl bg-surface-container-low border border-outline-variant flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-primary">{item.pct}% ALLOCATION</span>
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                </div>
                <h5 className="text-base font-bold text-on-surface mb-1">{item.category}</h5>
                <span className="text-xl font-extrabold font-mono text-on-surface block mb-2">
                  {item.amount}
                </span>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  {item.details}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 4-Phase Validation Milestones */}
        <div className="p-6 rounded-xl bg-surface-container border border-outline-variant">
          <span className="text-xs font-mono font-bold uppercase text-primary tracking-wider block mb-4">
            4-PHASE ENGINEERING &amp; PILOT MILESTONES
          </span>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-3.5 rounded-lg bg-surface-container-lowest border border-outline-variant">
              <span className="text-primary font-bold block mb-1">PHASE 1 (M 0–3)</span>
              <strong className="text-on-surface block mb-1 font-sans">Lab Benchtop Validation</strong>
              <p className="text-[11px] text-on-surface-variant font-sans">
                Camera + moisture/metal sensor fusion logic tested on mixed canteen trash in pilot bench trials.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-surface-container-lowest border border-outline-variant">
              <span className="text-primary font-bold block mb-1">PHASE 2 (M 3–6)</span>
              <strong className="text-on-surface block mb-1 font-sans">20L Digester Kinetics</strong>
              <p className="text-[11px] text-on-surface-variant font-sans">
                High-torque mechanical maceration kinetics (&lt;2mm slurry) &amp; auto-pH buffer calibration.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-surface-container-lowest border border-outline-variant">
              <span className="text-primary font-bold block mb-1">PHASE 3 (M 6–12)</span>
              <strong className="text-on-surface block mb-1 font-sans">Campus Hostel Pilot</strong>
              <p className="text-[11px] text-on-surface-variant font-sans">
                Prototype deployed at university hostel canteen processing real-world 150–250 kg daily waste.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-surface-container-lowest border border-outline-variant">
              <span className="text-primary font-bold block mb-1">PHASE 4 (M 12+)</span>
              <strong className="text-on-surface block mb-1 font-sans">Commercial Scaling</strong>
              <p className="text-[11px] text-on-surface-variant font-sans">
                Design for Manufacturing (DFM) &amp; rollout across gated housing societies and colleges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
