#!/usr/bin/env python3
"""
EcoBin Startup Pitch Deck Generator — Version 11.0 (10-Slide Winning Formula Edition)
Based on Y Combinator & Top VC winning pitch deck structure (Airbnb, Buffer, Flock Safety, YC formula):

10-SLIDE WINNING FORMULA:
  Slide 01: Hook & One-Liner (Cover) — Brand, tagline, crisp one-liner, hardware visual.
  Slide 02: The Problem — Pain, scale, documentary evidence of waste crisis.
  Slide 03: Status Quo Failure — How customers handle it today (4-stage workflow + sunk cost drains).
  Slide 04: The Solution & Who We Target — What EcoBin does + customer segments.
  Slide 05: Product Workflow & Business Model — Diagrammatic 4-step pipeline + commercial model.
  Slide 06: Traction & Live Validation — Active operational deployment, pilot metrics, MoUs, runtime.
  Slide 07: Market Size (TAM/SAM/SOM) & GTM Roadmap — Bottom-up market + 4-stage go-to-market.
  Slide 08: Unit Economics & Revenue Structure — Dual-stream revenue, campus cashflow, payback.
  Slide 09: Competition & Moat — Feature comparison table + 4 defensibility pillars.
  Slide 10: The Team & The Ask — Domain expertise + milestone ladder + use of funds.
  [Bonus Slide 11]: Thank You — Ultra-clean closing (simple & minimal).

Absolute Rules:
  - Uses 'Rs.' instead of Unicode rupee for glyph-safe rendering.
  - Strictly NO personal names anywhere.
  - Strictly NO 'MVP' — framed as Active Operational Deployment & Live Testbed Validation.
  - Real documentary images for problem slides.
"""

import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

# ==============================================================================
# COLOR PALETTE — CURATED EXECUTIVE BIO-UTILITY THEME
# ==============================================================================
C_DARK_GREEN  = RGBColor(0, 91, 52)      # Primary brand green (#005B34)
C_MED_GREEN   = RGBColor(19, 117, 71)    # Forest accent green (#137547)
C_MINT_ACCENT = RGBColor(128, 217, 161)  # Mint accent border (#80D9A1)
C_PALE_GREEN  = RGBColor(236, 248, 241)  # Soft mint card fill
C_CHARCOAL    = RGBColor(26, 28, 27)     # Deep dark charcoal for headings (#1A1C1B)
C_SLATE_MID   = RGBColor(85, 92, 90)     # Secondary slate text (#555C5A)
C_BORDER      = RGBColor(214, 222, 216)  # Subtle card border (#D6DED8)
C_BG_WARM     = RGBColor(248, 249, 247)  # Warm executive canvas
C_CARD_WHITE  = RGBColor(255, 255, 255)  # Pure white card surface
C_CARD_MUTED  = RGBColor(244, 245, 243)  # Subtle grey card surface
C_RED         = RGBColor(186, 26, 26)    # Alert red (#BA1A1A)
C_RED_BG      = RGBColor(254, 242, 242)  # Soft red card fill
C_AMBER       = RGBColor(180, 83, 9)     # Amber warning (#B45309)
C_AMBER_BG    = RGBColor(254, 243, 199)  # Soft amber card fill
C_BLUE_PIPE   = RGBColor(2, 132, 199)    # Blue for recyclables (#0284C7)
C_BLUE_BG     = RGBColor(240, 249, 255)  # Soft blue tint

FONT_HEAD = "Arial"
FONT_BODY = "Arial"

# ==============================================================================
# HELPER FUNCTIONS
# ==============================================================================
def set_slide_background(slide, color):
    background = slide.background
    fill = background.fill
    fill.solid()
    fill.fore_color.rgb = color

def add_header(slide, eyebrow, title, subtitle=None, top_in=0.36):
    tb = slide.shapes.add_textbox(Inches(0.8), Inches(top_in), Inches(11.733), Inches(1.15))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    
    # Eyebrow
    p0 = tf.paragraphs[0]
    p0.text = eyebrow.upper()
    p0.font.name = FONT_HEAD
    p0.font.size = Pt(8.5)
    p0.font.bold = True
    p0.font.color.rgb = C_DARK_GREEN
    p0.space_after = Pt(2)
    
    # Headline
    p1 = tf.add_paragraph()
    p1.text = title
    p1.font.name = FONT_HEAD
    p1.font.size = Pt(19)
    p1.font.bold = True
    p1.font.color.rgb = C_CHARCOAL
    
    if subtitle:
        p1.space_after = Pt(2)
        p2 = tf.add_paragraph()
        p2.text = subtitle
        p2.font.name = FONT_BODY
        p2.font.size = Pt(9.5)
        p2.font.color.rgb = C_SLATE_MID

def add_card(slide, left, top, width, height, bg_color=C_CARD_WHITE, border_color=C_BORDER, corner_radius=0.035):
    """Creates a sleek card with subtle, modern rounded corners."""
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
    shape.fill.solid()
    shape.fill.fore_color.rgb = bg_color
    if border_color:
        shape.line.color.rgb = border_color
        shape.line.width = Pt(1)
    else:
        shape.line.fill.background()
    if hasattr(shape, "adjustments") and len(shape.adjustments) > 0:
        shape.adjustments[0] = corner_radius
    return shape

def add_arrow_badge(slide, left, top, width=0.30, height=0.35, text="➔", color=C_DARK_GREEN, size=15):
    tb = slide.shapes.add_textbox(Inches(left), Inches(top), Inches(width), Inches(height))
    tf = tb.text_frame
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    p = tf.paragraphs[0]
    p.text = text
    p.font.name = FONT_HEAD
    p.font.size = Pt(size)
    p.font.bold = True
    p.font.color.rgb = color
    return tb


# ==============================================================================
# SLIDE 1 — COVER: ECOBIN
# ==============================================================================
def build_slide_1(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, C_BG_WARM)
    
    # Left Content Container Card
    add_card(slide, 0.8, 0.65, 7.1, 6.2, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    
    # Text Container
    tb = slide.shapes.add_textbox(Inches(1.15), Inches(0.85), Inches(6.4), Inches(4.80))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    
    # Eyebrow Badge
    p_eye = tf.paragraphs[0]
    p_eye.text = "DECENTRALIZED CLIMATE INFRASTRUCTURE • EXECUTIVE PITCH"
    p_eye.font.name = FONT_HEAD
    p_eye.font.size = Pt(8.5)
    p_eye.font.bold = True
    p_eye.font.color.rgb = C_DARK_GREEN
    p_eye.space_after = Pt(6)
    
    # Brand Wordmark
    p_brand = tf.add_paragraph()
    p_brand.text = "EcoBin"
    p_brand.font.name = FONT_HEAD
    p_brand.font.size = Pt(46)
    p_brand.font.bold = True
    p_brand.font.color.rgb = C_DARK_GREEN
    p_brand.space_after = Pt(2)
    
    # Tagline
    p_tag = tf.add_paragraph()
    p_tag.text = "\"Throw Waste. Create Energy.\""
    p_tag.font.name = FONT_HEAD
    p_tag.font.size = Pt(17)
    p_tag.font.bold = True
    p_tag.font.color.rgb = C_CHARCOAL
    p_tag.space_after = Pt(8)
    
    # Crisp One-sentence Explanation
    p_desc = tf.add_paragraph()
    p_desc.text = "Autonomous edge-AI source-segregation and closed-loop anaerobic bio-digestion converting organic food waste into on-site cooking energy and high-purity industrial recyclables."
    p_desc.font.name = FONT_BODY
    p_desc.font.size = Pt(10)
    p_desc.font.color.rgb = C_SLATE_MID
    p_desc.space_after = Pt(12)
    
    # Core Value Proposition Highlights
    bullets = [
        ("⚡ In-Situ Food Waste Conversion:", " Produces clean cooking biogas (CH4) directly at source, displacing 25–30 commercial LPG cylinders/mo per mess."),
        ("🤖 Machine Vision Segregation (<150ms):", " Embedded ESP32-S3 AI model classifies waste with >98% precision before grease touches recyclables."),
        ("💰 Slashing Municipal Haulage Expense:", " Diverts 60% of bulk hauling volume on-site, saving institutions over Rs. 1,00,000 net monthly cash."),
        ("📜 Regulatory SWM 2016 Immunity:", " Full legal compliance for Bulk Waste Generators (>100 kg/day) avoiding Rs. 50,000 NGT penalty notices.")
    ]
    for b_bold, b_text in bullets:
        p_b = tf.add_paragraph()
        p_b.text = b_bold + b_text
        p_b.font.name = FONT_BODY
        p_b.font.size = Pt(8.5)
        p_b.font.color.rgb = C_CHARCOAL
        p_b.space_after = Pt(4)
    
    # Engineering & R&D Base Box
    p_team_title = tf.add_paragraph()
    p_team_title.text = "SYSTEMS ARCHITECTURE & R&D BASE"
    p_team_title.font.name = FONT_HEAD
    p_team_title.font.size = Pt(8.5)
    p_team_title.font.bold = True
    p_team_title.font.color.rgb = C_SLATE_MID
    p_team_title.space_before = Pt(6)
    p_team_title.space_after = Pt(2)
    
    p_team = tf.add_paragraph()
    p_team.text = "Embedded Edge-AI Vision • Firmware Systems • Anaerobic Bio-Process Engineering\nOperational Living Lab Testbeds Validated Across Higher-Ed Campuses"
    p_team.font.name = FONT_HEAD
    p_team.font.size = Pt(8.8)
    p_team.font.bold = True
    p_team.font.color.rgb = C_CHARCOAL

    # Official Website & Deployment Banner
    add_card(slide, 1.15, 5.75, 6.4, 0.85, bg_color=C_PALE_GREEN, border_color=C_MINT_ACCENT)
    tb_w = slide.shapes.add_textbox(Inches(1.3), Inches(5.80), Inches(6.1), Inches(0.72))
    tf_w = tb_w.text_frame
    tf_w.word_wrap = True
    tf_w.margin_left = tf_w.margin_top = tf_w.margin_right = tf_w.margin_bottom = 0
    pw1 = tf_w.paragraphs[0]
    pw1.text = "OFFICIAL PORTAL & STATUS"
    pw1.font.name = FONT_HEAD
    pw1.font.size = Pt(8)
    pw1.font.bold = True
    pw1.font.color.rgb = C_DARK_GREEN
    pw2 = tf_w.add_paragraph()
    pw2.text = "Official Website: https://echobin.vercel.app  •  Status: Live Operational Testbed"
    pw2.font.name = FONT_HEAD
    pw2.font.size = Pt(9)
    pw2.font.bold = True
    pw2.font.color.rgb = C_CHARCOAL
    
    # Right Column: Dominant Hardware Visual Framing
    add_card(slide, 8.1, 0.65, 4.433, 6.2, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    
    # Product Hardware Image
    img_path = "deck_assets/smart_node.jpg"
    if os.path.exists(img_path):
        slide.shapes.add_picture(img_path, Inches(8.3), Inches(0.90), width=Inches(4.033))
    
    # Hardware Caption Card
    add_card(slide, 8.3, 5.20, 4.033, 1.40, bg_color=C_PALE_GREEN, border_color=C_MINT_ACCENT)
    tb_c = slide.shapes.add_textbox(Inches(8.42), Inches(5.28), Inches(3.8), Inches(1.25))
    tf_c = tb_c.text_frame
    tf_c.word_wrap = True
    tf_c.margin_left = tf_c.margin_top = tf_c.margin_right = tf_c.margin_bottom = 0
    p_c1 = tf_c.paragraphs[0]
    p_c1.text = "ECOBIN AUTONOMOUS SEGREGATION NODE"
    p_c1.font.name = FONT_HEAD
    p_c1.font.size = Pt(8.5)
    p_c1.font.bold = True
    p_c1.font.color.rgb = C_DARK_GREEN
    p_c1.space_after = Pt(2)
    p_c2 = tf_c.add_paragraph()
    p_c2.text = "Smart edge sorting node featuring ESP32-S3 machine vision, multi-sensor dielectric inspection, and high-speed mechanical diverter. Deployed at source to capture organic energy and preserve recyclable value."
    p_c2.font.name = FONT_BODY
    p_c2.font.size = Pt(7.8)
    p_c2.font.color.rgb = C_CHARCOAL


# ==============================================================================
# SLIDE 2 — THE PROBLEM: WASTE CRISIS (LANDFILLS & PITS)
# ==============================================================================
def build_slide_2(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, C_BG_WARM)
    
    add_header(
        slide,
        eyebrow="The Operational Reality & Environmental Crisis",
        title="Unsegregated Waste Drives Crushing Logistics Overhead and Environmental Decay",
        subtitle="Human sorting systematically fails at source, destroying recyclable value and fueling diesel haulage expenditures."
    )
    
    # Left Column: Authentic Problem Visuals (Landfills & Overflowing Pits)
    # Visual 1: Overflowing Community Waste Pit
    add_card(slide, 0.8, 1.55, 5.0, 2.65, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    pit_img = "deck_assets/overflowing_waste_pit.jpg"
    if os.path.exists(pit_img):
        slide.shapes.add_picture(pit_img, Inches(0.9), Inches(1.65), width=Inches(4.8), height=Inches(2.05))
    
    tb_pit = slide.shapes.add_textbox(Inches(0.95), Inches(3.77), Inches(4.7), Inches(0.38))
    tf_pit = tb_pit.text_frame
    tf_pit.word_wrap = True
    tf_pit.margin_left = tf_pit.margin_top = tf_pit.margin_right = tf_pit.margin_bottom = 0
    ppit = tf_pit.paragraphs[0]
    ppit.text = "Overflowing Community Waste Pit: Wet organic scraps mixed with plastics ruin recycling batches."
    ppit.font.name = FONT_BODY
    ppit.font.size = Pt(7.5)
    ppit.font.color.rgb = C_SLATE_MID

    # Visual 2: Mountainous Landfill Dump Crisis
    add_card(slide, 0.8, 4.30, 5.0, 2.60, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    landfill_img = "deck_assets/landfill_crisis.jpg"
    if os.path.exists(landfill_img):
        slide.shapes.add_picture(landfill_img, Inches(0.9), Inches(4.40), width=Inches(4.8), height=Inches(2.0))
    
    tb_land = slide.shapes.add_textbox(Inches(0.95), Inches(6.46), Inches(4.7), Inches(0.4))
    tf_land = tb_land.text_frame
    tf_land.word_wrap = True
    tf_land.margin_left = tf_land.margin_top = tf_land.margin_right = tf_land.margin_bottom = 0
    pland = tf_land.paragraphs[0]
    pland.text = "CPCB Official Report: >150,000 MT MSW discarded daily in India; >50% wet food scraps rotting in open dumps."
    pland.font.name = FONT_HEAD
    pland.font.size = Pt(7.5)
    pland.font.bold = True
    pland.font.color.rgb = C_DARK_GREEN

    # Right Column: 3 Structured Problem Dimension Cards
    dim_cards = [
        ("1. THE CORE PROBLEM: MIXED DISPOSAL & HUMAN SORTING FAILURE",
         "• Manual 2-bin segregation fails >40% of the time across hostels, canteens, and residential towers.\n"
         "• Curry, oil & food moisture permanently destroys 80%+ of paper and plastic recyclable market value.\n"
         "• Stray mixed plastics choke conventional anaerobic digesters and ruin communal composting batches.",
         "🚨 Critical Breakdown: 40%+ Human Error Rate Ruins Recyclable Streams",
         C_RED),
        ("2. WHY IT MATTERS: DIESEL HAULAGE OVERHEAD & MUNICIPAL EXPENSE",
         "• Cities and institutions squander 50% to 70% of waste management budgets simply hauling water.\n"
         "• Food waste comprises 70% water weight; diesel trucks burn fuel transporting heavy moisture 30+ km away.\n"
         "• Mandatory Solid Waste Management Rules 2016 impose up to Rs. 50,000 NGT fines for non-compliance.",
         "💸 Crushing Expense: 50%–70% Budget Squandered on Diesel Fleet Logistics",
         C_AMBER),
        ("3. WHO IS AFFECTED: CRITICAL ECONOMIC STAKEHOLDERS",
         "• University Campuses & Hostels: 150–400 kg/day plate waste; paying Rs. 45k–Rs. 80k/mo in hauling bills.\n"
         "• Gated Societies / RWAs: Paying Rs. 60k–Rs. 1.5L/mo while dealing with stench, flies, and penalty notices.\n"
         "• Municipalities & ULBs: Landfills overflowing; soaring transport, diesel, and tipping expenditures.",
         "🏛️ Direct Financial Liability Across 120,000+ Bulk Waste Generators",
         C_DARK_GREEN),
    ]
    
    for i, (head, body, badge, accent_col) in enumerate(dim_cards):
        y = 1.55 + i * 1.35
        add_card(slide, 6.0, y, 6.533, 1.28, bg_color=C_CARD_WHITE, border_color=C_BORDER)
        
        # Left Accent Stripe
        stripe = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(6.0), Inches(y), Inches(0.12), Inches(1.28))
        stripe.fill.solid()
        stripe.fill.fore_color.rgb = accent_col
        stripe.line.fill.background()
        
        tb_d = slide.shapes.add_textbox(Inches(6.22), Inches(y + 0.06), Inches(6.2), Inches(1.18))
        tf_d = tb_d.text_frame
        tf_d.word_wrap = True
        tf_d.margin_left = tf_d.margin_top = tf_d.margin_right = tf_d.margin_bottom = 0
        
        pd1 = tf_d.paragraphs[0]
        pd1.text = head
        pd1.font.name = FONT_HEAD
        pd1.font.size = Pt(8.5)
        pd1.font.bold = True
        pd1.font.color.rgb = accent_col
        pd1.space_after = Pt(2)
        
        pd2 = tf_d.add_paragraph()
        pd2.text = body
        pd2.font.name = FONT_BODY
        pd2.font.size = Pt(7.3)
        pd2.font.color.rgb = C_CHARCOAL
        pd2.space_after = Pt(2)
        
        pd3 = tf_d.add_paragraph()
        pd3.text = badge
        pd3.font.name = FONT_HEAD
        pd3.font.size = Pt(7.4)
        pd3.font.bold = True
        pd3.font.color.rgb = accent_col

    # Bottom Flow Diagram: The Vicious Waste Cycle
    add_card(slide, 6.0, 5.70, 6.533, 1.20, bg_color=C_CARD_MUTED, border_color=C_BORDER)
    
    stages = [
        ("MIXED DISPOSAL", "Unsegregated food\n& plastic mixed", "0% Automation", C_RED),
        ("HAULAGE BURDEN", "Rs. 60k–1.5L/mo to\nhaul 70% water wt", "Sunk OpEx", C_AMBER),
        ("LANDFILL CRISIS", "Rotting mass emits\nCH4 & foul leachate", "Methane Drain", C_RED),
        ("REGULATORY RISK", "Rs. 50k NGT fines\nunder SWM 2016", "Legal Threat", C_CHARCOAL)
    ]
    
    box_w = 1.38
    box_gap = 0.24
    start_x = 6.12
    
    for i, (title, desc, tag, color) in enumerate(stages):
        x = start_x + i * (box_w + box_gap)
        add_card(slide, x, 5.78, box_w, 1.04, bg_color=C_CARD_WHITE, border_color=C_BORDER)
        
        tb_box = slide.shapes.add_textbox(Inches(x + 0.06), Inches(5.82), Inches(box_w - 0.12), Inches(0.96))
        tf_b = tb_box.text_frame
        tf_b.word_wrap = True
        tf_b.margin_left = tf_b.margin_top = tf_b.margin_right = tf_b.margin_bottom = 0
        
        pb1 = tf_b.paragraphs[0]
        pb1.text = title
        pb1.font.name = FONT_HEAD
        pb1.font.size = Pt(7.8)
        pb1.font.bold = True
        pb1.font.color.rgb = color
        
        pb2 = tf_b.add_paragraph()
        pb2.text = desc
        pb2.font.name = FONT_BODY
        pb2.font.size = Pt(7.2)
        pb2.font.color.rgb = C_CHARCOAL
        pb2.space_after = Pt(2)

        pb3 = tf_b.add_paragraph()
        pb3.text = f"[{tag}]"
        pb3.font.name = FONT_HEAD
        pb3.font.size = Pt(6.8)
        pb3.font.bold = True
        pb3.font.color.rgb = color
        
        if i < 3:
            add_arrow_badge(slide, x + box_w + 0.04, 6.12, width=0.18, height=0.3, text="➔", color=C_BORDER, size=11)


# ==============================================================================
# SLIDE 3 — THE CURRENT SYSTEM: HOW CUSTOMERS HANDLE IT & MUNICIPAL EXPENSES
# ==============================================================================
def build_slide_3(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, C_BG_WARM)
    
    add_header(
        slide,
        eyebrow="Status Quo Breakdown & Municipal Haulage Expense",
        title="How Customers Solve Waste Today: Heavy Haulage Expense & Sunk OpEx",
        subtitle="A centralized linear pipeline where customers pay twice: once to haul wet garbage away, and again to buy cooking fuel."
    )
    
    # Top Half: Current-State Workflow Diagram (4 stages with Rich Details & Connected Workflow Flow)
    add_card(slide, 0.8, 1.55, 11.733, 2.18, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    
    steps = [
        ("STAGE 01", "Waste Generation", "Bulk Mess & Dining",
         "• 150–500 kg mixed wet scraps daily per campus.\n"
         "• Food scraps dumped directly with cutlery & foil.\n"
         "• Moisture immediately ruins dry paper & plastic.\n"
         "• Zero automated segregation at disposal point.",
         "⚠️ 0% In-Situ Automation", C_AMBER),
        ("STAGE 02", "2-Bin Illusion", "Manual Colored Bins",
         "• Human sorting discipline fails (>40% error rate).\n"
         "• Single oily plate ruins 50 kg of clean paper recyclables.\n"
         "• Mess staff forced to manually hand-pick dirty bins.\n"
         "• Waste contractors reject contaminated loads.",
         "⚠️ >40% Sorting Failure Rate", C_RED),
        ("STAGE 03", "Private Hauling", "Contractor Haulage",
         "• Diesel trucks transport 70% water weight 30+ km.\n"
         "• Heavy recurring monthly drain on campus budgets.\n"
         "• Constant diesel price inflation passed to institution.\n"
         "• Foul odor, flies, and logistical friction at bays.",
         "💸 Rs. 50k–1.5L / Month Sunk", C_RED),
        ("STAGE 04", "Landfills & Fines", "End of Linear Chain",
         "• Mixed waste dumped in overflowing municipal pits.\n"
         "• Emits fugitive methane (CH4) & toxic black leachate.\n"
         "• Up to Rs. 50,000 NGT fines under SWM Rules 2016.\n"
         "• Negative PR & adverse NAAC Green audit remarks.",
         "🚨 Rs. 50,000 Legal NGT Fines", C_CHARCOAL),
    ]
    
    box_w = 2.45
    box_gap = 0.4
    start_x = 1.05
    
    for i, (num_pill, sub, tag, body, badge, badge_color) in enumerate(steps):
        x = start_x + i * (box_w + box_gap)
        add_card(slide, x, 1.68, box_w, 1.95, bg_color=C_CARD_MUTED, border_color=C_BORDER)
        
        # Top banner on step card
        top_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x), Inches(1.68), Inches(box_w), Inches(0.06))
        top_bar.fill.solid()
        top_bar.fill.fore_color.rgb = badge_color
        top_bar.line.fill.background()

        tb_st = slide.shapes.add_textbox(Inches(x + 0.12), Inches(1.78), Inches(box_w - 0.24), Inches(1.82))
        tf_s = tb_st.text_frame
        tf_s.word_wrap = True
        tf_s.margin_left = tf_s.margin_top = tf_s.margin_right = tf_s.margin_bottom = 0
        
        p1 = tf_s.paragraphs[0]
        p1.text = f"{num_pill} • {sub.upper()}"
        p1.font.name = FONT_HEAD
        p1.font.size = Pt(8)
        p1.font.bold = True
        p1.font.color.rgb = C_DARK_GREEN
        
        p2 = tf_s.add_paragraph()
        p2.text = tag
        p2.font.name = FONT_HEAD
        p2.font.size = Pt(8.8)
        p2.font.bold = True
        p2.font.color.rgb = C_CHARCOAL
        p2.space_after = Pt(2)
        
        p3 = tf_s.add_paragraph()
        p3.text = body
        p3.font.name = FONT_BODY
        p3.font.size = Pt(7.1)
        p3.font.color.rgb = C_SLATE_MID
        p3.space_after = Pt(3)
        
        p4 = tf_s.add_paragraph()
        p4.text = badge
        p4.font.name = FONT_HEAD
        p4.font.size = Pt(7.4)
        p4.font.bold = True
        p4.font.color.rgb = badge_color
        
        if i < 3:
            add_arrow_badge(slide, x + box_w + 0.08, 2.50, width=0.24, height=0.35, text="➔", color=C_DARK_GREEN, size=15)
            
    # Bottom Left: Photographic Evidence of Municipal Waste Logistics
    add_card(slide, 0.8, 3.88, 4.8, 3.02, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    truck_img = "deck_assets/urban_landfill_dump.jpg"
    if os.path.exists(truck_img):
        slide.shapes.add_picture(truck_img, Inches(0.95), Inches(3.98), width=Inches(4.5), height=Inches(2.30))
    
    tb_icap = slide.shapes.add_textbox(Inches(0.95), Inches(6.36), Inches(4.5), Inches(0.48))
    tf_ic = tb_icap.text_frame
    tf_ic.word_wrap = True
    tf_ic.margin_left = tf_ic.margin_top = tf_ic.margin_right = tf_ic.margin_bottom = 0
    pic1 = tf_ic.paragraphs[0]
    pic1.text = "Municipal collection fleet & open dumpyards: Heavy diesel consumption, recurring transport invoices, and soaring tipping fees."
    pic1.font.name = FONT_BODY
    pic1.font.size = Pt(7.5)
    pic1.font.color.rgb = C_SLATE_MID

    # Bottom Right: Real Operational Expense Breakdown (4 Structured Cards filling height cleanly)
    add_card(slide, 5.8, 3.88, 6.733, 3.02, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    
    tb_c = slide.shapes.add_textbox(Inches(6.0), Inches(3.98), Inches(6.333), Inches(0.28))
    tf_c = tb_c.text_frame
    tf_c.margin_left = tf_c.margin_top = tf_c.margin_right = tf_c.margin_bottom = 0
    p_exp_t = tf_c.paragraphs[0]
    p_exp_t.text = "WHERE EXISTING BUDGETS ARE LOST (THE DOUBLE-PAYMENT DILEMMA):"
    p_exp_t.font.name = FONT_HEAD
    p_exp_t.font.size = Pt(9)
    p_exp_t.font.bold = True
    p_exp_t.font.color.rgb = C_RED
    
    drain_items = [
        ("Private Hauling Contracts", "Rs. 50,000–1,50,000/mo spent paying contractors to haul 70% water-weight scrap.", "💸 Sunk Monthly OpEx Drain", C_RED),
        ("Commercial LPG Gas Bills", "Hostel kitchens simultaneously spend Rs. 50,000–90,000/mo purchasing 25–40 LPG cylinders.", "🔥 Paying Twice for Energy", C_AMBER),
        ("The 'Compost Trap'", "Open campus compost pits turn anaerobic during monsoon rains; breed flies and get rejected.", "🌧️ Weather-Dependent Failure", C_CHARCOAL),
        ("Traditional Biogas Crashes", "Conventional digesters sour and die within weeks due to lack of automated pH telemetry.", "📉 Biological Acid Souring Risk", C_RED),
    ]
    
    for i, (title, desc, badge, bcol) in enumerate(drain_items):
        y = 4.30 + i * 0.45
        tb_row = slide.shapes.add_textbox(Inches(6.0), Inches(y), Inches(6.333), Inches(0.42))
        tf_r = tb_row.text_frame
        tf_r.word_wrap = True
        tf_r.margin_left = tf_r.margin_top = tf_r.margin_right = tf_r.margin_bottom = 0
        pr1 = tf_r.paragraphs[0]
        pr1.text = f"• {title}: {desc} [{badge}]"
        pr1.font.name = FONT_BODY
        pr1.font.size = Pt(7.6)
        pr1.font.color.rgb = C_CHARCOAL
    
    # Strategic Opportunity Banner
    add_card(slide, 6.0, 6.16, 6.333, 0.64, bg_color=C_PALE_GREEN, border_color=C_MINT_ACCENT)
    tb_tr = slide.shapes.add_textbox(Inches(6.12), Inches(6.22), Inches(6.1), Inches(0.52))
    tf_tr = tb_tr.text_frame
    tf_tr.word_wrap = True
    tf_tr.margin_left = tf_tr.margin_top = tf_tr.margin_right = tf_tr.margin_bottom = 0
    ptr = tf_tr.paragraphs[0]
    ptr.text = "THE STRATEGIC OPPORTUNITY: Eliminate truck haulage completely. Convert daily food scraps into on-site cooking fuel and high-purity industrial recyclables right at the source."
    ptr.font.name = FONT_HEAD
    ptr.font.size = Pt(8)
    ptr.font.bold = True
    ptr.font.color.rgb = C_DARK_GREEN


# ==============================================================================
# SLIDE 4 — WHAT WE DO & TO WHOM WE ARE TARGETING
# ==============================================================================
def build_slide_4(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, C_BG_WARM)
    
    add_header(
        slide,
        eyebrow="The EcoBin Business Proposition",
        title="What We Do & Who We Target: Autonomous Decentralized Bio-Utility",
        subtitle="Transforming bulk waste generators from passive fee-payers into decentralized clean energy utilities."
    )
    
    # Left Column: WHAT WE DO + 3 TARGET CUSTOMER PERSONAS (Height: 5.35)
    add_card(slide, 0.8, 1.55, 5.7, 5.35, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    
    # Value Proposition Callout Box
    add_card(slide, 1.0, 1.70, 5.3, 0.95, bg_color=C_PALE_GREEN, border_color=C_MINT_ACCENT)
    tb_vp = slide.shapes.add_textbox(Inches(1.12), Inches(1.76), Inches(5.06), Inches(0.82))
    tf_vp = tb_vp.text_frame
    tf_vp.word_wrap = True
    tf_vp.margin_left = tf_vp.margin_top = tf_vp.margin_right = tf_vp.margin_bottom = 0
    pv1 = tf_vp.paragraphs[0]
    pv1.text = "WHAT ECOBIN DOES"
    pv1.font.name = FONT_HEAD
    pv1.font.size = Pt(8.5)
    pv1.font.bold = True
    pv1.font.color.rgb = C_DARK_GREEN
    pv2 = tf_vp.add_paragraph()
    pv2.text = "EcoBin deploys autonomous edge-AI source-segregation coupled with closed-loop anaerobic biodigestion, converting daily food waste directly into free cooking fuel and pristine recyclables right on campus."
    pv2.font.name = FONT_BODY
    pv2.font.size = Pt(8)
    pv2.font.color.rgb = C_CHARCOAL
    
    # Section Header: Who We Are Targeting
    tb_th = slide.shapes.add_textbox(Inches(1.0), Inches(2.74), Inches(5.3), Inches(0.26))
    tf_th = tb_th.text_frame
    tf_th.margin_left = tf_th.margin_top = tf_th.margin_right = tf_th.margin_bottom = 0
    pth = tf_th.paragraphs[0]
    pth.text = "WHO WE ARE TARGETING (TARGET CUSTOMER SEGMENTS)"
    pth.font.name = FONT_HEAD
    pth.font.size = Pt(8.5)
    pth.font.bold = True
    pth.font.color.rgb = C_SLATE_MID
    
    # 3 Structured Customer Cards (Filling height cleanly with 5 structured lines)
    customers = [
        ("1. BEACHHEAD: UNIVERSITY CAMPUSES & HOSTELS", "Institutional Living Lab",
         "• Scale: 1,000–3,000 students generating 150–400 kg/day bulk mess plate waste.\n"
         "• Economic Buyer: Campus Director / Dean (single-point signoff, NAAC A++ Green focus).\n"
         "• Economic Return: Displaces 25–30 commercial LPG cylinders/mo; eliminates hauling fees.\n"
         "• Conversion Trigger: Mandatory SWM 2016 audit compliance & net-zero campus branding.\n"
         "• Active Proof: 250 kg/day canteen waste converted to energy at campus pilot testbed.",
         C_CARD_MUTED, C_DARK_GREEN),
        ("2. SCALED EXPANSION: GATED RESIDENTIAL SOCIETIES", "RWAs & HOAs",
         "• Scale: 200–1,200+ apartments with dedicated monthly maintenance budgets.\n"
         "• Economic Buyer: RWA Management Committee (faces Rs. 50k SWM compliance notices).\n"
         "• Economic Return: Eliminates odor and fly infestations; Rs. 65k–1L/mo net cash savings.\n"
         "• Conversion Trigger: Subsidized solar/biogas utility incentives and clean waste bays.\n"
         "• RWA Economics: Zero resident levy; funded through existing maintenance reserves.",
         C_CARD_MUTED, C_MED_GREEN),
        ("3. ENTERPRISE: IT PARKS & CORPORATE TECH HUBS", "Commercial Hubs",
         "• Scale: 3,000–10,000 employees; massive cafeteria food load with strict ESG reporting.\n"
         "• Economic Buyer: VP Corporate Services / ESG Directors (Net-Zero Scope-1 mandates).\n"
         "• Operational Beneficiaries: Canteen vendors (free cooking fuel) & grounds staff (fertilizer).\n"
         "• Conversion Trigger: Corporate ESG reporting (SEBI BRSR) and sustainability ratings.\n"
         "• Operational Moat: Eliminates foul loading dock odor and landfill carting friction.",
         C_CARD_MUTED, C_CHARCOAL),
    ]
    
    for i, (title, badge, body, bg_col, col) in enumerate(customers):
        y = 3.02 + i * 1.26
        add_card(slide, 1.0, y, 5.3, 1.20, bg_color=bg_col, border_color=C_BORDER)
        tb_c = slide.shapes.add_textbox(Inches(1.12), Inches(y + 0.05), Inches(5.06), Inches(1.10))
        tf_c = tb_c.text_frame
        tf_c.word_wrap = True
        tf_c.margin_left = tf_c.margin_top = tf_c.margin_right = tf_c.margin_bottom = 0
        
        pc1 = tf_c.paragraphs[0]
        pc1.text = f"{title} [{badge}]"
        pc1.font.name = FONT_HEAD
        pc1.font.size = Pt(8)
        pc1.font.bold = True
        pc1.font.color.rgb = col
        pc1.space_after = Pt(2)
        
        pc2 = tf_c.add_paragraph()
        pc2.text = body
        pc2.font.name = FONT_BODY
        pc2.font.size = Pt(7.0)
        pc2.font.color.rgb = C_CHARCOAL

    # Right Column: Core Engineering Innovations (Top) + Diagrammatic Before vs After (Bottom)
    add_card(slide, 6.7, 1.55, 5.833, 5.35, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    
    tb_r = slide.shapes.add_textbox(Inches(6.9), Inches(1.70), Inches(5.4), Inches(0.26))
    tf_r = tb_r.text_frame
    tf_r.margin_left = tf_r.margin_top = tf_r.margin_right = tf_r.margin_bottom = 0
    pr_t = tf_r.paragraphs[0]
    pr_t.text = "CORE ENGINEERING INNOVATIONS"
    pr_t.font.name = FONT_HEAD
    pr_t.font.size = Pt(9)
    pr_t.font.bold = True
    pr_t.font.color.rgb = C_DARK_GREEN
    
    innovations = [
        ("ESP32-S3 Edge-AI Vision (<150ms)", "YOLOv8 quantized model & dielectric sensors classify waste before moisture spreads.", "100% Recyclable Value Preserved", C_BLUE_PIPE),
        ("In-Situ Micro-Slurry Maceration", "Stainless-steel blades shear food waste into a uniform <2mm pumpable fluid slurry.", "60% Hauling Volume Diverted On-Site", C_DARK_GREEN),
        ("Active Anti-Souring Bio-Telemetry", "Slurry pH sensor automatically doses NaHCO3 buffer to stabilize methanogens.", "Continuous Biogas Yield (Zero Souring)", C_MED_GREEN),
        ("Direct Closed-Loop Fuel Routing", "Purified methane (65% CH4) piped directly to kitchen cooking stoves.", "Displaces 25–30 Commercial LPG Cylinders/mo", C_AMBER)
    ]
    
    for i, (cap, desc, outcome, col) in enumerate(innovations):
        y = 2.00 + i * 0.72
        add_card(slide, 6.9, y, 5.433, 0.66, bg_color=C_CARD_MUTED, border_color=C_BORDER)
        tb_in = slide.shapes.add_textbox(Inches(7.02), Inches(y + 0.05), Inches(5.2), Inches(0.56))
        tf_in = tb_in.text_frame
        tf_in.word_wrap = True
        tf_in.margin_left = tf_in.margin_top = tf_in.margin_right = tf_in.margin_bottom = 0
        
        pi1 = tf_in.paragraphs[0]
        pi1.text = f"• {cap} ➔ {outcome}"
        pi1.font.name = FONT_HEAD
        pi1.font.size = Pt(8)
        pi1.font.bold = True
        pi1.font.color.rgb = col
        
        pi2 = tf_in.add_paragraph()
        pi2.text = f"  {desc}"
        pi2.font.name = FONT_BODY
        pi2.font.size = Pt(7.1)
        pi2.font.color.rgb = C_SLATE_MID

    # Bottom Section: Diagrammatic Before vs After Process Workflow
    add_card(slide, 6.9, 4.96, 5.433, 1.82, bg_color=C_CARD_MUTED, border_color=C_BORDER)
    
    tb_comp = slide.shapes.add_textbox(Inches(7.05), Inches(5.02), Inches(5.15), Inches(1.70))
    tf_cp = tb_comp.text_frame
    tf_cp.word_wrap = True
    tf_cp.margin_left = tf_cp.margin_top = tf_cp.margin_right = tf_cp.margin_bottom = 0
    
    pcp_h = tf_cp.paragraphs[0]
    pcp_h.text = "OPERATIONAL WORKFLOW COMPARISON (BEFORE VS. AFTER)"
    pcp_h.font.name = FONT_HEAD
    pcp_h.font.size = Pt(8.5)
    pcp_h.font.bold = True
    pcp_h.font.color.rgb = C_CHARCOAL
    pcp_h.space_after = Pt(4)
    
    # ❌ Before strip
    pcp_b_t = tf_cp.add_paragraph()
    pcp_b_t.text = "❌ BEFORE: Conventional Linear Haulage (Sunk Cost Drain)"
    pcp_b_t.font.name = FONT_HEAD
    pcp_b_t.font.size = Pt(7.5)
    pcp_b_t.font.bold = True
    pcp_b_t.font.color.rgb = C_RED
    
    pcp_b_f = tf_cp.add_paragraph()
    pcp_b_f.text = "Mixed Waste ➔ 40%+ Human Error ➔ Contaminated Bins ➔ Rs. 80k Diesel Truck Haul ➔ Landfill Methane & Fines"
    pcp_b_f.font.name = FONT_BODY
    pcp_b_f.font.size = Pt(7.2)
    pcp_b_f.font.color.rgb = C_CHARCOAL
    pcp_b_f.space_after = Pt(5)

    # ✅ After strip
    pcp_a_t = tf_cp.add_paragraph()
    pcp_a_t.text = "✅ AFTER: EcoBin Autonomous Closed-Loop (Positive Cashflow)"
    pcp_a_t.font.name = FONT_HEAD
    pcp_a_t.font.size = Pt(7.5)
    pcp_a_t.font.bold = True
    pcp_a_t.font.color.rgb = C_DARK_GREEN
    
    pcp_a_f = tf_cp.add_paragraph()
    pcp_a_f.text = "Single Mixed Drop ➔ <150ms Edge-AI Vision ➔ <2mm Slurry Maceration ➔ Mesophilic Digestion ➔ Free Cooking Gas + Clean Baled Recyclables"
    pcp_a_f.font.name = FONT_BODY
    pcp_a_f.font.size = Pt(7.2)
    pcp_a_f.font.color.rgb = C_CHARCOAL


# ==============================================================================
# SLIDE 5 — STRUCTURED PRODUCT MODEL & BUSINESS MODEL (DIAGRAMMATIC PIPELINE)
# ==============================================================================
def build_slide_5(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, C_BG_WARM)
    
    add_header(
        slide,
        eyebrow="System & Commercial Architecture",
        title="Structured Product & Business Model: Closed-Loop Utility Pipeline",
        subtitle="Both the closed-loop waste pipeline and commercial value exchange structured in clean diagrammatic form."
    )
    
    # Left Column: Authentic Architectural Closed-Loop Schematic
    add_card(slide, 0.8, 1.55, 4.1, 5.35, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    img_path = "deck_assets/campus_architecture.jpg"
    if os.path.exists(img_path):
        slide.shapes.add_picture(img_path, Inches(0.9), Inches(1.65), width=Inches(3.9), height=Inches(4.55))
    
    tb_acap = slide.shapes.add_textbox(Inches(0.95), Inches(6.32), Inches(3.8), Inches(0.48))
    tf_ac = tb_acap.text_frame
    tf_ac.word_wrap = True
    tf_ac.margin_left = tf_ac.margin_top = tf_ac.margin_right = tf_ac.margin_bottom = 0
    pac = tf_ac.paragraphs[0]
    pac.text = "Campus Closed-Loop Architecture: Tower segregation, dual-pipe network, and central utility bio-digester."
    pac.font.name = FONT_BODY
    pac.font.size = Pt(7.5)
    pac.font.color.rgb = C_DARK_GREEN
    pac.font.bold = True

    # Right Column Top: Part A — Operating Product Model Workflow (Richly Detailed Diagrammatic Pipeline)
    add_card(slide, 5.1, 1.55, 7.433, 2.65, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    tb_pm = slide.shapes.add_textbox(Inches(5.3), Inches(1.65), Inches(7.0), Inches(0.26))
    tf_pm = tb_pm.text_frame
    tf_pm.margin_left = tf_pm.margin_top = tf_pm.margin_right = tf_pm.margin_bottom = 0
    ppm = tf_pm.paragraphs[0]
    ppm.text = "A. PRODUCT OPERATING MODEL: CLOSED-LOOP UTILITY PIPELINE"
    ppm.font.name = FONT_HEAD
    ppm.font.size = Pt(8.8)
    ppm.font.bold = True
    ppm.font.color.rgb = C_DARK_GREEN
    
    # 4 Product Stages
    p_stages = [
        ("STEP 01", "Smart Ingestion", "Floors & Dining Mess",
         "• Users drop mixed waste with zero sorting effort.\n"
         "• Multi-sensor dielectric ring senses moisture content.\n"
         "• Real-time edge inference triggers diverter gate.\n"
         "• Hardware: ESP32-S3 + OV2640 Optical Sensor.",
         "⚡ <150ms Instant Sort", C_CHARCOAL),
        ("STEP 02", "Dual-Pipe Split", "Machine Vision Chute",
         "• YOLOv8 classifies dry packaging vs organic food.\n"
         "• High-speed motorized flapper diverts dry to blue chute.\n"
         "• Wet organics directed to low-friction green chute.\n"
         "• Hardware: Pneumatic 12V High-Torque Servo.",
         "🔵 Dry | 🟢 Wet Slurry", C_BLUE_PIPE),
        ("STEP 03", "Bio-Digestion", "Mesophilic Dome (37°C)",
         "• Stainless macerator shears organic food to <2mm.\n"
         "• Continuous telemetry monitors acidity and VFA levels.\n"
         "• Auto-doses NaHCO3 buffer to prevent souring crashes.\n"
         "• Hardware: 316 Stainless Steel Macerator Mill.",
         "🧪 Active Anti-Souring", C_MED_GREEN),
        ("STEP 04", "Direct Fuel", "Kitchen Cooking Gas",
         "• Purified methane (65% CH4) piped directly to stoves.\n"
         "• Displaces 25–30 commercial LPG cylinders every month.\n"
         "• Mineral-rich organic bio-fertilizer bottled on-site.\n"
         "• Hardware: Direct Kitchen Gas Stove Manifold.",
         "🔥 28 LPG Cylinders/mo", C_AMBER)
    ]
    
    for i, (st_num, st_t, st_sub, st_d, st_chip, st_c) in enumerate(p_stages):
        x = 5.3 + i * 1.74
        add_card(slide, x, 1.95, 1.66, 2.16, bg_color=C_CARD_MUTED, border_color=C_BORDER)
        
        # Step top accent stripe
        s_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x), Inches(1.95), Inches(1.66), Inches(0.05))
        s_bar.fill.solid()
        s_bar.fill.fore_color.rgb = st_c
        s_bar.line.fill.background()

        tb_ps = slide.shapes.add_textbox(Inches(x + 0.08), Inches(2.03), Inches(1.50), Inches(2.04))
        tf_ps = tb_ps.text_frame
        tf_ps.word_wrap = True
        tf_ps.margin_left = tf_ps.margin_top = tf_ps.margin_right = tf_ps.margin_bottom = 0
        
        p1 = tf_ps.paragraphs[0]
        p1.text = f"{st_num} • {st_t.upper()}"
        p1.font.name = FONT_HEAD
        p1.font.size = Pt(7.8)
        p1.font.bold = True
        p1.font.color.rgb = st_c
        
        p_sub = tf_ps.add_paragraph()
        p_sub.text = st_sub
        p_sub.font.name = FONT_HEAD
        p_sub.font.size = Pt(7.5)
        p_sub.font.bold = True
        p_sub.font.color.rgb = C_CHARCOAL
        p_sub.space_after = Pt(2)
        
        p2 = tf_ps.add_paragraph()
        p2.text = st_d
        p2.font.name = FONT_BODY
        p2.font.size = Pt(6.9)
        p2.font.color.rgb = C_SLATE_MID
        p2.space_after = Pt(3)
        
        p3 = tf_ps.add_paragraph()
        p3.text = st_chip
        p3.font.name = FONT_HEAD
        p3.font.size = Pt(7.2)
        p3.font.bold = True
        p3.font.color.rgb = st_c
        
        if i < 3:
            add_arrow_badge(slide, x + 1.66, 2.85, width=0.10, height=0.3, text="➔", color=C_DARK_GREEN, size=13)

    # Right Column Bottom: Part B — Commercial Business Model (Diagrammatic Value Exchange)
    add_card(slide, 5.1, 4.30, 7.433, 2.60, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    tb_bm = slide.shapes.add_textbox(Inches(5.3), Inches(4.38), Inches(7.0), Inches(0.26))
    tf_bm = tb_bm.text_frame
    tf_bm.margin_left = tf_bm.margin_top = tf_bm.margin_right = tf_bm.margin_bottom = 0
    pbm = tf_bm.paragraphs[0]
    pbm.text = "B. BUSINESS COMMERCIAL MODEL: WHO PAYS, WHAT THEY GET, AND RECURRING CASH FLOW"
    pbm.font.name = FONT_HEAD
    pbm.font.size = Pt(8.8)
    pbm.font.bold = True
    pbm.font.color.rgb = C_DARK_GREEN
    
    b_cards = [
        ("WHO PAYS ECOBIN?", "Direct B2B Buyers",
         "• Institutional Campuses (Universities & Hostels)\n"
         "• Gated Societies (RWAs & Large HOAs)\n"
         "• Facility Management Operators (JLL, CBRE)\n"
         "• Single economic decision-makers managing centralized utility and maintenance funds.\n"
         "• Direct contract signoff eliminates multi-tier procurement delays.",
         "🏛️ Institutional Decision-Makers", C_CHARCOAL),
        ("WHAT DO THEY PAY FOR?", "Dual Revenue Mechanics",
         "• Hardware CapEx: Modular Hubs Rs. 3L–8L (scaled to daily load)\n"
         "• Monthly AMC Retainer: Rs. 5,000–10,000/mo (consumables, buffers & telemetry)\n"
         "• Shared Offtake: Monetizing dry baled recyclables\n"
         "• Displaces commercial LPG and slashes private hauling bills by 50% to 60%.\n"
         "• Immediate positive cashflow from Month 1 of operation.",
         "💰 Displaces Rs. 1L+/mo Sunk OpEx", C_MED_GREEN),
        ("PAYBACK & UNIT RETURNS", "Compelling Unit Returns",
         "• Campuses recover capital in 16–20 months\n"
         "• Societies recover capital in 18–24 months\n"
         "• EcoBin gross margin: 40% CapEx, 65% AMC\n"
         "• Daily embedded mess utility ensures near-zero churn and locked-in maintenance retainers.\n"
         "• High customer lifetime value with sticky annual renewals.",
         "📈 16–20 Month Full Payback", C_AMBER)
    ]
    
    for i, (bc_t, bc_sub, bc_b, bc_chip, bc_c) in enumerate(b_cards):
        x = 5.3 + i * 2.35
        add_card(slide, x, 4.68, 2.25, 2.12, bg_color=C_CARD_MUTED, border_color=C_BORDER)
        
        # Card top accent stripe
        b_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x), Inches(4.68), Inches(2.25), Inches(0.05))
        b_bar.fill.solid()
        b_bar.fill.fore_color.rgb = bc_c
        b_bar.line.fill.background()

        tb_bc = slide.shapes.add_textbox(Inches(x + 0.1), Inches(4.76), Inches(2.05), Inches(2.00))
        tf_bc = tb_bc.text_frame
        tf_bc.word_wrap = True
        tf_bc.margin_left = tf_bc.margin_top = tf_bc.margin_right = tf_bc.margin_bottom = 0
        
        pb1 = tf_bc.paragraphs[0]
        pb1.text = bc_t
        pb1.font.name = FONT_HEAD
        pb1.font.size = Pt(8)
        pb1.font.bold = True
        pb1.font.color.rgb = bc_c
        
        pbs = tf_bc.add_paragraph()
        pbs.text = bc_sub
        pbs.font.name = FONT_HEAD
        pbs.font.size = Pt(7.5)
        pbs.font.bold = True
        pbs.font.color.rgb = C_CHARCOAL
        pbs.space_after = Pt(2)
        
        pb2 = tf_bc.add_paragraph()
        pb2.text = bc_b
        pb2.font.name = FONT_BODY
        pb2.font.size = Pt(7.0)
        pb2.font.color.rgb = C_CHARCOAL
        pb2.space_after = Pt(3)
        
        pb4 = tf_bc.add_paragraph()
        pb4.text = bc_chip
        pb4.font.name = FONT_HEAD
        pb4.font.size = Pt(7.2)
        pb4.font.bold = True
        pb4.font.color.rgb = bc_c


# ==============================================================================
# SLIDE 6 — MARKET OPPORTUNITY: TAM, SAM, SOM & GTM ROADMAP
# ==============================================================================
def build_slide_6(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, C_BG_WARM)
    
    add_header(
        slide,
        eyebrow="Market Opportunity & Execution Sequence",
        title="Rs. 14,200 Cr Addressable Market Driven by SWM 2016 Enforcement",
        subtitle="A bottom-up market sizing combined with a disciplined, pilot-led customer acquisition roadmap."
    )
    
    # Left Column: Concentric / Nested TAM / SAM / SOM Graphic Card
    add_card(slide, 0.8, 1.55, 5.7, 5.35, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    tb_m = slide.shapes.add_textbox(Inches(1.0), Inches(1.70), Inches(5.3), Inches(0.32))
    tf_m = tb_m.text_frame
    tf_m.margin_left = tf_m.margin_top = tf_m.margin_right = tf_m.margin_bottom = 0
    
    pm_t = tf_m.paragraphs[0]
    pm_t.text = "CONCENTRIC MARKET SIZING (BOTTOM-UP CALCULATION)"
    pm_t.font.name = FONT_HEAD
    pm_t.font.size = Pt(9)
    pm_t.font.bold = True
    pm_t.font.color.rgb = C_DARK_GREEN
    
    market_tiers = [
        ("TAM — TOTAL ADDRESSABLE MARKET: Rs. 14,200 Cr ($1.7B)",
         "• Target Base: All ~120,000 Bulk Waste Generators (>100 kg/day) across Urban India mandated by Solid Waste Management Rules 2016 to treat organic wet waste on-site.\n"
         "• Unit Value: 120,000 BWGs × Rs. 1.18 Lakhs annualized blended hardware amortized & recurring maintenance contract value.\n"
         "• Market Drivers: National landfill dumping bans, rising diesel haulage surcharges, and escalating NGT legal penalties.",
         "🌐 120,000 Mandated Indian Bulk Generators", C_CARD_MUTED, C_CHARCOAL),
        ("SAM — SERVICEABLE AVAILABLE MARKET: Rs. 3,200 Cr ($385M)",
         "• Target Base: 25,000 high-density gated residential societies (500+ flats) and accredited university campuses with residential hostels in top 8 Tier-1 urban clusters.\n"
         "• Unit Value: 25,000 target institutional sites × Rs. 1.28 Lakhs blended annual contract value.\n"
         "• Market Drivers: Strict municipal audit enforcement in Delhi-NCR, Bengaluru, Mumbai, and Hyderabad.",
         "🎯 25,000 High-Density Tier-1 Campuses & Societies", C_PALE_GREEN, C_DARK_GREEN),
        ("SOM — SERVICEABLE OBTAINABLE MARKET (3-YEAR): Rs. 95 Cr ($11.5M)",
         "• Target Base: 300 university campus deployments + 500 premium gated societies across Delhi-NCR and Bengaluru clusters via direct institutional sales & RWA channel partners.\n"
         "• Unit Value: 800 deployed sites generating hardware CapEx and multi-year recurring AMC retainers.\n"
         "• Market Drivers: Demonstrated operational savings at campus living labs powering rapid multi-city expansion.",
         "🚀 800 High-Margin Beachhead Deployments (3-Yr Target)", C_CARD_WHITE, C_MED_GREEN)
    ]
    
    for i, (title, body, badge, bg_col, col) in enumerate(market_tiers):
        y = 2.10 + i * 1.32
        add_card(slide, 1.0, y, 5.3, 1.24, bg_color=bg_col, border_color=col if bg_col == C_CARD_WHITE else C_BORDER)
        tb_mt = slide.shapes.add_textbox(Inches(1.12), Inches(y + 0.08), Inches(5.06), Inches(1.10))
        tf_mt = tb_mt.text_frame
        tf_mt.word_wrap = True
        tf_mt.margin_left = tf_mt.margin_top = tf_mt.margin_right = tf_mt.margin_bottom = 0
        
        pm1 = tf_mt.paragraphs[0]
        pm1.text = title
        pm1.font.name = FONT_HEAD
        pm1.font.size = Pt(8.5)
        pm1.font.bold = True
        pm1.font.color.rgb = col
        pm1.space_after = Pt(2)
        
        pm2 = tf_mt.add_paragraph()
        pm2.text = body
        pm2.font.name = FONT_BODY
        pm2.font.size = Pt(7.1)
        pm2.font.color.rgb = C_CHARCOAL
        pm2.space_after = Pt(3)
        
        pm3 = tf_mt.add_paragraph()
        pm3.text = badge
        pm3.font.name = FONT_HEAD
        pm3.font.size = Pt(7.2)
        pm3.font.bold = True
        pm3.font.color.rgb = col

    # Citations Note
    tb_src = slide.shapes.add_textbox(Inches(1.0), Inches(6.30), Inches(5.3), Inches(0.50))
    tf_src = tb_src.text_frame
    tf_src.word_wrap = True
    tf_src.margin_left = tf_src.margin_top = tf_src.margin_right = tf_src.margin_bottom = 0
    psrc = tf_src.paragraphs[0]
    psrc.text = "Sources: MoHUA Solid Waste Management Rules 2016 Portal; CPCB Annual MSW Report 2022-23; Knight Frank India Residential Report."
    psrc.font.name = FONT_HEAD
    psrc.font.size = Pt(7)
    psrc.font.bold = True
    psrc.font.color.rgb = C_SLATE_MID

    # Right Column: Go-to-Market Strategy (4 Connected Stages with Progression Flow)
    add_card(slide, 6.7, 1.55, 5.833, 5.35, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    tb_gtm = slide.shapes.add_textbox(Inches(6.9), Inches(1.70), Inches(5.4), Inches(0.32))
    tf_gtm = tb_gtm.text_frame
    tf_gtm.margin_left = tf_gtm.margin_top = tf_gtm.margin_right = tf_gtm.margin_bottom = 0
    
    pg_t = tf_gtm.paragraphs[0]
    pg_t.text = "GO-TO-MARKET (GTM) EXECUTION ROADMAP"
    pg_t.font.name = FONT_HEAD
    pg_t.font.size = Pt(9)
    pg_t.font.bold = True
    pg_t.font.color.rgb = C_DARK_GREEN
    
    gtm_stages = [
        ("STAGE 1: BEACHHEAD LIVING LAB TESTBED", "Months 0–6",
         "• Operational testbed deployed at University Hostel Canteen (250 kg/day plate waste).\n"
         "• Validates 28 LPG cylinders displaced monthly; secures documented NAAC Green credentials.\n"
         "• Refines automated pH buffering telemetry under live monsoon mess conditions.\n"
         "• Target: Documented case study with certified Rs. 1L/mo operational savings.",
         C_MED_GREEN),
        ("STAGE 2: ACADEMIC & CAMPUS EXPANSION", "Months 6–12",
         "• Direct institutional B2B sales to higher-education private universities across Tier-1 higher-ed corridors.\n"
         "• Centralized Campus Director approvals eliminate procurement committee delays.\n"
         "• Leverage referenceable pilot testbed data to close 20 campus contracts.\n"
         "• Target: 20 deployed institutional hubs generating Rs. 1.2 Cr in CapEx & recurring AMC.",
         C_CHARCOAL),
        ("STAGE 3: RWA & TOWNSHIP CHANNEL PARTNERSHIPS", "Months 12–24",
         "• Partner with facility management firms (JLL, CBRE) and RWA federations facing municipal SWM notices.\n"
         "• Offer modular hub installations funded via regular resident society maintenance funds.\n"
         "• Standardized modular design enables 48-hour turn-key installation per society.\n"
         "• Target: 150 residential societies across NCR and Bengaluru tech corridors.",
         C_CHARCOAL),
        ("STAGE 4: RECYCLABLE OFFTAKE & AMC SCALE", "Year 2+",
         "• Aggregate high-purity dry recyclable bales (PET, aluminum) for industrial off-take contracts.\n"
         "• Lock in multi-year recurring maintenance retainers with embedded utility dependency.\n"
         "• Expand footprint into Bengaluru and Mumbai urban clusters with regional assembly hubs.\n"
         "• Target: 800+ installed nodes achieving Rs. 95 Cr SOM with 68% blended AMC margins.",
         C_DARK_GREEN)
    ]
    
    for i, (title, time_badge, desc, col) in enumerate(gtm_stages):
        y = 2.08 + i * 1.22
        add_card(slide, 6.9, y, 5.433, 1.14, bg_color=C_CARD_MUTED, border_color=C_BORDER)
        
        # Left Accent Stripe on GTM stage
        stripe = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(6.9), Inches(y), Inches(0.08), Inches(1.14))
        stripe.fill.solid()
        stripe.fill.fore_color.rgb = col
        stripe.line.fill.background()

        tb_gs = slide.shapes.add_textbox(Inches(7.08), Inches(y + 0.06), Inches(5.12), Inches(1.02))
        tf_gs = tb_gs.text_frame
        tf_gs.word_wrap = True
        tf_gs.margin_left = tf_gs.margin_top = tf_gs.margin_right = tf_gs.margin_bottom = 0
        
        p1 = tf_gs.paragraphs[0]
        p1.text = f"{title} [{time_badge}]"
        p1.font.name = FONT_HEAD
        p1.font.size = Pt(8.2)
        p1.font.bold = True
        p1.font.color.rgb = col
        p1.space_after = Pt(2)
        
        p2 = tf_gs.add_paragraph()
        p2.text = desc
        p2.font.name = FONT_BODY
        p2.font.size = Pt(7.0)
        p2.font.color.rgb = C_CHARCOAL


# ==============================================================================
# SLIDE 7 — REVENUE STRUCTURE AND UNIT ECONOMICS
# ==============================================================================
def build_slide_7(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, C_BG_WARM)
    
    add_header(
        slide,
        eyebrow="Revenue Structure & Financial Viability",
        title="Dual-Stream Revenue Model with Compelling Unit Economics",
        subtitle="Hardware capital recovery combined with recurring maintenance retainers and recyclable material monetization."
    )
    
    # Left Column: Revenue Streams & Flow Diagram (Height: 5.35)
    add_card(slide, 0.8, 1.55, 5.7, 5.35, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    tb_rev = slide.shapes.add_textbox(Inches(1.0), Inches(1.70), Inches(5.3), Inches(0.32))
    tf_rev = tb_rev.text_frame
    tf_rev.margin_left = tf_rev.margin_top = tf_rev.margin_right = tf_rev.margin_bottom = 0
    
    pr_head = tf_rev.paragraphs[0]
    pr_head.text = "1. REVENUE STREAMS & COMMERCIAL RELATIONSHIPS"
    pr_head.font.name = FONT_HEAD
    pr_head.font.size = Pt(9)
    pr_head.font.bold = True
    pr_head.font.color.rgb = C_DARK_GREEN
    
    # Graphical Revenue Flow Diagram Box
    add_card(slide, 1.0, 2.08, 5.3, 0.68, bg_color=C_PALE_GREEN, border_color=C_MINT_ACCENT)
    tb_rf = slide.shapes.add_textbox(Inches(1.05), Inches(2.13), Inches(5.2), Inches(0.58))
    tf_rf = tb_rf.text_frame
    tf_rf.word_wrap = True
    tf_rf.margin_left = tf_rf.margin_top = tf_rf.margin_right = tf_rf.margin_bottom = 0
    prf = tf_rf.paragraphs[0]
    prf.text = "Paying Customer (Campus/RWA) ➔ [Hardware CapEx + Monthly AMC] ➔ EcoBin Platform\n+ Industrial Recyclers ➔ [Clean Recyclable Offtake] ➔ Shared Material Revenue"
    prf.font.name = FONT_HEAD
    prf.font.size = Pt(7.5)
    prf.font.bold = True
    prf.font.color.rgb = C_DARK_GREEN

    # 3 Distinct Revenue Stream Cards (Richer content filling container snugly)
    streams = [
        ("Stream 1: Hardware Sales (CapEx Deployment)",
         "• EcoBin Society Hub: Rs. 3,00,000 – 8,00,000 per installation (100–500 kg/day capacity)\n"
         "• EcoBin Family Appliance: Rs. 40,000 – 60,000 for villas and luxury residential units\n"
         "• Blended Gross Margin: ~38–42% achieved via localized fabrication and standard components\n"
         "• Payment Terms: 50% advance upon contract signing, 50% upon on-site commissioning\n"
         "• Deployment Timeline: 3–5 days modular plug-and-play installation per campus hub.",
         "📦 Core Equipment Deployment", C_CHARCOAL),
        ("Stream 2: Recurring AMC Retainer (Predictable OpEx)",
         "• Contract Value: Rs. 5,000 – 10,000 / month per installed campus hub\n"
         "• Consumables Included: Bacterial methanogen refills, pH buffers, activated carbon filters\n"
         "• Software & Telemetry: Remote cloud monitoring, preventative quarterly servicing, souring alerts\n"
         "• Blended Gross Margin: 65%–70% high-margin recurring cash flow with near-zero churn\n"
         "• Sticky Utility Dependency: Embedded mess reliance ensures >98% contract renewal rate.",
         "🔄 Sticky High-Margin SaaS/AMC", C_MED_GREEN),
        ("Stream 3: Recyclable Offtake Partnership",
         "• Aggregated Purity: Clean, uncontaminated PET, cardboard, and aluminum bales\n"
         "• Offtake Contracts: Sold directly to industrial paper mills and plastic recyclers\n"
         "• Shared Economics: Generates +Rs. 12,000–25,000/mo shared revenue between client & EcoBin\n"
         "• ESG Dividend: Enables verified circular economy compliance and EPR carbon credits\n"
         "• Collection Cadence: Scheduled bi-weekly collection with certified weigh manifests.",
         "♻️ Clean Material Monetization", C_AMBER)
    ]
    
    for i, (title, desc, badge, col) in enumerate(streams):
        y = 2.86 + i * 1.32
        add_card(slide, 1.0, y, 5.3, 1.24, bg_color=C_CARD_MUTED, border_color=C_BORDER)
        tb_st = slide.shapes.add_textbox(Inches(1.12), Inches(y + 0.05), Inches(5.06), Inches(1.14))
        tf_st = tb_st.text_frame
        tf_st.word_wrap = True
        tf_st.margin_left = tf_st.margin_top = tf_st.margin_right = tf_st.margin_bottom = 0
        
        p1 = tf_st.paragraphs[0]
        p1.text = f"{title} [{badge}]"
        p1.font.name = FONT_HEAD
        p1.font.size = Pt(8.2)
        p1.font.bold = True
        p1.font.color.rgb = col
        p1.space_after = Pt(2)
        
        p2 = tf_st.add_paragraph()
        p2.text = desc
        p2.font.name = FONT_BODY
        p2.font.size = Pt(7.0)
        p2.font.color.rgb = C_CHARCOAL

    # Right Column: Unit Economics & Payback Framework (Divided into 3 snug cards to eliminate dead space completely)
    add_card(slide, 6.7, 1.55, 5.833, 5.35, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    tb_ue = slide.shapes.add_textbox(Inches(6.9), Inches(1.70), Inches(5.4), Inches(0.32))
    tf_ue = tb_ue.text_frame
    tf_ue.margin_left = tf_ue.margin_top = tf_ue.margin_right = tf_ue.margin_bottom = 0
    
    pu_head = tf_ue.paragraphs[0]
    pu_head.text = "2. REPRESENTATIVE CAMPUS UNIT ECONOMICS & FINANCIAL RETURNS"
    pu_head.font.name = FONT_HEAD
    pu_head.font.size = Pt(9)
    pu_head.font.bold = True
    pu_head.font.color.rgb = C_DARK_GREEN
    
    # Card 2A: Campus Cashflow Table (Height: 2.22)
    add_card(slide, 6.9, 2.06, 5.433, 2.22, bg_color=C_CARD_MUTED, border_color=C_BORDER)
    tb_ce = slide.shapes.add_textbox(Inches(7.05), Inches(2.11), Inches(5.15), Inches(2.12))
    tf_ce = tb_ce.text_frame
    tf_ce.word_wrap = True
    tf_ce.margin_left = tf_ce.margin_top = tf_ce.margin_right = tf_ce.margin_bottom = 0
    
    pce1 = tf_ce.paragraphs[0]
    pce1.text = "CAMPUS TESTBED PROFILE (250 kg/day bulk plate waste):"
    pce1.font.name = FONT_HEAD
    pce1.font.size = Pt(8.2)
    pce1.font.bold = True
    pce1.font.color.rgb = C_DARK_GREEN
    pce1.space_after = Pt(2)
    
    financial_rows = [
        ("• Status Quo Sunk Hauling + LPG Drain:", "Rs. 1,01,000 / month"),
        ("• Avoided Diesel Hauling Contracts:", "Rs. 45,000 / month"),
        ("• Commercial LPG Replaced (~28 Cylinders):", "Rs. 56,000 / month"),
        ("• Clean Recyclables & Bio-Fertilizer Value:", "+Rs. 6,500 / month"),
        ("• Gross Monthly Utility Generated:", "Rs. 1,07,500 / month"),
        ("• Less Monthly EcoBin AMC Retainer Fee:", "−Rs. 7,500 / month"),
        ("• NET MONTHLY CUSTOMER CASH BENEFIT:", "Rs. 1,00,000 / month"),
        ("• ANNUALIZED OPERATIONAL GAIN:", "Rs. 12,00,000 / year")
    ]
    
    for label, val in financial_rows:
        pf = tf_ce.add_paragraph()
        pf.text = f"{label:<44} {val}"
        pf.font.name = FONT_HEAD if "NET" in label or "ANNUALIZED" in label else FONT_BODY
        pf.font.size = Pt(7.7)
        pf.font.bold = True if "NET" in label or "ANNUALIZED" in label or "Status" in label else False
        pf.font.color.rgb = C_DARK_GREEN if "NET" in label else (C_RED if "Status" in label else C_CHARCOAL)
    
    pce3 = tf_ce.add_paragraph()
    pce3.text = "➔ Capital Payback Period: 16 to 20 Months (Fully recovered via operational savings)"
    pce3.font.name = FONT_HEAD
    pce3.font.size = Pt(8.0)
    pce3.font.bold = True
    pce3.font.color.rgb = C_MED_GREEN
    pce3.space_before = Pt(2)

    # Card 2B: Key Investor Unit Economics (Height: 0.95)
    add_card(slide, 6.9, 4.35, 5.433, 0.95, bg_color=C_PALE_GREEN, border_color=C_MINT_ACCENT)
    tb_iu = slide.shapes.add_textbox(Inches(7.05), Inches(4.41), Inches(5.15), Inches(0.85))
    tf_iu = tb_iu.text_frame
    tf_iu.word_wrap = True
    tf_iu.margin_left = tf_iu.margin_top = tf_iu.margin_right = tf_iu.margin_bottom = 0
    piu_h = tf_iu.paragraphs[0]
    piu_h.text = "INVESTOR UNIT ECONOMICS & MARGIN PROFILE"
    piu_h.font.name = FONT_HEAD
    piu_h.font.size = Pt(8.2)
    piu_h.font.bold = True
    piu_h.font.color.rgb = C_DARK_GREEN
    piu_h.space_after = Pt(2)
    piu_b = tf_iu.add_paragraph()
    piu_b.text = (
        "• Blended Hardware Gross Margin: ~40% (direct modular assembly)\n"
        "• Recurring AMC Gross Margin: 65%–70%  •  Target LTV/CAC: >6.8x\n"
        "• Essential Utility Embeddedness: <1.5% churn due to daily kitchen reliance."
    )
    piu_b.font.name = FONT_BODY
    piu_b.font.size = Pt(7.2)
    piu_b.font.color.rgb = C_CHARCOAL

    # Card 2C: Business Model Sustainability & Competitive Moat (Height: 1.45)
    add_card(slide, 6.9, 5.37, 5.433, 1.45, bg_color=C_CARD_MUTED, border_color=C_BORDER)
    tb_sc = slide.shapes.add_textbox(Inches(7.05), Inches(5.43), Inches(5.15), Inches(1.33))
    tf_sc = tb_sc.text_frame
    tf_sc.word_wrap = True
    tf_sc.margin_left = tf_sc.margin_top = tf_sc.margin_right = tf_sc.margin_bottom = 0
    
    psc_t = tf_sc.paragraphs[0]
    psc_t.text = "BUSINESS MODEL SUSTAINABILITY & COMPETITIVE MOAT:"
    psc_t.font.name = FONT_HEAD
    psc_t.font.size = Pt(8.2)
    psc_t.font.bold = True
    psc_t.font.color.rgb = C_SLATE_MID
    psc_t.space_after = Pt(2)
    
    psc_b = tf_sc.add_paragraph()
    psc_b.text = (
        "• High Customer Retention: Biodigester directly powers mess cooking stoves; continuous utility reliance creates near-zero churn.\n"
        "• Recurring Maintenance Retainer: Consumables (microbial refills, pH buffers, activated filters) lock in sticky high-margin AMC revenue.\n"
        "• Intellectual Property: Proprietary edge-AI waste segmentation weights, automated pH buffer control loops, and low-viscosity micro-slurry milling."
    )
    psc_b.font.name = FONT_BODY
    psc_b.font.size = Pt(7.1)
    psc_b.font.color.rgb = C_CHARCOAL


# ==============================================================================
# SLIDE 8 — TRACTION & LIVE VALIDATION (NEW — Winning Formula Slide 6)
# ==============================================================================
def build_slide_8(prs):
    """Slide 8: Traction & Live Operational Validation — the most critical slide for hardware startups."""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, C_BG_WARM)

    add_header(
        slide,
        eyebrow="Live Operational Deployment & Traction",
        title="Active Testbed Validation: EcoBin is Already Operational — Not a Concept",
        subtitle="Real hardware running live at scale, producing measurable energy outputs and verified financial savings."
    )

    # Left Column: Hardware Deployment Photo + Key Operational Metrics
    add_card(slide, 0.8, 1.55, 5.7, 5.35, bg_color=C_CARD_WHITE, border_color=C_BORDER)

    img_path = "deck_assets/smart_node.jpg"
    if os.path.exists(img_path):
        slide.shapes.add_picture(img_path, Inches(0.9), Inches(1.65), width=Inches(5.5), height=Inches(2.80))

    # Key Live Metrics Banner
    add_card(slide, 1.0, 4.52, 5.3, 0.68, bg_color=C_PALE_GREEN, border_color=C_MINT_ACCENT)
    tb_lm = slide.shapes.add_textbox(Inches(1.12), Inches(4.58), Inches(5.06), Inches(0.56))
    tf_lm = tb_lm.text_frame
    tf_lm.word_wrap = True
    tf_lm.margin_left = tf_lm.margin_top = tf_lm.margin_right = tf_lm.margin_bottom = 0
    plm = tf_lm.paragraphs[0]
    plm.text = "CAMPUS LIVING LAB TESTBED — LIVE OPERATIONAL METRICS"
    plm.font.name = FONT_HEAD
    plm.font.size = Pt(8.5)
    plm.font.bold = True
    plm.font.color.rgb = C_DARK_GREEN
    plm2 = tf_lm.add_paragraph()
    plm2.text = "Deployed: Institutional Hostel Canteen Testbed  |  Status: Continuous Live Operation"
    plm2.font.name = FONT_BODY
    plm2.font.size = Pt(7.5)
    plm2.font.color.rgb = C_CHARCOAL

    # Traction KPI Stat Cards (4 cards, 2x2 grid)
    kpis = [
        ("250 kg/day", "Bulk Plate Waste\nProcessed Daily", C_DARK_GREEN),
        ("28 LPG Cylinders", "Displaced Monthly\nVia Bio-Cooking Gas", C_MED_GREEN),
        (">98% Vision Acc.", "Machine Vision\nSort Precision", C_BLUE_PIPE),
        ("Rs. 1L/mo", "Verified Net Monthly\nOperational Savings", C_AMBER),
    ]
    kpi_positions = [
        (1.0, 5.28), (3.55, 5.28),
        (1.0, 6.20), (3.55, 6.20),
    ]
    for (val, label, col), (kx, ky) in zip(kpis, kpi_positions):
        add_card(slide, kx, ky, 2.35, 0.82, bg_color=C_CARD_MUTED, border_color=col)
        tb_k = slide.shapes.add_textbox(Inches(kx + 0.10), Inches(ky + 0.06), Inches(2.15), Inches(0.72))
        tf_k = tb_k.text_frame
        tf_k.word_wrap = True
        tf_k.margin_left = tf_k.margin_top = tf_k.margin_right = tf_k.margin_bottom = 0
        pk1 = tf_k.paragraphs[0]
        pk1.text = val
        pk1.font.name = FONT_HEAD
        pk1.font.size = Pt(14)
        pk1.font.bold = True
        pk1.font.color.rgb = col
        pk2 = tf_k.add_paragraph()
        pk2.text = label
        pk2.font.name = FONT_BODY
        pk2.font.size = Pt(7.2)
        pk2.font.color.rgb = C_CHARCOAL

    # Right Column: Milestone Achievements & Validation Evidence
    add_card(slide, 6.7, 1.55, 5.833, 5.35, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    tb_rv = slide.shapes.add_textbox(Inches(6.9), Inches(1.70), Inches(5.4), Inches(0.30))
    tf_rv = tb_rv.text_frame
    tf_rv.margin_left = tf_rv.margin_top = tf_rv.margin_right = tf_rv.margin_bottom = 0
    prv_t = tf_rv.paragraphs[0]
    prv_t.text = "VALIDATED TRACTION MILESTONES & OPERATIONAL EVIDENCE"
    prv_t.font.name = FONT_HEAD
    prv_t.font.size = Pt(9)
    prv_t.font.bold = True
    prv_t.font.color.rgb = C_DARK_GREEN

    milestones = [
        ("✅ Live Biodigester Running (250 kg/day)",
         "EcoBin Segregation + Biodigester Node is continuously operational at institutional hostel canteen testbed. Zero restarts in active monsoon season. "
         "Validated mesophilic stability at 37°C with automated pH buffer dosing preventing acid souring.",
         "Continuous Runtime Validated", C_DARK_GREEN),
        ("✅ 28 LPG Cylinders Displaced / Month",
         "Bio-cooking gas (65% CH4 purity) directly routed to campus kitchen stoves — eliminating Rs. 56,000/month in commercial LPG purchases. "
         "Cylinder count independently verified by campus canteen operations staff.",
         "Rs. 56,000/mo LPG Cost Eliminated", C_MED_GREEN),
        ("✅ Machine Vision: >98% Sort Accuracy",
         "ESP32-S3 embedded YOLOv8 model tested on 2,400+ waste classification events under live canteen conditions. "
         "Dry recyclable contamination reduced from 40% manual error baseline to <2% with autonomous vision diverter.",
         "<2% Contamination vs 40% Manual Baseline", C_BLUE_PIPE),
        ("✅ Rs. 1,00,000/month Net Savings Certified",
         "Consolidated operational benefit: Rs. 45k hauling contracts eliminated + Rs. 56k LPG displaced + Rs. 6.5k recyclable offtake — less Rs. 7,500 AMC. "
         "Savings formally documented in campus administrative expenditure records.",
         "Rs. 12L/year Annualized Financial Benefit", C_AMBER),
        ("✅ NAAC Green Campus Compliance Earned",
         "Deployment satisfies all Solid Waste Management Rules 2016 on-site treatment obligations for Bulk Waste Generators >100 kg/day. "
         "Active in NAAC A++ audit cycle as a verified green infrastructure initiative.",
         "SWM 2016 Full Compliance — NGT Fine Immunity", C_CHARCOAL),
    ]

    for i, (title, desc, badge, col) in enumerate(milestones):
        y = 2.08 + i * 0.96
        add_card(slide, 6.9, y, 5.433, 0.88, bg_color=C_CARD_MUTED, border_color=C_BORDER)
        stripe = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(6.9), Inches(y), Inches(0.08), Inches(0.88))
        stripe.fill.solid()
        stripe.fill.fore_color.rgb = col
        stripe.line.fill.background()
        tb_ms = slide.shapes.add_textbox(Inches(7.08), Inches(y + 0.05), Inches(5.12), Inches(0.79))
        tf_ms = tb_ms.text_frame
        tf_ms.word_wrap = True
        tf_ms.margin_left = tf_ms.margin_top = tf_ms.margin_right = tf_ms.margin_bottom = 0
        pm1 = tf_ms.paragraphs[0]
        pm1.text = title
        pm1.font.name = FONT_HEAD
        pm1.font.size = Pt(8.2)
        pm1.font.bold = True
        pm1.font.color.rgb = col
        pm1.space_after = Pt(1)
        pm2 = tf_ms.add_paragraph()
        pm2.text = desc
        pm2.font.name = FONT_BODY
        pm2.font.size = Pt(6.8)
        pm2.font.color.rgb = C_CHARCOAL
        pm2.space_after = Pt(1)
        pm3 = tf_ms.add_paragraph()
        pm3.text = f"[{badge}]"
        pm3.font.name = FONT_HEAD
        pm3.font.size = Pt(6.8)
        pm3.font.bold = True
        pm3.font.color.rgb = col


# ==============================================================================
# SLIDE 9 — COMPETITION & MOAT
# ==============================================================================
def build_slide_9(prs):
    """Slide 9: Competition & Moat — Feature comparison table + 4 defensibility pillars."""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, C_BG_WARM)

    add_header(
        slide,
        eyebrow="Competitive Landscape & Defensibility",
        title="Why EcoBin Wins: Integrated Edge-AI + Closed-Loop Biodigestion Creates an Unassailable Moat",
        subtitle="No competitor combines autonomous machine-vision segregation with in-situ closed-loop biodigestion at the source."
    )

    # Left Column: Competitor Feature Comparison Table
    add_card(slide, 0.8, 1.55, 7.2, 5.35, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    tb_ct = slide.shapes.add_textbox(Inches(1.0), Inches(1.70), Inches(6.8), Inches(0.30))
    tf_ct = tb_ct.text_frame
    tf_ct.margin_left = tf_ct.margin_top = tf_ct.margin_right = tf_ct.margin_bottom = 0
    pct = tf_ct.paragraphs[0]
    pct.text = "FEATURE COMPARISON: ECOBIN vs. ALTERNATIVES"
    pct.font.name = FONT_HEAD
    pct.font.size = Pt(9)
    pct.font.bold = True
    pct.font.color.rgb = C_DARK_GREEN

    # Table Header Row
    headers = ["Feature / Capability", "EcoBin", "Manual 2-Bin", "Composting Pit", "Conventional Biogas", "Private Hauling"]
    col_widths = [2.20, 0.92, 0.98, 1.12, 1.38, 1.10]
    col_start_x = [1.0, 3.22, 4.14, 5.12, 6.24, 7.62]
    header_y = 2.08

    for j, (hdr, cx, cw) in enumerate(zip(headers, col_start_x, col_widths)):
        bg = C_DARK_GREEN if j == 1 else C_CARD_MUTED
        fc = C_CARD_WHITE if j == 1 else C_CHARCOAL
        add_card(slide, cx, header_y, cw, 0.36, bg_color=bg, border_color=C_BORDER)
        tb_h = slide.shapes.add_textbox(Inches(cx + 0.05), Inches(header_y + 0.06), Inches(cw - 0.1), Inches(0.26))
        tf_h = tb_h.text_frame
        tf_h.margin_left = tf_h.margin_top = tf_h.margin_right = tf_h.margin_bottom = 0
        ph = tf_h.paragraphs[0]
        ph.text = hdr
        ph.font.name = FONT_HEAD
        ph.font.size = Pt(7.2)
        ph.font.bold = True
        ph.font.color.rgb = RGBColor(255,255,255) if j == 1 else C_CHARCOAL

    # Table Data Rows
    rows = [
        ("AI Machine-Vision Sort",      "✅ <150ms",  "❌ Manual",    "❌ None",      "❌ None",        "❌ None"),
        ("In-Situ Biogas Production",   "✅ On-site", "❌ None",      "❌ None",      "⚠️ Souring Risk", "❌ None"),
        ("Wet Waste Diversion (On-Site)","✅ 60%+",   "❌ 0%",        "⚠️ Partial",  "⚠️ Partial",     "❌ 0%"),
        ("LPG Cost Eliminated",          "✅ 28 cyl/mo","❌ None",    "❌ None",      "⚠️ Unstable",    "❌ None"),
        ("Zero Human Sorting Required", "✅ Full Auto","❌ 40% Fail", "❌ Manual",    "❌ Manual",      "❌ Manual"),
        ("SWM 2016 Compliance",          "✅ Full",    "❌ Partial",   "⚠️ Partial",  "⚠️ Partial",     "❌ None"),
        ("Recyclable Value Preserved",   "✅ >98%",    "❌ Contaminated","❌ Ruined", "❌ Ruined",      "❌ Contaminated"),
        ("Monthly Net Saving",           "✅ Rs. 1L+", "❌ None",      "❌ None",      "❌ None",        "❌ Sunk Cost"),
        ("Auto Anti-Souring Telemetry",  "✅ Automated","❌ None",     "❌ None",      "❌ Manual",      "❌ None"),
    ]
    row_colors = [C_CARD_WHITE, C_CARD_MUTED]
    for r_i, row_data in enumerate(rows):
        row_y = 2.48 + r_i * 0.40
        row_bg = row_colors[r_i % 2]
        for j, (cell_val, cx, cw) in enumerate(zip(row_data, col_start_x, col_widths)):
            is_ecobin = (j == 1)
            cell_bg = C_PALE_GREEN if is_ecobin else row_bg
            cell_border = C_MINT_ACCENT if is_ecobin else C_BORDER
            add_card(slide, cx, row_y, cw, 0.36, bg_color=cell_bg, border_color=cell_border)
            tb_cell = slide.shapes.add_textbox(Inches(cx + 0.05), Inches(row_y + 0.06), Inches(cw - 0.10), Inches(0.26))
            tf_cell = tb_cell.text_frame
            tf_cell.margin_left = tf_cell.margin_top = tf_cell.margin_right = tf_cell.margin_bottom = 0
            pc = tf_cell.paragraphs[0]
            pc.text = cell_val
            pc.font.name = FONT_HEAD if j == 0 or is_ecobin else FONT_BODY
            pc.font.size = Pt(7.0)
            pc.font.bold = (j == 0 or is_ecobin)
            if is_ecobin:
                pc.font.color.rgb = C_DARK_GREEN
            elif j == 0:
                pc.font.color.rgb = C_CHARCOAL
            else:
                pc.font.color.rgb = C_RED if "❌" in cell_val else (C_AMBER if "⚠️" in cell_val else C_CHARCOAL)

    # Right Column: 4 Defensibility / Moat Pillars
    add_card(slide, 8.2, 1.55, 4.333, 5.35, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    tb_mp = slide.shapes.add_textbox(Inches(8.4), Inches(1.70), Inches(4.0), Inches(0.30))
    tf_mp = tb_mp.text_frame
    tf_mp.margin_left = tf_mp.margin_top = tf_mp.margin_right = tf_mp.margin_bottom = 0
    pmp = tf_mp.paragraphs[0]
    pmp.text = "ECOBIN'S 4 COMPETITIVE MOATS"
    pmp.font.name = FONT_HEAD
    pmp.font.size = Pt(9)
    pmp.font.bold = True
    pmp.font.color.rgb = C_DARK_GREEN

    moats = [
        ("🤖 Proprietary Edge-AI Model",
         "YOLOv8 waste-classification weights trained on 20,000+ real campus food-waste images. "
         "Runs entirely offline on ESP32-S3 (<150ms). Dataset grows with every deployed node — "
         "competitors cannot replicate without years of domain-specific training data.",
         "No competitor has this training dataset", C_BLUE_PIPE),
        ("🔬 Automated Anti-Souring Bio-Telemetry",
         "Embedded pH sensor + automated NaHCO3 buffer dosing controller continuously stabilizes "
         "mesophilic methanogen cultures. Conventional biogas digesters fail within weeks due to "
         "acid souring — EcoBin's telemetry loop is the core IP preventing this.",
         "Core bioprocess IP — biogas without crash risk", C_MED_GREEN),
        ("🔒 Embedded Utility Dependency (Stickiness)",
         "EcoBin biodigester directly pipes cooking gas to campus kitchen stoves every single day. "
         "Replacing EcoBin means re-installing gas supply lines and resuming LPG bills. "
         "This physical utility lock-in produces <1.5% annual churn — far below SaaS benchmarks.",
         "Physical lock-in: <1.5% churn, >98% renewal", C_DARK_GREEN),
        ("📜 Regulatory First-Mover Advantage",
         "SWM Rules 2016 legally mandate on-site treatment for all Bulk Waste Generators (>100 kg/day). "
         "EcoBin is the only integrated AI-sorting + biodigestion solution pre-validated under this "
         "compliance framework. First certified solution in Tier-1 educational campus segment.",
         "Only SWM-2016-validated end-to-end system", C_AMBER),
    ]

    for i, (title, desc, badge, col) in enumerate(moats):
        y = 2.08 + i * 1.22
        add_card(slide, 8.4, y, 4.033, 1.14, bg_color=C_CARD_MUTED, border_color=C_BORDER)
        stripe = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(8.4), Inches(y), Inches(0.08), Inches(1.14))
        stripe.fill.solid()
        stripe.fill.fore_color.rgb = col
        stripe.line.fill.background()
        tb_mo = slide.shapes.add_textbox(Inches(8.58), Inches(y + 0.05), Inches(3.80), Inches(1.04))
        tf_mo = tb_mo.text_frame
        tf_mo.word_wrap = True
        tf_mo.margin_left = tf_mo.margin_top = tf_mo.margin_right = tf_mo.margin_bottom = 0
        pmo1 = tf_mo.paragraphs[0]
        pmo1.text = title
        pmo1.font.name = FONT_HEAD
        pmo1.font.size = Pt(8.2)
        pmo1.font.bold = True
        pmo1.font.color.rgb = col
        pmo1.space_after = Pt(1)
        pmo2 = tf_mo.add_paragraph()
        pmo2.text = desc
        pmo2.font.name = FONT_BODY
        pmo2.font.size = Pt(6.8)
        pmo2.font.color.rgb = C_CHARCOAL
        pmo2.space_after = Pt(1)
        pmo3 = tf_mo.add_paragraph()
        pmo3.text = f"[{badge}]"
        pmo3.font.name = FONT_HEAD
        pmo3.font.size = Pt(6.8)
        pmo3.font.bold = True
        pmo3.font.color.rgb = col


# ==============================================================================
# SLIDE 10 — THE TEAM & THE ASK (Milestone Ladder + Use of Funds)
# ==============================================================================
def build_slide_10(prs):
    """Slide 10: The Team & The Ask — Domain expertise + milestone ladder + use of funds."""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, C_BG_WARM)

    add_header(
        slide,
        eyebrow="Team Expertise & Investment Ask",
        title="Uniquely Qualified Team + A Clear Milestone Ladder for Every Rupee Raised",
        subtitle="Domain-first engineering + commercial operators, with a precise de-risking milestone ladder."
    )

    # LEFT COLUMN: TEAM EXPERTISE CARDS
    add_card(slide, 0.8, 1.55, 5.7, 5.35, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    tb_tt = slide.shapes.add_textbox(Inches(1.0), Inches(1.70), Inches(5.3), Inches(0.30))
    tf_tt = tb_tt.text_frame
    tf_tt.margin_left = tf_tt.margin_top = tf_tt.margin_right = tf_tt.margin_bottom = 0
    ptt = tf_tt.paragraphs[0]
    ptt.text = "TEAM: WHY WE ARE UNIQUELY QUALIFIED TO BUILD THIS"
    ptt.font.name = FONT_HEAD
    ptt.font.size = Pt(9)
    ptt.font.bold = True
    ptt.font.color.rgb = C_DARK_GREEN

    team_domains = [
        ("⚙️ Embedded Systems & Firmware Engineering",
         "ESP32-S3 firmware architecture, real-time RTOS sensor polling, UART/I2C peripheral stacks, "
         "low-power edge inference runtime, and OTA remote update pipelines.",
         "ESP32-S3 • FreeRTOS • Edge-AI • OTA Firmware", C_BLUE_PIPE),
        ("🤖 Computer Vision & Machine Learning (Edge-AI)",
         "YOLOv8 model quantization and deployment at <150ms inference. Custom dataset labelling (20,000+ "
         "food waste images), model optimization for 4MB flash constraint, and real-world accuracy benchmarking.",
         "YOLOv8 • TFLite • Edge Inference • Custom Datasets", C_DARK_GREEN),
        ("🧪 Anaerobic Bio-Process Engineering",
         "Mesophilic biodigester design, volatile fatty acid (VFA) monitoring, automated NaHCO3 buffer "
         "dosing control systems, low-viscosity micro-slurry maceration engineering, and bio-fertilizer extraction.",
         "Biogas • pH Telemetry • Anti-Souring • Bio-Fertilizer", C_MED_GREEN),
        ("🏛️ Institutional B2B Sales & Campus Operations",
         "Direct campus administration engagement, compliance audit support (SWM 2016 / NAAC), "
         "facility management procurement structuring, and B2B contract execution at Tier-1 universities.",
         "Institutional B2B • SWM Compliance • Campus GTM", C_AMBER),
        ("🔧 Hardware Product Design & Manufacturing",
         "Mechanical system design, stainless-steel fabrication vendor partnerships, modular plug-and-play "
         "assembly planning, supply chain cost optimization, and 3–5 day installation-ready deployment packaging.",
         "Fabrication • Modular Design • Supply Chain • BoM", C_CHARCOAL),
    ]

    for i, (title, desc, badge, col) in enumerate(team_domains):
        y = 2.08 + i * 0.96
        add_card(slide, 1.0, y, 5.3, 0.88, bg_color=C_CARD_MUTED, border_color=C_BORDER)
        stripe = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(1.0), Inches(y), Inches(0.08), Inches(0.88))
        stripe.fill.solid()
        stripe.fill.fore_color.rgb = col
        stripe.line.fill.background()
        tb_td = slide.shapes.add_textbox(Inches(1.18), Inches(y + 0.05), Inches(5.0), Inches(0.79))
        tf_td = tb_td.text_frame
        tf_td.word_wrap = True
        tf_td.margin_left = tf_td.margin_top = tf_td.margin_right = tf_td.margin_bottom = 0
        ptd1 = tf_td.paragraphs[0]
        ptd1.text = title
        ptd1.font.name = FONT_HEAD
        ptd1.font.size = Pt(8.2)
        ptd1.font.bold = True
        ptd1.font.color.rgb = col
        ptd1.space_after = Pt(1)
        ptd2 = tf_td.add_paragraph()
        ptd2.text = desc
        ptd2.font.name = FONT_BODY
        ptd2.font.size = Pt(6.8)
        ptd2.font.color.rgb = C_CHARCOAL
        ptd2.space_after = Pt(1)
        ptd3 = tf_td.add_paragraph()
        ptd3.text = badge
        ptd3.font.name = FONT_HEAD
        ptd3.font.size = Pt(6.8)
        ptd3.font.bold = True
        ptd3.font.color.rgb = col

    # RIGHT COLUMN: THE ASK — Milestone Ladder + Use of Funds
    add_card(slide, 6.7, 1.55, 5.833, 5.35, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    tb_ask = slide.shapes.add_textbox(Inches(6.9), Inches(1.70), Inches(5.4), Inches(0.30))
    tf_ask = tb_ask.text_frame
    tf_ask.margin_left = tf_ask.margin_top = tf_ask.margin_right = tf_ask.margin_bottom = 0
    pa_t = tf_ask.paragraphs[0]
    pa_t.text = "THE ASK: SEED RAISE & MILESTONE LADDER"
    pa_t.font.name = FONT_HEAD
    pa_t.font.size = Pt(9)
    pa_t.font.bold = True
    pa_t.font.color.rgb = C_DARK_GREEN

    # Seed Round Ask Banner
    add_card(slide, 6.9, 2.08, 5.433, 0.76, bg_color=C_PALE_GREEN, border_color=C_MINT_ACCENT)
    tb_ra = slide.shapes.add_textbox(Inches(7.05), Inches(2.14), Inches(5.15), Inches(0.64))
    tf_ra = tb_ra.text_frame
    tf_ra.word_wrap = True
    tf_ra.margin_left = tf_ra.margin_top = tf_ra.margin_right = tf_ra.margin_bottom = 0
    pra1 = tf_ra.paragraphs[0]
    pra1.text = "RAISING: Rs. 1.5 Cr SEED ROUND"
    pra1.font.name = FONT_HEAD
    pra1.font.size = Pt(14)
    pra1.font.bold = True
    pra1.font.color.rgb = C_DARK_GREEN
    pra1.space_after = Pt(2)
    pra2 = tf_ra.add_paragraph()
    pra2.text = "To scale from 1 live campus to 20 deployed hubs & achieve Rs. 1.2 Cr ARR in 12 months."
    pra2.font.name = FONT_BODY
    pra2.font.size = Pt(8)
    pra2.font.color.rgb = C_CHARCOAL

    # Milestone Ladder — 3 sequential milestones
    milestones = [
        ("MILESTONE 1: PRODUCTION-READY HARDWARE (Rs. 35 Lakhs)",
         "Months 0–3",
         "• Finalize Gen-2 hardware: standardized modular hub (100/250/500 kg variants).\n"
         "• Contract manufacturing with local Ghaziabad fabrication partner.\n"
         "• Complete UL/BIS sensor certifications for institutional procurement approval.\n"
         "• Risk Retired: Hardware scaling feasibility proven — eliminates prototyping risk.",
         C_BLUE_PIPE),
        ("MILESTONE 2: 20-CAMPUS EXPANSION (Rs. 70 Lakhs)",
         "Months 3–9",
         "• Deploy 20 institutional campus hubs across Greater Noida & Ghaziabad cluster.\n"
         "• Each hub generates Rs. 5k–8k/mo AMC + Rs. 1L/mo campus operational savings.\n"
         "• Build dedicated 3-person institutional sales & deployment team.\n"
         "• Target: Rs. 24L CapEx revenue + Rs. 12L ARR AMC run-rate by Month 9.",
         C_MED_GREEN),
        ("MILESTONE 3: SERIES A READY — Rs. 95 Cr SOM (Rs. 45 Lakhs)",
         "Months 9–18",
         "• Regional assembly hub opened (NCR) for faster 48-hr deployment SLA.\n"
         "• Channel partnerships with JLL, CBRE, and Delhi-NCR RWA Federations signed.\n"
         "• Recyclable offtake aggregation contracts with 2 industrial paper/plastic mills.\n"
         "• Target: 100+ installed nodes, Rs. 95L ARR, Series A deck ready.",
         C_DARK_GREEN),
    ]

    for i, (title, time_badge, desc, col) in enumerate(milestones):
        y = 2.94 + i * 1.30
        add_card(slide, 6.9, y, 5.433, 1.22, bg_color=C_CARD_MUTED, border_color=C_BORDER)
        stripe = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(6.9), Inches(y), Inches(0.08), Inches(1.22))
        stripe.fill.solid()
        stripe.fill.fore_color.rgb = col
        stripe.line.fill.background()
        tb_ml = slide.shapes.add_textbox(Inches(7.08), Inches(y + 0.06), Inches(5.12), Inches(1.10))
        tf_ml = tb_ml.text_frame
        tf_ml.word_wrap = True
        tf_ml.margin_left = tf_ml.margin_top = tf_ml.margin_right = tf_ml.margin_bottom = 0
        pml1 = tf_ml.paragraphs[0]
        pml1.text = f"{title} [{time_badge}]"
        pml1.font.name = FONT_HEAD
        pml1.font.size = Pt(7.8)
        pml1.font.bold = True
        pml1.font.color.rgb = col
        pml1.space_after = Pt(2)
        pml2 = tf_ml.add_paragraph()
        pml2.text = desc
        pml2.font.name = FONT_BODY
        pml2.font.size = Pt(6.9)
        pml2.font.color.rgb = C_CHARCOAL

        if i < 2:
            add_arrow_badge(slide, 9.38, y + 1.22, width=0.30, height=0.25, text="⬇", color=col, size=11)


# ==============================================================================
# SLIDE 11 — CLOSING & THANK YOU: ULTRA-CLEAN, MINIMAL & SIMPLE
# ==============================================================================
def build_slide_11(prs):
    """Slide 11 (Bonus): Ultra-clean, minimal, uncluttered Thank You closing slide."""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, C_BG_WARM)

    # Left Content Card — Ultra Clean, Spacious & Focused (Height 5.0)
    add_card(slide, 1.0, 1.25, 6.8, 5.00, bg_color=C_CARD_WHITE, border_color=C_BORDER)

    tb_c = slide.shapes.add_textbox(Inches(1.6), Inches(1.60), Inches(5.6), Inches(2.4))
    tf_c = tb_c.text_frame
    tf_c.word_wrap = True
    tf_c.margin_left = tf_c.margin_top = tf_c.margin_right = tf_c.margin_bottom = 0

    # Eyebrow
    p_eye = tf_c.paragraphs[0]
    p_eye.text = "DECENTRALIZED URBAN BIO-UTILITY"
    p_eye.font.name = FONT_HEAD
    p_eye.font.size = Pt(9)
    p_eye.font.bold = True
    p_eye.font.color.rgb = C_DARK_GREEN
    p_eye.space_after = Pt(14)

    # Big Bold Thank You Headline
    p_ty = tf_c.add_paragraph()
    p_ty.text = "Thank You"
    p_ty.font.name = FONT_HEAD
    p_ty.font.size = Pt(52)
    p_ty.font.bold = True
    p_ty.font.color.rgb = C_DARK_GREEN
    p_ty.space_after = Pt(6)

    # Brand Wordmark & Tagline
    p_brand = tf_c.add_paragraph()
    p_brand.text = "EcoBin — \"Throw Waste. Create Energy.\""
    p_brand.font.name = FONT_HEAD
    p_brand.font.size = Pt(19)
    p_brand.font.bold = True
    p_brand.font.color.rgb = C_CHARCOAL
    p_brand.space_after = Pt(14)

    # Short & Crisp 1-sentence description
    p_desc = tf_c.add_paragraph()
    p_desc.text = "Autonomous edge-AI source-segregation and closed-loop anaerobic digestion converting organic food waste into clean on-site energy."
    p_desc.font.name = FONT_BODY
    p_desc.font.size = Pt(11)
    p_desc.font.color.rgb = C_SLATE_MID

    # Prominent Website & Contact Box
    add_card(slide, 1.6, 4.60, 5.6, 1.35, bg_color=C_PALE_GREEN, border_color=C_MINT_ACCENT)
    tb_cta = slide.shapes.add_textbox(Inches(1.8), Inches(4.70), Inches(5.2), Inches(1.15))
    tf_cta = tb_cta.text_frame
    tf_cta.word_wrap = True
    tf_cta.margin_left = tf_cta.margin_top = tf_cta.margin_right = tf_cta.margin_bottom = 0
    pc1 = tf_cta.paragraphs[0]
    pc1.text = "Official Website: https://echobin.vercel.app"
    pc1.font.name = FONT_HEAD
    pc1.font.size = Pt(12)
    pc1.font.bold = True
    pc1.font.color.rgb = C_DARK_GREEN
    pc1.space_after = Pt(4)
    pc2 = tf_cta.add_paragraph()
    pc2.text = "Partnership & Inquiries: contact@ecobin.tech"
    pc2.font.name = FONT_HEAD
    pc2.font.size = Pt(10)
    pc2.font.bold = True
    pc2.font.color.rgb = C_CHARCOAL
    pc2.space_after = Pt(6)
    pc3 = tf_cta.add_paragraph()
    pc3.text = "Open for Institutional Pilots, Municipal Partnerships & Strategic Collaborations."
    pc3.font.name = FONT_BODY
    pc3.font.size = Pt(8.5)
    pc3.font.color.rgb = C_SLATE_MID

    # Right Content Card: Framed Hardware Visual
    add_card(slide, 8.1, 1.25, 4.233, 5.00, bg_color=C_CARD_WHITE, border_color=C_BORDER)
    img_path = "deck_assets/smart_node.jpg"
    if os.path.exists(img_path):
        slide.shapes.add_picture(img_path, Inches(8.3), Inches(1.40), width=Inches(3.833))
    add_card(slide, 8.3, 4.95, 3.833, 1.05, bg_color=C_CARD_MUTED, border_color=C_BORDER)
    tb_rc = slide.shapes.add_textbox(Inches(8.42), Inches(5.02), Inches(3.6), Inches(0.90))
    tf_rc = tb_rc.text_frame
    tf_rc.word_wrap = True
    tf_rc.margin_left = tf_rc.margin_top = tf_rc.margin_right = tf_rc.margin_bottom = 0
    prc1 = tf_rc.paragraphs[0]
    prc1.text = "ECOBIN APPLIANCE"
    prc1.font.name = FONT_HEAD
    prc1.font.size = Pt(8.5)
    prc1.font.bold = True
    prc1.font.color.rgb = C_DARK_GREEN
    prc1.space_after = Pt(2)
    prc2 = tf_rc.add_paragraph()
    prc2.text = "Operational testbed validated across campus living labs. Deploying autonomous clean energy infrastructure right at the source."
    prc2.font.name = FONT_BODY
    prc2.font.size = Pt(8)
    prc2.font.color.rgb = C_CHARCOAL


# ==============================================================================
# MAIN ROUTINE — 10-SLIDE WINNING FORMULA + 1 CLOSING SLIDE
# ==============================================================================
def main():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    print("Generating Slide 01: Hook & One-Liner (Cover)...")
    build_slide_1(prs)
    print("Generating Slide 02: The Problem (Waste Crisis & Landfills)...")
    build_slide_2(prs)
    print("Generating Slide 03: Status Quo Failure (How Customers Handle It Today)...")
    build_slide_3(prs)
    print("Generating Slide 04: The Solution & Who We Target...")
    build_slide_4(prs)
    print("Generating Slide 05: Product Workflow & Business Model (Diagrammatic Pipeline)...")
    build_slide_5(prs)
    print("Generating Slide 06: Market Opportunity (TAM/SAM/SOM) & GTM Roadmap...")
    build_slide_6(prs)
    print("Generating Slide 07: Unit Economics & Revenue Structure...")
    build_slide_7(prs)
    print("Generating Slide 08: Traction & Live Operational Validation...")
    build_slide_8(prs)
    print("Generating Slide 09: Competition & Moat (Feature Table + 4 Defensibility Pillars)...")
    build_slide_9(prs)
    print("Generating Slide 10: The Team & The Ask (Milestone Ladder + Use of Funds)...")
    build_slide_10(prs)
    print("Generating Slide 11: Thank You & Closing (Simple & Minimal)...")
    build_slide_11(prs)

    output_pptx = "EcoBin_Startup_Pitch_Deck.pptx"
    prs.save(output_pptx)
    print(f"\nSuccessfully generated: {output_pptx}")
    print(f"Total slides: {len(prs.slides)} (10 Winning Formula Slides + 1 Closing)")
    print("\n10-Slide Winning Formula:")
    print("  Slide 01: Hook & One-Liner (Cover)")
    print("  Slide 02: The Problem")
    print("  Slide 03: Status Quo Failure Workflow")
    print("  Slide 04: The Solution & Customer Segments")
    print("  Slide 05: Product Workflow & Business Model")
    print("  Slide 06: Market Size (TAM/SAM/SOM) & GTM")
    print("  Slide 07: Unit Economics & Revenue Structure")
    print("  Slide 08: Traction & Live Validation")
    print("  Slide 09: Competition & Moat")
    print("  Slide 10: The Team & The Ask (Milestone Ladder)")
    print("  Slide 11: Thank You (Simple Closing)")

if __name__ == "__main__":
    main()
