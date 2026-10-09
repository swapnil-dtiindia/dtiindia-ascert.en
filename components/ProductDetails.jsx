"use client";
import { useState } from "react";
import "../app/globals.css";

const WHO_Section = [
  {
    label: "01. Directors and authorized signator ",
  },
  {
    label: "02. Chartered accountants and tax professionals ",
  },
  {
    label: "03. Enterprise operations teams ",
  },
  {
    label: "04. Banks and financial institutions",
  },
  {
    label: "05. Defense and restricted environments ",
  },
];
const WHO_BOX_CONTAINER = [
  {
    title: "Directors and authorized signatories ",
    description:
      "Approve urgent documents personally, even when you are away from the office, without handing your PIN to someone else. ",
  },
  {
    title: "Chartered accountants and tax professionals ",
    description:
      "Reduce repeated PIN entry while retaining control over verified batches of documents.  ",
  },
  {
    title: "Enterprise operations teams ",
    description:
      "Support controlled signing workflows without leaving an unrestricted token permanently unlocked.  ",
  },
  {
    title: "Banks and financial institutions ",
    description:
      "Apply multi-person approval rules before high-value signatures are released.  ",
  },
  {
    title: "Defense and restricted environments",
    description:
      "Support controlled signing in environments where wireless connectivity or internet access may be prohibited.  ",
  },
];
const ProductDetails = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <section className="product-details-section">
        <div className="product-details-title">
          Made for High Value Transactions and for people 
        </div>
        <div className="product-details-title2">
          WHO VALUE THEIR DIGITAL SIGNATURE 
        </div>
      </section>
      <section className="productdetails-who-section product-details-container justify-spacebetween">
        <div className="who-section">
          {WHO_Section.map((item, index) => (
            <div
              className={`who-container ${activeIndex === index ? "active" : ""}`}
              style={{
                background: activeIndex === index ? "#005DF8" : "",
                color: activeIndex === index ? "white" : "",
                cursor: "pointer",
              }}
              key={index}
              onClick={() => setActiveIndex(index)}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div className="productdetails-container-box">
          <div className="product-information">
            <span className="productdetails-container-box-text">
              {WHO_BOX_CONTAINER[activeIndex].title}
            </span>

            <span className="productdetails-container-box-text-description">
              {WHO_BOX_CONTAINER[activeIndex].description}
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
