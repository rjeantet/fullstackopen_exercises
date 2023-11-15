import { Link } from 'react-router-dom';
import blogService from '../services/blogs';
import { useQuery } from '@tanstack/react-query';

const BlogList = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  });
  const blogs = result.data;

  const blogStyle = {
    padding: 10,
    margin: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10,
  };

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
          <div style={blogStyle} className='blog' key={blog.id}>
            <Link to={`blogs/${blog.id}`}>
              {blog.title}, {blog.author}
            </Link>
          </div>
        ))}
    </>
  );
};

export default BlogList;
