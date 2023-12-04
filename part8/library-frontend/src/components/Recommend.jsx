import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ME, RECO_BOOKS } from '../queries/queries';
import BookTable from './BookTable';

const Recommend = () => {
  const resultBooks = useQuery(ALL_BOOKS);
  const resultUser = useQuery(ME);
  const [books, setBooks] = useState([]);
  const [favoriteGenre, setFavoriteGenre] = useState([]);

  useEffect(() => {
    if (resultBooks.data) {
      const books = resultBooks.data?.allBooks;
      setBooks(books);
    }
  }, [resultBooks.data]);

  useEffect(() => {
    if (resultUser.data) {
      setFavoriteGenre(resultUser.data.me.favoriteGenre);
      console.log('me', resultUser.data?.me);
    }
  }, [resultUser.data]);

  const filteredBooks = books.filter((book) =>
    book.genres.includes(favoriteGenre)
  );

  return (
    <>
      <h1>Recommendations</h1>
      <h3>Books in your favorite genre: {favoriteGenre}</h3>
      <BookTable filteredBooks={filteredBooks} />
    </>
  );
};

export default Recommend;
