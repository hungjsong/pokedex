import { Routes, Route } from 'react-router-dom';
import PokedexEntry from './components/pokemonEntry/PokedexEntry';
import TeamBuilder from './components/teamBuilder/TeamBuilder';
import Home from './components/home/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PokedexEntry" element={<PokedexEntry />} />
        <Route path="/TeamBuilder" element={<TeamBuilder />} />
      </Routes>
    </div>
  );
}

export default App;
