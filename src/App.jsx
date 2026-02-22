import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import HERO_IMAGE from "./assets/pool-hero.png";
import LOGO_IMAGE from "./assets/pixiq-logo-white.png";

/* ─── Data ─── */
const MIXES = [
  {
    title: "THE RESOLUTION",
    description: "Daft Punk dissolves into Little Roy.",
    bait: "familiar vocal hook",
    switch: "unexpected rhythm shift",
    energy: "euphoric \u2192 hypnotic",
    url: "https://www.mixcloud.com/pixiq/the-resolution/",
    live: true,
  },
  {
    title: "VOL. 2 \u2014 COMING SOON",
    description: "Next drop incoming. New month, new theme.",
    bait: "tba",
    switch: "tba",
    energy: "tba",
    url: "#",
    live: false,
  },
  {
    title: "VOL. 3 \u2014 COMING SOON",
    description: "The series builds.",
    bait: "tba",
    switch: "tba",
    energy: "tba",
    url: "#",
    live: false,
  },
];

const EVENT_TYPES = [
  { title: "private events", desc: "Intimate, curated atmospheres" },
  { title: "fashion nights", desc: "Runway energy, editorial sound" },
  { title: "members clubs", desc: "Exclusive floor, elevated taste" },
  { title: "digital audiences", desc: "Global reach, sonic identity" },
];

/* ─── Intersection Observer ─── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*                   APP                       */
/* ═══════════════════════════════════════════ */
export default function PixiqLanding() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [preloaderFading, setPreloaderFading] = useState(false);
  const [selected, setSelected] = useState(0);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  /* Preloader timing */
  useEffect(() => {
    const t1 = setTimeout(() => setPreloaderFading(true), 600);
    const t2 = setTimeout(() => setPreloaderDone(true), 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  /* Floating CTA scroll listener */
  useEffect(() => {
    const onScroll = () =>
      setShowFloatingCTA(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Smooth ease for Framer */
  const ease = [0.16, 1, 0.3, 1];

  return (
    <>
      {/* ─── PRELOADER ─── */}
      <AnimatePresence>
        {!preloaderDone && (
          <motion.div
            className={`preloader ${preloaderFading ? "preloader-fade" : ""}`}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="preloader-text">Expectation is a trap.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── GRAIN ─── */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* ─── FLOATING CTA ─── */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="floating-cta"
          >
            <a
              href="#bookings"
              className="block px-6 py-3 bg-auburn-glow text-white text-[10px] uppercase tracking-[0.3em] hover:bg-auburn-light transition-all duration-300 shadow-lg shadow-auburn-deep/30 btn-glow-auburn"
            >
              book now
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SITE ─── */}
      <div className="min-h-screen w-full bg-black text-white">
        {/* ═══ HEADER ═══ */}
        <header className="fixed top-0 left-0 w-full z-30 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-sm transition-all duration-500">
          <div className="max-w-7xl mx-auto px-8 md:px-12 py-5 flex items-center justify-between">
            <a href="#">
              <img src={LOGO_IMAGE} alt="pixiq" className="h-10 w-auto" />
            </a>
            <div className="flex items-center gap-8">
              <nav className="hidden md:flex gap-8 text-xs uppercase tracking-[0.25em] text-white/60">
                <a
                  href="#listen"
                  className="hover:text-white transition-colors duration-300"
                >
                  listen
                </a>
                <a
                  href="#bookings"
                  className="hover:text-white transition-colors duration-300"
                >
                  bookings
                </a>
              </nav>
              <a
                href="#bookings"
                className="px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] border border-auburn-glow/60 text-auburn-glow hover:bg-auburn-glow hover:text-white transition-all duration-300 btn-glow-auburn"
              >
                book now
              </a>
            </div>
          </div>
        </header>

        {/* ═══ 1. HERO ═══ */}
        <section className="relative h-screen w-full overflow-hidden">
          {/* Background — Ken Burns zoom */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.06] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              backgroundImage: `url(${HERO_IMAGE})`,
              backgroundSize: "cover",
              backgroundPosition: "center 40%",
            }}
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

          {/* Auburn ambient glows */}
          <div
            className="absolute inset-0 ambient-pulse"
            style={{
              background:
                "radial-gradient(ellipse at 20% 85%, rgba(139,37,0,0.12) 0%, transparent 55%)",
            }}
          />
          <div
            className="absolute inset-0 ambient-pulse"
            style={{
              background:
                "radial-gradient(ellipse at 80% 20%, rgba(192,57,43,0.06) 0%, transparent 50%)",
              animationDelay: "2s",
            }}
          />

          {/* Content */}
          <div className="relative z-10 h-full max-w-7xl mx-auto px-8 md:px-12 flex flex-col justify-end pb-16 md:pb-20">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="uppercase tracking-[0.4em] text-[10px] md:text-xs text-auburn-glow/80 mb-4"
            >
              dj &middot; mashup curator &middot; sonic guide
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease, delay: 0.3 }}
              className="text-5xl md:text-7xl font-semibold leading-[0.95] mb-5"
            >
              pixiq
            </motion.h1>

            {/* Event badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={preloaderDone ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-2 md:gap-3 mb-6"
            >
              {["private events", "fashion nights", "members clubs", "digital audiences"].map(
                (cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.2em] border border-white/20 text-white/60 hover:border-auburn-glow/50 hover:text-auburn-glow transition-all duration-300 cursor-default"
                  >
                    {cat}
                  </span>
                )
              )}
            </motion.div>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: 0.5 }}
              className="text-white/50 max-w-lg text-sm md:text-base leading-relaxed mb-8"
            >
              Bait &amp; switch mashup sets for private events, fashion nights,
              and members clubs. Welcome aboard&mdash;the journey starts
              familiar, then everything shifts.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#listen"
                className="px-7 py-3.5 bg-auburn-glow text-white text-xs uppercase tracking-[0.2em] hover:bg-auburn-light transition-all duration-300 btn-glow-auburn"
              >
                listen to mixes
              </a>
              <a
                href="#bookings"
                className="px-7 py-3.5 border border-white/30 text-white/80 text-xs uppercase tracking-[0.2em] hover:border-auburn-glow/60 hover:text-white transition-all duration-300"
              >
                book for your event
              </a>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
          </motion.div>
        </section>

        {/* ═══ 2. THE BAIT & SWITCH ═══ */}
        <section className="py-24 md:py-36">
          <div className="auburn-line w-full mb-24 md:mb-36" />
          <div className="max-w-7xl mx-auto px-8 md:px-12">
            <div className="grid md:grid-cols-5 gap-8 md:gap-16 items-start">
              {/* Left — Heading */}
              <div className="md:col-span-2">
                <Reveal>
                  <h2 className="font-serif italic text-editorial leading-[0.95]">
                    the bait
                    <br />
                    &amp; switch
                  </h2>
                </Reveal>
              </div>

              {/* Right — Copy */}
              <div className="md:col-span-3 space-y-6 text-white/50 text-sm md:text-base leading-relaxed">
                <Reveal delay={100}>
                  <p>
                    You recognize the hook. You settle into the rhythm.
                  </p>
                </Reveal>
                <Reveal delay={200}>
                  <p className="text-auburn-glow/60 font-serif italic text-lg">
                    And then&mdash;
                  </p>
                </Reveal>
                <Reveal delay={300}>
                  <p>
                    The foundation changes. Unexpected blends. Clean
                    transitions. Controlled elevation.
                  </p>
                </Reveal>
                <Reveal delay={400}>
                  <p>
                    Familiar becomes tension. Tension becomes movement.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 3. THE SOUND ═══ */}
        <section
          id="listen"
          className="py-24 md:py-36 bg-gradient-to-b from-black via-[#0a0504] to-black"
        >
          <div className="max-w-7xl mx-auto px-8 md:px-12">
            {/* Heading */}
            <Reveal>
              <h2 className="font-serif italic text-editorial leading-[0.95] mb-3">
                the sound
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-white/40 text-xs md:text-sm uppercase tracking-[0.2em] mb-12">
                bait &amp; switch mashups &middot; minimal techno &middot; drum
                n bass &middot; dance sets
              </p>
            </Reveal>

            {/* Featured player card */}
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="mix-player-container p-8 md:p-10 mb-6"
            >
              {/* Now Playing indicator */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-auburn-glow animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-auburn-glow/70">
                  now playing
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif italic text-3xl md:text-5xl leading-tight mb-2">
                {MIXES[selected].title}
              </h3>
              <p className="text-white/50 text-sm md:text-base mb-6">
                {MIXES[selected].description}
              </p>

              {/* Player / Coming Soon */}
              {MIXES[selected].live ? (
                <>
                  <iframe
                    title={MIXES[selected].title}
                    width="100%"
                    height="180"
                    src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&dark=1&feed=${encodeURIComponent(
                      new URL(MIXES[selected].url).pathname
                    )}`}
                    frameBorder="0"
                    allow="autoplay"
                    className="rounded-lg"
                  />

                  {/* Metadata */}
                  <div className="mt-6 pt-5 border-t border-auburn-deep/20 flex flex-wrap gap-x-8 gap-y-2 text-[10px] uppercase tracking-[0.25em] text-white/30">
                    <span>
                      bait:{" "}
                      <span className="text-white/50">
                        {MIXES[selected].bait}
                      </span>
                    </span>
                    <span>
                      switch:{" "}
                      <span className="text-white/50">
                        {MIXES[selected].switch}
                      </span>
                    </span>
                    <span>
                      energy:{" "}
                      <span className="text-auburn-glow/60">
                        {MIXES[selected].energy}
                      </span>
                    </span>
                  </div>

                  {/* Links */}
                  <div className="mt-5 flex gap-6">
                    <a
                      href={MIXES[selected].url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs uppercase tracking-[0.15em] text-white/60 hover:text-auburn-glow transition-colors"
                    >
                      listen on mixcloud &rarr;
                    </a>
                    <a
                      href="#bookings"
                      className="text-xs uppercase tracking-[0.15em] text-white/60 hover:text-auburn-glow transition-colors"
                    >
                      book this energy &rarr;
                    </a>
                  </div>
                </>
              ) : (
                <div className="bg-white/[0.03] border border-white/10 p-10 text-center">
                  <div className="text-white/30 text-xs uppercase tracking-[0.3em] mb-2">
                    dropping soon
                  </div>
                  <div className="text-white/15 text-[10px] uppercase tracking-[0.2em]">
                    new mix every month &middot; follow for updates
                  </div>
                </div>
              )}
            </motion.div>

            {/* Mix selectors — horizontal row */}
            <div className="flex gap-3 overflow-x-auto mix-scroll pb-2">
              {MIXES.map((mix, i) => (
                <Reveal key={mix.title} delay={100 + i * 60}>
                  <button
                    onClick={() => setSelected(i)}
                    className={`flex-shrink-0 text-left px-5 py-4 border transition-all duration-300 ${
                      selected === i
                        ? "border-auburn-glow/50 bg-auburn-deep/10 text-white"
                        : "border-white/10 hover:border-white/25 text-white/50"
                    }`}
                  >
                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">
                      set {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="glitch-hover text-sm md:text-base font-medium whitespace-nowrap">
                      {mix.title}
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 4. PRIVATE ROOMS ONLY ═══ */}
        <section className="py-28 md:py-40 bg-gradient-to-b from-black via-[#080302] to-black relative overflow-hidden">
          {/* Auburn ambient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(139,37,0,0.06) 0%, transparent 60%)",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-8 md:px-12">
            <Reveal>
              <h2 className="font-serif italic text-editorial leading-[0.95] text-center mb-16">
                private rooms only.
              </h2>
            </Reveal>

            {/* Event category cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
              {EVENT_TYPES.map((item, i) => (
                <Reveal key={item.title} delay={100 + i * 80}>
                  <div className="border border-white/10 p-6 md:p-8 hover:border-auburn-glow/40 transition-all duration-500 group bg-white/[0.02]">
                    <div className="text-xs uppercase tracking-[0.25em] text-white/80 group-hover:text-auburn-glow transition-colors duration-500 mb-3">
                      {item.title}
                    </div>
                    <div className="text-white/30 text-xs leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <p className="text-white/50 text-sm md:text-base text-center leading-relaxed max-w-xl mx-auto mb-10">
                This is not background music. This is a shift in atmosphere.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="text-center">
                <a
                  href="#bookings"
                  className="inline-block px-10 py-4 bg-auburn-glow text-white text-xs uppercase tracking-[0.25em] hover:bg-auburn-light transition-all duration-300 btn-glow-auburn"
                >
                  book the energy
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ 5. BOOKING ═══ */}
        <section id="bookings" className="py-24 md:py-36">
          <div className="max-w-7xl mx-auto px-8 md:px-12">
            <Reveal>
              <h2 className="font-serif italic text-editorial leading-[0.95] mb-3">
                book the energy.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-10">
                selective engagements &middot; inquire
              </p>
            </Reveal>
            <div className="auburn-line w-full mb-12" />

            <div className="grid md:grid-cols-9 gap-8 md:gap-12">
              {/* Left — Form */}
              <Reveal delay={150} className="md:col-span-5">
                <form
                  className="border border-white/10 p-8 space-y-5 bg-white/[0.02]"
                  action="https://formspree.io/f/xnnzkaqe"
                  method="POST"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2">
                        name
                      </label>
                      <input
                        name="name"
                        required
                        className="w-full bg-black/60 border border-white/10 px-4 py-3.5 text-sm text-white focus:border-auburn-glow/50 transition-all duration-300"
                        placeholder="your name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2">
                        email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full bg-black/60 border border-white/10 px-4 py-3.5 text-sm text-white focus:border-auburn-glow/50 transition-all duration-300"
                        placeholder="you@domain.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2">
                        date
                      </label>
                      <input
                        type="date"
                        name="date"
                        className="w-full bg-black/60 border border-white/10 px-4 py-3.5 text-sm text-white focus:border-auburn-glow/50 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2">
                        city
                      </label>
                      <input
                        name="city"
                        className="w-full bg-black/60 border border-white/10 px-4 py-3.5 text-sm text-white focus:border-auburn-glow/50 transition-all duration-300"
                        placeholder="city"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2">
                        venue
                      </label>
                      <input
                        name="venue"
                        className="w-full bg-black/60 border border-white/10 px-4 py-3.5 text-sm text-white focus:border-auburn-glow/50 transition-all duration-300"
                        placeholder="venue name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2">
                        set length
                      </label>
                      <input
                        name="set_length"
                        className="w-full bg-black/60 border border-white/10 px-4 py-3.5 text-sm text-white focus:border-auburn-glow/50 transition-all duration-300"
                        placeholder="e.g. 2 hours"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2">
                      vibe &amp; budget
                    </label>
                    <textarea
                      name="vibe_budget"
                      rows={3}
                      className="w-full bg-black/60 border border-white/10 px-4 py-3.5 text-sm text-white focus:border-auburn-glow/50 transition-all duration-300 resize-none"
                      placeholder="describe the vibe and include budget range"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-4 bg-auburn-glow text-white text-xs uppercase tracking-[0.25em] hover:bg-auburn-light transition-all duration-300 btn-glow-auburn"
                  >
                    request booking
                  </button>
                </form>
              </Reveal>

              {/* Right — Contact */}
              <Reveal delay={250} className="md:col-span-4">
                <div className="border border-white/10 p-8 space-y-5 flex flex-col justify-between h-full">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-auburn-glow/60 mb-4">
                      direct contact
                    </div>
                    <a
                      href="mailto:pixiqbookings@gmail.com?subject=Booking%20Inquiry%20for%20pixiq"
                      className="text-xl md:text-2xl font-serif italic text-white hover:text-auburn-glow transition-colors duration-300 block mb-4"
                    >
                      pixiqbookings@gmail.com
                    </a>
                    <p className="text-white/40 text-xs leading-relaxed">
                      include date, city, venue, set type (mashups / minimal
                      techno / dnb / dance), vibe, set length, and budget range.
                    </p>
                  </div>

                  {/* Social */}
                  <div className="pt-6 border-t border-white/10">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3">
                      follow
                    </div>
                    <div className="flex gap-5">
                      <a
                        href="https://www.instagram.com/djpixiq/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs uppercase tracking-[0.15em] text-white/50 hover:text-auburn-glow transition-colors"
                      >
                        instagram
                      </a>
                      <a
                        href="https://x.com/djpixiq"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs uppercase tracking-[0.15em] text-white/50 hover:text-auburn-glow transition-colors"
                      >
                        x
                      </a>
                      <a
                        href="https://soundcloud.com/djpixiq"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs uppercase tracking-[0.15em] text-white/50 hover:text-auburn-glow transition-colors"
                      >
                        soundcloud
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══ 6. FOOTER ═══ */}
        <footer className="relative">
          <div className="auburn-line w-full" />
          <div className="max-w-7xl mx-auto px-8 md:px-12 py-12">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <img
                src={LOGO_IMAGE}
                alt="pixiq"
                className="h-8 w-auto opacity-60"
              />
              <div className="text-white/30 text-[10px] uppercase tracking-[0.3em]">
                &copy; {new Date().getFullYear()} pixiq &middot; all rights
                reserved
              </div>
              <div className="flex gap-6 text-white/40">
                <a
                  href="https://www.instagram.com/djpixiq/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] uppercase tracking-[0.2em] hover:text-auburn-glow transition-colors"
                >
                  instagram
                </a>
                <a
                  href="https://x.com/djpixiq"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] uppercase tracking-[0.2em] hover:text-auburn-glow transition-colors"
                >
                  x
                </a>
                <a
                  href="https://soundcloud.com/djpixiq"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] uppercase tracking-[0.2em] hover:text-auburn-glow transition-colors"
                >
                  soundcloud
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
