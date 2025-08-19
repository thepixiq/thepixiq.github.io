import React, { useState } from "react";
import { motion } from "framer-motion";

// Images imported from src/assets (no /public prefix, no spaces headaches)
import HERO_IMAGE from "./assets/pool-hero.png";
import LOGO_IMAGE from "./assets/pixiq-logo-white.png";

const AUDIO_SETS = [
  {
    title: "bait & switch mashups",
    description: "unexpected blends, luxury chaos, clean transitions",
    audioSrc: "https://link.blastradio.com/ls/click?upn=u001.sPUc1Bb9HumPU-2FaSxqe0QqPYwQi-2Fd6shAOLi1vk-2BCAA26aWZpN6dU-2FFZp7-2Fkg-2FDXjUtFrZRHD8GJDNrwr9Z4yu-2FQAEa2OTkVNaJfWCKEuCFsL-2BZdfNhOB6gAvi4q8qV6cN-2BTRMgPqG53pYXbYWm-2BTqoCFFCWO81VJD-2BH8o3diO5dFP2fxz9hAqO3PMat7kMVFDRCN6OMwOAVXz-2B8QKRw7hfXwWZHZprZWYAlluJbGQW3ghvyBIiWRr8W1y6xeGYmd4kTCRqgVJlDkQvKTgZHTkun1b-2FpKnpTK6HmNidLtChJLad6z8yV1-2Fhor6VF-2FuyrT2U3VdYFfOEF5aivOQnngD36jcJ-2Bcqz-2FH8vtdxLPy-2BiuvZLYPxTvQYpjTHjgxzUts532a0RLE-2FVrJ2SVWTs5YrAgT7KmDdgCNg-2FPks5OQbUo-2FfncMJ0-2BczQR8zwCHTryMnMNIA0wRBk6zWaiMj6fluHc6o2vZyfssFGmqPPX1U8BDA-2Fk6t6hvZUFla9Fguvt7B5l5fYfXQVXaVl3bgXMF9fNSrMXDjp2XOceXhdiQOWiN0YVWsp54wanHv7WB3HFSjxKRSLz10krnnwZKUJyJzAMiDyW4MnEADhYcygtNeHsVXC-2BQjTWXl9u-2BnJ4QZewo8wxcCkJTnDXU6qo4eBdKYsYbtcXV4mSa5ZCi9caG1HP0oS5UytAAn5njVfTdigWvYaEjzhryY-2F6IhYYwOqpks6qsezQGrUj2Srpdx2OVNM-2BrS-2FR2xKdlbywLYH91obOc9nKOLXzcpTfEKK-2Ff3zkIuaq5kORjNNNRQApnXp2zZIJMCAihM2TBPry8lb9oYiWps-2FDTVxhwXVj-2FRLzfektH6US0cIe7x-2F7MBNvd-2FgJPEs-3Dz3Zr_5J-2FwVDS3qm7eyEbT5QLsoL8yGMdekiHD3KMCE9tJGPRVDE-2Bik3IhCpoaBCxu-2FrX-2B-2FzkZj2RUeIVd0VcmY-2FUOBx2qryNoCGcaH-2FU2-2Bqt1dtAAaf42irfp-2FcpQMoWh-2B-2FLGNmIIiEFzZC-2Fp-2Bt2pQoCvVT8Aefalqs3c4nuJOUwrg7X-2BEqwC-2B-2Bnie0QOo6qFJPjLae2D1Ea79tZ3UeAu3Rtprw-3D-3D",
  },
  {
    title: "dance energy flow",
    description: "euphoric movement, sweat, glow",
    audioSrc: "https://link.blastradio.com/ls/click?upn=u001.sPUc1Bb9HumPU-2FaSxqe0QqPYwQi-2Fd6shAOLi1vk-2BCAA26aWZpN6dU-2FFZp7-2Fkg-2FDXjUtFrZRHD8GJDNrwr9Z4ygogxNxL8WGXZ-2B3ADYBFVfm1c93cEgiZ-2FB-2F8a3j9jttMFBwOQAGkiMZOi5FO3U0fb5JiJUNcDd0QmoGkQ99r-2FMzIoSGV5nrOh8gVOc-2B8R3Knh3ylIr-2BT-2FEA6IJmZhmFcNzPD6PSBhxb3kDDfFkeMwuVh6HpoqwpkBDMTUyYbYW2-2FndzimAGXBS8FotJqoCvpeuRj3YZC6O5-2FqPj8N-2BzYVr-2BYa2IRGgcEaDct0aNa2r-2FaiUBRJ7-2B2tUi828ZIidaEr-2FNk03zuqiy5mETrrmShaN9fesqWwu3SMZBavOc6H8lGdiWWfjWrL6EY1XUfjpdikhDT-2FyYp72XcPSOWB1KzkV1broRqI5K-2FOKEYwjzHLEqkoOEs4-2BDSK9d1W2z3EkTlr9uc-2F2uteKYWpylD-2FfVHPpV-2FiYM9fiT-2BOlGiufqJRZWM-2FZEBEV4OSQ9yi0wT33Pb0fWJNW2VEOuYRUXFg9QDWR3fa6xkgmR3D-2F1fY3RJ63CiSXs6MHQW4yKppsC6m0lmfuInWkYbnOhrwJs12TIt2riu9s7E11OAuPbPUmQyfjJIwHUXEIufAv8S-2FOuvxY93tby3EQVuqVqo-2BH-2FZedeb6-2BFd-2F2UhPFU6liUQTa-2Bie9Xa5v7ALePRMoujUJi0rU1oEVDCfIoVVJfQ5Xj5M-2F9x2ZVJUvpMeX8z6ZYBhIiWy7nQD5he6KHAkJH5-2B4AjtT-2F-2BWhSeEKwwb4ssm5bNnTsR1q-2BeuM-2FFDBrAGM5SFGvoiwXGpBTY8txFW4vZNP-2Ff-2BWfak2cryCs5cGU4-2FNA14IMzq2iti3cH4JViLAFAuyeY55ya1ZHN_5J-2FwVDS3qm7eyEbT5QLsoL8yGMdekiHD3KMCE9tJGPS5joD4GKFy1FGxgZQ7Xg23ZtT7uAvlCGX4FCefH8bOFiN9he-2FeEkLOFJQEeO-2Fki3kKm4lqFPIHFN-2BK6TpQH0yhO67x7VDupQPC9-2BznkdTEa8HFh0J40WX-2FiI-2F9Q6M7T8RDYdTNhogSgw0AfFwTNU3dk8xv3212cR6g8hU0VOs4Rg-3D-3D",
  },
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
