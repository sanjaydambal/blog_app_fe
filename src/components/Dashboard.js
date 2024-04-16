import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    content: '',
    author: ''
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://blog-app-be-vsoy.onrender.com/blogs');
      setPosts(response.data);
    } catch (error) {
      console.error('Error:', error.response.data.message);
      // Show error message
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Generate timestamp
      const timestamp = new Date().toISOString();

      // Update formData with the generated timestamp
      const updatedFormData = { ...formData, timestamp };

      // Send the post request with updatedFormData
      const response = await axios.post('https://blog-app-be-vsoy.onrender.com/blogs', updatedFormData);
      console.log(response.data);
      fetchPosts(); // Fetch posts again to update the list

      // Clear form data
      setFormData({ title: '', content: '', author: '' });
    } catch (error) {
      console.error('Error:', error.response.data.message);
      // Show error message
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`https://blog-app-be-vsoy.onrender.com/blogs/${postId}`);
      fetchPosts(); // Fetch posts again to update the list
    } catch (error) {
      console.error('Error:', error.response.data.message);
      // Show error message
    }
  };

  const handleEdit = (postId) => {
    const postToEdit = posts.find(post => post.id === postId);
    setEditPostId(postId);
    setEditFormData(postToEdit);
  };

  const handleUpdate = async () => {
    try {
      // Generate timestamp
      const timestamp = new Date().toISOString();
  
      // Update editFormData with the new timestamp
      const updatedEditFormData = { ...editFormData, timestamp };
  
      // Send the update request with updatedEditFormData
      const response = await axios.put(`https://blog-app-be-vsoy.onrender.com/blogs/${editPostId}`, updatedEditFormData);
      console.log(response.data);
      fetchPosts(); // Fetch posts again to update the list
      setEditPostId(null); // Reset edit state
    } catch (error) {
      console.error('Error:', error.response.data.message);
      // Show error message
    }
  };
  

  const handleCancelEdit = () => {
    setEditPostId(null);
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container py-4">
      <h2>Create a Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" name="title" className="form-control" id="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea name="content" className="form-control" id="content" value={formData.content} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input type="text" name="author" className="form-control" id="author" value={formData.author} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <h2 className="mt-4">Blog Posts</h2>
      <div>
        {posts.map(post => (
          <div key={post.id} className="card my-3">
            <div className="card-body">
              {editPostId === post.id ? (
                <div>
                  <input type="text" name="title" className="form-control mb-3" value={editFormData.title} onChange={handleEditChange} />
                  <textarea name="content" className="form-control mb-3" value={editFormData.content} onChange={handleEditChange}></textarea>
                  <input type="text" name="author" className="form-control mb-3" value={editFormData.author} onChange={handleEditChange} />
                  <button onClick={handleUpdate} className="btn btn-primary me-2">Update</button>
                  <button onClick={handleCancelEdit} className="btn btn-secondary">Cancel</button>
                </div>
              ) : (
                <div>
                  <h3 className="card-title">{post.title}</h3>
                  <p className="card-text">{post.content}</p>
                  <p className="card-text">Author: {post.author}</p>
                  <p className="card-text">Posted: {formatDate(post.timestamp)}</p>
                  <button onClick={() => handleDelete(post.id)} className="btn btn-danger me-2">Delete</button>
                  <button onClick={() => handleEdit(post.id)} className="btn btn-primary">Edit</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
