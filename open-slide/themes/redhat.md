---
name: Red Hat
description: Dark-first enterprise brand theme with Red Hat Display/Text/Mono fonts, accent red, and subtle fade-up motion
---

# Red Hat

## Palette

| Role      | Value                      | Notes                                        |
| --------- | -------------------------- | -------------------------------------------- |
| bg        | `#151515`                  | Dark slides (title, dividers, closer)        |
| bgLight   | `#ffffff`                  | Content slides                               |
| text      | `#ffffff`                  | Primary copy on dark                         |
| textLight | `#151515`                  | Primary copy on light                        |
| accent    | `#ee0000`                  | Red Hat red — accent bar, markers, gradients |
| accentDk  | `#a60000`                  | Darker red for gradient endpoints, bullets   |
| divider   | `#292929`                  | Divider/section-break backgrounds            |
| surface   | `#1a1c20`                  | Terminal/code block backgrounds              |
| surfaceHi | `#222428`                  | Terminal title bar                           |
| muted     | `#6a6e73`                  | Secondary copy, captions                     |
| gray      | `#f0f0f0`                  | Light fills, placeholder backgrounds         |
| grayMid   | `#d2d2d2`                  | Dashed borders, secondary borders            |
| border    | `rgba(255,255,255,0.08)`   | Subtle separators on dark backgrounds        |

## Typography

- Display font: `"Red Hat Display", "Inter", system-ui, sans-serif` — weight 700–900 for headlines.
- Body font: `"Red Hat Text", "Inter", system-ui, sans-serif` — weight 400–600 for body copy.
- Mono font: `"Red Hat Mono", "JetBrains Mono", ui-monospace, monospace` — terminal, section tags, code.
- Load via Google Fonts:
  ```
  @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;600;700;900&family=Red+Hat+Text:wght@400;500;600&family=Red+Hat+Mono:wght@400;500&display=swap');
  ```
- Global letter-spacing: `-0.015em`. Headlines tighten to `-0.03em` / `-0.04em`.
- Type-scale overrides:
  - Hero title: 88–120 px
  - Section heading (dividers): 100 px, weight 900
  - Page heading: 56–72 px
  - Body text: 32–36 px
  - Caption / label: 18–22 px

## Layout

- Canvas: 1920 x 1080.
- Content padding: 120 px from edges (72 px top on content pages with AccentBar).
- Alignment: left-aligned. Headings flush-left, body copy with max-width ~1400 px.
- Two-column grids: `gap: 48–80px`.
- Footer bar: 80 px tall, logo bottom-right at 80 px inset.

## Fixed components

These are paste-ready. Copy them verbatim into a slide that uses this theme.

### Styles

Global CSS injected once per page. Includes font import, animations, gradient-text utility, and print fixes.

```tsx
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;600;700;900&family=Red+Hat+Text:wght@400;500;600&family=Red+Hat+Mono:wght@400;500&display=swap');
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes blink {
    0%, 49%   { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
  .fadeUp { opacity: 0; animation: fadeUp 0.9s cubic-bezier(.2,.7,.2,1) forwards; }
  .fadeIn { opacity: 0; animation: fadeIn 1.2s ease forwards; }
  .stream { opacity: 0; animation: fadeIn .45s ease forwards; }
  .caret::after {
    content: '';
    display: inline-block;
    width: 0.06em;
    height: 0.9em;
    background: currentColor;
    margin-left: 0.08em;
    vertical-align: baseline;
    animation: blink 1.05s steps(1) infinite;
  }
  .gradient-text {
    background: linear-gradient(90deg, #ee0000, #a60000);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .gradient-text.light {
    background-image: linear-gradient(90deg, #ee0000, #ff4444);
  }
  @media print {
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .gradient-text {
      -webkit-text-fill-color: #ee0000 !important;
      color: #ee0000 !important;
      background: none !important;
      -webkit-background-clip: unset !important;
      background-clip: unset !important;
    }
    .fadeUp, .fadeIn, .stream {
      opacity: 1 !important;
      animation: none !important;
    }
  }
`;
const Styles = () => <style>{styles}</style>;
```

### Footer

Bottom-right Red Hat logo. Use `dark` for dark backgrounds (white logo), default for light backgrounds (color logo).

```tsx
import rhLogoWhite from '@assets/logos/redhat-logo-white.png';
import rhLogoColor from '@assets/logos/redhat-logo-color.png';

const Footer = ({ dark = false }: { dark?: boolean }) => (
  <div style={{
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
    display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 80px',
  }}>
    <img src={dark ? rhLogoWhite : rhLogoColor} alt="Red Hat"
      style={{ height: 28, width: 'auto', objectFit: 'contain' }} />
  </div>
);
```

### AccentBar

5 px red bar at the top of light content pages.

```tsx
const AccentBar = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: '#ee0000' }} />
);
```

### SectionTag

Uppercase mono label above headings. Use `light` on white backgrounds.

```tsx
const SectionTag = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <div style={{
    fontFamily: '"Red Hat Mono", "JetBrains Mono", ui-monospace, monospace',
    fontSize: 18, letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: light ? '#6a6e73' : 'rgba(255,255,255,0.5)',
    marginBottom: 16,
  }}>
    {children}
  </div>
);
```

### Bullet

Red triangle marker with optional bold title + description. Use `dark={true}` (default) on light backgrounds, `dark={false}` on dark.

```tsx
const Bullet = ({ bold, text, dark = true }: { bold?: string; text: string; dark?: boolean }) => (
  <div style={{
    display: 'flex', gap: 24, alignItems: 'flex-start',
    color: dark ? '#151515' : '#ffffff',
    fontFamily: '"Red Hat Text", "Inter", system-ui, sans-serif',
  }}>
    <span style={{ color: dark ? '#a60000' : 'rgba(255,255,255,0.7)', fontSize: 24, marginTop: bold ? 8 : 6, flexShrink: 0 }}>&#9656;</span>
    <div>
      {bold && <div style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3 }}>{bold}</div>}
      <div style={{
        fontSize: bold ? 26 : 32, lineHeight: 1.5,
        color: bold ? (dark ? '#6a6e73' : 'rgba(255,255,255,0.65)') : undefined,
        marginTop: bold ? 4 : 0,
      }}>{text}</div>
    </div>
  </div>
);
```

### PatternBg

Subtle dot-grid overlay with radial fade. Use on light content pages.

```tsx
const PatternBg = () => (
  <div style={{
    position: 'absolute', inset: 0,
    backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.035) 1px, transparent 1px)',
    backgroundSize: '28px 28px',
    maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, transparent 72%)',
    WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, transparent 72%)',
    pointerEvents: 'none',
  }} />
);
```

### Terminal

macOS-style terminal window with traffic lights and streaming line animation.

```tsx
const Terminal = ({ lines, title = 'terminal' }: { lines: string[]; title?: string }) => (
  <div style={{
    flex: 1, minWidth: 0, borderRadius: 12, overflow: 'hidden',
    background: '#1a1c20', border: '1px solid rgba(255,255,255,0.08)',
    display: 'flex', flexDirection: 'column',
    boxShadow: '0 40px 80px -30px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.02)',
  }}>
    <div style={{
      height: 48, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 14,
      background: '#222428', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', gap: 9 }}>
        {['#ff5f56', '#ffbd2e', '#27c93f'].map(clr => (
          <span key={clr} style={{ width: 12, height: 12, borderRadius: '50%', background: clr, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.2)' }} />
        ))}
      </div>
      <div style={{
        flex: 1, textAlign: 'center',
        fontFamily: '"Red Hat Mono", "JetBrains Mono", ui-monospace, monospace',
        fontSize: 17, color: '#6a6e73', letterSpacing: '0.02em',
      }}>
        {title}
      </div>
      <div style={{ minWidth: 48 }} />
    </div>
    <div style={{
      flex: 1, padding: '24px 32px',
      fontFamily: '"Red Hat Mono", "JetBrains Mono", ui-monospace, monospace',
      fontSize: 19, lineHeight: 1.65, color: 'rgba(255,255,255,0.85)',
      overflow: 'hidden', background: '#151515', whiteSpace: 'pre',
    }}>
      {lines.map((line, i) => (
        <div key={i} className="stream" style={{ animationDelay: `${0.15 + i * 0.06}s`, minHeight: line === '' ? 12 : undefined }}>
          {line === '' ? <br /> : line.startsWith('$') ? (
            <><span style={{ color: '#27c93f' }}>$ </span><span style={{ color: '#ffffff' }}>{line.slice(2)}</span></>
          ) : line.startsWith('#') ? (
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>{line}</span>
          ) : line.startsWith('✔') || line.startsWith('✓') ? (
            <><span style={{ color: '#27c93f' }}>{line.charAt(0)} </span><span>{line.slice(2)}</span></>
          ) : (
            <span style={{ color: 'rgba(255,255,255,0.55)' }}>{line}</span>
          )}
        </div>
      ))}
      <div className="stream" style={{ animationDelay: `${0.15 + lines.length * 0.06 + 0.1}s`, display: 'flex', gap: 12, marginTop: 8 }}>
        <span style={{ color: '#27c93f' }}>$</span>
        <span className="caret" style={{ color: '#ffffff' }} />
      </div>
    </div>
  </div>
);
```

## Page archetypes

### Title slide
Dark background (`#151515`). AAP logo top-left, big display heading (88 px), subtitle below, presenter name in italic. Translucent `ansible-stack-white.png` watermark on right at 12% opacity. Footer dark.

### Divider slide
Dark background (`#292929`). Left-aligned heading at 100 px / weight 900 with `gradient-text light` on the accent phrase. Translucent `ansible-a-3d.png` bottom-right at 800 px height, 6% opacity. Footer dark. No AccentBar.

### Content (light)
White background. AccentBar + PatternBg at top. SectionTag above heading. Left-aligned heading at 56–72 px. Bullet lists or two-column grids below. Footer with color logo.

### Content (dark)
Dark background (`#151515`). No AccentBar, no PatternBg. Terminal blocks for CLI demos, side-by-side columns for comparison. Footer dark.

### Closer / Thank-you
Dark background (`#151515`). Large heading (120 px). Two-column layout: company description left, social links right. Footer dark.

## Assets

All shared logos live in `@assets/logos/`:

- `@assets/logos/redhat-logo-white.png` — white Red Hat logo (dark backgrounds)
- `@assets/logos/redhat-logo-color.png` — color Red Hat logo (light backgrounds)
- `@assets/logos/aap-logo-white.png` — Ansible Automation Platform wordmark (title slides)
- `@assets/logos/ansible-a-3d.png` — 3D Ansible "A" icon (divider watermark)
- `@assets/logos/ansible-stack-white.png` — Ansible stacked logo (title watermark)

## Motion

- Philosophy: **subtle** — entrance-only fade-up animations with staggered delays. No page-to-page transitions.
- Three reusable keyframes: `fadeUp` (18px Y translate + opacity), `fadeIn` (opacity only), `blink` (terminal cursor).
- Apply via utility classes: `.fadeUp`, `.fadeIn`, `.stream`. Stagger with inline `animationDelay`.
- All animations disabled in print via `@media print`.

## Aesthetic

Enterprise editorial with a dark-first bias. The Red Hat brand identity drives every decision: red accents are used sparingly for emphasis (accent bar, gradient text, bullet markers), never as backgrounds. Dark backgrounds dominate structural slides (title, dividers, closer) while white backgrounds carry content. Typography is confident — heavy display weights (700–900) with tight tracking create hierarchy without decoration. The dot-grid pattern and translucent logo watermarks add texture without distraction. Avoid rounded playful shapes, pastel colors, stock photography, and decorative illustrations. Let typography and negative space do the work.

## Example usage

```tsx
import type { Page } from '@open-slide/core';
import rhLogoWhite from '@assets/logos/redhat-logo-white.png';

const font = {
  display: '"Red Hat Display", "Inter", system-ui, sans-serif',
  sans: '"Red Hat Text", "Inter", system-ui, sans-serif',
  mono: '"Red Hat Mono", "JetBrains Mono", ui-monospace, monospace',
};

const Cover: Page = () => (
  <div style={{
    width: '100%', height: '100%', background: '#151515', color: '#ffffff',
    padding: '100px 120px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
    fontFamily: font.sans, position: 'relative',
  }}>
    <Styles />
    <SectionTag>Keynote</SectionTag>
    <h1 className="fadeUp" style={{
      fontFamily: font.display, fontSize: 88, fontWeight: 700,
      letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0,
    }}>
      Your Title Here
    </h1>
    <p className="fadeUp" style={{
      marginTop: 24, fontSize: 36, fontFamily: font.display, fontWeight: 600,
      color: 'rgba(255,255,255,0.85)', animationDelay: '0.3s',
    }}>
      A subtitle that explains the talk
    </p>
    <Footer dark />
  </div>
);
```
