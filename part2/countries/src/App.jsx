import { useState, useEffect } from 'react';
import countryService from './services/countries';
import Country from './components/Country';

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

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
    filteredCountries.length === 1
      ? setSelectedCountry(filteredCountries[0])
      : setSelectedCountry(null);
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <>
      <label>Find countries: </label>
      <input value={search} onChange={handleSearch} />

      {selectedCountry || filteredCountries.length === 1 ? (
        <Country selectedCountry={selectedCountry} />
      ) : (
        <ul>
          {filteredCountries.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : (
            filteredCountries.map((country, index) => (
              <li key={country.cioc || index}>
                {country.name.common}
                <button onClick={() => handleShowCountry(country)}>show</button>
              </li>
            ))
          )}
        </ul>
      )}
    </>
  );
};

export default App;
