import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  setPokemonEntry,
  setSpeciesDetails,
} from '../features/pokedex/pokedexSlice';
import { getPokedexEntry, getSpeciesDetails } from '../API/pokemon';
import { capitalize, getPokemonTypes } from '../utilityFunctions';

function PokedexEntry() {
  const dispatch = useDispatch();
  const [pokemonID, setPokemonID] = useState(1);
  const pokedexEntry = useSelector((state: any) => state.pokedex.pokemonEntry);
  const speciesDetails = useSelector(
    (state: any) => state.pokedex.speciesDetails
  );

  useEffect(() => {
    getSpeciesDetails(pokemonID).then((speciesDetails) => {
      dispatch(setSpeciesDetails(speciesDetails));
    });

    getPokedexEntry(pokemonID).then((pokedexEntry) => {
      dispatch(setPokemonEntry(pokedexEntry));
    });
  }, [pokemonID]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setPokemonID(event.target.pokemonID.value);
  };

  if (pokedexEntry.name === undefined || speciesDetails.genera === undefined) {
    return <h1></h1>;
  }

  return (
    <div>
      <>
        <h1>
          {capitalize(pokedexEntry.name)} #{('00' + pokedexEntry.id).slice(-3)}
        </h1>
        <h3>{speciesDetails.genera[7].genus}</h3>
      </>
      <>
        <img
          src={
            pokedexEntry.sprites === undefined
              ? 'https://archives.bulbagarden.net/media/upload/8/8e/Spr_3r_000.png'
              : pokedexEntry.sprites.front_default
          }
          height="10%"
          width="10%"
        />
      </>
      <>
        <h3>Type</h3>
        {<p>{getPokemonTypes(pokedexEntry.types)}</p>}
      </>
      <>
        <h3>Height/Weight</h3>
        {(pokedexEntry.height * 0.1).toFixed(1) + 'm'}{' '}
        {(pokedexEntry.weight * 0.1).toFixed(1) + 'kg'}
      </>
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
