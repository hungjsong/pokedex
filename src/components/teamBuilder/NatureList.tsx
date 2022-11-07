import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonNatures } from '../../API/pokemon';
import { setNature } from '../../redux/teamBuilderSlice';
import { PokemonNature } from '../../types/pokemonTypes';
import { capitalize } from '../../utilityFunctions';

type NatureListProps = {
  teamSlotNumber: number;
};

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
                  <span style={{ color: 'green' }}>
                    {'↑' + nature.increased_stat}
                  </span>
                ) : (
                  ''
                )}
                {nature.decreased_stat !== null ? (
                  <span style={{ color: 'red' }}>
                    {' ↓' + nature.decreased_stat}
                  </span>
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
