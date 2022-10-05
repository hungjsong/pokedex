import { Link } from 'react-router-dom';

function PokedexEntry() {
  return (
    <div>
      <h1>Bulbasaur #001</h1>
      <p>Grass/Poison</p>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </div>
  );
}

export default PokedexEntry;
