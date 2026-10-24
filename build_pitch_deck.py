#!/usr/bin/env python3
"""
EcoBin Pitch Deck — Version 12.0 (Clean & Minimal Edition)
Philosophy: Big numbers. Short punchy lines. Visual flowcharts. Zero dense paragraphs.
11 Slides following YC winning formula.
"""

import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN

# ─────────────────────────────────────────────
#  COLOR PALETTE
# ─────────────────────────────────────────────
GREEN_DARK   = RGBColor(0,   91,  52)
GREEN_MED    = RGBColor(19,  117, 71)
GREEN_LIGHT  = RGBColor(236, 248, 241)
GREEN_MINT   = RGBColor(128, 217, 161)
CHARCOAL     = RGBColor(26,  28,  27)
SLATE        = RGBColor(100, 110, 107)
BORDER       = RGBColor(214, 222, 216)
BG           = RGBColor(250, 251, 249)
WHITE        = RGBColor(255, 255, 255)
RED          = RGBColor(186, 26,  26)
AMBER        = RGBColor(180, 83,  9)
BLUE         = RGBColor(2,   132, 199)
MUTED        = RGBColor(244, 245, 243)

F = "Arial"

# ─────────────────────────────────────────────
#  HELPERS
# ─────────────────────────────────────────────
def bg(slide, color=BG):
    slide.background.fill.solid()
    slide.background.fill.fore_color.rgb = color

def rect(slide, l, t, w, h, fill=WHITE, border=BORDER, radius=0.03):
    s = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE, Inches(l), Inches(t), Inches(w), Inches(h))
    s.fill.solid(); s.fill.fore_color.rgb = fill
    if border:
        s.line.color.rgb = border; s.line.width = Pt(0.8)
    else:
        s.line.fill.background()
    if hasattr(s, "adjustments") and len(s.adjustments) > 0:
        s.adjustments[0] = radius
    return s

def stripe(slide, l, t, w, h, color):
    s = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, Inches(l), Inches(t), Inches(w), Inches(h))
    s.fill.solid(); s.fill.fore_color.rgb = color
    s.line.fill.background()
    return s

def tb(slide, l, t, w, h, text, size=11, bold=False,
       color=CHARCOAL, align=PP_ALIGN.LEFT, wrap=True, italic=False):
    box = slide.shapes.add_textbox(Inches(l), Inches(t), Inches(w), Inches(h))
    tf = box.text_frame
    tf.word_wrap = wrap
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    p = tf.paragraphs[0]
    p.text = text
    p.alignment = align
    p.font.name = F
    p.font.size = Pt(size)
    p.font.bold = bold
    p.font.italic = italic
    p.font.color.rgb = color
    return box

def eyebrow(slide, text, l=0.8, t=0.28):
    tb(slide, l, t, 11.0, 0.28, text.upper(), size=8, bold=True, color=GREEN_DARK)

def big_title(slide, text, l=0.8, t=0.54, w=11.733, h=0.76):
    tb(slide, l, t, w, h, text, size=26, bold=True, color=CHARCOAL)

def subtitle_line(slide, text, l=0.8, t=1.24, w=11.733, h=0.38):
    tb(slide, l, t, w, h, text, size=11.5, color=SLATE, italic=True)

def arrow_right(slide, l, t, size=18, color=GREEN_MINT):
    tb(slide, l, t, 0.5, 0.4, "->", size=size, bold=True, color=color)


# ─────────────────────────────────────────────
#  SLIDE 01 - COVER
# ─────────────────────────────────────────────
def slide_01(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg(slide)

    # Left white card
    rect(slide, 0.6, 0.5, 7.8, 6.5)

    # Eyebrow pill
    rect(slide, 1.0, 0.88, 4.2, 0.38, fill=GREEN_LIGHT, border=GREEN_MINT)
    tb(slide, 1.10, 0.93, 4.0, 0.28,
       "DECENTRALIZED CLEAN ENERGY INFRASTRUCTURE",
       size=7.5, bold=True, color=GREEN_DARK)

    # Brand name
    tb(slide, 1.0, 1.40, 7.0, 1.10, "EcoBin",
       size=68, bold=True, color=GREEN_DARK)

    # Tagline
    tb(slide, 1.0, 2.50, 7.0, 0.52,
       '"Throw Waste. Create Energy."',
       size=20, bold=True, color=CHARCOAL)

    # Divider
    s = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, Inches(1.0), Inches(3.14), Inches(5.8), Inches(0.04))
    s.fill.solid(); s.fill.fore_color.rgb = GREEN_MINT
    s.line.fill.background()

    # One-liner
    tb(slide, 1.0, 3.28, 7.0, 0.54,
       "AI waste sorting + on-site biogas for campuses & societies",
       size=13, color=SLATE)

    # 3 stat cards
    stats = [("25-30", "LPG cylinders\nsaved/month"),
             (">98%",  "AI sorting\naccuracy"),
             ("Rs.1L+","saved monthly\nper campus")]
    for i, (val, lbl) in enumerate(stats):
        x = 1.0 + i * 2.2
        rect(slide, x, 4.05, 2.02, 0.92, fill=MUTED, border=BORDER)
        tb(slide, x+0.08, 4.10, 1.86, 0.44, val,
           size=22, bold=True, color=GREEN_DARK, align=PP_ALIGN.CENTER)
        tb(slide, x+0.08, 4.54, 1.86, 0.36, lbl,
           size=8, color=SLATE, align=PP_ALIGN.CENTER)

    # Website strip
    rect(slide, 1.0, 5.15, 7.0, 0.56, fill=GREEN_LIGHT, border=GREEN_MINT)
    tb(slide, 1.10, 5.27, 6.8, 0.32,
       "echobin.vercel.app  |  contact@ecobin.tech  |  Autonomous Bio-Utility",
       size=9, bold=True, color=GREEN_DARK, align=PP_ALIGN.CENTER)

    # Right panel - image
    rect(slide, 8.65, 0.5, 4.4, 6.5, fill=MUTED, border=BORDER)
    img = "deck_assets/smart_node.jpg"
    if os.path.exists(img):
        slide.shapes.add_picture(img, Inches(8.75), Inches(0.65),
                                 width=Inches(4.2), height=Inches(5.5))
    tb(slide, 8.75, 6.18, 4.2, 0.55,
       "EcoBin Autonomous Segregation Node",
       size=8.5, bold=True, color=GREEN_DARK, align=PP_ALIGN.CENTER)


# ─────────────────────────────────────────────
#  SLIDE 02 - THE PROBLEM
# ─────────────────────────────────────────────
def slide_02(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg(slide)
    eyebrow(slide, "The Problem")
    big_title(slide, "Institutions Pay Lakhs Monthly for a Broken Waste System")
    subtitle_line(slide, "Mixed waste. Failed sorting. Diesel trucks. Landfill fines.")

    # 3 big stat cards
    stats = [
        ("1.5 Lakh MT", "municipal solid waste\ngenerated daily in India", RED),
        (">40%",        "human sorting\nerror rate at source",              AMBER),
        ("Rs. 1.5L/mo", "average haulage bill\npaid by campuses",           RED),
    ]
    for i, (val, lbl, col) in enumerate(stats):
        x = 0.60 + i * 4.25
        rect(slide, x, 1.72, 3.98, 1.62, fill=WHITE, border=col)
        stripe(slide, x, 1.72, 0.12, 1.62, col)
        tb(slide, x+0.25, 1.84, 3.58, 0.72, val,
           size=32, bold=True, color=col)
        tb(slide, x+0.25, 2.58, 3.58, 0.62, lbl,
           size=11, color=CHARCOAL)

    # Flow label
    tb(slide, 0.60, 3.50, 6.0, 0.28,
       "HOW THE BROKEN SYSTEM WORKS TODAY", size=8, bold=True, color=SLATE)

    # 4-stage problem flow
    stages = [
        ("Mixed\nDisposal",   "Zero sorting\nat source",       RED),
        ("Manual\nBins Fail", ">40% error,\ndirty loads",      AMBER),
        ("Diesel\nHaulage",   "Rs. 80k/mo to haul\n70% water", RED),
        ("Landfill\n+ Fines", "Rs. 50k NGT\nfines",            CHARCOAL),
    ]
    for i, (title, desc, col) in enumerate(stages):
        x = 0.60 + i * 3.10
        rect(slide, x, 3.86, 2.82, 1.70, fill=WHITE, border=col)
        stripe(slide, x, 3.86, 0.10, 1.70, col)
        tb(slide, x+0.20, 3.96, 2.52, 0.54, title,
           size=15, bold=True, color=col)
        tb(slide, x+0.20, 4.54, 2.52, 0.86, desc,
           size=10.5, color=CHARCOAL)
        if i < 3:
            tb(slide, x+2.84, 4.50, 0.28, 0.40, "->",
               size=20, bold=True, color=BORDER)

    # Bottom image strip
    img1 = "deck_assets/overflowing_waste_pit.jpg"
    img2 = "deck_assets/landfill_crisis.jpg"
    rect(slide, 0.60, 5.74, 5.90, 1.50, fill=MUTED, border=BORDER)
    rect(slide, 6.72, 5.74, 6.00, 1.50, fill=MUTED, border=BORDER)
    if os.path.exists(img1):
        slide.shapes.add_picture(img1, Inches(0.65), Inches(5.79),
                                 width=Inches(5.80), height=Inches(1.40))
    if os.path.exists(img2):
        slide.shapes.add_picture(img2, Inches(6.77), Inches(5.79),
                                 width=Inches(5.90), height=Inches(1.40))


# ─────────────────────────────────────────────
#  SLIDE 03 - WHY NOW
# ─────────────────────────────────────────────
def slide_03(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg(slide)
    eyebrow(slide, "Market Timing")
    big_title(slide, "Why Now? Four Tailwinds Make This the Right Moment")
    subtitle_line(slide, "Regulations. Cost spikes. Cheap AI sensors. ESG pressure — all converging.")

    cards = [
        ("Regulation\nMandates Action",
         "SWM 2016 legally requires on-site treatment\nfor all bulk generators >100 kg/day.\nRs. 50,000 NGT fines now actively enforced.",
         GREEN_DARK),
        ("Diesel & LPG\nCosts Surged 40%",
         "Haulage costs up 40% in 3 years.\nLPG cylinder prices at all-time high.\nInstitutions urgently seeking alternatives.",
         RED),
        ("AI Sensors Now\nCost <Rs. 800",
         "ESP32-S3 AI camera modules: <Rs. 800.\nEdge inference viable in Rs. 3L hardware.\nMoore's Law finally reached waste-tech.",
         BLUE),
        ("ESG & NAAC\nNow Mandatory",
         "Universities need NAAC Green credentials.\nCorporates face SEBI BRSR net-zero mandates.\nGreen infra is a procurement priority.",
         AMBER),
    ]
    for i, (title, body, col) in enumerate(cards):
        row, ci = divmod(i, 2)
        x = 0.60 + ci * 6.37
        y = 1.80 + row * 2.65
        rect(slide, x, y, 6.10, 2.42, fill=WHITE, border=col)
        stripe(slide, x, y, 0.12, 2.42, col)
        tb(slide, x+0.26, y+0.18, 5.68, 0.60, title,
           size=18, bold=True, color=col)
        tb(slide, x+0.26, y+0.84, 5.68, 1.38, body,
           size=11, color=CHARCOAL)


# ─────────────────────────────────────────────
#  SLIDE 04 - SOLUTION FLOWCHART
# ─────────────────────────────────────────────
def slide_04(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg(slide)
    eyebrow(slide, "The Solution")
    big_title(slide, "Drop Any Waste. Get Free Cooking Gas.")
    subtitle_line(slide, "Fully autonomous 4-step closed loop. Zero manual sorting. Zero diesel trucks.")

    # 4-step flow
    steps = [
        ("01", "Drop Waste",        "User drops anything.\nNo sorting needed.",          CHARCOAL),
        ("02", "AI Vision Sort",    "<150ms edge AI\nsorts dry vs wet",                  BLUE),
        ("03", "Bio-Digestion",     "Organic food waste\nbecomes clean biogas",           GREEN_MED),
        ("04", "Free Cooking Gas",  "Piped directly to\nkitchen stoves",                 AMBER),
    ]

    for i, (num, title, desc, col) in enumerate(steps):
        x = 0.55 + i * 3.12
        # Step card
        rect(slide, x, 1.72, 2.85, 2.88, fill=WHITE, border=col)
        stripe(slide, x, 1.72, 2.85, 0.10, col)
        # Number pill
        rect(slide, x+0.14, 1.90, 0.48, 0.34, fill=col, border=None, radius=0.04)
        tb(slide, x+0.14, 1.91, 0.48, 0.30, num,
           size=9.5, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
        # Title
        tb(slide, x+0.14, 2.34, 2.58, 0.60, title,
           size=16, bold=True, color=col)
        # Desc
        tb(slide, x+0.14, 3.00, 2.58, 1.40, desc,
           size=11.5, color=CHARCOAL)
        # Arrow
        if i < 3:
            tb(slide, x+2.86, 2.95, 0.30, 0.44, "->",
               size=22, bold=True, color=GREEN_MINT)

    # Before vs After
    tb(slide, 0.60, 4.80, 12.0, 0.28,
       "BEFORE vs. AFTER", size=9, bold=True, color=SLATE)

    # Before
    rect(slide, 0.60, 5.14, 5.90, 1.65,
         fill=RGBColor(254,242,242), border=RED)
    stripe(slide, 0.60, 5.14, 0.10, 1.65, RED)
    tb(slide, 0.82, 5.22, 5.56, 0.40, "BEFORE", size=13, bold=True, color=RED)
    tb(slide, 0.82, 5.66, 5.56, 1.00,
       "Mixed Waste -> 40% Error -> Rs.80k Hauling -> Landfill + Rs.50k Fine",
       size=10.5, color=CHARCOAL)

    # After
    rect(slide, 6.78, 5.14, 5.913, 1.65, fill=GREEN_LIGHT, border=GREEN_DARK)
    stripe(slide, 6.78, 5.14, 0.10, 1.65, GREEN_DARK)
    tb(slide, 7.02, 5.22, 5.60, 0.40, "AFTER  (EcoBin)",
       size=13, bold=True, color=GREEN_DARK)
    tb(slide, 7.02, 5.66, 5.60, 1.00,
       "Single Drop -> AI Sorts -> Biogas to Kitchen -> Rs.1L+ Saved Monthly",
       size=10.5, color=CHARCOAL)


# ─────────────────────────────────────────────
#  SLIDE 05 - THE PRODUCT
# ─────────────────────────────────────────────
def slide_05(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg(slide)
    eyebrow(slide, "The Product")
    big_title(slide, "EcoBin Hardware: Plug-and-Play Smart Waste Node")
    subtitle_line(slide, "Installs in 3-5 days. No civil work. Modular for 100-500 kg/day.")

    # Left: image
    rect(slide, 0.60, 1.68, 5.70, 5.24, fill=MUTED, border=BORDER)
    img = "deck_assets/smart_node.jpg"
    if os.path.exists(img):
        slide.shapes.add_picture(img, Inches(0.68), Inches(1.76),
                                 width=Inches(5.54), height=Inches(4.58))
    rect(slide, 0.68, 6.38, 5.54, 0.40, fill=GREEN_LIGHT, border=GREEN_MINT)
    tb(slide, 0.76, 6.43, 5.38, 0.30,
       "EcoBin Autonomous Hardware Node  |  100–500 kg/day Modular Capacity",
       size=8.5, bold=True, color=GREEN_DARK, align=PP_ALIGN.CENTER)

    # Right: 4 feature cards (2x2)
    features = [
        ("AI Vision Sort",    "ESP32-S3 + YOLOv8\n<150ms  |  >98% accuracy", BLUE),
        ("Bio-Digestion",     "Mesophilic 37C dome\nAuto pH anti-souring",    GREEN_MED),
        ("Free Cooking Gas",  "65% CH4 purity\nPiped to kitchen stoves",      AMBER),
        ("Clean Recyclables", "Dry bales: PET, paper\nSold to industrial mills",GREEN_DARK),
    ]
    for i, (title, desc, col) in enumerate(features):
        row, ci = divmod(i, 2)
        x = 6.55 + ci * 3.22
        y = 1.68 + row * 2.68
        rect(slide, x, y, 2.98, 2.44, fill=WHITE, border=col)
        stripe(slide, x, y, 0.10, 2.44, col)
        tb(slide, x+0.20, y+0.20, 2.64, 0.56, title,
           size=15, bold=True, color=col)
        tb(slide, x+0.20, y+0.84, 2.64, 1.38, desc,
           size=11, color=CHARCOAL)


# ─────────────────────────────────────────────
#  SLIDE 06 - MARKET SIZE
# ─────────────────────────────────────────────
def slide_06(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg(slide)
    eyebrow(slide, "Market Opportunity")
    big_title(slide, "Rs. 14,200 Cr Market — 1.2 Lakh Generators Legally Mandated to Act")
    subtitle_line(slide, "Bottom-up sizing. Every bulk waste generator >100 kg/day must comply with SWM 2016.")

    # TAM / SAM / SOM cards
    tiers = [
        ("TAM",  "Rs. 14,200 Cr", "1,20,000 bulk waste generators\nacross urban India", CHARCOAL, MUTED,       BORDER),
        ("SAM",  "Rs. 3,200 Cr",  "25,000 universities & gated societies\nin Tier-1 cities", GREEN_MED, GREEN_LIGHT, GREEN_MINT),
        ("SOM",  "Rs. 95 Cr",     "800 beachhead deployments\nDelhi-NCR & Bengaluru (3-yr)", GREEN_DARK, RGBColor(200,240,218), GREEN_DARK),
    ]
    for i, (label, val, desc, col, fill_c, bord_c) in enumerate(tiers):
        x = 0.60 + i * 4.22
        rect(slide, x, 1.72, 3.95, 2.30, fill=fill_c, border=bord_c)
        stripe(slide, x, 1.72, 0.10, 2.30, col)
        tb(slide, x+0.22, 1.86, 1.20, 0.48, label, size=16, bold=True, color=col)
        tb(slide, x+1.50, 1.82, 2.30, 0.56, val, size=22, bold=True, color=col)
        tb(slide, x+0.22, 2.46, 3.58, 0.86, desc, size=10.5, color=CHARCOAL)
        tb(slide, x+0.22, 3.36, 3.58, 0.46,
           "120k x Rs.1.18L avg" if i==0 else ("25k x Rs.1.28L avg" if i==1 else "800 hubs x Rs.12L ARR"),
           size=9, color=SLATE, italic=True)

    # GTM roadmap timeline
    rect(slide, 0.60, 4.18, 12.133, 0.30, fill=GREEN_LIGHT, border=GREEN_MINT)
    tb(slide, 0.78, 4.25, 11.8, 0.20,
       "GO-TO-MARKET EXECUTION ROADMAP", size=8, bold=True, color=GREEN_DARK)

    gtm = [
        ("Stage 1\nMonth 0-6",   "Prototype Build\n& Pilot Deployment",           GREEN_DARK, "->"),
        ("Stage 2\nMonth 6-12",  "20 university\ncampuses (NCR)",                GREEN_MED, "->"),
        ("Stage 3\nMonth 12-24", "150 gated societies\nJLL/CBRE channel",        AMBER,     "->"),
        ("Stage 4\nYear 2+",     "800 nodes\nSeries A ready",                    BLUE,      ""),
    ]
    for i, (stage, desc, col, arr) in enumerate(gtm):
        x = 0.60 + i * 3.12
        rect(slide, x, 4.58, 2.85, 2.46, fill=WHITE, border=col)
        stripe(slide, x, 4.58, 0.10, 2.46, col)
        tb(slide, x+0.20, 4.70, 2.54, 0.58, stage, size=11, bold=True, color=col)
        tb(slide, x+0.20, 5.32, 2.54, 1.46, desc, size=10.5, color=CHARCOAL)
        if arr:
            tb(slide, x+2.86, 5.50, 0.30, 0.42, arr,
               size=22, bold=True, color=BORDER)


# ─────────────────────────────────────────────
#  SLIDE 07 - TRACTION
# ─────────────────────────────────────────────
def slide_07(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg(slide)
    eyebrow(slide, "Architecture & Pilot Targets")
    big_title(slide, "Engineered Unit Capacity & Projected Savings")
    subtitle_line(slide, "Target operational specifications designed for standard higher-ed campuses:")

    # 4 giant KPI cards
    kpis = [
        ("250 kg",    "food waste\ndaily capacity target",GREEN_DARK),
        ("28 LPG",    "cylinders replaced\nprojected per month",GREEN_MED),
        (">95%",      "machine vision\nsorting precision target", BLUE),
        ("Rs. 1L+",   "net savings per\ncampus per month (est.)",AMBER),
    ]
    for i, (val, lbl, col) in enumerate(kpis):
        x = 0.55 + i * 3.12
        rect(slide, x, 1.72, 2.85, 2.16, fill=WHITE, border=col)
        stripe(slide, x, 1.72, 2.85, 0.10, col)
        tb(slide, x+0.12, 1.92, 2.62, 0.86, val,
           size=32, bold=True, color=col, align=PP_ALIGN.CENTER)
        tb(slide, x+0.12, 2.82, 2.62, 0.80, lbl,
           size=10.5, color=SLATE, align=PP_ALIGN.CENTER)

    # Divider
    rect(slide, 0.55, 4.05, 12.133, 0.28, fill=GREEN_LIGHT, border=GREEN_MINT)
    tb(slide, 0.72, 4.10, 11.8, 0.18,
       "KEY ENGINEERING & PILOT TARGETS", size=8, bold=True, color=GREEN_DARK)

    # 5 checkmarks
    checks = [
        ("Dual-stream automated diverter: dry recyclables to baler, food scraps to macerator",
         GREEN_DARK),
        ("Mesophilic 37°C anaerobic reactor with automated pH buffering against acid souring",
         GREEN_MED),
        ("Direct methane piping (65% CH4) designed to replace commercial 19kg mess LPG cylinders",
         GREEN_DARK),
        ("Sub-150ms sensor fusion (Sony IMX vision, dielectric moisture, inductive metal)",
         GREEN_MED),
        ("100% compliant with Ministry of Environment SWM 2016 bulk generator mandate",
         BLUE),
    ]
    for i, (text, col) in enumerate(checks):
        y = 4.44 + i * 0.54
        tb(slide, 0.72, y, 11.8, 0.44, "  " + text,
           size=11.5, bold=(i % 2 == 0), color=col)

    tb(slide, 0.72, 7.16, 12.0, 0.24,
       "Source: EcoBin Systems Architecture & Pilot Engineering Benchmarks",
       size=7.5, color=SLATE, italic=True)


# ─────────────────────────────────────────────
#  SLIDE 08 - BUSINESS MODEL
# ─────────────────────────────────────────────
def slide_08(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg(slide)
    eyebrow(slide, "Business Model & Unit Economics")
    big_title(slide, "Hardware Sale + Sticky Monthly Retainer = 16-20 Month Payback")
    subtitle_line(slide, "Customer recovers full capital cost in <20 months purely from operational savings.")

    # Revenue flow
    tb(slide, 0.60, 1.64, 12.0, 0.28,
       "HOW ECOBIN MAKES MONEY", size=9, bold=True, color=SLATE)

    nodes = [
        ("Campus / RWA\nPays EcoBin",         CHARCOAL, WHITE),
        ("Hardware CapEx\nRs. 3L - 8L",        GREEN_DARK, WHITE),
        ("Monthly AMC\nRs. 5k-10k  |  65% margin", GREEN_MED, WHITE),
        ("Recyclable\nOfftake +Rs. 15k/mo",    AMBER, WHITE),
    ]
    node_x = [0.60, 3.62, 6.64, 9.66]
    for i, (label, fill_c, txt_c) in enumerate(nodes):
        rect(slide, node_x[i], 2.00, 2.80, 1.55, fill=fill_c, border=None)
        tb(slide, node_x[i]+0.12, 2.14, 2.56, 1.28,
           label, size=12.5, bold=True, color=txt_c, align=PP_ALIGN.CENTER)
        if i < 3:
            tb(slide, node_x[i]+2.82, 2.55, 0.30, 0.42, "->",
               size=22, bold=True, color=GREEN_MINT)

    # Unit economics
    tb(slide, 0.60, 3.72, 12.0, 0.28,
       "CAMPUS UNIT ECONOMICS (250 kg/day)", size=9, bold=True, color=SLATE)

    rows = [
        ("Hauling Contracts Eliminated",    "Rs. 45,000 / mo", CHARCOAL, False),
        ("LPG Cylinders Replaced (28 nos)", "Rs. 56,000 / mo", CHARCOAL, False),
        ("Recyclable Sales",                "+ Rs. 6,500 / mo",GREEN_MED, False),
        ("EcoBin AMC Fee",                  "- Rs. 7,500 / mo",RED,      False),
        ("NET MONTHLY SAVING",              "Rs. 1,00,000 / mo",GREEN_DARK, True),
        ("Capital Payback Period",          "16-20 months",     GREEN_DARK, True),
    ]
    for i, (label, val, col, is_total) in enumerate(rows):
        y = 4.10 + i * 0.48
        row_fill = GREEN_LIGHT if is_total else (MUTED if i % 2 == 0 else WHITE)
        rect(slide, 0.60, y, 9.10, 0.44, fill=row_fill, border=BORDER)
        tb(slide, 0.78, y+0.07, 6.80, 0.32, label,
           size=11.5 if is_total else 10.5, bold=is_total, color=col)
        tb(slide, 7.70, y+0.07, 1.80, 0.32, val,
           size=11.5 if is_total else 10.5, bold=is_total,
           color=col, align=PP_ALIGN.RIGHT)

    # Margin badges
    margins = [("38-42%", "Hardware Margin", GREEN_DARK),
               ("65-70%", "AMC Margin",      GREEN_MED),
               (">6.8x",  "LTV / CAC",       BLUE)]
    for i, (val, lbl, col) in enumerate(margins):
        y = 4.10 + i * 1.00
        rect(slide, 10.02, y, 2.70, 0.88, fill=WHITE, border=col)
        tb(slide, 10.10, y+0.06, 2.54, 0.40, val,
           size=24, bold=True, color=col, align=PP_ALIGN.CENTER)
        tb(slide, 10.10, y+0.48, 2.54, 0.34, lbl,
           size=9, color=SLATE, align=PP_ALIGN.CENTER)


# ─────────────────────────────────────────────
#  SLIDE 09 - COMPETITION & MOAT
# ─────────────────────────────────────────────
def slide_09(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg(slide)
    eyebrow(slide, "Competition & Moat")
    big_title(slide, "No One Combines AI Sorting + On-Site Biogas. EcoBin Owns This.")
    subtitle_line(slide, "Competitors solve one piece. EcoBin solves the complete system.")

    # Comparison table
    headers  = ["Feature",            "EcoBin",    "Manual 2-Bin", "Compost Pit", "Old Biogas"]
    col_widths = [3.08,               1.92,         1.92,           1.92,          1.92]
    col_x      = [0.60,               3.76,         5.76,           7.76,          9.76]
    hdr_fill   = [MUTED, GREEN_DARK,  MUTED,        MUTED,          MUTED]
    hdr_col    = [CHARCOAL, WHITE,    CHARCOAL,     CHARCOAL,       CHARCOAL]

    for j, (hdr, cx, cw, hf, hc) in enumerate(
            zip(headers, col_x, col_widths, hdr_fill, hdr_col)):
        rect(slide, cx, 1.72, cw, 0.46, fill=hf, border=BORDER)
        tb(slide, cx+0.08, 1.81, cw-0.16, 0.30, hdr,
           size=10, bold=True, color=hc, align=PP_ALIGN.CENTER)

    rows_data = [
        ("AI Auto-Sorting",       "YES <150ms", "NO  Manual",  "NO  None",     "NO  None"),
        ("On-Site Biogas",        "YES",         "NO",           "NO",           "RISK Unstable"),
        ("Zero Human Sorting",    "YES",         "NO  40% fail", "NO  Manual",   "NO  Manual"),
        ("SWM 2016 Compliant",    "YES Full",    "PART",         "PART",         "PART"),
        ("Rs.1L+/mo Saving",      "YES",         "NO",           "NO",           "NO"),
        ("Anti-Souring Control",  "YES Auto",    "NO",           "NO",           "NO Manual"),
    ]
    row_colors = [WHITE, MUTED]
    for r_i, row in enumerate(rows_data):
        for j, (val, cx, cw) in enumerate(zip(row, col_x, col_widths)):
            y = 2.22 + r_i * 0.48
            is_eco = (j == 1)
            cell_fill = GREEN_LIGHT if is_eco else row_colors[r_i % 2]
            cell_bord = GREEN_DARK if is_eco else BORDER
            rect(slide, cx, y, cw, 0.44, fill=cell_fill, border=cell_bord)
            cell_col = (GREEN_DARK if is_eco else
                        (RED if "NO" in val else (AMBER if "RISK" in val or "PART" in val else CHARCOAL)))
            tb(slide, cx+0.08, y+0.07, cw-0.16, 0.30, val,
               size=9.5 if j == 0 else 10,
               bold=(j == 0 or is_eco),
               color=cell_col, align=PP_ALIGN.CENTER)

    # 4 Moat cards (bottom row)
    tb(slide, 0.60, 5.24, 12.0, 0.28,
       "OUR 4 COMPETITIVE MOATS", size=9, bold=True, color=SLATE)
    moats = [
        ("Proprietary\nAI Dataset",     "20k+ real waste images,\ngrowing with every node",    BLUE),
        ("Anti-Souring\nBioprocess IP", "Auto pH dosing loop —\nno competitor has this",        GREEN_MED),
        ("Utility\nLock-In",            "Gas pipes = sticky.\n<1.5% annual churn",              GREEN_DARK),
        ("Regulatory\nAlignment",     "100% SWM 2016 compliant\non-site bio-utility design",   AMBER),
    ]
    for i, (title, desc, col) in enumerate(moats):
        x = 0.60 + i * 3.12
        rect(slide, x, 5.58, 2.90, 1.68, fill=WHITE, border=col)
        stripe(slide, x, 5.58, 0.10, 1.68, col)
        tb(slide, x+0.20, 5.68, 2.60, 0.56, title, size=12, bold=True, color=col)
        tb(slide, x+0.20, 6.28, 2.60, 0.88, desc, size=9.5, color=CHARCOAL)


# ─────────────────────────────────────────────
#  SLIDE 10 - TEAM & THE ASK
# ─────────────────────────────────────────────
def slide_10(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg(slide)
    eyebrow(slide, "The Team & Investment Ask")
    big_title(slide, "Raising Rs. 1.5 Cr Seed to Deploy Across 20 Target Campuses")
    subtitle_line(slide, "Domain-first team. Clear milestones. Every rupee de-risks a specific technical risk.")

    # Left: Team
    rect(slide, 0.60, 1.68, 5.80, 5.24, fill=WHITE, border=BORDER)
    tb(slide, 0.78, 1.82, 5.40, 0.30,
       "TEAM CAPABILITIES", size=9, bold=True, color=SLATE)

    domains = [
        ("Embedded Systems & Firmware",   "ESP32-S3  |  FreeRTOS  |  OTA  |  Edge AI",  BLUE),
        ("Computer Vision & ML",          "YOLOv8  |  TFLite  |  Custom 20k Dataset",   GREEN_DARK),
        ("Anaerobic Bio-Process Eng.",     "Biogas  |  VFA Monitoring  |  pH Control",   GREEN_MED),
        ("Institutional B2B Sales",        "Campus Admin  |  SWM Compliance  |  GTM",    AMBER),
        ("Hardware & Manufacturing",       "Fabrication  |  Modular Design  |  BoM",     CHARCOAL),
    ]
    for i, (title, tags, col) in enumerate(domains):
        y = 2.22 + i * 0.94
        rect(slide, 0.78, y, 5.44, 0.84, fill=MUTED, border=col)
        stripe(slide, 0.78, y, 0.08, 0.84, col)
        tb(slide, 0.98, y+0.09, 5.12, 0.38, title, size=13, bold=True, color=col)
        tb(slide, 0.98, y+0.52, 5.12, 0.28, tags, size=8.5, color=SLATE)

    # Right: Ask + Milestone Ladder
    rect(slide, 6.65, 1.68, 6.083, 5.24, fill=WHITE, border=BORDER)
    tb(slide, 6.83, 1.82, 5.70, 0.30,
       "MILESTONE LADDER  —  USE OF FUNDS", size=9, bold=True, color=SLATE)

    # Seed banner
    rect(slide, 6.83, 2.20, 5.70, 0.88, fill=GREEN_LIGHT, border=GREEN_DARK)
    tb(slide, 6.95, 2.28, 5.46, 0.46,
       "RAISING: Rs. 1.5 Cr SEED ROUND",
       size=18, bold=True, color=GREEN_DARK, align=PP_ALIGN.CENTER)
    tb(slide, 6.95, 2.72, 5.46, 0.30,
       "12-month runway  |  20 campuses  |  Rs. 1.2 Cr ARR",
       size=9, color=CHARCOAL, align=PP_ALIGN.CENTER)

    milestones = [
        ("M1", "Rs. 35L", "Month 0-3",
         "Gen-2 hardware finalized\nBIS certifications done\nRisk: scaling proven",   BLUE),
        ("M2", "Rs. 70L", "Month 3-9",
         "20 campus hubs deployed\n3-person sales team hired\nTarget: Rs. 12L ARR",   GREEN_MED),
        ("M3", "Rs. 45L", "Month 9-18",
         "NCR assembly hub opened\nJLL/CBRE channel signed\nTarget: 100 nodes, Series A", GREEN_DARK),
    ]
    for i, (num, amount, timing, desc, col) in enumerate(milestones):
        y = 3.22 + i * 1.22
        rect(slide, 6.83, y, 5.70, 1.12, fill=MUTED, border=col)
        stripe(slide, 6.83, y, 0.10, 1.12, col)
        rect(slide, 7.03, y+0.16, 0.42, 0.30, fill=col, border=None, radius=0.04)
        tb(slide, 7.03, y+0.16, 0.42, 0.28, num,
           size=8, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
        tb(slide, 7.56, y+0.12, 1.40, 0.38, amount,
           size=17, bold=True, color=col)
        tb(slide, 9.14, y+0.16, 3.20, 0.26, timing,
           size=8.5, color=SLATE)
        tb(slide, 7.03, y+0.54, 5.38, 0.52, desc,
           size=9, color=CHARCOAL)
        if i < 2:
            tb(slide, 9.30, y+1.14, 0.30, 0.28, "v",
               size=14, bold=True, color=col, align=PP_ALIGN.CENTER)


# ─────────────────────────────────────────────
#  SLIDE 11 - THANK YOU
# ─────────────────────────────────────────────
def slide_11(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg(slide)

    rect(slide, 1.20, 0.80, 10.93, 5.90, fill=WHITE, border=BORDER)

    tb(slide, 2.0, 1.28, 9.33, 0.36,
       "DECENTRALIZED URBAN BIO-UTILITY  |  SEED STAGE",
       size=9, bold=True, color=GREEN_DARK, align=PP_ALIGN.CENTER)

    tb(slide, 2.0, 1.72, 9.33, 1.60, "Thank You",
       size=72, bold=True, color=GREEN_DARK, align=PP_ALIGN.CENTER)

    tb(slide, 2.0, 3.38, 9.33, 0.58,
       'EcoBin  —  "Throw Waste. Create Energy."',
       size=20, bold=True, color=CHARCOAL, align=PP_ALIGN.CENTER)

    # Divider
    s = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, Inches(3.8), Inches(4.10), Inches(5.73), Inches(0.04))
    s.fill.solid(); s.fill.fore_color.rgb = GREEN_MINT
    s.line.fill.background()

    rect(slide, 2.5, 4.28, 8.33, 1.82, fill=GREEN_LIGHT, border=GREEN_MINT)
    tb(slide, 2.6, 4.46, 8.13, 0.48,
       "echobin.vercel.app",
       size=18, bold=True, color=GREEN_DARK, align=PP_ALIGN.CENTER)
    tb(slide, 2.6, 4.96, 8.13, 0.42,
       "contact@ecobin.tech",
       size=14, color=CHARCOAL, align=PP_ALIGN.CENTER)
    tb(slide, 2.6, 5.42, 8.13, 0.38,
       "Open for institutional pilots, municipal partnerships & strategic collaborations",
       size=9.5, color=SLATE, align=PP_ALIGN.CENTER, italic=True)


# ─────────────────────────────────────────────
#  MAIN
# ─────────────────────────────────────────────
def main():
    prs = Presentation()
    prs.slide_width  = Inches(13.333)
    prs.slide_height = Inches(7.5)

    builders = [
        ("01: Cover",                     slide_01),
        ("02: The Problem",               slide_02),
        ("03: Why Now",                   slide_03),
        ("04: Solution Flowchart",        slide_04),
        ("05: The Product",               slide_05),
        ("06: Market Size + GTM",         slide_06),
        ("07: Traction",                  slide_07),
        ("08: Business Model",            slide_08),
        ("09: Competition & Moat",        slide_09),
        ("10: Team & The Ask",            slide_10),
        ("11: Thank You",                 slide_11),
    ]

    for label, fn in builders:
        print(f"  Building Slide {label}...")
        fn(prs)

    out = "EcoBin_Startup_Pitch_Deck.pptx"
    prs.save(out)
    print(f"\nSaved: {out}  ({len(prs.slides)} slides)")

if __name__ == "__main__":
    main()
