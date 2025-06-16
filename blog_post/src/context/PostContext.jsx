import React, { createContext, useContext, useState } from 'react';

const PostContext = createContext();

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};

const initialPosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    content: `
      <p>React is a powerful JavaScript library for building user interfaces. In this post, we'll explore the fundamentals of React and how to get started with your first application.</p>
      <h2>Key Concepts</h2>
      <ul>
        <li>Components</li>
        <li>Props</li>
        <li>State</li>
        <li>JSX</li>
      </ul>
      <p>Learn more about React at <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">reactjs.org</a></p>
    `,
    author: 'John Doe',
    date: '2023-01-01',
  },
  {
    id: '2',
    title: 'CSS Grid vs. Flexbox',
    content: `
      <p>Both CSS Grid and Flexbox are powerful layout systems, but they serve different purposes. Let's compare them and learn when to use each.</p>
      <h2>When to Use Grid</h2>
      <p>Grid is perfect for two-dimensional layouts where you need to control both rows and columns.</p>
      <h2>When to Use Flexbox</h2>
      <p>Flexbox is ideal for one-dimensional layouts, either rows or columns.</p>
    `,
    author: 'Jane Smith',
    date: '2023-02-15',
  },
  {
    id: '3',
    title: 'Accessibility in Web Development',
    content: `
      <p>Making your web applications accessible is not just good practice—it's essential. Here are some key tips for improving accessibility.</p>
      <h2>Key Principles</h2>
      <ul>
        <li>Semantic HTML</li>
        <li>ARIA attributes</li>
        <li>Keyboard navigation</li>
        <li>Color contrast</li>
      </ul>
    `,
    author: 'Mike Johnson',
    date: '2023-03-10',
  },
];

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(initialPosts);

  const addPost = (post) => {
    setPosts(prevPosts => [...prevPosts, { ...post, id: Date.now().toString() }]);
  };

  const updatePost = (id, updatedPost) => {
    setPosts(prevPosts =>
      prevPosts.map(post => (post.id === id ? { ...post, ...updatedPost } : post))
    );
  };

  const deletePost = (id) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
  };

  const getPost = (id) => {
    return posts.find(post => post.id === id);
  };

  return (
    <PostContext.Provider value={{ posts, addPost, updatePost, deletePost, getPost }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext; 