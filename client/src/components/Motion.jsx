import { useEffect, useRef, useState, memo, useMemo } from "react";
import { motion } from "framer-motion";

/* ====================================================================
   DEVICE CAPABILITY DETECTION
   Runs once at module load — never re-evaluated.

   isLowEnd  → true on phones with ≤4 logical CPU cores OR
               Navigator.deviceMemory ≤ 2 GB OR
               a "slow-back" connection (2g / slow-2g)
   isMobile  → true when the primary pointer is coarse (touch screens)
   isReducedMotion → OS "reduce motion" preference

   Strategy matrix:
     Desktop (all capable)  → full canvas (30 fps), all CSS animations
     Mobile capable          → canvas OFF, CSS aurora only (static gradient fallback)
     Mobile low-end / reducedMotion → canvas OFF, animations killed
   ==================================================================== */

const _RM =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const _MOBILE =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

const _LOW_END = (() => {
  if (typeof navigator === "undefined") return false;
  const cores = navigator.hardwareConcurrency ?? 8;
  const mem = navigator.deviceMemory ?? 8;          // GB, undefined on Firefox/Safari → assume fine
  const conn = navigator.connection?.effectiveType;  // '4g'|'3g'|'2g'|'slow-2g'
  return cores <= 4 || mem <= 2 || conn === "2g" || conn === "slow-2g";
})();

export const IS_REDUCED_MOTION = _RM;
export const IS_MOBILE = _MOBILE;
export const IS_LOW_END = _LOW_END || _RM;    // reduced-motion devices get same treatment

// Shorthand flags consumed throughout this file
const CANVAS_ON = !_MOBILE;                 // canvas only on desktop
const ANIMATE_ON = !IS_LOW_END || !_MOBILE;  // framer-motion runs on capable mobile & desktop
const HEAVY_CSS = !IS_LOW_END;              // backdrop-filter, fog-mist, shine sweep

/* ====================================================================
   BRAND PALETTE
   ==================================================================== */

const ORB_COLORS = [
  "rgba(232, 114, 42, 0.18)",
  "rgba(96, 165, 250, 0.18)",
  "rgba(240, 203, 90, 0.18)",
  "rgba(27, 58, 139, 0.18)",
  "rgba(26, 86, 219, 0.18)",
];

const PARTICLE_COLORS = [
  "#E8722A", "#93C5FD", "#DBEAFE",
  "#1A56DB", "#60A5FA", "#BAD7FE",
  "#1B3A8B",
  "#F0CB5A", "#E8722A",
];

/* ====================================================================
   PRE-BAKED SPRITES  (built lazily only when canvas is enabled)
   ==================================================================== */

const buildSprites = (colors) => {
  if (!CANVAS_ON || typeof OffscreenCanvas === "undefined") return null;
  const map = new Map();
  for (const color of colors) {
    const sz = 30;
    const oc = new OffscreenCanvas(sz, sz);
    const ctx = oc.getContext("2d");
    const r = sz / 2;
    const g = ctx.createRadialGradient(r, r, 0, r, r, r);
    g.addColorStop(0, color);
    g.addColorStop(0.45, color + "BB");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(r, r, r, 0, Math.PI * 2);
    ctx.fill();
    map.set(color, oc);
  }
  return map;
};

const buildOrbSprites = (colors) => {
  if (!CANVAS_ON || typeof OffscreenCanvas === "undefined") return null;
  const sprites = [];
  const SZ = 512;
  for (const color of colors) {
    const oc = new OffscreenCanvas(SZ, SZ);
    const ctx = oc.getContext("2d");
    const r = SZ / 2;
    const g = ctx.createRadialGradient(r, r, 0, r, r, r);
    g.addColorStop(0, color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(r, r, r, 0, Math.PI * 2);
    ctx.fill();
    sprites.push(oc);
  }
  return sprites;
};

// Built once at module load — null on mobile (canvas skipped entirely)
const SPRITES = buildSprites(PARTICLE_COLORS);
const ORB_SPRITES = buildOrbSprites(ORB_COLORS);

/* ====================================================================
   useReveal
   ==================================================================== */

export function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ====================================================================
   FRAMER-MOTION VARIANT HELPERS
   On low-end mobile every motion wrapper renders children directly
   (no JS animation overhead) while CSS handles the visual appearance.
   ==================================================================== */

// Wrapper that passes through children with no motion on low-end mobile
const PassThrough = memo(function PassThrough({ children, className = "" }) {
  return <div className={className}>{children}</div>;
});

/* ====================================================================
   BASE ANIMATION WRAPPERS
   ==================================================================== */

export const FadeUp = memo(function FadeUp({ children, delay = 0, className = "" }) {
  if (IS_LOW_END && _MOBILE) return <PassThrough className={className}>{children}</PassThrough>;
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y: _MOBILE ? 16 : 30 }}   // smaller travel on capable mobile
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: _MOBILE ? 0.45 : 0.68, delay: _MOBILE ? delay * 0.5 : delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
});

export const FadeIn = memo(function FadeIn({ children, delay = 0, className = "" }) {
  if (IS_LOW_END && _MOBILE) return <PassThrough className={className}>{children}</PassThrough>;
  return (
    <motion.div className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: _MOBILE ? 0.40 : 0.70, delay: _MOBILE ? delay * 0.5 : delay }}>
      {children}
    </motion.div>
  );
});

export const ScaleIn = memo(function ScaleIn({ children, delay = 0, className = "" }) {
  if (IS_LOW_END && _MOBILE) return <PassThrough className={className}>{children}</PassThrough>;
  return (
    <motion.div className={className}
      initial={{ opacity: 0, scale: _MOBILE ? 0.94 : 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: _MOBILE ? 0.38 : 0.56, delay: _MOBILE ? delay * 0.5 : delay, ease: [0.34, 1.56, 0.64, 1] }}>
      {children}
    </motion.div>
  );
});

export const SlideIn = memo(function SlideIn({ children, from = "left", delay = 0, className = "" }) {
  if (IS_LOW_END && _MOBILE) return <PassThrough className={className}>{children}</PassThrough>;
  return (
    <motion.div className={className}
      initial={{ opacity: 0, x: from === "left" ? (_MOBILE ? -20 : -42) : (_MOBILE ? 20 : 42) }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: _MOBILE ? 0.45 : 0.68, delay: _MOBILE ? delay * 0.5 : delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
});

/* ====================================================================
   STAGGER
   ==================================================================== */

export const StaggerContainer = memo(function StaggerContainer({ children, className = "", staggerDelay = 0.1 }) {
  // On low-end mobile skip stagger orchestration — children appear individually
  if (IS_LOW_END && _MOBILE) return <div className={className}>{children}</div>;
  const delay = _MOBILE ? Math.min(staggerDelay, 0.06) : staggerDelay;
  return (
    <motion.div className={className}
      initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: delay } } }}>
      {children}
    </motion.div>
  );
});

export const StaggerItem = memo(function StaggerItem({ children, className = "text-left" }) {
  if (IS_LOW_END && _MOBILE) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className}
      variants={{
        hidden: { opacity: 0, y: _MOBILE ? 12 : 26, scale: _MOBILE ? 0.98 : 0.96 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: _MOBILE ? 0.38 : 0.56, ease: [0.22, 1, 0.36, 1] } },
      }}>
      {children}
    </motion.div>
  );
});

/* ====================================================================
   AuroraBackground
   ─────────────────────────────────────────────────────────────────────
   MOBILE STRATEGY:
   • Canvas is disabled entirely on all touch/mobile devices.
     The animated background is replaced by a lightweight pure-CSS
     aurora using only background-position animation (no JS, no canvas,
     no composited layers beyond the two static gradient divs).
   • On desktop the canvas runs at 30 fps with pre-baked orb sprites
     (same as before).
   ─────────────────────────────────────────────────────────────────────
   WHY canvas hurts mobile:
     1. Mobile GPUs must composite the canvas layer + backdrop-blur on
        every card on the same frame → fill-rate exceeded → dropped frames.
     2. OffscreenCanvas + requestAnimationFrame wake the CPU constantly,
        preventing idle/low-power states → battery drain + thermal throttle.
     3. DPR on phones is 3× — even at 1.5× cap the canvas covers
        ~2× more pixels than a 1080p laptop screen.
   ==================================================================== */

// Static CSS-only aurora for mobile — zero JS, zero canvas, full colors preserved
function MobileAuroraBackground({ children }) {
  return (
    <div className="relative min-h-screen bg-[var(--base-bg)] overflow-x-hidden">
      {/* Pure-CSS aurora background — two static radial-gradient divs that
          move via background-position animation (compositor-only, no reflow).
          Colors are identical to desktop orbs. */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{ isolation: "isolate" }}
      >
        {/* Primary aurora blob */}
        <div
          className="mobile-aurora-primary absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 30%, rgba(232,114,42,0.16) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 80% 20%, rgba(96,165,250,0.16) 0%, transparent 60%),
              radial-gradient(ellipse 70% 55% at 30% 80%, rgba(240,203,90,0.15) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 70% 70%, rgba(27,58,139,0.16) 0%, transparent 60%),
              radial-gradient(ellipse 70% 60% at 50% 90%, rgba(26,86,219,0.16) 0%, transparent 60%)
            `,
          }}
        />
        <div className="bg-cross-pattern absolute inset-0 opacity-100" />
      </div>
      <div className="relative z-10 w-full min-h-screen">{children}</div>
    </div>
  );
}

export const AuroraBackground = memo(function AuroraBackground({ children, orbs = true }) {
  // Route mobile to CSS-only path immediately — no canvas, no hooks
  if (_MOBILE || IS_LOW_END) {
    return <MobileAuroraBackground>{children}</MobileAuroraBackground>;
  }

  return <DesktopAuroraBackground orbs={orbs}>{children}</DesktopAuroraBackground>;
});

// Desktop canvas path — unchanged logic, kept in its own component so
// mobile never pays for the hook setup cost
const DesktopAuroraBackground = memo(function DesktopAuroraBackground({ children, orbs }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!orbs || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
      willReadFrequently: false,
    });

    const PARTICLE_COUNT = 10;
    const TARGET_MS = 1000 / 30; // 30 fps — imperceptible for ambient BG

    let raf, running = true, lastTs = 0, resizeTimer;

    const applyResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const scheduleResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(applyResize, 150); };
    const ro = new ResizeObserver(scheduleResize);
    ro.observe(document.documentElement);
    applyResize();

    const W0 = window.innerWidth, H0 = window.innerHeight;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => {
      const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      return {
        x: Math.random() * W0,
        y: Math.random() * H0,
        size: Math.random() * 1.6 + 0.8,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6 - 0.30,
        color,
        sprite: SPRITES?.get(color) ?? null,
      };
    });

    const drawOrbSprite = (sprite, cx, cy, r) => {
      if (!sprite) return;
      ctx.drawImage(sprite, cx - r, cy - r, r * 2, r * 2);
    };

    const render = (timestamp) => {
      if (!running) return;
      const delta = timestamp - lastTs;
      if (delta < TARGET_MS - 1) { raf = requestAnimationFrame(render); return; }
      lastTs = timestamp - (delta % TARGET_MS);

      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const minDim = Math.min(W, H);

      ctx.clearRect(0, 0, W, H);

      const time = timestamp * 0.0003;

      if (ORB_SPRITES) {
        ctx.globalAlpha = 1;
        drawOrbSprite(ORB_SPRITES[0], W * 0.2 + Math.sin(time) * 150, H * 0.3 + Math.cos(time * 0.8) * 150, minDim * 0.60);
        drawOrbSprite(ORB_SPRITES[1], W * 0.8 + Math.cos(time * 1.2) * 150, H * 0.2 + Math.sin(time * 0.9) * 150, minDim * 0.50);
        drawOrbSprite(ORB_SPRITES[2], W * 0.3 + Math.sin(time * 0.7) * 150, H * 0.8 + Math.cos(time * 1.1) * 150, minDim * 0.55);
        drawOrbSprite(ORB_SPRITES[3], W * 0.7 + Math.cos(time * 0.9) * 150, H * 0.7 + Math.sin(time * 1.3) * 150, minDim * 0.50);
        drawOrbSprite(ORB_SPRITES[4], W * 0.5 + Math.sin(time * 1.1) * 200, H * 0.9 + Math.cos(time * 0.7) * 100, minDim * 0.60);
      } else {
        const drawOrb = (cx, cy, r, color) => {
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
          g.addColorStop(0, color);
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fill();
        };
        drawOrb(W * 0.2 + Math.sin(time) * 150, H * 0.3 + Math.cos(time * 0.8) * 150, minDim * 0.60, ORB_COLORS[0]);
        drawOrb(W * 0.8 + Math.cos(time * 1.2) * 150, H * 0.2 + Math.sin(time * 0.9) * 150, minDim * 0.50, ORB_COLORS[1]);
        drawOrb(W * 0.3 + Math.sin(time * 0.7) * 150, H * 0.8 + Math.cos(time * 1.1) * 150, minDim * 0.55, ORB_COLORS[2]);
        drawOrb(W * 0.7 + Math.cos(time * 0.9) * 150, H * 0.7 + Math.sin(time * 1.3) * 150, minDim * 0.50, ORB_COLORS[3]);
        drawOrb(W * 0.5 + Math.sin(time * 1.1) * 200, H * 0.9 + Math.cos(time * 0.7) * 100, minDim * 0.60, ORB_COLORS[4]);
      }

      ctx.globalAlpha = 0.35;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W; else if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; else if (p.y > H) p.y = 0;
        if (p.sprite) {
          const s = p.size * 4;
          ctx.drawImage(p.sprite, p.x - s * 0.5, p.y - s * 0.5, s, s);
        } else {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };

    const onVisibility = () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else { running = true; lastTs = 0; raf = requestAnimationFrame(render); }
    };
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(render);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [orbs]);

  return (
    <div className="relative min-h-screen bg-[var(--base-bg)] overflow-x-hidden">
      {orbs && (
        <div className="fixed inset-0 pointer-events-none z-0" style={{ isolation: "isolate" }}>
          <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full" />
          <div className="bg-cross-pattern absolute inset-0 opacity-100" aria-hidden="true" />
        </div>
      )}
      <div className="relative z-10 w-full min-h-screen">{children}</div>
    </div>
  );
});

/* ====================================================================
   AmbientBackground
   ==================================================================== */

export const AmbientBackground = memo(function AmbientBackground({ children, className = "" }) {
  return (
    <div className={`min-h-screen ${className || "bg-[var(--base-bg)]"} text-white overflow-x-hidden relative`}>
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ isolation: "isolate" }}>
        <div className="absolute -top-20 -left-20 w-[480px] h-[480px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(212,175,55,0.09) 0%,transparent 70%)" }} aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(26,86,219,0.08) 0%,transparent 70%)" }} aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(27,58,139,0.06) 0%,transparent 70%)" }} aria-hidden="true" />
        <div className="absolute -top-10 right-0 w-[340px] h-[340px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(15,32,87,0.06) 0%,transparent 70%)" }} aria-hidden="true" />
        <div className="bg-grid-pattern absolute inset-0 opacity-20" aria-hidden="true" />
      </div>
      {children}
    </div>
  );
});

/* ====================================================================
   PageHero
   ==================================================================== */

const HERO_SCHEMES = {
  gold: { badge: "rgba(212,175,55,0.13)", badgeBorder: "rgba(240,203,90,0.38)", badgeText: "#F0CB5A" },
  royal: { badge: "rgba(26,86,219,0.13)", badgeBorder: "rgba(96,165,250,0.38)", badgeText: "#60A5FA" },
  violet: { badge: "rgba(27,58,139,0.13)", badgeBorder: "rgba(232,114,42,0.38)", badgeText: "#E8722A" },
  sky: { badge: "rgba(15,32,87,0.13)", badgeBorder: "rgba(240,203,90,0.38)", badgeText: "#F0CB5A" },
};

export const PageHero = memo(function PageHero({
  title, subtitle, icon, badge,
  colorScheme = "gold", compact = false, className = "", children,
}) {
  const sc = HERO_SCHEMES[colorScheme] ?? HERO_SCHEMES.gold;

  // On low-end mobile skip framer-motion entirely for the hero — it's the
  // first paint and JS animation here blocks LCP
  if (IS_LOW_END && _MOBILE) {
    return (
      <div className={`page-hero bg-cross-pattern ${compact ? "!pt-15" : ""} ${children ? "!pb-0" : ""} ${className}`}>
        <div className={`relative z-10 max-w-4xl mx-auto px-4 ${compact ? "scale-90" : ""}`}>
          {badge && (
            <span className="page-hero-badge"
              style={{ background: sc.badge, borderColor: sc.badgeBorder, color: sc.badgeText }}>
              {icon && <span className="text-base" aria-hidden="true">{icon}</span>}
              {badge}
            </span>
          )}
          {title && <h1 className={`page-hero-title ${compact ? "!text-4xl" : "pb-1"}`}>{title}</h1>}
          {title && !compact && <div className="page-hero-divider" aria-hidden="true" />}
          {subtitle && <p className={`page-hero-subtitle ${compact ? "text-sm mt-2" : ""}`}>{subtitle}</p>}
        </div>
        {children && <div className={`relative z-10 ${compact ? "mt-0 pb-0" : "mt-5 pb-8"}`}>{children}</div>}
      </div>
    );
  }

  return (
    <div className={`page-hero bg-cross-pattern ${compact ? "!pt-15" : ""} ${children ? "!pb-0" : ""} ${className}`}>
      <motion.div
        className={`relative z-10 max-w-4xl mx-auto px-4 ${compact ? "scale-90" : ""}`}
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, ease: [0.22, 1, 0.36, 1] }}>
        {badge && (
          <motion.span className="page-hero-badge"
            style={{ background: sc.badge, borderColor: sc.badgeBorder, color: sc.badgeText }}
            initial={{ opacity: 0, scale: 0.84 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.48, ease: [0.34, 1.56, 0.64, 1] }}>
            {icon && <span className="text-base" aria-hidden="true">{icon}</span>}
            {badge}
          </motion.span>
        )}
        {title && <h1 className={`page-hero-title ${compact ? "!text-4xl" : "pb-1"}`}>{title}</h1>}
        {title && !compact && <div className="page-hero-divider" aria-hidden="true" />}
        {subtitle && <p className={`page-hero-subtitle ${compact ? "text-sm mt-2" : ""}`}>{subtitle}</p>}
      </motion.div>
      {children && <div className={`relative z-10 ${compact ? "mt-0 pb-0" : "mt-5 pb-8"}`}>{children}</div>}
    </div>
  );
});

/* ====================================================================
   NeonCard
   Mobile: fog-mist and heavy inner decorators are skipped (they require
   backdrop-filter layers that kill mobile fill-rate). The card still
   gets its glass background, border and gradient text — all colors intact.
   ==================================================================== */

const NEON_THEME = {
  indigo: { glow: "rgba(26,86,219,0.6)", border: "hover:border-[#1A56DB]/50", via: "via-[#1A56DB]/20", bg: "bg-[#1A56DB]/20" },
  sapphire: { glow: "rgba(27,58,139,0.6)", border: "hover:border-[#1B3A8B]/50", via: "via-[#1B3A8B]/20", bg: "bg-[#1B3A8B]/20" },
  crimson: { glow: "rgba(15,32,87,0.6)", border: "hover:border-[#0F2057]/50", via: "via-[#0F2057]/20", bg: "bg-[#0F2057]/20" },
  gold: { glow: "rgba(212,175,55,0.6)", border: "hover:border-[#D4AF37]/50", via: "via-[#D4AF37]/20", bg: "bg-[#D4AF37]/20" },
  royal: { glow: "rgba(96,165,250,0.6)", border: "hover:border-[#60A5FA]/50", via: "via-[#60A5FA]/20", bg: "bg-[#60A5FA]/20" },
  sky: { glow: "rgba(232,114,42,0.6)", border: "hover:border-[#E8722A]/50", via: "via-[#E8722A]/20", bg: "bg-[#E8722A]/20" },
};

export const NeonCard = memo(function NeonCard({ children, className = "", color = "indigo", hover = true }) {
  const tc = NEON_THEME[color] ?? NEON_THEME.indigo;

  // Mobile-lite card: preserves glass bg + colors, removes heavy composited layers
  if (_MOBILE) {
    return (
      <div className="neon-card-wrapper w-full h-full">
        <div className={`glass-card-mobile relative w-full h-full border-white/10 ${className}`}>
          <div className="relative z-10 h-full overflow-visible">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="neon-card-wrapper w-full h-full">
      {hover && <div className="fog-mist" aria-hidden="true" />}
      <div className={`glass-card group relative w-full h-full border-white/10 ${tc.border} ${hover ? "glass-card-hover-active" : ""} ${className}`}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]" aria-hidden="true">
          <div className={`absolute -inset-[100%] opacity-0 group-hover:opacity-25 transition-opacity duration-500`}
            style={{ background: `radial-gradient(circle at 50% 50%,${tc.glow} 0%,transparent 70%)` }} />
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-16 bg-gradient-to-br from-transparent ${tc.via} to-transparent`} />
        </div>
        <div className="relative z-10 h-full overflow-visible">{children}</div>
        <div className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-50 overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 left-0 w-[200%] h-[200%] animate-pulse"
            style={{ background: "radial-gradient(circle at 50% 50%,rgba(255,255,255,0.10) 0%,transparent 10%)", animationDuration: "4s" }} />
        </div>
        <div className={`absolute -inset-2 opacity-0 group-hover:opacity-7 transition-opacity duration-700 -z-10 ${tc.bg} rounded-[inherit]`} aria-hidden="true" />
      </div>
    </div>
  );
});

/* ====================================================================
   RainbowCard
   ==================================================================== */

export const RainbowCard = memo(function RainbowCard({ children, className = "" }) {
  return (
    <div className={`card-rainbow ${className}`}>
      <div className="card-rainbow-inner p-6 h-full">{children}</div>
    </div>
  );
});

/* ====================================================================
   SectionHeading
   ==================================================================== */

export const SectionHeading = memo(function SectionHeading({
  badge, title, subtitle, center = true, gradient = "text-gradient-gold",
}) {
  const align = center ? "text-center items-center" : "text-left items-start";
  return (
    <FadeUp className={`flex flex-col ${align} mb-14`}>
      {badge && <span className="section-label mb-4">{badge}</span>}
      <h2 className={`text-headline ${gradient}`}>{title}</h2>
      <div className="w-24 h-1 rounded-full mt-5 animate-aurora" style={{ backgroundSize: "200% 100%" }} aria-hidden="true" />
      {subtitle && (
        <p className="mt-5 text-[rgba(147,197,253,0.72)] text-lg font-medium max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </FadeUp>
  );
});

/* ====================================================================
   StatCard
   ==================================================================== */

export const StatCard = memo(function StatCard({ value, label, icon, gradient = "text-gradient-gold" }) {
  return (
    <ScaleIn>
      <div className="stat-card group cursor-default">
        {icon && <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">{icon}</div>}
        <div className={`stat-value ${gradient}`}>{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </ScaleIn>
  );
});

/* ====================================================================
   FloatingBadge
   On mobile use a CSS-only animation (badge-bop keyframe) instead of
   Framer-Motion's JS-driven spring, which adds a JS thread wakeup every
   frame even for simple translate loops.
   ==================================================================== */

export const FloatingBadge = memo(function FloatingBadge({
  children,
  color = "#60A5FA",
  bg = "rgba(26,86,219,0.12)",
}) {
  if (_MOBILE) {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest animate-badge"
        style={{ background: bg, border: `1px solid ${color}44`, color }}>
        {children}
      </span>
    );
  }
  return (
    <motion.span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
      style={{ background: bg, border: `1px solid ${color}44`, color }}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
      {children}
    </motion.span>
  );
});

/* ====================================================================
   Aliases
   ==================================================================== */

export const GlassCard = memo(function GlassCard({ children, className = "", hover = true, style = {} }) {
  return <NeonCard className={className} hover={hover} style={style}>{children}</NeonCard>;
});

export const NumberStat = memo(function NumberStat({ value, label, icon }) {
  return <StatCard value={value} label={label} icon={icon} />;
});