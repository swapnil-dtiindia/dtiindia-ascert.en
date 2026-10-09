"use client";
import Image from "next/image";
import connect from "../public/assets/connect.png";
import reviewAndApprove from "../public/assets/reviewAndApprove.png";
import signSecure from "../public/assets/signSecure.png";

const HOW_WORKS_ITEMS = [
  {
    title: "Connect ",
    description:
      "Insert QDSD into the computer where the document or transaction needs to be signed. ",
    img: connect,
  },
  {
    title: "Review and approve",
    description:
      "Check the signing request and approve it through a supported biometric method. ",
    img: reviewAndApprove,
  },
  {
    title: "Sign securely",
    description:
      "QDSD validates the approval, temporarily enables the protected signing path, and records the activity.  ",
    img: signSecure,
  },
];

const HowWorks = () => {
  return (
    <section className="how-works">
      <span className="product-details-title2">
        HOW IT WORKS WITH THE COMPANION APP
      </span>
      <div className="howworks-main-container">
        <div>
          {HOW_WORKS_ITEMS.map((item, index) => (
            <div key={index} className="how-works-box-container">
              <div className="how-works-boxes">
                <div>
                  <Image
                    src={item.img}
                    alt="images releted to the how it works section"
                    height={54}
                    width={54}
                  />
                </div>
                <div className="grid">
                  <span className="trust-layer-subtitle">{item.title}</span>
                  <span className="productdetails-container-box-text-description">
                    {item.description}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="fixed-box">
            The private signing key remains protected inside the device
            throughout the process. 
          </div>
        </div>
        <div className="secondary-box">Hello</div>
      </div>
    </section>
  );
};

export default HowWorks;
