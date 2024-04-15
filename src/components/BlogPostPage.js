import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPostPage = () => {
  const { id } = useParams();

  return (
    <div className="container">
      <h2>Blog Post {id}</h2>
      {/* Display full content of the blog post with id */}
    </div>
  );
};

export default BlogPostPage;
