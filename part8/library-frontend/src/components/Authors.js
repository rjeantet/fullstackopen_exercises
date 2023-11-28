import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries/queries';
import SetBirthYear from './SetBirthYear';

const Authors = () => {
  const result = useQuery(ALL_AUTHORS);
  const authors = result.data?.allAuthors;

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirthYear authors={authors} />
    </div>
  );
};

export default Authors;
