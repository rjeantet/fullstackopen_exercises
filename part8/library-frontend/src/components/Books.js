import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries/queries';
import { useEffect, useState } from 'react';

const Books = () => {
  const result = useQuery(ALL_BOOKS);
  const books = result.data?.allBooks;
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    console.log('Books data:', books);
    if (books && genres.length === 0) {
      const extractedGenres = Array.from(
        new Set(books.map((book) => book.genres).flat())
      );
      setGenres(extractedGenres);
    }
  }, [books]);

  if (result.loading) {
    return <div>loading...</div>;
  }
  const filteredBooks = selectedGenre
    ? books.filter((book) => book.genres.includes(selectedGenre))
    : books;
  console.log('filteredBooks', filteredBooks);
  console.log('genres', genres);

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
