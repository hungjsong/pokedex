import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PokemonList from './PokemonList';
import { capitalize } from '../../utilityFunctions';
import EVSlider from './EVSlider';
import { getPokemonNatures } from '../../API/pokemon';
import { PokemonNature } from '../../types/pokemonTypes';
import { setNature } from '../../redux/teamBuilderSlice';
import PokemonMove from './PokemonMove';

type PokemonSlotProps = {
  slotNumber: number;
};

function PokemonSlot(props: PokemonSlotProps) {
  const dispatch = useDispatch();
  const [pokemonNatures, setPokemonNatures] = useState<PokemonNature[]>([]);
  const [inputNature, setInputNature] = useState('');
  const [displayList, setDisplayList] = useState(false);
  const [hpEV, setHPEV] = useState(0);
  const [atkEV, setAtkEV] = useState(0);
  const [defEV, setDefEV] = useState(0);
  const [spAtkEV, setSpAtkEV] = useState(0);
  const [spDefEV, setSpDefEV] = useState(0);
  const [spdEV, setSpdEV] = useState(0);

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
                      slotNumber: slotNumber,
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

  function displayEVSliders() {
    return (
      <>
        <h4>HP</h4>
        <EVSlider evStatType={hpEV} setEV={setHPEV} evName={'hp'} />
        <h4>Attack</h4>
        <EVSlider evStatType={atkEV} setEV={setAtkEV} evName={'atk'} />
        <h4>Defence</h4>
        <EVSlider evStatType={defEV} setEV={setDefEV} evName={'def'} />
        <h4>Special Attack</h4>
        <EVSlider evStatType={spAtkEV} setEV={setSpAtkEV} evName={'spAtk'} />
        <h4>Special Defence</h4>
        <EVSlider evStatType={spDefEV} setEV={setSpDefEV} evName={'spDef'} />
        <h4>Speed</h4>
        <EVSlider evStatType={spdEV} setEV={setSpdEV} evName={'spd'} />
      </>
    );
  }

  return (
    <>
      <PokemonList slotNumber={props.slotNumber} />
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
        onKeyUp={(event) => {
          setNature((event.target as HTMLInputElement).value.toLowerCase());
        }}
      />
      {displayList && displayListOfNatures(props.slotNumber)}
      {displayEVSliders()}
      <PokemonMove />
    </>
  );
}

export default PokemonSlot;
