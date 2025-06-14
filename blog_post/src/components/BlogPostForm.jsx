import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../context/PostContext';
import styles from './BlogPostForm.module.css';

const BlogPostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPost, addPost, updatePost } = usePosts();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const post = getPost(id);
      if (post) {
        setFormData({
          title: post.title,
          content: post.content,
          author: post.author,
          date: post.date
        });
      }
    }
  }, [id, getPost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (id) {
        await updatePost(id, {
          ...formData,
          date: new Date().toISOString()
        });
      } else {
        await addPost({
          ...formData,
          date: new Date().toISOString()
        });
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving post:', error);
      setError('Failed to save post. Please try again.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>{id ? 'Edit Post' : 'Create New Post'}</h1>
      
      {error && (
        <div className={styles.error} role="alert">
          {error}
        </div>
      )}

      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={() => navigate('/')}
          className={styles.cancelButton}
        >
          Back to List
        </button>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className={styles.previewButton}
        >
          {showPreview ? 'Edit' : 'Preview'}
        </button>
      </div>

      {showPreview ? (
        <article className={styles.preview}>
          <h1>{formData.title || 'Untitled Post'}</h1>
          <div className={styles.blogMeta}>
            <span>By {formData.author || 'Anonymous'}</span>
            <span>Draft</span>
          </div>
          <div
            className={styles.blogContent}
            dangerouslySetInnerHTML={{ __html: formData.content }}
          />
        </article>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <div className={styles.contentHeader}>
              <label htmlFor="content">Content</label>
            </div>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              className={styles.textarea}
              rows="10"
            />
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              {id ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BlogPostForm; 