import Blog from './Blog';
import blogService from '../services/blogs';
import NotificationContext from '../context/NotificationContext';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const BlogList = () => {
  const { user } = useContext(AuthContext);

  const queryClient = useQueryClient();
  const notification = useContext(NotificationContext);

  const likeBlogMutation = useMutation({
    mutationFn: (blog) =>
      blogService.update(blog.id, { likes: blog.likes + 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
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
    },
    onError: () => {
      notification.setError('Unauthorized to delete this blog');
    },
  });
  const handleDelete = (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog);
    }
  };

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  });
  const blogs = result.data;

  if (result.isError) {
    return <div>Blog service not available due to problems in server</div>;
  }
  if (result.isPending) {
    return <div>no blogs available</div>;
  }

  return (
    <>
      <br></br>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLikes={() => handleLikes(blog)}
            handleDelete={() => handleDelete(blog.id)}
          />
        ))}
    </>
  );
};

export default BlogList;
