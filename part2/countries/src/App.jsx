import { useState, useEffect } from 'react';
import countryService from './services/countries';
import Country from './components/Country';

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    console.log('fetching countries...');
    countryService.getAll().then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCountries(filteredCountries);
  };

  return (
    <>
      <label>Find countries: </label>
      <input value={search} onChange={handleSearch} />

      <ul>
        {filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length === 1 ? (
          <Country filteredCountries={filteredCountries} />
        ) : (
          filteredCountries.map((country, index) => (
            <li key={country.cioc || index}>{country.name.common}</li>
          ))
        )}
      </ul>
    </>
  );
};

export default App;
