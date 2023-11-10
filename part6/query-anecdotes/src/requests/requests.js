import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAll = () => {
  return axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export const createNew = (newAnecdote) => {
  return axios.post(baseUrl, newAnecdote).then((response) => response.data);
};

export const voteAnecdote = (anecdote) => {
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((response) => response.data);
};
