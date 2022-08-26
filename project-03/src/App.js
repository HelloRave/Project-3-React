import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { UserProvider } from './context/UserContext';

import UserLogin from './UserLogin';

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <UserLogin />
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
