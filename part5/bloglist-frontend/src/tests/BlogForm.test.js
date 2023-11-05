import '@testing-library/jest-dom';
import { render, screen, prettyDOM } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from '../components/BlogForm';

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const inputTitle = screen.getByPlaceholderText('title');
  const inputAuthor = screen.getByPlaceholderText('author');
  const inputUrl = screen.getByPlaceholderText('url');
  const sendButton = screen.getByText('create');

  await user.type(inputTitle, 'new title...');
  await user.type(inputAuthor, 'new author...');
  await user.type(inputUrl, 'new url...');
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('new title...');
  expect(createBlog.mock.calls[0][0].author).toBe('new author...');
  expect(createBlog.mock.calls[0][0].url).toBe('new url...');
});
