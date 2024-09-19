import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./CropProductionData.css";

const API_CONFIG = {
  cropProduction: {
    url: "https://api.data.gov.in/resource/35be999b-0208-4354-b557-f6ca9a5355de",
    key: "579b464db66ec23bdd000001fcd5e6308e814be9692f670650825341",
    filters: [
      "production",
      "area",
      "crop",
      "season",
      "crop_year",
      "district_name",
      "state_name",
    ],
  },
  // Add more APIs here
  agriculturalYield: {
    url: "https://api.data.gov.in/resource/29a238ff-dc58-4de6-8da2-0e43389e8edf",
    key: "579b464db66ec23bdd000001fcd5e6308e814be9692f670650825341",
    filters: ["crop", "variety", "commodity"],
  },
  MinimumSupportPrice: {
    url: "https://api.data.gov.in/resource/9eaaa510-83c9-4071-96d8-f8bbef1a019d",
    key: "579b464db66ec23bdd000001fcd5e6308e814be9692f670650825341",
    filters: ["commodity", "msp_in_rs_per_quintal_"],
  },
  DailyPriceOfMandi: {
    url: "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070",
    key: "579b464db66ec23bdd000001fcd5e6308e814be9692f670650825341",
    filters: ["grade", "variety", "commodity", "market", "district", "state"],
  },
};

const CropProductionData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAPI, setSelectedAPI] = useState("cropProduction");
  const [filters, setFilters] = useState({
    limit: 10,
  });

  useEffect(() => {
    // Reset filters when API changes
    setFilters({
      limit: 10,
      ...Object.fromEntries(
        API_CONFIG[selectedAPI].filters.map((filter) => [filter, ""])
      ),
    });
  }, [selectedAPI]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleAPIChange = (e) => {
    setSelectedAPI(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiConfig = API_CONFIG[selectedAPI];
        let url = `${apiConfig.url}?api-key=${apiConfig.key}&format=json&limit=${filters.limit}`;
        Object.entries(filters).forEach(([key, value]) => {
          if (value && key !== "limit" && apiConfig.filters.includes(key)) {
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
  }, [filters, selectedAPI]);

  return (
    <>
      <div style={{ position: "relative", zIndex: 3 }}>
        <Navbar />
      </div>
      <div className="container">
        <div className="header">
          <select
            value={selectedAPI}
            onChange={handleAPIChange}
            className="api-selector"
          >
            {Object.keys(API_CONFIG).map((api) => (
              <option key={api} value={api}>
                {api.split(/(?=[A-Z])/).join(" ")}
              </option>
            ))}
          </select>
        </div>
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
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key.replace("_", " ")}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  {Object.values(item).map((value, i) => (
                    <td key={i} data-label={Object.keys(item)[i]}>
                      {value}
                    </td>
                  ))}
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
