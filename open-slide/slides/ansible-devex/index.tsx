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
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;600;700;900&family=Red+Hat+Text:wght@400;500;600&family=Red+Hat+Mono:wght@400;500&display=swap');
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .fadeUp { opacity: 0; animation: fadeUp 0.8s cubic-bezier(.2,.7,.2,1) forwards; }
  .fadeIn { opacity: 0; animation: fadeIn 0.6s ease forwards; }
`;
const Styles = () => <style>{styles}</style>;

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

const Terminal = ({ lines }: { lines: string[] }) => (
  <div style={{
    flex: 1, minWidth: 440, borderRadius: 14, overflow: 'hidden',
    background: c.darkest, border: `1px solid ${c.dark}`,
    display: 'flex', flexDirection: 'column',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  }}>
    <div style={{
      height: 36, padding: '0 14px', display: 'flex', alignItems: 'center', gap: 8,
      background: c.dark, borderBottom: `1px solid rgba(255,255,255,0.06)`,
    }}>
      {['#ff5f56', '#ffbd2e', '#27c93f'].map(clr => (
        <span key={clr} style={{ width: 11, height: 11, borderRadius: '50%', background: clr }} />
      ))}
    </div>
    <div style={{
      flex: 1, padding: '20px 24px', fontFamily: font.mono, fontSize: 18,
      lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', overflow: 'hidden',
    }}>
      {lines.map((line, i) => (
        <div key={i}>
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
    </div>
  </div>
);

const Bullet = ({ bold, text, dark = true }: { bold?: string; text: string; dark?: boolean }) => (
  <div style={{
    display: 'flex', gap: 18, alignItems: 'flex-start',
    fontSize: 32, lineHeight: 1.5, color: dark ? c.text : c.white, fontFamily: font.sans,
  }}>
    <span style={{ color: c.redText, fontSize: 24, marginTop: 8, flexShrink: 0 }}>&#9656;</span>
    <span>
      {bold && <strong style={{ fontWeight: 600 }}>{bold}: </strong>}
      {text}
    </span>
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
      style={{
        position: 'absolute', right: 40, top: '50%', transform: 'translateY(-50%)',
        height: '80%', width: 'auto', opacity: 0.12, animationDelay: '0.5s',
      }} />

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
      <AccentBar />
      <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
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
  <div style={{ ...fill, background: c.red, color: c.white }}>
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
        <span style={{ color: '#ffffff', fontWeight: 400, fontStyle: 'italic' }}>5 minutes?</span>
      </h2>
    </div>
    <Footer dark onRed />
  </div>
);

// ─── 04. ADT Toolchain ──────────────────────────────────────────────────────
const Toolchain: Page = () => {
  const groups = [
    { title: 'Create', color: '#2e7d6f', icon: <IconCreate size={64} color="#2e7d6f" />, items: ['ansible-creator', 'ansible-dev-environment', 'ansible-core'] },
    { title: 'Test', color: '#b8860b', icon: <IconTest size={64} color="#b8860b" />, items: ['ansible-lint', 'molecule', 'pytest-ansible', 'tox-ansible'] },
    { title: 'Deploy', color: '#a60000', icon: <IconDeploy size={64} color="#a60000" />, items: ['ansible-builder', 'ansible-navigator', 'ansible-sign'] },
  ];
  return (
    <div style={{ ...fill, background: c.white, color: c.text }}>
      <Styles />
      <AccentBar />
      <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
        <SectionTag light>The Toolchain</SectionTag>
        <h2 className="fadeUp" style={{
          fontFamily: font.display, fontSize: 72, fontWeight: 700,
          letterSpacing: '-0.03em', margin: 0, lineHeight: 1.1,
        }}>
          Ansible Development Tools
        </h2>

        <div style={{
          flex: 1, display: 'flex', gap: 40, marginTop: 56, minHeight: 0,
        }}>
          {groups.map((g, gi) => (
            <div key={g.title} className="fadeUp" style={{
              flex: 1, background: c.gray, borderRadius: 16,
              padding: '36px 40px', display: 'flex', flexDirection: 'column',
              animationDelay: `${0.2 + gi * 0.15}s`,
              borderTop: `4px solid ${g.color}`,
            }}>
              <div style={{ marginBottom: 16 }}>{g.icon}</div>
              <h3 style={{
                fontFamily: font.display, fontSize: 36, fontWeight: 700,
                color: g.color, margin: '0 0 20px',
              }}>
                {g.title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
      <AccentBar />
      <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
        <SectionTag light>The Journey</SectionTag>
        <h2 className="fadeUp" style={{
          fontFamily: font.display, fontSize: 72, fontWeight: 700,
          letterSpacing: '-0.03em', margin: 0, lineHeight: 1.1,
        }}>
          The maturity path
        </h2>

        <div style={{ flex: 1, display: 'flex', gap: 32, marginTop: 56, alignItems: 'stretch' }}>
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
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>The Workflow</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 72, fontWeight: 700,
        letterSpacing: '-0.03em', margin: 0, lineHeight: 1.1,
      }}>
        The content lifecycle
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
        Scaling to<br/>the enterprise
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
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Enterprise Scale</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 72, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
      }}>
        Dev Containers: team consistency
      </h2>
      <div style={{ display: 'flex', gap: 48, flex: 1, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <Bullet bold="Same image" text="same tools, same config — every developer" />
          <Bullet bold=".devcontainer/" text="lives in the repo, versioned with code" />
          <Bullet text="Works on any OS with VS Code + container runtime" />
          <Bullet text="Nested Podman for molecule and ansible-builder" />
        </div>
        <Terminal lines={[
          '# .devcontainer/devcontainer.json',
          '{',
          '  "image": "ghcr.io/ansible/',
          '    community-ansible-dev-tools:latest",',
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
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Enterprise Scale</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 72, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
      }}>
        Dev Spaces: zero local dependencies
      </h2>
      <div style={{ display: 'flex', gap: 48, flex: 1, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <Bullet text="Browser-only — ~5 minutes to coding" />
          <Bullet text="Centrally governed by platform team" />
          <Bullet bold="devfile.yaml" text="defines everything: tools, config, extensions" />
          <Bullet text="Developers just click Create — no local setup" />
        </div>
        <Terminal lines={[
          '# devfile.yaml',
          'schemaVersion: 2.2.2',
          'metadata:',
          '  name: ansible-workspace',
          'components:',
          '  - name: tooling',
          '    container:',
          '      image: registry.redhat.io/',
          '        ansible-automation-platform/',
          '        ansible-dev-tools-rhel8:latest',
          '      memoryLimit: 4Gi',
        ]} />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 10. AI-Assisted Development Overview ───────────────────────────────────
const AIOverview: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>AI-Assisted Development</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 72, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
      }}>
        AI-assisted development
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flex: 1, minHeight: 0 }}>
        {[
          { title: 'Ansible Devtools MCP', items: ['Lint & auto-fix', 'Scaffold projects', 'Navigate collections', 'Build execution environments'] },
          { title: 'AAP MCP', items: ['Job management', 'Inventory queries', 'System monitoring', 'Gateway endpoints'] },
        ].map((card, ci) => (
          <div key={card.title} className="fadeUp" style={{
            background: c.gray, borderRadius: 16, padding: '40px 48px',
            border: `2px solid ${c.red}20`,
            animationDelay: `${0.2 + ci * 0.15}s`,
          }}>
            <h3 style={{
              fontFamily: font.display, fontSize: 32, fontWeight: 700,
              color: c.redText, margin: '0 0 28px',
            }}>
              {card.title}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {card.items.map(item => (
                <div key={item} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  fontFamily: font.sans, fontSize: 24, color: c.text,
                }}>
                  <span style={{ color: c.redText, fontSize: 14 }}>&#9656;</span>
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
      <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
        <SectionTag light>Next Steps</SectionTag>
        <h2 className="fadeUp" style={{
          fontFamily: font.display, fontSize: 72, fontWeight: 700,
          letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
        }}>
          What should I do next?
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
  <div style={{ ...fill, background: c.red, color: c.white }}>
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
        Ansible Development<br/>Tools — A Closer Look
      </h2>
    </div>
    <img src={ansibleA} alt="" style={{
      position: 'absolute', right: 80, bottom: 80,
      height: 500, width: 'auto', opacity: 0.1,
    }} />
    <Footer dark onRed />
  </div>
);

// ─── 13. ansible-creator & ade ──────────────────────────────────────────────
const AnsibleCreator: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module A — Create</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 64, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
      }}>
        ansible-creator & ansible-dev-environment
      </h2>
      <div style={{ display: 'flex', gap: 48, flex: 1, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Bullet bold="ansible-creator" text="scaffold collections, roles, playbooks, and EE definitions" />
          <Bullet bold="ansible-dev-environment (ade)" text="pip-like install for collections in virtual environments" />
          <Bullet text="Opinionated project structure with molecule, lint config, and CI templates out of the box" />
          <Bullet text="Consistent starting point — no more copy-pasting boilerplate from old projects" />
        </div>
        <Terminal lines={[
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

// ─── 14. ansible-lint ───────────────────────────────────────────────────────
const AnsibleLint: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module A — Test</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 72, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 40px', lineHeight: 1.1,
      }}>
        ansible-lint
      </h2>

      {/* Lint profile progression */}
      <div className="fadeUp" style={{
        display: 'flex', gap: 8, marginBottom: 40, alignItems: 'center', animationDelay: '0.2s',
      }}>
        {['min', 'basic', 'moderate', 'safety', 'shared', 'production'].map((p, i) => (
          <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontFamily: font.mono, fontSize: 20, padding: '8px 20px',
              borderRadius: 8, background: i <= 2 ? c.gray : c.red,
              color: i <= 2 ? c.text : c.white,
              fontWeight: i === 2 ? 600 : 400,
              border: i === 2 ? `2px solid ${c.redText}` : 'none',
            }}>
              {p}
            </span>
            {i < 5 && <span style={{ color: c.muted, fontSize: 16 }}>→</span>}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Bullet bold="Auto-fix" text="with --fix for common violations" />
        <Bullet bold="CI integration" text="exit codes, SARIF output for GitHub code scanning" />
        <Bullet text="VS Code extension shows violations inline as you type" />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 15. molecule ───────────────────────────────────────────────────────────
const Molecule: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module A — Test</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 72, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
      }}>
        molecule
      </h2>
      <div style={{ display: 'flex', gap: 48, flex: 1, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Bullet text="Integration testing with ephemeral infrastructure" />
          <Bullet bold="Pluggable drivers" text="Podman, Docker, delegated, cloud" />
          <Bullet text="Collection-aware: test roles within their collection context" />
          <Bullet text="Multi-scenario support for different test configurations" />
        </div>
        <Terminal lines={[
          '$ molecule test',
          '',
          '  ── Creating instances ──',
          '✔ Created instance: rhel9',
          '',
          '  ── Converging ──',
          '✔ Apply role: myorg.myapp.webserver',
          '',
          '  ── Verifying ──',
          '✔ Verify playbook passed',
          '',
          '  ── Destroying ──',
          '✔ Destroyed instance: rhel9',
        ]} />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 16. pytest-ansible & tox-ansible ───────────────────────────────────────
const PytestTox: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module A — Test</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 72, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
      }}>
        pytest-ansible & tox-ansible
      </h2>
      <div style={{ display: 'flex', gap: 48, flex: 1, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <Bullet bold="pytest-ansible" text="pytest plugin for testing Ansible module and plugin Python code" />
          <Bullet bold="tox-ansible" text="test matrix across multiple Python and ansible-core versions" />
          <Bullet text="Complement molecule: unit tests for Python code, integration tests for roles" />
        </div>
        <Terminal lines={[
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
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 17. Execution Environments ─────────────────────────────────────────────
const ExecutionEnvs: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module A — Deploy</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 72, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
      }}>
        Execution Environments
      </h2>
      <div style={{ display: 'flex', gap: 48, flex: 1, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <Bullet bold="ansible-builder" text="build container images with collections, Python deps, and system packages" />
          <Bullet text="Same image in dev, CI, and Controller" />
          <Bullet bold="execution-environment.yml" text="versioned in your repo" />
        </div>
        <Terminal lines={[
          '# execution-environment.yml',
          'version: 3',
          'dependencies:',
          '  galaxy:',
          '    collections:',
          '      - ansible.netcommon',
          '      - cisco.ios',
          '  python:',
          '    - netaddr>=0.8',
          '  system:',
          '    - libssh-devel [platform:centos-9]',
          '',
          '$ ansible-builder build -t my-ee:latest',
          '✔ Built image: my-ee:latest',
        ]} />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 18. ansible-navigator & ansible-sign ───────────────────────────────────
const NavigatorSign: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module A — Deploy</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 72, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
      }}>
        ansible-navigator & ansible-sign
      </h2>
      <div style={{ display: 'flex', gap: 48, flex: 1, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <Bullet bold="ansible-navigator" text="TUI for running and troubleshooting automation with EEs" />
          <Bullet bold="ansible-sign" text="sign and verify project contents for supply chain security" />
          <Bullet text="Signing ensures content integrity from dev to production" />
        </div>
        <Terminal lines={[
          '$ ansible-navigator run site.yml',
          '',
          '  PLAY [webservers] ──────────',
          '  0│OK  Gather facts',
          '  1│OK  Install packages',
          '  2│CHG Deploy config',
          '  3│OK  Ensure service running',
          '',
          '$ ansible-sign project gpg-sign .',
          '✔ Signed: .ansible-sign/sha256sum.txt.sig',
        ]} />
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
        AI-Assisted<br/>Development
      </h2>
    </div>
    <Footer dark />
  </div>
);

// ─── 20. How MCP Works ──────────────────────────────────────────────────────
const MCPArchitecture: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module B — MCP Architecture</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 72, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
      }}>
        How MCP works
      </h2>

      {/* Architecture diagram */}
      <div className="fadeUp" style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        animationDelay: '0.2s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          {/* AI Assistant */}
          <div style={{
            background: c.dark, color: c.white, borderRadius: 16,
            padding: '32px 40px', textAlign: 'center',
            border: `3px solid ${c.red}`,
          }}>
            <div style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700 }}>AI Assistant</div>
            <div style={{ fontFamily: font.mono, fontSize: 16, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
              Claude, Copilot, Gemini, Cursor
            </div>
          </div>

          {/* Arrows + MCP servers + tool groups */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <span style={{ fontSize: 28, color: c.muted }}>→</span>
              <div style={{
                background: c.red, color: c.white, borderRadius: 12,
                padding: '20px 28px', fontFamily: font.display, fontSize: 22, fontWeight: 700,
                whiteSpace: 'nowrap' as const,
              }}>
                Devtools MCP
              </div>
              <span style={{ fontSize: 28, color: c.muted }}>→</span>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                {['Lint', 'Scaffold', 'Docs', 'Navigate', 'Build'].map(t => (
                  <span key={t} style={{
                    background: c.gray, borderRadius: 8, padding: '8px 16px',
                    fontFamily: font.mono, fontSize: 17, color: c.text,
                    border: `1px solid ${c.grayMid}`,
                  }}>{t}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <span style={{ fontSize: 28, color: c.muted }}>→</span>
              <div style={{
                background: c.red, color: c.white, borderRadius: 12,
                padding: '20px 28px', fontFamily: font.display, fontSize: 22, fontWeight: 700,
                whiteSpace: 'nowrap' as const,
              }}>
                AAP MCP
              </div>
              <span style={{ fontSize: 28, color: c.muted }}>→</span>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                {['Jobs', 'Inventory', 'Projects', 'Templates', 'Credentials', 'Hosts', 'Health', 'RBAC'].map(t => (
                  <span key={t} style={{
                    background: c.gray, borderRadius: 8, padding: '8px 16px',
                    fontFamily: font.mono, fontSize: 17, color: c.text,
                    border: `1px solid ${c.grayMid}`,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="fadeUp" style={{
        textAlign: 'center', fontFamily: font.sans, fontSize: 24,
        color: c.muted, animationDelay: '0.5s',
      }}>
        MCP (Model Context Protocol) exposes tools to AI assistants via a standard interface
      </p>
    </div>
    <Footer />
  </div>
);

// ─── 21. Devtools MCP Server ────────────────────────────────────────────────
const DevtoolsMCP: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module B — Devtools MCP</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 64, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
      }}>
        Ansible Devtools MCP Server
      </h2>
      <div style={{ display: 'flex', gap: 48, flex: 1, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <Bullet bold="Lint & auto-fix" text="run ansible-lint, apply --fix, iterate until clean" />
          <Bullet bold="Scaffold" text="create collections, roles, playbooks via ansible-creator" />
          <Bullet bold="Docs & knowledge" text="query documentation, apply recommended practices" />
          <Bullet bold="Navigate" text="explore collection structure, inspect modules" />
          <Bullet bold="Build" text="create execution environment definitions and images" />
          <div style={{ fontFamily: font.mono, fontSize: 18, color: c.muted, marginTop: 8 }}>
            Compatible with: Claude Code, VS Code Copilot Chat, Gemini CLI, Cursor, Windsurf
          </div>
        </div>
        <Terminal lines={[
          '# MCP client prompt:',
          '',
          '> Scaffold a network automation',
          '  collection with a backup role,',
          '  lint it, fix all violations',
          '',
          '$ ansible-creator init collection',
          '  myorg.network',
          '✔ Collection created',
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
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module B — AAP MCP</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 72, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
      }}>
        AAP MCP Server
      </h2>
      <div style={{ display: 'flex', gap: 48, flex: 1, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <Bullet bold="Job management" text="launch templates, check status, review output" />
          <Bullet bold="Inventory queries" text="list hosts, groups, variables across inventories" />
          <Bullet bold="System monitoring" text="check Controller health, node status, license usage" />
          <Bullet bold="Gateway API" text="connects to AAP 2.6.4+ unified gateway endpoints" />
        </div>
        <Terminal lines={[
          '# MCP client prompt:',
          '',
          '> Show failed jobs in the last',
          '  24 hours and launch the',
          '  remediation template',
          '',
          '  Querying AAP gateway...',
          '  3 failed jobs found:',
          '    - patch-rhel9 (timeout)',
          '    - deploy-web (auth error)',
          '    - backup-db (disk full)',
          '',
          '  Launching: remediate-hosts',
          '✔ Job #4521 started',
        ]} />
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
        Dev Spaces &<br/>Image Customization
      </h2>
    </div>
    <Footer dark />
  </div>
);

// ─── 25. Why Customize Images ───────────────────────────────────────────────
const WhyCustomize: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module C — The Problem</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 72, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
      }}>
        Why customize images?
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Bullet text="Upstream image has /var read-only — no dnf install at runtime" />
        <Bullet text="Different teams need different system packages:" />
      </div>

      {/* Domain examples */}
      <div className="fadeUp" style={{
        display: 'flex', gap: 20, marginTop: 32, marginLeft: 48, animationDelay: '0.3s',
      }}>
        {[
          { domain: 'Network', pkgs: 'libssh-devel, python3-netaddr' },
          { domain: 'Windows', pkgs: 'krb5-workstation, python3-pykerberos' },
          { domain: 'AAP CaC', pkgs: 'httpie, python3-pyyaml' },
        ].map(d => (
          <div key={d.domain} style={{
            background: c.gray, borderRadius: 12, padding: '20px 24px', flex: 1,
          }}>
            <div style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, color: c.redText }}>{d.domain}</div>
            <div style={{ fontFamily: font.mono, fontSize: 16, color: c.muted, marginTop: 8 }}>{d.pkgs}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <Bullet text="One shared image either bloats or satisfies no one" />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 26. Tiered Image Strategy ──────────────────────────────────────────────
const TieredStrategy: Page = () => {
  const tiers = [
    { n: '1', title: 'Upstream Base', desc: 'ansible-devspaces', filled: true },
    { n: '2', title: 'Org/Domain Image', desc: 'BuildConfig + CEKit', filled: true },
    { n: '3', title: 'Team Image', desc: 'Containerfile in repo', filled: false },
    { n: '4', title: 'Personal Image', desc: 'Opt-in fork', filled: false },
  ];
  return (
    <div style={{ ...fill, background: c.white, color: c.text }}>
      <Styles />
      <AccentBar />
      <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
        <SectionTag light>Module C — Strategy</SectionTag>
        <h2 className="fadeUp" style={{
          fontFamily: font.display, fontSize: 72, fontWeight: 700,
          letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
        }}>
          Tiered image strategy
        </h2>

        {/* Tier stack diagram */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
          {tiers.map((t, i) => (
            <div key={t.n} className="fadeUp" style={{
              display: 'flex', alignItems: 'center', gap: 24,
              animationDelay: `${0.2 + i * 0.12}s`,
            }}>
              <div style={{
                width: 400 - i * 40,
                background: t.filled ? c.red : c.gray,
                color: t.filled ? c.white : c.text,
                borderRadius: 12, padding: '20px 32px',
                display: 'flex', alignItems: 'center', gap: 20,
                border: t.filled ? 'none' : `2px solid ${c.grayMid}`,
              }}>
                <span style={{
                  fontFamily: font.display, fontSize: 28, fontWeight: 900,
                  opacity: 0.5,
                }}>
                  T{t.n}
                </span>
                <span style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700 }}>
                  {t.title}
                </span>
              </div>
              <span style={{ fontFamily: font.mono, fontSize: 18, color: c.muted }}>
                {t.desc}
              </span>
              {i < 3 && <div style={{
                position: 'absolute', left: 200 - i * 20, marginTop: 80,
                fontSize: 20, color: c.muted,
              }}>
                ↓
              </div>}
            </div>
          ))}
        </div>

        <p className="fadeUp" style={{
          fontFamily: font.sans, fontSize: 22, color: c.muted,
          textAlign: 'center', animationDelay: '0.7s',
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
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module C — Tier 2</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 64, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
      }}>
        Tier 2: the core deployment path
      </h2>
      <div style={{ display: 'flex', gap: 48, flex: 1, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <Bullet text="Platform team manages domain-specific images via OpenShift BuildConfig" />
          <Bullet text="One image per automation domain (network, Windows, cloud, AAP config)" />
          <Bullet bold="5+ variants" text="CEKit factory generates Containerfiles from YAML" />
        </div>
        <Terminal lines={[
          '# Containerfile — network domain',
          'FROM ansible-devspaces:latest',
          '',
          'RUN dnf install -y \\',
          '    libssh-devel \\',
          '    python3-netaddr \\',
          '  && dnf clean all',
          '',
          'RUN pip install \\',
          '    netaddr \\',
          '    napalm',
        ]} />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 28. Auto-rebuild Cascade ───────────────────────────────────────────────
const AutoRebuild: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module C — Auto-rebuild</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 72, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
      }}>
        Auto-rebuild cascade
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <Bullet text="OpenShift ImageStream triggers connect all tiers" />
        <Bullet bold="Upstream update" text="→ Org rebuild → Team rebuild (automatic)" />
        <Bullet text="Security patches flow through the chain without manual intervention" />
        <Bullet bold="Rollback" text="re-tag the previous ImageStream tag to restore a known-good image" />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 29. Self-service Workflow ──────────────────────────────────────────────
const SelfService: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module C — Self-service</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 72, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
      }}>
        Self-service workflow
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <Bullet text="Teams request image customizations via PR to the config repo" />
        <Bullet text="Platform team reviews and approves; rebuild is automatic" />
        <Bullet bold="Personal tier (Tier 4)" text="opt-in fork for individual experimentation" />
        <Bullet text="Image scanning and lifecycle policies prevent sprawl" />
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
        CI/CD<br/>Integration
      </h2>
    </div>
    <Footer dark />
  </div>
);

// ─── 31. PR Quality Gates ───────────────────────────────────────────────────
const PRGates: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module D — PR Gates</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 64, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
      }}>
        The outer loop: PR quality gates
      </h2>
      <div style={{ display: 'flex', gap: 48, flex: 1, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <Bullet bold="ansible-lint in CI" text="enforce the team's lint profile (moderate → production)" />
          <Bullet bold="molecule CI" text="run integration tests against target platforms" />
          <Bullet bold="ansible-sign" text="validate content signatures on merge" />
          <Bullet text="SARIF output for GitHub code scanning annotations" />
        </div>
        <Terminal lines={[
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
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module D — EE Pipeline</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 64, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Bullet text="On merge: ansible-builder builds the EE container image" />
        <Bullet text="Image pushed to registry (Quay, GHCR, or private registry)" />
        <Bullet text="Automation Controller pulls the updated EE automatically" />
        <Bullet bold="No drift" text="same image runs in dev, CI, and production" />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 33. GitOps Controller Sync ─────────────────────────────────────────────
const GitOps: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module D — GitOps</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 64, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
      }}>
        Controller sync: GitOps for automation
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <Bullet text="Automation Controller syncs projects from Git on schedule or webhook" />
        <Bullet text="Approved content flows from PR → merge → Controller without manual steps" />
        <Bullet bold="RBAC" text="controls who can run what — separation of dev and ops" />
        <Bullet bold="Audit trail" text="every execution traced back to a specific commit" />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 34. Development Observability ──────────────────────────────────────────
const Observability: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module D — Observability</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 72, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
      }}>
        Development observability
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <Bullet text="Grafana dashboards for workflow and development metrics" />
        <Bullet bold="Track" text="build times, lint violations over time, test coverage trends" />
        <Bullet text="Identify bottlenecks: which teams are blocked? Where do PRs stall?" />
        <Bullet text="Data-driven decisions on tooling investment and training needs" />
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
        Legacy Automation<br/>to Ansible
      </h2>
    </div>
    <Footer dark />
  </div>
);

// ─── 36. Why Migrate ────────────────────────────────────────────────────────
const WhyMigrate: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module E — The Problem</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 72, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
      }}>
        Why migrate?
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <Bullet text="Legacy tool contracts expiring or costs rising" />
        <Bullet text="Skills gap: fewer engineers know Chef/Puppet/Bladelogic, more know Ansible" />
        <Bullet text="Consolidation: one automation platform instead of three or four" />
        <Bullet text="Manual conversion is slow (~2-4 weeks per complex recipe) and error-prone" />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 37. x2Ansible ──────────────────────────────────────────────────────────
const X2Ansible: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module E — x2Ansible</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 64, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 48px', lineHeight: 1.1,
      }}>
        x2Ansible: AI-assisted conversion
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <Bullet text="Converts Chef recipes, Puppet manifests, BMC Bladelogic jobs → Ansible roles" />
        <Bullet bold="Powered by OpenShift AI" text="understands automation intent, not just syntax" />
        <Bullet text="Generates idiomatic Ansible: FQCN, proper module usage, role structure" />
        <Bullet text="Output follows ADT conventions: molecule-ready, lint-clean" />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 38. Migration Workflow ─────────────────────────────────────────────────
const MigrationWorkflow: Page = () => (
  <div style={{ ...fill, background: c.white, color: c.text }}>
    <Styles />
    <AccentBar />
    <div style={{ position: 'absolute', inset: 0, padding: '80px 120px 100px', display: 'flex', flexDirection: 'column' }}>
      <SectionTag light>Module E — Workflow</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 72, fontWeight: 700,
        letterSpacing: '-0.03em', margin: '0 0 40px', lineHeight: 1.1,
      }}>
        Migration workflow
      </h2>

      {/* Flow diagram */}
      <div className="fadeUp" style={{
        display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 40, animationDelay: '0.2s',
      }}>
        {['Assessment', 'Conversion', 'Validation', 'Rollout'].map((phase, i) => (
          <div key={phase} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{
              background: i === 3 ? c.red : c.gray,
              color: i === 3 ? c.white : c.text,
              borderRadius: 12, padding: '16px 32px',
              fontFamily: font.display, fontSize: 24, fontWeight: 700,
              border: i < 3 ? `2px solid ${c.red}20` : 'none',
            }}>
              {phase}
            </div>
            {i < 3 && <span style={{ fontSize: 24, color: c.muted }}>→</span>}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Bullet bold="Assessment" text="inventory legacy automation, classify complexity, estimate effort" />
        <Bullet bold="Conversion" text="x2Ansible generates Ansible roles from source recipes/manifests" />
        <Bullet bold="Validation" text="molecule tests + side-by-side comparison with legacy output" />
        <Bullet bold="Rollout" text="phased deployment via Controller, parallel-run with legacy until confident" />
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
  3: "ADT bundles 10 tools into one install — adt --version shows all tools with compatible, tested versions. No more dependency conflicts.",
  4: "Most customers are between Crawl and Walk. The container-based methods are the target. Key: uv/pip is free (upstream). RPM requires AAP subscription + RHEL 9. Dev Container has free community image and supported image. Dev Spaces requires OpenShift + Dev Spaces operator.",
  5: "Two loops: inner loop is daily developer experience (write, lint, molecule test, iterate). Outer loop is what happens on push: PR triggers GitHub Actions with molecule CI + ansible-lint + compliance scanning. On merge, approved content syncs to Automation Controller via GitOps.",
  6: "Transition: we've shown the tools, now how do you roll them out to 50 or 500 developers?",
  7: "Sweet spot for most teams starting out. Zero infrastructure investment, immediate consistency. Available as community image (ghcr.io/ansible/community-ansible-dev-tools, free) or supported image (registry.redhat.io, AAP subscription).",
  8: "Value prop for Dev Spaces is governance + zero desktop requirements. IT loves it because nothing runs locally. Requires OpenShift + Dev Spaces operator.",
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

export default [
  Title,
  OnboardingProblem,
  FiveMinutes,
  Toolchain,
  MaturityPath,
  ContentLifecycle,
  ScalingDivider,
  DevContainers,
  DevSpaces,
  AIOverview,
  NextSteps,
  ADTDivider,
  AnsibleCreator,
  AnsibleLint,
  Molecule,
  PytestTox,
  ExecutionEnvs,
  NavigatorSign,
  AIDivider,
  MCPArchitecture,
  DevtoolsMCP,
  AAPMCP,
  DevSpacesDivider,
  WhyCustomize,
  TieredStrategy,
  Tier2Detail,
  AutoRebuild,
  SelfService,
  CICDDivider,
  PRGates,
  EEPipeline,
  GitOps,
  Observability,
  MigrationDivider,
  WhyMigrate,
  X2Ansible,
  MigrationWorkflow,
  ThankYou,
] satisfies Page[];
