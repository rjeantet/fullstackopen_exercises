import { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  // Get data from server
  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
      console.log('initial phonebook:', response.data);
    });
  }, []);

  // Add new person and store in server
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    // Check if not already in phonebook
    const personAdded = persons.find(
      (person) => person.name.toLowerCase() === newName
    );

    // if already in phonebook, ask if we update number
    if (personAdded) {
      const updateNumber = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      // If user says yes, update number
      if (updateNumber) {
        const id = personAdded.id;
        personService.update(id, personObject).then((response) => {
          setPersons(
            persons.map((person) => (person.id !== id ? person : response.data))
          );
        });
        alert(`${newName}'s number updated`);
      }

      // If user says no, cancel update
      else {
        alert('Update cancelled');
      }

      // If not in phonebook, add new person and post to server
    } else {
      setPersons([...persons, personObject]);
      personService.create(personObject).then((response) => {
        console.log('New person added:', response.data);
      });
    }
    setNewName('');
    setNewNumber('');
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

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      `Delete ${persons.find((person) => person.id === id).name}?`
    );
    confirmDelete
      ? personService.remove(id).then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          alert(
            `${
              persons.find((person) => person.id === id).name
            } deleted from phonebook`
          );
        })
      : alert('Delete cancelled');
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
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
