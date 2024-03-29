import { useDispatch } from 'react-redux';
import { useState, useEffect, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { getPokedexEntry, getSpeciesDetails } from '../../API/pokemon';
import {
  capitalize,
  getEnglishGenera,
  getPokemonTypes,
} from '../../utilityFunctions';
import Loader from '../common/Loader';
import { setPokemonEntry, setSpeciesDetails } from '../../redux/pokedexSlice';
import { useAppSelector } from '../../hooks';

const ErrorMessage = styled.p`
  color: red;
`;

function PokedexEntry() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [pokemonID, setPokemonID] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const { pokemonEntry: pokedexEntry, speciesDetails } = useAppSelector(
    (state) => state.pokedex
  );

  useEffect(() => {
    getSpeciesDetails(pokemonID).then((speciesDetails) => {
      if (speciesDetails === undefined) {
        setErrorMessage(t('pokedexEntryNotFound'));
      } else {
        setErrorMessage('');
        dispatch(setSpeciesDetails(speciesDetails));

        getPokedexEntry(pokemonID).then((pokedexEntry) => {
          dispatch(setPokemonEntry(pokedexEntry));
        });
      }
    });
  }, [pokemonID]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let pokemonID = event.currentTarget.pokemonID.value;
    if (typeof pokemonID === 'string') {
      pokemonID = pokemonID.toLowerCase();
    }

    if (pokemonID === '') {
      setErrorMessage(t('emptyPokedexInput'));
    } else {
      setPokemonID(pokemonID);
    }
  };

  if (pokedexEntry === null || speciesDetails === null) {
    return <Loader />;
  }

  const { name, id, sprites, types, height, weight } = pokedexEntry;

  return (
    <div>
      <h1>
        {capitalize(name)} #{`00${id}`.slice(-3)}
      </h1>
      <h3>{getEnglishGenera(speciesDetails).genus}</h3>
      <img
        src={
          sprites === undefined
            ? 'https://archives.bulbagarden.net/media/upload/8/8e/Spr_3r_000.png'
            : sprites.other['official-artwork'].front_default
        }
        height="10%"
        width="10%"
      />
      <h3>{t('type')}</h3>
      <p>{getPokemonTypes(types)}</p>
      <h3>{t('biometrics')}</h3>
      {`${(height * 0.1).toFixed(1)} m 
          ${(weight * 0.1).toFixed(1)} kg`}
      {errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <label>
          {t('inputPrompt')}
          <input type="text" name="pokemonID" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default PokedexEntry;
