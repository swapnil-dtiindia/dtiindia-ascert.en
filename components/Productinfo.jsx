"use client";
import Image from "next/image";
import "../app/globals.css";
import expand from "../public/assets/exapnd.png";
import benifitIcon1 from "../public/assets/BenefitIcon_1.png";
import benifitIcon2 from "../public/assets/BenefitIcon_2.png";
import benifitIcon3 from "../public/assets/BenefitIcon_3.png";
import benifitIcon4 from "../public/assets/BenefitIcon_4.png";
import { useEffect, useRef, useState } from "react";

const productInfo = [
  {
    label: "2x Hardware Based Security",
    description: "FIPS 1403 Compliant",
  },
  {
    label: "Traceble Evidance trail",
    description:
      " The only Comprehensive activity audit trails through companion app ",
  },
  {
    label: "Biometrically Safegaurded",
    description: "Biometrically safeguarded. Approve with Face ID, Touch ID ",
  },
  {
    label: "Tamper Proof Built",
    description: "Resistant to physical tampering, not just online attacks.  ",
  },
  {
    label: "Text Needed",
    description: " Up to 16,000 signature activity records per device  ",
  },
  {
    label: "SoleControl Signing",
    description: " Your signature works only with your approval",
  },
];

const benefitLines = [
  {
    text: "Digital Signing that gives you full control. Nothing connects, and nothing gets signed until you approve it",
    icon: benifitIcon1,
    trailing: ".",
  },
  {
    text: "No PIN to type, forget, expose, or share",
    icon: benifitIcon2,
  },
  {
    text: "Independent proof of when your signature was created",
    icon: benifitIcon3,
  },
  {
    text: "Confirm signatures from your phone without typing sensitive credentials on the computer",
    icon: benifitIcon4,
  },
];

const storyTokens = benefitLines.flatMap((line) => {
  const words = line.text
    .split(/\s+/)
    .filter(Boolean)
    .map((value) => ({ type: "word", value }));
  const icon = { type: "icon", src: line.icon };
  return line.trailing
    ? [...words, icon, { type: "word", value: line.trailing }]
    : [...words, icon];
});

const FULL_COLOR = [0, 47, 124];
const MUTED_COLOR = [168, 184, 210];

const clamp = (value) => Math.min(1, Math.max(0, value));

const smoothstep = (value) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

const mixColor = (amount) => {
  const eased = smoothstep(amount);
  const channel = (from, to) => Math.round(from + (to - from) * eased);
  return `rgb(${channel(MUTED_COLOR[0], FULL_COLOR[0])}, ${channel(MUTED_COLOR[1], FULL_COLOR[1])}, ${channel(MUTED_COLOR[2], FULL_COLOR[2])})`;
};

const backgroundForProgress = (progress) => {
  const fade = 0.18;
  let amount = 1;
  if (progress <= 0 || progress >= 1) amount = 0;
  else if (progress < fade) amount = progress / fade;
  else if (progress > 1 - fade) amount = (1 - progress) / fade;
  return `rgba(230, 239, 254, ${smoothstep(amount)})`;
};

const Productinfo = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [scrub, setScrub] = useState(true);
  const stageRef = useRef(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stage = stageRef.current;
    if (!stage) return undefined;

    const paint = (progress) => {
      const pin = stage.querySelector(".product-text-pin");
      const tokens = stage.querySelectorAll("[data-scroll-token]");
      if (pin) pin.style.backgroundColor = backgroundForProgress(progress);

      const reveal = Math.min(1, progress / 0.82);
      const span = 0.12;
      const lastIndex = Math.max(tokens.length - 1, 1);
      tokens.forEach((token, index) => {
        const start = (index / lastIndex) * (1 - span);
        const amount = clamp((reveal - start) / span);
        if (token.dataset.scrollToken === "icon") {
          token.style.opacity = String(0.35 + 0.65 * smoothstep(amount));
          return;
        }
        token.style.color = mixColor(amount);
      });
    };

    if (media.matches) {
      setScrub(false);
      paint(1);
      return undefined;
    }

    let frame = 0;
    const update = () => {
      const rect = stage.getBoundingClientRect();
      const scrollable = stage.offsetHeight - window.innerHeight;
      const progress = scrollable <= 0 ? 1 : clamp(-rect.top / scrollable);
      paint(progress);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    setScrub(true);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    media.addEventListener("change", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      media.removeEventListener("change", onScroll);
    };
  }, []);
  return (
    <section className="product-info-section">
      <div className="container">
        <span className="small-text">One secure infrastructure</span>{" "}
        <span className="all-text">
          for enterprise, government, financial, personal and professional,
          digital signing. 
        </span>
      </div>
      <div className="flex gap-90">
        <div className="productinfo-container">
          {productInfo.map((item, index) => (
            <div
              key={index}
              style={{ background: "#fdf8f0", paddingBottom: "10px" }}
            >
              <div
                onClick={() => handleClick(index)}
                className="spec-container"
              >
                <Image
                  style={{ marginLeft: "10px" }}
                  src={expand}
                  alt="expand image"
                  height={21}
                  width={21}
                />{" "}
                {item.label}
              </div>
              <div>
                {activeIndex === index && (
                  <span style={{ marginLeft: "40px", display: "flex" }}>
                    {item.description}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="video-images-placeholder"></div>
      </div>
      <div
        ref={stageRef}
        className={`product-text-stage${scrub ? " product-text-stage--scrub" : ""}`}
      >
        <div className="text-container product-text-pin">
          <div className="product-text">
            {storyTokens.map((token, index) =>
              token.type === "icon" ? (
                <span
                  key={`icon-${index}`}
                  className="product-token product-token--icon"
                  data-scroll-token="icon"
                >
                  {" "}
                  <Image
                    className="benifits-icons"
                    src={token.src}
                    alt=""
                  />{" "}
                </span>
              ) : (
                <span
                  key={`${token.value}-${index}`}
                  className="product-token"
                  data-scroll-token="word"
                >
                  {token.value}{" "}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Productinfo;
