"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "Security",
    sub: "Short description of this layer.",
    tint: "linear-gradient(135deg,#e6e9ff,#f3e8f5)",
  },
  {
    title: "Evidence",
    sub: "Short description of this layer.",
    tint: "linear-gradient(135deg,#e4f1ff,#f5eaea)",
  },
  {
    title: "Preservation",
    sub: "Short description of this layer.",
    tint: "linear-gradient(135deg,#e8f6ee,#eef0ff)",
  },
  {
    title: "Verification",
    sub: "Short description of this layer.",
    tint: "linear-gradient(135deg,#fff1e2,#f1e8ff)",
  },
  {
    title: "Protection",
    sub: "Short description of this layer.",
    tint: "linear-gradient(135deg,#e2f4f7,#e9ecff)",
  },
];

export default function Benifits() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.i));
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="wrap">
      <div className="mobile-cards-css">
        {features.map((f, i) => (
          <section
            key={f.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-i={i}
            className="card"
            style={{ background: f.tint, zIndex: i + 1 }}
          >
            <div className="text" data-active={active === i}>
              <h2>{f.title}</h2>
              <p>{f.sub}</p>
            </div>
          </section>
        ))}
      </div>
      <div className="phoneLayer" aria-hidden>
        <div className="phone">
          <div className="notch" />
          {features.map((f, i) => (
            <div key={f.title} className="screen" data-active={active === i}>
              <h4>{f.title}</h4>
              <div className="bubble">Screen content for “{f.title}”</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
