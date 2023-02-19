import { Routes, Route } from 'react-router-dom';
import CatchingSimulator from './components/catchingSimulator/CatchingSimulator';
import Home from './components/home/Home';
import PokedexEntry from './components/pokemonEntry/PokedexEntry';
import TeamBuilder from './components/teamBuilder/TeamBuilder';
import './App.css';
import Header from './components/Header';
import Login from './components/login/Login';
import SignUp from './components/signUp/SignUp';
import TeamSelect from './components/teamBuilder/TeamSelect';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PokedexEntry" element={<PokedexEntry />} />
        <Route path="/TeamBuilder" element={<TeamBuilder />} />
        <Route path="/TeamSelect" element={<TeamSelect />} />
        <Route path="/CatchingSimulator" element={<CatchingSimulator />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
