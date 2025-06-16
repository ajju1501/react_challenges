import React from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../context/PostContext';
import styles from './BlogPostList.module.css';

const BlogPostList = () => {
  const { posts } = usePosts();

  return (
    <div className="container">
      <div className="button-group navigation">
        <h1>Blog Posts</h1>
        <Link to="/create" className="btn btn-primary">
          Create New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="blog-detail">
          <p>No blog posts yet. Create your first post!</p>
        </div>
      ) : (
        <div className="blog-list">
          {posts.map((post) => (
            <article key={post.id} className="blog-card">
              <h2>{post.title}</h2>
              <div className="blog-meta">
                <span>By {post.author}</span>
                <span>Posted on {new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{
                  __html: post.content.substring(0, 200) + "...",
                }}
              />
              <div className="button-group actions">
                <Link to={`/post/${post.id}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPostList;
