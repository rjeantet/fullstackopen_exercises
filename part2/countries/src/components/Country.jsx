import countryService from '../services/countries';
import { useState, useEffect } from 'react';

const Country = ({ selectedCountry }) => {
  const [countryDetails, setCountryDetails] = useState({
    name: { common: '' },
    capital: '',
    area: 0,
    languages: [],
    flags: { png: '' },
  });

  useEffect(() => {
    const name = selectedCountry.name.common;
    countryService.getCountry(name).then((response) => {
      setCountryDetails(response.data);
      console.log('country details:', response.data);
    });
  }, []);

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
    </>
  );
};

export default Country;
