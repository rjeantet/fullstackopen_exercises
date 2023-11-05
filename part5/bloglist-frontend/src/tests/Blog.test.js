import '@testing-library/jest-dom';
import { render, screen, prettyDOM } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';

describe('Render blog', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Stephen King',
    url: 'https://react.com/',
    likes: 52,
  };

  test('renders title and author', () => {
    const { container } = render(<Blog blog={blog} />);

    const div = container.querySelector('.blogHeader');
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library, Stephen King'
    );

    console.log(prettyDOM(div));
  });

  test('URL and likes in details are hidden per default', () => {
    const { container } = render(<Blog blog={blog} />);

    const div = container.querySelector('.blogDetails');
    expect(div).toBeEmptyDOMElement();
  });
});
