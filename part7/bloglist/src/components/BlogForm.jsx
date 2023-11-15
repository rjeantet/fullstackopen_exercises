import { useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';
import NotificationContext from '../context/NotificationContext';
import { useContext } from 'react';

const BlogForm = () => {
  const queryClient = useQueryClient();
  const notification = useContext(NotificationContext);

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (blog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      notification.setNotification(
        `a new blog ${blog.title} by ${blog.author} added`
      );
    },
    onError: (error) => {
      notification.setError('Title and url are mandatory');
    },
  });

  const addBlog = (event) => {
    event.preventDefault();
    const blog = event.target.value;
    event.target.value = '';
    newBlogMutation.mutate({
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0,
    });
  };

  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input id='title' name='title' placeholder='title' />
        </div>
        <div>
          author:
          <input id='author' name='author' placeholder='author' />
        </div>
        <div>
          url:
          <input id='url' name='url' placeholder='url' />
        </div>
        <div>
          <button id='newblog-button' type='submit'>
            create
          </button>
        </div>
      </form>
    </>
  );
};

export default BlogForm;
