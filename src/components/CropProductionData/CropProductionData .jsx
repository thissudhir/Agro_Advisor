import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./CropProductionData.css";

const BASE_API_URL =
  "https://api.data.gov.in/resource/35be999b-0208-4354-b557-f6ca9a5355de";
const API_KEY = "579b464db66ec23bdd000001fcd5e6308e814be9692f670650825341";

const CropProductionData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    limit: 10,
    production: "",
    area: "",
    crop: "",
    season: "",
    crop_year: "",
    district_name: "",
    state_name: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `${BASE_API_URL}?api-key=${API_KEY}&format=json&limit=${filters.limit}`;
        Object.entries(filters).forEach(([key, value]) => {
          if (value && key !== "limit") {
            url += `&filters[${key}]=${encodeURIComponent(value)}`;
          }
        });
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.records && result.records.length > 0) {
          setData(result.records);
        } else {
          setData([]);
          setError("No records found for the given criteria.");
        }
      } catch (e) {
        setError(e.message || "Failed to fetch data");
        console.error("Error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Crop Production Statistics from 1997</h1>
        <div className="filters">
          {Object.entries(filters).map(([key, value]) => (
            <input
              key={key}
              type="text"
              name={key}
              value={value}
              onChange={handleFilterChange}
              placeholder={`Filter by ${key.replace("_", " ")}`}
              className="filter-input"
            />
          ))}
        </div>

        {loading && <div className="loading">Loading...</div>}

        {error && <div className="error">{error}</div>}

        {!loading && !error && data.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>State</th>
                <th>District</th>
                <th>Crop</th>
                <th>Year</th>
                <th>Season</th>
                <th>Area</th>
                <th>Production</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <td>{item.state_name}</td>
                  <td>{item.district_name}</td>
                  <td>{item.crop}</td>
                  <td>{item.crop_year}</td>
                  <td>{item.season}</td>
                  <td>{item.area_}</td>
                  <td>{item.production_}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && !error && data.length === 0 && (
          <div className="no-records">
            No records found for the given criteria. Try adjusting your filters.
          </div>
        )}
      </div>
    </>
  );
};

export default CropProductionData;
