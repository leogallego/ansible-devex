import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';

import rhLogoWhite from './assets/redhat-logo-white.png';
import rhLogoColor from './assets/redhat-logo-color.png';
import aapLogoWhite from './assets/aap-logo-white.png';
import ansibleA from './assets/ansible-a-3d.png';
import ansibleStack from './assets/ansible-stack-white.png';

export const design: DesignSystem = {
  palette: { bg: '#151515', text: '#ffffff', accent: '#ee0000' },
  fonts: {
    display: '"Red Hat Display", "Inter", system-ui, sans-serif',
    body: '"Red Hat Text", "Inter", system-ui, sans-serif',
  },
  typeScale: { hero: 120, body: 32 },
  radius: 12,
};

const c = {
  red: '#ee0000',
  redDark: '#a60000',
  redText: '#a60000',
  dark: '#292929',
  darkest: '#151515',
  white: '#ffffff',
  gray: '#f0f0f0',
  grayMid: '#d2d2d2',
  muted: '#6a6e73',
  text: '#151515',
  surface: '#1a1c20',
  surfaceHi: '#222428',
  border: 'rgba(255,255,255,0.08)',
};

const font = {
  sans: design.fonts.body,
  display: design.fonts.display,
  mono: '"Red Hat Mono", "JetBrains Mono", ui-monospace, monospace',
};

const fill = {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  position: 'relative' as const,
  letterSpacing: '-0.015em',
  fontFamily: font.sans,
};

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
`;
const Styles = () => <style>{styles}</style>;

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

const Footer = ({ dark = false, onRed = false }: { dark?: boolean; onRed?: boolean }) => (
  <div style={{
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
    display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 80px',
  }}>
    <img src={dark ? rhLogoWhite : rhLogoColor} alt="Red Hat"
      style={{
        height: 28, width: 'auto', objectFit: 'contain',
        filter: onRed ? 'drop-shadow(0 0 1px rgba(0,0,0,0.4)) drop-shadow(0 0 3px rgba(0,0,0,0.2))' : undefined,
      }} />
  </div>
);

const AccentBar = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: c.red }} />
);

const SectionTag = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <div style={{
    fontFamily: font.mono, fontSize: 18, letterSpacing: '0.12em',
    textTransform: 'uppercase' as const, color: light ? c.muted : 'rgba(255,255,255,0.5)',
    marginBottom: 16,
  }}>
    {children}
  </div>
);

const Icon = ({ children, size = 48, color = c.redText }: { children: React.ReactNode; size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const IconCreate = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </Icon>
);
const IconTest = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M9 12l2 2 4-4" />
  </Icon>
);
const IconDeploy = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </Icon>
);
const IconTerminal = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M6 12l4-4M6 12l4 4" /><line x1="14" y1="16" x2="18" y2="16" />
  </Icon>
);
const IconPackage = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
  </Icon>
);
const IconContainer = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" /><line x1="6" y1="6" x2="6" y2="10" />
    <line x1="10" y1="6" x2="10" y2="10" /><circle cx="12" cy="15" r="1" fill={color} stroke="none" />
  </Icon>
);
const IconCloud = ({ size, color }: { size?: number; color?: string }) => (
  <Icon size={size} color={color}>
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </Icon>
);

const Placeholder = ({ label, height = 320 }: { label: string; height?: number }) => (
  <div style={{
    flex: 1, minWidth: 400, height, borderRadius: 16,
    border: `2px dashed ${c.grayMid}`, background: `${c.gray}80`,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: 16, padding: 32,
  }}>
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={c.muted} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
    <span style={{ fontFamily: font.mono, fontSize: 16, color: c.muted, textAlign: 'center' }}>{label}</span>
  </div>
);

const Terminal = ({ lines, title = 'terminal' }: { lines: string[]; title?: string }) => (
  <div style={{
    flex: 1, minWidth: 0, borderRadius: 'var(--osd-radius)', overflow: 'hidden',
    background: c.surface, border: `1px solid ${c.border}`,
    display: 'flex', flexDirection: 'column',
    boxShadow: '0 40px 80px -30px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.02)',
  }}>
    <div style={{
      height: 48, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 14,
      background: c.surfaceHi, borderBottom: `1px solid ${c.border}`, flexShrink: 0,
    }}>
      <div style={{ display: 'flex', gap: 9 }}>
        {['#ff5f56', '#ffbd2e', '#27c93f'].map(clr => (
          <span key={clr} style={{ width: 12, height: 12, borderRadius: '50%', background: clr, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.2)' }} />
        ))}
      </div>
      <div style={{
        flex: 1, textAlign: 'center', fontFamily: font.mono, fontSize: 17,
        color: c.muted, letterSpacing: '0.02em',
      }}>
        {title}
      </div>
      <div style={{ minWidth: 48 }} />
    </div>
    <div style={{
      flex: 1, padding: '24px 32px', fontFamily: font.mono, fontSize: 19,
      lineHeight: 1.65, color: 'rgba(255,255,255,0.85)', overflow: 'hidden',
      background: c.darkest, whiteSpace: 'pre',
    }}>
      {lines.map((line, i) => (
        <div key={i} className="stream" style={{ animationDelay: `${0.15 + i * 0.06}s`, minHeight: line === '' ? 12 : undefined }}>
          {line === '' ? <br /> : line.startsWith('$') ? (
            <><span style={{ color: '#27c93f' }}>$ </span><span style={{ color: c.white }}>{line.slice(2)}</span></>
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
        <span className="caret" style={{ color: c.white }} />
      </div>
    </div>
  </div>
);

const Bullet = ({ bold, text, dark = true }: { bold?: string; text: string; dark?: boolean }) => (
  <div style={{
    display: 'flex', gap: 24, alignItems: 'flex-start',
    color: dark ? c.text : c.white, fontFamily: font.sans,
  }}>
    <span style={{ color: dark ? c.redText : 'rgba(255,255,255,0.7)', fontSize: 24, marginTop: bold ? 8 : 6, flexShrink: 0 }}>&#9656;</span>
    <div>
      {bold && <div style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3 }}>{bold}</div>}
      <div style={{
        fontSize: bold ? 26 : 32, lineHeight: 1.5,
        color: bold ? (dark ? c.muted : 'rgba(255,255,255,0.65)') : undefined,
        marginTop: bold ? 4 : 0,
      }}>{text}</div>
    </div>
  </div>
);

// ─── 01. Title ──────────────────────────────────────────────────────────────
const Title: Page = () => (
  <div style={{ ...fill, background: c.red, color: c.white }}>
    <Styles />
    <div style={{
      position: 'absolute', inset: 0, padding: '100px 120px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      <img src={aapLogoWhite} alt="Ansible Automation Platform"
        className="fadeUp"
        style={{ height: 56, width: 'auto', objectFit: 'contain', alignSelf: 'flex-start', animationDelay: '0.1s' }} />

      <div>
        <h1 className="fadeUp" style={{
          fontFamily: font.display, fontSize: 88, fontWeight: 700,
          letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0, animationDelay: '0.2s',
        }}>
          Closing the Loop
        </h1>
        <p className="fadeUp" style={{
          marginTop: 24, fontSize: 36, fontFamily: font.display, fontWeight: 600,
          color: 'rgba(255,255,255,0.85)', animationDelay: '0.35s',
        }}>
          Driving Enterprise Ansible Developer Experience
        </p>
        <p className="fadeUp" style={{
          marginTop: 24, fontSize: 22, fontFamily: font.sans,
          color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', animationDelay: '0.45s',
        }}>
          Presenter Name — Title
        </p>
      </div>

    </div>

    {/* Full-height decorative image on the right */}
    <img src={ansibleStack} alt="" className="fadeIn"
      style={{ position: 'absolute', right: 0, bottom: 0, height: '100%', width: 'auto', opacity: 0.12, animationDelay: '0.5s' }} />

    <Footer dark onRed />
  </div>
);

// ─── 02. The Onboarding Problem ─────────────────────────────────────────────
const OnboardingProblem: Page = () => {
  const steps = [
    { day: 'Day 1', label: 'Kick-off & paperwork', story: '"Welcome! Here\'s 40 pages of security training."', icon: '📋' },
    { day: 'Day 10', label: 'Laptop arrives', story: '"Your laptop is shipping. Use your personal one for now... actually, don\'t."', icon: '💻' },
    { day: 'Day 20', label: 'IDE & tools installed', story: '"IT approved VS Code. Python is pending a separate ticket."', icon: '🔧' },
    { day: 'Day 30', label: 'Git access granted', story: '"You can clone repos now. But you can\'t push — that\'s a different form."', icon: '🔑' },
    { day: 'Day 60', label: 'Still waiting...', story: '"Your sudo request is in queue. Current wait: 3-4 weeks."', icon: '⏳', alert: true },
  ];
  return (
    <div style={{ ...fill, background: c.white, color: c.text }}>
      <Styles />
      <PatternBg />
      <AccentBar />
      <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SectionTag light>The Challenge</SectionTag>
        <h2 className="fadeUp" style={{
          fontFamily: font.display, fontSize: 72, fontWeight: 700,
          letterSpacing: '-0.03em', margin: 0, lineHeight: 1.1,
        }}>
          The onboarding problem
        </h2>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', marginTop: 32 }}>
          <div style={{ display: 'flex', gap: 20, width: '100%' }}>
            {steps.map((s, i) => (
              <div key={s.day} className="fadeUp" style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                animationDelay: `${0.3 + i * 0.2}s`,
              }}>
                {/* Day badge */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
                }}>
                  <span style={{
                    fontFamily: font.display, fontSize: 22, fontWeight: 700,
                    color: s.alert ? c.red : c.text,
                  }}>
                    {s.day}
                  </span>
                  <div style={{
                    flex: 1, height: 2,
                    background: s.alert ? c.red : c.grayMid,
                    opacity: i < 4 ? 1 : 0,
                  }} />
                </div>

                {/* Card */}
                <div style={{
                  background: s.alert ? c.red : c.gray,
                  borderRadius: 14, padding: '28px 24px',
                  flex: 1, display: 'flex', flexDirection: 'column', gap: 16,
                  color: s.alert ? c.white : c.text,
                }}>
                  <div style={{ fontSize: 40, textAlign: 'center' }}>{s.icon}</div>
                  <div style={{
                    fontFamily: font.display, fontSize: 20, fontWeight: 700,
                    textAlign: 'center',
                  }}>
                    {s.label}
                  </div>
                  <div style={{
                    fontFamily: font.sans, fontSize: 17, lineHeight: 1.5,
                    color: s.alert ? 'rgba(255,255,255,0.85)' : c.muted,
                    fontStyle: 'italic', textAlign: 'center',
                  }}>
                    {s.story}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="fadeUp" style={{
          textAlign: 'center', fontFamily: font.display, fontSize: 28, fontWeight: 700,
          color: c.redText, marginTop: 24, animationDelay: '1.3s',
        }}>
          Months before writing a single playbook
        </p>
      </div>
      <Footer />
    </div>
  );
};

// ─── 03. What if 5 minutes? ─────────────────────────────────────────────────
const FiveMinutes: Page = () => (
  <div style={{ ...fill, background: c.dark, color: c.white }}>
    <Styles />
    <div style={{
      position: 'absolute', inset: 0, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 120, fontWeight: 900,
        letterSpacing: '-0.04em', lineHeight: 1.0, textAlign: 'center', margin: 0,
      }}>
        What if it took<br/>
        <span style={{ background: 'linear-gradient(90deg, #ee0000, #ff4444)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>5 MINUTES?</span>
      </h2>
    </div>
    <Footer dark />
  </div>
);

// ─── 04. ADT Toolchain ──────────────────────────────────────────────────────
const Toolchain: Page = () => {
  const groups = [
    { title: 'Create', color: '#2e7d6f', icon: <IconCreate size={64} color="#2e7d6f" />, items: ['ansible-creator', 'ansible-dev-environment', 'ansible-core (galaxy)', 'VS Code extension'] },
    { title: 'Test', color: '#b8860b', icon: <IconTest size={64} color="#b8860b" />, items: ['ansible-lint', 'molecule', 'pytest-ansible', 'tox-ansible'] },
    { title: 'Deploy', color: '#a60000', icon: <IconDeploy size={64} color="#a60000" />, items: ['ansible-builder', 'ansible-navigator', 'ansible-sign'] },
  ];
  return (
    <div style={{ ...fill, background: c.white, color: c.text }}>
      <Styles />
      <PatternBg />
      <AccentBar />
      <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SectionTag light>The Toolchain</SectionTag>
        <h2 className="fadeUp" style={{
          fontFamily: font.display, fontSize: 72, fontWeight: 700,
          letterSpacing: '-0.03em', margin: 0, lineHeight: 1.1, animationDelay: '0.1s',
        }}>
          Ansible Development Tools
        </h2>
        <p className="fadeUp" style={{ marginTop: 16, fontSize: 26, color: c.muted, animationDelay: '0.2s' }}>
          One toolchain across the entire content lifecycle.
        </p>

        <div style={{
          flex: 1, display: 'flex', gap: 32, marginTop: 40, minHeight: 0,
        }}>
          {groups.map((g, gi) => (
            <div key={g.title} className="fadeUp" style={{
              flex: 1, background: c.gray, borderRadius: 16,
              padding: '36px 40px', display: 'flex', flexDirection: 'column',
              animationDelay: `${0.3 + gi * 0.12}s`,
              borderTop: `4px solid ${g.color}`,
              border: `1px solid rgba(0,0,0,0.06)`,
              borderTopWidth: 4, borderTopColor: g.color,
            }}>
              <div style={{ marginBottom: 16 }}>{g.icon}</div>
              <h3 style={{
                fontFamily: font.display, fontSize: 36, fontWeight: 700,
                color: g.color, margin: '0 0 20px',
              }}>
                {g.title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
                {g.items.map(item => (
                  <div key={item} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    fontFamily: font.mono, fontSize: 26, color: c.text,
                  }}>
                    <span style={{ color: g.color, fontSize: 16 }}>&#9656;</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// ─── 05. Maturity Path ──────────────────────────────────────────────────────
const MaturityPath: Page = () => {
  const stages = [
    { title: 'Crawl', method: 'pip / uv', time: '~30 min', level: 'Low consistency', filled: false, icon: <IconTerminal size={72} color={c.text} /> },
    { title: 'Walk', method: 'RPM', time: '~15 min', level: 'Medium consistency', filled: false, icon: <IconPackage size={72} color={c.text} /> },
    { title: 'Run', method: 'Dev Container', time: '~10 min', level: 'High consistency', filled: true, icon: <IconContainer size={72} color={c.white} /> },
    { title: 'Fly', method: 'Dev Spaces', time: '~5 min', level: 'Highest consistency', filled: true, icon: <IconCloud size={72} color={c.white} /> },
  ];
  return (
    <div style={{ ...fill, background: c.white, color: c.text }}>
      <Styles />
      <PatternBg />
      <AccentBar />
      <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SectionTag light>The Journey</SectionTag>
        <h2 className="fadeUp" style={{
          fontFamily: font.display, fontSize: 72, fontWeight: 700,
          letterSpacing: '-0.03em', margin: 0, lineHeight: 1.1, animationDelay: '0.1s',
        }}>
          The <span style={{ background: 'linear-gradient(90deg, #ee0000, #a60000)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>maturity path</span>
        </h2>

        <div style={{ flex: 1, display: 'flex', gap: 32, marginTop: 40, alignItems: 'stretch', minHeight: 0 }}>
          {stages.map((s, i) => (
            <div key={s.title} className="fadeUp" style={{
              flex: 1, borderRadius: 16, padding: '40px 32px',
              background: s.filled ? c.red : c.gray,
              color: s.filled ? c.white : c.text,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 20, textAlign: 'center',
              animationDelay: `${0.2 + i * 0.12}s`,
            }}>
              <div style={{ marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontFamily: font.display, fontSize: 40, fontWeight: 700 }}>{s.title}</div>
              <div style={{ fontFamily: font.sans, fontSize: 22, opacity: 0.8 }}>{s.method}</div>
              <div style={{
                fontFamily: font.display, fontSize: 52, fontWeight: 900,
                color: s.filled ? c.white : c.redText,
              }}>
                {s.time}
              </div>
              <div style={{
                fontFamily: font.mono, fontSize: 16,
                color: s.filled ? 'rgba(255,255,255,0.6)' : c.muted,
              }}>
                {s.level}
              </div>
            </div>
          ))}
        </div>

        <div className="fadeUp" style={{
          textAlign: 'center', fontFamily: font.mono, fontSize: 18,
          color: c.muted, marginTop: 20, animationDelay: '0.8s',
        }}>
          ← Less governed &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; More governed →
        </div>
      </div>
      <Footer />
    </div>
  );
};

// ─── 06. Content Lifecycle ──────────────────────────────────────────────────
const ContentLifecycle: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>The Workflow</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 72, fontWeight: 700,
        letterSpacing: '-0.03em', margin: 0, lineHeight: 1.1, animationDelay: '0.1s',
      }}>
        The <span style={{ background: 'linear-gradient(90deg, #ee0000, #a60000)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>content lifecycle</span>
      </h2>

      {/* Two-column flow diagram */}
      <div className="fadeUp" style={{
        flex: 1, display: 'flex', gap: 24, marginTop: 32, animationDelay: '0.2s',
        alignItems: 'stretch',
      }}>
        {/* Inner Loop column */}
        <div style={{
          flex: 1, borderRadius: 20, border: `2px solid ${c.redText}`,
          padding: '28px 36px', display: 'flex', flexDirection: 'column',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
            <span style={{ fontFamily: font.display, fontSize: 36, fontWeight: 700, color: c.redText }}>Inner Loop</span>
            <span style={{ fontFamily: font.mono, fontSize: 20, color: c.muted }}>developer · seconds</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
            {[
              { step: 'Write', tool: 'ansible-creator / VS Code', accent: false },
              { step: 'Lint', tool: 'ansible-lint --fix', accent: false },
              { step: 'Test', tool: 'molecule test', accent: false },
              { step: 'Iterate', tool: 'fix → re-lint → re-test', accent: false },
            ].map((s, i) => (
              <div key={s.step}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 16, padding: '10px 0',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: c.redText, color: c.white,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: font.display, fontSize: 18, fontWeight: 700, flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <div>
                    <div style={{ fontFamily: font.display, fontSize: 30, fontWeight: 700, color: c.text }}>{s.step}</div>
                    <div style={{ fontFamily: font.mono, fontSize: 20, color: c.muted }}>{s.tool}</div>
                  </div>
                </div>
                {i < 3 && (
                  <div style={{ marginLeft: 19, width: 2, height: 10, background: c.redText, opacity: 0.3 }} />
                )}
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 20, padding: '10px 16px', borderRadius: 8,
            background: `${c.redText}08`, border: `1px solid ${c.redText}20`,
            fontFamily: font.sans, fontSize: 16, color: c.muted, textAlign: 'center',
          }}>
            Fast feedback, local or container
          </div>
        </div>

        {/* Push connector */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: 8, width: 80, flexShrink: 0,
        }}>
          <div style={{
            fontFamily: font.display, fontSize: 16, fontWeight: 700,
            color: c.red, textTransform: 'uppercase' as const, letterSpacing: '0.1em',
          }}>
            Push
          </div>
          <div style={{ position: 'relative', width: 56, height: 56 }}>
            <div style={{
              position: 'absolute', top: '50%', left: 0, right: 14,
              height: 3, background: c.red, transform: 'translateY(-50%)',
            }} />
            <div style={{
              position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
              width: 0, height: 0,
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
              borderLeft: `14px solid ${c.red}`,
            }} />
          </div>
          <div style={{
            fontFamily: font.display, fontSize: 16, fontWeight: 700,
            color: c.red, textTransform: 'uppercase' as const, letterSpacing: '0.1em',
          }}>
            Merge
          </div>
        </div>

        {/* Outer Loop column */}
        <div style={{
          flex: 1, borderRadius: 20, border: `2px solid ${c.dark}`,
          padding: '28px 36px', display: 'flex', flexDirection: 'column',
          background: c.dark, color: c.white,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
            <span style={{ fontFamily: font.display, fontSize: 36, fontWeight: 700, color: c.white }}>Outer Loop</span>
            <span style={{ fontFamily: font.mono, fontSize: 20, color: 'rgba(255,255,255,0.4)' }}>CI/CD · minutes</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
            {[
              { step: 'PR Quality Gates', tool: 'ansible-lint + molecule CI' },
              { step: 'Build EE', tool: 'ansible-builder → registry' },
              { step: 'Controller Sync', tool: 'webhook → project update' },
              { step: 'Deploy & Run', tool: 'job template execution' },
              { step: 'Monitor', tool: 'Grafana dashboards' },
            ].map((s, i) => (
              <div key={s.step}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 16, padding: '8px 0',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: i === 3 ? c.red : 'rgba(255,255,255,0.12)',
                    color: c.white,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: font.display, fontSize: 18, fontWeight: 700, flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <div>
                    <div style={{ fontFamily: font.display, fontSize: 30, fontWeight: 700 }}>{s.step}</div>
                    <div style={{ fontFamily: font.mono, fontSize: 20, color: 'rgba(255,255,255,0.45)' }}>{s.tool}</div>
                  </div>
                </div>
                {i < 4 && (
                  <div style={{ marginLeft: 19, width: 2, height: 8, background: 'rgba(255,255,255,0.15)' }} />
                )}
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 16, padding: '10px 16px', borderRadius: 8,
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            fontFamily: font.sans, fontSize: 16, color: 'rgba(255,255,255,0.4)', textAlign: 'center',
          }}>
            Automated gates, compliance scanning
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 07. Scaling Divider ────────────────────────────────────────────────────
const ScalingDivider: Page = () => (
  <div style={{ ...fill, background: c.dark, color: c.white }}>
    <Styles />
    <div style={{
      position: 'absolute', inset: 0, display: 'flex',
      alignItems: 'center', padding: '0 120px',
    }}>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 100, fontWeight: 900,
        letterSpacing: '-0.04em', lineHeight: 1.05, margin: 0,
      }}>
        Scaling to<br/><span style={{ background: 'linear-gradient(90deg, #ee0000, #ff4444)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>the enterprise</span>
      </h2>
      <img src={ansibleA} alt="" style={{
        position: 'absolute', right: 120, bottom: 80,
        height: 400, width: 'auto', opacity: 0.06,
      }} />
    </div>
    <Footer dark />
  </div>
);

// ─── 08. Dev Containers ─────────────────────────────────────────────────────
const DevContainers: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>Enterprise Scale</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 72, fontWeight: 700,
        letterSpacing: '-0.03em', margin: 0, lineHeight: 1.1, animationDelay: '0.1s',
      }}>
        Dev Containers: <span style={{ background: 'linear-gradient(90deg, #ee0000, #a60000)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>team consistency</span>
      </h2>
      <p className="fadeUp" style={{ marginTop: 16, fontSize: 26, color: c.muted, animationDelay: '0.2s' }}>
        Same image, same tools, same config — every developer, every time.
      </p>
      <div style={{ display: 'flex', gap: 40, flex: 1, minHeight: 0, marginTop: 36, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Bullet bold=".devcontainer/" text="lives in the repo, versioned with code" />
          <Bullet bold="Cross-platform" text="works on any OS with VS Code + container runtime" />
          <Bullet bold="Nested Podman" text="molecule and ansible-builder run inside the container" />
          <Bullet bold="Two editions" text="free community image or Red Hat supported variant" />
        </div>
        <Terminal title="devcontainer.json" lines={[
          '# .devcontainer/devcontainer.json',
          '{',
          '  "image": "registry.redhat.io/',
          '    ansible-automation-platform-26/',
          '    ansible-dev-tools-rhel9:latest",',
          '  "customizations": {',
          '    "vscode": {',
          '      "extensions": [',
          '        "redhat.ansible"',
          '      ]',
          '    }',
          '  }',
          '}',
        ]} />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 09. Dev Spaces ─────────────────────────────────────────────────────────
const DevSpaces: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>Enterprise Scale</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 72, fontWeight: 700,
        letterSpacing: '-0.03em', margin: 0, lineHeight: 1.1, animationDelay: '0.1s',
      }}>
        Dev Spaces: <span style={{ background: 'linear-gradient(90deg, #ee0000, #a60000)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>zero local deps</span>
      </h2>
      <p className="fadeUp" style={{ marginTop: 16, fontSize: 26, color: c.muted, animationDelay: '0.2s' }}>
        Browser-only — ~5 minutes from nothing to coding.
      </p>
      <div style={{ display: 'flex', gap: 40, flex: 1, minHeight: 0, marginTop: 36, alignItems: 'flex-start' }}>
        <Terminal title="devfile.yaml" lines={[
          '# devfile.yaml',
          'schemaVersion: 2.2.2',
          'metadata:',
          '  name: ansible-workspace',
          'components:',
          '  - name: tooling',
          '    container:',
          '      image: ghcr.io/ansible/',
          '        ansible-devspaces:latest',
          '      memoryLimit: 4Gi',
        ]} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Bullet bold="Centrally governed" text="platform team manages the workspace configuration" />
          <Bullet bold="devfile.yaml" text="defines everything: tools, config, extensions" />
          <Bullet bold="One-click start" text="developers click Create — no local setup" />
          <Bullet bold="Requirements" text="OpenShift + Dev Spaces operator" />
        </div>
      </div>
    </div>
    <div style={{
      position: 'absolute', bottom: 24, left: 120,
      fontFamily: font.mono, fontSize: 14, color: c.muted,
    }}>
      Downstream supported image available with AAP 2.7
    </div>
    <Footer />
  </div>
);

// ─── 10. AI-Assisted Development Overview ───────────────────────────────────
const AgentLine = ({ role, text, delay }: { role: string; text: string; delay: number }) => (
  <div className="stream" style={{ display: 'flex', gap: 20, animationDelay: `${delay}s`, alignItems: 'baseline' }}>
    <span style={{
      fontFamily: font.mono, fontSize: 13, fontWeight: 600, letterSpacing: '0.05em',
      color: role === 'YOU' ? '#27c93f' : role === 'TOOL' ? c.muted : '#ee0000',
      flexShrink: 0, width: 48,
    }}>{role}</span>
    <span style={{
      fontFamily: font.mono, fontSize: 17, lineHeight: 1.5,
      color: role === 'TOOL' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.85)',
    }}>{text}</span>
  </div>
);

const AIOverview: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>AI-Assisted Development</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 40px', lineHeight: 1.05,
      }}>
        AI-assisted <span style={{ background: 'linear-gradient(90deg, #ee0000, #a60000)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>development</span>
      </h2>

      <div style={{ display: 'flex', gap: 48, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
        {/* Left: two MCP bullet groups */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 36 }}>
          <div>
            <h3 style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, color: c.redText, margin: '0 0 16px' }}>
              Ansible Devtools MCP
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Bullet bold="Lint & auto-fix" text="run ansible-lint with --fix" />
              <Bullet bold="Scaffold" text="create roles, collections, playbooks" />
              <Bullet bold="Navigate" text="explore collection structure and docs" />
              <Bullet bold="Build" text="create execution environment images" />
            </div>
          </div>
          <div>
            <h3 style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, color: c.redText, margin: '0 0 16px' }}>
              Ansible Automation Platform MCP
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Bullet bold="Job management" text="launch templates, check status" />
              <Bullet bold="Inventory" text="query hosts, groups, variables" />
              <Bullet bold="Monitoring" text="controller health, node status" />
              <Bullet bold="Gateway API" text="AAP 2.6.4+ unified endpoints" />
            </div>
          </div>
        </div>

        {/* Right: Claude-style agent terminal */}
        <div className="fadeUp" style={{
          flex: 1, borderRadius: 'var(--osd-radius)', overflow: 'hidden',
          background: c.surface, border: `1px solid ${c.border}`,
          display: 'flex', flexDirection: 'column', animationDelay: '0.2s',
          boxShadow: '0 40px 80px -30px rgba(0,0,0,0.45)',
        }}>
          <div style={{
            height: 44, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 14,
            background: c.surfaceHi, borderBottom: `1px solid ${c.border}`, flexShrink: 0,
          }}>
            <div style={{ display: 'flex', gap: 9 }}>
              {['#ff5f56', '#ffbd2e', '#27c93f'].map(clr => (
                <span key={clr} style={{ width: 10, height: 10, borderRadius: '50%', background: clr }} />
              ))}
            </div>
            <div style={{ flex: 1, textAlign: 'center', fontFamily: font.mono, fontSize: 18, color: 'rgba(255,255,255,0.7)' }}>
              AI agent
            </div>
            <div style={{ minWidth: 40 }} />
          </div>
          <div style={{ flex: 1, padding: '20px 28px', background: c.darkest, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* 1: scaffold a role in my collection */}
            <div className="stream" style={{ animationDelay: '0.3s', textAlign: 'right' }}>
              <div style={{
                display: 'inline-block', padding: '8px 18px', borderRadius: 8,
                background: 'rgba(255,255,255,0.08)', fontFamily: font.mono, fontSize: 22, color: c.white,
              }}>
                scaffold a network-backup role in my collection
              </div>
            </div>
            <div className="stream" style={{ animationDelay: '0.5s', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#27c93f', flexShrink: 0 }} />
                <span style={{ fontFamily: font.mono, fontSize: 20, fontWeight: 600, color: c.white }}>ansible-creator</span>
                <span style={{ fontFamily: font.mono, fontSize: 16, color: 'rgba(255,255,255,0.35)' }}>init role network_backup --collection acme.network</span>
              </div>
              <div style={{ fontFamily: font.sans, fontSize: 20, color: 'rgba(255,255,255,0.65)' }}>
                ✔ Role scaffolded at roles/network_backup/
              </div>
            </div>
            {/* 2: build EE with custom collection */}
            <div className="stream" style={{ animationDelay: '0.9s', textAlign: 'right' }}>
              <div style={{
                display: 'inline-block', padding: '8px 18px', borderRadius: 8,
                background: 'rgba(255,255,255,0.08)', fontFamily: font.mono, fontSize: 22, color: c.white,
              }}>
                build the EE with my custom collection
              </div>
            </div>
            <div className="stream" style={{ animationDelay: '1.1s', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#27c93f', flexShrink: 0 }} />
                <span style={{ fontFamily: font.mono, fontSize: 20, fontWeight: 600, color: c.white }}>ansible-builder</span>
                <span style={{ fontFamily: font.mono, fontSize: 16, color: 'rgba(255,255,255,0.35)' }}>build -t acme-net-ee:latest</span>
              </div>
              <div style={{ fontFamily: font.sans, fontSize: 20, color: 'rgba(255,255,255,0.65)' }}>
                ✔ Built acme-net-ee:latest (includes acme.network)
              </div>
            </div>
            {/* 3: pushed to registry, created JT, run it */}
            <div className="stream" style={{ animationDelay: '1.5s', textAlign: 'right' }}>
              <div style={{
                display: 'inline-block', padding: '8px 18px', borderRadius: 8,
                background: 'rgba(255,255,255,0.08)', fontFamily: font.mono, fontSize: 22, color: c.white,
              }}>
                pushed to registry and created the job template, run it
              </div>
            </div>
            <div className="stream" style={{ animationDelay: '1.7s', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#27c93f', flexShrink: 0 }} />
                <span style={{ fontFamily: font.mono, fontSize: 20, fontWeight: 600, color: c.white }}>aap: launch</span>
                <span style={{ fontFamily: font.mono, fontSize: 16, color: 'rgba(255,255,255,0.35)' }}>network-backup → dc-west</span>
              </div>
              <div style={{ fontFamily: font.sans, fontSize: 20, color: 'rgba(255,255,255,0.65)' }}>
                ✔ Job 1847 launched, 12 hosts across 3 groups
              </div>
            </div>
            {/* 4: verify hosts */}
            <div className="stream" style={{ animationDelay: '2.1s', textAlign: 'right' }}>
              <div style={{
                display: 'inline-block', padding: '8px 18px', borderRadius: 8,
                background: 'rgba(255,255,255,0.08)', fontFamily: font.mono, fontSize: 22, color: c.white,
              }}>
                verify the hosts, any failures?
              </div>
            </div>
            <div className="stream" style={{ animationDelay: '2.3s', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#27c93f', flexShrink: 0 }} />
                <span style={{ fontFamily: font.mono, fontSize: 20, fontWeight: 600, color: c.white }}>aap: host status</span>
                <span style={{ fontFamily: font.mono, fontSize: 16, color: 'rgba(255,255,255,0.35)' }}>job 1847</span>
              </div>
              <div style={{ fontFamily: font.sans, fontSize: 20, color: 'rgba(255,255,255,0.65)' }}>
                ✔ 12/12 successful, 0 failures
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 11. Next Steps ─────────────────────────────────────────────────────────
const NextSteps: Page = () => {
  const steps = [
    { n: '1', title: 'Development Assessment', desc: '1-day workshop: map current state, identify gaps, define target maturity' },
    { n: '2', title: 'Proof of Concept', desc: 'Red Hat deploys ADT + Dev Container/Spaces for one pilot team' },
    { n: '3', title: 'Implementation & Onboarding', desc: 'Roll out tooling org-wide, customize images per domain' },
    { n: '4', title: 'Data-Driven Improvement', desc: 'Grafana dashboards: build times, lint violations, test coverage trends' },
  ];
  return (
    <div style={{ ...fill, background: c.white, color: c.text }}>
      <Styles />
      <AccentBar />
      <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SectionTag light>Next Steps</SectionTag>
        <h2 className="fadeUp" style={{
          fontFamily: font.display, fontSize: 72, fontWeight: 700,
          letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1.1,
        }}>
          What should I do <span style={{ background: 'linear-gradient(90deg, #ee0000, #a60000)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>next?</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {steps.map((s, i) => (
            <div key={s.n} className="fadeUp" style={{
              display: 'flex', gap: 24, alignItems: 'center',
              animationDelay: `${0.2 + i * 0.12}s`,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', background: c.red,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: font.display, fontSize: 24, fontWeight: 700, color: c.white,
                flexShrink: 0,
              }}>
                {s.n}
              </div>
              <div>
                <div style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700 }}>{s.title}</div>
                <div style={{ fontFamily: font.sans, fontSize: 22, color: c.muted, marginTop: 4 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// ─── 12. ADT Deep Dive Divider ──────────────────────────────────────────────
const ADTDivider: Page = () => (
  <div style={{ ...fill, background: c.dark, color: c.white }}>
    <Styles />
    <div style={{
      position: 'absolute', inset: 0, padding: '0 120px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <div style={{ fontFamily: font.mono, fontSize: 18, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
        Deep Dive
      </div>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 100, fontWeight: 900,
        letterSpacing: '-0.04em', lineHeight: 1.05, margin: 0,
      }}>
        Ansible Development Tools<br/><span style={{ background: 'linear-gradient(90deg, #ee0000, #ff4444)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>a closer look</span>
      </h2>
    </div>
    <img src={ansibleA} alt="" style={{
      position: 'absolute', right: 80, bottom: 80,
      height: 500, width: 'auto', opacity: 0.06,
    }} />
    <Footer dark />
  </div>
);

// ─── 12b. ADT Refresher ─────────────────────────────────────────────────────
const ADTRefresher: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>Module A — Recap</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 56px', lineHeight: 1.05,
      }}>
        Ansible Development Tools at a glance
      </h2>
      <div style={{ display: 'flex', gap: 48, flex: 1, minHeight: 0, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Bullet bold="One toolchain" text="ansible-creator, ansible-lint, molecule, ansible-builder, ansible-navigator, ansible-sign, and more" />
          <Bullet bold="Create, Test, Deploy" text="covers the entire content lifecycle from first scaffold to production" />
          <Bullet bold="Install methods" text="uv/pip (Crawl), RPM (Walk), Dev Container (Run), Dev Spaces (Fly)" />
          <Bullet bold="VS Code extension" text="inline linting, syntax highlighting, and auto-completion as you type" />
        </div>
        <Terminal title="adt" lines={[
          '$ adt --version',
          'ansible-builder        3.1.1',
          'ansible-core           2.17.8',
          'ansible-creator        26.4.3',
          'ansible-dev-environment 26.4.0',
          'ansible-lint           26.4.0',
          'ansible-navigator      26.4.0',
          'ansible-sign           0.1.5',
          'molecule               26.4.0',
          'pytest-ansible         26.4.0',
          'tox-ansible            26.4.0',
        ]} />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 13. ansible-creator ────────────────────────────────────────────────────
const AnsibleCreator: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>Module A — Create</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 56px', lineHeight: 1.05,
      }}>
        ansible-creator
      </h2>
      <div style={{ display: 'flex', gap: 40, flex: 1, minHeight: 0, alignItems: 'flex-start' }}>
        {/* Feature cards on the LEFT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            { cmd: 'init collection', desc: 'Scaffold a full collection with galaxy.yml, plugins, roles, and tests' },
            { cmd: 'init role', desc: 'Create a role with molecule, argument specs, and CI templates included' },
            { cmd: 'init playbook', desc: 'Generate a playbook project with inventory structure and lint config' },
          ].map((item, i) => (
            <div key={item.cmd} className="fadeUp" style={{
              background: c.gray, borderRadius: 12, padding: '20px 24px',
              borderLeft: `4px solid ${i === 0 ? c.red : c.grayMid}`,
              animationDelay: `${0.3 + i * 0.1}s`,
            }}>
              <div style={{ fontFamily: font.mono, fontSize: 22, fontWeight: 600, color: c.redText }}>{item.cmd}</div>
              <div style={{ fontFamily: font.sans, fontSize: 22, color: c.muted, marginTop: 6, lineHeight: 1.4 }}>{item.desc}</div>
            </div>
          ))}
          <div className="fadeUp" style={{
            fontFamily: font.mono, fontSize: 22, color: c.muted, textAlign: 'center',
            padding: '12px 0', animationDelay: '0.6s',
          }}>
            Opinionated structure · no more copy-paste boilerplate
          </div>
        </div>
        {/* Terminal on the RIGHT */}
        <Terminal title="ansible-creator" lines={[
          '$ ansible-creator init collection myorg.myapp',
          '✔ Collection project created at ./myorg.myapp',
          '',
          '  myorg/myapp/',
          '  ├── galaxy.yml',
          '  ├── plugins/',
          '  ├── roles/',
          '  ├── tests/',
          '  ├── molecule/',
          '  ├── .devcontainer/',
          '  ├── .ansible-lint',
          '  └── README.md',
        ]} />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 13b. ansible-dev-environment ───────────────────────────────────────────
const AnsibleDevEnv: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>Module A — Create</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 56px', lineHeight: 1.05,
      }}>
        ansible-dev-environment
      </h2>
      <div style={{ display: 'flex', gap: 40, flex: 1, minHeight: 0, alignItems: 'flex-start' }}>
        {/* Terminal on the LEFT */}
        <Terminal title="ade" lines={[
          '$ ade install ansible.netcommon',
          '✔ Installed ansible.netcommon 7.1.0',
          '',
          '$ ade tree ansible.netcommon',
          '  ansible.netcommon 7.1.0',
          '  ├── ansible.utils 5.1.2',
          '  └── ansible.network 1.0.0',
          '',
          '$ ade list',
          '  ansible.netcommon  7.1.0',
          '  ansible.utils      5.1.2',
          '  cisco.ios          9.0.3',
        ]} />
        {/* Insight cards on the RIGHT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            { cmd: 'ade install', desc: 'Install collections into isolated environments with dependency resolution' },
            { cmd: 'ade tree', desc: 'Visualize the full dependency graph before committing to an install' },
            { cmd: 'ade list', desc: 'Audit which collections and versions are currently installed' },
            { cmd: 'ade check', desc: 'Verify installed state matches your requirements file' },
          ].map((item, i) => (
            <div key={item.cmd} className="fadeUp" style={{
              background: c.gray, borderRadius: 12, padding: '20px 24px',
              borderLeft: `4px solid ${i === 0 ? c.red : c.grayMid}`,
              animationDelay: `${0.3 + i * 0.1}s`,
            }}>
              <div style={{ fontFamily: font.mono, fontSize: 22, fontWeight: 600, color: c.redText }}>{item.cmd}</div>
              <div style={{ fontFamily: font.sans, fontSize: 22, color: c.muted, marginTop: 6, lineHeight: 1.4 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 14. ansible-lint ───────────────────────────────────────────────────────
const CodeLine = ({ text, color, bg, prefix }: { text: string; color: string; bg?: string; prefix?: string }) => (
  <div style={{
    fontFamily: font.mono, fontSize: 18, lineHeight: 2, padding: '0 16px',
    color, background: bg || 'transparent', whiteSpace: 'pre',
  }}>
    {prefix && <span style={{ color: prefix === '-' ? '#d32f2f' : '#2e7d32', marginRight: 12, fontWeight: 700 }}>{prefix}</span>}
    {text}
  </div>
);

const AnsibleLint: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>Module A — Test</SectionTag>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
        <h2 className="fadeUp" style={{
          fontFamily: font.display, fontSize: 80, fontWeight: 700,
          letterSpacing: '-0.035em', margin: 0, lineHeight: 1.05,
        }}>
          ansible-lint
        </h2>
        <span className="fadeUp" style={{
          fontFamily: font.mono, fontSize: 22, color: c.muted, animationDelay: '0.1s',
        }}>
          --fix
        </span>
      </div>

      {/* Profile progression bar */}
      <div className="fadeUp" style={{
        display: 'flex', gap: 8, alignItems: 'center', marginTop: 24, animationDelay: '0.15s',
      }}>
        {['min', 'basic', 'moderate', 'safety', 'shared', 'production'].map((p, i) => {
          const shades = ['#e8e8e8', '#d0d0d0', '#a0a0a0', '#707070', '#404040', '#1a1a1a'];
          return (
            <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                fontFamily: font.mono, fontSize: 18, padding: '6px 14px',
                borderRadius: 8, background: shades[i],
                color: i <= 2 ? c.text : c.white,
              }}>
                {p}
              </span>
              {i < 5 && <span style={{ color: c.muted, fontSize: 14 }}>→</span>}
            </div>
          );
        })}
      </div>

      {/* Before / After code diff — full width */}
      <div className="fadeUp" style={{
        flex: 1, display: 'flex', gap: 24, marginTop: 32, minHeight: 0, animationDelay: '0.25s',
      }}>
        {/* BEFORE */}
        <div style={{
          flex: 1, borderRadius: 'var(--osd-radius)', overflow: 'hidden',
          border: `1px solid rgba(211,47,47,0.3)`, display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            padding: '12px 20px', background: 'rgba(211,47,47,0.08)',
            fontFamily: font.mono, fontSize: 16, fontWeight: 600, color: '#d32f2f',
            display: 'flex', alignItems: 'center', gap: 10,
            borderBottom: '1px solid rgba(211,47,47,0.15)',
          }}>
            <span style={{ fontSize: 20 }}>✕</span> Before — 4 violations
          </div>
          <div style={{ flex: 1, background: '#fafafa', padding: '8px 0', overflow: 'hidden' }}>
            <CodeLine text="- name: install stuff" color={c.text} bg="rgba(211,47,47,0.06)" prefix="-" />
            <CodeLine text="  yum:" color="#d32f2f" bg="rgba(211,47,47,0.06)" prefix="-" />
            <CodeLine text="    name: httpd" color={c.text} />
            <CodeLine text="    state: present" color={c.text} />
            <CodeLine text="" color={c.text} />
            <CodeLine text="- command: systemctl enable httpd" color="#d32f2f" bg="rgba(211,47,47,0.06)" prefix="-" />
            <CodeLine text="" color={c.text} />
            <CodeLine text="- copy:" color={c.text} />
            <CodeLine text="    src: httpd.conf" color={c.text} />
            <CodeLine text="    dest: /etc/httpd/conf/" color={c.text} />
            <CodeLine text="    backup: no" color="#d32f2f" bg="rgba(211,47,47,0.06)" prefix="-" />
          </div>
        </div>

        {/* Arrow */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 8, flexShrink: 0, width: 64,
        }}>
          <div style={{
            fontFamily: font.mono, fontSize: 16, fontWeight: 700,
            color: c.red, letterSpacing: '0.08em',
          }}>
            --fix
          </div>
          <div style={{ fontSize: 32, color: c.red }}>→</div>
        </div>

        {/* AFTER */}
        <div style={{
          flex: 1, borderRadius: 'var(--osd-radius)', overflow: 'hidden',
          border: `1px solid rgba(46,125,50,0.3)`, display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            padding: '12px 20px', background: 'rgba(46,125,50,0.08)',
            fontFamily: font.mono, fontSize: 16, fontWeight: 600, color: '#2e7d32',
            display: 'flex', alignItems: 'center', gap: 10,
            borderBottom: '1px solid rgba(46,125,50,0.15)',
          }}>
            <span style={{ fontSize: 20 }}>✔</span> After — 0 violations
          </div>
          <div style={{ flex: 1, background: '#fafafa', padding: '8px 0', overflow: 'hidden' }}>
            <CodeLine text="- name: Install web server packages" color={c.text} bg="rgba(46,125,50,0.06)" prefix="+" />
            <CodeLine text="  ansible.builtin.dnf:" color="#2e7d32" bg="rgba(46,125,50,0.06)" prefix="+" />
            <CodeLine text="    name: httpd" color={c.text} />
            <CodeLine text="    state: present" color={c.text} />
            <CodeLine text="" color={c.text} />
            <CodeLine text="- name: Enable web server service" color="#2e7d32" bg="rgba(46,125,50,0.06)" prefix="+" />
            <CodeLine text="  ansible.builtin.systemd:" color="#2e7d32" bg="rgba(46,125,50,0.06)" prefix="+" />
            <CodeLine text="    name: httpd" color={c.text} />
            <CodeLine text="    enabled: true" color="#2e7d32" bg="rgba(46,125,50,0.06)" prefix="+" />
            <CodeLine text="- name: Deploy web server config" color="#2e7d32" bg="rgba(46,125,50,0.06)" prefix="+" />
            <CodeLine text="  ansible.builtin.copy:" color="#2e7d32" bg="rgba(46,125,50,0.06)" prefix="+" />
            <CodeLine text="    src: httpd.conf" color={c.text} />
            <CodeLine text="    dest: /etc/httpd/conf/" color={c.text} />
            <CodeLine text="    backup: true" color="#2e7d32" bg="rgba(46,125,50,0.06)" prefix="+" />
          </div>
        </div>
      </div>

      {/* Bottom labels */}
      <div className="fadeUp" style={{
        display: 'flex', justifyContent: 'space-between', marginTop: 16,
        fontFamily: font.mono, fontSize: 18, color: c.muted, animationDelay: '0.5s',
      }}>
        <span>name[missing] · fqcn · yaml[truthy] · no-changed-when</span>
        <span>FQCN · named tasks · native booleans · backup</span>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 15. molecule ───────────────────────────────────────────────────────────
const MoleculeIcon = ({ d, size = 56, color = c.redText }: { d: string; size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const Molecule: Page = () => {
  const stages = [
    { name: 'Create', desc: 'Spin up ephemeral instance', iconD: 'M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83' },
    { name: 'Converge', desc: 'Apply the role to the instance', iconD: 'M5 3l14 9-14 9V3z' },
    { name: 'Idempotence', desc: 'Run again — expect 0 changes', iconD: 'M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15' },
    { name: 'Verify', desc: 'Assert the expected state', iconD: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z' },
    { name: 'Destroy', desc: 'Tear down — clean slate', iconD: 'M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' },
  ];
  return (
    <div style={{ ...fill, background: c.white, color: c.text }}>
      <Styles />
      <PatternBg />
      <AccentBar />
      <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SectionTag light>Module A — Test</SectionTag>
        <h2 className="fadeUp" style={{
          fontFamily: font.display, fontSize: 80, fontWeight: 700,
          letterSpacing: '-0.035em', margin: '0 0 24px', lineHeight: 1.05,
        }}>
          molecule
        </h2>
        <p className="fadeUp" style={{
          fontSize: 28, color: c.muted, margin: '0 0 48px', animationDelay: '0.1s',
        }}>
          Integration testing with ephemeral infrastructure — every run starts clean.
        </p>

        {/* Pipeline — horizontal connected stages */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, width: '100%' }}>
            {stages.map((s, i) => (
              <div key={s.name} className="fadeUp" style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                position: 'relative', animationDelay: `${0.2 + i * 0.12}s`,
              }}>
                {/* Connector line between circles */}
                {i < stages.length - 1 && (
                  <div style={{
                    position: 'absolute', top: 60, left: '50%', width: '100%', height: 3,
                    background: c.grayMid, zIndex: 0,
                  }} />
                )}
                {/* Stage circle */}
                <div style={{
                  width: 120, height: 120, borderRadius: '50%',
                  background: c.white,
                  border: `3px solid ${c.grayMid}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 1, position: 'relative',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                }}>
                  <MoleculeIcon d={s.iconD} size={48} color={c.redText} />
                </div>
                {/* Stage name */}
                <div style={{
                  fontFamily: font.display, fontSize: 26, fontWeight: 700,
                  color: c.text, marginTop: 24, textAlign: 'center',
                }}>
                  {s.name}
                </div>
                {/* Description */}
                <div style={{
                  fontFamily: font.sans, fontSize: 22, color: c.muted,
                  textAlign: 'center', marginTop: 8, maxWidth: 200, lineHeight: 1.4,
                }}>
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar: default driver + provisioners */}
        <div className="fadeUp" style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, marginTop: 24,
          animationDelay: '0.9s',
        }}>
          <span style={{
            fontFamily: font.mono, fontSize: 22, padding: '8px 20px',
            borderRadius: 8, background: c.dark, color: c.white,
          }}>
            default driver
          </span>
          <span style={{ fontFamily: font.sans, fontSize: 22, color: c.muted }}>provisioned via Ansible collections:</span>
          {['containers.podman', 'community.docker', 'custom playbooks'].map(d => (
            <span key={d} style={{
              fontFamily: font.mono, fontSize: 22, padding: '8px 20px',
              borderRadius: 8, background: c.gray, color: c.text,
              border: `1px solid ${c.grayMid}`,
            }}>
              {d}
            </span>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// ─── 16. pytest-ansible & tox-ansible ───────────────────────────────────────
const PytestTox: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>Module A — Test</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 56px', lineHeight: 1.05,
      }}>
        pytest-ansible & tox-ansible
      </h2>
      <div style={{ display: 'flex', gap: 40, flex: 1, minHeight: 0, alignItems: 'flex-start' }}>
        {/* Terminal on the LEFT */}
        <Terminal title="tox-ansible" lines={[
          '$ tox -e py312-2.17',
          '',
          '  py312-2.17: commands',
          '  pytest --ansible-host-pattern=localhost',
          '',
          '  tests/unit/test_lookup.py .... PASSED',
          '  tests/unit/test_module.py .... PASSED',
          '  tests/integration/ .......... PASSED',
          '',
          '✔ py312-2.17: OK (42.3s)',
          '✔ py311-2.16: OK (38.7s)',
          '✔ congratulations :)',
        ]} />
        {/* Two stacked cards on the RIGHT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="fadeUp" style={{
            background: c.gray, borderRadius: 14, padding: '28px 32px',
            border: `1px solid rgba(0,0,0,0.06)`,
            borderTop: `4px solid #b8860b`, animationDelay: '0.3s',
          }}>
            <h3 style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, color: '#b8860b', margin: '0 0 12px' }}>
              pytest-ansible
            </h3>
            <div style={{ fontFamily: font.sans, fontSize: 24, color: c.muted, lineHeight: 1.5 }}>
              pytest plugin for testing Ansible module and plugin <strong style={{ color: c.text }}>Python code</strong> — unit tests for filters, lookups, and custom modules.
            </div>
          </div>
          <div className="fadeUp" style={{
            background: c.gray, borderRadius: 14, padding: '28px 32px',
            border: `1px solid rgba(0,0,0,0.06)`,
            borderTop: `4px solid #2e7d6f`, animationDelay: '0.4s',
          }}>
            <h3 style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, color: '#2e7d6f', margin: '0 0 12px' }}>
              tox-ansible
            </h3>
            <div style={{ fontFamily: font.sans, fontSize: 24, color: c.muted, lineHeight: 1.5 }}>
              Auto-generates a <strong style={{ color: c.text }}>test matrix</strong> across Python and ansible-core versions — one command tests every combination.
            </div>
          </div>
          <div className="fadeUp" style={{
            fontFamily: font.mono, fontSize: 22, color: c.muted, textAlign: 'center',
            padding: '12px 0', animationDelay: '0.5s',
          }}>
            Unit tests for Python code · molecule for role integration
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 17. ansible-builder ─────────────────────────────────────────────────────
const AnsibleBuilder: Page = () => {
  const layers = [
    { label: 'Your collections', items: 'ansible.netcommon, cisco.ios, acme.network', color: '#7a0000', text: c.white },
    { label: 'Python dependencies', items: 'netaddr, paramiko, pykerberos', color: c.red, text: c.white },
    { label: 'System packages', items: 'libssh-devel, krb5-workstation', color: c.dark, text: c.white },
    { label: 'ansible-core + runner', items: 'ansible-core 2.17, ansible-runner', color: '#444', text: 'rgba(255,255,255,0.8)' },
    { label: 'Base image', items: 'ee-minimal-rhel9:latest', color: c.gray, text: c.muted },
  ];
  return (
    <div style={{ ...fill, background: c.white, color: c.text }}>
      <Styles />
      <PatternBg />
      <AccentBar />
      <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SectionTag light>Module A — Deploy</SectionTag>
        <h2 className="fadeUp" style={{
          fontFamily: font.display, fontSize: 80, fontWeight: 700,
          letterSpacing: '-0.035em', margin: '0 0 32px', lineHeight: 1.05,
        }}>
          ansible-builder
        </h2>

        <div style={{ display: 'flex', gap: 48, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
          {/* Left: layer cake */}
          <div className="fadeUp" style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            animationDelay: '0.15s',
          }}>
            <div style={{
              fontFamily: font.mono, fontSize: 18, color: c.muted,
              marginBottom: 16, letterSpacing: '0.08em',
            }}>
              CONTAINER IMAGE LAYERS
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {layers.map((l, i) => (
                <div key={l.label} className="fadeUp" style={{
                  background: l.color, color: l.text,
                  flex: 1, padding: '0 32px', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', animationDelay: `${0.2 + i * 0.08}s`,
                  borderRadius: i === 0 ? '14px 14px 0 0' : i === layers.length - 1 ? '0 0 14px 14px' : 0,
                  borderBottom: i < layers.length - 1 ? `1px solid rgba(255,255,255,0.12)` : 'none',
                }}>
                  <span style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700 }}>{l.label}</span>
                  <span style={{ fontFamily: font.mono, fontSize: 18, opacity: 0.7 }}>{l.items}</span>
                </div>
              ))}
            </div>
            <div style={{
              fontFamily: font.mono, fontSize: 18, color: c.muted,
              marginTop: 16, textAlign: 'center',
            }}>
              $ ansible-builder build -t my-ee:latest
            </div>
          </div>

          {/* Right: key points */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
            <Bullet bold="Execution Environments" text="package automation content into immutable container images" />
            <Bullet bold="Decision Environments" text="same approach for Event-Driven Ansible — bundle rulebooks and deps" />
            <Bullet bold="Reproducible" text="execution-environment.yml is versioned — same image in dev, CI, and Controller" />
            <div className="fadeUp" style={{
              marginTop: 8, padding: '16px 24px', borderRadius: 12,
              background: c.gray, border: `1px solid ${c.grayMid}`,
              display: 'flex', alignItems: 'center', gap: 16, animationDelay: '0.6s',
            }}>
              <span style={{ fontSize: 28 }}>📋</span>
              <div>
                <div style={{ fontFamily: font.mono, fontSize: 20, color: c.redText, fontWeight: 600 }}>execution-environment.yml</div>
                <div style={{ fontFamily: font.sans, fontSize: 22, color: c.muted }}>Single source of truth for all dependencies</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// ─── 18. ansible-navigator ───────────────────────────────────────────────────
const AnsibleNavigator: Page = () => {
  const tuiRows = [
    { n: 0, status: 'OK', statusColor: '#27c93f', task: 'Gather facts', host: 'all', changed: false },
    { n: 1, status: 'OK', statusColor: '#27c93f', task: 'Install required packages', host: 'all', changed: false },
    { n: 2, status: 'CHG', statusColor: '#ffbd2e', task: 'Deploy web server configuration', host: 'all', changed: true },
    { n: 3, status: 'OK', statusColor: '#27c93f', task: 'Ensure httpd service running', host: 'all', changed: false },
    { n: 4, status: 'OK', statusColor: '#27c93f', task: 'Open firewall ports', host: 'all', changed: false },
    { n: 5, status: 'FAIL', statusColor: '#ff5f56', task: 'Verify connectivity', host: 'web03', changed: false },
  ];
  return (
    <div style={{ ...fill, background: c.white, color: c.text }}>
      <Styles />
      <PatternBg />
      <AccentBar />
      <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SectionTag light>Module A — Deploy</SectionTag>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
          <h2 className="fadeUp" style={{
            fontFamily: font.display, fontSize: 80, fontWeight: 700,
            letterSpacing: '-0.035em', margin: 0, lineHeight: 1.05,
          }}>
            ansible-navigator
          </h2>
          <span className="fadeUp" style={{
            fontFamily: font.mono, fontSize: 22, color: c.muted, animationDelay: '0.1s',
          }}>
            interactive TUI
          </span>
        </div>

        {/* Full-width TUI mockup */}
        <div className="fadeUp" style={{
          flex: 1, marginTop: 32, borderRadius: 'var(--osd-radius)', overflow: 'hidden',
          background: c.darkest, border: `1px solid ${c.border}`,
          display: 'flex', flexDirection: 'column', animationDelay: '0.2s',
          boxShadow: '0 40px 80px -30px rgba(0,0,0,0.55)',
        }}>
          {/* Title bar */}
          <div style={{
            height: 48, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 14,
            background: c.surfaceHi, borderBottom: `1px solid ${c.border}`, flexShrink: 0,
          }}>
            <div style={{ display: 'flex', gap: 9 }}>
              {['#ff5f56', '#ffbd2e', '#27c93f'].map(clr => (
                <span key={clr} style={{ width: 12, height: 12, borderRadius: '50%', background: clr, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.2)' }} />
              ))}
            </div>
            <div style={{ flex: 1, textAlign: 'center', fontFamily: font.mono, fontSize: 17, color: c.muted }}>
              ansible-navigator
            </div>
            <div style={{ minWidth: 48 }} />
          </div>

          {/* TUI header */}
          <div style={{
            padding: '16px 32px 8px', fontFamily: font.mono, fontSize: 18,
            color: 'rgba(255,255,255,0.5)', borderBottom: `1px solid ${c.border}`,
          }}>
            <div style={{ color: '#27c93f', marginBottom: 8 }}>$ ansible-navigator run site.yml --eei my-ee:latest</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>PLAY [webservers] — 6 tasks</span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>EE: my-ee:latest</span>
            </div>
          </div>

          {/* TUI table rows */}
          <div style={{ flex: 1, padding: '0' }}>
            {tuiRows.map((row, i) => (
              <div key={row.n} className="stream" style={{
                display: 'flex', alignItems: 'center', padding: '10px 32px',
                fontFamily: font.mono, fontSize: 20,
                background: row.status === 'FAIL' ? 'rgba(255,95,86,0.08)' : i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                borderLeft: row.status === 'FAIL' ? '3px solid #ff5f56' : '3px solid transparent',
                animationDelay: `${0.3 + i * 0.08}s`,
              }}>
                <span style={{ width: 40, color: 'rgba(255,255,255,0.3)' }}>{row.n}│</span>
                <span style={{
                  width: 64, fontWeight: 700, color: row.statusColor,
                }}>{row.status}</span>
                <span style={{ flex: 1, color: 'rgba(255,255,255,0.85)' }}>{row.task}</span>
                <span style={{ width: 100, color: 'rgba(255,255,255,0.3)', textAlign: 'right' }}>{row.host}</span>
              </div>
            ))}
          </div>

          {/* TUI footer */}
          <div style={{
            padding: '12px 32px', fontFamily: font.mono, fontSize: 16,
            color: 'rgba(255,255,255,0.3)', borderTop: `1px solid ${c.border}`,
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>Type a number to drill into a task · <span style={{ color: 'rgba(255,255,255,0.5)' }}>:help</span> for commands</span>
            <span>stdout mode: <span style={{ color: 'rgba(255,255,255,0.5)' }}>--mode stdout</span> for CI</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// ─── 18b. ansible-sign ──────────────────────────────────────────────────────
const AnsibleSign: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>Module A — Deploy</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 32px', lineHeight: 1.05,
      }}>
        ansible-sign
      </h2>

      {/* Vertically centered content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32, minHeight: 0 }}>
        {/* Trust chain: horizontal flow */}
        <div className="fadeUp" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 0, animationDelay: '0.15s',
        }}>
          {[
            { icon: '✏️', label: 'Developer signs', sub: 'gpg-sign' },
            { icon: '📦', label: 'Content + signature', sub: 'sha256 checksums' },
            { icon: '🔍', label: 'Controller verifies', sub: 'gpg-verify' },
            { icon: '✅', label: 'Trusted execution', sub: 'signature valid' },
          ].map((step, i) => (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center' }}>
              {i > 0 && (
                <div style={{
                  width: 48, height: 3, background: i === 3 ? c.red : c.grayMid,
                  margin: '0 4px',
                }} />
              )}
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 8, minWidth: 160,
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: i === 3 ? c.red : c.gray,
                  border: i === 3 ? 'none' : `2px solid ${c.grayMid}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 32,
                }}>
                  {step.icon}
                </div>
                <div style={{
                  fontFamily: font.display, fontSize: 22, fontWeight: 700,
                  color: i === 3 ? c.red : c.text, textAlign: 'center',
                }}>
                  {step.label}
                </div>
                <div style={{
                  fontFamily: font.mono, fontSize: 18, color: c.muted, textAlign: 'center',
                }}>
                  {step.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Two terminals side by side */}
        <div className="fadeUp" style={{ display: 'flex', gap: 24, animationDelay: '0.3s' }}>
          <Terminal title="sign" lines={[
            '$ ansible-sign project gpg-sign .',
            '',
            '  Generating checksum manifest...',
            '  Signing with GPG key...',
            '✔ Signed: .ansible-sign/sha256sum.txt.sig',
          ]} />
          <Terminal title="verify" lines={[
            '$ ansible-sign project gpg-verify .',
            '',
            '  Verifying GPG signature...',
            '  Checking file checksums...',
            '✔ Signature valid · All checksums match',
          ]} />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 19. AI Deep Dive Divider ───────────────────────────────────────────────
const AIDivider: Page = () => (
  <div style={{ ...fill, background: c.dark, color: c.white }}>
    <Styles />
    <div style={{
      position: 'absolute', inset: 0, padding: '0 120px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <div style={{ fontFamily: font.mono, fontSize: 18, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
        Deep Dive
      </div>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 100, fontWeight: 900,
        letterSpacing: '-0.04em', lineHeight: 1.05, margin: 0,
      }}>
        AI-assisted<br/><span style={{ background: 'linear-gradient(90deg, #ee0000, #ff4444)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>development</span>
      </h2>
    </div>
    <Footer dark />
  </div>
);

// ─── 19b. AI Refresher ──────────────────────────────────────────────────────
const AIRefresher: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>Module B — Recap</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 32px', lineHeight: 1.05,
      }}>
        AI-assisted development at a glance
      </h2>
      <p className="fadeUp" style={{ fontSize: 28, color: c.muted, margin: '0 0 40px', animationDelay: '0.1s' }}>
        Model Context Protocol connects AI assistants to real tools — not just generated instructions.
      </p>

      <div style={{ display: 'flex', gap: 32, flex: 1, minHeight: 0 }}>
        {/* Devtools MCP card */}
        <div className="fadeUp" style={{
          flex: 1, background: c.gray, borderRadius: 16, padding: '32px 36px',
          border: `1px solid rgba(0,0,0,0.06)`, borderTop: `4px solid ${c.red}`,
          display: 'flex', flexDirection: 'column', animationDelay: '0.2s',
        }}>
          <h3 style={{ fontFamily: font.display, fontSize: 30, fontWeight: 700, color: c.red, margin: '0 0 24px' }}>
            Ansible Devtools MCP
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
            {['Scaffold collections, roles, playbooks', 'Lint and auto-fix violations', 'Navigate and inspect collections', 'Build execution environments'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: font.sans, fontSize: 24, color: c.text }}>
                <span style={{ color: c.red, fontSize: 16, flexShrink: 0 }}>&#9656;</span>
                {item}
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 20, padding: '12px 20px', borderRadius: 10,
            background: c.white, border: `1px solid ${c.grayMid}`,
            fontFamily: font.mono, fontSize: 20, color: c.muted, textAlign: 'center',
          }}>
            @ansible/ansible-mcp-server
          </div>
        </div>

        {/* AAP MCP card */}
        <div className="fadeUp" style={{
          flex: 1, background: c.dark, borderRadius: 16, padding: '32px 36px',
          border: `1px solid rgba(255,255,255,0.06)`, borderTop: `4px solid ${c.red}`,
          display: 'flex', flexDirection: 'column', animationDelay: '0.3s',
        }}>
          <h3 style={{ fontFamily: font.display, fontSize: 30, fontWeight: 700, color: c.white, margin: '0 0 24px' }}>
            AAP MCP Server
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
            {['Launch jobs and check status', 'Query inventory hosts and groups', 'Monitor Controller health', 'Gateway API — AAP 2.6.4+'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: font.sans, fontSize: 24, color: 'rgba(255,255,255,0.85)' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, flexShrink: 0 }}>&#9656;</span>
                {item}
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 20, padding: '12px 20px', borderRadius: 10,
            background: 'rgba(255,255,255,0.08)', border: `1px solid rgba(255,255,255,0.1)`,
            fontFamily: font.mono, fontSize: 20, color: 'rgba(255,255,255,0.5)', textAlign: 'center',
          }}>
            AAP 2.6.4+ gateway endpoints
          </div>
        </div>

        {/* BYOM card */}
        <div className="fadeUp" style={{
          flex: 1, background: c.gray, borderRadius: 16, padding: '32px 36px',
          border: `1px solid rgba(0,0,0,0.06)`, borderTop: `4px solid #2e7d6f`,
          display: 'flex', flexDirection: 'column', animationDelay: '0.4s',
        }}>
          <h3 style={{ fontFamily: font.display, fontSize: 30, fontWeight: 700, color: '#2e7d6f', margin: '0 0 24px' }}>
            Bring Your Own Model
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: font.sans, fontSize: 24, color: c.text }}>
                <span style={{ color: '#2e7d6f', fontSize: 16, flexShrink: 0 }}>&#9656;</span>
                Red Hat AI
              </div>
              <div style={{ fontFamily: font.sans, fontSize: 20, color: c.muted, marginLeft: 30 }}>
                any OpenAI-compatible endpoint
              </div>
            </div>
            {['Google Gemini / Vertex AI', 'IBM watsonx'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: font.sans, fontSize: 24, color: c.text }}>
                <span style={{ color: '#2e7d6f', fontSize: 16, flexShrink: 0 }}>&#9656;</span>
                {item}
              </div>
            ))}
            <div style={{ fontFamily: font.sans, fontSize: 22, color: c.muted, fontStyle: 'italic', marginLeft: 30, marginTop: 4 }}>
              More coming — Claude, Copilot, ...
            </div>
          </div>
          <div style={{
            marginTop: 20, padding: '12px 20px', borderRadius: 10,
            background: c.white, border: `1px solid ${c.grayMid}`,
            fontFamily: font.mono, fontSize: 20, color: c.muted, textAlign: 'center',
          }}>
            LLM Provider Settings in VS Code
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 20. How MCP Works ──────────────────────────────────────────────────────
const MCPArchitecture: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>Module B — MCP Architecture</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 32px', lineHeight: 1.05,
      }}>
        How MCP works
      </h2>

      {/* Architecture diagram */}
      <div className="fadeUp" style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        animationDelay: '0.2s', minHeight: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {/* AI Assistant node */}
          <div style={{
            background: c.dark, color: c.white, borderRadius: 20,
            padding: '36px 44px', textAlign: 'center',
            border: `3px solid ${c.red}`, flexShrink: 0, zIndex: 1,
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🤖</div>
            <div style={{ fontFamily: font.display, fontSize: 30, fontWeight: 700 }}>AI Assistant</div>
            <div style={{ fontFamily: font.mono, fontSize: 18, color: 'rgba(255,255,255,0.5)', marginTop: 10 }}>
              Claude · Copilot · Gemini
            </div>
          </div>

          {/* Connector */}
          <div style={{ position: 'relative', width: 80, height: 320, flexShrink: 0 }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, width: 40, height: 3, background: c.red }} />
            <div style={{ position: 'absolute', top: 52, left: 40, width: 3, height: 216, background: c.red, borderRadius: 2 }} />
            <div style={{ position: 'absolute', top: 52, left: 40, width: 40, height: 3, background: c.red }} />
            <div style={{ position: 'absolute', top: 265, left: 40, width: 40, height: 3, background: c.red }} />
          </div>

          {/* Two branches */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {/* Devtools branch */}
            <div className="fadeUp" style={{ display: 'flex', alignItems: 'center', gap: 28, animationDelay: '0.3s' }}>
              <div style={{
                background: c.red, color: c.white, borderRadius: 14,
                padding: '20px 32px', fontFamily: font.display, fontSize: 24, fontWeight: 700,
                flexShrink: 0, minWidth: 200, textAlign: 'center',
                boxShadow: '0 4px 16px rgba(238,0,0,0.2)',
              }}>
                Devtools MCP
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['Best practices', 'Lint'].map(t => (
                    <span key={t} style={{
                      background: c.gray, borderRadius: 10, padding: '12px 20px',
                      fontFamily: font.mono, fontSize: 20, color: c.text,
                      border: `1px solid ${c.grayMid}`,
                    }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['Scaffold', 'Navigate', 'Build EE'].map(t => (
                    <span key={t} style={{
                      background: c.gray, borderRadius: 10, padding: '12px 20px',
                      fontFamily: font.mono, fontSize: 20, color: c.text,
                      border: `1px solid ${c.grayMid}`,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* AAP branch */}
            <div className="fadeUp" style={{ display: 'flex', alignItems: 'center', gap: 28, animationDelay: '0.4s' }}>
              <div style={{
                background: c.dark, color: c.white, borderRadius: 14,
                padding: '20px 32px', fontFamily: font.display, fontSize: 24, fontWeight: 700,
                flexShrink: 0, minWidth: 200, textAlign: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              }}>
                AAP MCP
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['Inventory', 'Projects', 'Templates'].map(t => (
                    <span key={t} style={{
                      background: c.gray, borderRadius: 10, padding: '12px 20px',
                      fontFamily: font.mono, fontSize: 20, color: c.text,
                      border: `1px solid ${c.grayMid}`,
                    }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['Jobs', 'Hosts', 'Health'].map(t => (
                    <span key={t} style={{
                      background: c.gray, borderRadius: 10, padding: '12px 20px',
                      fontFamily: font.mono, fontSize: 20, color: c.text,
                      border: `1px solid ${c.grayMid}`,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="fadeUp" style={{
        textAlign: 'center', fontFamily: font.sans, fontSize: 24,
        color: c.muted, animationDelay: '0.5s',
      }}>
        Agents call real tools — they don't just generate instructions
      </p>
    </div>
    <Footer />
  </div>
);

// ─── 20b. MCP in Ansible Terms ──────────────────────────────────────────────
const MCPvsModules: Page = () => {
  const columns = [
    {
      title: 'Raw API / CLI',
      color: c.muted,
      icon: <Icon size={56} color={c.muted}><path d="M4 17l6-6-6-6" /><line x1="12" y1="19" x2="20" y2="19" /></Icon>,
      items: ['Craft HTTP requests or shell commands', 'Parse responses yourself', 'No built-in validation or docs', 'Fragile, version-dependent'],
      verdict: 'Possible, but painful',
    },
    {
      title: 'Ansible Module',
      color: c.dark,
      icon: <IconPackage size={56} color={c.dark} />,
      items: ['Abstracts the API', 'Built-in docs and examples', 'Input validation, error handling', 'Idempotent by design'],
      verdict: 'What playbooks use',
    },
    {
      title: 'MCP Tool',
      color: c.red,
      icon: <Icon size={56} color={c.red}><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></Icon>,
      items: ['Abstracts the CLI and API', 'Self-describing schema and docs', 'Structured input and output', 'AI discovers and invokes it'],
      verdict: 'What AI agents use',
    },
  ];
  return (
    <div style={{ ...fill, background: c.white, color: c.text }}>
      <Styles />
      <PatternBg />
      <AccentBar />
      <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SectionTag light>Module B — Why MCP</SectionTag>
        <h2 className="fadeUp" style={{
          fontFamily: font.display, fontSize: 80, fontWeight: 700,
          letterSpacing: '-0.035em', margin: '0 0 56px', lineHeight: 1.05,
        }}>
          MCP in Ansible terms
        </h2>
        <div style={{ display: 'flex', gap: 32, flex: 1, minHeight: 0 }}>
          {columns.map((col, i) => (
            <div key={col.title} className="fadeUp" style={{
              flex: 1, background: c.gray, borderRadius: 16,
              padding: '36px 40px', display: 'flex', flexDirection: 'column',
              animationDelay: `${0.2 + i * 0.12}s`,
              border: `1px solid rgba(0,0,0,0.06)`,
              borderTopWidth: 4, borderTopColor: col.color,
            }}>
              <div style={{ marginBottom: 16 }}>{col.icon}</div>
              <h3 style={{
                fontFamily: font.display, fontSize: 32, fontWeight: 700,
                color: col.color, margin: '0 0 24px',
              }}>
                {col.title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: 1 }}>
                {col.items.map(item => (
                  <div key={item} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 14,
                    fontFamily: font.sans, fontSize: 22, color: c.text,
                  }}>
                    <span style={{ color: col.color, fontSize: 16, marginTop: 5, flexShrink: 0 }}>&#9656;</span>
                    {item}
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 24, paddingTop: 16,
                borderTop: `1px solid ${c.grayMid}`,
                fontFamily: font.display, fontSize: 22, fontWeight: 600,
                color: col.color, textAlign: 'center',
              }}>
                {col.verdict}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// ─── 21. Devtools MCP Server ────────────────────────────────────────────────
const DevtoolsMCP: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>Module B — Devtools MCP</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 32px', lineHeight: 1.05,
      }}>
        Ansible Devtools MCP Server
      </h2>
      <div style={{ display: 'flex', gap: 32, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
        {/* Tool grid — LEFT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { tool: 'ansible_lint', desc: 'Lint, auto-fix, iterate until clean' },
            { tool: 'create_ansible_projects', desc: 'Scaffold collections, roles, playbooks' },
            { tool: 'zen_of_ansible', desc: 'Query best practices and documentation' },
            { tool: 'ansible_navigator', desc: 'Explore collections, inspect modules' },
            { tool: 'define_and_build_execution_env', desc: 'Create EE definitions and build images' },
            { tool: 'ade_setup_environment', desc: 'Check and manage dev environments' },
          ].map((item, i) => (
            <div key={item.tool} className="fadeUp" style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '12px 16px', borderRadius: 10,
              background: i === 0 ? `${c.red}08` : 'transparent',
              borderLeft: `3px solid ${i === 0 ? c.red : c.grayMid}`,
              animationDelay: `${0.2 + i * 0.06}s`,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: font.mono, fontSize: 20, fontWeight: 600, color: i === 0 ? c.redText : c.text }}>{item.tool}</div>
                <div style={{ fontFamily: font.sans, fontSize: 20, color: c.muted, marginTop: 2 }}>{item.desc}</div>
              </div>
            </div>
          ))}
          <div className="fadeUp" style={{
            marginTop: 'auto', fontFamily: font.mono, fontSize: 18, color: c.muted,
            padding: '8px 0', animationDelay: '0.6s',
          }}>
            Works with: Claude Code · VS Code Copilot · Gemini CLI · Cursor
          </div>
        </div>
        {/* Terminal — RIGHT */}
        <Terminal title="AI agent + devtools MCP" lines={[
          '# User prompt:',
          '> Scaffold a network collection,',
          '  add a backup role, lint it',
          '',
          '$ ansible-creator init collection',
          '  myorg.network',
          '✔ Collection created',
          '',
          '$ ansible-creator init role',
          '  backup --collection myorg.network',
          '✔ Role scaffolded',
          '',
          '$ ansible-lint --fix',
          '✔ Fixed 3 violations',
          '✔ Passed: 0 warnings',
        ]} />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 22. AAP MCP Server ─────────────────────────────────────────────────────
const AAPMCP: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>Module B — AAP MCP</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 32px', lineHeight: 1.05,
      }}>
        AAP MCP Server
      </h2>
      <div style={{ display: 'flex', gap: 32, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
        {/* Terminal — LEFT */}
        <Terminal title="AI agent + AAP MCP" lines={[
          '# User prompt:',
          '> Show failed jobs in the last',
          '  24 hours and remediate them',
          '',
          '  Querying AAP gateway...',
          '  3 failed jobs found:',
          '    - patch-rhel9 (timeout)',
          '    - deploy-web (auth error)',
          '    - backup-db (disk full)',
          '',
          '  Launching: remediate-hosts',
          '  Inventory: dc-west (47 hosts)',
          '✔ Job #4521 started',
          '✔ 3/3 hosts remediated',
        ]} />
        {/* Capability cards — RIGHT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { title: 'Job management', desc: 'Launch templates, check status, review output, cancel running jobs', icon: '▶' },
            { title: 'Inventory queries', desc: 'List hosts, groups, and variables across all inventories', icon: '📋' },
            { title: 'System monitoring', desc: 'Controller health, node status, license usage', icon: '📊' },
            { title: 'Gateway API', desc: 'Unified AAP 2.6.4+ endpoints — single connection point', icon: '🔗' },
          ].map((item, i) => (
            <div key={item.title} className="fadeUp" style={{
              flex: 1, background: c.gray, borderRadius: 12, padding: '20px 24px',
              borderLeft: `4px solid ${i === 0 ? c.red : c.grayMid}`,
              display: 'flex', alignItems: 'center', gap: 20,
              animationDelay: `${0.3 + i * 0.1}s`,
            }}>
              <span style={{ fontSize: 32, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, color: c.text }}>{item.title}</div>
                <div style={{ fontFamily: font.sans, fontSize: 20, color: c.muted, marginTop: 4, lineHeight: 1.4 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 23. Dev Spaces Deep Dive Divider ───────────────────────────────────────
const DevSpacesDivider: Page = () => (
  <div style={{ ...fill, background: c.dark, color: c.white }}>
    <Styles />
    <div style={{
      position: 'absolute', inset: 0, padding: '0 120px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <div style={{ fontFamily: font.mono, fontSize: 18, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
        Deep Dive
      </div>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 100, fontWeight: 900,
        letterSpacing: '-0.04em', lineHeight: 1.05, margin: 0,
      }}>
        Dev Spaces &<br/><span style={{ background: 'linear-gradient(90deg, #ee0000, #ff4444)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>image customization</span>
      </h2>
    </div>
    <Footer dark />
  </div>
);

// ─── 24. Dev Spaces Refresher ───────────────────────────────────────────────
const DevSpacesRefresher: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module C — Recap</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 24px', lineHeight: 1.05,
      }}>
        Dev Spaces at a glance
      </h2>
      <div style={{ display: 'flex', gap: 48, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32, justifyContent: 'center' }}>
          <Bullet bold="Browser-only workspaces" text="OpenShift Dev Spaces gives every developer an identical environment with zero local setup" />
          <Bullet bold="ADT pre-installed" text="the base container image ships with the full Ansible toolchain ready to use" />
          <Bullet bold="The challenge" text="teams have different needs — network, Windows, AAP Config as Code all require different system packages and Python libraries" />
          <Bullet bold="One image can't fit all" text="a shared image either bloats or satisfies no one — you need a layering strategy" />
        </div>
        <div className="fadeUp" style={{
          flex: 1, borderRadius: 16, border: `2px dashed ${c.grayMid}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animationDelay: '0.4s', background: c.gray,
        }}>
          <span style={{ fontFamily: font.mono, fontSize: 20, color: c.muted, textAlign: 'center', padding: 32 }}>
            Screenshot: Dev Spaces dashboard showing running workspaces
          </span>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 25. Why Customize Images ───────────────────────────────────────────────
const WhyCustomize: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module C — The Problem</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 24px', lineHeight: 1.05,
      }}>
        Why customize images?
      </h2>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
        <Bullet bold="Read-only base" text="upstream image has /var read-only, no dnf install at runtime" />
        <Bullet bold="Different needs" text="each team requires different system packages and Python libraries" />

        {/* Domain examples */}
        <div className="fadeUp" style={{
          display: 'flex', gap: 20, marginLeft: 48, animationDelay: '0.3s',
        }}>
          {[
            { domain: 'Network', pkgs: 'libssh-devel, python3-netaddr' },
            { domain: 'Windows', pkgs: 'krb5-workstation, python3-pykerberos' },
            { domain: 'RHEL', pkgs: 'insights-client, python3-jmespath' },
            { domain: 'AAP Config as Code', pkgs: 'httpie, python3-pyyaml' },
          ].map(d => (
            <div key={d.domain} style={{
              background: c.gray, borderRadius: 14, padding: '20px 24px', flex: 1,
            }}>
              <div style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, color: c.redText }}>{d.domain}</div>
              <div style={{ fontFamily: font.mono, fontSize: 18, color: c.muted, marginTop: 8 }}>{d.pkgs}</div>
            </div>
          ))}
        </div>

        <Bullet bold="No one-size-fits-all" text="a shared image either bloats or satisfies no one — you need layers" />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 26. Tiered Image Strategy ──────────────────────────────────────────────
const TieredStrategy: Page = () => {
  const tiers = [
    { n: '4', title: 'Personal', desc: 'Opt-in fork', width: 440, color: c.gray, text: c.text, border: true },
    { n: '3', title: 'Team', desc: 'Containerfile in repo', width: 580, color: c.gray, text: c.text, border: true },
    { n: '2', title: 'Org / Domain', desc: 'BuildConfig + CEKit', width: 740, color: c.red, text: c.white, border: false },
    { n: '1', title: 'Upstream Base', desc: 'ansible-devspaces', width: 920, color: c.dark, text: c.white, border: false },
  ];
  return (
    <div style={{ ...fill, background: c.white, color: c.text }}>
      <Styles />
      <PatternBg />
      <AccentBar />
      <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column' }}>
        <SectionTag light>Module C — Strategy</SectionTag>
        <h2 className="fadeUp" style={{
          fontFamily: font.display, fontSize: 80, fontWeight: 700,
          letterSpacing: '-0.035em', margin: '0 0 0', lineHeight: 1.05,
        }}>
          Tiered image strategy
        </h2>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 48 }}>
            {/* Pyramid stack — T1 widest at bottom, T4 narrowest at top, zero gap */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              {tiers.map((t, i) => (
                <div key={t.n} className="fadeUp" style={{
                  width: t.width, height: 110,
                  borderRadius: i === tiers.length - 1 ? '0 0 18px 18px' : i === 0 ? '18px 18px 0 0' : 0,
                  background: t.color, color: t.text,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0 36px',
                  borderTop: t.border && i > 0 ? `1px solid ${c.grayMid}` : 'none',
                  borderLeft: t.border ? `1px solid ${c.grayMid}` : 'none',
                  borderRight: t.border ? `1px solid ${c.grayMid}` : 'none',
                  borderBottom: t.border && i === 0 ? `1px solid ${c.grayMid}` : 'none',
                  animationDelay: `${0.15 + (tiers.length - 1 - i) * 0.12}s`,
                  boxShadow: i === tiers.length - 1 ? '0 6px 24px rgba(0,0,0,0.15)' : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <span style={{
                      fontFamily: font.display, fontSize: 36, fontWeight: 900,
                      opacity: 0.6,
                    }}>
                      T{t.n}
                    </span>
                    <span style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700 }}>
                      {t.title}
                    </span>
                  </div>
                  <span style={{
                    fontFamily: font.mono, fontSize: 20,
                    opacity: 0.6,
                  }}>
                    {t.desc}
                  </span>
                </div>
              ))}
            </div>

            {/* Vertical annotation — arrow showing specificity direction */}
            <div className="fadeUp" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              height: 440, justifyContent: 'space-between', animationDelay: '0.7s',
            }}>
              <span style={{ fontFamily: font.mono, fontSize: 18, color: c.muted, writingMode: 'vertical-rl' as const, letterSpacing: '0.05em' }}>
                more specific
              </span>
              <div style={{ flex: 1, width: 2, background: `linear-gradient(to bottom, ${c.muted}, transparent)`, margin: '4px 0' }} />
              <span style={{ fontFamily: font.mono, fontSize: 18, color: c.muted, writingMode: 'vertical-rl' as const, letterSpacing: '0.05em' }}>
                foundation
              </span>
            </div>
          </div>
        </div>

        <p className="fadeUp" style={{
          fontFamily: font.sans, fontSize: 24, color: c.muted,
          textAlign: 'center', animationDelay: '0.8s', margin: 0,
        }}>
          Each tier adds specificity without modifying the layer below
        </p>
      </div>
      <Footer />
    </div>
  );
};

// ─── 27. Tier 2 Detail ──────────────────────────────────────────────────────
const Tier2Detail: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module C — Tier 2</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 0', lineHeight: 1.05,
      }}>
        Tier 2: the org deployment path
      </h2>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 36 }}>
        {/* Bullets + terminal side by side */}
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28 }}>
            <Bullet bold="BuildConfig-managed" text="OpenShift builds domain images automatically from Containerfiles in Git" />
            <Bullet bold="CEKit factory" text="for 5+ domains, generate Containerfiles from YAML definitions instead of maintaining each by hand" />
            <Bullet bold="One image per domain" text="each team gets exactly the system packages and Python libraries they need" />
          </div>
          {/* Terminal — compact, not stretched */}
          <div style={{ width: 620, flexShrink: 0 }}>
            <Terminal title="Containerfile" lines={[
              '# Tier 2 — network domain',
              'FROM ansible-devspaces-custom:latest',
              'USER root',
              'RUN dnf install -y \\',
              '      libssh-devel \\',
              '      python3-netaddr \\',
              '  && dnf clean all',
              'USER 1000',
            ]} />
          </div>
        </div>

        {/* Domain badges */}
        <div className="fadeUp" style={{
          display: 'flex', gap: 16, animationDelay: '0.5s',
        }}>
          {[
            { domain: 'Network', pkg: 'libssh-devel' },
            { domain: 'Windows', pkg: 'krb5-workstation' },
            { domain: 'RHEL', pkg: 'insights-client' },
            { domain: 'Cloud', pkg: 'python3-boto3' },
            { domain: 'AAP CaC', pkg: 'httpie' },
          ].map(d => (
            <div key={d.domain} style={{
              flex: 1, background: c.gray, borderRadius: 12, padding: '16px 20px',
              borderBottom: `3px solid ${c.dark}`,
            }}>
              <div style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, color: c.text }}>{d.domain}</div>
              <div style={{ fontFamily: font.mono, fontSize: 16, color: c.muted, marginTop: 4 }}>{d.pkg}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 28. Auto-rebuild Cascade ───────────────────────────────────────────────
const AutoRebuild: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module C — Auto-rebuild</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 0', lineHeight: 1.05,
      }}>
        Auto-rebuild cascade
      </h2>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 40 }}>
        {/* Horizontal cascade — full width */}
        <div className="fadeUp" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 0, animationDelay: '0.2s',
        }}>
          {[
            { label: 'T1 Upstream', sub: 'base image update', color: c.dark, text: c.white },
            { label: 'T2 Org', sub: 'auto-rebuild', color: c.red, text: c.white },
            { label: 'T3 Team', sub: 'auto-rebuild', color: c.red, text: c.white },
            { label: 'Workspaces', sub: 'all updated', color: '#2e7d32', text: c.white },
          ].map((step, i) => (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center' }}>
              {i > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 80 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                    <div style={{ width: 56, height: 3, background: c.red, opacity: 0.5 }} />
                    <div style={{ width: 0, height: 0, borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderLeft: `10px solid ${c.red}`, opacity: 0.5 }} />
                  </div>
                  <div style={{
                    fontFamily: font.mono, fontSize: 16, color: c.muted,
                    marginTop: 6, whiteSpace: 'nowrap',
                  }}>
                    trigger
                  </div>
                </div>
              )}
              <div className="fadeUp" style={{
                width: 220, padding: '28px 24px', borderRadius: 16,
                background: step.color, color: step.text,
                textAlign: 'center', animationDelay: `${0.2 + i * 0.15}s`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
              }}>
                <div style={{ fontFamily: font.display, fontSize: 26, fontWeight: 700 }}>{step.label}</div>
                <div style={{ fontFamily: font.mono, fontSize: 17, opacity: 0.7, marginTop: 8 }}>{step.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Key points below */}
        <div style={{ display: 'flex', gap: 28 }}>
          {[
            { title: 'ImageStream triggers', desc: 'OpenShift watches for base image changes and triggers downstream builds' },
            { title: 'Security patches', desc: 'CVE fixes in T1 flow through the entire chain without manual intervention' },
            { title: 'Rollback', desc: 'Re-tag the previous ImageStream tag to instantly restore a known-good image' },
          ].map((item, i) => (
            <div key={item.title} className="fadeUp" style={{
              flex: 1, background: c.gray, borderRadius: 14, padding: '24px 28px',
              borderTop: `4px solid ${i === 0 ? c.red : c.grayMid}`,
              animationDelay: `${0.5 + i * 0.1}s`,
            }}>
              <div style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, color: c.text }}>{item.title}</div>
              <div style={{ fontFamily: font.sans, fontSize: 22, color: c.muted, marginTop: 8, lineHeight: 1.4 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 29. Self-service Workflow ──────────────────────────────────────────────
const SelfService: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module C — Self-service</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 0', lineHeight: 1.05,
      }}>
        Self-service workflow
      </h2>

      {/* Swimlane diagram */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
        {[
          { lane: 'Developer', steps: [
            { label: 'Edit Containerfile', active: false },
            { label: 'Open PR', active: true },
          ]},
          { lane: 'Platform Team', steps: [
            { label: 'Review & approve', active: false },
            { label: 'Merge', active: true },
          ]},
          { lane: 'OpenShift', steps: [
            { label: 'BuildConfig triggers', active: false },
            { label: 'Image pushed to registry', active: false },
            { label: 'Workspaces updated', active: true },
          ]},
        ].map((row, ri) => (
          <div key={row.lane} className="fadeUp" style={{
            display: 'flex', alignItems: 'stretch', gap: 0,
            animationDelay: `${0.2 + ri * 0.15}s`,
          }}>
            <div style={{
              width: 200, flexShrink: 0, padding: '20px 24px',
              background: ri === 2 ? c.dark : c.gray,
              color: ri === 2 ? c.white : c.text,
              borderRadius: '14px 0 0 14px',
              fontFamily: font.display, fontSize: 24, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: ri < 2 ? `1px solid ${c.grayMid}` : 'none',
              borderRight: 'none',
            }}>
              {row.lane}
            </div>
            <div style={{
              flex: 1, display: 'flex', alignItems: 'center', gap: 0,
              padding: '20px 32px',
              background: ri === 2 ? `${c.dark}08` : `${c.gray}80`,
              borderRadius: '0 14px 14px 0',
              border: `1px solid ${ri === 2 ? `${c.dark}20` : c.grayMid}`,
              borderLeft: 'none',
            }}>
              {row.steps.map((step, si) => (
                <div key={step.label} style={{ display: 'flex', alignItems: 'center' }}>
                  {si > 0 && <span style={{ fontSize: 24, color: c.muted, margin: '0 20px' }}>→</span>}
                  <span style={{
                    fontFamily: font.mono, fontSize: 22, padding: '12px 24px',
                    borderRadius: 12,
                    background: step.active ? c.red : 'transparent',
                    color: step.active ? c.white : c.text,
                    fontWeight: step.active ? 600 : 400,
                  }}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom notes */}
      <div className="fadeUp" style={{
        display: 'flex', gap: 40, animationDelay: '0.7s',
      }}>
        {[
          { title: 'Tier 4 — Personal', desc: 'Opt-in fork for individual experimentation' },
          { title: 'Lifecycle controls', desc: 'Image scanning and policies prevent sprawl' },
        ].map(item => (
          <div key={item.title} style={{
            flex: 1, fontFamily: font.sans, fontSize: 24, color: c.muted,
            display: 'flex', gap: 12, alignItems: 'baseline',
          }}>
            <span style={{ color: c.redText, fontSize: 18, flexShrink: 0 }}>&#9656;</span>
            <span><strong style={{ color: c.text }}>{item.title}</strong> — {item.desc}</span>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 30. CI/CD Divider ──────────────────────────────────────────────────────
const CICDDivider: Page = () => (
  <div style={{ ...fill, background: c.dark, color: c.white }}>
    <Styles />
    <div style={{
      position: 'absolute', inset: 0, padding: '0 120px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <div style={{ fontFamily: font.mono, fontSize: 18, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
        Deep Dive
      </div>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 100, fontWeight: 900,
        letterSpacing: '-0.04em', lineHeight: 1.05, margin: 0,
      }}>
        CI/CD<br/><span style={{ background: 'linear-gradient(90deg, #ee0000, #ff4444)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>integration</span>
      </h2>
    </div>
    <Footer dark />
  </div>
);

// ─── 30b. CI/CD Refresher ───────────────────────────────────────────────────
const CICDRefresher: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>Module D — Recap</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 56px', lineHeight: 1.05,
      }}>
        CI/CD integration at a glance
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <Bullet bold="Inner loop" text="developers write, lint, and test locally with ADT before pushing" />
        <Bullet bold="Outer loop" text="on PR, CI runs ansible-lint and molecule against the team's quality profile" />
        <Bullet bold="EE pipeline" text="on merge, ansible-builder creates the execution environment and pushes to registry" />
        <Bullet bold="This module" text="covers PR gates, EE pipelines, GitOps sync to Controller, and development observability" />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 31. PR Quality Gates ───────────────────────────────────────────────────
const PRGates: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>Module D — PR Gates</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 56px', lineHeight: 1.05,
      }}>
        The outer loop: PR quality gates
      </h2>
      <div style={{ display: 'flex', gap: 40, flex: 1, minHeight: 0, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Bullet bold="ansible-lint in CI" text="enforce the team's lint profile (moderate → production)" />
          <Bullet bold="molecule CI" text="run integration tests against target platforms" />
          <Bullet bold="ansible-sign" text="validate content signatures on merge" />
          <Bullet bold="SARIF output" text="GitHub code scanning annotations on every PR" />
        </div>
        <Terminal title="GitHub Actions" lines={[
          '# .github/workflows/ci.yml',
          'jobs:',
          '  lint:',
          '    runs-on: ubuntu-latest',
          '    steps:',
          '      - uses: actions/checkout@v4',
          '      - run: pip install ansible-lint',
          '      - run: ansible-lint --profile=production',
          '             --sarif-file=results.sarif',
          '',
          '  molecule:',
          '    runs-on: ubuntu-latest',
          '    steps:',
          '      - run: molecule test',
        ]} />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 32. EE Pipeline ────────────────────────────────────────────────────────
const EEPipeline: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>Module D — EE Pipeline</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 56px', lineHeight: 1.05,
      }}>
        Execution Environment pipeline
      </h2>

      {/* Pipeline flow diagram */}
      <div className="fadeUp" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 20, marginBottom: 40, animationDelay: '0.2s',
      }}>
        {['Merge', 'ansible-builder', 'Registry', 'Controller'].map((step, i) => (
          <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{
              background: i === 3 ? c.red : c.gray, color: i === 3 ? c.white : c.text,
              borderRadius: 12, padding: '16px 28px',
              fontFamily: font.mono, fontSize: 20, fontWeight: 500,
              border: i < 3 ? `1px solid ${c.grayMid}` : 'none',
            }}>
              {step}
            </div>
            {i < 3 && <span style={{ fontSize: 24, color: c.muted }}>→</span>}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 48, flex: 1, minHeight: 0, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Bullet bold="Build" text="on merge, ansible-builder creates the EE container image" />
          <Bullet bold="Publish" text="image pushed to registry (Quay, GHCR, or private)" />
          <Bullet bold="Deploy" text="Automation Controller pulls the updated EE automatically" />
          <Bullet bold="No drift" text="same image runs in dev, CI, and production" />
        </div>
        <div className="fadeUp" style={{
          flex: 1, borderRadius: 16, border: `2px dashed ${c.grayMid}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: 280, animationDelay: '0.4s', background: c.gray,
        }}>
          <span style={{ fontFamily: font.mono, fontSize: 20, color: c.muted, textAlign: 'center', padding: 32 }}>
            Screenshot: Quay.io registry or GitHub Actions EE build log
          </span>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 33. GitOps Controller Sync ─────────────────────────────────────────────
const GitOps: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>Module D — GitOps</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 56px', lineHeight: 1.05,
      }}>
        Controller sync: GitOps for automation
      </h2>
      <div style={{ display: 'flex', gap: 48, flex: 1, minHeight: 0, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Bullet bold="Git sync" text="Controller syncs projects on schedule or webhook" />
          <Bullet bold="Zero-touch flow" text="PR → merge → Controller without manual steps" />
          <Bullet bold="RBAC" text="controls who can run what — separation of dev and ops" />
          <Bullet bold="Audit trail" text="every execution traced back to a specific commit" />
        </div>
        <div className="fadeUp" style={{
          flex: 1, borderRadius: 16, border: `2px dashed ${c.grayMid}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: 280, animationDelay: '0.4s', background: c.gray,
        }}>
          <span style={{ fontFamily: font.mono, fontSize: 20, color: c.muted, textAlign: 'center', padding: 32 }}>
            Screenshot: AAP Controller project sync or webhook config
          </span>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 34. Development Observability ──────────────────────────────────────────
const Observability: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>Module D — Observability</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 56px', lineHeight: 1.05,
      }}>
        Development observability
      </h2>
      <div style={{ display: 'flex', gap: 48, flex: 1, minHeight: 0, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Bullet bold="Dashboards" text="Grafana views for workflow and development metrics" />
          <Bullet bold="Track" text="build times, lint violations over time, test coverage trends" />
          <Bullet bold="Bottleneck detection" text="which teams are blocked? Where do PRs stall?" />
          <Bullet bold="Data-driven" text="decisions on tooling investment and training needs" />
        </div>
        <div className="fadeUp" style={{
          flex: 1, borderRadius: 16, border: `2px dashed ${c.grayMid}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: 280, animationDelay: '0.4s', background: c.gray,
        }}>
          <span style={{ fontFamily: font.mono, fontSize: 20, color: c.muted, textAlign: 'center', padding: 32 }}>
            Screenshot: Grafana dashboard with build times, lint violations, PR velocity
          </span>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 35. Migration Divider ──────────────────────────────────────────────────
const MigrationDivider: Page = () => (
  <div style={{ ...fill, background: c.dark, color: c.white }}>
    <Styles />
    <div style={{
      position: 'absolute', inset: 0, padding: '0 120px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <div style={{ fontFamily: font.mono, fontSize: 18, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
        Deep Dive
      </div>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 100, fontWeight: 900,
        letterSpacing: '-0.04em', lineHeight: 1.05, margin: 0,
      }}>
        Legacy Automation<br/><span style={{ background: 'linear-gradient(90deg, #ee0000, #ff4444)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>to Ansible</span>
      </h2>
    </div>
    <Footer dark />
  </div>
);

// ─── 35b. Migration Refresher ───────────────────────────────────────────────
const MigrationRefresher: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>Module E — Recap</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 56px', lineHeight: 1.05,
      }}>
        Legacy migration at a glance
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <Bullet bold="The problem" text="organizations run Chef, Puppet, Bladelogic, or shell scripts alongside Ansible — costly and fragmented" />
        <Bullet bold="x2Ansible" text="AI-powered tool that converts legacy automation to Ansible roles and playbooks" />
        <Bullet bold="Not a blind translator" text="generates idiomatic Ansible following good practices, not line-by-line conversion" />
        <Bullet bold="This module" text="covers why migrate, the x2Ansible tool, and the end-to-end migration workflow" />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 36. Why Migrate ────────────────────────────────────────────────────────
const WhyMigrate: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>Module E — The Problem</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 56px', lineHeight: 1.05,
      }}>
        Why migrate?
      </h2>
      <div style={{ display: 'flex', gap: 48, flex: 1, minHeight: 0, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Bullet bold="Cost pressure" text="legacy tool contracts expiring or costs rising" />
          <Bullet bold="Skills gap" text="fewer engineers know Chef/Puppet/Bladelogic, more know Ansible" />
          <Bullet bold="Consolidation" text="one automation platform instead of three or four" />
          <Bullet bold="Manual conversion" text="slow (~2-4 weeks per complex recipe) and error-prone" />
        </div>
        {/* Convergence diagram */}
        <div className="fadeUp" style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 32, animationDelay: '0.3s',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Chef', 'Puppet', 'Bladelogic', 'Shell scripts'].map((tool, i) => (
              <div key={tool} className="fadeUp" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                <div style={{
                  width: 200, padding: '14px 24px', borderRadius: 10,
                  background: c.gray, border: `1px solid ${c.grayMid}`,
                  fontFamily: font.mono, fontSize: 20, color: c.muted, textAlign: 'center',
                }}>
                  {tool}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 28, color: c.muted }}>→</span>
            <span style={{ fontSize: 28, color: c.muted }}>→</span>
            <span style={{ fontSize: 28, color: c.muted }}>→</span>
            <span style={{ fontSize: 28, color: c.muted }}>→</span>
          </div>
          <div style={{
            width: 200, padding: '48px 24px', borderRadius: 14,
            background: c.red, color: c.white,
            fontFamily: font.display, fontSize: 28, fontWeight: 700, textAlign: 'center',
          }}>
            Ansible
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 37. x2Ansible ──────────────────────────────────────────────────────────
const X2Ansible: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>Module E — x2Ansible</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 56px', lineHeight: 1.05,
      }}>
        x2Ansible: AI-assisted conversion
      </h2>
      <div style={{ display: 'flex', gap: 48, flex: 1, minHeight: 0, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Bullet bold="Multi-source" text="converts Chef, Puppet, BMC Bladelogic to Ansible roles" />
          <Bullet bold="Powered by OpenShift AI" text="understands automation intent, not just syntax" />
          <Bullet bold="Idiomatic output" text="FQCN, proper module usage, role structure" />
          <Bullet bold="ADT-ready" text="molecule-ready, lint-clean out of the box" />
        </div>
        {/* Conversion pipeline */}
        <div className="fadeUp" style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: 16, animationDelay: '0.3s',
        }}>
          <div style={{
            width: 320, padding: '18px 28px', borderRadius: 12,
            background: c.gray, border: `1px solid ${c.grayMid}`,
            fontFamily: font.mono, fontSize: 20, color: c.muted, textAlign: 'center',
          }}>
            recipe.rb / manifest.pp
          </div>
          <div style={{ fontSize: 22, color: c.muted }}>↓</div>
          <div style={{
            width: 320, padding: '18px 28px', borderRadius: 12,
            background: c.dark, color: c.white,
            fontFamily: font.display, fontSize: 22, fontWeight: 700, textAlign: 'center',
          }}>
            x2Ansible + OpenShift AI
          </div>
          <div style={{ fontSize: 22, color: c.muted }}>↓</div>
          <div style={{
            width: 320, padding: '18px 28px', borderRadius: 12,
            background: c.red, color: c.white,
            fontFamily: font.mono, fontSize: 20, textAlign: 'center',
          }}>
            roles/my_role/
          </div>
          <div style={{ fontFamily: font.mono, fontSize: 16, color: c.muted, marginTop: 8 }}>
            FQCN + molecule + lint-clean
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 38. Migration Workflow ─────────────────────────────────────────────────
const MigrationWorkflow: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionTag light>Module E — Workflow</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 80, fontWeight: 700,
        letterSpacing: '-0.035em', margin: '0 0 56px', lineHeight: 1.05,
      }}>
        Migration workflow
      </h2>
      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Bullet bold="Assessment" text="inventory legacy automation, classify complexity, estimate effort" />
          <Bullet bold="Conversion" text="x2Ansible generates Ansible roles from source recipes/manifests" />
          <Bullet bold="Validation" text="molecule tests + side-by-side comparison with legacy output" />
          <Bullet bold="Rollout" text="phased deployment via Controller, parallel-run with legacy until confident" />
        </div>
        {/* Workflow diagram */}
        <div className="fadeUp" style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 0, animationDelay: '0.3s', marginTop: 24,
        }}>
          {[
            { label: 'Assessment', color: c.gray, text: c.text },
            { label: 'Conversion', color: c.gray, text: c.text },
            { label: 'Validation', color: c.gray, text: c.text },
            { label: 'Rollout', color: c.red, text: c.white },
          ].map((step, i) => (
            <div key={step.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {i > 0 && <div style={{ fontSize: 22, color: c.muted, padding: '8px 0' }}>↓</div>}
              <div style={{
                width: 320, padding: '16px 28px', borderRadius: 12,
                background: step.color, color: step.text,
                fontFamily: font.display, fontSize: 22, fontWeight: 600, textAlign: 'center',
                border: step.color === c.gray ? `1px solid ${c.grayMid}` : 'none',
              }}>
                {step.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 39. Thank You ──────────────────────────────────────────────────────────
const ThankYou: Page = () => (
  <div style={{ ...fill, background: c.red, color: c.white }}>
    <Styles />
    <div style={{
      position: 'absolute', inset: 0, padding: '120px 120px 80px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 120, fontWeight: 900,
        letterSpacing: '-0.04em', lineHeight: 1.0, margin: 0,
      }}>
        Thank you
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 80 }}>
        <p className="fadeUp" style={{
          fontFamily: font.sans, fontSize: 22, lineHeight: 1.6,
          color: 'rgba(255,255,255,0.8)', animationDelay: '0.2s',
        }}>
          Red Hat is the world's leading provider of enterprise open source software solutions,
          using a community-powered approach to deliver high-performing Linux, cloud, container,
          and Kubernetes technologies.
        </p>

        <div className="fadeUp" style={{
          display: 'flex', flexDirection: 'column', gap: 20,
          fontFamily: font.sans, fontSize: 20, color: 'rgba(255,255,255,0.7)',
          animationDelay: '0.35s',
        }}>
          <span>linkedin.com/company/red-hat</span>
          <span>youtube.com/user/RedHatVideos</span>
          <span>facebook.com/redhatinc</span>
        </div>
      </div>

    </div>
    <Footer dark onRed />
  </div>
);

// ─── Meta & Export ──────────────────────────────────────────────────────────
export const meta: SlideMeta = {
  title: 'Closing the Loop: Driving Enterprise Ansible Developer Experience',
  theme: 'redhat',
};

export const notes = {
  0: "Set context: this is about the journey every automation team goes through. Alternative title for technical audiences: 'Inner Loops, Outer Gates: The Complete Ansible Developer Journey'.",
  1: "Adjust these numbers to your customer — regulated industries skew higher, cloud-native shops lower. The point isn't the exact days, it's that none of them are 5 minutes.",
  2: "Pause for effect. This is the thesis of the talk.",
  3: "ADT bundles 12 tools into one install — adt --version shows all tools with compatible, tested versions. No more dependency conflicts.",
  4: "Most customers are between Crawl and Walk. The container-based methods are the target. Key: uv/pip is free (upstream). RPM requires AAP subscription + RHEL 9. Dev Container has free community image and supported image. Dev Spaces requires OpenShift + Dev Spaces operator.",
  5: "Two loops: inner loop is daily developer experience (write, lint, molecule test, iterate). Outer loop is what happens on push: PR triggers GitHub Actions with molecule CI + ansible-lint + compliance scanning. On merge, approved content syncs to Automation Controller via GitOps.",
  6: "Transition: we've shown the tools, now how do you roll them out to 50 or 500 developers?",
  7: "Sweet spot for most teams starting out. Zero infrastructure investment, immediate consistency. Available as community image (ghcr.io/ansible/community-ansible-dev-tools, free) or supported image (registry.redhat.io, AAP subscription).",
  8: "Value prop for Dev Spaces is governance + zero desktop requirements. IT loves it because nothing runs locally. Requires OpenShift + Dev Spaces operator. Note: downstream supported Dev Spaces image will be available with AAP 2.7 — currently community-only (ghcr.io/ansible/ansible-devspaces).",
  9: "Both MCP servers are tech preview. The key insight: AI doesn't replace the developer, it accelerates the content lifecycle by removing manual steps.",
  10: "This is the engagement model. The assessment is a 1-day whiteboard session. The PoC typically takes 2-4 weeks with a single pilot team.",
  11: "This module walks through the key tools in the Ansible Development Tools bundle and how they connect across the Create → Test → Deploy lifecycle.",
  12: "ansible-creator replaces the old 'copy an existing role and rename things' workflow. Run ansible-creator init collection or ansible-creator init role to get started.",
  13: "The profiles are the key feature — start a team on 'moderate' and ratchet up to 'production' over time. The --fix flag automatically corrects common issues. SARIF output integrates with GitHub Advanced Security for PR annotations.",
  14: "Molecule creates a container, runs your role, verifies the result, and tears it down. The Podman driver is the default — it works inside dev containers with nested Podman.",
  15: "pytest-ansible is for testing the Python code inside modules and plugins — not for testing playbooks (that's molecule). tox-ansible generates a test matrix.",
  16: "Execution Environments are the deployment unit for automation content. Instead of installing collections on every Controller node, you build a container image with everything baked in.",
  17: "ansible-navigator replaces the traditional ansible-playbook command for EE-based workflows. ansible-sign uses GPG to sign project directories.",
  18: "This module covers the two MCP servers that connect AI assistants to Ansible tooling. Both are tech preview as of AAP 2.6.",
  19: "MCP is an open protocol — AI assistants discover available tools and call them with structured input/output. The key point: the AI doesn't replace the developer's judgment, it removes manual steps.",
  20: "The Devtools MCP server is @ansible/ansible-mcp-server on npm. It wraps the ADT CLI tools so an AI assistant can scaffold a project, lint it, fix violations, and navigate the collection structure.",
  21: "The AAP MCP server connects to the AAP gateway API (2.6.4+). It lets an AI assistant query inventory, launch job templates, and check system status.",
  22: "This module covers the tiered image strategy for customizing Dev Spaces environments.",
  23: "Container immutability is a feature, not a bug — we don't want developers running dnf install in their workspaces because that creates drift.",
  24: "Tier 1 is managed by the ansible-dev-tools upstream project. Tier 2 is where most organizations focus — it's the standard deployment path.",
  25: "Tier 2 is where the real value is for enterprise customers. When you hit 5+ domain variants, CEKit pays off — adding a new domain is a YAML file, not a Containerfile.",
  26: "ImageStream triggers are the key automation mechanism. When the upstream base image updates, OpenShift automatically triggers rebuilds of every Tier 2 image. For rollback, re-tag the ImageStream.",
  27: "The self-service model keeps the platform team as gatekeepers without making them a bottleneck. Set lifecycle policies to clean up stale personal images after 30/60/90 days.",
  28: "This module covers the outer loop — what happens when a developer pushes code.",
  29: "The outer loop is the automated enforcement layer. When a developer opens a PR, GitHub Actions runs ansible-lint with the team's profile and molecule tests.",
  30: "This is the deployment pipeline for automation content. The EE definition file is versioned in the repo, so the image is always reproducible.",
  31: "Controller project sync is the GitOps mechanism for Ansible. Every job execution in Controller records the project revision (commit SHA).",
  32: "Observability closes the feedback loop. Grafana dashboards pull metrics from GitHub Actions, ansible-lint, and Automation Controller.",
  33: "This module covers the migration path from legacy automation tools to Ansible.",
  34: "The business case is usually one of three: contract renewal, consolidation, or skills gap.",
  35: "x2Ansible is not a syntax translator — it's an AI that understands the intent of the source automation and generates idiomatic Ansible.",
  36: "The workflow is designed to minimize risk. Assessment inventories all legacy automation. Validation is critical: run molecule tests AND compare output side-by-side. Rollout is phased — run Ansible in parallel with legacy.",
  37: "",
};

// ─── Screenshot Placeholder Slides ──────────────────────────────────────────
const ScreenshotSlide = ({ title, hint }: { title: string; hint: string }) => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '72px 120px 90px', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        fontFamily: font.mono, fontSize: 14, letterSpacing: '0.1em',
        textTransform: 'uppercase' as const, color: c.red, marginBottom: 12,
      }}>
        Screenshot placeholder
      </div>
      <h2 style={{
        fontFamily: font.display, fontSize: 56, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 40px', lineHeight: 1.1, color: c.dark,
      }}>
        {title}
      </h2>
      <div style={{
        flex: 1, borderRadius: 16,
        border: `2px dashed ${c.grayMid}`, background: `${c.gray}80`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 20, padding: 48,
      }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={c.muted} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
        </svg>
        <span style={{ fontFamily: font.sans, fontSize: 24, color: c.muted, textAlign: 'center', maxWidth: 800, lineHeight: 1.6 }}>
          {hint}
        </span>
      </div>
    </div>
    <Footer />
  </div>
);

const ScreenshotLifecycle: Page = () => (
  <ScreenshotSlide
    title="Inner loop / outer loop architecture"
    hint="Paste the development workflow diagram showing inner loop (write → lint → test → iterate) and outer loop (PR → CI → merge → Controller sync). See Developer Journey deck pages 5-6."
  />
);

const ScreenshotDevSpaces: Page = () => (
  <ScreenshotSlide
    title="Dev Spaces in action"
    hint="Screenshot of a Dev Spaces workspace running in the browser — VS Code in OpenShift with the Ansible extension active, showing a playbook open and the terminal ready."
  />
);

const ScreenshotLint: Page = () => (
  <ScreenshotSlide
    title="ansible-lint in VS Code"
    hint="Screenshot of VS Code with the Ansible extension showing inline lint violations — squiggles on bad practices, Problems panel at the bottom with rule names. See 'From Create to Deploy' deck page 15."
  />
);

const ScreenshotMolecule: Page = () => (
  <ScreenshotSlide
    title="molecule test output"
    hint="Screenshot of a real molecule test run in the terminal — showing the Dependency → Create → Converge → Verify → Idempotence → Destroy pipeline with green checkmarks."
  />
);

const ScreenshotNavigator: Page = () => (
  <ScreenshotSlide
    title="ansible-navigator TUI"
    hint="Screenshot of ansible-navigator running a playbook or inspecting an execution environment — the TUI interface showing the run output or collection browser."
  />
);

const ScreenshotMCP: Page = () => (
  <ScreenshotSlide
    title="AI assistant using MCP"
    hint="Screenshot of an AI assistant (Claude, VS Code Copilot, or similar) using the Ansible MCP server — a conversation showing the AI linting code, scaffolding a role, or querying AAP job status."
  />
);

const ScreenshotGrafana: Page = () => (
  <ScreenshotSlide
    title="Grafana development dashboard"
    hint="Screenshot of a Grafana dashboard showing GitHub development metrics — PR velocity, lint violation trends, build times, test coverage. See Developer Journey deck page 13."
  />
);

export default [
  Title,
  OnboardingProblem,
  FiveMinutes,
  Toolchain,
  MaturityPath,
  ContentLifecycle,
  ScreenshotLifecycle,
  ScalingDivider,
  DevContainers,
  DevSpaces,
  ScreenshotDevSpaces,
  AIOverview,
  NextSteps,
  ADTDivider,
  ADTRefresher,
  AnsibleCreator,
  AnsibleDevEnv,
  AnsibleLint,
  Molecule,
  PytestTox,
  AnsibleBuilder,
  AnsibleNavigator,
  ScreenshotNavigator,
  AnsibleSign,
  AIDivider,
  AIRefresher,
  MCPvsModules,
  MCPArchitecture,
  DevtoolsMCP,
  AAPMCP,
  ScreenshotMCP,
  DevSpacesDivider,
  DevSpacesRefresher,
  WhyCustomize,
  TieredStrategy,
  Tier2Detail,
  AutoRebuild,
  SelfService,
  CICDDivider,
  CICDRefresher,
  PRGates,
  EEPipeline,
  GitOps,
  Observability,
  ScreenshotGrafana,
  MigrationDivider,
  MigrationRefresher,
  WhyMigrate,
  X2Ansible,
  MigrationWorkflow,
  ThankYou,
] satisfies Page[];
