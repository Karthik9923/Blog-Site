import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import PostDetailPage from './components/PostDetailPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import CreatePostPage from './components/CreatePostPage';
import UpdatePostPage from './components/UpdatePostPage';
import Navbar from './components/Navbar';
import DeletePost from './components/DeletePost'; 
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create" element={<CreatePostPage/>} />
        <Route path="/update/:id" element={<UpdatePostPage/>}/>
        <Route path="/delete/:id" element={<DeletePost/>} />
      </Routes>
    </Router>
  );
}

export default App;
