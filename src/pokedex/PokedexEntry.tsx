import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadPokemonDetails } from '../features/pokedex/pokedexSlice';

function PokedexEntry() {
  const dispatch = useDispatch();
  const [pokemonID, setPokemonID] = useState(1);

  const handleChange = (event: any) => {
    setPokemonID(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(loadPokemonDetails(pokemonID));
  };

  return (
    <div>
      <h1>Bulbasaur #001</h1>
      <p>Grass/Poison</p>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Pokemon Number or Name
          <input type="text" name="pokemonID" onChange={handleChange} />
        </label>
      </form>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </div>
  );
}

export default PokedexEntry;
