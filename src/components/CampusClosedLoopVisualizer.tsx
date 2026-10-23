"use client";

import React, { useState, useEffect } from "react";

type InflowType = "mixed_plate" | "banana_peel" | "plastic_bottle" | "metal_spoon";

interface FlowStep {
  id: string;
  label: string;
  detail: string;
  activeNode: "tower" | "canteen" | "blue_pipe" | "green_pipe" | "digester" | "stove" | "fertilizer" | "baler";
}

export default function CampusClosedLoopVisualizer() {
  const [selectedInflow, setSelectedInflow] = useState<InflowType>("mixed_plate");
  const [isFlowActive, setIsFlowActive] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"architecture" | "product_hardware">("architecture");

  // Dynamic accumulated session stats
  const [sessionBiogasM3, setSessionBiogasM3] = useState<number>(3.84);
  const [sessionLpgSaved, setSessionLpgSaved] = useState<number>(365);
  const [sessionBaledKg, setSessionBaledKg] = useState<number>(14.2);
  const [sessionFertilizerBags, setSessionFertilizerBags] = useState<number>(8);

  const flowSteps: Record<InflowType, FlowStep[]> = {
    mixed_plate: [
      {
        id: "step-1",
        label: "1. Mixed Tray Drop",
        detail: "Student drops plate with dal-rice, gravy napkin, and plastic cup into Canteen Smart Segregation Node.",
        activeNode: "canteen",
      },
      {
        id: "step-2",
        label: "2. Edge-AI Split (<150ms)",
        detail: "ESP32-S3 sensor ring isolates plastic cup to Blue Pipe; shears food into micro-slurry for Green Pipe.",
        activeNode: "canteen",
      },
      {
        id: "step-3",
        label: "3. Dual Pipe Transport",
        detail: "Dry plastic flows through Blue Pipe to On-Site Baler. Wet slurry pumped through Green Pipe to Central Digester.",
        activeNode: "green_pipe",
      },
      {
        id: "step-4",
        label: "4. Dome Bioreactor Digestion",
        detail: "37.2°C mesophilic dome tank with motorized agitator hydrolyzes slurry into methane (CH4) biogas.",
        activeNode: "digester",
      },
      {
        id: "step-5",
        label: "5. On-Site Storage & Direct Consumption",
        detail: "Biogas pipe fuels Canteen cooking mess stove with clean blue flame. Pathogen-safe bio-fertilizer bagged for campus.",
        activeNode: "stove",
      },
    ],
    banana_peel: [
      {
        id: "step-1",
        label: "1. Tower Floor Ingestion",
        detail: "Resident drops fruit peels and leftover sabzi into Tower 4th Floor Smart Segregation Node.",
        activeNode: "tower",
      },
      {
        id: "step-2",
        label: "2. SS316 In-Situ Maceration",
        detail: "Intake shredder crushes peels into <1.8mm slurry with automatic warm greywater injection.",
        activeNode: "tower",
      },
      {
        id: "step-3",
        label: "3. Underground Slurry Pumping",
        detail: "Centralized Green Pipe conduit carries fluid organic slurry directly to Central Dome Digester.",
        activeNode: "green_pipe",
      },
      {
        id: "step-4",
        label: "4. Biogas Methanogenesis",
        detail: "Bacterial digestion yields 65% CH4 biogas, filtered through catalytic iron sponge scrubber (H2S < 2 ppm).",
        activeNode: "digester",
      },
      {
        id: "step-5",
        label: "5. Kitchen Fuel & Bio-Fertilizer",
        detail: "Biogas directly displaces commercial 19kg LPG cylinder in Canteen mess; rich mineral digestate bottled as fertilizer.",
        activeNode: "stove",
      },
    ],
    plastic_bottle: [
      {
        id: "step-1",
        label: "1. Recyclable Item Drop",
        detail: "Resident drops empty PET bottle and Amazon cardboard box into Smart Segregation Node.",
        activeNode: "tower",
      },
      {
        id: "step-2",
        label: "2. Dielectric Sensor Route",
        detail: "Capacitive moisture probe confirms <10% humidity. Diverter servo instantly flips to Blue Pipe stream.",
        activeNode: "blue_pipe",
      },
      {
        id: "step-3",
        label: "3. Pneumatic Baler Inflow",
        detail: "Blue Pipe delivers uncontaminated dry recyclables directly to on-site high-density baling press.",
        activeNode: "baler",
      },
      {
        id: "step-4",
        label: "4. Clean Baled Recyclables",
        detail: "Plastic and cardboard compacted into stackable 25kg commercial bales ready for premium industrial offtake.",
        activeNode: "baler",
      },
      {
        id: "step-5",
        label: "5. Zero Wet Contamination",
        detail: "Food digester remains 100% microplastic-free; recyclables retain >90% resale value.",
        activeNode: "baler",
      },
    ],
    metal_spoon: [
      {
        id: "step-1",
        label: "1. Accidental Cutlery Ingestion",
        detail: "A stainless-steel canteen spoon buried under rice grains drops into the intake slot.",
        activeNode: "canteen",
      },
      {
        id: "step-2",
        label: "2. Inductive Proximity Ping (5ms)",
        detail: "Inductive coil detects ferromagnetic shift in <5 milliseconds before touching macerator blades.",
        activeNode: "canteen",
      },
      {
        id: "step-3",
        label: "3. Mechanical Reject Actuation",
        detail: "180° servo gate deflects spoon away into the front Cutlery Reclaim Tray. Blades safe!",
        activeNode: "canteen",
      },
      {
        id: "step-4",
        label: "4. Zero Metal in Conduit",
        detail: "Neither green slurry pipe nor digester receives metal cutlery. Zero mechanical wear or breakdown.",
        activeNode: "digester",
      },
      {
        id: "step-5",
        label: "5. Cutlery Reclaimed",
        detail: "Canteen staff reclaims washed spoon for the mess, saving ₹3,500 replacement cutter repair.",
        activeNode: "canteen",
      },
    ],
  };

  const steps = flowSteps[selectedInflow];

  // Animated pipeline step runner
  const triggerFlowSimulation = async (type: InflowType) => {
    if (isFlowActive) return;
    setSelectedInflow(type);
    setIsFlowActive(true);
    setCurrentStepIndex(0);

    for (let i = 0; i < flowSteps[type].length; i++) {
      setCurrentStepIndex(i);
      await new Promise((res) => setTimeout(res, 1400));
    }

    // Accumulate metrics
    if (type === "mixed_plate" || type === "banana_peel") {
      setSessionBiogasM3((prev) => +(prev + 0.18).toFixed(2));
      setSessionLpgSaved((prev) => prev + 18);
      setSessionFertilizerBags((prev) => prev + 1);
    }
    if (type === "plastic_bottle" || type === "mixed_plate") {
      setSessionBaledKg((prev) => +(prev + 0.85).toFixed(2));
    }

    await new Promise((res) => setTimeout(res, 800));
    setIsFlowActive(false);
  };

  return (
    <div className="w-full bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-md overflow-hidden">
      {/* Top Header & Tab Controls */}
      <div className="p-6 lg:p-8 border-b border-outline-variant bg-gradient-to-r from-surface-container-low via-surface-container-lowest to-surface-container-low">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
              <span className="text-xs font-mono font-bold text-primary tracking-widest uppercase">
                REAL-TIME CLOSED-LOOP UTILITY ARCHITECTURE
              </span>
              <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary text-[10px] font-mono font-bold">
                PATENT PENDING
              </span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-on-surface tracking-tight">
              From Ingestion to On-Site Cooking Biogas &amp; Fertilizer
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-3xl leading-relaxed">
              Experience the physical pipeline: Residential Towers &amp; Canteens feed into the{" "}
              <strong>EcoBin Smart Segregation Node</strong>, which routes dry items via Blue Pipe to the{" "}
              <strong>Baler</strong> and organic slurry via Green Pipe to the{" "}
              <strong>Centralized Dome Digester</strong> to fuel the <strong>Localized Cooking Mess</strong>.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center bg-surface-container rounded-xl p-1 border border-outline-variant text-xs font-mono">
            <button
              onClick={() => setActiveTab("architecture")}
              className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "architecture"
                  ? "bg-surface-container-lowest text-primary shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">apartment</span>
              <span>1. Campus Pipe Flow</span>
            </button>
            <button
              onClick={() => setActiveTab("product_hardware")}
              className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "product_hardware"
                  ? "bg-surface-container-lowest text-primary shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">deployed_code</span>
              <span>2. Actual Machine (Smart Node)</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-outline-variant/60 font-mono text-xs">
          <div className="p-3 rounded-xl bg-surface-container border border-outline-variant">
            <span className="text-[10px] text-secondary uppercase block">Biogas Stored In-Pipe</span>
            <span className="text-lg font-extrabold text-primary">{sessionBiogasM3} m³</span>
            <span className="text-[10px] text-on-surface-variant block mt-0.5">Displaces 19kg LPG Cylinders</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-container border border-outline-variant">
            <span className="text-[10px] text-secondary uppercase block">Cooking Fuel Value</span>
            <span className="text-lg font-extrabold text-amber-700">₹{sessionLpgSaved}</span>
            <span className="text-[10px] text-on-surface-variant block mt-0.5">Saved in Canteen Mess</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-container border border-outline-variant">
            <span className="text-[10px] text-secondary uppercase block">Clean Baled Recyclables</span>
            <span className="text-lg font-extrabold text-blue-700">{sessionBaledKg} kg</span>
            <span className="text-[10px] text-on-surface-variant block mt-0.5">High-Value Dry Fiber/PET</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-container border border-outline-variant">
            <span className="text-[10px] text-secondary uppercase block">Organic Fertilizer</span>
            <span className="text-lg font-extrabold text-green-700">{sessionFertilizerBags} Bags</span>
            <span className="text-[10px] text-on-surface-variant block mt-0.5">Pathogen-Safe Bio-Manure</span>
          </div>
        </div>
      </div>

      {/* ================= VIEW 1: CAMPUS ISOMETRIC PIPE FLOW ================= */}
      {activeTab === "architecture" && (
        <div className="p-6 lg:p-8 space-y-8">
          {/* Interactive Inflow Drop Triggers */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono uppercase tracking-wider text-on-surface font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-primary">play_circle</span>
                Simulate Dropping Waste in Realtime:
              </label>
              <span className="text-[11px] font-mono text-on-surface-variant">
                Select an item to watch the particles travel through the pipes
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => triggerFlowSimulation("mixed_plate")}
                disabled={isFlowActive}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer active:scale-95 disabled:cursor-not-allowed ${
                  selectedInflow === "mixed_plate"
                    ? "bg-surface-container-lowest border-primary ring-2 ring-primary/20 shadow-sm"
                    : "bg-surface-container border-outline-variant hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    restaurant
                  </span>
                  <span className="text-xs font-bold text-on-surface">Canteen Thali</span>
                </div>
                <p className="text-[11px] text-on-surface-variant line-clamp-1">
                  Food + Napkin + Plastic Cup
                </p>
                <div className="mt-2 text-[10px] font-mono text-primary font-bold">
                  Splits: Green &amp; Blue Pipes
                </div>
              </button>

              <button
                onClick={() => triggerFlowSimulation("banana_peel")}
                disabled={isFlowActive}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer active:scale-95 disabled:cursor-not-allowed ${
                  selectedInflow === "banana_peel"
                    ? "bg-surface-container-lowest border-primary ring-2 ring-primary/20 shadow-sm"
                    : "bg-surface-container border-outline-variant hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="material-symbols-outlined text-green-700 text-[20px]">
                    nutrition
                  </span>
                  <span className="text-xs font-bold text-on-surface">Tower Food Scraps</span>
                </div>
                <p className="text-[11px] text-on-surface-variant line-clamp-1">
                  Vegetable Peels &amp; Roti
                </p>
                <div className="mt-2 text-[10px] font-mono text-green-700 font-bold">
                  100% Slurry &rarr; Biogas Dome
                </div>
              </button>

              <button
                onClick={() => triggerFlowSimulation("plastic_bottle")}
                disabled={isFlowActive}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer active:scale-95 disabled:cursor-not-allowed ${
                  selectedInflow === "plastic_bottle"
                    ? "bg-surface-container-lowest border-primary ring-2 ring-primary/20 shadow-sm"
                    : "bg-surface-container border-outline-variant hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="material-symbols-outlined text-blue-600 text-[20px]">
                    inventory_2
                  </span>
                  <span className="text-xs font-bold text-on-surface">Dry Recyclable</span>
                </div>
                <p className="text-[11px] text-on-surface-variant line-clamp-1">
                  PET Bottle &amp; Cardboard
                </p>
                <div className="mt-2 text-[10px] font-mono text-blue-700 font-bold">
                  Blue Pipe &rarr; On-Site Baler
                </div>
              </button>

              <button
                onClick={() => triggerFlowSimulation("metal_spoon")}
                disabled={isFlowActive}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer active:scale-95 disabled:cursor-not-allowed ${
                  selectedInflow === "metal_spoon"
                    ? "bg-surface-container-lowest border-primary ring-2 ring-primary/20 shadow-sm"
                    : "bg-surface-container border-outline-variant hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="material-symbols-outlined text-red-600 text-[20px]">
                    hardware
                  </span>
                  <span className="text-xs font-bold text-on-surface">Steel Spoon (Cutlery)</span>
                </div>
                <p className="text-[11px] text-on-surface-variant line-clamp-1">
                  Accidental Metal Ingestion
                </p>
                <div className="mt-2 text-[10px] font-mono text-red-700 font-bold">
                  Eddy Current Cutlery Eject
                </div>
              </button>
            </div>
          </div>

          {/* The Visual Architecture Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Isometric Visual Diagram (7 Cols) */}
            <div className="lg:col-span-7 bg-surface-container-low rounded-2xl border border-outline-variant p-4 relative overflow-hidden flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-3 text-xs font-mono border-b border-outline-variant pb-2">
                <span className="font-bold text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">schema</span>
                  ISOMETRIC INFOGRAPHIC: CAMPUS CLOSED LOOP
                </span>
                <span className="text-[10px] text-primary font-bold">
                  {isFlowActive ? "STATUS: STREAM TRANSMITTING..." : "STATUS: LIVE STEADY-STATE"}
                </span>
              </div>

              {/* The High-Resolution Isometric Architecture Visual */}
              <div className="relative w-full rounded-xl overflow-hidden border border-outline-variant shadow-sm bg-white">
                <img
                  src="/campus_closed_loop_architecture.jpg"
                  alt="EcoBin Closed Loop Campus Architecture Diagram"
                  className="w-full h-auto object-contain max-h-[520px] mx-auto transition-transform duration-500"
                />

                {/* Animated Pulsing Hotspots Over Nodes */}
                <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div
                    className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                      steps[currentStepIndex]?.activeNode === "tower"
                        ? "border-primary bg-primary/20 scale-125 animate-ping"
                        : "border-transparent"
                    }`}
                  ></div>
                </div>

                <div className="absolute top-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div
                    className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                      steps[currentStepIndex]?.activeNode === "canteen"
                        ? "border-primary bg-primary/20 scale-125 animate-ping"
                        : "border-transparent"
                    }`}
                  ></div>
                </div>

                <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/4 pointer-events-none">
                  <div
                    className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                      steps[currentStepIndex]?.activeNode === "digester"
                        ? "border-amber-500 bg-amber-500/20 scale-125 animate-ping"
                        : "border-transparent"
                    }`}
                  ></div>
                </div>

                <div className="absolute top-1/2 right-1/6 transform pointer-events-none">
                  <div
                    className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                      steps[currentStepIndex]?.activeNode === "stove"
                        ? "border-cyan-400 bg-cyan-400/30 scale-125 animate-ping"
                        : "border-transparent"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Bottom Quick Legend */}
              <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-[10px] font-mono text-on-surface-variant">
                <div className="flex items-center gap-1.5 p-1.5 rounded bg-surface-container">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  <span>Blue: Dry Recyclables</span>
                </div>
                <div className="flex items-center gap-1.5 p-1.5 rounded bg-surface-container">
                  <span className="w-3 h-3 rounded-full bg-green-600"></span>
                  <span>Green: Organic Slurry</span>
                </div>
                <div className="flex items-center gap-1.5 p-1.5 rounded bg-surface-container">
                  <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
                  <span>Cyan: Biogas to Stove</span>
                </div>
                <div className="flex items-center gap-1.5 p-1.5 rounded bg-surface-container">
                  <span className="w-3 h-3 rounded-full bg-amber-800"></span>
                  <span>Brown: Bio-Fertilizer</span>
                </div>
              </div>
            </div>

            {/* Right: Step-by-Step Processing Narrative & Telemetry (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant">
                <div className="flex items-center justify-between mb-3 border-b border-outline-variant pb-2">
                  <span className="text-xs font-mono font-bold text-on-surface uppercase flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    Live Stage Telemetry
                  </span>
                  <span className="text-[10px] font-mono text-primary font-bold">
                    STEP {currentStepIndex + 1} OF 5
                  </span>
                </div>

                {/* Vertical Stepper List */}
                <div className="space-y-3">
                  {steps.map((step, idx) => {
                    const isCurrent = idx === currentStepIndex;
                    const isPast = idx < currentStepIndex;
                    return (
                      <div
                        key={step.id}
                        className={`p-3 rounded-lg border transition-all text-xs ${
                          isCurrent
                            ? "bg-surface-container-lowest border-primary shadow-xs ring-1 ring-primary/20 scale-[1.01]"
                            : isPast
                            ? "bg-surface-container-lowest/80 border-outline-variant/60 opacity-80"
                            : "bg-surface-container/40 border-transparent opacity-40"
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono font-bold mb-1">
                          <span className={isCurrent ? "text-primary" : "text-on-surface"}>
                            {step.label}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] text-primary animate-pulse font-bold">
                              ACTIVE NOW
                            </span>
                          )}
                          {isPast && (
                            <span className="material-symbols-outlined text-green-700 text-[14px]">
                              check_circle
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-on-surface-variant leading-relaxed">
                          {step.detail}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Real World Campus Impact Box */}
              <div className="p-5 rounded-xl bg-primary-container text-on-primary shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[20px]">energy_program_saving</span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Zero Municipal Landfill Dependency
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-on-primary-container">
                  In traditional campuses, diesel trucks haul 300kg of wet rotting food daily, causing
                  foul odor and tipping fees. In EcoBin’s closed-loop model, 100% of wet organics become
                  cooking energy in the exact mess where the food was originally consumed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW 2: ACTUAL SMART NODE HARDWARE ================= */}
      {activeTab === "product_hardware" && (
        <div className="p-6 lg:p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: The Actual Product Hardware Image (6 Cols) */}
            <div className="lg:col-span-6 bg-surface-container-low rounded-2xl border border-outline-variant p-6 flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-4 border-b border-outline-variant pb-2 text-xs font-mono">
                <span className="font-bold text-on-surface">
                  ECOBIN SMART SEGREGATION NODE (v4.2 HW)
                </span>
                <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-bold">
                  READY FOR DEPLOYMENT
                </span>
              </div>

              <div className="relative w-full max-w-md bg-white rounded-2xl p-4 shadow-sm border border-outline-variant overflow-hidden group">
                <img
                  src="/smart_segregation_node.jpg"
                  alt="EcoBin Smart Segregation Node Appliance"
                  className="w-full h-auto object-contain mx-auto group-hover:scale-105 transition-transform duration-500"
                />

                {/* Floating Component Callout Badges */}
                <div className="absolute top-6 left-6 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-white font-mono text-[10px] border border-white/20">
                  <span className="text-primary font-bold">GREEN LID:</span> Single Mixed Drop Slot
                </div>

                <div className="absolute top-1/4 right-6 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-white font-mono text-[10px] border border-white/20">
                  <span className="text-primary font-bold">OLED HUD:</span> Real-Time Latency &amp; State
                </div>

                <div className="absolute bottom-6 left-6 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-white font-mono text-[10px] border border-white/20">
                  <span className="text-primary font-bold">CHASSIS:</span> Anodized Aluminum + Acoustic Seal
                </div>
              </div>

              <p className="text-xs text-on-surface-variant font-mono mt-4 text-center">
                Dimensions: 480mm × 360mm × 420mm · Fits in student dining halls, pantry counters, or hostel corridors.
              </p>
            </div>

            {/* Right: Technical Anatomy & Internal Engineering (6 Cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">
                  INSIDE THE PHYSICAL MACHINE
                </span>
              </div>
              <h4 className="text-2xl font-extrabold text-on-surface tracking-tight">
                Engineering Anatomy of the Smart Segregation Node
              </h4>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Beneath the vibrant green lid and recessed drop chute lies a patent-grade integration
                of high-speed embedded perception, cutaway divert flaps, and stainless-steel mastication.
              </p>

              <div className="space-y-3 pt-2 font-mono text-xs">
                {/* Feature 1 */}
                <div className="p-3.5 rounded-xl bg-surface-container border border-outline-variant flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">camera</span>
                  </div>
                  <div>
                    <div className="font-bold text-on-surface">Top Chute &amp; Sapphire Vision Lens</div>
                    <div className="text-[11px] text-on-surface-variant font-sans mt-0.5">
                      Recessed sapphire glass protects the 2MP wide-angle camera from food splatter. Automated periodic air-puffs blow grease clear.
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="p-3.5 rounded-xl bg-surface-container border border-outline-variant flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">swap_calls</span>
                  </div>
                  <div>
                    <div className="font-bold text-on-surface">High-Torque 180° Diverter Flap</div>
                    <div className="text-[11px] text-on-surface-variant font-sans mt-0.5">
                      Fires in under 120ms to isolate dry cardboard/plastics into the Blue Conduit while routing food scraps into the Macerator.
                    </div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="p-3.5 rounded-xl bg-surface-container border border-outline-variant flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-700 text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">precision_manufacturing</span>
                  </div>
                  <div>
                    <div className="font-bold text-on-surface">SS316 Stainless Steel Dual Macerator</div>
                    <div className="text-[11px] text-on-surface-variant font-sans mt-0.5">
                      Pulverizes coarse bones, citrus peels, and fibrous vegetables into uniform &lt;1.8mm slurry with automated 1:1 greywater dosing.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
