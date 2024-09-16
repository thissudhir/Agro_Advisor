import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import video from "../../assets/nature.mp4";
import "./Home.css";

const Typewriter = ({ sentences, delay }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const currentSentence = sentences[currentIndex % sentences.length];
    const currentSentenceLength = currentSentence.length;

    if (displayText.length === currentSentenceLength) {
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
        setDisplayText("");
      }, delay);
    } else {
      const timer = setTimeout(() => {
        setDisplayText(
          (prevText) => prevText + currentSentence[displayText.length]
        );
      }, 100); // Adjust the typing speed as per your preference

      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentIndex, displayText, sentences, delay]);

  return <span>{displayText}</span>;
};

const Home = ({ mode, setmode }) => {
  const navigate = useNavigate();

  const sentences1 = [
    "Predict what type of crop🌾 is suitable on your land🌏",
    "Get Better yield by predicting the best crop🌾 for you.",
  ];

  const sentences2 = [
    "See the benefits provided by the Indian government.",
    "Enhance your production by availing the benefits from Indian government",
  ];

  return (
    <>
      <Navbar isHomepage={false} mode={mode} setmode={setmode} />
      <div
        className="card-container"
        style={{ backgroundColor: mode === "light" ? "white" : "" }}
      >
        <div
          className="main"
          style={{ backgroundColor: mode === "light" ? "white" : "" }}
        >
          <div style={{ display: "flex" }}>
            <div className={`card glass "bg-light1"}`}>
              <button
                className={`button-1 "text-black"}`}
                onClick={() => navigate("/form")}
              >
                PREDICT YOUR CROP
              </button>
              <p className={`para "text-black"}`}>
                <Typewriter sentences={sentences1} delay={2000} />
              </p>
            </div>
            <div className={`card glass "bg-light1"}`}>
              <button
                className={`button-1 "text-black"}`}
                onClick={() => navigate("/govt-data")}
              >
                See government Data
              </button>
              <p className={`para "text-black"}`}>
                <Typewriter sentences={sentences2} delay={2000} />
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

{
  /* <video src={video} autoPlay loop muted /> */
}

{
  /* <div className="card glass">
        <div className="content">
          <h1 className='text purple'>Crop Prediction</h1>

          <p className="para">
            <Typewriter sentences={sentences} delay={2000} />
          </p>
        </div>
        {showButton && (
          <button className='button-1' onClick={() => navigate("/form")}>Get Started</button>
        )}
      </div> */
}
{
  /* <div className="button">
        <button className="button-1" onClick={() => navigate("/form")}>
          PREDICT YOUR CROP
        </button>
      </div> */
}

export default Home;
