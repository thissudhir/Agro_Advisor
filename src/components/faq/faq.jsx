import React, { useEffect, useState } from "react";
import "./faq.css";
import faq from "../../assets/faq.webp";
import faqs from "./faqData";
import Navbar from "../Navbar/Navbar";

const AccordionItem = ({ title, content, mode }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`accordion-item ${expanded ? "expanded" : ""}`}>
      <button
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClick={toggleAccordion}
        aria-expanded={expanded ? "true" : "false"}
      >
        <span
          className="accordion-title"
          style={{ color: mode === "light" ? "black" : "" }}
        >
          {title}
        </span>
        <span
          className="icon"
          aria-hidden="true"
          style={{ color: mode === "light" ? "black" : "" }}
        ></span>
      </button>
      <div className="accordion-content">
        <p style={{ color: mode === "light" ? "black" : "" }}>{content}</p>
      </div>
    </div>
  );
};

const FAQ = ({ mode, setmode }) => {
  const [logoVisible, setLogoVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  });

  return (
    <>
      {logoVisible ? (
        <div className="center-logo">
          <h3
            style={{
              width: "100%",
              height: "100%",
              marginTop: "7px",

              color: "#f3ce00",
              fontSize: { xs: "5.1rem", md: "9.1rem", sm: "5.1rem" },
              fontWeight: "bold",
              textDecoration: "none",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            FAQ
          </h3>
        </div>
      ) : (
        <>
          <Navbar isHomepage={false} mode={mode} setmode={setmode} />
          {/* main section */}
          <div
            className="faq-section"
            style={{ backgroundColor: mode === "light" ? "white" : "" }}
          >
            {/* add Heading */}
            <div className="faq-heading">Frequently Asked Questions</div>
            <div className="faq-main">
              {/* left-Side */}
              <div className="leftside">
                {/* <img className='faqImage' src={faq} /> */}
                <img alt="Man with Doubt" className="faqImage" src={faq} />
              </div>

              {/* Right-Side */}
              <div className="rightSide">
                {/* Title */}
                <div className="accordion">
                  {faqs.map((questions, index) => {
                    return (
                      <AccordionItem
                        key={index}
                        title={questions.title}
                        content={questions.content}
                        mode={mode}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FAQ;
