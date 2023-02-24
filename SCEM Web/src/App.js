import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Signup from './routes/signup';
import Login from './routes/login';
import Home from './routes/home';
import ResetPassword from './routes/resetPw';
import ForgotPassword from './routes/forgot';

function App() {
  return (
  <Router>
    <Routes>
      <Route exact path="/" exact element={<Home />} />
      <Route path="/login"  element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/forgotPassword" element={<ForgotPassword/>} />
      <Route path="/resetPassword" element={<ResetPassword/>} />
      </Routes>
  </Router>
  );
}

export default App;