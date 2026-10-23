"use client";

import React, { useState, useEffect, useId } from "react";
import InteractiveMachineSchematic from "@/components/InteractiveMachineSchematic";
import OperationalWorkflowStepper from "@/components/OperationalWorkflowStepper";
import BiogasEnergyCalculator from "@/components/BiogasEnergyCalculator";
import FieldEngineerControls from "@/components/FieldEngineerControls";
import AkgecPedigreeBanner from "@/components/AkgecPedigreeBanner";
import ProblemAndMarketMatrix from "@/components/ProblemAndMarketMatrix";
import PrototypeValidationSuite from "@/components/PrototypeValidationSuite";
import LiveInteractiveWastePipeline from "@/components/LiveInteractiveWastePipeline";
import CampusClosedLoopVisualizer from "@/components/CampusClosedLoopVisualizer";

type HardwareProfile = "society" | "family";

export default function EcoBinLandingPage() {
  // Unique IDs for accessibility
  const formSocietyId = useId();
  const formFlatsId = useId();
  const formCityId = useId();
  const formContactId = useId();
  const pilotFacilityId = useId();
  const pilotLocationId = useId();
  const pilotLoadId = useId();
  const pilotDateId = useId();
  const pilotContactId = useId();

  // State
  const [activeProfile, setActiveProfile] = useState<HardwareProfile>("society");
  const [systemTime, setSystemTime] = useState<string>("10:00:00 IST");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Quick Toast Trigger
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Live system time clock
  useEffect(() => {
    const clockInterval = setInterval(() => {
      const now = new Date();
      setSystemTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour12: false,
        }) + " IST"
      );
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* ================= TOP NAVIGATION BAR ================= */}
      <header className="sticky top-0 z-40 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant shadow-xs transition-all">
        <div className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-8 h-16 max-w-7xl mx-auto gap-3">
          {/* Brand Logo & Mesh Telemetry Chip */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2 group shrink-0">
              <div className="w-8 h-8 rounded bg-primary-container text-on-primary flex items-center justify-center font-mono text-sm tracking-tighter shadow-xs shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  energy_program_saving
                </span>
              </div>
              <span className="tracking-tight text-on-surface text-xl font-bold whitespace-nowrap">
                EcoBin
                <span className="text-primary font-mono text-xs ml-1 px-1.5 py-0.5 rounded bg-surface-container border border-outline-variant uppercase">
                  OS
                </span>
              </span>
            </a>

            {/* Live Node Telemetry Indicator */}
            <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-low border border-outline-variant text-[10px] font-mono text-on-surface-variant whitespace-nowrap shrink-0">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-semibold uppercase tracking-wider">
                42 NODES ONLINE [18ms]
              </span>
            </div>
          </div>

          {/* Navigation Links - Single line, elegant, whitespace-nowrap */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-3 text-xs font-semibold whitespace-nowrap shrink-0">
            <a
              href="#live-pipeline"
              className="px-2 py-1 rounded-md text-primary hover:bg-primary/10 transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[15px]">play_circle</span>
              <span>Live Demo</span>
            </a>
            <a
              href="#campus-flow"
              className="px-2 py-1 rounded-md text-on-surface hover:bg-surface-container transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[15px] text-green-700">hub</span>
              <span>Campus Flow</span>
            </a>
            <a
              href="#problem"
              className="px-2 py-1 rounded-md text-on-surface hover:bg-surface-container transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[15px] text-red-600">report_problem</span>
              <span>The Problem</span>
            </a>
            <a
              href="#prototype"
              className="px-2 py-1 rounded-md text-on-surface hover:bg-surface-container transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[15px] text-primary">biotech</span>
              <span>Lab Grant</span>
            </a>
            <a
              href="#architecture"
              className="px-2 py-1 rounded-md text-on-surface hover:bg-surface-container transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[15px] text-primary">architecture</span>
              <span>CAD</span>
            </a>
            <a
              href="#how-it-works"
              className="px-2 py-1 rounded-md text-on-surface hover:bg-surface-container transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[15px] text-primary">alt_route</span>
              <span>Workflow</span>
            </a>
            <a
              href="#calculator"
              className="px-2 py-1 rounded-md text-on-surface hover:bg-surface-container transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[15px] text-primary">calculate</span>
              <span>ROI</span>
            </a>
            <a
              href="#telemetry"
              className="px-2 py-1 rounded-md text-on-surface hover:bg-surface-container transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0"></span>
              <span>RTOS</span>
            </a>
          </nav>

          {/* Trailing Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() =>
                triggerToast("Downloading EcoBin-OS-Hardware-Spec-v4.18.pdf [4.2 MB]")
              }
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono rounded border border-outline-variant text-on-surface bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[15px]">description</span>
              <span>Spec Sheet</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3.5 py-1.5 text-xs font-semibold bg-primary-container text-on-primary hover:bg-primary transition-all rounded shadow-xs flex items-center gap-1 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[15px]">tune</span>
              <span>Book Pilot</span>
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-on-surface hover:bg-surface-container rounded-lg border border-outline-variant transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-outline-variant bg-surface-container-lowest px-6 py-4 shadow-lg">
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <a
                href="#live-pipeline"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-primary-fixed/20 text-primary font-bold flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">play_circle</span>
                <span>Live Demo</span>
              </a>
              <a
                href="#campus-flow"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-surface-container flex items-center gap-2 text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px] text-green-700">hub</span>
                <span>Campus Flow</span>
              </a>
              <a
                href="#problem"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-surface-container flex items-center gap-2 text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px] text-red-600">report_problem</span>
                <span>Ground Problem</span>
              </a>
              <a
                href="#prototype"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-surface-container flex items-center gap-2 text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">biotech</span>
                <span>Lab Grant</span>
              </a>
              <a
                href="#architecture"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-surface-container flex items-center gap-2 text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">architecture</span>
                <span>CAD Specs</span>
              </a>
              <a
                href="#how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-surface-container flex items-center gap-2 text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">alt_route</span>
                <span>Workflow</span>
              </a>
              <a
                href="#calculator"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-surface-container flex items-center gap-2 text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">calculate</span>
                <span>ROI Calculator</span>
              </a>
              <a
                href="#telemetry"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-surface-container flex items-center gap-2 text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">terminal</span>
                <span>RTOS Terminal</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-12 pb-20 overflow-hidden technical-grid-bg border-b border-outline-variant">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container-lowest border border-outline-variant text-[11px] font-mono text-primary font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              EDGE-AI HARDWARE MEETS COMMUNITY BIO-UTILITY
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface-container text-xs font-mono text-on-surface-variant border border-outline-variant">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              SWM 2016 COMPLIANT
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-primary-fixed/30 text-xs font-mono text-primary border border-primary/20">
              <span className="material-symbols-outlined text-[14px]">school</span>
              AKGEC LABS INCUBATED
            </div>
          </div>

          {/* Main Headline & Subhead */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            <div className="lg:col-span-8">
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface leading-tight mb-4">
                Autonomous Source Segregation.
                <br />
                <span className="text-primary-container">On-Site Clean Energy.</span>
              </h1>
              <p className="text-base lg:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Transforming residential and institutional kitchen food waste into clean cooking
                biogas, mineralized liquid bio-fertilizer, and clean dry recyclables right at the physical
                source. Zero odor, fully automated, and compliant with SWM Rules 2016.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3 justify-end">
              {/* Primary Interactive Demo Card */}
              <div className="p-4 rounded-2xl bg-surface-container-lowest border-2 border-primary/30 shadow-xs flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                    Interactive Simulators
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold uppercase">
                    Live Demo
                  </span>
                </div>

                <a
                  href="#live-pipeline"
                  className="w-full py-2.5 px-4 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-xs active:scale-[0.99] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">play_circle</span>
                  <span>1. Live Ingestion Simulator</span>
                </a>

                <a
                  href="#campus-flow"
                  className="w-full py-2.5 px-4 rounded-xl bg-primary-fixed/30 border border-primary/40 text-primary font-bold text-xs hover:bg-primary-fixed/50 transition-all flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">hub</span>
                  <span>2. Campus Closed-Loop Flow</span>
                </a>
              </div>

              {/* Secondary Actions Row */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="py-2.5 px-3 rounded-xl bg-surface-container-low border border-outline text-on-surface hover:bg-surface-container font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">domain_verification</span>
                  <span>Book Audit</span>
                </button>
                <a
                  href="#problem"
                  className="py-2.5 px-3 rounded-xl bg-surface-container-low border border-outline text-on-surface hover:bg-surface-container font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px] text-red-600">report_problem</span>
                  <span>3 Realities</span>
                </a>
              </div>
            </div>
          </div>

          {/* Key Metric Highlights Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-surface-container-lowest border border-outline-variant shadow-xs">
              <span className="text-[10px] font-mono uppercase text-secondary block">
                Inference Latency
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-extrabold font-mono text-on-surface">&lt;142</span>
                <span className="text-xs font-mono text-primary font-bold">ms</span>
              </div>
              <span className="text-[10px] text-on-surface-variant font-mono mt-1 block">
                ESP32-S3 YOLOv8 INT8
              </span>
            </div>

            <div className="p-4 rounded-lg bg-surface-container-lowest border border-outline-variant shadow-xs">
              <span className="text-[10px] font-mono uppercase text-secondary block">
                Slurry Particle Size
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-extrabold font-mono text-on-surface">&lt;1.8</span>
                <span className="text-xs font-mono text-primary font-bold">mm</span>
              </div>
              <span className="text-[10px] text-on-surface-variant font-mono mt-1 block">
                High-Torque SS316 Shear
              </span>
            </div>

            <div className="p-4 rounded-lg bg-surface-container-lowest border border-outline-variant shadow-xs">
              <span className="text-[10px] font-mono uppercase text-secondary block">
                Digestion Temperature
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-extrabold font-mono text-on-surface">37.2</span>
                <span className="text-xs font-mono text-primary font-bold">°C</span>
              </div>
              <span className="text-[10px] text-on-surface-variant font-mono mt-1 block">
                Mesophilic Thermal Jacket
              </span>
            </div>

            <div className="p-4 rounded-lg bg-surface-container-lowest border border-outline-variant shadow-xs">
              <span className="text-[10px] font-mono uppercase text-secondary block">
                Biogas Methane Yield
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-extrabold font-mono text-on-surface">65.4</span>
                <span className="text-xs font-mono text-primary font-bold">% CH4</span>
              </div>
              <span className="text-[10px] text-on-surface-variant font-mono mt-1 block">
                Catalytic H2S &lt;2 ppm
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: LIVE INTERACTIVE INGESTION & STORAGE PIPELINE ================= */}
      <section className="py-20 bg-surface border-b border-outline-variant" id="live-pipeline">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary-fixed/30 border border-primary/20 text-xs font-mono text-primary font-bold tracking-widest uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              END-TO-END DEMO: FEED &rarr; SEGREGATE &rarr; DIGEST &rarr; STORE
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight mb-3">
              Live Ingestion &amp; Energy Storage Pipeline
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Drop mixed canteen plates, accidental metal cutlery, or greasy plastic containers into the single chute.
              Watch our ESP32-S3 AI vision and high-speed servo gate divert contaminants in &lt;150ms, macerate organics, and
              store pressurized cooking biogas and bio-fertilizer directly on-site.
            </p>
          </div>

          {/* Live Interactive Waste Ingestion & Storage Component */}
          <LiveInteractiveWastePipeline />
        </div>
      </section>

      {/* ================= SECTION: CAMPUS CLOSED-LOOP ARCHITECTURE & ACTUAL PRODUCT ================= */}
      <section className="py-20 bg-surface-container-low border-b border-outline-variant" id="campus-flow">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-green-500/10 border border-green-600/30 text-xs font-mono text-green-700 font-bold tracking-widest uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
              INSTITUTIONAL CLOSED-LOOP INFRASTRUCTURE
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight mb-3">
              Campus &amp; Society Closed-Loop Pipe Network
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Explore the entire end-to-end journey from the <strong>EcoBin Smart Segregation Node</strong> (our sleek green-lid physical appliance)
              to the underground <strong>Dual Conduit Pipe System</strong>, the <strong>Centralized Dome Bioreactor</strong>, and direct on-site
              utilization in the <strong>Canteen Cooking Mess</strong> and campus gardens.
            </p>
          </div>

          {/* Interactive Campus Flow & Physical Machine Visualizer */}
          <CampusClosedLoopVisualizer />
        </div>
      </section>

      {/* ================= SECTION: GROUND-LEVEL PROBLEM & MARKET MATRIX ================= */}
      <section className="py-20 bg-surface-container-lowest border-b border-outline-variant" id="problem">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ProblemAndMarketMatrix />
        </div>
      </section>

      {/* ================= SECTION 1: INTERACTIVE MACHINE ARCHITECTURE & EXPLODED VIEW ================= */}
      <section className="py-20 bg-surface border-b border-outline-variant" id="architecture">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono text-primary font-bold tracking-widest uppercase">
              HARDWARE &amp; SYSTEMS ARCHITECTURE
            </span>
            <h2 className="text-3xl font-extrabold text-on-surface mt-2 mb-3">
              Interactive Machine Architecture &amp; Exploded View
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Ground-up mechanical engineering parsed from the EcoBin Startup Technical Document:
              Inlet Shredder → Tri-Stream Sensor Ring → Dual Solenoid Inoculation Valve →
              Anaerobic Maceration Core → Catalytic H2S Scrubber → Biogas Storage Bladder.
            </p>
          </div>

          {/* Interactive Machine Architecture Component */}
          <InteractiveMachineSchematic profile={activeProfile} />
        </div>
      </section>

      {/* ================= SECTION 2: END-TO-END OPERATIONAL WORKFLOW ================= */}
      <section className="py-20 bg-surface-container-low border-b border-outline-variant" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono text-primary font-bold tracking-widest uppercase">
              END-TO-END OPERATIONAL TRANSFORMATION
            </span>
            <h2 className="text-3xl font-extrabold text-on-surface mt-2 mb-3">
              5-Stage Closed-Loop Engineering Workflow
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Step through the biological, chemical, and mechanical operations that convert mixed domestic
              waste into localized energy and zero landfill haulage.
            </p>
          </div>

          {/* Operational Workflow Stepper Component */}
          <OperationalWorkflowStepper
            initialProfile={activeProfile}
            onProfileChange={(p) => setActiveProfile(p)}
          />
        </div>
      </section>

      {/* ================= SECTION: PROTOTYPE VALIDATION & HARDWARE EDGE-CASE SUITE ================= */}
      <section className="py-20 bg-surface border-b border-outline-variant" id="prototype">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono text-primary font-bold tracking-widest uppercase">
              LAB-STAGE FEASIBILITY &amp; PROTOTYPE SUITE
            </span>
            <h2 className="text-3xl font-extrabold text-on-surface mt-2 mb-3">
              Prototype Build, Grant Allocation &amp; Logic Defense
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Engineered to prove technical and biological viability before institutional evaluators:
              Interactive edge-case responses (metal detection, cellulose digestion, pH stabilization)
              paired with our ₹2.5 Lakhs pre-incubation grant roadmap.
            </p>
          </div>

          <PrototypeValidationSuite />
        </div>
      </section>

      {/* ================= SECTION 3: BIOGAS YIELD & LPG EQUIVALENT CALCULATOR ================= */}
      <section className="py-20 bg-surface-container-low border-b border-outline-variant" id="calculator">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono text-primary font-bold tracking-widest uppercase">
              FINANCIAL &amp; ENERGY METRICS
            </span>
            <h2 className="text-3xl font-extrabold text-on-surface mt-2 mb-3">
              Biogas Yield &amp; LPG Savings Calculator
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Calibrated to Indian RWA and canteen economics: 0.09 m³ pure biogas generated per kg of food waste,
              displacing commercial 19kg LPG cylinders and eliminating municipal tipping fees.
            </p>
          </div>

          {/* Biogas Energy Calculator Component */}
          <BiogasEnergyCalculator
            initialProfile={activeProfile}
            onProfileChange={(p) => setActiveProfile(p)}
          />
        </div>
      </section>

      {/* ================= SECTION 4: DYNAMIC TELEMETRY & FIELD ENGINEER CONTROLS ================= */}
      <section className="py-20 bg-inverse-surface text-inverse-on-surface" id="telemetry">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono text-primary font-bold tracking-widest uppercase">
              ENGINEERING OVERRIDES &amp; RTOS TELEMETRY
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2 mb-3">
              Field Engineer Console &amp; RTOS Log Stream
            </h2>
            <p className="text-sm text-white/70 leading-relaxed font-sans">
              Interact directly with virtual hardware actuators: trigger 0.2s gas safety solenoid pulse tests,
              purge peristaltic slurry pumps, inject NaHCO3 alkaline buffer, and monitor live FreeRTOS events.
            </p>
          </div>

          {/* Field Engineer Controls Component */}
          <FieldEngineerControls />
        </div>
      </section>

      {/* ================= SECTION 5: HARDWARE TAXONOMY & SPECIFICATION MATRIX ================= */}
      <section className="py-20 bg-surface border-b border-outline-variant" id="hardware">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono text-primary font-bold tracking-widest uppercase">
              HARDWARE TAXONOMY
            </span>
            <h2 className="text-3xl font-extrabold text-on-surface mt-2 mb-3">
              Hardware Architecture &amp; Specification Comparison
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Engineered with industrial SS316 stainless steel, double-walled polyurea lining, and
              modular field-replaceable sensors.
            </p>
          </div>

          {/* High Contrast Industrial Specs Table */}
          <div className="overflow-x-auto rounded-lg border border-outline-variant bg-surface-container-lowest shadow-sm mb-12">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant font-mono text-xs text-on-surface uppercase">
                  <th className="p-4 w-1/4">Specification Parameter</th>
                  <th className="p-4 w-3/8 text-primary font-bold border-l border-outline-variant">
                    EcoBin Family [Kitchen/Floor Unit]
                  </th>
                  <th className="p-4 w-3/8 text-on-surface font-bold border-l border-outline-variant bg-primary-fixed/10">
                    EcoBin Society [Modular Central Skid]
                  </th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs divide-y divide-outline-variant text-on-surface-variant">
                <tr className="hover:bg-surface-container/50">
                  <td className="p-4 font-semibold text-on-surface">Target Deployment</td>
                  <td className="p-4 border-l border-outline-variant">
                    Individual residences, floor lobbies, boutique pantries
                  </td>
                  <td className="p-4 border-l border-outline-variant font-semibold text-on-surface bg-primary-fixed/5">
                    Apartment basements, university dining halls, hotel kitchens
                  </td>
                </tr>
                <tr className="hover:bg-surface-container/50">
                  <td className="p-4 font-semibold text-on-surface">Daily Throughput</td>
                  <td className="p-4 border-l border-outline-variant">
                    5 – 15 kg organic waste / day
                  </td>
                  <td className="p-4 border-l border-outline-variant font-semibold text-primary bg-primary-fixed/5">
                    100 – 500 kg organic waste / day (Modular scale)
                  </td>
                </tr>
                <tr className="hover:bg-surface-container/50">
                  <td className="p-4 font-semibold text-on-surface">Chassis Dimensions (W×D×H)</td>
                  <td className="p-4 border-l border-outline-variant">
                    450 × 380 × 780 mm (Fits under kitchen counter)
                  </td>
                  <td className="p-4 border-l border-outline-variant bg-primary-fixed/5">
                    2,400 × 1,800 × 2,100 mm (Standard parking footprint)
                  </td>
                </tr>
                <tr className="hover:bg-surface-container/50">
                  <td className="p-4 font-semibold text-on-surface">Edge Sensing Suite</td>
                  <td className="p-4 border-l border-outline-variant">
                    HD Wide-Angle Camera + Dielectric Moisture Sensor
                  </td>
                  <td className="p-4 border-l border-outline-variant bg-primary-fixed/5">
                    Dual Sony ToF Cameras + Inductive Metal Ring + Multi-spectral NIR
                  </td>
                </tr>
                <tr className="hover:bg-surface-container/50">
                  <td className="p-4 font-semibold text-on-surface">Pulverizing Mechanism</td>
                  <td className="p-4 border-l border-outline-variant">
                    Micro-Blade Vortex Impeller (250W single-phase)
                  </td>
                  <td className="p-4 border-l border-outline-variant font-semibold text-on-surface bg-primary-fixed/5">
                    Industrial High-Torque Dual-Shaft Masticator (3.2kW 3-phase)
                  </td>
                </tr>
                <tr className="hover:bg-surface-container/50">
                  <td className="p-4 font-semibold text-on-surface">Biogas Conversion Output</td>
                  <td className="p-4 border-l border-outline-variant">
                    Low-pressure sealed cartridge or utility micro-feeder
                  </td>
                  <td className="p-4 border-l border-outline-variant font-semibold text-primary bg-primary-fixed/5">
                    Pressurized buffer bladder (18–35 m³/day) direct to cookstove loop
                  </td>
                </tr>
                <tr className="hover:bg-surface-container/50">
                  <td className="p-4 font-semibold text-on-surface">SWM Rules 2016 Status</td>
                  <td className="p-4 border-l border-outline-variant">
                    Household Source Segregation Certified
                  </td>
                  <td className="p-4 border-l border-outline-variant font-semibold text-primary bg-primary-fixed/5">
                    Full Bulk Waste Generator (BWG &gt;100kg) On-Site Compliant
                  </td>
                </tr>
                <tr className="hover:bg-surface-container/50">
                  <td className="p-4 font-semibold text-on-surface">Pricing &amp; Procurement</td>
                  <td className="p-4 border-l border-outline-variant">
                    ₹38,000 – ₹60,000 purchase or ₹999/mo subscription
                  </td>
                  <td className="p-4 border-l border-outline-variant bg-primary-fixed/5">
                    ₹3.5L – ₹8.5L CapEx / OpEx lease with 5-Year guaranteed AMC
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= SECTION 6: AKGEC LABS PEDIGREE & FEASIBILITY ================= */}
      <section className="py-20 bg-surface-container-low border-b border-outline-variant" id="pedigree">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AkgecPedigreeBanner />

          {/* Quick Site Feasibility Form Card */}
          <div className="mt-12 bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider block mb-1">
                  COMMERCIAL PILOT FEASIBILITY
                </span>
                <h3 className="text-2xl font-extrabold text-on-surface mb-2">
                  Request an On-Site Society Waste &amp; Energy Audit
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Our certified field systems engineers conduct an on-site waste load audit, biogas piping
                  assessment, and civil layout survey within 48 hours for your RWA or institution.
                </p>
              </div>

              <div className="lg:col-span-5">
                <form
                  className="space-y-3 font-mono text-xs"
                  onSubmit={(e) => {
                    e.preventDefault();
                    triggerToast(
                      "Site audit requested! A field engineer will contact the RWA within 24 hours."
                    );
                    (e.target as HTMLFormElement).reset();
                  }}
                >
                  <div>
                    <label
                      htmlFor={formSocietyId}
                      className="block text-secondary mb-1 font-semibold"
                    >
                      SOCIETY / INSTITUTION NAME:
                    </label>
                    <input
                      id={formSocietyId}
                      type="text"
                      required
                      placeholder="e.g. Palm Meadows Township"
                      className="w-full text-xs font-mono rounded border border-outline-variant bg-surface px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label
                        htmlFor={formFlatsId}
                        className="block text-secondary mb-1 font-semibold"
                      >
                        TOTAL FLATS / COVERS:
                      </label>
                      <input
                        id={formFlatsId}
                        type="number"
                        required
                        placeholder="450"
                        className="w-full text-xs font-mono rounded border border-outline-variant bg-surface px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={formCityId}
                        className="block text-secondary mb-1 font-semibold"
                      >
                        CITY / REGION:
                      </label>
                      <input
                        id={formCityId}
                        type="text"
                        required
                        placeholder="Delhi NCR / Bengaluru"
                        className="w-full text-xs font-mono rounded border border-outline-variant bg-surface px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor={formContactId}
                      className="block text-secondary mb-1 font-semibold"
                    >
                      OFFICIAL CONTACT PHONE / EMAIL:
                    </label>
                    <input
                      id={formContactId}
                      type="text"
                      required
                      placeholder="+91 98765 43210 or rwa@society.org"
                      className="w-full text-xs font-mono rounded border border-outline-variant bg-surface px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded bg-primary-container text-on-primary font-bold uppercase hover:bg-primary transition-all cursor-pointer text-xs shadow-xs"
                  >
                    Schedule Free On-Site Inspection
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TECHNICAL FOOTER ================= */}
      <footer className="bg-surface-container-low border-t border-outline-variant text-on-surface-variant">
        <div className="w-full py-12 px-6 lg:px-10 max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="text-base font-semibold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">
                  energy_program_saving
                </span>
                <span>EcoBin Telemetry &amp; Climate Hardware Systems</span>
              </div>
              <p className="text-xs text-secondary mt-1">
                Engineered for zero-methane landfill emissions, automated source segregation, and decentralized energy.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-xs">
              <a href="#problem" className="hover:text-primary transition-colors">
                Ground Problem
              </a>
              <a href="#prototype" className="hover:text-primary transition-colors">
                Prototype &amp; Grant
              </a>
              <a href="#architecture" className="hover:text-primary transition-colors">
                Machine CAD
              </a>
              <a href="#how-it-works" className="hover:text-primary transition-colors">
                Workflow
              </a>
              <a href="#calculator" className="hover:text-primary transition-colors">
                ROI Engine
              </a>
              <a href="#telemetry" className="hover:text-primary transition-colors">
                RTOS Telemetry
              </a>
              <a href="#pedigree" className="hover:text-primary transition-colors">
                AKGEC Labs
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-outline-variant flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-secondary">
            <div>
              © 2026 EcoBin Telemetry &amp; Climate Hardware Systems. Developed under AKGEC Labs
              Institutional Pedigree. SWM 2016 &amp; ULB Compliant.
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
              <span className="tabular-nums">SYSTEM TIME: {systemTime}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= INTERACTIVE AUDIT / PILOT MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg max-w-lg w-full p-6 shadow-xl relative animate-in fade-in zoom-in duration-150">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase font-bold">
                  <span className="material-symbols-outlined text-[16px]">
                    domain_verification
                  </span>
                  <span>FIELD PILOT APPLICATION</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mt-1">
                  Book an EcoBin Society Pilot
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-secondary hover:text-on-surface p-1 rounded hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-xs text-secondary mb-6 leading-relaxed">
              Select a deployment tier for a 60-day trial pilot. Our team delivers, installs the
              masticator, connects the biogas manifold, and provisions live dashboard credentials.
            </p>
            <form
              className="space-y-4 font-mono text-xs"
              onSubmit={(e) => {
                e.preventDefault();
                setIsModalOpen(false);
                triggerToast(
                  "Pilot application logged! Telemetry deployment team will contact within 24h."
                );
              }}
            >
              <div>
                <label
                  htmlFor={pilotFacilityId}
                  className="block text-secondary mb-1 font-semibold"
                >
                  FACILITY TYPE:
                </label>
                <select
                  id={pilotFacilityId}
                  className="w-full text-xs font-mono rounded border border-outline-variant bg-surface px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
                >
                  <option>Residential Society (200 - 800 Apartments)</option>
                  <option>Corporate Tech Park / Cafeteria</option>
                  <option>Educational University / Hostel Dining Hall</option>
                  <option>Hospital / Commercial Food Facility</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor={pilotLocationId}
                  className="block text-secondary mb-1 font-semibold"
                >
                  FACILITY NAME &amp; LOCATION:
                </label>
                <input
                  id={pilotLocationId}
                  type="text"
                  required
                  placeholder="e.g. Prestige Valley Heights, Sector 62"
                  className="w-full text-xs font-mono rounded border border-outline-variant bg-surface px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor={pilotLoadId}
                    className="block text-secondary mb-1 font-semibold"
                  >
                    ESTIMATED DAILY LOAD:
                  </label>
                  <input
                    id={pilotLoadId}
                    type="text"
                    required
                    placeholder="e.g. 250 kg/day"
                    className="w-full text-xs font-mono rounded border border-outline-variant bg-surface px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor={pilotDateId}
                    className="block text-secondary mb-1 font-semibold"
                  >
                    PREFERRED START:
                  </label>
                  <input
                    id={pilotDateId}
                    type="date"
                    required
                    className="w-full text-xs font-mono rounded border border-outline-variant bg-surface px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor={pilotContactId}
                  className="block text-secondary mb-1 font-semibold"
                >
                  OFFICIAL RWA / FACILITY REP CONTACT:
                </label>
                <input
                  id={pilotContactId}
                  type="text"
                  required
                  placeholder="Name, Phone and Work Email"
                  className="w-full text-xs font-mono rounded border border-outline-variant bg-surface px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded bg-primary-container text-on-primary font-bold uppercase hover:bg-primary transition-all text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  Confirm &amp; Reserve Pilot Hardware
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= NOTIFICATION TOAST ================= */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded shadow-lg font-mono text-xs flex items-center gap-3 border border-outline animate-in slide-in-from-bottom duration-200">
          <span className="material-symbols-outlined text-primary-fixed text-[18px]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
