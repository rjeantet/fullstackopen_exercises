import countryService from '../services/countries';
import { useState, useEffect } from 'react';
import weatherService from '../services/weather';

const Country = ({ selectedCountry }) => {
  const [countryDetails, setCountryDetails] = useState({
    name: { common: '' },
    capital: '',
    area: 0,
    languages: [],
    flags: { png: '' },
    latlng: [],
  });
  const [weather, setWeather] = useState({
    main: { temp: 0 },
    wind: { speed: 0, deg: 0 },
    weather: [{ icon: '' }],
  });

  useEffect(() => {
    const name = selectedCountry.name.common;
    countryService.getCountry(name).then((response) => {
      setCountryDetails(response.data);
      console.log('country details:', response.data);
    });
  }, [selectedCountry]);

  useEffect(() => {
    if (countryDetails.latlng.length === 2) {
      const lat = countryDetails.latlng[0];
      console.log(countryDetails.latlng[0]);
      const long = countryDetails.latlng[1];
      weatherService.getWeather(lat, long).then((response) => {
        console.log('weather:', response.data);
        setWeather(response.data);
      });
    }
  }, [countryDetails]);

  return (
    <>
      <h2>{countryDetails.name.common}</h2>
      <div>capital {countryDetails.capital}</div>
      <div>area {countryDetails.area}</div>
      <h3>languages</h3>
      <ul>
        {Object.values(countryDetails.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <p>
        <img
          src={countryDetails.flags.png}
          alt={`${countryDetails.name.common} flag`}
          width='200'
        />
      </p>
      <h3>Weather in {countryDetails.capital}</h3>
      <p>
        temperature:
        <span>{weather.main.temp} </span> Celsius
      </p>
      <p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt='weather icon'
        />
      </p>
      <p>
        wind:
        <span>{weather.wind.speed} </span> m/s
      </p>
    </>
  );
};

export default Country;
