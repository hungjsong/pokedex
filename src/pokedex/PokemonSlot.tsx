import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PokemonList from './PokemonList';
import { capitalize } from '../utilityFunctions';
import EVSlider from './EVSlider';
import { getPokemonNatures } from '../API/pokemon';
import { PokemonNature } from '../types/pokemonTypes';
import { setNature } from '../redux/teamBuilderSlice';

function PokemonSlot(props: any) {
  const dispatch = useDispatch();
  const [pokemonNatures, setPokemonNatures] = useState<PokemonNature[]>([]);
  const [inputNature, setInputNature] = useState('');
  const [displayList, setDisplayList] = useState(false);
  const [remainingEVs, setRemainingEVs] = useState(510);
  const [hpEV, setHPEV] = useState(0);
  const [atkEV, setAtkEV] = useState(0);
  const [defEV, setDefEV] = useState(0);
  const [spAtkEV, setSpAtkEV] = useState(0);
  const [spDefEV, setSpDefEV] = useState(0);
  const [spdEV, setSpdEV] = useState(0);
  //const team = useSelector((state: any) => state.teamBuilder.team);

  useEffect(() => {
    getPokemonNatures().then((response) => {
      setPokemonNatures(response.payload);
    });
  }, []);

  function handleChange(event: any) {
    setInputNature(event.target.value);
  }

  function displayListOfNatures(slotNumber: number) {
    return (
      <ul>
        {pokemonNatures
          .filter((nature: any) => nature.name.includes(inputNature))
          .map((nature: any) => (
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
                {capitalize(nature.name)}
              </li>
            </>
          ))}
      </ul>
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
      <h4>HP</h4>
      <EVSlider
        evStatType={hpEV}
        setEV={setHPEV}
        evName={'hp'}
        remainingEVs={remainingEVs}
        setRemainingEVs={setRemainingEVs}
      />
      <h4>Attack</h4>
      <EVSlider
        evStatType={atkEV}
        setEV={setAtkEV}
        evName={'atk'}
        remainingEVs={remainingEVs}
        setRemainingEVs={setRemainingEVs}
      />
      <h4>Defence</h4>
      <EVSlider
        evStatType={defEV}
        setEV={setDefEV}
        evName={'def'}
        remainingEVs={remainingEVs}
        setRemainingEVs={setRemainingEVs}
      />
      <h4>Special Attack</h4>
      <EVSlider
        evStatType={spAtkEV}
        setEV={setSpAtkEV}
        evName={'spAtk'}
        remainingEVs={remainingEVs}
        setRemainingEVs={setRemainingEVs}
      />
      <h4>Special Defence</h4>
      <EVSlider
        evStatType={spDefEV}
        setEV={setSpDefEV}
        evName={'spDef'}
        remainingEVs={remainingEVs}
        setRemainingEVs={setRemainingEVs}
      />
      <h4>Speed</h4>
      <EVSlider
        evStatType={spdEV}
        setEV={setSpdEV}
        evName={'spd'}
        remainingEVs={remainingEVs}
        setRemainingEVs={setRemainingEVs}
      />
    </>
  );
}

export default PokemonSlot;
