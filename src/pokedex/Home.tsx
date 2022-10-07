import { Link } from 'react-router-dom';
import React from 'react';

function Home() {
  return (
    <div>
      <h1>Pokedex</h1>
      <nav>
        <Link to="/PokedexEntry">View Pokedex Entries</Link>
      </nav>
    </div>
  );
}

export default Home;
