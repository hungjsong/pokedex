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
  const { teamSlotNumber } = props;

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
          .map((nature) => {
            const { decreased_stat, increased_stat, name } = nature;
            return (
              <li
                key={name}
                onMouseDown={() => {
                  dispatch(
                    setNature({
                      nature: name,
                      teamSlotNumber: slotNumber,
                    })
                  );
                  setInputNature(name);
                }}
              >
                {capitalize(name) + ' ('}
                {increased_stat !== null ? (
                  <IncreasedStat>{`↑ ${increased_stat}`}</IncreasedStat>
                ) : (
                  ''
                )}
                {decreased_stat !== null ? (
                  <DecreasedStat>{` ↓ ${decreased_stat}`}</DecreasedStat>
                ) : (
                  'No Effect'
                )}
                {')'}
              </li>
            );
          })}
      </ul>
    );
  }

  return (
    <div>
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
      {displayList && displayListOfNatures(teamSlotNumber)}
    </div>
  );
}

export default NatureList;
