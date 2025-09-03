import React, { useState } from "react";
import { motion } from "framer-motion";

// Images imported from src/assets (no /public prefix, no spaces headaches)
import HERO_IMAGE from "./assets/pool-hero.png";
import LOGO_IMAGE from "./assets/pixiq-logo-white.png";

const AUDIO_SETS = [
  {
  title: "bait & switch themed mashups",
  description: "unexpected blends, luxury chaos, clean transitions",
  audioSrc: "https://github.com/thepixiq/thepixiq.github.io/raw/main/bait_switch_holiday.m4a",
},
{
  title: "dance energy flow",
  description: "euphoric movement, sweat, glow",
  audioSrc: "https://github.com/thepixiq/thepixiq.github.io/raw/main/dance.m4a",
}
];

export default function PixiqLanding() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Favicon belongs in index.html <head>: <link rel="icon" href="/icon.png" /> */}

      {/* HEADER WITH LOGO */}
      <header className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-6 py-4">
        <img src={LOGO_IMAGE} alt="pixiq logo" className="h-10 w-auto" />
        <nav className="flex gap-6 text-sm uppercase tracking-wide text-white/80">
          <a href="#listen" className="hover:text-white">listen</a>
          <a href="#bookings" className="hover:text-white">bookings</a>
        </nav>
      </header>

      {/* HERO */}
      <section
        className="relative h-[92vh] w-full overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.75)), url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black"></div>

        <div className="relative z-10 h-full container mx-auto px-6 flex items-end pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="uppercase tracking-[0.35em] text-xs text-white/70 mb-3">
              feminine sonic oracle · elevated sound
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold leading-[0.95] mb-4">
              pixiq
            </h1>
            <p className="text-white/80 max-w-xl">
              luxury beats and hypnotic sets · minimal techno · drum & bass · dance
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#listen"
                className="rounded-2xl px-5 py-3 bg-white/90 text-black hover:bg-white transition shadow-lg shadow-white/10"
              >
                listen now
              </a>
              <a
                href="#bookings"
                className="rounded-2xl px-5 py-3 border border-white/40 hover:border-white/80 backdrop-blur-sm"
              >
                book pixiq
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LISTEN */}
      <section id="listen" className="container mx-auto px-6 py-20">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold">the sound</h2>
          <p className="text-white/70 mt-2 max-w-2xl">
            bait & switch mashups · minimal techno · drum n bass · dance sets
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-2 space-y-3">
            {AUDIO_SETS.map((s, i) => (
              <button
                key={s.title}
                onClick={() => setSelected(i)}
                className={`w-full text-left rounded-2xl p-4 border transition ${
                  selected === i
                    ? "border-white/80 bg-white/5"
                    : "border-white/15 hover:border-white/40"
                }`}
              >
                <div className="text-sm uppercase tracking-wide text-white/60">
                  set {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-xl font-medium">{s.title}</div>
                <div className="text-white/60 text-sm">{s.description}</div>
              </button>
            ))}
          </div>

          <div className="md:col-span-3">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-white/15 p-6 bg-gradient-to-b from-white/5 to-transparent"
            >
              <div className="text-sm uppercase tracking-wide text-white/60">
                now playing
              </div>
              <div className="text-2xl md:text-3xl font-semibold mt-1">
                {AUDIO_SETS[selected].title}
              </div>
              <div className="text-white/60 mb-4">
                {AUDIO_SETS[selected].description}
              </div>

              <audio
                className="w-full mt-2"
                controls
                preload="none"
                src={AUDIO_SETS[selected].audioSrc}
              >
                Your browser does not support the audio element.
              </audio>

              <div className="mt-4 flex gap-3">
                <a
                  href={AUDIO_SETS[selected].audioSrc}
                  className="text-sm underline underline-offset-4 text-white/80 hover:text-white"
                >
                  download
                </a>
                <a
                  href="#bookings"
                  className="text-sm underline underline-offset-4 text-white/80 hover:text-white"
                >
                  book this energy
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BOOKINGS */}
      <section id="bookings" className="container mx-auto px-6 py-20">
        <div className="mb-8">
          <h3 className="text-3xl font-semibold">bookings</h3>
          <p className="text-white/70 mt-2 max-w-2xl">
            select engagements only. concise details get priority.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <form
            className="rounded-3xl border border-white/15 p-6 space-y-4 bg-white/[0.03]"
            action="https://formspree.io/f/xnnzkaqe"
            method="POST"
          >
            <div>
              <label className="block text-sm text-white/70 mb-1">name</label>
              <input
                name="name"
                required
                className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:border-white/50"
                placeholder="your name"
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-1">email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:border-white/50"
                placeholder="you@domain.com"
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-1">event details</label>
              <textarea
                name="details"
                rows={5}
                className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:border-white/50"
                placeholder="date · city · venue · vibe · set length · budget"
              />
            </div>
            <button
              type="submit"
              className="rounded-2xl px-5 py-3 bg-white/90 text-black hover:bg-white transition shadow-lg shadow-white/10"
            >
              request booking
            </button>
          </form>

          <div className="rounded-3xl border border-white/15 p-6 space-y-4">
            <div className="text-sm uppercase tracking-wide text-white/60">
              direct contact
            </div>
            <a
              href="mailto:bookings@thepixiq.com?subject=Booking%20Inquiry%20for%20pixiq"
              className="text-2xl underline underline-offset-4"
            >
              bookings@thepixiq.com
            </a>
            <p className="text-white/70">
              include date, city, venue, set type (mashups / minimal techno / dnb /
              dance), and budget range.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER WITH LOGO */}
      <footer className="px-6 py-10 border-t border-white/10">
        <div className="container mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <img src={LOGO_IMAGE} alt="pixiq logo" className="h-8 w-auto" />
          <div className="text-white/60 text-sm">© {new Date().getFullYear()} pixiq</div>
          <div className="flex gap-5 text-white/80">
            <a href="https://www.instagram.com/djpixiq/" target="_blank" rel="noreferrer" className="hover:text-white">instagram</a>
            <a href="https://x.com/djpixiq" target="_blank" rel="noreferrer" className="hover:text-white">x</a>
            <a href="https://soundcloud.com/djpixiq" target="_blank" rel="noreferrer" className="hover:text-white">soundcloud</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
