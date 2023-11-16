import { Link } from 'react-router-dom';
import blogService from '../services/blogs';
import { useQuery } from '@tanstack/react-query';
import { Typography, Divider, Box } from '@mui/material';

const BlogList = () => {
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
      <Typography variant='h6' gutterBottom>
        Blogs
      </Typography>
      <Divider />
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div className='blog' key={blog.id}>
            <Box
              sx={{
                mt: 1,
                typography: 'body1',
                backgroundColor: '#f8f8f8',
                p: 2,
              }}
            >
              <Link to={`blogs/${blog.id}`}>
                {blog.title}, {blog.author}
              </Link>
            </Box>
          </div>
        ))}
    </>
  );
};

export default BlogList;
