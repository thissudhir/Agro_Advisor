import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./CropProductionData.css";

const API_URL =
  "https://api.data.gov.in/resource/bd3890fa-8338-4d68-a834-b65acdb2f6a0?api-key=579b464db66ec23bdd000001fcd5e6308e814be9692f670650825341&format=json";

const CropProductionData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.records);
        console.log("results", result.field);
      } catch (e) {
        setError("Failed to fetch data");
        console.error("Error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Annual Wholesale Price Index of Agriculture Produce
        </h1>
        <table>
          <thead>
            <tr>
              <th className="px-4 py-2">State</th>
              <th className="px-4 py-2">District</th>
              <th className="px-4 py-2">Crop</th>
              <th className="px-4 py-2">Year</th>
              <th className="px-4 py-2">Season</th>
              <th className="px-4 py-2">Area</th>
              <th className="px-4 py-2">Production</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="border px-4 py-2">{item.state}</td>
                <td className="border px-4 py-2">{item.district}</td>
                <td className="border px-4 py-2">{item.crop}</td>
                <td className="border px-4 py-2">{item.crop_year}</td>
                <td className="border px-4 py-2">{item.season}</td>
                <td className="border px-4 py-2">{item.area}</td>
                <td className="border px-4 py-2">{item.production}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{" "}
    </>
  );
};

export default CropProductionData;
