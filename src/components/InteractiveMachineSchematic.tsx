"use client";

import React, { useState, useEffect } from "react";

export type ComponentId =
  | "shredder"
  | "sensor_ring"
  | "inoculation_valve"
  | "macerator_core"
  | "catalytic_scrubber"
  | "biogas_bladder"
  | "effluent_sump";

interface ComponentDetail {
  id: ComponentId;
  name: string;
  tag: string;
  cadRef: string;
  category: "Mechanical" | "Sensors & AI" | "Fluidics" | "Bioreactor" | "Gas Train";
  material: string;
  operatingMetrics: {
    label: string;
    value: string;
    unit: string;
    status: "nominal" | "active" | "optimal" | "standby";
  }[];
  specNotes: string[];
  docExcerpt: string;
  safetyProtocol: string;
}

const MACHINE_COMPONENTS: Record<ComponentId, ComponentDetail> = {
  shredder: {
    id: "shredder",
    name: "Inlet Shredder & Feed Chute",
    tag: "MTR-SHR-01",
    cadRef: "DWG-ECO-010-SHR",
    category: "Mechanical",
    material: "SS316 Hardened Austenitic Stainless Steel & PEEK Bushings",
    operatingMetrics: [
      { label: "Shaft Speed", value: "1,420", unit: "RPM", status: "nominal" },
      { label: "Motor Torque", value: "4.8", unit: "N·m", status: "nominal" },
      { label: "Shaft Bearing Temp", value: "38.4", unit: "°C", status: "nominal" },
      { label: "Acoustic Attenuation", value: "< 48", unit: "dBA", status: "optimal" },
    ],
    specNotes: [
      "Dual counter-rotating shear shafts crush stubborn vegetable peels, bones, and citrus rind.",
      "Negative-pressure acoustic enclosure with Viton rim seals prevents vapor or odor escape.",
      "Integrated micro-interlock immediately cuts motor power if hopper lid opens during rotation.",
    ],
    docExcerpt:
      "Crushes and shears incoming raw food scraps and biological waste into small uniform particles to maximize exposed surface area for microbial enzymes (Startup Doc §3.1).",
    safetyProtocol:
      "Current overload cutoff trip (> 5.2A for 0.4s) auto-reverses rotation to unjam trapped non-degradable solids.",
  },
  sensor_ring: {
    id: "sensor_ring",
    name: "Tri-Stream Multi-Sensor Ring",
    tag: "SEN-TRI-02",
    cadRef: "DWG-ECO-020-OPT",
    category: "Sensors & AI",
    material: "CNC Anodized Aircraft Aluminum Housing & Optical Sapphire Glass",
    operatingMetrics: [
      { label: "Edge AI Model", value: "YOLOv8-INT8", unit: "Quantized", status: "active" },
      { label: "Inference Latency", value: "142", unit: "ms", status: "optimal" },
      { label: "Dielectric Moisture", value: "78.4", unit: "% RH", status: "nominal" },
      { label: "Metal Induction", value: "0.0", unit: "Contam", status: "optimal" },
    ],
    specNotes: [
      "ESP32-S3 microcontroller core with vector instructions executing 8-bit quantized neural weights in under 200ms.",
      "Capacitive moisture sensor array detects liquid bounds, differentiating dry cardboard from organic scraps.",
      "Inductive proximity coil instantly detects rogue cutlery, screws, or foil wrappers and triggers the dry reject flap.",
    ],
    docExcerpt:
      "Perception unit combining optical bounding with capacitive moisture, inductive metal, and weight load sensors to achieve >90% sorting accuracy on soiled trash (PPT Slide 4).",
    safetyProtocol:
      "Optical lens auto-clearing air pulse fires every 50 ingestion cycles to prevent food splatter obstruction.",
  },
  inoculation_valve: {
    id: "inoculation_valve",
    name: "Dual Solenoid Inoculation & Buffer Valve",
    tag: "SOL-INOC-03",
    cadRef: "DWG-ECO-030-VALV",
    category: "Fluidics",
    material: "Direct-Acting Solenoid Brass/PTFE Manifold, Viton Elastomers",
    operatingMetrics: [
      { label: "Water Micro-Dosing", value: "1:1.1", unit: "Mass Ratio", status: "nominal" },
      { label: "Buffer Dosing Rate", value: "94.8", unit: "mL/pulse", status: "nominal" },
      { label: "Line Pressure", value: "2.1", unit: "bar", status: "nominal" },
      { label: "Solenoid Pulse Time", value: "0.20", unit: "sec", status: "optimal" },
    ],
    specNotes: [
      "Directs automated warm greywater or potable water injection to transform sheared food waste into fluid slurry.",
      "Dedicated secondary solenoid injects saturated sodium bicarbonate (NaHCO3) buffer upon volatile fatty acid (VFA) build-up.",
      "Fail-closed magnetic coil ensures absolute isolation between domestic water supply and the biological chamber.",
    ],
    docExcerpt:
      "Controlled water injection mixes with micro-particles to form optimal fluid slurry; real-time pH telemetry auto-doses NaHCO3 buffer to arrest organic souring (Startup Doc §3.2 & PPT Slide 4).",
    safetyProtocol:
      "Dual check valves prevent any backflow into the municipal water inlet, rated for 10 bar static burst test.",
  },
  macerator_core: {
    id: "macerator_core",
    name: "Anaerobic Maceration Core & Biodigester",
    tag: "BIO-CORE-04",
    cadRef: "DWG-ECO-040-CORE",
    category: "Bioreactor",
    material: "Double-Walled Polyurea-Coated SS316 with 40mm Aerogel Vacuum Insulation",
    operatingMetrics: [
      { label: "Core Temperature", value: "37.2", unit: "°C", status: "optimal" },
      { label: "Slurry Particle Size", value: "< 1.8", unit: "mm", status: "optimal" },
      { label: "Chamber pH", value: "7.14", unit: "pH", status: "optimal" },
      { label: "Slurry Viscosity", value: "1.38", unit: "Pa·s", status: "nominal" },
    ],
    specNotes: [
      "Mesophilic digestion chamber with closed-loop PTC electric heating jacket maintaining an exact 37.2°C thermal equilibrium.",
      "Submerged low-shear slow-speed agitator ensures uniform contact between methanogens and micro-slurry particles.",
      "4-stage biochemical transition: Hydrolysis -> Acidogenesis -> Acetogenesis -> Methanogenesis.",
    ],
    docExcerpt:
      "Specialized microbial cultures break down the complex organic slurry inside a highly insulated, airtight environment yielding methane-rich raw biogas and organic fertilizer (Startup Doc §3.3).",
    safetyProtocol:
      "Dual mechanical weighted relief pop-off valves vent safely if chamber pressure exceeds 35 mbar.",
  },
  catalytic_scrubber: {
    id: "catalytic_scrubber",
    name: "Catalytic H2S Scrubber & Gas Filter Array",
    tag: "SCR-H2S-05",
    cadRef: "DWG-ECO-050-SCR",
    category: "Gas Train",
    material: "Reinforced Polypropylene Cylinder with Iron Oxide Pellet & Activated Carbon Matrix",
    operatingMetrics: [
      { label: "H2S Residual", value: "1.8", unit: "ppm", status: "optimal" },
      { label: "Media Bed Life", value: "84.2", unit: "% Remaining", status: "nominal" },
      { label: "Moisture Dew Point", value: "4.2", unit: "°C", status: "nominal" },
      { label: "Gas Flow Rate", value: "18.6", unit: "L/min", status: "active" },
    ],
    specNotes: [
      "Stage 1: Granular iron sponge (Fe2O3/FeOOH) reacts chemically with hydrogen sulfide: Fe2O3 + 3 H2S -> Fe2S3 + 3 H2O.",
      "Stage 2: High surface area extruded activated carbon bed adsorbs trace siloxanes, mercaptans, and lingering aromatic VOCs.",
      "Stage 3: Hydrophobic PTFE membrane moisture trap coalesces saturated water vapor into bottom drain.",
    ],
    docExcerpt:
      "Scrubbing column removing harmful H2S and water vapor for clean, odorless combustion and preventing burner corrosion (Startup Doc §3.4 & Spec Matrix).",
    safetyProtocol:
      "Continuous optical H2S transducer signals automated filter maintenance alarm when effluent exceeds 5 ppm.",
  },
  biogas_bladder: {
    id: "biogas_bladder",
    name: "Biogas Storage Bladder & Pressure Hub",
    tag: "ACC-GAS-06",
    cadRef: "DWG-ECO-060-BLAD",
    category: "Gas Train",
    material: "Multi-ply Reinforced Thermoplastic Polyurethane (TPU) Gas-Impermeable Membrane",
    operatingMetrics: [
      { label: "Bladder Pressure", value: "18.2", unit: "mbar", status: "optimal" },
      { label: "Methane Purity", value: "65.4", unit: "% CH4", status: "optimal" },
      { label: "Stored Volume", value: "18.4", unit: "m³", status: "nominal" },
      { label: "Burner Line Flow", value: "0.85", unit: "m³/hr", status: "nominal" },
    ],
    specNotes: [
      "Flexible constant-pressure buffer vessel expands volumetrically without requiring high-pressure mechanical compressors.",
      "Solid-state catalytic CH4 sensor continuously monitors ambient surroundings; triggers fail-closed solenoid if gas > 0.5%.",
      "Supplies clean methane fuel directly to commercial kitchen burners or auxiliary micro-generation alternator engine.",
    ],
    docExcerpt:
      "Purified biogas is safely compressed and routed to a dedicated internal pressure storage unit; connects directly to kitchen counter cooktops (Startup Doc §3.5).",
    safetyProtocol:
      "ATEX Zone 2 rated intrinsically safe electronics with external flame arrestor manifold meeting EN 12874.",
  },
  effluent_sump: {
    id: "effluent_sump",
    name: "Bio-Fertilizer Harvest Sump & Outlet",
    tag: "SMP-FERT-07",
    cadRef: "DWG-ECO-070-SUMP",
    category: "Fluidics",
    material: "High-Density Polyethylene (HDPE) with Quick-Disconnect Camlock Valve",
    operatingMetrics: [
      { label: "Harvest Tank Level", value: "142", unit: "Liters", status: "nominal" },
      { label: "NPK Rating", value: "3.8 - 1.4 - 2.6", unit: "Ratio", status: "optimal" },
      { label: "Pathogen Clearance", value: "100%", unit: "E. Coli Neg", status: "optimal" },
      { label: "Dispense Pressure", value: "1.2", unit: "bar", status: "nominal" },
    ],
    specNotes: [
      "Collects anaerobic digestate effluent rich in ammoniacal nitrogen, bio-available phosphorus, and potassium.",
      "Peristaltic displacement pump discharges clear liquid bio-fertilizer into society campus irrigation or collection canisters.",
      "Anaerobic thermophilic retention (> 14 days) guarantees full destruction of weed seeds and human pathogenic bacteria.",
    ],
    docExcerpt:
      "Produces nutrient-rich organic liquid and solid fertilizer ready for domestic gardening and society horticulture (Startup Doc §3.3 & PPT Slide 3).",
    safetyProtocol:
      "Overfill capacitive float sensor automatically pauses fresh ingestion if fertilizer reservoir hits 95% capacity.",
  },
};

interface Props {
  profile: "family" | "society";
}

export default function InteractiveMachineSchematic({ profile }: Props) {
  const [selectedComponent, setSelectedComponent] = useState<ComponentId>("shredder");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"schematic" | "exploded" | "pfd">("schematic");
  const [explodedLayer, setExplodedLayer] = useState<number>(2);

  // Simulation step timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimulating) {
      timer = setInterval(() => {
        setSimStep((prev) => {
          if (prev >= 4) {
            setIsSimulating(false);
            return 0;
          }
          return prev + 1;
        });
      }, 2200);
    }
    return () => clearInterval(timer);
  }, [isSimulating]);

  const activeComp = MACHINE_COMPONENTS[selectedComponent];

  const simulationSteps = [
    {
      title: "Raw Waste Ingestion & Optical Tri-Stream Scan",
      desc: "Waste dropped into hopper. ESP32-S3 runs YOLOv8 INT8 inference (142ms); moisture & metal coils isolate clean recyclables.",
      target: "sensor_ring" as ComponentId,
      activeColor: "#137547",
    },
    {
      title: "High-Torque Shear & Slurry Inoculation",
      desc: "SS316 shredder blades pulverize scraps into <2mm micro-slurry. Dual solenoid injects water and NaHCO3 alkaline buffer.",
      target: "inoculation_valve" as ComponentId,
      activeColor: "#d97706",
    },
    {
      title: "Mesophilic Biodigestion (37.2°C)",
      desc: "Micro-slurry ferments inside vacuum-insulated core. Methanogens produce raw biogas while liquid digestate settles.",
      target: "macerator_core" as ComponentId,
      activeColor: "#005b34",
    },
    {
      title: "Catalytic H2S Scrubbing & Odor Stripping",
      desc: "Raw gas passes through iron sponge & activated carbon column; H2S reduced to <1.8 ppm. Water vapor coalesces out.",
      target: "catalytic_scrubber" as ComponentId,
      activeColor: "#0284c7",
    },
    {
      title: "Biogas Dispatch & Bio-Fertilizer Harvest",
      desc: "Purified methane expands into 18.2 mbar storage bladder; nutrient-rich liquid bio-fertilizer discharges to campus soil manifold.",
      target: "biogas_bladder" as ComponentId,
      activeColor: "#16a34a",
    },
  ];

  const handleSimulateCycle = () => {
    if (isSimulating) {
      setIsSimulating(false);
      setSimStep(0);
    } else {
      setIsSimulating(true);
      setSimStep(0);
      setSelectedComponent("shredder");
    }
  };

  return (
    <div className="w-full bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      {/* Top Header & Subsystem Controls */}
      <div className="p-6 border-b border-outline-variant bg-surface-container-low flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-mono text-xs uppercase font-bold text-primary tracking-wider">
              HARDWARE ARCHITECTURE CAD SCHEMATIC
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container border border-outline-variant text-on-surface-variant font-semibold">
              {profile === "society" ? "SOCIETY SKID MODEL (300 KG/D)" : "FAMILY APPLIANCE (15 KG/D)"}
            </span>
          </div>
          <h3 className="text-xl lg:text-2xl font-extrabold text-on-surface">
            Interactive Machine Architecture &amp; Exploded Flow
          </h3>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Click any machine hotspot to inspect live mechanical kinematics, sensor telemetry, and engineering notes.
          </p>
        </div>

        {/* View Switcher & Simulation Button */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* View Mode Switcher */}
          <div className="inline-flex rounded-lg border border-outline-variant p-0.5 bg-surface-container text-xs font-mono">
            <button
              onClick={() => setViewMode("schematic")}
              className={`px-3 py-1.5 rounded font-semibold transition-all cursor-pointer ${
                viewMode === "schematic"
                  ? "bg-surface-container-lowest text-primary shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Schematic Flow
            </button>
            <button
              onClick={() => setViewMode("exploded")}
              className={`px-3 py-1.5 rounded font-semibold transition-all cursor-pointer ${
                viewMode === "exploded"
                  ? "bg-surface-container-lowest text-primary shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Exploded CAD
            </button>
            <button
              onClick={() => setViewMode("pfd")}
              className={`px-3 py-1.5 rounded font-semibold transition-all cursor-pointer ${
                viewMode === "pfd"
                  ? "bg-surface-container-lowest text-primary shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              P&amp;ID Instrumentation
            </button>
          </div>

          {/* Simulate Ingestion Cycle Button */}
          <button
            onClick={handleSimulateCycle}
            className={`px-4 py-2 rounded font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95 ${
              isSimulating
                ? "bg-amber-accent text-white animate-pulse"
                : "bg-primary-container text-on-primary hover:bg-primary"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isSimulating ? "restart_alt" : "play_circle"}
            </span>
            <span>{isSimulating ? `Cycle Active (Stage 0${simStep + 1})` : "Simulate Ingestion Cycle"}</span>
          </button>
        </div>
      </div>

      {/* Active Simulation Step Banner */}
      {isSimulating && (
        <div className="bg-primary-fixed/20 border-b border-primary/30 px-6 py-2.5 flex items-center justify-between transition-all">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
            <div>
              <span className="font-mono text-xs font-bold text-primary mr-2 uppercase">
                Step 0{simStep + 1}/05: {simulationSteps[simStep]?.title}
              </span>
              <span className="text-xs text-on-surface-variant hidden md:inline">
                {simulationSteps[simStep]?.desc}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 font-mono text-[11px] text-primary font-bold">
            <span>Cycle In Progress</span>
            <span className="material-symbols-outlined text-[14px] animate-spin">sync</span>
          </div>
        </div>
      )}

      {/* Main Interactive Stage: SVG Canvas (Left 7 cols) & Hardware Inspector Panel (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* ================= SVG / SCHEMATIC VISUALIZER (COL 1-7) ================= */}
        <div className="lg:col-span-7 p-4 lg:p-6 bg-surface-container-low/40 relative flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-outline-variant technical-grid-bg select-none">
          {/* Quick HUD overlay top */}
          <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-on-surface-variant">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span>CH4 CORE: 37.2°C</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>P_BLADDER: 18.2 mbar</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>H2S: 1.8 ppm</span>
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-surface-container-lowest border border-outline-variant font-bold">
              CAD SCALE: 1:15 ISO-METRIC
            </span>
          </div>

          {/* SVG RENDERING VIEW */}
          {viewMode === "schematic" && (
            <div className="relative w-full aspect-[4/3] max-h-[520px] flex items-center justify-center">
              <svg
                viewBox="0 0 800 600"
                className="w-full h-full drop-shadow-sm transition-all"
                style={{ overflow: "visible" }}
              >
                <defs>
                  {/* Linear Gradients */}
                  <linearGradient id="chuteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4a5568" />
                    <stop offset="100%" stopColor="#2d3748" />
                  </linearGradient>
                  <linearGradient id="digesterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#137547" stopOpacity="0.25" />
                    <stop offset="70%" stopColor="#005b34" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#002b17" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="gasPipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                  <linearGradient id="slurryPipeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#793f00" />
                    <stop offset="100%" stopColor="#451a03" />
                  </linearGradient>
                  <linearGradient id="bladderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Subsystem Outer Frame Outline */}
                <rect
                  x="20"
                  y="20"
                  width="760"
                  height="560"
                  rx="12"
                  fill="none"
                  stroke="#bec9bf"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <text x="35" y="45" fill="#6f7a70" fontSize="10" fontFamily="monospace">
                  CHASSIS ENCLOSURE: IP66 RATED AUSTENITIC SS316 FRAME
                </text>

                {/* ================= CONNECTING PIPES & FLOW PATHS ================= */}

                {/* Flow Path 1: Inlet Hopper to Macerator */}
                <path
                  d="M 170 120 L 170 200 L 220 200 L 220 260"
                  fill="none"
                  stroke="#6f7a70"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {isSimulating && simStep <= 1 && (
                  <path
                    d="M 170 120 L 170 200 L 220 200 L 220 260"
                    fill="none"
                    stroke="#137547"
                    strokeWidth="4"
                    strokeDasharray="6 6"
                    className="animate-pulse"
                  />
                )}

                {/* Dry Recyclables Diverter Flap (Lateral) */}
                <path
                  d="M 170 180 L 90 230"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="4"
                  strokeDasharray="3 3"
                />
                <circle cx="90" cy="230" r="14" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
                <text x="90" y="233" textAnchor="middle" fontSize="8" fill="#475569" fontWeight="bold">
                  DRY
                </text>
                <text x="90" y="255" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="monospace">
                  PET / CANS
                </text>

                {/* Flow Path 2: Buffer/Water Injection from Solenoid into Core */}
                <path
                  d="M 330 200 L 250 200 L 250 260"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="4"
                  strokeDasharray={isSimulating && simStep === 1 ? "4 4" : "none"}
                />

                {/* Flow Path 3: Biogas Riser from Core to Scrubber */}
                <path
                  d="M 360 270 L 360 140 L 480 140"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                {isSimulating && simStep >= 2 && (
                  <path
                    d="M 360 270 L 360 140 L 480 140"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                    className="animate-pulse"
                  />
                )}

                {/* Flow Path 4: Clean Gas from Scrubber to Bladder */}
                <path
                  d="M 570 140 L 640 140 L 640 220"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* Flow Path 5: Biogas Delivery from Bladder to Kitchen/Canteen Line */}
                <path
                  d="M 640 340 L 640 470 L 720 470"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="4"
                  strokeDasharray="4 4"
                />
                <circle cx="720" cy="470" r="12" fill="#059669" />
                <text x="720" y="473" textAnchor="middle" fontSize="8" fill="#ffffff" fontWeight="bold">
                  GAS
                </text>
                <text x="720" y="495" textAnchor="middle" fontSize="7" fill="#059669" fontFamily="monospace">
                  TO COOKSTOVES
                </text>

                {/* Flow Path 6: Liquid Slurry Effluent Drain to Sump */}
                <path
                  d="M 280 470 L 280 510 L 460 510"
                  fill="none"
                  stroke="#793f00"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {isSimulating && simStep >= 3 && (
                  <path
                    d="M 280 470 L 280 510 L 460 510"
                    fill="none"
                    stroke="#ffdcc3"
                    strokeWidth="3"
                    strokeDasharray="5 5"
                  />
                )}

                {/* ================= HARDWARE MODULE 1: INLET SHREDDER ================= */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setSelectedComponent("shredder")}
                >
                  <polygon
                    points="120,60 220,60 190,140 150,140"
                    fill="url(#chuteGrad)"
                    stroke={selectedComponent === "shredder" ? "#005b34" : "#475569"}
                    strokeWidth={selectedComponent === "shredder" ? "3" : "1.5"}
                    filter={selectedComponent === "shredder" ? "url(#glowEffect)" : undefined}
                  />
                  {/* Rotating Blades representation */}
                  <circle cx="170" cy="140" r="18" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                  <line
                    x1="155"
                    y1="140"
                    x2="185"
                    y2="140"
                    stroke="#f8fafc"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className={isSimulating ? "animate-spin origin-[170px_140px]" : ""}
                  />
                  <line
                    x1="170"
                    y1="125"
                    x2="170"
                    y2="155"
                    stroke="#f8fafc"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className={isSimulating ? "animate-spin origin-[170px_140px]" : ""}
                  />
                  <text x="170" y="85" textAnchor="middle" fontSize="9" fill="#ffffff" fontWeight="bold">
                    INLET HOPPER
                  </text>
                  <text x="170" y="98" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="monospace">
                    1,420 RPM SHIFT
                  </text>

                  {/* Hotspot indicator tag */}
                  <rect
                    x="130"
                    y="35"
                    width="80"
                    height="18"
                    rx="4"
                    fill={selectedComponent === "shredder" ? "#005b34" : "#ffffff"}
                    stroke="#005b34"
                    strokeWidth="1.5"
                  />
                  <text
                    x="170"
                    y="47"
                    textAnchor="middle"
                    fontSize="8"
                    fill={selectedComponent === "shredder" ? "#ffffff" : "#005b34"}
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    01. SHREDDER
                  </text>
                </g>

                {/* ================= HARDWARE MODULE 2: SENSOR RING ================= */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setSelectedComponent("sensor_ring")}
                >
                  <rect
                    x="135"
                    y="170"
                    width="70"
                    height="28"
                    rx="5"
                    fill="#0f172a"
                    stroke={selectedComponent === "sensor_ring" ? "#005b34" : "#38bdf8"}
                    strokeWidth={selectedComponent === "sensor_ring" ? "3" : "2"}
                    filter={selectedComponent === "sensor_ring" ? "url(#glowEffect)" : undefined}
                  />
                  {/* Optical lens representation */}
                  <circle cx="150" cy="184" r="6" fill="#38bdf8" />
                  <circle cx="150" cy="184" r="2" fill="#ffffff" />
                  <text x="175" y="187" textAnchor="middle" fontSize="8" fill="#38bdf8" fontWeight="bold" fontFamily="monospace">
                    YOLOv8
                  </text>

                  {/* Laser Scan Beam */}
                  {isSimulating && simStep === 0 && (
                    <polygon
                      points="150,190 135,215 190,215"
                      fill="#38bdf8"
                      opacity="0.35"
                      className="animate-pulse"
                    />
                  )}

                  <rect
                    x="85"
                    y="160"
                    width="44"
                    height="16"
                    rx="3"
                    fill={selectedComponent === "sensor_ring" ? "#005b34" : "#ffffff"}
                    stroke="#005b34"
                    strokeWidth="1"
                  />
                  <text
                    x="107"
                    y="171"
                    textAnchor="middle"
                    fontSize="7"
                    fill={selectedComponent === "sensor_ring" ? "#ffffff" : "#005b34"}
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    02. SENSORS
                  </text>
                </g>

                {/* ================= HARDWARE MODULE 3: DUAL SOLENOID VALVE ================= */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setSelectedComponent("inoculation_valve")}
                >
                  <rect
                    x="330"
                    y="180"
                    width="55"
                    height="38"
                    rx="4"
                    fill="#1e293b"
                    stroke={selectedComponent === "inoculation_valve" ? "#005b34" : "#64748b"}
                    strokeWidth={selectedComponent === "inoculation_valve" ? "3" : "1.5"}
                    filter={selectedComponent === "inoculation_valve" ? "url(#glowEffect)" : undefined}
                  />
                  <polygon points="340,190 350,205 340,205" fill="#38bdf8" />
                  <polygon points="360,190 350,205 360,205" fill="#38bdf8" />
                  <text x="357" y="212" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="monospace">
                    NaHCO3
                  </text>

                  <rect
                    x="330"
                    y="155"
                    width="55"
                    height="16"
                    rx="3"
                    fill={selectedComponent === "inoculation_valve" ? "#005b34" : "#ffffff"}
                    stroke="#005b34"
                    strokeWidth="1"
                  />
                  <text
                    x="357"
                    y="166"
                    textAnchor="middle"
                    fontSize="7"
                    fill={selectedComponent === "inoculation_valve" ? "#ffffff" : "#005b34"}
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    03. SOLENOID
                  </text>
                </g>

                {/* ================= HARDWARE MODULE 4: ANAEROBIC MACERATION CORE ================= */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setSelectedComponent("macerator_core")}
                >
                  {/* Digester Tank Outer Shell */}
                  <rect
                    x="180"
                    y="260"
                    width="220"
                    height="210"
                    rx="20"
                    fill="url(#digesterGrad)"
                    stroke={selectedComponent === "macerator_core" ? "#005b34" : "#137547"}
                    strokeWidth={selectedComponent === "macerator_core" ? "4" : "2"}
                    filter={selectedComponent === "macerator_core" ? "url(#glowEffect)" : undefined}
                  />

                  {/* Thermal Jacket Heating Coil Hatching */}
                  <line x1="195" y1="280" x2="385" y2="280" stroke="#ffdcc3" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
                  <line x1="195" y1="440" x2="385" y2="440" stroke="#ffdcc3" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />

                  {/* Agitator / Impeller in Center */}
                  <line x1="290" y1="260" x2="290" y2="410" stroke="#e2e8f0" strokeWidth="4" />
                  <ellipse cx="290" cy="380" rx="45" ry="12" fill="#334155" stroke="#cbd5e1" strokeWidth="2" />
                  <ellipse cx="290" cy="340" rx="35" ry="10" fill="#334155" stroke="#cbd5e1" strokeWidth="2" />

                  {/* Core Gas Bubbles Animation */}
                  <circle cx="260" cy="320" r="4" fill="#80d9a1" opacity="0.8" className={isSimulating ? "animate-bounce" : ""} />
                  <circle cx="320" cy="300" r="5" fill="#80d9a1" opacity="0.7" className={isSimulating ? "animate-pulse" : ""} />
                  <circle cx="290" cy="285" r="3" fill="#80d9a1" opacity="0.9" />

                  {/* Digester Telemetry Overlay on Tank */}
                  <rect x="220" y="420" width="140" height="36" rx="6" fill="#0f172a" opacity="0.9" />
                  <text x="290" y="435" textAnchor="middle" fontSize="9" fill="#80d9a1" fontWeight="bold" fontFamily="monospace">
                    TEMP: 37.2°C · pH: 7.14
                  </text>
                  <text x="290" y="448" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="monospace">
                    PARTICLE: &lt;1.8mm MICRO-SLURRY
                  </text>

                  <rect
                    x="235"
                    y="235"
                    width="110"
                    height="18"
                    rx="4"
                    fill={selectedComponent === "macerator_core" ? "#005b34" : "#ffffff"}
                    stroke="#005b34"
                    strokeWidth="1.5"
                  />
                  <text
                    x="290"
                    y="247"
                    textAnchor="middle"
                    fontSize="8"
                    fill={selectedComponent === "macerator_core" ? "#ffffff" : "#005b34"}
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    04. MACERATION CORE
                  </text>
                </g>

                {/* ================= HARDWARE MODULE 5: CATALYTIC H2S SCRUBBER ================= */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setSelectedComponent("catalytic_scrubber")}
                >
                  <rect
                    x="480"
                    y="100"
                    width="90"
                    height="80"
                    rx="10"
                    fill="#0f172a"
                    stroke={selectedComponent === "catalytic_scrubber" ? "#005b34" : "#0284c7"}
                    strokeWidth={selectedComponent === "catalytic_scrubber" ? "3" : "2"}
                    filter={selectedComponent === "catalytic_scrubber" ? "url(#glowEffect)" : undefined}
                  />
                  {/* Dual filtration bed layers */}
                  <rect x="490" y="115" width="70" height="20" rx="3" fill="#334155" />
                  <text x="525" y="128" textAnchor="middle" fontSize="7" fill="#e2e8f0" fontFamily="monospace">
                    Fe2O3 SPONGE
                  </text>
                  <rect x="490" y="145" width="70" height="22" rx="3" fill="#1e293b" />
                  <text x="525" y="159" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="monospace">
                    ACTIVATED CARBON
                  </text>

                  <rect
                    x="475"
                    y="75"
                    width="100"
                    height="18"
                    rx="4"
                    fill={selectedComponent === "catalytic_scrubber" ? "#005b34" : "#ffffff"}
                    stroke="#005b34"
                    strokeWidth="1.5"
                  />
                  <text
                    x="525"
                    y="87"
                    textAnchor="middle"
                    fontSize="8"
                    fill={selectedComponent === "catalytic_scrubber" ? "#ffffff" : "#005b34"}
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    05. H2S SCRUBBER
                  </text>
                </g>

                {/* ================= HARDWARE MODULE 6: BIOGAS BLADDER ================= */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setSelectedComponent("biogas_bladder")}
                >
                  {/* Bladder shape */}
                  <rect
                    x="580"
                    y="220"
                    width="120"
                    height="120"
                    rx="28"
                    fill="url(#bladderGrad)"
                    stroke={selectedComponent === "biogas_bladder" ? "#005b34" : "#059669"}
                    strokeWidth={selectedComponent === "biogas_bladder" ? "4" : "2"}
                    filter={selectedComponent === "biogas_bladder" ? "url(#glowEffect)" : undefined}
                  />
                  <circle cx="640" cy="275" r="28" fill="#ffffff" opacity="0.95" stroke="#059669" strokeWidth="2" />
                  {/* Pressure gauge needle */}
                  <line x1="640" y1="275" x2="655" y2="265" stroke="#ba1a1a" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="640" cy="275" r="3" fill="#1e293b" />
                  <text x="640" y="293" textAnchor="middle" fontSize="7" fill="#065f46" fontWeight="bold" fontFamily="monospace">
                    18.2 mbar
                  </text>
                  <text x="640" y="325" textAnchor="middle" fontSize="8" fill="#ffffff" fontWeight="bold" fontFamily="monospace">
                    CH4: 65.4%
                  </text>

                  <rect
                    x="585"
                    y="190"
                    width="110"
                    height="18"
                    rx="4"
                    fill={selectedComponent === "biogas_bladder" ? "#005b34" : "#ffffff"}
                    stroke="#005b34"
                    strokeWidth="1.5"
                  />
                  <text
                    x="640"
                    y="202"
                    textAnchor="middle"
                    fontSize="8"
                    fill={selectedComponent === "biogas_bladder" ? "#ffffff" : "#005b34"}
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    06. GAS BLADDER
                  </text>
                </g>

                {/* ================= HARDWARE MODULE 7: BIO-FERTILIZER SUMP ================= */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setSelectedComponent("effluent_sump")}
                >
                  <rect
                    x="460"
                    y="460"
                    width="140"
                    height="85"
                    rx="8"
                    fill="#3b1f0b"
                    stroke={selectedComponent === "effluent_sump" ? "#005b34" : "#793f00"}
                    strokeWidth={selectedComponent === "effluent_sump" ? "3" : "2"}
                    filter={selectedComponent === "effluent_sump" ? "url(#glowEffect)" : undefined}
                  />
                  {/* Liquid fill graphic */}
                  <rect x="470" y="490" width="120" height="45" rx="4" fill="#793f00" opacity="0.8" />
                  <text x="530" y="482" textAnchor="middle" fontSize="8" fill="#ffdcc3" fontWeight="bold" fontFamily="monospace">
                    HARVEST SUMP: 142L
                  </text>
                  <text x="530" y="515" textAnchor="middle" fontSize="8" fill="#ffffff" fontFamily="monospace">
                    NPK: 3.8 - 1.4 - 2.6
                  </text>
                  <text x="530" y="527" textAnchor="middle" fontSize="7" fill="#ffb77d" fontFamily="monospace">
                    PATHOGEN: 0 CFU/mL
                  </text>

                  <rect
                    x="475"
                    y="435"
                    width="110"
                    height="18"
                    rx="4"
                    fill={selectedComponent === "effluent_sump" ? "#005b34" : "#ffffff"}
                    stroke="#005b34"
                    strokeWidth="1.5"
                  />
                  <text
                    x="530"
                    y="447"
                    textAnchor="middle"
                    fontSize="8"
                    fill={selectedComponent === "effluent_sump" ? "#ffffff" : "#005b34"}
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    07. BIO-FERTILIZER
                  </text>
                </g>
              </svg>
            </div>
          )}

          {/* EXPLODED CAD VIEW */}
          {viewMode === "exploded" && (
            <div className="flex flex-col h-full justify-between py-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-on-surface uppercase">
                  Exploded CAD Assembly Layers
                </span>
                <div className="flex items-center gap-1 text-xs font-mono">
                  <span className="text-on-surface-variant">Active Subsystem:</span>
                  <span className="font-bold text-primary">Layer 0{explodedLayer}</span>
                </div>
              </div>

              {/* Layer Selection Pills */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  { layer: 1, name: "Outer Shell & Chute", tag: "EXT-01" },
                  { layer: 2, name: "Sensor & Diverter Ring", tag: "SEN-02" },
                  { layer: 3, name: "Macerator & Tank", tag: "BIO-03" },
                  { layer: 4, name: "Gas Train & Scrubber", tag: "GAS-04" },
                ].map((item) => (
                  <button
                    key={item.layer}
                    onClick={() => setExplodedLayer(item.layer)}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      explodedLayer === item.layer
                        ? "bg-primary-container text-on-primary border-primary shadow-xs"
                        : "bg-surface-container-lowest text-on-surface border-outline-variant hover:border-primary/50"
                    }`}
                  >
                    <span className="block text-[10px] font-mono opacity-80">{item.tag}</span>
                    <span className="block text-xs font-bold leading-tight mt-0.5">{item.name}</span>
                  </button>
                ))}
              </div>

              {/* Layer Detailed Exploded Schematics Card */}
              <div className="bg-surface-container-lowest rounded-lg border border-outline-variant p-6 flex-1 flex flex-col justify-center">
                {explodedLayer === 1 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-outline-variant pb-2">
                      <h4 className="font-bold text-sm text-on-surface">Layer 01: Outer Chassis &amp; Drop Chute</h4>
                      <span className="font-mono text-xs text-primary">IP66 / SS316 2.0mm</span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Acoustic dampening honeycomb lining reducing blade vibration noise below 48 dBA. Reinforced drop
                      mouth accepts standard household waste buckets or canteen crates. Dual safety microswitches
                      interlock the rotation drive upon top lid opening.
                    </p>
                    <div className="grid grid-cols-3 gap-2 pt-2 text-center font-mono text-[11px]">
                      <div className="p-2 bg-surface-container rounded border border-outline-variant">
                        <span className="block text-on-surface-variant text-[10px]">Material</span>
                        <span className="font-bold text-on-surface">SS316 Brushed</span>
                      </div>
                      <div className="p-2 bg-surface-container rounded border border-outline-variant">
                        <span className="block text-on-surface-variant text-[10px]">Acoustic Seal</span>
                        <span className="font-bold text-on-surface">Viton EPDM Gasket</span>
                      </div>
                      <div className="p-2 bg-surface-container rounded border border-outline-variant">
                        <span className="block text-on-surface-variant text-[10px]">Chute Angle</span>
                        <span className="font-bold text-on-surface">45° Gravity Slide</span>
                      </div>
                    </div>
                  </div>
                )}
                {explodedLayer === 2 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-outline-variant pb-2">
                      <h4 className="font-bold text-sm text-on-surface">Layer 02: Tri-Stream Multi-Sensor Gantry</h4>
                      <span className="font-mono text-xs text-primary">ESP32-S3 / Dual ToF</span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      High-speed optical camera gantry paired with dielectric moisture probes and inductive metal
                      detectors. Segregates items into dry recyclables (PET, paper, aluminum cans) or wet organic food
                      scraps with under 200ms latency before drop into maceration chamber.
                    </p>
                    <div className="grid grid-cols-3 gap-2 pt-2 text-center font-mono text-[11px]">
                      <div className="p-2 bg-surface-container rounded border border-outline-variant">
                        <span className="block text-on-surface-variant text-[10px]">Optical Sensor</span>
                        <span className="font-bold text-on-surface">Sony IMX ToF</span>
                      </div>
                      <div className="p-2 bg-surface-container rounded border border-outline-variant">
                        <span className="block text-on-surface-variant text-[10px]">Inductive Ring</span>
                        <span className="font-bold text-on-surface">15mm Sensing Range</span>
                      </div>
                      <div className="p-2 bg-surface-container rounded border border-outline-variant">
                        <span className="block text-on-surface-variant text-[10px]">Sorting Accuracy</span>
                        <span className="font-bold text-primary">&gt; 94.6% Tested</span>
                      </div>
                    </div>
                  </div>
                )}
                {explodedLayer === 3 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-outline-variant pb-2">
                      <h4 className="font-bold text-sm text-on-surface">Layer 03: Anaerobic Digestion Chamber</h4>
                      <span className="font-mono text-xs text-primary">Aerogel Insulated / 37.2°C</span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Double-walled vessel featuring internal high-torque macerator blades grinding scraps into a uniform
                      &lt;2mm micro-slurry. Water micro-dosing and sodium bicarbonate (NaHCO3) buffer injections prevent
                      volatile fatty acid accumulation.
                    </p>
                    <div className="grid grid-cols-3 gap-2 pt-2 text-center font-mono text-[11px]">
                      <div className="p-2 bg-surface-container rounded border border-outline-variant">
                        <span className="block text-on-surface-variant text-[10px]">Heater Type</span>
                        <span className="font-bold text-on-surface">PTC Electric Jacket</span>
                      </div>
                      <div className="p-2 bg-surface-container rounded border border-outline-variant">
                        <span className="block text-on-surface-variant text-[10px]">Active pH Target</span>
                        <span className="font-bold text-on-surface">6.8 – 7.4 Buffer</span>
                      </div>
                      <div className="p-2 bg-surface-container rounded border border-outline-variant">
                        <span className="block text-on-surface-variant text-[10px]">Digestion Mode</span>
                        <span className="font-bold text-primary">Mesophilic</span>
                      </div>
                    </div>
                  </div>
                )}
                {explodedLayer === 4 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-outline-variant pb-2">
                      <h4 className="font-bold text-sm text-on-surface">Layer 04: Catalytic Scrubber &amp; Gas Bladder</h4>
                      <span className="font-mono text-xs text-primary">Fe2O3 + Carbon Bed / 18.2 mbar</span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Gas passes through iron oxide pellets stripping hydrogen sulfide to &lt;1.8 ppm, followed by
                      activated carbon polishing for zero-odor combustion. Fuel expands into a reinforced TPU flexible
                      gas accumulator with dual-solenoid overpressure relief.
                    </p>
                    <div className="grid grid-cols-3 gap-2 pt-2 text-center font-mono text-[11px]">
                      <div className="p-2 bg-surface-container rounded border border-outline-variant">
                        <span className="block text-on-surface-variant text-[10px]">H2S Residual</span>
                        <span className="font-bold text-primary">&lt; 2.0 ppm</span>
                      </div>
                      <div className="p-2 bg-surface-container rounded border border-outline-variant">
                        <span className="block text-on-surface-variant text-[10px]">Relief Cutoff</span>
                        <span className="font-bold text-on-surface">35 mbar Solenoid</span>
                      </div>
                      <div className="p-2 bg-surface-container rounded border border-outline-variant">
                        <span className="block text-on-surface-variant text-[10px]">Combustion Grade</span>
                        <span className="font-bold text-primary">65% Pure CH4</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PROCESS FLOW DIAGRAM (PFD) VIEW */}
          {viewMode === "pfd" && (
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant p-5 font-mono text-xs text-on-surface flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between border-b border-outline-variant pb-2 mb-4">
                  <span className="font-bold text-primary">P&amp;ID PROCESS INSTRUMENTATION TAGS</span>
                  <span className="text-[10px] text-on-surface-variant">SWM-2016 COMPLIANT SKID</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div className="p-2 rounded bg-surface-container border border-outline-variant">
                    <span className="font-bold text-primary">MTR-101:</span> Dual-Shaft Shear Drive (4.8 N·m)
                  </div>
                  <div className="p-2 rounded bg-surface-container border border-outline-variant">
                    <span className="font-bold text-primary">CAM-201:</span> Edge Vision Optical Gantry (YOLOv8)
                  </div>
                  <div className="p-2 rounded bg-surface-container border border-outline-variant">
                    <span className="font-bold text-primary">SV-301:</span> Buffer Dosing Solenoid (24V DC / 0.2s)
                  </div>
                  <div className="p-2 rounded bg-surface-container border border-outline-variant">
                    <span className="font-bold text-primary">TT-401:</span> Mesophilic Thermocouple (37.2°C ±0.1)
                  </div>
                  <div className="p-2 rounded bg-surface-container border border-outline-variant">
                    <span className="font-bold text-primary">pH-402:</span> Industrial Glass Electrode (7.14 pH)
                  </div>
                  <div className="p-2 rounded bg-surface-container border border-outline-variant">
                    <span className="font-bold text-primary">PT-501:</span> Bladder Pressure Transducer (18.2 mbar)
                  </div>
                  <div className="p-2 rounded bg-surface-container border border-outline-variant">
                    <span className="font-bold text-primary">AT-502:</span> Solid-State CH4 Vol% Detector
                  </div>
                  <div className="p-2 rounded bg-surface-container border border-outline-variant">
                    <span className="font-bold text-primary">PMP-601:</span> Peristaltic Fertilizer Pump (12 L/min)
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 rounded bg-primary-fixed/20 border border-primary/30 text-[11px] text-primary">
                <strong>Safety Interlock Loop:</strong> If AT-502 detects CH4 &gt; 0.5% in ambient air or PT-501
                exceeds 35 mbar, SV-301 and gas output valves seal closed within 80ms.
              </div>
            </div>
          )}

          {/* Bottom Interactive Breadcrumb */}
          <div className="mt-3 pt-3 border-t border-outline-variant/60 flex flex-wrap items-center justify-between text-[11px] font-mono text-on-surface-variant">
            <span>CLICKABLE HOTSPOTS: 7 HARDWARE MODULES</span>
            <span className="text-primary font-semibold">SELECTED: {activeComp.name}</span>
          </div>
        </div>

        {/* ================= HARDWARE INSPECTOR PANEL (COL 8-12) ================= */}
        <div className="lg:col-span-5 p-6 bg-surface-container-lowest flex flex-col justify-between">
          <div>
            {/* Tag & CAD reference */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-primary-container text-on-primary font-bold">
                {activeComp.tag}
              </span>
              <span className="font-mono text-[11px] text-on-surface-variant">
                CAD REF: {activeComp.cadRef}
              </span>
            </div>

            {/* Component Title & Category */}
            <div className="mb-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold">
                {activeComp.category} SUB-SYSTEM
              </span>
              <h4 className="text-xl font-extrabold text-on-surface mt-0.5">{activeComp.name}</h4>
              <p className="text-xs font-mono text-on-surface-variant mt-1">
                <strong>Material:</strong> {activeComp.material}
              </p>
            </div>

            {/* Live Operational Metrics Grid */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-on-surface uppercase">
                  Real-Time Operating Metrics
                </span>
                <span className="text-[10px] font-mono text-primary flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                  LIVE TELEMETRY
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {activeComp.operatingMetrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-surface-container border border-outline-variant flex flex-col justify-between"
                  >
                    <span className="text-[11px] text-on-surface-variant font-mono">
                      {metric.label}
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg font-extrabold font-mono text-on-surface">
                        {metric.value}
                      </span>
                      <span className="text-xs font-mono text-primary font-semibold">
                        {metric.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specification Bullet Points */}
            <div className="mb-4">
              <span className="text-xs font-mono font-bold text-on-surface uppercase block mb-2">
                Engineering Specification
              </span>
              <ul className="space-y-2 text-xs text-on-surface-variant">
                {activeComp.specNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-[14px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Startup Document Excerpt */}
            <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant mb-4">
              <span className="text-[10px] font-mono uppercase font-bold text-primary block mb-1">
                Document Parsing Citation
              </span>
              <p className="text-xs italic text-on-surface-variant leading-relaxed">
                &ldquo;{activeComp.docExcerpt}&rdquo;
              </p>
            </div>
          </div>

          {/* Safety & Protocol Footer */}
          <div className="pt-3 border-t border-outline-variant">
            <div className="flex items-start gap-2 text-xs font-mono text-secondary">
              <span className="material-symbols-outlined text-amber-accent text-[16px] shrink-0 mt-0.5">
                shield
              </span>
              <div>
                <strong className="text-on-surface">Safety Protocol: </strong>
                <span>{activeComp.safetyProtocol}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
