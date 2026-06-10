import { type Page, useSlidePageNumber } from '@open-slide/core';

const c = {
  red: '#ee0000', accentDk: '#a60000',
  bg: '#151515', divider: '#292929', white: '#ffffff',
  muted: '#6a6e73', gray: '#f0f0f0', grayMid: '#d2d2d2',
  surface: '#1a1c20', surfaceHi: '#222428',
  border: 'rgba(255,255,255,0.08)',
};

const font = {
  display: '"Red Hat Display", "Inter", system-ui, sans-serif',
  sans: '"Red Hat Text", "Inter", system-ui, sans-serif',
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
  .fadeUp { opacity: 0; animation: fadeUp 0.9s cubic-bezier(.2,.7,.2,1) forwards; }
  .fadeIn { opacity: 0; animation: fadeIn 1.2s ease forwards; }
  .gradient-text {
    background: linear-gradient(90deg, #ee0000, #a60000);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .gradient-text.light {
    background-image: linear-gradient(90deg, #ee0000, #ff4444);
  }
`;
const Styles = () => <style>{styles}</style>;

const Footer = ({ dark = false }: { dark?: boolean }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 80px',
      fontSize: 20, color: dark ? 'rgba(255,255,255,0.4)' : c.muted,
      fontFamily: font.mono,
    }}>
      <span>RED HAT</span>
      <span>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </div>
  );
};

const AccentBar = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: c.red }} />
);

const SectionTag = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <div style={{
    fontFamily: font.mono, fontSize: 18, letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: light ? c.muted : 'rgba(255,255,255,0.5)',
    marginBottom: 16,
  }}>
    {children}
  </div>
);

const Bullet = ({ bold, text, dark = true }: { bold?: string; text: string; dark?: boolean }) => (
  <div style={{
    display: 'flex', gap: 24, alignItems: 'flex-start',
    color: dark ? '#151515' : c.white,
    fontFamily: font.sans,
  }}>
    <span style={{ color: dark ? c.accentDk : 'rgba(255,255,255,0.7)', fontSize: 24, marginTop: bold ? 8 : 6, flexShrink: 0 }}>&#9656;</span>
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

const Cover: Page = () => (
  <div style={{ ...fill, background: c.bg, color: c.white }}>
    <Styles />
    <div style={{
      position: 'absolute', inset: 0, padding: '100px 120px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <SectionTag>Keynote</SectionTag>
      <h1 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 88, fontWeight: 700,
        letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0,
      }}>
        Your Presentation Title
      </h1>
      <p className="fadeUp" style={{
        marginTop: 24, fontSize: 36, fontFamily: font.display, fontWeight: 600,
        color: 'rgba(255,255,255,0.85)', animationDelay: '0.3s',
      }}>
        A subtitle that explains the talk
      </p>
      <p className="fadeUp" style={{
        marginTop: 24, fontSize: 22,
        color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', animationDelay: '0.45s',
      }}>
        Presenter Name — Title
      </p>
    </div>
    <Footer dark />
  </div>
);

const Content: Page = () => (
  <div style={{ ...fill, background: c.white, color: '#151515' }}>
    <Styles />
    <PatternBg />
    <AccentBar />
    <div style={{
      position: 'absolute', inset: 0, padding: '72px 120px 90px',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <SectionTag light>Section Name</SectionTag>
      <h2 className="fadeUp" style={{
        fontFamily: font.display, fontSize: 64, fontWeight: 700,
        letterSpacing: '-0.03em', margin: 0, lineHeight: 1.1,
      }}>
        Content page heading
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginTop: 48 }}>
        <Bullet bold="First point" text="Supporting detail that explains the key takeaway for the audience" />
        <Bullet bold="Second point" text="Another supporting detail with just enough context to be clear" />
        <Bullet bold="Third point" text="Keep bullet lists to 3-5 items so the slide breathes" />
      </div>
    </div>
    <Footer />
  </div>
);

const Closer: Page = () => (
  <div style={{ ...fill, background: c.bg, color: c.white }}>
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
          fontSize: 22, lineHeight: 1.6,
          color: 'rgba(255,255,255,0.8)', animationDelay: '0.2s',
        }}>
          Red Hat is the world's leading provider of enterprise open source software solutions,
          using a community-powered approach to deliver high-performing Linux, cloud, container,
          and Kubernetes technologies.
        </p>
        <div className="fadeUp" style={{
          display: 'flex', flexDirection: 'column', gap: 20,
          fontSize: 20, color: 'rgba(255,255,255,0.7)',
          animationDelay: '0.35s',
        }}>
          <span>linkedin.com/company/red-hat</span>
          <span>youtube.com/user/RedHatVideos</span>
          <span>facebook.com/redhatinc</span>
        </div>
      </div>
    </div>
    <Footer dark />
  </div>
);

export default [Cover, Content, Closer];
