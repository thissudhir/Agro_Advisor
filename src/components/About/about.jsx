import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Review from "../Review/Review";
import Navbar from "../Navbar/Navbar";
import "./about.css";

const About = ({ mode, setmode }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [logoVisible, setLogoVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoVisible(false);
    }, 1000);
    return () => clearTimeout(timer);
  });
  const handleClick = () => {
    navigate("/contact"); // Replace '/other-page' with the desired URL of the page you want to navigate to
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  const images = [
    "https://kj1bcdn.b-cdn.net/media/33674/1.jpg?width=1200",
    "https://plantix.net/en/library/assets/custom/crop-images/maize.jpeg",
    "https://www.agrifarming.in/wp-content/uploads/2022/01/Maize-Yield2-768x576.jpg",
    "https://cdn.downtoearth.org.in/library/large/2019-06-03/0.62901000_1559538844_maize_gettyimages-.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

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
              // fontSize: "9.1rem",
              fontWeight: "bold",
              textDecoration: "none",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            About
          </h3>
        </div>
      ) : (
        <>
          {/* main section */}
          <div style={{ position: "relative", zIndex: 3 }}>
            <Navbar />
          </div>
          <div className={`aboutMain`}>
            <h1 className="about">🌾 What Is Agro Advisor❔ </h1>
            <div className="content">
              <div className="left">
                <p>
                  Agro Advisor is a powerful crop recommendation website that
                  helps farmers and agriculture enthusiasts make informed
                  decisions about the best crop to cultivate on a given land. By
                  utilizing machine learning algorithms and various
                  environmental parameters such as nitrogen value of soil,
                  phosphorus value, rainfall, pH, potassium, humidity, and
                  temperature. Agro Advisor predicts the optimal crop choice,
                  maximizing productivity and yield.
                </p>

                <ul className="feature">
                  <h3>🌾 Salient Features</h3>
                  <li>&#9830; Intelligent crop recommendation</li>
                  <li>&#9830; User-friendly interface </li>
                  <li>
                    &#9830;Efficient ML model leveraging Gaussian Naïve Bayes
                    algorithm.
                  </li>
                  <li>
                    &#9830; Scalable backend powered by FastAPI for quick data
                    processing.
                  </li>
                </ul>

                <button onClick={handleClick}>Get In Touch</button>
              </div>

              <div className="slider-box">
                {/* <img src={aboutPic} alt="about" /> */}
                <Slider {...settings} className="slider">
                  {images.map((image, index) => (
                    <div className="slider-div" key={index}>
                      <img src={image} alt="about" />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

          <div className="details">
            <div className="d-col">
              <div className="img-cont">
                <img
                  src="https://dp9eps5gd5xd0.cloudfront.net/images/Article_Images/ImageForArticle_577_16762778403133220.jpg"
                  alt=""
                />
              </div>
              <div className="title">
                <h2>Agronomy</h2>
                <p>
                  Potato crop management using predictions powered by agronomy.{" "}
                </p>
              </div>
            </div>
            <div className="d-col">
              <div className="img-cont">
                <img
                  src="https://images.prismic.io//intuzwebsite/ee51a4e5-4769-4a1b-b4a4-ce1ae93731a5_Banner%402x.png?w=2400&q=80&auto=format,compress&fm=png8"
                  alt=""
                />
              </div>
              <div className="title">
                <h2>Technology</h2>
                <p>
                  Using data science to forecast agronomic and financial crop
                  outcomes and automate data collection.{" "}
                </p>
              </div>
            </div>
            <div className="d-col">
              <div className="img-cont">
                <img
                  src="https://blog.agribazaar.com/wp-content/uploads/2023/06/Male-Bioengineer-Inspecting-Growth-Of-Crops-On-Modern-Vertical-Farm.-Man-Cultivates-Organic-Food-or-Plants-In-Technologically-Advanced-Greenhouse.-VFX-Infographics-Edit-Showing-Statistics-Data..jpg"
                  alt=""
                />
              </div>
              <div className="title">
                <h2>Valuable Insights </h2>
                <p>
                  {" "}
                  Manage your crop value and supply chain requirements from
                  pre-planting to harvest.
                </p>
              </div>
            </div>
          </div>

          <main className="main">
            <section className="containerIP">
              <div className="title">
                <h2>Our Testimonials</h2>
                <div className="underline"></div>
              </div>
              <Review mode={mode} />
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default About;
