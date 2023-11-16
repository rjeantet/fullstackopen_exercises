import CommentForm from './CommentForm';
import { Typography, Box } from '@mui/material';

const Comments = ({ blog }) => {
  const addComment = (comment) => {
    blog.comments.push(comment);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant='h6' gutterBottom>
        Comments
      </Typography>
      <CommentForm blog={blog} onAddComment={addComment} />
      <ul>
        {blog.comments && blog.comments.length > 0 ? (
          blog.comments.map((comment) => (
            <li key={comment.id}>{comment.comment}</li>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </ul>
    </Box>
  );
};

export default Comments;
