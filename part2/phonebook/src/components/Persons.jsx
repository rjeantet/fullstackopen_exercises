import Person from './Person';

const Persons = ({ filteredPersons }) => {
  return (
    <div>
      {filteredPersons.map((person, index) => (
        <Person key={index} person={person} />
      ))}
    </div>
  );
};

export default Persons;
