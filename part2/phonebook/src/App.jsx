import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const serverURL = 'http://localhost:3001/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  // Get data from server
  useEffect(() => {
    axios.get(serverURL).then((response) => {
      setPersons(response.data);
      console.log('promise fulfilled:', response.data);
    });
  }, []);

  // Add new person and store in server
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    // Check if not already in phonebookm then add a new person
    const personAdded = persons.find((person) => person.name === newName);
    personAdded
      ? alert(`${newName} is already added to phonebook`)
      : setPersons([...persons, personObject]);
    setNewName('');
    setNewNumber('');

    // Post new person to server
    axios
      .post('http://localhost:3001/persons', personObject)
      .then((response) => {
        console.log(response);
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />

      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
