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

  let component;
  let header;
  let details;

  beforeEach(() => {
    component = render(<Blog blog={blog} />);
    header = component.container.querySelector('.blogHeader');
    details = component.container.querySelector('.blogDetails');
  });

  test('renders title and author', () => {
    expect(header).toHaveTextContent(
      'Component testing is done with react-testing-library, Stephen King'
    );

    console.log(prettyDOM(header));
  });

  test('URL and likes in details are hidden per default', () => {
    expect(details).toBeEmptyDOMElement();
  });

  test('URL and likes are shown when handleShowDetails button is clicked', async () => {
    const button = component.getByText('show');
    await userEvent.click(button);

    expect(details).toHaveTextContent('https://react.com/');
    expect(details).toHaveTextContent('likes 52');
  });
});
