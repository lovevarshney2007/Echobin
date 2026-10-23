"use client";

import React, { useState, useEffect, useRef } from "react";

// Types of Waste that can be fed into EcoBin
export type WasteType =
  | "mixed_canteen"
  | "pure_organic"
  | "metal_spoon"
  | "oily_takeout"
  | "dry_cardboard"
  | "acidic_curry";

interface WasteItem {
  id: WasteType;
  name: string;
  hindiName: string;
  icon: string;
  tag: string;
  tagColor: string;
  weightKg: number;
  composition: {
    organicPct: number;
    plasticPct: number;
    metalPct: number;
  };
  opticalClass: string;
  moisturePct: number;
  metalInduction: boolean;
  sortingDestination: "biodigester" | "metal_tray" | "dry_recyclables" | "multi_split";
  diverterAction: string;
  macerationAction: string;
  storageOutcome: {
    biogasM3: number;
    fertilizerL: number;
    cleanRecyclableGrams: number;
    metalSaved: boolean;
    lpgSavingsRs: number;
  };
  firmwareLog: string;
}

const WASTE_PRESETS: Record<WasteType, WasteItem> = {
  mixed_canteen: {
    id: "mixed_canteen",
    name: "Canteen Plate (Dal-Chawal + Spoon + Cup)",
    hindiName: "Canteen Thali (Khaana + Chammach + Plastic)",
    icon: "restaurant",
    tag: "High-Risk Mixed Inflow",
    tagColor: "bg-red-500/10 text-red-700 border-red-300",
    weightKg: 2.4,
    composition: { organicPct: 75, plasticPct: 15, metalPct: 10 },
    opticalClass: "Multi-Object Cluster (Organic + Polypropylene + Ferrous)",
    moisturePct: 78,
    metalInduction: true,
    sortingDestination: "multi_split",
    diverterAction: "Dual-Pulse Flap: Spoon isolated to Metal Bay in 5ms; Dry cup blown to Recyclables; Food scrap dropped to Macerator",
    macerationAction: "SS316 blades shear food into 1.4mm micro-slurry. Water solenoid injects 1.2L greywater at 2.1 bar",
    storageOutcome: {
      biogasM3: 0.16,
      fertilizerL: 0.95,
      cleanRecyclableGrams: 85,
      metalSaved: true,
      lpgSavingsRs: 14.8,
    },
    firmwareLog: "TRI-STREAM PERCEPTION: Inductive coil tripped @ 4.2ms. Diverter gate pulse A fired. Zero blade contact.",
  },
  pure_organic: {
    id: "pure_organic",
    name: "Pure Food Scraps (Roti, Sabzi & Peels)",
    hindiName: "Geela Khaana (Sabzi Chhilke & Khana)",
    icon: "nutrition",
    tag: "100% Methanogenic Substrate",
    tagColor: "bg-green-500/10 text-green-700 border-green-300",
    weightKg: 2.0,
    composition: { organicPct: 100, plasticPct: 0, metalPct: 0 },
    opticalClass: "Bio-Organic Vegetable Tissue (Cellulose/Starch)",
    moisturePct: 82,
    metalInduction: false,
    sortingDestination: "biodigester",
    diverterAction: "Single Flap OPEN to Central Chute. Zero divert needed. Direct fall into Maceration Chamber in 60ms",
    macerationAction: "Dual-shaft counter-rotation pulverizes bulk peels into 1.2mm slurry with automated 1:1 water dosing",
    storageOutcome: {
      biogasM3: 0.18,
      fertilizerL: 1.05,
      cleanRecyclableGrams: 0,
      metalSaved: false,
      lpgSavingsRs: 16.5,
    },
    firmwareLog: "OPTICAL PASS: High dielectric permittivity verified (ε_r=79.4). Direct gravimetric feed to Masticator #01.",
  },
  metal_spoon: {
    id: "metal_spoon",
    name: "Stray Stainless Steel Spoon",
    hindiName: "Galti se gira Steel ka Chammach",
    icon: "hardware",
    tag: "Catastrophic Blade Hazard",
    tagColor: "bg-amber-500/10 text-amber-800 border-amber-300",
    weightKg: 0.08,
    composition: { organicPct: 0, plasticPct: 0, metalPct: 100 },
    opticalClass: "Specular Ferromagnetic Cutlery (SS202/SS304)",
    moisturePct: 4,
    metalInduction: true,
    sortingDestination: "metal_tray",
    diverterAction: "Eddy current instantly trips high-torque servo gate; spoon diverted into Metal Reclaim Chute in <5 ms",
    macerationAction: "Macerator motor stays in safe idle mode. Zero mechanical wear or blade fracture",
    storageOutcome: {
      biogasM3: 0.0,
      fertilizerL: 0.0,
      cleanRecyclableGrams: 0,
      metalSaved: true,
      lpgSavingsRs: 0,
    },
    firmwareLog: "EMERGENCY REJECT: Inductive Proximity Sensor coil trigger (5ms). Cutlery tray engaged. Saved ₹4,500 blade pair.",
  },
  oily_takeout: {
    id: "oily_takeout",
    name: "Greasy Zomato/Swiggy Plastic Box",
    hindiName: "Tel-Laga Plastic Dabba (Takeout Box)",
    icon: "takeout_dining",
    tag: "Micro-Plastic Contaminant",
    tagColor: "bg-purple-500/10 text-purple-700 border-purple-300",
    weightKg: 0.12,
    composition: { organicPct: 5, plasticPct: 95, metalPct: 0 },
    opticalClass: "Polypropylene (PP-05) Shell with surface oil film",
    moisturePct: 12,
    metalInduction: false,
    sortingDestination: "dry_recyclables",
    diverterAction: "Air-knife pulse strips residual curry scrap into food chute; rigid container routed to Dry Bay #01",
    macerationAction: "Container is 100% barred from digester, preventing microplastic contamination in bio-fertilizer",
    storageOutcome: {
      biogasM3: 0.01,
      fertilizerL: 0.04,
      cleanRecyclableGrams: 90,
      metalSaved: false,
      lpgSavingsRs: 1.2,
    },
    firmwareLog: "SPECTRAL SORT: Dielectric baseline matched PP polymer. High-pressure air nozzle stripped grease. Diverted dry.",
  },
  dry_cardboard: {
    id: "dry_cardboard",
    name: "Clean Corrugated Cardboard Box",
    hindiName: "Dry Carton Box (Paper Recyclable)",
    icon: "inventory_2",
    tag: "High-Value Dry Fiber",
    tagColor: "bg-blue-500/10 text-blue-700 border-blue-300",
    weightKg: 0.45,
    composition: { organicPct: 0, plasticPct: 0, metalPct: 0 },
    opticalClass: "Unbleached Kraft Cellulose Fiber (Cardboard)",
    moisturePct: 8,
    metalInduction: false,
    sortingDestination: "dry_recyclables",
    diverterAction: "Low-moisture capacitive probe switches diverter gate to Dry Baling Bay in 80ms. Preserves paper fiber",
    macerationAction: "Bypasses digester to be compacted into high-density industrial recycling bales",
    storageOutcome: {
      biogasM3: 0.0,
      fertilizerL: 0.0,
      cleanRecyclableGrams: 450,
      metalSaved: false,
      lpgSavingsRs: 4.5,
    },
    firmwareLog: "BALER ROUTED: Moisture <10% RH. Flap shifted to secondary dry channel. Compressed at 1.8 bar.",
  },
  acidic_curry: {
    id: "acidic_curry",
    name: "Acidic Indian Curry & Lemon Peels",
    hindiName: "Khatta Khana (Nimbu, Tamatar, Tikhi Gravy)",
    icon: "local_fire_department",
    tag: "Volatile Fatty Acid Hazard",
    tagColor: "bg-amber-600/10 text-amber-700 border-amber-300",
    weightKg: 1.8,
    composition: { organicPct: 100, plasticPct: 0, metalPct: 0 },
    opticalClass: "High-Lipid Acidic Substrate (pH 4.8 - 5.2)",
    moisturePct: 85,
    metalInduction: false,
    sortingDestination: "biodigester",
    diverterAction: "Routes direct to wet chamber. Secondary peristaltic micro-pump primes alkaline NaHCO3 buffer",
    macerationAction: "Slurry mixed with 140mL saturated sodium bicarbonate solution to neutralize volatile fatty acids",
    storageOutcome: {
      biogasM3: 0.17,
      fertilizerL: 0.98,
      cleanRecyclableGrams: 0,
      metalSaved: false,
      lpgSavingsRs: 15.2,
    },
    firmwareLog: "PH TELEMETRY ALERT: Intake pH measured 5.1. Auto-dosed 140mL NaHCO3. Digester core buffered to 7.24 pH.",
  },
};

type PipelineStage = "idle" | "intake_scan" | "sorting_divert" | "maceration" | "digestion" | "stored";

export default function LiveInteractiveWastePipeline() {
  const [selectedWaste, setSelectedWaste] = useState<WasteType>("mixed_canteen");
  const [currentStage, setCurrentStage] = useState<PipelineStage>("idle");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [stageProgress, setStageProgress] = useState<number>(0);
  const [executionSpeed, setExecutionSpeed] = useState<"normal" | "fast">("normal");

  // Cumulative stored metrics in the machine during session
  const [storedBiogas, setStoredBiogas] = useState<number>(2.42); // m³
  const [storedFertilizer, setStoredFertilizer] = useState<number>(14.2); // Liters
  const [storedRecyclablesKg, setStoredRecyclablesKg] = useState<number>(8.5); // kg
  const [reclaimedCutleryCount, setReclaimedCutleryCount] = useState<number>(14); // spoons/cutlery
  const [totalLpgSavingsRs, setTotalLpgSavingsRs] = useState<number>(248); // Rupees

  // Live telemetry meters
  const [telemetryPh, setTelemetryPh] = useState<number>(7.24);
  const [telemetryMethanePct, setTelemetryMethanePct] = useState<number>(65.8);
  const [telemetryPressureMbar, setTelemetryPressureMbar] = useState<number>(18.4);
  const [telemetryCoreTemp, setTelemetryCoreTemp] = useState<number>(37.2);

  // Live console log stream
  const [liveLogs, setLiveLogs] = useState<
    { id: string; time: string; tag: string; text: string; color: string }[]
  >([
    {
      id: "log-init",
      time: "SYSTEM READY",
      tag: "BOOT",
      text: "EcoBin OS Kernel v4.18 online. ESP32-S3 Camera and Tri-Stream sensors calibrated.",
      color: "text-primary",
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [liveLogs]);

  const addLog = (tag: string, text: string, color = "text-on-surface") => {
    const timeStr = new Date().toLocaleTimeString("en-IN", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setLiveLogs((prev) => [
      ...prev.slice(-14),
      { id: `${Date.now()}-${Math.random()}`, time: timeStr, tag, text, color },
    ]);
  };

  const activeItem = WASTE_PRESETS[selectedWaste];

  // Ingestion & Pipeline Runner
  const runFullPipeline = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    const delayStep = executionSpeed === "normal" ? 1700 : 850;

    // Stage 1: INTAKE & OPTICAL SCAN
    setCurrentStage("intake_scan");
    setStageProgress(25);
    addLog(
      "INTAKE-HOPPER",
      `Ingested ${activeItem.name} (${activeItem.weightKg} kg). Laser grid sweeping...`,
      "text-primary font-bold"
    );
    addLog(
      "ESP32-S3-AI",
      `Inference: ${activeItem.opticalClass} · Latency: 138ms · Moisture: ${activeItem.moisturePct}%`,
      "text-blue-600 font-bold"
    );

    await new Promise((res) => setTimeout(res, delayStep));

    // Stage 2: SORTING & DIVERTER GATE
    setCurrentStage("sorting_divert");
    setStageProgress(50);
    addLog("SERVO-ACTUATE", activeItem.diverterAction, "text-amber-600 font-semibold");
    if (activeItem.metalInduction) {
      addLog(
        "SAFETY-ALERT",
        "Inductive coil verified metallic mass. High-speed 180° flap deflected cutlery to scrap bay in 5ms.",
        "text-red-600 font-bold"
      );
    }

    await new Promise((res) => setTimeout(res, delayStep));

    // Stage 3: MACERATION & CHEMICAL BUFFERING
    setCurrentStage("maceration");
    setStageProgress(75);
    addLog("SS316-SHEAR", activeItem.macerationAction, "text-primary font-bold");
    if (selectedWaste === "acidic_curry") {
      setTelemetryPh(6.4);
      addLog("PH-AUTO-BUFFER", "Low pH detected! Solenoid injected 140mL NaHCO3. Stabilized to 7.24 pH.", "text-amber-700 font-bold");
    } else {
      setTelemetryPh(7.22);
    }

    await new Promise((res) => setTimeout(res, delayStep));

    // Stage 4: MESOPHILIC DIGESTION
    setCurrentStage("digestion");
    setStageProgress(90);
    addLog(
      "BIOREACTOR-37C",
      "Methanogenic hydrolysis and acetogenesis active. Micro-slurry converting to CH4 + CO2 gas.",
      "text-green-700 font-bold"
    );
    setTelemetryMethanePct(66.2);
    setTelemetryPressureMbar(19.1);

    await new Promise((res) => setTimeout(res, delayStep));

    // Stage 5: STORED & OUTPUT CAPTURE
    setCurrentStage("stored");
    setStageProgress(100);

    const out = activeItem.storageOutcome;
    setStoredBiogas((prev) => +(prev + out.biogasM3).toFixed(3));
    setStoredFertilizer((prev) => +(prev + out.fertilizerL).toFixed(2));
    setStoredRecyclablesKg((prev) => +(prev + out.cleanRecyclableGrams / 1000).toFixed(2));
    if (out.metalSaved) {
      setReclaimedCutleryCount((prev) => prev + 1);
    }
    setTotalLpgSavingsRs((prev) => +(prev + out.lpgSavingsRs).toFixed(1));

    addLog(
      "STORAGE-UPDATE",
      `Cycle Complete: +${out.biogasM3} m³ Biogas stored in pressure bladder · +${out.fertilizerL} L Bio-Fertilizer queued in sump.`,
      "text-green-600 font-bold"
    );

    // Keep the stored screen for a moment then reset processing flag
    await new Promise((res) => setTimeout(res, 1200));
    setIsProcessing(false);
  };

  const resetSimulator = () => {
    setCurrentStage("idle");
    setStageProgress(0);
    setIsProcessing(false);
    addLog("SYSTEM", "Pipeline reset to Standby. Ready for next waste ingestion batch.", "text-on-surface-variant");
  };

  return (
    <div className="w-full bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-md overflow-hidden">
      {/* ================= 1. SIMULATOR HEADER ================= */}
      <div className="p-6 lg:p-8 border-b border-outline-variant bg-gradient-to-r from-surface-container-low via-surface-container-lowest to-surface-container-low">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
              <span className="text-xs font-mono font-bold text-primary tracking-widest uppercase">
                LIVE HARDWARE DEMONSTRATION &amp; KINETIC PIPELINE
              </span>
              <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary text-[10px] font-mono font-semibold">
                INTERACTIVE
              </span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-on-surface tracking-tight">
              Virtual Waste Ingestion, Processing &amp; Storage
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-3xl leading-relaxed">
              Drop sample waste into the EcoBin chute to watch our <strong>Edge-AI perception</strong>,
              <strong> high-speed mechanical sorting</strong>, <strong>SS316 maceration</strong>, and
              <strong> clean on-site biogas &amp; fertilizer storage</strong> in action.
            </p>
          </div>

          {/* Quick Speed & Action Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-surface-container rounded-lg p-1 border border-outline-variant text-xs font-mono">
              <button
                onClick={() => setExecutionSpeed("normal")}
                className={`px-3 py-1.5 rounded font-bold transition-all cursor-pointer ${
                  executionSpeed === "normal"
                    ? "bg-surface-container-lowest text-primary shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                1× Pitch Speed
              </button>
              <button
                onClick={() => setExecutionSpeed("fast")}
                className={`px-3 py-1.5 rounded font-bold transition-all cursor-pointer ${
                  executionSpeed === "fast"
                    ? "bg-surface-container-lowest text-primary shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                2× Fast Demo
              </button>
            </div>

            <button
              onClick={resetSimulator}
              disabled={isProcessing}
              className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg border border-outline-variant transition-colors cursor-pointer disabled:opacity-50"
              title="Reset Simulator"
            >
              <span className="material-symbols-outlined text-[20px]">restart_alt</span>
            </button>
          </div>
        </div>

        {/* Real-Time Stage Progress Bar */}
        <div className="mt-6 pt-4 border-t border-outline-variant/60">
          <div className="flex justify-between items-center text-[11px] font-mono mb-2">
            <span className="text-on-surface font-semibold flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isProcessing ? "bg-primary animate-pulse" : "bg-outline"
                }`}
              ></span>
              PIPELINE STATUS:{" "}
              <strong className="text-primary uppercase">
                {currentStage === "idle"
                  ? "Standby (Ready to Feed)"
                  : currentStage === "intake_scan"
                  ? "Stage 1: Multi-Sensor & AI Scan (138ms)"
                  : currentStage === "sorting_divert"
                  ? "Stage 2: Servo Flap Mechanical Diversion"
                  : currentStage === "maceration"
                  ? "Stage 3: SS316 High-Torque Macerator"
                  : currentStage === "digestion"
                  ? "Stage 4: Mesophilic Bioreactor (37.2°C)"
                  : "Stage 5: Biogas & Fertilizer Stored!"}
              </strong>
            </span>
            <span className="text-primary font-bold">{stageProgress}%</span>
          </div>

          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${stageProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* ================= 2. INTERACTIVE SELECTION BAR (HAMNE WASTE DALA) ================= */}
      <div className="p-6 lg:p-8 bg-surface-container-low border-b border-outline-variant">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-mono uppercase tracking-wider text-on-surface font-bold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-primary">add_circle</span>
            Step 1: Choose Waste to Ingest into EcoBin Chute
          </label>
          <span className="text-[11px] font-mono text-on-surface-variant">
            Click any waste type below
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {(Object.keys(WASTE_PRESETS) as WasteType[]).map((key) => {
            const item = WASTE_PRESETS[key];
            const isSelected = selectedWaste === key;
            return (
              <button
                key={key}
                onClick={() => {
                  if (!isProcessing) {
                    setSelectedWaste(key);
                    addLog(
                      "LOAD-CHUTE",
                      `Selected: ${item.name} (${item.weightKg} kg). Ready to drop.`,
                      "text-on-surface font-medium"
                    );
                  }
                }}
                disabled={isProcessing}
                className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between cursor-pointer active:scale-95 disabled:cursor-not-allowed ${
                  isSelected
                    ? "bg-surface-container-lowest border-primary ring-2 ring-primary/20 shadow-sm"
                    : "bg-surface-container-lowest/70 border-outline-variant hover:border-primary/50 hover:bg-surface-container-lowest"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="material-symbols-outlined text-[24px] text-primary">
                      {item.icon}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${item.tagColor}`}
                    >
                      {item.weightKg} kg
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-on-surface leading-tight mb-1 line-clamp-2">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-on-surface-variant font-mono line-clamp-1">
                    {item.hindiName}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-outline-variant/60 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-secondary">{item.moisturePct}% H2O</span>
                  {item.metalInduction && (
                    <span className="text-red-600 font-bold flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">bolt</span>
                      Metal
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Big Action Ingestion Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed/40 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px] animate-bounce">
                arrow_downward
              </span>
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-primary uppercase">
                LOADED IN HOPPER TRAY:
              </div>
              <div className="text-sm font-extrabold text-on-surface">
                {activeItem.name} — <span className="text-primary">{activeItem.weightKg} kg batch</span>
              </div>
              <div className="text-[11px] text-on-surface-variant">
                Expected outcome:{" "}
                <strong className="text-on-surface">+{activeItem.storageOutcome.biogasM3} m³ Biogas</strong> &amp;{" "}
                <strong className="text-on-surface">+{activeItem.storageOutcome.fertilizerL} L Fertilizer</strong>
              </div>
            </div>
          </div>

          <button
            onClick={runFullPipeline}
            disabled={isProcessing}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-95 ${
              isProcessing
                ? "bg-outline text-on-surface-variant cursor-wait"
                : "bg-primary-container text-on-primary hover:bg-primary hover:shadow-lg"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isProcessing ? "sync" : "play_circle"}
            </span>
            <span>
              {isProcessing ? "PROCESSING PIPELINE..." : "DROP INTO ECOBIN CHUTE NOW"}
            </span>
          </button>
        </div>
      </div>

      {/* ================= 3. THE 4-STAGE ANIMATED MACHINE CHASSIS & STORAGE ================= */}
      <div className="p-6 lg:p-8 grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Kinetic Machine Schematic (8 Cols) */}
        <div className="xl:col-span-8 space-y-6">
          <div className="bg-surface-container-low rounded-2xl border border-outline-variant p-6 relative overflow-hidden">
            {/* Visual Laser Scanner Grid Indicator */}
            {currentStage === "intake_scan" && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse z-20"></div>
            )}

            <div className="flex items-center justify-between mb-4 border-b border-outline-variant pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  precision_manufacturing
                </span>
                <span className="text-xs font-mono font-bold text-on-surface uppercase">
                  CROSS-SECTION CUTAWAY: ECOBIN SMART BIO-CHUTE
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-on-surface-variant">
                <span>CAD REF: ECO-SYS-2026-X</span>
                <span className="px-1.5 py-0.5 rounded bg-surface-container border border-outline-variant font-bold text-primary">
                  SS316 CORE
                </span>
              </div>
            </div>

            {/* Kinetic Visual Blocks */}
            <div className="space-y-4">
              {/* STAGE 1: INTAKE & SENSING */}
              <div
                className={`p-4 rounded-xl border transition-all duration-300 relative ${
                  currentStage === "intake_scan"
                    ? "bg-surface-container-lowest border-primary ring-2 ring-primary/20 shadow-md"
                    : "bg-surface-container-lowest/80 border-outline-variant"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-primary-container text-on-primary flex items-center justify-center font-mono text-xs font-bold">
                      1
                    </span>
                    <h5 className="text-xs font-bold text-on-surface font-mono uppercase">
                      Intake Hopper &amp; Tri-Stream Perception Ring
                    </h5>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container text-primary font-bold border border-outline-variant">
                    ESP32-S3 YOLOv8 INT8
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] font-mono mt-3">
                  <div className="p-2.5 rounded-lg bg-surface-container border border-outline-variant">
                    <span className="text-[10px] text-secondary block">OPTICAL CAMERA</span>
                    <span className="font-bold text-on-surface mt-0.5 block truncate">
                      {currentStage !== "idle" ? activeItem.opticalClass : "Scanning Ready..."}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface-container border border-outline-variant">
                    <span className="text-[10px] text-secondary block">DIELECTRIC MOISTURE</span>
                    <span className="font-bold text-on-surface mt-0.5 block">
                      {currentStage !== "idle" ? `${activeItem.moisturePct}% RH` : "0% RH"}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface-container border border-outline-variant">
                    <span className="text-[10px] text-secondary block">INDUCTIVE PROXIMITY</span>
                    <span
                      className={`font-bold mt-0.5 block ${
                        activeItem.metalInduction && currentStage !== "idle"
                          ? "text-red-600 font-extrabold animate-pulse"
                          : "text-green-700"
                      }`}
                    >
                      {currentStage !== "idle"
                        ? activeItem.metalInduction
                          ? "FERROUS CUTLERY DETECTED!"
                          : "CLEAR (No Metal)"
                        : "Nominal"}
                    </span>
                  </div>
                </div>
              </div>

              {/* STAGE 2: HIGH-SPEED MECHANICAL DIVERTER FLAP */}
              <div
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  currentStage === "sorting_divert"
                    ? "bg-surface-container-lowest border-amber-500 ring-2 ring-amber-500/20 shadow-md"
                    : "bg-surface-container-lowest/80 border-outline-variant"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-amber-600 text-white flex items-center justify-center font-mono text-xs font-bold">
                      2
                    </span>
                    <h5 className="text-xs font-bold text-on-surface font-mono uppercase">
                      Intelligent High-Speed Diverter Flap (Servo Response &lt;150ms)
                    </h5>
                  </div>
                  <span className="text-[10px] font-mono text-amber-700 font-bold">
                    MG995 HIGH-TORQUE SERVO
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                  {/* Chute A: Metal Scrap */}
                  <div
                    className={`p-3 rounded-lg border text-center transition-all ${
                      activeItem.metalInduction &&
                      (currentStage === "sorting_divert" || currentStage === "stored")
                        ? "bg-red-500/10 border-red-500 text-red-800 font-bold scale-[1.02]"
                        : "bg-surface-container border-outline-variant text-on-surface-variant opacity-60"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px] mb-1">hardware</span>
                    <div className="text-[10px] font-mono uppercase">Flap Left: Metal Scrap</div>
                    <div className="text-[11px] font-bold mt-1">
                      {activeItem.metalInduction && currentStage !== "idle"
                        ? "SPOON ISOLATED!"
                        : "Bypassed"}
                    </div>
                  </div>

                  {/* Chute B: Organic Digestion */}
                  <div
                    className={`p-3 rounded-lg border text-center transition-all ${
                      activeItem.composition.organicPct > 0 &&
                      (currentStage === "sorting_divert" ||
                        currentStage === "maceration" ||
                        currentStage === "digestion" ||
                        currentStage === "stored")
                        ? "bg-green-500/10 border-green-600 text-green-800 font-bold scale-[1.02]"
                        : "bg-surface-container border-outline-variant text-on-surface-variant opacity-60"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px] mb-1">recycling</span>
                    <div className="text-[10px] font-mono uppercase">Chute Center: Food Scraps</div>
                    <div className="text-[11px] font-bold mt-1">
                      {activeItem.composition.organicPct > 0 && currentStage !== "idle"
                        ? "DROPPED TO MACERATOR"
                        : "Closed"}
                    </div>
                  </div>

                  {/* Chute C: Dry Recyclables */}
                  <div
                    className={`p-3 rounded-lg border text-center transition-all ${
                      (activeItem.composition.plasticPct > 0 || selectedWaste === "dry_cardboard") &&
                      (currentStage === "sorting_divert" || currentStage === "stored")
                        ? "bg-blue-500/10 border-blue-500 text-blue-800 font-bold scale-[1.02]"
                        : "bg-surface-container border-outline-variant text-on-surface-variant opacity-60"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px] mb-1">inventory_2</span>
                    <div className="text-[10px] font-mono uppercase">Flap Right: Dry Packaging</div>
                    <div className="text-[11px] font-bold mt-1">
                      {activeItem.composition.plasticPct > 0 || selectedWaste === "dry_cardboard"
                        ? "ROUTED TO BALER"
                        : "Clear"}
                    </div>
                  </div>
                </div>
              </div>

              {/* STAGE 3: MACERATOR & CHEMICAL BUFFERING */}
              <div
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  currentStage === "maceration"
                    ? "bg-surface-container-lowest border-primary ring-2 ring-primary/20 shadow-md"
                    : "bg-surface-container-lowest/80 border-outline-variant"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-primary-container text-on-primary flex items-center justify-center font-mono text-xs font-bold">
                      3
                    </span>
                    <h5 className="text-xs font-bold text-on-surface font-mono uppercase">
                      SS316 High-Torque Macerator &amp; Alkaline Inoculation
                    </h5>
                  </div>
                  <span className="text-[10px] font-mono text-primary font-bold">
                    PARTICLE REDUCTION &lt;1.8mm
                  </span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 rounded-lg bg-surface-container border border-outline-variant mt-2 text-xs">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        currentStage === "maceration"
                          ? "bg-primary text-white animate-spin"
                          : "bg-surface-container-high text-on-surface-variant"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[22px]">settings</span>
                    </div>
                    <div>
                      <div className="font-bold text-on-surface font-mono">
                        Dual Counter-Rotating SS316 Blades (1,420 RPM)
                      </div>
                      <div className="text-[11px] text-on-surface-variant">
                        Hydrolysis surface area accelerated 10× · Choking risk eliminated.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-secondary block">SOLENOID PULSE</span>
                      <span className="font-bold text-primary">0.20s Stroke</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-secondary block">BUFFER DOSING</span>
                      <span className="font-bold text-amber-700">
                        {selectedWaste === "acidic_curry" ? "140mL NaHCO3" : "Standby"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STAGE 4: ANAEROBIC BIOREACTOR (37.2°C) */}
              <div
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  currentStage === "digestion"
                    ? "bg-surface-container-lowest border-primary ring-2 ring-primary/20 shadow-md"
                    : "bg-surface-container-lowest/80 border-outline-variant"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-primary-container text-on-primary flex items-center justify-center font-mono text-xs font-bold">
                      4
                    </span>
                    <h5 className="text-xs font-bold text-on-surface font-mono uppercase">
                      Anaerobic Mesophilic Bioreactor &amp; Catalytic Scrubber
                    </h5>
                  </div>
                  <span className="text-[10px] font-mono text-primary font-bold">
                    37.2°C MESOPHILIC THERMAL JACKET
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono mt-3">
                  <div className="p-2.5 rounded-lg bg-surface-container border border-outline-variant">
                    <span className="text-[10px] text-secondary block">CORE TEMPERATURE</span>
                    <span className="font-bold text-on-surface">{telemetryCoreTemp}°C</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface-container border border-outline-variant">
                    <span className="text-[10px] text-secondary block">REAL-TIME PH</span>
                    <span className="font-bold text-primary">{telemetryPh} pH</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface-container border border-outline-variant">
                    <span className="text-[10px] text-secondary block">METHANE PURITY</span>
                    <span className="font-bold text-primary">{telemetryMethanePct}% CH4</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface-container border border-outline-variant">
                    <span className="text-[10px] text-secondary block">CATALYTIC H2S</span>
                    <span className="font-bold text-green-700">&lt; 1.8 ppm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: STORAGE & OUTPUT VESSELS (THEN HAMNE STORE KAR DIYA) (4 Cols) */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-surface-container-low rounded-2xl border border-outline-variant p-6">
            <div className="flex items-center gap-2 mb-4 border-b border-outline-variant pb-3">
              <span className="material-symbols-outlined text-primary text-[22px]">
                propane_tank
              </span>
              <h4 className="text-sm font-extrabold text-on-surface font-mono uppercase">
                Step 3: Stored Useful Outputs
              </h4>
            </div>

            {/* Vessel A: BIOGAS STORAGE BLADDER */}
            <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant shadow-xs mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-on-surface flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  1. Pressurized Biogas Bladder
                </span>
                <span className="text-[10px] font-mono text-primary font-bold">
                  {telemetryPressureMbar} mbar
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-2">
                <div className="text-3xl font-extrabold font-mono text-primary">
                  {storedBiogas}{" "}
                  <span className="text-xs text-on-surface-variant font-sans">m³ Stored</span>
                </div>
                <div className="text-[11px] font-mono text-secondary">
                  ≈ {(storedBiogas * 11.2).toFixed(1)} kWh
                </div>
              </div>

              {/* Live Gas Burner Flame Simulation */}
              <div className="mt-3 p-3 rounded-lg bg-inverse-surface text-inverse-on-surface flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex items-center justify-center w-7 h-7">
                    <span className="material-symbols-outlined text-[24px] text-cyan-400 animate-pulse">
                      local_fire_department
                    </span>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white">Clean Blue Flame</div>
                    <div className="text-[10px] text-white/70 font-mono">
                      Stove Burner Ready (No Odor)
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-300 font-bold">
                  ₹{totalLpgSavingsRs} Saved
                </span>
              </div>
            </div>

            {/* Vessel B: BIO-FERTILIZER SUMP */}
            <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant shadow-xs mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-green-700">
                    water_drop
                  </span>
                  2. Liquid Bio-Fertilizer Sump
                </span>
                <span className="text-[10px] font-mono text-green-700 font-bold">
                  NPK Mineralized
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-1">
                <div className="text-3xl font-extrabold font-mono text-on-surface">
                  {storedFertilizer}{" "}
                  <span className="text-xs text-on-surface-variant font-sans">Liters Stored</span>
                </div>
                <div className="text-[11px] font-mono text-secondary">
                  ₹{(storedFertilizer * 8).toFixed(0)} Garden Value
                </div>
              </div>
              <p className="text-[10px] text-on-surface-variant mt-2 leading-relaxed">
                100% organic, pathogen-free liquid effluent drained for campus lawns and gardening.
              </p>
            </div>

            {/* Vessel C: DRY RECYCLABLES & CUTLERY RECLAIM */}
            <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant shadow-xs">
              <div className="text-xs font-mono font-bold text-on-surface mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-blue-600">
                  inventory_2
                </span>
                3. Non-Degradables Reclaimed
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono mt-1">
                <div className="p-2 rounded bg-surface-container border border-outline-variant">
                  <span className="text-[10px] text-secondary block">DRY BALES</span>
                  <span className="font-bold text-blue-700 text-sm">{storedRecyclablesKg} kg</span>
                </div>
                <div className="p-2 rounded bg-surface-container border border-outline-variant">
                  <span className="text-[10px] text-secondary block">SPOONS SAVED</span>
                  <span className="font-bold text-amber-800 text-sm">
                    {reclaimedCutleryCount} Cutlery
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Hardware Firmware Log Terminal */}
          <div className="bg-inverse-surface rounded-2xl border border-outline/30 p-4 font-mono text-xs shadow-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">
                  ESP32-S3 RTOS FIRMWARE LOG
                </span>
              </div>
              <span className="text-[9px] text-white/50">115200 BAUD</span>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto text-[10px] pr-1 scrollbar-thin">
              {liveLogs.map((log) => (
                <div key={log.id} className="leading-relaxed">
                  <span className="text-white/40 mr-1.5">[{log.time}]</span>
                  <span className="font-bold text-primary mr-1">&lt;{log.tag}&gt;</span>
                  <span className={log.color}>{log.text}</span>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
