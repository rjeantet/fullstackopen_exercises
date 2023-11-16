import CommentForm from './CommentForm';

const Comments = ({ blog }) => {
  const addComment = (comment) => {
    blog.comments.push(comment);
  };

  return (
    <div>
      <h3>Comments</h3>
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
    </div>
  );
};

export default Comments;
