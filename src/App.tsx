import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { Header } from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
