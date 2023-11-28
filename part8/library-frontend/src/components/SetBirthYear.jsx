import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries/queries';

const SetBirthYear = () => {
  const [name, setName] = useState('');
  const [setBornTo, setSetBornTo] = useState('');

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
    setBornTo('');
  };

  return (
    <>
      <h2>Set BirthYear</h2>
      <form onSubmit={submit}>
        <div>
          name{' '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
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
