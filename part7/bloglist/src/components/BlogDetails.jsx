import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Header from './Header';
import Notification from './Notification';
import Comments from './Comments';
import blogService from '../services/blogs';
import AuthContext from '../context/AuthContext';
import NotificationContext from '../context/NotificationContext';

const Blog = () => {
  const id = useParams().id;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const notification = useContext(NotificationContext);

  const likeBlogMutation = useMutation({
    mutationFn: (blog) =>
      blogService.update(blog.id, { likes: blog.likes + 1 }),
    onSuccess: (blog) => {
      setBlog(blog);
      queryClient.invalidateQueries({
        queryKey: ['blogs'],
      });
    },
    onError: (error) => {
      notification.setError(error.response.data.error);
    },
  });
  const handleLikes = (blog) => {
    likeBlogMutation.mutate(blog);
  };

  const deleteBlogMutation = useMutation({
    mutationFn: (blog) => blogService.remove(blog.id),
    onSuccess: (id, blog) => {
      queryClient.invalidateQueries({
        queryKey: ['blogs'],
      });
      notification.setNotification(
        `Blog ${blog.title} by ${blog.author} deleted`
      );
      navigate('/');
    },
    onError: () => {
      notification.setError('Unauthorized to delete this blog');
    },
  });
  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog);
    }
  };

  const result = useQuery({
    queryKey: ['blogs', id],
    queryFn: () => blogService.getById(id),
  });

  const blog = result.data;

  if (result.isError) {
    return <div>Blog service not available due to problems in server</div>;
  }
  if (result.isPending) {
    return <div>Blog not available</div>;
  }

  return (
    <>
      <Header />
      <Notification />
      <div className='blog'>
        <div className='blogHeader'>
          <h1>
            {blog.title}, {blog.author}
          </h1>
        </div>
        <div className='blogDetails'>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            {blog.likes} likes
            <button id='like-button' onClick={() => handleLikes(blog)}>
              like
            </button>
          </div>
          <div>Added by {blog.user ? `${blog.user.name}` : ''}</div>
          <div>
            {blog.user && user.username === `${blog.user.username}` ? (
              <button id='remove-button' onClick={() => handleDelete(blog.id)}>
                remove
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <Comments blog={blog} />
    </>
  );
};

export default Blog;
