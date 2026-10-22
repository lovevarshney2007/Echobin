"use client";

import React, { useState } from "react";

export default function AkgecPedigreeBanner() {
  const [activeTab, setActiveTab] = useState<"budget" | "roadmap" | "compliance">("roadmap");

  return (
    <div className="w-full bg-surface-container-low rounded-xl border border-outline-variant p-6 lg:p-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Academic Pedigree & Leadership */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase font-bold">
            <span className="material-symbols-outlined text-[18px]">school</span>
            <span>ACADEMIC INCUBATION &amp; VALIDATION</span>
          </div>
          <h3 className="text-2xl font-extrabold text-on-surface">
            Engineered at AKGEC Labs, Ghaziabad
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Founded by <strong>Akshi Rani</strong> (B.Tech AIML, 3rd Year), EcoBin bridges embedded edge computer vision with
            applied biochemical reactor engineering. Developed in direct collaboration with campus automation laboratories
            and municipal sanitation engineers.
          </p>

          <div className="p-3.5 rounded-lg bg-surface-container-lowest border border-outline-variant">
            <span className="text-[10px] font-mono text-primary font-bold uppercase block mb-1">
              PRE-INCUBATION VALIDATION GRANT ASK
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold font-mono text-on-surface">₹2.5 Lakhs</span>
              <span className="text-xs font-mono text-on-surface-variant">Prototype &amp; Bench Testing</span>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1">
              Granted for multi-sensor segregation validation, 20L kinetic pilot, and AKGEC student canteen trials.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px] font-mono text-secondary">
            <span className="px-2.5 py-1 rounded bg-surface-container border border-outline-variant">
              Founder: Akshi Rani (AIML)
            </span>
            <span className="px-2.5 py-1 rounded bg-surface-container border border-outline-variant">
              SWM Rules 2016 Compliant
            </span>
            <span className="px-2.5 py-1 rounded bg-surface-container border border-outline-variant">
              ISO 14001 Standards
            </span>
          </div>
        </div>

        {/* Right Column: Tabbed View (Roadmap / Budget / Compliance) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl border border-outline-variant p-6 flex flex-col justify-between">
          <div>
            {/* Tab navigation */}
            <div className="flex items-center gap-2 border-b border-outline-variant pb-3 mb-4 text-xs font-mono">
              <button
                onClick={() => setActiveTab("roadmap")}
                className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                  activeTab === "roadmap"
                    ? "bg-primary-container text-on-primary shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                4-Phase Milestone Roadmap
              </button>
              <button
                onClick={() => setActiveTab("budget")}
                className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                  activeTab === "budget"
                    ? "bg-primary-container text-on-primary shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                ₹2.5L Grant Budget Allocation
              </button>
              <button
                onClick={() => setActiveTab("compliance")}
                className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                  activeTab === "compliance"
                    ? "bg-primary-container text-on-primary shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                SWM 2016 Mandate
              </button>
            </div>

            {/* Tab 1: Roadmap */}
            {activeTab === "roadmap" && (
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-surface-container border border-outline-variant">
                  <div className="flex items-center justify-between text-primary font-bold mb-1">
                    <span>PHASE 1: BENCHTOP VALIDATION</span>
                    <span>MONTHS 0 – 3</span>
                  </div>
                  <p className="text-on-surface-variant text-[11px] font-sans">
                    Camera &amp; multi-sensor segregation logic tested on mixed waste in AKGEC college lab. Proves real-time plastic vs. organic food separation.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-surface-container border border-outline-variant">
                  <div className="flex items-center justify-between text-primary font-bold mb-1">
                    <span>PHASE 2: LAB-SCALE 20L TESTING</span>
                    <span>MONTHS 3 – 6</span>
                  </div>
                  <p className="text-on-surface-variant text-[11px] font-sans">
                    Mechanical maceration kinetics &amp; automated pH buffer calibration under steady 37.2°C mesophilic conditions.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-surface-container border border-outline-variant">
                  <div className="flex items-center justify-between text-primary font-bold mb-1">
                    <span>PHASE 3: AKGEC HOSTEL CANTEEN PILOT</span>
                    <span>MONTHS 6 – 12</span>
                  </div>
                  <p className="text-on-surface-variant text-[11px] font-sans">
                    Prototype deployment with real-world bulk dining scraps; cooking gas piped into student mess kitchen.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-surface-container border border-outline-variant">
                  <div className="flex items-center justify-between text-primary font-bold mb-1">
                    <span>PHASE 4: DFM &amp; COMMERCIAL EXPANSION</span>
                    <span>MONTHS 12+</span>
                  </div>
                  <p className="text-on-surface-variant text-[11px] font-sans">
                    Design for Manufacturing (DFM) optimizations, CE/UL certifications, and rollout across 1,200+ gated residential complexes.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Budget Allocation */}
            {activeTab === "budget" && (
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-surface-container border border-outline-variant flex items-center justify-between">
                  <div>
                    <span className="font-bold text-on-surface block">Development Hardware (40%)</span>
                    <span className="text-[11px] text-on-surface-variant font-sans">
                      ESP32-S3 boards, camera modules, industrial moisture/metal sensors, servos
                    </span>
                  </div>
                  <span className="font-bold text-primary text-sm">₹1,00,000</span>
                </div>

                <div className="p-3 rounded-lg bg-surface-container border border-outline-variant flex items-center justify-between">
                  <div>
                    <span className="font-bold text-on-surface block">Mechanical Fabrication (30%)</span>
                    <span className="text-[11px] text-on-surface-variant font-sans">
                      Acrylic drop chute, test macerator blade assembly, laboratory enclosures
                    </span>
                  </div>
                  <span className="font-bold text-primary text-sm">₹75,000</span>
                </div>

                <div className="p-3 rounded-lg bg-surface-container border border-outline-variant flex items-center justify-between">
                  <div>
                    <span className="font-bold text-on-surface block">Lab Testing &amp; Safety (20%)</span>
                    <span className="text-[11px] text-on-surface-variant font-sans">
                      Reagents, pH buffer calibration solutions, safety isolation solenoids
                    </span>
                  </div>
                  <span className="font-bold text-primary text-sm">₹50,000</span>
                </div>

                <div className="p-3 rounded-lg bg-surface-container border border-outline-variant flex items-center justify-between">
                  <div>
                    <span className="font-bold text-on-surface block">Consumables &amp; Analytical (10%)</span>
                    <span className="text-[11px] text-on-surface-variant font-sans">
                      Wiring harnesses, testing consumables, analytical lab reporting
                    </span>
                  </div>
                  <span className="font-bold text-primary text-sm">₹25,000</span>
                </div>
              </div>
            )}

            {/* Tab 3: SWM 2016 Compliance */}
            {activeTab === "compliance" && (
              <div className="space-y-3 text-xs text-on-surface-variant leading-relaxed">
                <div className="p-3 rounded-lg bg-primary-fixed/20 border border-primary/30 text-primary font-mono font-bold">
                  Solid Waste Management (SWM) Rules, 2016 — Ministry of Environment, Forest &amp; Climate Change
                </div>
                <p>
                  <strong>Rule 4(7) Bulk Waste Generator Mandate:</strong> All resident welfare associations, gated communities,
                  and institutional establishments with an area &gt;5,000 sq.m or generating &gt;100 kg/day of solid waste
                  are legally required to segregate waste at source and facilitate on-site bio-degradable waste processing.
                </p>
                <p>
                  <strong>Municipal Haulage Penalties:</strong> Urban Local Bodies (ULBs) impose progressive non-compliance fines
                  (₹5,000 – ₹50,000 per violation) and refuse unsegregated municipal pickup. EcoBin ensures 100% on-site compliance
                  while eliminating hauling expenses.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-outline-variant text-[11px] font-mono text-on-surface-variant flex items-center justify-between">
            <span>INSTITUTION: AKGEC GHAZIABAD</span>
            <span className="text-primary font-bold">B.TECH AIML 3RD YEAR</span>
          </div>
        </div>
      </div>
    </div>
  );
}
