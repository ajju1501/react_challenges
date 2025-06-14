import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogPostList from './components/BlogPostList';
import BlogPostDetail from './components/BlogPostDetail';
import BlogPostForm from './components/BlogPostForm';
import { PostProvider } from './context/PostContext';
import './App.css';

function App() {
  return (
    <PostProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<BlogPostList />} />
            <Route path="/post/:id" element={<BlogPostDetail />} />
            <Route path="/create" element={<BlogPostForm />} />
            <Route path="/edit/:id" element={<BlogPostForm />} />
          </Routes>
        </div>
      </Router>
    </PostProvider>
  );
}

export default App;
