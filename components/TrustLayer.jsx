"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
const LAYERS = [
  {
    name: "Security Layer",
    note: "Every record is encrypted and access-controlled before it is stored.",
    r: 52,
    color: "#4C7DFF",
    w: 3,
    icon: ["M-12 -2h24v18h-24z", "M-7 -2v-7a7 7 0 0 1 14 0v7", "M0 5v5"],
  },
  {
    name: "Evidence Layer",
    note: "Each event is captured with who, what and exactly when.",
    r: 84,
    color: "#8FB0FF",
    w: 3,
    icon: ["M-10 -16h14l8 8v24h-22z", "M4 -16v8h8", "M-5 1h10M-5 7h10"],
  },
  {
    name: "Preservation Layer",
    note: "Records are kept unchanged and readable for the long term.",
    r: 116,
    color: "#F2B84B",
    w: 7,
    icon: ["M0 -16a16 16 0 1 1 0 32a16 16 0 1 1 0 -32", "M0 -8v8l6 4"],
  },
  {
    name: "Verification Layer",
    note: "Anyone can check that a record was never altered.",
    r: 148,
    color: "#46E3A4",
    w: 3,
    icon: ["M0 -16a16 16 0 1 1 0 32a16 16 0 1 1 0 -32", "M-8 0l6 7l11 -13"],
  },
  {
    name: "Protection Layer",
    note: "Tampering attempts are blocked, flagged and logged.",
    r: 180,
    color: "#FFFFFF",
    w: 5,
    icon: [
      "M0 -17l15 5v10c0 10 -7 16 -15 19c-8 -3 -15 -9 -15 -19v-10z",
      "M-6 0l5 5l8 -9",
    ],
  },
];
const HEX = "0123456789abcdef";
function Hash({ seed }) {
  const [t, setT] = useState("9f3a7c21e0b4");
  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      setT(
        Array.from({ length: 12 }, () => HEX[(Math.random() * 16) | 0]).join(
          "",
        ),
      );
      if (++n > 12) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [seed]);
  return <>{t}</>;
}
function Ring({ q, i, l, still }) {
  const a = i / 5,
    b = (i + 1) / 5;
  const len = useTransform(q, [a, b], [0, 1], { clamp: true });
  const op = useTransform(q, [a, a + 0.005], [0, 1], { clamp: true });
  return (
    <g>
      <circle
        r={l.r}
        fill="none"
        stroke="#fff"
        strokeOpacity=".07"
        strokeWidth={l.w}
      />
      <motion.circle
        r={l.r}
        fill="none"
        stroke={l.color}
        strokeWidth={l.w}
        strokeLinecap="round"
        transform="rotate(-90)"
        style={{
          pathLength: len,
          opacity: op,
          filter: `drop-shadow(0 0 8px ${l.color}88)`,
        }}
      />
      <motion.g style={{ opacity: op }}>
        {!still && (
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={i % 2 ? "360" : "0"}
              to={i % 2 ? "0" : "360"}
              dur={`${7 + i * 3}s`}
              repeatCount="indefinite"
            />
            <circle cx={l.r} r="4.5" fill={l.color} />
          </g>
        )}
      </motion.g>
    </g>
  );
}
function Icon({ layer }) {
  return (
    <motion.g
      fill="none"
      stroke="#fff"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="scale(1.05)"
    >
      {layer.icon.map((d, k) => (
        <motion.path
          key={k}
          d={d}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.1 + k * 0.25,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.g>
  );
}
export default function TrustLayer() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const q = useTransform(p, [0.02, 0.88], [0, 1], { clamp: true });
  const hint = useTransform(p, [0, 0.04], [1, 0]);
  useMotionValueEvent(q, "change", (v) =>
    setIdx(v >= 0.999 ? 5 : Math.min(4, Math.floor(v * 5))),
  );
  const sealed = idx === 5;
  const cur = LAYERS[Math.min(idx, 4)];
  const glow = sealed ? "#F2B84B" : cur.color;
  const go = (i) => {
    const el = ref.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + span * (0.02 + 0.86 * ((i + 0.55) / 5)),
      behavior: "smooth",
    });
  };
  return (
    <section ref={ref} className="ts-root">
      <div className="ts-sticky">
        <motion.div
          className="ts-glow"
          animate={{
            background: `radial-gradient(60% 55% at 50% 50%, ${glow}33, transparent 70%)`,
          }}
          transition={{ duration: 0.8 }}
        />
        <header className="ts-head">
          <p>Ascert.en Evidence Network bringing you</p>
          <h2>Trust as a Service</h2>
        </header>
        <div className="ts-body">
          <svg
            viewBox="-210 -210 420 420"
            className="ts-svg"
            role="img"
            aria-label="Five security layers sealing an evidence record"
          >
            <motion.circle
              r="198"
              fill="none"
              stroke="#fff"
              strokeWidth="5"
              strokeDasharray="1.5 14.9"
              transform="rotate(-90)"
              style={{ pathLength: q, opacity: 0.45 }}
            />
            {LAYERS.map((l, i) => (
              <Ring key={l.name} q={q} i={i} l={l} still={reduce} />
            ))}
            {sealed &&
              !reduce &&
              [0, 0.5, 1].map((d) => (
                <motion.circle
                  key={d}
                  r="180"
                  fill="none"
                  stroke="#F2B84B"
                  strokeWidth="2"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 1.18, opacity: 0 }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: d,
                    ease: "easeOut",
                  }}
                />
              ))}
            <motion.circle
              r="34"
              fill="#0A1747"
              stroke={glow}
              strokeWidth="2"
              animate={{ scale: sealed ? [1, 1.15, 1] : 1, stroke: glow }}
              transition={{ duration: 0.7 }}
            />
            <AnimatePresence mode="wait">
              <motion.g
                key={idx}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Icon layer={sealed ? LAYERS[4] : cur} />
              </motion.g>
            </AnimatePresence>
          </svg>
          <div className="ts-text">
            <p className="ts-step">
              {sealed ? "Complete" : `Layer ${idx + 1} of 5`}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -28, filter: "blur(8px)" }}
                transition={{ duration: 0.45 }}
              >
                <h3 style={{ color: glow }}>
                  {(sealed ? "Sealed." : cur.name).split("").map((c, k) => (
                    <motion.span
                      key={k}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: k * 0.025 }}
                      style={{ display: "inline-block", whiteSpace: "pre" }}
                    >
                      {c}
                    </motion.span>
                  ))}
                </h3>
                <p className="ts-note">
                  {sealed
                    ? "Five layers. One record anyone can verify."
                    : cur.note}
                </p>
              </motion.div>
            </AnimatePresence>
            {/* <p className="ts-hash">
              seal <Hash seed={idx} />
            </p> */}
          </div>
        </div>
        <nav className="ts-rail" aria-label="Layers">
          {LAYERS.map((l, i) => (
            <button
              key={l.name}
              onClick={() => go(i)}
              aria-label={l.name}
              data-on={idx >= i}
            >
              <motion.i
                animate={{ scaleX: idx >= i ? 1 : 0, backgroundColor: l.color }}
              />
              <span>{l.name.replace(" Layer", "")}</span>
            </button>
          ))}
        </nav>
        <motion.p className="ts-hint" style={{ opacity: hint }}>
          Scroll to build the seal
        </motion.p>
      </div>
    </section>
  );
}
