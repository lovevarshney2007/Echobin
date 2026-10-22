"use client";

import React, { useState } from "react";

export type CalculatorProfile = "family" | "society";

interface Props {
  initialProfile?: CalculatorProfile;
  onProfileChange?: (profile: CalculatorProfile) => void;
}

export default function BiogasEnergyCalculator({
  initialProfile = "society",
  onProfileChange,
}: Props) {
  const [profile, setProfile] = useState<CalculatorProfile>(initialProfile);
  const [wasteKg, setWasteKg] = useState<number>(profile === "society" ? 200 : 10);
  const [flats, setFlats] = useState<number>(profile === "society" ? 400 : 4);

  const handleProfileToggle = (newProfile: CalculatorProfile) => {
    setProfile(newProfile);
    if (newProfile === "society") {
      setWasteKg(200);
      setFlats(400);
    } else {
      setWasteKg(10);
      setFlats(4);
    }
    if (onProfileChange) {
      onProfileChange(newProfile);
    }
  };

  // Conversions grounded in startup doc & ppt metrics
  // 1 kg organic waste = ~0.09 m³ purified biogas
  const dailyBiogasM3 = +(wasteKg * 0.09).toFixed(2);
  const monthlyBiogasM3 = +(dailyBiogasM3 * 30).toFixed(1);
  const dailyEnergyMJ = +(dailyBiogasM3 * 0.65 * 35.8).toFixed(1); // 65% CH4 @ 35.8 MJ/m³
  
  // 28 m³ purified biogas = 1 commercial 19kg LPG cylinder (or ~14 m³ = domestic 14.2kg)
  const lpgCylinderM3Factor = profile === "society" ? 28 : 14.2;
  const cylindersReplaced = Math.max(1, Math.round(monthlyBiogasM3 / lpgCylinderM3Factor));
  const lpgUnitCost = profile === "society" ? 1850 : 950;
  const lpgMonthlySavings = cylindersReplaced * lpgUnitCost;

  // Haulage diesel & tipping fees avoided
  const haulageMonthlySavings = Math.round(wasteKg * (profile === "society" ? 260 : 45));

  // Dry recyclables offtake (PET, corrugated cardboard, aluminum)
  const recyclablesMonthlyOfftake = Math.round(flats * (profile === "society" ? 47.5 : 35));

  // Liquid bio-fertilizer output
  const dailyFertilizerLiters = +(wasteKg * 0.52).toFixed(1);
  const monthlyFertilizerLiters = Math.round(dailyFertilizerLiters * 30);
  const fertilizerValueSavings = Math.round(monthlyFertilizerLiters * 8); // ₹8/L bio-fertilizer replacement

  // Total financial value generated per month
  const totalMonthlySavings =
    lpgMonthlySavings + haulageMonthlySavings + recyclablesMonthlyOfftake + fertilizerValueSavings;

  // CapEx estimation & payback calculation
  const capexEstimated = profile === "society" ? 1850000 : 48000;
  const monthsPayback = Math.max(8, +(capexEstimated / totalMonthlySavings).toFixed(1));

  // CO2e emission offset (1.25 kg CO2e diverted per kg organic waste from landfill)
  const annualCo2Tons = +((wasteKg * 1.25 * 365) / 1000).toFixed(1);

  return (
    <div className="w-full bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      {/* Top Header */}
      <div className="p-6 border-b border-outline-variant bg-surface-container-low flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-primary tracking-widest uppercase">
              BIOMASS-TO-ENERGY SIMULATION ENGINE
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold">
              AKGEC CALIBRATED
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-on-surface">
            Biogas Yield &amp; LPG Displacement Calculator
          </h3>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Model real-time thermal biogas generation, commercial LPG cylinder savings, and municipal hauling cost offsets.
          </p>
        </div>

        {/* Profile Switcher */}
        <div className="inline-flex rounded-lg border border-outline-variant p-1 bg-surface-container text-xs font-mono">
          <button
            onClick={() => handleProfileToggle("family")}
            className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              profile === "family"
                ? "bg-primary-container text-on-primary shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span>Family Model</span>
          </button>
          <button
            onClick={() => handleProfileToggle("society")}
            className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              profile === "society"
                ? "bg-primary-container text-on-primary shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">domain</span>
            <span>Society / Canteen Skid</span>
          </button>
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= LEFT COLUMN (5 COLS): INPUT SLIDERS & PARAMETERS ================= */}
          <div className="lg:col-span-5 space-y-6">
            {/* Daily Waste Input Slider */}
            <div className="p-5 rounded-xl border border-outline-variant bg-surface-container-low">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-bold text-on-surface uppercase block">
                  Daily Organic Waste Input
                </label>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold font-mono text-primary">
                    {wasteKg}
                  </span>
                  <span className="text-xs font-mono text-on-surface-variant font-bold">
                    kg / day
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={profile === "society" ? 25 : 2}
                max={profile === "society" ? 500 : 25}
                step={profile === "society" ? 5 : 1}
                value={wasteKg}
                onChange={(e) => setWasteKg(Number(e.target.value))}
                className="w-full cursor-pointer accent-primary mt-2"
              />

              <div className="flex justify-between text-[10px] font-mono text-on-surface-variant mt-2">
                <span>{profile === "society" ? "25 kg (Boutique Hub)" : "2 kg (Single Home)"}</span>
                <span>{profile === "society" ? "500 kg (Large Campus)" : "25 kg (Villa Estate)"}</span>
              </div>
            </div>

            {/* Flats / Headcount Slider */}
            <div className="p-5 rounded-xl border border-outline-variant bg-surface-container-low">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-bold text-on-surface uppercase block">
                  {profile === "society" ? "Residential Apartments / Canteen Footfall" : "Household Family Members"}
                </label>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold font-mono text-on-surface">
                    {flats}
                  </span>
                  <span className="text-xs font-mono text-on-surface-variant font-bold">
                    {profile === "society" ? "units" : "people"}
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={profile === "society" ? 50 : 1}
                max={profile === "society" ? 1000 : 12}
                step={profile === "society" ? 25 : 1}
                value={flats}
                onChange={(e) => setFlats(Number(e.target.value))}
                className="w-full cursor-pointer accent-primary mt-2"
              />

              <div className="flex justify-between text-[10px] font-mono text-on-surface-variant mt-2">
                <span>{profile === "society" ? "50 Flats" : "1 Person"}</span>
                <span>{profile === "society" ? "1,000 Flats" : "12 People"}</span>
              </div>
            </div>

            {/* Mass-Energy Conversion Flow Breakdown */}
            <div className="p-5 rounded-xl border border-outline-variant bg-surface-container-lowest">
              <span className="text-xs font-mono font-bold text-on-surface uppercase block mb-3">
                Mass-Energy Transformation Ratio (Daily)
              </span>
              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-surface-container border border-outline-variant">
                  <span className="text-on-surface-variant">Input Food Scraps</span>
                  <span className="font-bold text-on-surface">{wasteKg} kg</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-primary-fixed/20 border border-primary/30 text-primary">
                  <span className="font-semibold">Methane-Rich Biogas</span>
                  <span className="font-extrabold">{dailyBiogasM3} m³</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-surface-container border border-outline-variant">
                  <span className="text-on-surface-variant">Liquid Organic Fertilizer</span>
                  <span className="font-bold text-on-surface">{dailyFertilizerLiters} Liters</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-surface-container border border-outline-variant">
                  <span className="text-on-surface-variant">Solid Landfill Diversion</span>
                  <span className="font-bold text-emerald-600">100% Zero-Landfill</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (7 COLS): ENERGY OUTPUTS & FINANCIAL ROI ================= */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top 3 High-Impact Output Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Card 1: Monthly Biogas */}
              <div className="p-4 rounded-xl border border-outline-variant bg-surface-container-low flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-primary font-bold uppercase block">
                    BIOGAS GENERATION
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-extrabold font-mono text-on-surface">
                      {monthlyBiogasM3}
                    </span>
                    <span className="text-xs font-mono text-primary font-bold">m³/mo</span>
                  </div>
                </div>
                <span className="text-[11px] text-on-surface-variant font-mono mt-3">
                  {dailyEnergyMJ} MJ/day thermal heat
                </span>
              </div>

              {/* Card 2: LPG Cylinders Replaced */}
              <div className="p-4 rounded-xl border border-outline-variant bg-surface-container-low flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-amber-accent font-bold uppercase block">
                    LPG DISPLACEMENT
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-extrabold font-mono text-on-surface">
                      {cylindersReplaced}
                    </span>
                    <span className="text-xs font-mono text-amber-accent font-bold">
                      {profile === "society" ? "19kg Cyl" : "Domestic"}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-on-surface-variant font-mono mt-3">
                  Replaces ₹{lpgMonthlySavings.toLocaleString()}/mo LPG bills
                </span>
              </div>

              {/* Card 3: Annual Carbon Offset */}
              <div className="p-4 rounded-xl border border-outline-variant bg-surface-container-low flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase block">
                    CARBON OFFSET
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-extrabold font-mono text-on-surface">
                      {annualCo2Tons}
                    </span>
                    <span className="text-xs font-mono text-emerald-600 font-bold">Tons/yr</span>
                  </div>
                </div>
                <span className="text-[11px] text-on-surface-variant font-mono mt-3">
                  Avoided fugitive landfill CH4
                </span>
              </div>
            </div>

            {/* Comprehensive Financial Savings Breakdown */}
            <div className="p-6 rounded-xl border border-outline-variant bg-surface-container-lowest">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-outline-variant">
                <div>
                  <span className="text-xs font-mono font-bold text-primary uppercase block">
                    MONTHLY FINANCIAL RECOVERY
                  </span>
                  <h4 className="text-xl font-extrabold text-on-surface">
                    ₹{totalMonthlySavings.toLocaleString()} / month
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-on-surface-variant block uppercase">
                    ESTIMATED PAYBACK
                  </span>
                  <span className="text-lg font-mono font-extrabold text-primary">
                    {monthsPayback} Months
                  </span>
                </div>
              </div>

              {/* Revenue Streams List */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-accent"></span>
                    Direct LPG Cooking Gas Savings ({cylindersReplaced} cylinders @ ₹{lpgUnitCost})
                  </span>
                  <span className="font-bold text-on-surface">
                    ₹{lpgMonthlySavings.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    Avoided Municipal Haulage &amp; Tipping Charges
                  </span>
                  <span className="font-bold text-on-surface">
                    ₹{haulageMonthlySavings.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    High-Purity Dry Recyclables Baling Offtake (PET/Cans)
                  </span>
                  <span className="font-bold text-on-surface">
                    ₹{recyclablesMonthlyOfftake.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Liquid Bio-Fertilizer Turf Replacement Value ({monthlyFertilizerLiters} L)
                  </span>
                  <span className="font-bold text-on-surface">
                    ₹{fertilizerValueSavings.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Progress Bar of Payback */}
              <div className="mt-5 pt-4 border-t border-outline-variant">
                <div className="flex justify-between text-[11px] font-mono text-on-surface-variant mb-1.5">
                  <span>Payback Velocity (CapEx ₹{capexEstimated.toLocaleString()})</span>
                  <span className="font-bold text-primary">{monthsPayback} Months ROI</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-primary h-2.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, Math.max(15, (36 - Number(monthsPayback)) * 3.5))}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
