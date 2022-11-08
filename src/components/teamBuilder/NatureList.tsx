import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { capitalize } from '../../utilityFunctions';
import { getPokemonNatures } from '../../API/pokemon';
import { PokemonNature } from '../../types/pokemonTypes';
import { setNature } from '../../redux/teamBuilderSlice';

type NatureListProps = {
  teamSlotNumber: number;
};

const IncreasedStat = styled.span`
  color: green;
`;

const DecreasedStat = styled.span`
  color: red;
`;

function NatureList(props: NatureListProps) {
  const [pokemonNatures, setPokemonNatures] = useState<PokemonNature[]>([]);
  const [displayList, setDisplayList] = useState(false);
  const [inputNature, setInputNature] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    getPokemonNatures().then((response) => {
      setPokemonNatures(response.payload);
    });
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInputNature(event.target.value);
  }

  function displayListOfNatures(slotNumber: number) {
    return (
      <ul>
        {pokemonNatures
          .filter((nature) =>
            nature.name.toLowerCase().includes(inputNature.toLowerCase())
          )
          .map((nature) => (
            <>
              <li
                key={nature.name}
                onMouseDown={() => {
                  dispatch(
                    setNature({
                      nature: nature.name,
                      teamSlotNumber: slotNumber,
                    })
                  );
                  setInputNature(nature.name);
                }}
              >
                {capitalize(nature.name) + ' ('}
                {nature.increased_stat !== null ? (
                  <IncreasedStat>{'↑' + nature.increased_stat}</IncreasedStat>
                ) : (
                  ''
                )}
                {nature.decreased_stat !== null ? (
                  <DecreasedStat>{' ↓' + nature.decreased_stat}</DecreasedStat>
                ) : (
                  'No Effect'
                )}
                {')'}
              </li>
            </>
          ))}
      </ul>
    );
  }

  return (
    <>
      <input
        type="search"
        autoComplete="off"
        placeholder="Nature"
        value={inputNature}
        onFocus={() => {
          setDisplayList(true);
        }}
        onBlur={() => {
          setDisplayList(false);
        }}
        onChange={handleChange}
      />
      {displayList && displayListOfNatures(props.teamSlotNumber)}
    </>
  );
}

export default NatureList;
