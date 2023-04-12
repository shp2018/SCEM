import React from 'react';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Signup from './routes/signup';
import Login from './routes/login';
import Home from './routes/home';
import ResetPassword from './routes/resetPw';
import ForgotPassword from './routes/forgot';
import Post from './routes/post'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
  <Router>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/login"  element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/forgotPassword" element={<ForgotPassword/>} />
      <Route path="/resetPassword" element={<ResetPassword/>} />
      <Route path="/post" element={<Post/>} />
      </Routes>
  </Router>
  );
}

export default App;