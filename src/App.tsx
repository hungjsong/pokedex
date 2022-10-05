import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PokedexEntry from './pokedex/PokedexEntry';
import Home from './pokedex/Home';
import './App.css';

function App() {
  const { t } = useTranslation();
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
