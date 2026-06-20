import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import LaunchPadMockup from '../components/ui/LaunchPadMockup';

/* ── Scroll-reveal hook ── */
const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

/* ── Parallax scroll hook ── */
const useParallax = (speed = 0.08) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    // Calculate how far through the viewport the element is
    const progress = (windowH - rect.top) / (windowH + rect.height);
    // Map to a parallax offset (-30 to +30)
    setOffset((progress - 0.5) * 60 * speed);
  }, [speed]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return [ref, offset];
};

/* ── Animated counter ── */
const Counter = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [visible, end, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

/* ── Section wrapper with reveal animation ── */
const RevealSection = ({ children, style, className = '', delay = 0 }) => {
  const [ref, visible] = useReveal(0.12);
  return (
    <section
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s cubic-bezier(0.2,0.8,0.2,1) ${delay}s, transform 0.8s cubic-bezier(0.2,0.8,0.2,1) ${delay}s`,
      }}
    >
      {children}
    </section>
  );
};

/* ── Product showcase with parallax image ── */
const ProductShowcase = ({ product, navigate }) => {
  const [imgRef, parallaxOffset] = useParallax(0.12);
  const [sectionRef, visible] = useReveal(0.12);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '100px 48px', maxWidth: '1300px', margin: '0 auto',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'opacity 0.9s cubic-bezier(0.2,0.8,0.2,1) 0.05s, transform 0.9s cubic-bezier(0.2,0.8,0.2,1) 0.05s',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: product.reverse ? '1.1fr 1fr' : '1fr 1.1fr',
        gap: '80px', alignItems: 'center',
      }}>
        {/* Text Column */}
        <div style={{ order: product.reverse ? 2 : 1 }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800,
            letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '20px',
            color: 'var(--lp-text)',
          }}>
            {product.title}
          </h2>
          <p style={{
            fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--lp-text-2)',
            marginBottom: '32px', maxWidth: '480px',
          }}>
            {product.desc}
          </p>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '14px 28px', borderRadius: '12px',
            background: product.ctaColor, color: '#fff',
            fontWeight: 600, fontSize: '0.95rem',
            transition: 'all 0.3s cubic-bezier(0.2,0.8,0.2,1)',
            boxShadow: `0 4px 16px ${product.ctaColor}33`,
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${product.ctaColor}44`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 16px ${product.ctaColor}33`; }}
          >
            {product.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>

        {/* Image Column — with parallax */}
        <div
          ref={imgRef}
          style={{
            order: product.reverse ? 1 : 2,
            borderRadius: '28px',
            overflow: 'hidden',
            padding: 0,
            lineHeight: 0,
            fontSize: 0,
            transform: `translateY(${parallaxOffset}px)`,
            boxShadow: '0 28px 72px rgba(15,23,42,0.12), 0 2px 8px rgba(15,23,42,0.05)',
            transition: 'transform 0.5s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.5s cubic-bezier(0.2,0.8,0.2,1)',
            cursor: 'default',
            willChange: 'transform',
          }}
          onMouseEnter={e => { 
            e.currentTarget.style.transform = `translateY(${parallaxOffset}px) scale(1.02)`; 
            e.currentTarget.style.boxShadow = '0 32px 80px rgba(0,0,0,0.16), 0 4px 12px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={e => { 
            e.currentTarget.style.transform = `translateY(${parallaxOffset}px) scale(1)`; 
            e.currentTarget.style.boxShadow = '0 28px 72px rgba(15,23,42,0.12), 0 2px 8px rgba(15,23,42,0.05)';
          }}
        >
          <LaunchPadMockup
            variant={product.variant}
            style={{ minHeight: product.variant === 'timeline' ? '700px' : '620px' }}
          />
        </div>
      </div>
    </section>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [builtFor, setBuiltFor] = useState(0);
  const audiences = ['Founders', 'Product Teams', 'Creators', 'Startups', 'Agencies'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rotating "Built for:" text
  useEffect(() => {
    const timer = setInterval(() => setBuiltFor(p => (p + 1) % audiences.length), 2200);
    return () => clearInterval(timer);
  }, []);

  const products = [
    {
      ctaColor: '#FF5A36',
      title: 'Your idea, mapped instantly',
      desc: 'Type, speak, or sketch your concept. LaunchPad\'s AI instantly generates a complete strategy flowchart with connected milestones, tasks, and timelines — ready to execute.',
      cta: 'Discover Strategy Engine',
      variant: 'strategy',
      reverse: false,
    },
    {
      ctaColor: '#6C5CE7',
      title: 'Timelines that build themselves',
      desc: 'Tasks auto-schedule into intelligent timelines. Drag, drop, and rearrange. LaunchPad understands dependencies and adjusts your entire project plan in real-time.',
      cta: 'Explore Smart Calendar',
      variant: 'timeline',
      reverse: true,
    },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>

      {/* ═══════════════════════════════════════════
          NAV
          ═══════════════════════════════════════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 48px',
        background: scrolled ? 'rgba(250,250,250,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.2,0.8,0.2,1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <span style={{ fontSize: '1.6rem', letterSpacing: '-0.04em', fontWeight: 800, color: 'var(--lp-text)' }}>
            LaunchPad<span style={{ color: '#FF5A36' }}>.</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          {[
            { label: 'Products', dropdown: true },
            { label: 'Pricing' },
            { label: 'Blog' },
            { label: 'Resources', dropdown: true },
            { label: 'About Us' },
          ].map(link => (
            <a key={link.label} href="#" style={{
              fontSize: '0.93rem', fontWeight: 500, color: 'var(--lp-text)',
              display: 'flex', alignItems: 'center', gap: '4px',
              transition: 'color 0.2s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#666'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--lp-text)'}
            >
              {link.label}
              {link.dropdown && (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              )}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button style={{ fontWeight: 500, fontSize: '0.93rem', color: 'var(--lp-text)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#666'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--lp-text)'}
          >Login</button>
          <button onClick={() => navigate('/workspace')} className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.9rem', borderRadius: '10px' }}>
            Get Started
          </button>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <section style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '140px 24px 100px',
        overflow: 'hidden',
      }}>
        <div className="hero-dot-grid" />

        {/* Pastel Aura — recreated with CSS for reliability */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -55%)',
          width: '900px', height: '500px',
          background: `
            radial-gradient(ellipse 60% 55% at 35% 45%, rgba(255,160,140,0.45) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 65% 50%, rgba(140,190,255,0.4) 0%, transparent 70%),
            radial-gradient(ellipse 45% 40% at 50% 55%, rgba(200,180,255,0.3) 0%, transparent 70%),
            radial-gradient(ellipse 40% 35% at 50% 40%, rgba(255,220,170,0.25) 0%, transparent 70%)
          `,
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'aura-pulse 12s ease-in-out infinite alternate',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1180px', width: '100%' }}>
          <h1 className="text-display fade-in-up" style={{ marginBottom: '28px' }}>
            From concept to<br/>execution, instantly.
          </h1>

          <p className="text-subtitle fade-in-up" style={{ marginBottom: '20px', animationDelay: '0.1s', maxWidth: '640px', margin: '0 auto 20px' }}>
            Strategy creation, task automation, and AI-powered project execution
          </p>

          {/* Rotating "Built for" */}
          <div className="fade-in-up" style={{ marginBottom: '44px', animationDelay: '0.2s' }}>
            <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--lp-text)' }}>Built for: </span>
            <span style={{
              display: 'inline-block', fontSize: '1rem', fontWeight: 500,
              color: 'var(--lp-text-2)', minWidth: '130px',
              transition: 'opacity 0.4s ease',
            }}>
              {audiences[builtFor]}
            </span>
          </div>

          <div className="fade-in-up" style={{ display: 'flex', gap: '14px', justifyContent: 'center', animationDelay: '0.3s' }}>
            <button onClick={() => navigate('/workspace')} className="btn-primary" style={{ padding: '15px 32px' }}>
              Get Started
            </button>
            <button className="btn-secondary" style={{ padding: '15px 32px' }}>
              Explore Products
            </button>
          </div>

          <div className="fade-in-up" style={{ marginTop: '48px', display: 'flex', justifyContent: 'center', animationDelay: '0.4s' }}>
            <div style={{ width: 'min(100%, 1120px)' }}>
              <LaunchPadMockup variant="strategy" style={{ minHeight: '620px' }} />
            </div>
          </div>
        </div>

        {/* Trusted By — pinned near bottom of hero */}
        <div className="fade-in-up" style={{
          position: 'absolute', bottom: '48px', left: 0, right: 0,
          textAlign: 'center', animationDelay: '0.6s',
        }}>
          <p style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--lp-muted)', letterSpacing: '0.02em' }}>
            Trusted by 3,000+ professionals worldwide
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LOGO CLOUD
          ═══════════════════════════════════════════ */}
      <RevealSection style={{
        padding: '32px 48px 80px', maxWidth: '1100px', margin: '0 auto',
      }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: '40px 56px', alignItems: 'center',
        }}>
          {['TechVenture', 'StrategyHQ', 'BuildFast', 'NovaCorp', 'Apex Studio', 'ScaleWorks'].map((name, i) => (
            <span key={i} style={{
              fontSize: '1.15rem', fontWeight: 700, color: 'rgba(0,0,0,0.2)',
              letterSpacing: '-0.02em', textTransform: 'uppercase',
              userSelect: 'none', whiteSpace: 'nowrap',
            }}>
              {name}
            </span>
          ))}
        </div>
      </RevealSection>

      {/* ═══════════════════════════════════════════
          STATS BAR
          ═══════════════════════════════════════════ */}
      <RevealSection style={{
        borderTop: '1px solid var(--lp-border)',
        borderBottom: '1px solid var(--lp-border)',
        padding: '72px 48px',
        maxWidth: '1200px', margin: '0 auto',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '32px', textAlign: 'center',
        }}>
          {[
            { num: 79, suffix: '+', label: 'Countries Worldwide' },
            { num: 4, suffix: '', label: 'Years helping creators' },
            { num: 27000, suffix: '+', label: 'Projects Launched' },
            { num: 16, suffix: '+', label: 'Integrations supported' },
          ].map((stat, i) => (
            <div key={i}>
              <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--lp-text)' }}>
                <Counter end={stat.num} suffix={stat.suffix} />
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--lp-text-2)', marginTop: '8px', fontWeight: 500 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* ═══════════════════════════════════════════
          PRODUCT SHOWCASES (with parallax)
          ═══════════════════════════════════════════ */}
      {products.map((product, i) => (
        <ProductShowcase key={i} product={product} navigate={navigate} />
      ))}

      {/* ═══════════════════════════════════════════
          TESTIMONIAL
          ═══════════════════════════════════════════ */}
      <RevealSection style={{
        padding: '100px 48px', maxWidth: '900px', margin: '0 auto', textAlign: 'center',
      }}>
        <div style={{
          background: 'var(--lp-surface)', borderRadius: '24px',
          padding: '56px 48px', border: '1px solid var(--lp-border)',
          boxShadow: 'var(--lp-shadow-md)',
        }}>
          <p style={{
            fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 500,
            lineHeight: 1.65, color: 'var(--lp-text)', fontStyle: 'italic',
            marginBottom: '32px',
          }}>
            "LaunchPad transformed how our team operates. What used to take us a week of planning meetings now happens in 15 minutes. The AI-generated flowcharts are genuinely better than anything we drew by hand."
          </p>
          <div>
            <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--lp-text)' }}>
              Sarah Chen
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--lp-muted)', marginTop: '4px' }}>
              VP of Product · NovaCorp
            </p>
          </div>
        </div>
      </RevealSection>

      {/* ═══════════════════════════════════════════
          BOTTOM CTA (with second aura gradient)
          ═══════════════════════════════════════════ */}
      <RevealSection style={{
        position: 'relative', padding: '140px 48px',
        textAlign: 'center', overflow: 'hidden',
      }}>
        {/* Second aura */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px', height: '450px',
          background: `
            radial-gradient(ellipse 55% 50% at 40% 50%, rgba(255,160,140,0.35) 0%, transparent 70%),
            radial-gradient(ellipse 50% 45% at 60% 50%, rgba(140,190,255,0.3) 0%, transparent 70%),
            radial-gradient(ellipse 40% 35% at 50% 50%, rgba(200,180,255,0.2) 0%, transparent 70%)
          `,
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800,
            letterSpacing: '-0.04em', color: 'var(--lp-text)', marginBottom: '20px',
          }}>
            From ideas to reality
          </h2>
          <p style={{
            fontSize: '1.15rem', color: 'var(--lp-text-2)', maxWidth: '520px',
            margin: '0 auto 40px', lineHeight: 1.6,
          }}>
            Every LaunchPad product is shaped by real execution experience. We tackle the real problems in project management.
          </p>
          <button onClick={() => navigate('/workspace')} className="btn-primary" style={{
            padding: '16px 36px', fontSize: '1.05rem', borderRadius: '12px',
          }}>
            Start Now
          </button>
        </div>
      </RevealSection>

      {/* ═══════════════════════════════════════════
          DARK FOOTER (Pulze style)
          ═══════════════════════════════════════════ */}
      <footer style={{
        background: '#1A1A1A', color: '#999',
        padding: '72px 48px 48px',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          maxWidth: '1200px', margin: '0 auto', flexWrap: 'wrap', gap: '48px',
        }}>
          {/* Left */}
          <div style={{ maxWidth: '320px' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.04em' }}>
              LaunchPad<span style={{ color: '#FF5A36' }}>.</span>
            </span>
            <p style={{ marginTop: '16px', lineHeight: 1.7, fontSize: '0.93rem' }}>
              The intelligent workflow engine for executing your ideas faster.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              {/* Social icons */}
              {[
                <svg key="yt" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4A3 3 0 0 0 .5 6.5 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.5 3 3 0 0 0 2.1 2.1c1.9.4 9.4.4 9.4.4s7.5 0 9.4-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.5zM9.5 15.5v-7l6.3 3.5-6.3 3.5z"/></svg>,
                <svg key="li" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19V19h-3v-9h2.9v1.3a3.1 3.1 0 0 1 2.8-1.5c1.95 0 3.3 1.18 3.3 3.65z"/></svg>,
                <svg key="tw" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1h3.7l-8.1 9.2L24 23h-7.4l-5.8-7.6L4.5 23H.8l8.6-9.9L0 1h7.6l5.3 7 6-7zm-1.3 19.8h2L6.5 3H4.3l13.3 17.8z"/></svg>,
              ].map((icon, i) => (
                <a key={i} href="#" style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: '#2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#888', transition: 'all 0.2s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#333'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#2A2A2A'; e.currentTarget.style.color = '#888'; }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right columns */}
          <div style={{ display: 'flex', gap: '72px', flexWrap: 'wrap' }}>
            {[
              { title: 'Explore', links: ['About', 'Blog', 'Pricing', 'Customer Stories'] },
              { title: 'Products', links: ['Strategy Engine', 'Smart Calendar', 'Mind Map', 'Task Carousel'] },
              { title: 'Help', links: ['Docs', 'Tutorials', 'FAQ', 'Discord'] },
            ].map((col, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', marginBottom: '4px' }}>
                  {col.title}
                </span>
                {col.links.map(link => (
                  <a key={link} href="#" style={{ fontSize: '0.9rem', color: '#888', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ccc'}
                    onMouseLeave={e => e.currentTarget.style.color = '#888'}
                  >{link}</a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          maxWidth: '1200px', margin: '48px auto 0',
          paddingTop: '24px', borderTop: '1px solid #2A2A2A',
          display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#666',
        }}>
          <span>© 2026 LaunchPad. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: '#666' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#666' }}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
