import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PokedexEntry from './pokedex/PokedexEntry';
import Home from './pokedex/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PokedexEntry" element={<PokedexEntry />} />
      </Routes>
    </div>
  );
}

export default App;
