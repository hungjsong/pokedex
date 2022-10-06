import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPokemonEntry } from '../features/pokedex/pokedexSlice';
import { getPokedexEntry } from '../pokemon';

function PokedexEntry() {
  const dispatch = useDispatch();
  const pokedexEntry = useSelector((state: any) => state.pokedex.pokemonEntry);
  const [pokemonID, setPokemonID] = useState('bulbasaur');

  useEffect(() => {
    getPokedexEntry(pokemonID).then((pokedexEntry) => {
      dispatch(setPokemonEntry(pokedexEntry));
    });
  }, [pokemonID]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setPokemonID(event.target.pokemonID.value);
  };

  return (
    <div>
      <h1>Bulbasaur #001</h1>
      <p>Grass/Poison</p>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Pokemon Number or Name
          <input type="text" name="pokemonID" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </div>
  );
}

export default PokedexEntry;
