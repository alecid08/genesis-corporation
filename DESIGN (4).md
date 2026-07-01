---
name: Genesis Technical Core
colors:
  surface: '#f7f9fc'
  surface-dim: '#d8dadd'
  surface-bright: '#f7f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f7'
  surface-container: '#eceef1'
  surface-container-high: '#e6e8eb'
  surface-container-highest: '#e0e3e6'
  on-surface: '#191c1e'
  on-surface-variant: '#424752'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f4'
  outline: '#727783'
  outline-variant: '#c2c6d4'
  surface-tint: '#165db2'
  primary: '#003e7f'
  on-primary: '#ffffff'
  primary-container: '#0055aa'
  on-primary-container: '#b3cdff'
  inverse-primary: '#aac7ff'
  secondary: '#3a5f94'
  on-secondary: '#ffffff'
  secondary-container: '#9fc2fe'
  on-secondary-container: '#294f83'
  tertiary: '#745b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#d0a600'
  on-tertiary-container: '#4f3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#aac7ff'
  on-primary-fixed: '#001b3e'
  on-primary-fixed-variant: '#00458d'
  secondary-fixed: '#d5e3ff'
  secondary-fixed-dim: '#a7c8ff'
  on-secondary-fixed: '#001b3c'
  on-secondary-fixed-variant: '#1f477b'
  tertiary-fixed: '#ffe08b'
  tertiary-fixed-dim: '#f1c100'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#584400'
  background: '#f7f9fc'
  on-background: '#191c1e'
  surface-variant: '#e0e3e6'
  safety-yellow: '#FFCC00'
  electric-blue: '#0055AA'
  deep-navy: '#003366'
  emergency-red: '#CC0000'
  success-green: '#28A745'
  surface-subtle: '#F9FAFB'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Open Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Open Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
  label-md:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system for Genesis Electrical Corporation is built on the pillars of **technical precision, safety, and reliability**. It serves a dual audience of high-end residential homeowners and commercial facility managers in Miami, requiring an aesthetic that is both approachable and rigorously professional.

The visual style is **Corporate / Modern** with a high-energy technical edge. It utilizes generous whitespace to convey cleanliness and organization, while using high-contrast "Safety Yellow" accents to drive user action. The interface should feel sturdy and dependable, mirroring the quality of high-voltage electrical work, with crisp transitions and a structured layout that eliminates ambiguity.

## Colors

This palette is designed to evoke the electrical industry's standard safety and power colors. 

- **Primary & Secondary**: The blue hierarchy establishes authority and trust. **Electric Blue** is used for primary brand elements and active states, while **Deep Navy** provides the structural grounding for headers and footers.
- **Accent**: **Safety Yellow** is reserved exclusively for primary Calls to Action (CTAs) and critical information highlights, ensuring maximum visibility.
- **Neutrals**: A tiered system of cool grays maintains a clean, modern environment. **#F5F7FA** is the standard page background to reduce glare compared to pure white.
- **Status**: **Emergency Red** is used for urgent service requests and safety warnings; **Success Green** confirms completed forms or scheduled appointments.

## Typography

The typography strategy pairs the geometric strength of **Montserrat** with the high legibility of **Open Sans**.

- **Headlines**: Use Montserrat Bold for all headings to project confidence. For large display titles, a slight negative letter spacing is applied to create a more compact, impactful look.
- **Body Text**: Open Sans is the workhorse for all long-form content and descriptions, ensuring clarity across all devices.
- **Labels & UI**: Small UI elements like buttons, badges, and overlines use Montserrat to maintain the brand’s technical character even at small scales.

## Layout & Spacing

The design system utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

- **The 8px Rule**: All padding, margins, and component heights should be multiples of 8px to ensure mathematical harmony and visual balance.
- **Section Spacing**: Use large vertical breathing room (80px - 120px) between major landing page sections to reinforce the premium, professional nature of the service.
- **Content Width**: While the grid is fluid, main content containers are capped at 1280px to maintain optimal line lengths for readability.

## Elevation & Depth

Visual hierarchy is achieved through a combination of **tonal layers** and **ambient shadows**.

- **Surface Tiers**: Use the "Surface Subtle" (#F9FAFB) color for background sections to distinguish them from pure white cards.
- **Shadow Profile**: Shadows should be soft and diffused (e.g., `0 4px 20px rgba(0, 51, 102, 0.08)`). The shadow color is slightly tinted with Deep Navy to prevent a "dirty" look on cool-toned backgrounds.
- **Interactive Depth**: Cards and primary buttons should "lift" on hover. This is achieved by increasing the shadow blur and slightly shifting the Y-offset, paired with a subtle scale-up (1.02x) to provide tactile feedback to the user.

## Shapes

The shape language utilizes a "Rounded" (0.5rem / 8px) corner radius for most UI elements. This provides a modern, friendly feel without sacrificing the structured, "engineered" look required for a technical service provider.

- **Standard Components**: Buttons and Input fields use 8px.
- **Containers**: Large cards and content blocks use 16px (`rounded-lg`) to create a clear containerized feel.
- **Special Elements**: Success badges and tags may use a pill-shape for quick visual identification.

## Components

- **Buttons**:
    - **Primary**: Safety Yellow background with Deep Navy text. Bold Montserrat. High-contrast hover state (slight darkening of yellow).
    - **Secondary**: Deep Navy background with White text.
    - **Outline**: Electric Blue border and text, used for less urgent actions.
- **Cards**:
    - Featured services should be housed in cards with white backgrounds, 16px corner radius, and the standard ambient shadow. On hover, the border-top should gain a 4px Electric Blue "accent strip."
- **Input Fields**:
    - Large, accessible targets with 16px Open Sans text. Use a 2px Deep Navy border on focus to signal active engagement.
- **Service Chips**:
    - Small badges indicating "Residential," "Commercial," or "Emergency 24/7." These use Montserrat Bold in all-caps at 12px.
- **Action Banners**:
    - High-visibility strips for emergency services using Emergency Red background with white text, positioned at the top of the viewport or within the hero section.