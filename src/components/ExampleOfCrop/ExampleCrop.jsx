import React, { useEffect } from "react";
import "./ExampleCrop.css";
import CropData from "./CropData";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";

export function ExampleCrop({ mode, setmode }) {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(CropData);
  const [logoVisible, setLogoVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoVisible(false);
    }, 1000);
    return () => clearTimeout(timer);
  });

  function handlesearch(e) {
    setSearch(e.target.value);
    const query = e.target.value;
    if (query === "") {
      setData(CropData);
    }

    const array = CropData.filter((elem) => {
      return elem.head.toLowerCase().includes(query);
    });

    for (let index = 0; index < CropData.length; index++) {
      const element = CropData[index];
      // if not present in the array
      if (
        array.find((elem) => {
          return elem.sl === element.sl;
        }) === undefined &&
        element.season.toLowerCase().includes(query)
      ) {
        array.push(element);
      }
    }
    // setfiltered(array);
    setData(array);
  }

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
            Example
          </h3>
        </div>
      ) : (
        <>
          <div style={{ position: "relative", zIndex: 3 }}>
            <Navbar />
          </div>
          <div className="container">
            <center>
              <h1 className="h1_E">Find your crop </h1>
            </center>

            <div className="search-wrapper">
              <input type="text" placeholder="Search by Season" />
            </div>

            <table
              className="table_E"
              style={{ backgroundColor: mode === "light" ? "white" : "" }}
            >
              <thead className="thead_E">
                <tr>
                  <th>SL NO.</th>
                  <th>SEASON</th>
                  <th>CROP</th>
                  <th>IMAGE</th>
                </tr>
              </thead>
              <tbody className="tbody_E">
                {data.map((card, index) => (
                  <tr
                    key={index}
                    className="rowex"
                    style={{
                      backgroundColor: mode === "light" ? "white" : "",
                      color: mode === "light" ? "black" : "white",
                    }}
                  >
                    <td>{card.sl}</td>
                    <td>{card.season}</td>
                    <td>{card.head}</td>
                    <td>
                      <img src={card.imageUrl} alt="img" className="Avtar" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
