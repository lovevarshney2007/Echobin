"use client";

import React, { useState } from "react";

export type UnitProfile = "family" | "society";

interface StepData {
  stepNumber: string;
  title: string;
  subTitle: string;
  icon: string;
  coreConcept: string;
  familySpec: {
    hardware: string;
    throughput: string;
    power: string;
    kinetics: string;
  };
  societySpec: {
    hardware: string;
    throughput: string;
    power: string;
    kinetics: string;
  };
  chemistryPrinciple: string;
  reactionEquation?: string;
  engineeringSpec: string;
  keySensors: string[];
  swrComplianceNote: string;
}

const WORKFLOW_STEPS: StepData[] = [
  {
    stepNumber: "01",
    title: "Optical Edge-AI Segregation",
    subTitle: "ESP32-S3 Microcontroller & Tri-Stream Multi-Sensor Fusion",
    icon: "document_scanner",
    coreConcept:
      "Eliminates human sorting errors by processing mixed domestic inputs through high-speed computer vision and physical sensor arrays before physical ingestion.",
    familySpec: {
      hardware: "Single ESP32-S3 Core, 2MP Wide-Angle Camera, Dielectric Moisture Pad",
      throughput: "Up to 5 kg per ingestion batch (< 1.8s classification)",
      power: "3.5W active inference peak draw",
      kinetics: "Single-flap diverter solenoid mechanism (90° sweep in 120ms)",
    },
    societySpec: {
      hardware: "ESP32-S3 AI Cluster + Dual Sony IMX ToF Vision, Inductive Coil Ring, 4-Point Load Cells",
      throughput: "Continuous 300 kg/day canteen crates with automated high-speed conveyor sorting",
      power: "18W continuous sensor gantry draw",
      kinetics: "Pneumatic multi-gate sorting array isolating PET, paper, aluminum, and organic slurry",
    },
    chemistryPrinciple:
      "Dielectric permittivity differential (dry packaging ε_r ≈ 2-3 vs. wet organic scraps ε_r ≈ 50-80) enables instant differentiation even on dirty or food-stained plastics.",
    reactionEquation: "Dielectric Response: C_sensor = ε_r · ε_0 · (A / d)  [ε_r(food) >> ε_r(plastic)]",
    engineeringSpec:
      "Engineered for real-time sorting targeting >94% precision across mixed institutional canteen trays and packaging.",
    keySensors: [
      "Sony IMX Optical Vision (YOLOv8 INT8)",
      "Capacitive Moisture Dielectric Probe",
      "Inductive Metal Cutlery Detector",
      "Dynamic Load Cell Strain Gauges",
    ],
    swrComplianceNote:
      "Complies with SWR 2016 Rule 4(1)(a) mandating complete source segregation into biodegradable and non-biodegradable fractions.",
  },
  {
    stepNumber: "02",
    title: "High-Torque Maceration & Inoculation",
    subTitle: "Austenitic SS316 Shearing & Automated NaHCO3 Buffer Micro-Dosing",
    icon: "precision_manufacturing",
    coreConcept:
      "Pulverizes coarse vegetable scraps, rinds, and cooked waste into uniform micro-particles (<2mm) while micro-dosing water and alkaline buffer to accelerate enzymatic hydrolysis.",
    familySpec: {
      hardware: "Micro-Blade Vortex Impeller (SS316) with 250W single-phase motor",
      throughput: "Grinds 10 kg food waste in 120 seconds",
      power: "250W intermittent (0.04 kWh per daily cycle)",
      kinetics: "Particle reduction to 1.8mm median diameter with 1:1 water injection",
    },
    societySpec: {
      hardware: "Industrial High-Torque Dual-Shaft Masticator (3.2kW 3-phase) with planetary gearbox",
      throughput: "Shears 150 kg/hr bulk kitchen bones, fibrous peels, and dining scraps",
      power: "3.2kW heavy-duty shear drive (4.2 kWh daily total)",
      kinetics: "Uniform micro-slurry (<1.4mm) with dual-solenoid automated greywater & buffer dosing",
    },
    chemistryPrinciple:
      "Decreasing particle size from 20mm to <2mm increases exposed specific surface area by ~10×, accelerating biological hydrolysis kinetics and preventing anaerobic digester clogging.",
    reactionEquation: "Hydrolysis: (C6H10O5)_n + n H2O  →  n C6H12O6 (Monosaccharides)",
    engineeringSpec:
      "High-torque shearing design configured for micro-slurry reduction <2 mm without fiber entanglement on banana peels and fibrous greens.",
    keySensors: [
      "Motor Hall Effect RPM Encoder (1,420 RPM)",
      "Current Shunt Overload Sensor (Cutoff @ 5.2A)",
      "Dual Solenoid Pulse Flow Meter (0.2s pulse)",
      "Slurry Dynamic Viscosity Transducer (1.38 Pa·s)",
    ],
    swrComplianceNote:
      "Prepares food waste into fluid slurry without plastic stringers, safeguarding communal biodigesters from common choking failures.",
  },
  {
    stepNumber: "03",
    title: "Mesophilic Anaerobic Digestion",
    subTitle: "Airtight Fermentation Core at 37.2°C with Microbial pH Buffering",
    icon: "biotech",
    coreConcept:
      "Complex organic slurry enters an airtight vacuum-insulated anaerobic reactor where specialized microbial consortia convert fatty acids and sugars into raw methane and bio-fertilizer.",
    familySpec: {
      hardware: "45-Liter Polyurea-coated vacuum insulated biodigester tank with 80W PTC thermal jacket",
      throughput: "5 – 15 kg/day organic loading rate (HRT: 18 days)",
      power: "80W thermostatically controlled electric heating jacket",
      kinetics: "Generates ~0.9 – 1.35 m³ biogas per day",
    },
    societySpec: {
      hardware: "Modular 850-Liter SS316 central basement skid with submerged low-shear agitator",
      throughput: "100 – 300 kg/day bulk feeding (HRT: 14 days)",
      power: "450W thermostatic circulation heater + 180W intermittent agitator",
      kinetics: "Generates 18 – 35 m³ high-purity biogas per day",
    },
    chemistryPrinciple:
      "Four distinct biochemical stages: Hydrolysis breaks polymers into monomers; Acidogenesis forms volatile fatty acids; Acetogenesis produces acetic acid & H2; Methanogenesis converts acetate into methane gas (CH4). Continuous pH buffering at 7.14 with NaHCO3 prevents acid souring.",
    reactionEquation: "Methanogenesis: CH3COOH  →  CH4 (65%) + CO2 (35%)  [ΔG° = -31 kJ/mol]",
    engineeringSpec:
      "Mesophilic digestion design stabilized at 37.2°C with automated buffer calibration to prevent volatile acid shock.",
    keySensors: [
      "Submersible Industrial Glass pH Electrode (7.14 ± 0.05)",
      "PT100 RTD Core Thermocouple (37.2°C ± 0.1°C)",
      "Chamber Differential Pressure Transducer (18.2 mbar)",
      "Anaerobic Sludge Level Ultrasonic Sensor",
    ],
    swrComplianceNote:
      "Fulfills Bulk Waste Generator (BWG) on-site bio-processing requirements under SWM Rules 2016, avoiding ₹50,000+ monthly municipal fines.",
  },
  {
    stepNumber: "04",
    title: "Gas Scrubbing & Pressure Safety",
    subTitle: "Catalytic Iron Sponge (Fe2O3) & Dual-Solenoid Overpressure Sealing",
    icon: "security",
    coreConcept:
      "Raw biogas contains corrosive hydrogen sulfide (H2S), siloxanes, and water vapor. Our dual-stage scrubbing column cleans the gas to culinary standard, backed by fail-closed safety solenoids.",
    familySpec: {
      hardware: "Cartridge-style quick-swap dual media scrubber (Fe2O3 pellets + activated charcoal)",
      throughput: "Rated for 1.5 m³/day flow capacity",
      power: "0W passive chemical scrubbing + 24V safety shutoff solenoid",
      kinetics: "H2S reduction from 1,200 ppm down to < 2.0 ppm",
    },
    societySpec: {
      hardware: "Twin regenerateable scrubbing towers with automatic moisture coalescing traps",
      throughput: "Rated for up to 45 m³/day biogas transmission",
      power: "12W telemetry and automated backwash actuator valve",
      kinetics: "Continuous online optical H2S telemetry with automated switchover",
    },
    chemistryPrinciple:
      "Granular ferric oxide selectively chemisorbs H2S gas via exothermic reaction, producing stable iron sulfide and water. Activated carbon then polishes remaining trace odorants.",
    reactionEquation: "H2S Scrubber: Fe2O3·H2O + 3 H2S  →  Fe2S3·H2O + 3 H2O  (Odorless & Non-Corrosive)",
    engineeringSpec:
      "Continuous activated carbon scrubber with fail-closed solenoid sealing within 80ms if methane exceeds 0.5% threshold.",
    keySensors: [
      "Electrochemical H2S Gas Sensor (< 2 ppm)",
      "Solid-State Ambient CH4 Leak Detector (0.5% cutoff)",
      "Automatic High-Pressure Relief Valve (Pop-off @ 35 mbar)",
      "Inline Flame Arrestor (EN 12874 certified)",
    ],
    swrComplianceNote:
      "Guarantees compliance with residential safety building bylaws and eliminates all foul basement odors that plague open composting pits.",
  },
  {
    stepNumber: "05",
    title: "Energy & Byproduct Dispatch",
    subTitle: "Clean Cooking Biogas + Mineralized Liquid Bio-Fertilizer",
    icon: "energy_program_saving",
    coreConcept:
      "Provides two valuable circular utility streams: purified biogas piped directly into society canteens or kitchen stoves (replacing commercial LPG cylinders), plus nutrient-rich liquid fertilizer for landscaping.",
    familySpec: {
      hardware: "Low-pressure flexible bladder line directly feeding dual-burner kitchen cooktop",
      throughput: "Replaces ~1.2 domestic LPG cylinders per month (₹1,140/mo savings)",
      power: "Zero external power needed; gravity & low-pressure delivery",
      kinetics: "Produces 5 Liters of ready-to-use liquid fertilizer daily",
    },
    societySpec: {
      hardware: "18.2 mbar pressurized manifold to canteen burners + peristaltic slurry dispenser to gardens",
      throughput: "Replaces 25 – 45 commercial 19kg LPG cylinders per month (₹46,000 – ₹83,000/mo savings)",
      power: "350W fertilizer dispensing pump + optional 3kW micro gas generator",
      kinetics: "Produces 120 – 180 Liters/day pathogen-safe bio-fertilizer for society turf",
    },
    chemistryPrinciple:
      "Purified biogas contains ~65% CH4 and 35% CO2 with a high calorific value of ~21.5 MJ/m³. Digestate contains nitrogen in ammoniacal form (NH4+), readily assimilable by plant roots without synthetic chemicals.",
    reactionEquation: "Combustion: CH4 + 2 O2  →  CO2 + 2 H2O + 890 kJ/mol  (Clean Blue Flame)",
    engineeringSpec:
      "Planned institutional pilot targets bulk dining food waste conversion into cooking fuel for student meals and high-purity fertilizer.",
    keySensors: [
      "Thermal Mass Flow Meter (Biogas m³/day)",
      "Liquid Effluent Totalizer (Liters/day)",
      "Cylinder Equivalent Counter (Real-time ROI)",
      "Soil Conductance Sensor (Campus turf manifold)",
    ],
    swrComplianceNote:
      "Closes the circular economy loop locally, reducing municipal waste haulage diesel by 60% and eliminating open dumping.",
  },
];

interface Props {
  initialProfile?: UnitProfile;
  onProfileChange?: (profile: UnitProfile) => void;
}

export default function OperationalWorkflowStepper({
  initialProfile = "society",
  onProfileChange,
}: Props) {
  const [profile, setProfile] = useState<UnitProfile>(initialProfile);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [simulatedFeedback, setSimulatedFeedback] = useState<string | null>(null);

  const handleProfileSwitch = (newProfile: UnitProfile) => {
    setProfile(newProfile);
    if (onProfileChange) {
      onProfileChange(newProfile);
    }
  };

  const handleSimulateStep = (stepIdx: number) => {
    const step = WORKFLOW_STEPS[stepIdx];
    setSimulatedFeedback(`Executing Step ${step.stepNumber} simulation: Testing ${step.keySensors[0]} telemetry... [Nominal ACK 18ms]`);
    setTimeout(() => {
      setSimulatedFeedback(null);
    }, 4500);
  };

  const currentStep = WORKFLOW_STEPS[activeStep];
  const spec = profile === "society" ? currentStep.societySpec : currentStep.familySpec;

  return (
    <div className="w-full bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      {/* Top Section Header & Unit Profile Toggle */}
      <div className="p-6 border-b border-outline-variant bg-surface-container-low flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-primary tracking-widest uppercase">
              CLOSED-LOOP OPERATIONAL WORKFLOW
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container border border-outline-variant text-on-surface-variant font-semibold">
              5-STAGE PIPELINE
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-on-surface">
            Autonomous Ingestion to Bio-Utility Dispatch
          </h3>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Compare operational kinetics and engineering specs across domestic residential and community canteen scales.
          </p>
        </div>

        {/* Profile Switcher: Household / Family Unit vs Society Skid */}
        <div className="inline-flex rounded-lg border border-outline-variant p-1 bg-surface-container text-xs font-mono">
          <button
            onClick={() => handleProfileSwitch("family")}
            className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              profile === "family"
                ? "bg-primary-container text-on-primary shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span>Family Unit (5–15 kg/d)</span>
          </button>
          <button
            onClick={() => handleProfileSwitch("society")}
            className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              profile === "society"
                ? "bg-primary-container text-on-primary shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">domain</span>
            <span>Society Skid (100–300 kg/d)</span>
          </button>
        </div>
      </div>

      {/* Interactive Step Navigator Tabs */}
      <div className="grid grid-cols-5 border-b border-outline-variant bg-surface-container-low/60 divide-x divide-outline-variant">
        {WORKFLOW_STEPS.map((step, idx) => {
          const isActive = idx === activeStep;
          return (
            <button
              key={step.stepNumber}
              onClick={() => setActiveStep(idx)}
              className={`p-3 lg:p-4 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                isActive
                  ? "bg-surface-container-lowest text-on-surface"
                  : "hover:bg-surface-container text-on-surface-variant"
              }`}
            >
              {/* Active Highlight Top Line */}
              {isActive && (
                <span className="absolute top-0 left-0 right-0 h-1 bg-primary"></span>
              )}

              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[11px] font-mono font-bold ${
                    isActive ? "text-primary" : "opacity-70"
                  }`}
                >
                  STAGE {step.stepNumber}
                </span>
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    isActive ? "text-primary" : "text-on-surface-variant opacity-60"
                  }`}
                >
                  {step.icon}
                </span>
              </div>
              <span className="text-xs font-bold truncate block">
                {step.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Simulated Feedback Banner */}
      {simulatedFeedback && (
        <div className="bg-primary-fixed/20 border-b border-primary/30 px-6 py-2 flex items-center gap-2 text-xs font-mono text-primary font-bold">
          <span className="material-symbols-outlined text-[16px] animate-spin">autorenew</span>
          <span>{simulatedFeedback}</span>
        </div>
      )}

      {/* Active Step Content Body */}
      <div className="p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Mechanics, Core Description, Reaction, Pedigree */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-primary-container text-on-primary font-mono text-xs font-bold uppercase mb-2">
                <span>Stage {currentStep.stepNumber}</span>
                <span>·</span>
                <span>{currentStep.subTitle}</span>
              </div>
              <h4 className="text-2xl font-extrabold text-on-surface">
                {currentStep.title}
              </h4>
              <p className="text-sm text-on-surface-variant leading-relaxed mt-2">
                {currentStep.coreConcept}
              </p>
            </div>

            {/* Chemical Principle & Stoichiometric Equation */}
            <div className="p-4 rounded-lg bg-surface-container border border-outline-variant">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-primary uppercase flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">science</span>
                  Biochemical Kinetics &amp; Chemistry
                </span>
                <span className="text-[10px] font-mono text-on-surface-variant">SWR 2016 COMPLIANT</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
                {currentStep.chemistryPrinciple}
              </p>
              {currentStep.reactionEquation && (
                <div className="p-2.5 rounded bg-surface-container-lowest border border-outline-variant font-mono text-xs text-primary font-bold">
                  {currentStep.reactionEquation}
                </div>
              )}
            </div>

            {/* Engineering Design & Target Specs */}
            <div className="p-4 rounded-lg bg-primary-fixed/15 border border-primary/25">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase mb-1">
                <span className="material-symbols-outlined text-[16px]">engineering</span>
                Engineering Design &amp; Target Specifications
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {currentStep.engineeringSpec}
              </p>
            </div>

            {/* Interactive Step Trigger Button */}
            <div className="pt-2">
              <button
                onClick={() => handleSimulateStep(activeStep)}
                className="px-4 py-2.5 rounded bg-primary-container text-on-primary hover:bg-primary text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                <span>Simulate Stage {currentStep.stepNumber} Telemetry Polling</span>
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): Profile Specification Matrix & Sensor Array */}
          <div className="lg:col-span-5 space-y-5">
            {/* Model Card: Shows current selected unit (Family vs Society) */}
            <div className="p-5 rounded-xl border border-outline-variant bg-surface-container-low">
              <div className="flex items-center justify-between mb-3 border-b border-outline-variant pb-2">
                <div>
                  <span className="text-[10px] font-mono text-primary uppercase font-bold block">
                    CURRENT ARCHITECTURE SPEC
                  </span>
                  <h5 className="text-base font-extrabold text-on-surface">
                    {profile === "society" ? "EcoBin Society (Skid)" : "EcoBin Family (Appliance)"}
                  </h5>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed">
                  {profile === "society" ? "300 kg/day" : "15 kg/day"}
                </span>
              </div>

              {/* Spec parameters */}
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-on-surface-variant block uppercase">
                    Hardware Subsystem
                  </span>
                  <span className="font-semibold text-on-surface">
                    {spec.hardware}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block uppercase">
                    Operational Throughput
                  </span>
                  <span className="font-semibold text-on-surface">
                    {spec.throughput}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block uppercase">
                    Power Consumption
                  </span>
                  <span className="font-semibold text-primary">
                    {spec.power}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block uppercase">
                    Transformation Kinetics
                  </span>
                  <span className="font-semibold text-on-surface">
                    {spec.kinetics}
                  </span>
                </div>
              </div>
            </div>

            {/* Dedicated Sensors & Actuators for this Step */}
            <div className="p-5 rounded-xl border border-outline-variant bg-surface-container-lowest">
              <span className="text-xs font-mono font-bold text-on-surface uppercase block mb-3">
                Telemetry Sensors &amp; Actuators
              </span>
              <ul className="space-y-2 text-xs font-mono">
                {currentStep.keySensors.map((sensor, sIdx) => (
                  <li
                    key={sIdx}
                    className="p-2 rounded bg-surface-container border border-outline-variant flex items-center justify-between"
                  >
                    <span className="text-on-surface truncate pr-2">{sensor}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary-fixed text-on-primary-fixed shrink-0">
                      POLLED
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SWR 2016 Compliance Note */}
            <div className="p-3.5 rounded-lg border border-outline-variant bg-surface-container-lowest flex items-start gap-2.5">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                verified
              </span>
              <div className="text-xs text-on-surface-variant">
                <strong className="text-on-surface">SWM Rules 2016: </strong>
                <span>{currentStep.swrComplianceNote}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
