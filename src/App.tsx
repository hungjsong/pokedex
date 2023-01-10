import { Routes, Route } from 'react-router-dom';
import CatchingSimulator from './components/catchingSimulator/CatchingSimulator';
import Home from './components/home/Home';
import PokedexEntry from './components/pokemonEntry/PokedexEntry';
import TeamBuilder from './components/teamBuilder/TeamBuilder';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PokedexEntry" element={<PokedexEntry />} />
        <Route path="/TeamBuilder" element={<TeamBuilder />} />
        <Route path="/CatchingSimulator" element={<CatchingSimulator />} />
      </Routes>
    </div>
  );
}

export default App;
