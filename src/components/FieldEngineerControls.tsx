"use client";

import React, { useState, useEffect, useRef } from "react";

export interface LogEntry {
  id: string;
  time: string;
  tag: string;
  message: string;
  type: "info" | "success" | "warn" | "error";
  componentTag: string;
}

const INITIAL_LOGS: LogEntry[] = [
  {
    id: "log-1",
    time: "10:52:18 IST",
    tag: "AUTO-PURGE",
    message: "Dual safety solenoid cycled automatically (0.2s stroke completed · 0 ppm H2S residual).",
    type: "success",
    componentTag: "SOL-INOC-03",
  },
  {
    id: "log-2",
    time: "10:48:02 IST",
    tag: "OPTICAL PASS",
    message: "Cluster #04 processed 8.4 kg organic food waste · Dielectric verified 99.4% non-metallic.",
    type: "info",
    componentTag: "SEN-TRI-02",
  },
  {
    id: "log-3",
    time: "10:35:45 IST",
    tag: "MACERATION",
    message: "Masticator cycle completed (180s · 4.2 kWh draw · Slurry consistency compliant <1.8mm).",
    type: "info",
    componentTag: "MTR-SHR-01",
  },
  {
    id: "log-4",
    time: "10:19:12 IST",
    tag: "BALER COMPACT",
    message: "12.4 kg dry corrugated cardboard compacted & serialized in Dry Bay #02.",
    type: "success",
    componentTag: "MTR-SHR-01",
  },
  {
    id: "log-5",
    time: "09:58:30 IST",
    tag: "DIAGNOSTIC",
    message: "All 42 mesh peripheral nodes reported ACK. ESP32-S3 cellular RSSI: -64 dBm (High Reliability).",
    type: "info",
    componentTag: "SEN-TRI-02",
  },
  {
    id: "log-6",
    time: "09:40:15 IST",
    tag: "THERMAL JACKET",
    message: "Core mesophilic temperature stabilized at 37.21°C ±0.03°C. PTC heater idle.",
    type: "info",
    componentTag: "BIO-CORE-04",
  },
];

const PERIODIC_STREAM_MESSAGES: Omit<LogEntry, "id" | "time">[] = [
  {
    tag: "TELEMETRY",
    message: "Bladder pressure nominal at 18.22 mbar · H2S sensor: 1.84 ppm · Dew point: 4.2°C.",
    type: "info",
    componentTag: "ACC-GAS-06",
  },
  {
    tag: "SOLENOID ACK",
    message: "Inoculation valve heartbeat OK · Water micro-dosing line calibrated at 2.1 bar.",
    type: "success",
    componentTag: "SOL-INOC-03",
  },
  {
    tag: "AI CLASSIFIER",
    message: "Inference latency: 138ms · Model YOLOv8 INT8 running on ESP32-S3 vector coprocessor.",
    type: "info",
    componentTag: "SEN-TRI-02",
  },
  {
    tag: "FERTILIZER DISP",
    message: "Bio-effluent totalizer incremented: +4.8 Liters to landscape irrigation sump.",
    type: "success",
    componentTag: "SMP-FERT-07",
  },
  {
    tag: "ODOR FILTER",
    message: "Activated carbon scrubbing bed adsorption delta: 0.02% · Filter life remaining: 84.1%.",
    type: "info",
    componentTag: "SCR-H2S-05",
  },
];

export default function FieldEngineerControls() {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [streamSpeed, setStreamSpeed] = useState<number>(4500); // ms per event
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | "SUCCESS" | "INFO" | "WARN">("ALL");
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Dynamic Telemetry states driven by field overrides
  const [solenoidPressure, setSolenoidPressure] = useState<number>(18.2);
  const [pumpLitres, setPumpLitres] = useState<number>(142);
  const [isPumping, setIsPumping] = useState<boolean>(false);
  const [coreTemp, setCoreTemp] = useState<number>(37.2);
  const [corePh, setCorePh] = useState<number>(7.14);
  const [ch4Purity, setCh4Purity] = useState<number>(65.4);
  const [isPurgingSolenoid, setIsPurgingSolenoid] = useState<boolean>(false);

  const logContainerRef = useRef<HTMLDivElement>(null);

  // Background stream simulator
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const randomTemplate =
        PERIODIC_STREAM_MESSAGES[Math.floor(Math.random() * PERIODIC_STREAM_MESSAGES.length)];
      const now = new Date();
      const timeStr =
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour12: false,
        }) + " IST";

      const newEntry: LogEntry = {
        id: `stream-${Date.now()}-${Math.random()}`,
        time: timeStr,
        ...randomTemplate,
      };

      setLogs((prev) => [newEntry, ...prev.slice(0, 39)]);

      // Slight natural sensor flutter
      setCoreTemp((prev) => +(prev + (Math.random() * 0.06 - 0.03)).toFixed(2));
      setCh4Purity((prev) => +(prev + (Math.random() * 0.08 - 0.04)).toFixed(1));
    }, streamSpeed);

    return () => clearInterval(interval);
  }, [isPaused, streamSpeed]);

  const triggerFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => {
      setActionFeedback(null);
    }, 4000);
  };

  // Field Override: 1. Solenoid Pulse Test (0.2s)
  const handleSolenoidPulseTest = () => {
    setIsPurgingSolenoid(true);
    setSolenoidPressure(18.0);

    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-IN", { hour12: false }) + " IST";

    setTimeout(() => {
      setSolenoidPressure(18.2);
      setIsPurgingSolenoid(false);

      const log: LogEntry = {
        id: `solenoid-${Date.now()}`,
        time: timeStr,
        tag: "SOLENOID OVERRIDE",
        message:
          "Field Engineer triggered 0.2s solenoid pulse test. Valve cycled open/close nominal · Seal pressure returned to 18.2 mbar.",
        type: "success",
        componentTag: "SOL-INOC-03",
      };

      setLogs((prev) => [log, ...prev]);
      triggerFeedback("Solenoid Pulse Test: 0.2s cycle completed successfully. Pressure sealed at 18.2 mbar.");
    }, 450);
  };

  // Field Override: 2. Slurry Pump Purge (Peristaltic flush)
  const handleSlurryPumpPurge = () => {
    if (isPumping) return;
    setIsPumping(true);

    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-IN", { hour12: false }) + " IST";

    let pumped = 0;
    const pumpInterval = setInterval(() => {
      pumped += 20;
      setPumpLitres((prev) => prev + 20);
      if (pumped >= 120) {
        clearInterval(pumpInterval);
        setIsPumping(false);

        const log: LogEntry = {
          id: `pump-${Date.now()}`,
          time: timeStr,
          tag: "SLURRY PUMP PURGE",
          message:
            "Slurry pump purge complete: 120 Liters dispensed to society landscape buffer. Line cleared at 3.8A draw.",
          type: "success",
          componentTag: "SMP-FERT-07",
        };

        setLogs((prev) => [log, ...prev]);
        triggerFeedback("Slurry Pump Purge Complete: 120 Liters discharged to soil manifold.");
      }
    }, 400);
  };

  // Field Override: 3. NaHCO3 Buffer Inoculation Burst
  const handleBufferInoculation = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-IN", { hour12: false }) + " IST";

    setCorePh((prev) => +(prev < 7.3 ? prev + 0.08 : prev).toFixed(2));

    const log: LogEntry = {
      id: `buffer-${Date.now()}`,
      time: timeStr,
      tag: "BUFFER INOCULATION",
      message:
        "Manual injection of 250mL saturated NaHCO3 alkaline solution executed. Bioreactor pH buffered to 7.22.",
      type: "success",
      componentTag: "SOL-INOC-03",
    };

    setLogs((prev) => [log, ...prev]);
    triggerFeedback("Buffer Inoculation Executed: 250mL NaHCO3 injected into digestion core.");
  };

  // Field Override: 4. Inject Diagnostic ACK
  const handleManualDiagnosticPing = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-IN", { hour12: false }) + " IST";

    const log: LogEntry = {
      id: `diag-${Date.now()}`,
      time: timeStr,
      tag: "MANUAL PING",
      message:
        "Field diagnostic broadcast: All 7 subsystem transceivers responded with 0 frame drops (SPI/I2C OK).",
      type: "info",
      componentTag: "SEN-TRI-02",
    };

    setLogs((prev) => [log, ...prev]);
    triggerFeedback("Subsystem Diagnostic Broadcast: All modules ACK received.");
  };

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    if (selectedFilter === "ALL") return true;
    if (selectedFilter === "SUCCESS") return log.type === "success";
    if (selectedFilter === "INFO") return log.type === "info";
    if (selectedFilter === "WARN") return log.type === "warn" || log.type === "error";
    return true;
  });

  return (
    <div className="w-full bg-inverse-surface text-inverse-on-surface rounded-xl border border-outline shadow-md overflow-hidden font-mono">
      {/* Console Top Header */}
      <div className="p-5 border-b border-white/10 bg-black/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[11px] font-bold text-primary tracking-widest uppercase">
              FIELD ENGINEER TELEMETRY &amp; RTOS OVERRIDES
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/80 border border-white/10">
              SYS_REV: v4.18-CORE
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            Live RTOS Subsystem Bus &amp; Actuator Overrides
          </h3>
          <p className="text-xs text-white/70 font-sans mt-0.5">
            Real-time FreeRTOS task telemetry, solenoid pulse test bench, and slurry peristaltic control console.
          </p>
        </div>

        {/* Live System Time & RSSI */}
        <div className="flex items-center gap-4 text-xs">
          <div className="px-3 py-1.5 rounded bg-black/60 border border-white/10 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[16px]">cell_tower</span>
            <span>RSSI: -64 dBm [4G LTE-M]</span>
          </div>
          <div className="px-3 py-1.5 rounded bg-black/60 border border-white/10 text-primary font-bold">
            MESH_NODES: 42 ONLINE
          </div>
        </div>
      </div>

      {/* Action Feedback Banner */}
      {actionFeedback && (
        <div className="bg-primary/20 border-b border-primary/30 px-6 py-2.5 flex items-center justify-between text-xs text-primary font-bold">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
            <span>{actionFeedback}</span>
          </div>
          <span className="text-[10px] uppercase text-primary/80">OVERRIDE CONFIRMED</span>
        </div>
      )}

      {/* Main Grid: Actuator Controls (Left 4 cols) & Live RTOS Console (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* ================= LEFT COLUMN: FIELD ENGINEER ACTUATOR OVERRIDES ================= */}
        <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-white/10 bg-black/20 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
              <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[16px]">tune</span>
                Manual Actuator Overrides
              </span>
              <span className="text-[10px] text-white/60">ROOT PRIVILEGES</span>
            </div>

            {/* Live Sensor Quick Readouts */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/10">
                <span className="text-[10px] text-white/60 block">BLADDER PRESS</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className={`text-lg font-bold ${isPurgingSolenoid ? "text-amber-400" : "text-white"}`}>
                    {solenoidPressure.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-primary">mbar</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-black/40 border border-white/10">
                <span className="text-[10px] text-white/60 block">FERTILIZER SUMP</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-lg font-bold text-white">{pumpLitres}</span>
                  <span className="text-[10px] text-primary">L</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-black/40 border border-white/10">
                <span className="text-[10px] text-white/60 block">CORE TEMP</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-lg font-bold text-white">{coreTemp.toFixed(2)}</span>
                  <span className="text-[10px] text-primary">°C</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-black/40 border border-white/10">
                <span className="text-[10px] text-white/60 block">DIGESTER pH</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-lg font-bold text-white">{corePh.toFixed(2)}</span>
                  <span className="text-[10px] text-primary">pH</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-black/40 border border-white/10">
                <span className="text-[10px] text-white/60 block">CH4 PURITY</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-lg font-bold text-emerald-400">{ch4Purity.toFixed(1)}</span>
                  <span className="text-[10px] text-primary">%</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-black/40 border border-white/10">
                <span className="text-[10px] text-white/60 block">H2S SENSOR</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-lg font-bold text-white">1.84</span>
                  <span className="text-[10px] text-primary">ppm</span>
                </div>
              </div>
            </div>

            {/* Actuator Override Action Buttons */}
            <div className="space-y-3">
              {/* Button 1: Solenoid Pulse Test */}
              <button
                onClick={handleSolenoidPulseTest}
                disabled={isPurgingSolenoid}
                className={`w-full p-3.5 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between ${
                  isPurgingSolenoid
                    ? "bg-amber-500/20 border-amber-500 text-amber-300"
                    : "bg-surface-container-high/10 border-white/15 hover:border-primary hover:bg-surface-container-high/20 text-white"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">SOLENOID PULSE TEST</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-primary/20 text-primary border border-primary/30">
                      0.2s STROKE
                    </span>
                  </div>
                  <span className="text-[11px] text-white/60 font-sans block mt-0.5">
                    Actuates dual gas safety valve to purge residual H2S and verify seal pressure.
                  </span>
                </div>
                <span className="material-symbols-outlined text-[20px] text-primary shrink-0 ml-2">
                  {isPurgingSolenoid ? "sync" : "flash_on"}
                </span>
              </button>

              {/* Button 2: Slurry Pump Purge */}
              <button
                onClick={handleSlurryPumpPurge}
                disabled={isPumping}
                className={`w-full p-3.5 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between ${
                  isPumping
                    ? "bg-primary/20 border-primary text-primary"
                    : "bg-surface-container-high/10 border-white/15 hover:border-primary hover:bg-surface-container-high/20 text-white"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">SLURRY PUMP PURGE</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-white/80">
                      120L CYCLE
                    </span>
                  </div>
                  <span className="text-[11px] text-white/60 font-sans block mt-0.5">
                    Peristaltic booster purge dispensing fermented digestate into landscape manifold.
                  </span>
                </div>
                <span className="material-symbols-outlined text-[20px] text-primary shrink-0 ml-2">
                  {isPumping ? "autorenew" : "water_drop"}
                </span>
              </button>

              {/* Button 3: NaHCO3 Buffer Inoculation */}
              <button
                onClick={handleBufferInoculation}
                className="w-full p-3.5 rounded-lg border border-white/15 bg-surface-container-high/10 hover:border-primary hover:bg-surface-container-high/20 text-white text-left transition-all cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">DOSE NaHCO3 BUFFER</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300">
                      250mL BURST
                    </span>
                  </div>
                  <span className="text-[11px] text-white/60 font-sans block mt-0.5">
                    Auto-doses saturated sodium bicarbonate buffer to neutralize volatile fatty acids.
                  </span>
                </div>
                <span className="material-symbols-outlined text-[20px] text-blue-400 shrink-0 ml-2">
                  science
                </span>
              </button>

              {/* Button 4: Diagnostic Ping */}
              <button
                onClick={handleManualDiagnosticPing}
                className="w-full p-3.5 rounded-lg border border-white/15 bg-surface-container-high/10 hover:border-primary hover:bg-surface-container-high/20 text-white text-left transition-all cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">POLL PERIPHERAL SENSORS</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-white/80">
                      7 DRIVERS
                    </span>
                  </div>
                  <span className="text-[11px] text-white/60 font-sans block mt-0.5">
                    Polls ToF camera, dielectric probe, methane cell, and strain load cells.
                  </span>
                </div>
                <span className="material-symbols-outlined text-[20px] text-primary shrink-0 ml-2">
                  radar
                </span>
              </button>
            </div>
          </div>

          {/* Pedigree Stamp Footer */}
          <div className="pt-4 border-t border-white/10 text-[11px] text-white/60 flex items-center justify-between">
            <span>LAB BENCH VALIDATED</span>
            <span className="text-primary font-bold">FIELD BENCH v4.2</span>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: LIVE RTOS EVENT LOG STREAM ================= */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between bg-black/40">
          <div>
            {/* Stream Controls Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                <span className="text-xs font-bold text-white uppercase">
                  FreeRTOS Event Bus Stream
                </span>
                <span className="text-[10px] text-primary bg-primary/20 px-2 py-0.5 rounded border border-primary/30">
                  {isPaused ? "PAUSED" : "ACTIVE (100Hz)"}
                </span>
              </div>

              {/* Controls: Pause/Resume, Speed, Severity Filters */}
              <div className="flex items-center gap-2">
                {/* Severity Filter Tabs */}
                <div className="inline-flex rounded border border-white/10 p-0.5 bg-black/60 text-[10px]">
                  {(["ALL", "SUCCESS", "INFO", "WARN"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-2 py-1 rounded font-bold transition-all cursor-pointer ${
                        selectedFilter === filter
                          ? "bg-primary text-black"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Pause/Resume Button */}
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="px-2.5 py-1 rounded border border-white/20 bg-white/5 hover:bg-white/10 text-xs text-white flex items-center gap-1 cursor-pointer"
                  title={isPaused ? "Resume Stream" : "Pause Stream"}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {isPaused ? "play_arrow" : "pause"}
                  </span>
                  <span>{isPaused ? "Resume" : "Pause"}</span>
                </button>

                {/* Speed Adjuster */}
                <button
                  onClick={() => setStreamSpeed((prev) => (prev === 4500 ? 1500 : prev === 1500 ? 8000 : 4500))}
                  className="px-2 py-1 rounded border border-white/20 bg-white/5 hover:bg-white/10 text-[10px] text-white/80 cursor-pointer"
                  title="Toggle Log Generation Speed"
                >
                  {streamSpeed === 1500 ? "Speed: 3×" : streamSpeed === 4500 ? "Speed: 1×" : "Speed: 0.5×"}
                </button>
              </div>
            </div>

            {/* Scrollable Event Log Terminal */}
            <div
              ref={logContainerRef}
              className="h-[360px] overflow-y-auto space-y-2 pr-2 text-xs font-mono scrollbar-thin scrollbar-thumb-white/20"
            >
              {filteredLogs.map((log) => {
                const badgeColor =
                  log.type === "success"
                    ? "text-emerald-400 bg-emerald-950/60 border-emerald-800"
                    : log.type === "warn"
                    ? "text-amber-400 bg-amber-950/60 border-amber-800"
                    : "text-sky-300 bg-sky-950/60 border-sky-800";

                return (
                  <div
                    key={log.id}
                    className="p-2.5 rounded bg-black/60 border border-white/10 flex items-start gap-3 hover:border-white/20 transition-colors"
                  >
                    <span className="text-[10px] text-white/50 shrink-0 pt-0.5">
                      {log.time}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded border font-bold uppercase shrink-0 ${badgeColor}`}
                    >
                      {log.tag}
                    </span>
                    <div className="flex-1">
                      <p className="text-white/90 leading-tight">{log.message}</p>
                      <span className="text-[9px] text-white/40 mt-1 block">
                        BUS_NODE: {log.componentTag}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Terminal Status Line */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
            <span>SHOWING {filteredLogs.length} EVENTS (BUFFER CAPACITY: 40)</span>
            <button
              onClick={() => setLogs(INITIAL_LOGS)}
              className="text-primary hover:underline cursor-pointer"
            >
              Reset Buffer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
