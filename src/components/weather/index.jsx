import React, { useEffect, useState } from "react";
import classes from "./index.module.css";
import logo from "../../assets/logo.png";

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, seterror] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=090d5ff04e718441ee4075ca9a5fb79b`;

  const searchLocation = async (e) => {
    if (e.key === "Enter") {
      await fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("No city found");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          console.log(data);
          setLocation("");
          seterror(null);
        })
        .catch((err) => {
          seterror(err);
          setData({});
        });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.search}>
        <input
          id="search"
          value={location}
          type="text"
          onKeyPress={searchLocation}
          onChange={(event) => {
            setLocation(event.target.value);
          }}
          placeholder="Location"
        />
      </div>

      {error ? <p className={classes.error}>{error.message}</p> : null}

      {!error && !data.name ? (
        <div className={classes.home}>
          <img src={logo} alt="logo" />
          <p className={classes.start}>Please enter a city name</p>
        </div>
      ) : null}

      <div className={classes.section}>
        <div className={classes.top}>
          {data.name ? (
            <div className={classes.location}>
              <p>{data.name}</p>
            </div>
          ) : null}

          {data.main ? (
            <div className={classes.temp}>
              <h1>{data.main.temp.toFixed()}°F</h1>
            </div>
          ) : null}

          {data.weather ? (
            <div className={classes.description}>
              <p>{data.weather[0].description}</p>
            </div>
          ) : null}
        </div>

        {data.main ? (
          <div className={classes.bottom}>
            <div className={classes.feels}>
              <p>{data.main.feels_like}°F</p>
              <p>Feels Like</p>
            </div>

            <div className={classes.humidity}>
              <p>{data.main.humidity}%</p>
              <p>Humidity</p>
            </div>

            <div className={classes.wind}>
              <p>{data.wind.speed} MPH</p>
              <p>Wind speed</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Weather;
