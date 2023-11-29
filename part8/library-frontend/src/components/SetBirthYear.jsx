import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries/queries';
import Select from 'react-select';

const SetBirthYear = ({ authors }) => {
  const [name, setName] = useState(null);
  const [setBornTo, setSetBornTo] = useState('');

  const options = authors.map((a) => {
    return { value: a.name, label: a.name };
  });

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    console.log('edit author...');
    await editAuthor({
      variables: { name, setBornTo },
    });
    setName('');
    setSetBornTo('');
  };

  const container = {
    maxWidth: '400px',
  };

  return (
    <>
      <h2>Set BirthYear</h2>
      <form onSubmit={submit}>
        <div style={container}>
          <Select
            defaultValue={name}
            onChange={(target) => setName(target.value)}
            options={options}
          />
        </div>

        <div>
          born
          <input
            type='number'
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(parseInt(target.value))}
          />
        </div>

        <button type='submit'>update author</button>
      </form>
    </>
  );
};

export default SetBirthYear;
