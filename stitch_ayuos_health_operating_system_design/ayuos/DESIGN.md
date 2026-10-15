---
name: AyuOS
colors:
  surface: '#f7faf9'
  surface-dim: '#d7dbda'
  surface-bright: '#f7faf9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f3'
  surface-container: '#ebeeed'
  surface-container-high: '#e6e9e8'
  surface-container-highest: '#e0e3e2'
  on-surface: '#181c1c'
  on-surface-variant: '#3f4949'
  inverse-surface: '#2d3131'
  inverse-on-surface: '#eef1f0'
  outline: '#6f7979'
  outline-variant: '#bfc8c8'
  surface-tint: '#21686a'
  primary: '#004345'
  on-primary: '#ffffff'
  primary-container: '#0f5c5e'
  on-primary-container: '#90d2d4'
  inverse-primary: '#90d2d4'
  secondary: '#226584'
  on-secondary: '#ffffff'
  secondary-container: '#9dd9fd'
  on-secondary-container: '#1b607f'
  tertiary: '#2e3f3c'
  on-tertiary: '#ffffff'
  tertiary-container: '#455653'
  on-tertiary-container: '#b8cac7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#aceef0'
  primary-fixed-dim: '#90d2d4'
  on-primary-fixed: '#002021'
  on-primary-fixed-variant: '#004f51'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#92cef2'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#d4e6e3'
  tertiary-fixed-dim: '#b8cac7'
  on-tertiary-fixed: '#0e1e1c'
  on-tertiary-fixed-variant: '#394a47'
  background: '#f7faf9'
  on-background: '#181c1c'
  surface-variant: '#e0e3e2'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 3rem
    fontWeight: '600'
    lineHeight: 3.5rem
    letterSpacing: -0.025em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: '600'
    lineHeight: 2.5rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 1.625rem
    fontWeight: '600'
    lineHeight: 2.125rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '500'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
    letterSpacing: 0.005em
  label-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.04em
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: 1.25rem
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2.5rem
  margin-sm: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a premium, human-centric operating system for lifelong personal and family healthcare. It steers away from the cold, sterile, utilitarian ambiance of hospital software, manifesting instead as a serene, highly competent personal sanctuary. The visual identity bridges high-end consumer technology with clinical-grade trust: quiet, authoritative, deeply empathetic, and frictionless.

The design philosophy aligns with **Warm Editorial Minimalism with Tonal Layering**. Heavy, unhurried white space provides visual tranquility to mitigate health-induced anxiety. High-precision typography, nuanced boundaries, and subtle translucent textures communicate clinical intelligence and data fidelity without sensory overload. Every visual touchpoint prioritizes clarity, human dignity, and rapid legibility during critical decision-making moments.

## Colors

The palette balances clinical precision and domestic tranquility. The interface strictly adheres to an 80–85% neutral foundation, 10–15% deep restorative oceanic tones, and restrained, micro-dosed semantic accents.

- **Primary Canvas & Surfaces**: Base background is Cool Off-White (`#F6F9F8`), creating an airy foundation softer than harsh digital white. Elevated containers and cards utilize Pure White (`#FFFFFF`).
- **Core Tones**: Deep Medical Teal (`#0F5C5E`) represents primary brand equity, core actions, and stable health states. Primary Dark (`#0B4547`) serves as its active and hover partner. Healthcare Blue (`#2F6F8F`) delivers secondary system feedback, analytics insights, and informational badges.
- **Accents & Tints**: Mint (`#DCEFEB`) provides a restorative tint for active pills, calm highlights, and subtle selection states.
- **Typography & Structural Lines**: Primary text is anchored in Deep Navy (`#173042`) for maximum contrast without harsh black. Secondary metadata and support copy render in Slate (`#60717A`). Dividers and borders rely on Soft Blue-Grey (`#DCE5E7`).
- **Semantic Restraint**: Status colors are deliberately de-saturated to avoid alarming the patient. Calm Green (`#3E8068`) conveys stability and verification; Warm Amber (`#C58A35`) highlights pending reviews and financial dues; Muted Coral (`#C65D5D`) indicates critical markers, emergencies, and urgent contraindications.

## Typography

The typographic hierarchy prioritizes calm optical readability and immediate legibility across variable stress conditions. Built natively upon `Inter`—with tabular numerals enabled—the system scales from high-impact vitals headlines down to dense clinical lab tables.

- **Display & Headlines**: Tightly tracked (`-0.025em` to `-0.015em`) with deliberate semi-bold weighting (`600`). Headings feel anchored, structured, and modern, avoiding aggressive display quirks.
- **Body & Editorial**: Generous line heights (1.5x to 1.6x) are maintained across long clinical summaries, discharge records, and doctor consultations to diminish cognitive fatigue.
- **Technical & Metric Readouts**: `JetBrains Mono` is reserved exclusively for clinical measurements, reference ranges, biometric timestamps, and dosage quantities (`mono-data`), ensuring unambiguous numeric clarity.
- **Labels & Micro-copy**: Sub-labels and categorizations employ slightly expanded letter spacing to ensure scannability on low-luminosity screens or mobile viewports.

## Layout & Spacing

The layout model is anchored by a structured 12-column responsive fluid grid designed to hold vast amounts of health telemetry without visual clutter.

- **Desktop (1200px+)**: 12 columns with `2.5rem` outer margins and `1.5rem` gutters. Content maxes out at `1440px` to maintain optimal eye travel when reviewing longitudinal health charts and multi-year health timelines.
- **Tablet (768px - 1199px)**: 8 columns with `1.5rem` gutters and `1.5rem` margins. Side panels (e.g., family switchers, health records sidebar) collapse into off-canvas drawers or secondary segmented tabs.
- **Mobile (< 768px)**: 4 columns with `1rem` gutters and `1.25rem` outer margins. Critical components—notably the Emergency Quick-Card and Person Switcher—stick to the top and bottom visual perimeters for one-handed thumb interaction.
- **Vertical Spacing Rhythm**: Layout blocks strictly follow an 8pt base grid (`space-xs` = 4px, `space-sm` = 8px, `space-md` = 16px, `space-lg` = 24px, `space-xl` = 40px). Healthcare data cards utilize generous interior padding (`space-lg`) to insulate sensitive metrics.

## Elevation & Depth

Visual hierarchy uses tonal surface layering combined with diffused, tinted ambient shadows. Hard dropshadows and heavy clinical outlines are forbidden.

- **Level 0 (Base Canvas)**: Cool Off-White (`#F6F9F8`). Flat, foundational backdrop representing the user's primary operating canvas.
- **Level 1 (Card & Section Surfaces)**: Pure White (`#FFFFFF`) with a hairline border (`1px solid #DCE5E7`). Used for all standard interactive health cards, timeline cards, and baseline metrics.
- **Level 2 (Active & Floating Modules)**: Pure White with an ambient teal-tinted shadow (`0 8px 24px -4px rgba(15, 92, 94, 0.08)`) and border (`1px solid #DCE5E7`). Used for hover states, floating menus, the Global Person Switcher dropdown, and unified input panels.
- **Level 3 (Modal, Urgent & AI Sheets)**: Pure White surface with dual-layer ambient depth (`0 20px 32px -8px rgba(23, 48, 66, 0.12), 0 4px 12px -2px rgba(15, 92, 94, 0.04)`). Reserved for emergency quick-cards, document verification overlays, and deep-dive diagnosis views.
- **Backdrop Blurs**: When modals or overlays activate, the background receives an ultra-smooth blur (`backdrop-filter: blur(12px)`) with a 40% opacity overlay of `#173042`, ensuring full cognitive focus on the active task.

## Shapes

The design system adopts a balanced roundedness architecture (`roundedness: 2`, base `0.5rem` / `8px`). This geometry eliminates clinical austerity while retaining structure and data density.

- **Interactive Inputs & Action Buttons**: Standardized at `0.5rem` (8px) corner radius for visual stability and grounded touch targets.
- **Content Cards, Panels & Modules**: Standardized at `rounded-lg` (`1rem` / 16px). This creates organic, approachable containers that feel like bespoke physical cards.
- **Emergency Cards & Primary AI Overlays**: Elevated to `rounded-xl` (`1.5rem` / 24px) for prominent framing.
- **Pills, Badges & Person Avatars**: Employ fully rounded pill geometry (`9999px`) to create an inviting, humanized contrast against rectangular data modules.

## Components

### Buttons
- **Primary**: Deep Medical Teal (`#0F5C5E`) background, Pure White text, `0.5rem` radius, 48px height for touch confidence. On hover: shifts smoothly to Primary Dark (`#0B4547`).
- **Secondary**: Pure White background, 1px border in `#DCE5E7`, Deep Navy (`#173042`) text. Hover introduces a delicate `#F6F9F8` wash.
- **Tertiary/Ghost**: Transparent surface with Primary Teal text, reserved for quiet dismissals, inline chart filters, and secondary links.
- **Emergency Action**: Urgent Muted Coral (`#C65D5D`) background, Pure White bold typography, elevated elevation with pulsing amber/red indicator.

### Input Fields & Upload Anything
- **Text Inputs**: Pure White surface, 1px `#DCE5E7` outline, 44px min-height, padded with `1rem` lateral breathing room. On focus: sharpens with a 1.5px Deep Medical Teal ring and an ambient 3px teal haze (`rgba(15, 92, 94, 0.12)`).
- **Upload Anything Unified Entry**: A large, inviting drop surface framed with a dashed border (`1.5px dashed #2F6F8F`), background tinted with 20% Mint (`rgba(220, 239, 235, 0.3)`). Displays contextual file recognizers (PDFs, DICOM scans, lab camera snapshots, Apple Health sync) with instant visual feedback.

### AI Progress States & Verification Reviews
- **AI Processing**: Subtle, rhythmic breathing indicator using a linear gradient transition between Deep Medical Teal and Healthcare Blue. Avoid chaotic spinning loaders; use reassuring narrative status lines ("Analyzing lipid panel...", "Correlating with Dr. Rao’s notes...").
- **Verification Reviews**: Split-view comparison card. Extracted AI values on the right (with confidence indicators in Calm Green or Warm Amber), alongside the original source document snapshot on the left for one-tap human sign-off.

### Global Person Switcher
- Embedded in the persistent global header. Displays current profile with a circular avatar, display name, and chevron (e.g., "My Health ▾", "Mummy's Health ▾").
- Triggers a floating card displaying all managed family profiles with health status micro-dots (green for stable, amber for pending checkup). Supports one-click profile switching without page reloads.

### Connected Records Indicators
- Pill-shaped tags indicating data sources (Epic MyChart, NHS App, LabCorp, Apple Health, Omron).
- Features a micro live-sync dot (pulsing `#3E8068` for connected, `#60717A` for manual entry) and human-readable sync timestamp.

### Healthcare Finance Summaries
- Modular card segmented into three zones: Insurance Deductible Progress Bar, Out-of-Pocket Cap, and Pending Claims.
- Numeric balances are prioritized using `mono-data` typography with muted progress tracks (`#DCE5E7`) and deep teal fills.

### Family Visibility Toggles
- High-clarity segmented controls and custom toggle switches permitting granular permission sets ("Full Medical Access", "Emergency Only", "Billing Only").
- Subtle tooltips explain data-sharing implications in plain human language.

### Emergency Quick-Cards
- High-contrast, rapidly accessible card positioned at the highest tier of visual hierarchy.
- Uses a subtle `#C65D5D` border-top accent (3px). Aggregates Blood Type, Severe Allergies (highlighted in high-visibility tags), Emergency Contacts with one-touch direct dial, and Active Resuscitation/Organ Donor directives. Accessible even in offline or locked states.