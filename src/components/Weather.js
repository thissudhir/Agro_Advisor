import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Weather.css';
import Navbar from './Navbar/Navbar'
import WeatherCard from './WeatherCard/WeatherCard';



export const Weather = ({ mode, setmode }) => {
    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [submitPress, setSubmitPress] = useState(false)
    const [logoVisible, setLogoVisible] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLogoVisible(false);
        }, 1000);
        return () => clearTimeout(timer);
    });
    const handleWeather = async (e) => {
        e.preventDefault();

        setSubmitPress(true)
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7b96e250f5f9d8682865d4335a802fe2`
            );
            // setWeatherData(response.data)
            if (response.data.cod === '404') {
                setErrorMessage('Improper location. Please try again.');
                setWeatherData(null);
            }
            else {
                setWeatherData(response.data);
                setErrorMessage('');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Location does not exist.');
            setWeatherData(null);
        }
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
                        Weather
                    </h3>
                </div>
            ) : (
                <>
                    <Navbar isHomepage={false} mode={mode} setmode={setmode} />
                    <div id="weather-page">
                        <div className="maincontainer">
                            <h1>Weather</h1>
                            <div className='box'>
                                <form className="form-h">
                                    <input
                                        type="text"
                                        id="search" placeholder="Search By Location"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                    <button onClick={handleWeather} className="getWeather">SUBMIT</button>
                                </form>
                            </div>

                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            {weatherData && (
                                <div className='Weather'>
                                    <WeatherCard weatherData={weatherData} />
                                </div>
                            )}
                            {weatherData === null && submitPress === true && (
                                <div className='Weather'>
                                    <p className='name'>Please enter proper Location details.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </>)}
        </>
    )
}
export default Weather;
