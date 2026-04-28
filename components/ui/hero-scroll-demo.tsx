"use client";

import { motion } from "framer-motion";

const marketSignals = [
  {
    label: "Rareté réelle",
    value: "Profils ciblés, pas volume"
  },
  {
    label: "Narration marché",
    value: "Message plus convaincant"
  },
  {
    label: "Décision",
    value: "Shortlist plus lisible"
  }
];

const marketTags = ["Biotech", "Diagnostic", "Medtech", "Animal Health", "Petfood"];

export function HeroScrollDemo() {
  return (
    <div className="relative overflow-hidden rounded-[34px] border border-[#cbe8e4] bg-[#143136] p-4 sm:p-6">
      <motion.div
        animate={{ opacity: [0.22, 0.36, 0.22], scale: [0.98, 1.04, 0.98] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[-8%] top-[-12%] h-56 w-56 rounded-full bg-brand-mint/20 blur-3xl"
      />
      <motion.div
        animate={{ opacity: [0.1, 0.18, 0.1], x: [0, 16, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-[-12%] right-[-6%] h-60 w-60 rounded-full bg-cyan-100/12 blur-3xl"
      />

      <div className="relative grid gap-5 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-5 rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-5 text-white backdrop-blur-sm sm:p-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-100">
            Signal marché
          </p>
          <h3 className="font-display text-3xl leading-tight sm:text-4xl">
            Une lecture plus calme, plus nette, plus utile pour décider.
          </h3>
          <p className="text-sm leading-7 text-white/82 sm:text-base">
            Nous ne cherchons pas à impressionner par l’effet. Nous cherchons à montrer comment une
            bonne lecture du marché clarifie le rôle, améliore la crédibilité et sécurise la
            décision.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {marketSignals.slice(0, 2).map((item, index) => (
              <motion.div
                key={`intro-${item.label}`}
                animate={{ y: [0, -4, 0], opacity: [0.92, 1, 0.92] }}
                transition={{
                  duration: 4.8,
                  delay: index * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="rounded-[22px] border border-white/10 bg-black/10 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-100">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/90">{item.value}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            animate={{ opacity: [0.92, 1, 0.92] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-[24px] border border-white/10 bg-black/12 p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-100">
                  Lecture en continu
                </p>
                <p className="mt-2 text-sm leading-6 text-white/84">
                  Rareté, message marché et niveau de décision évoluent ensemble. Le cadrage vient
                  avant le sourcing.
                </p>
              </div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.08, 1] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                className="h-11 w-11 rounded-full border border-white/14 bg-brand-mint/18 shadow-[0_0_0_10px_rgba(116,229,219,0.06)]"
              />
            </div>
          </motion.div>
          <div className="flex flex-wrap gap-2.5">
            {marketTags.map((tag, index) => (
              <motion.span
                key={tag}
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 3.6,
                  delay: index * 0.14,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut"
                }}
                className="rounded-full border border-white/14 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [0, -0.8, 0] }}
            transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-[30px] border border-white/14 bg-[linear-gradient(145deg,rgba(13,31,34,0.98),rgba(21,54,58,0.98))] p-5 shadow-[0_28px_80px_rgba(3,15,18,0.28)]"
          >
            <motion.div
              animate={{ x: ["-14%", "108%"] }}
              transition={{ duration: 6.4, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute inset-y-6 w-24 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)] blur-md"
            />
            <div className="rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(120,223,230,0.14),transparent_34%),linear-gradient(135deg,#18373c,#21454a_52%,#14282c)] p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-100">
                    Lecture vivante
                  </p>
                  <h4 className="mt-3 font-display text-3xl text-white">
                    Cadrer plus juste avant de chercher plus loin.
                  </h4>
                </div>
                <motion.div
                  animate={{ opacity: [0.45, 1, 0.45] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  className="mt-1 h-3 w-3 rounded-full bg-brand-mint shadow-[0_0_0_8px_rgba(116,229,219,0.08)]"
                />
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-[24px] border border-white/10 bg-white/8 p-5 text-white backdrop-blur"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-100">
                      Tension du marché
                    </p>
                    <p className="text-sm text-white/88">mise à jour continue</p>
                  </div>
                  <div className="mt-6 space-y-4">
                    {[78, 64, 86].map((width, index) => (
                      <div key={width}>
                        <div className="mb-2 flex items-center justify-between text-sm text-white/92">
                          <span>{marketSignals[index]?.label}</span>
                          <span>{width}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <motion.div
                            animate={{ width: [`${Math.max(36, width - 16)}%`, `${width}%`, `${Math.max(42, width - 8)}%`] }}
                            transition={{
                              duration: 4.4 + index * 0.4,
                              repeat: Infinity,
                              repeatType: "mirror",
                              ease: "easeInOut"
                            }}
                            className="h-2 rounded-full bg-gradient-to-r from-cyan-200 to-brand-teal"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="grid gap-3">
                  {marketSignals.map((item, index) => (
                    <motion.div
                      key={item.label}
                      animate={{ y: [0, -5, 0], opacity: [0.88, 1, 0.88] }}
                      transition={{
                        duration: 4.8,
                        delay: index * 0.22,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(0,0,0,0.16),rgba(255,255,255,0.04))] px-4 py-4 text-white backdrop-blur"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-100">
                        {item.label}
                      </p>
                      <p className="mt-2 text-base text-white">{item.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {marketTags.map((tag, index) => (
                  <motion.span
                    key={`inline-${tag}`}
                    animate={{ opacity: [0.46, 1, 0.46], y: [0, -2, 0] }}
                    transition={{
                      duration: 3.8,
                      delay: index * 0.18,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
