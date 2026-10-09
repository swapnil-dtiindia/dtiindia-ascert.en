import "../app/globals.css";
import Image from "next/image";
import hero_mobile from "../public/assets/hero-device.png";
import hero_pattern from "../public/assets/hero-pattern.svg";
import circle from "../public/assets/circle.png";
import ps from "../public/assets/ps.png";
import av from "../public/assets/av.png";
import file from "../public/assets/file.png";
import Button from "./Button";
const Hero = () => {
  return (
    <section className="hero" id="top">
      <Image
        className="hero_banner"
        src={hero_pattern}
        alt="hero banner mobile device"
      />
      <div className="hero__copy">
        <h1>India’s First Qualified Digital Signing Device & App</h1>
        <p>
          A multilevel security and hardware authentication that protects,
          preserves and generates evidance to record your digital signitures.
        </p>
        <Button>Request a demo</Button>
      </div>
      <div className="hero_stage">
        <div className="card1 hero-card">
          <Image src={circle} height={32} width={32} alt="circle image" />
          <div className="grid">
            <span className="boardTitle">Board Resolution</span>
            <span className="yesterdaySpan">Yesterday</span>
          </div>
          <div className="approved">
            <span>Approved</span>
          </div>
        </div>
        <div className="card2 hero-card hero-card--lag flex">
          <div className="card2-div1">
            <div className="flex gap">
              <Image src={ps} width={36} height={36} alt="ps image" />
              <div className="grid">
                <span className="boardTitle">Priya Shah</span>
                <span className="yesterdaySpan">Shah & Co.</span>
              </div>
            </div>
            <span className="yesterdaySpan">2 min ago</span>
          </div>
          <div></div>
          <div className="flex gap">
            <button className="reject-btn">Reject</button>
            <button className="approve-btn">Approve</button>
          </div>
        </div>
        <div className="card3 hero-card hero-card--next">
          <div className="flex-justify-item-center gap">
            <Image
              alt="file image in card 3"
              src={file}
              height={44}
              width={44}
            />
            <span className="data-process-title">Data Process Agreement</span>
          </div>
          <div>
            <span className="yesterdaySpan">For Rahul Mehta</span>
          </div>
          <div>
            <button className="card3-btn">Approved, ready to sign</button>
          </div>
          <div>
            <button className="card3-btn2">Affix consent</button>
          </div>
        </div>
        <div className="card4 hero-card hero-card--next hero-card--lag flex">
          <div className="card2-div1">
            <div className="flex gap">
              <Image src={av} width={36} height={36} alt="ps image" />
              <div className="grid">
                <span className="boardTitle">Ananya Verma</span>
                <span className="yesterdaySpan">
                  Subscriber ID: DTII-SUB-1091
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap">
            <button className="reject-btn">Decline</button>
            <button className="approve-btn">Accept</button>
          </div>
        </div>
        <Image
          className="hero_device"
          src={hero_mobile}
          alt="Ascert mobile app on two phones, showing signing requests and recent activity"
        />
      </div>
    </section>
  );
};

export default Hero;
