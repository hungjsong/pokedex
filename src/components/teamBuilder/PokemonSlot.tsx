import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PokemonList from './PokemonList';
import { capitalize } from '../../utilityFunctions';
import EVSlider from './EVSlider';
import { getPokemonNatures, getSpeciesDetails } from '../../API/pokemon';
import { PokemonNature } from '../../types/pokemonTypes';
import {
  setGender,
  setLevel,
  setNature,
  setShiny,
} from '../../redux/teamBuilderSlice';
import PokemonMove from './PokemonMove';
import { useAppSelector } from '../../hooks';
import Loader from '../common/Loader';

type PokemonSlotProps = {
  slotNumber: number;
};

function PokemonSlot(props: PokemonSlotProps) {
  const dispatch = useDispatch();
  const [pokemonNatures, setPokemonNatures] = useState<PokemonNature[]>([]);
  const [inputNature, setInputNature] = useState('');
  const [displayList, setDisplayList] = useState(false);
  const team = useAppSelector((state) => state.teamBuilder.team);
  const hpEV = team[props.slotNumber].ev!.hp;
  const atkEV = team[props.slotNumber].ev!.atk;
  const defEV = team[props.slotNumber].ev!.def;
  const spAtkEV = team[props.slotNumber].ev!.spAtk;
  const spDefEV = team[props.slotNumber].ev!.spDef;
  const spdEV = team[props.slotNumber].ev!.spd;
  const selectedMoves = team[props.slotNumber].moves;
  const isShiny = team[props.slotNumber].shiny;
  const gender = team[props.slotNumber].gender;
  const level = team[props.slotNumber].level;
  const [genderRate, setGenderRate] = useState(1);

  useEffect(() => {
    getPokemonNatures().then((response) => {
      setPokemonNatures(response.payload);
    });

    if (team[props.slotNumber].id !== undefined) {
      getSpeciesDetails(team[props.slotNumber].id!).then((response) => {
        setGenderRate(response.gender_rate);
      });
    }
    console.log(team);
  }, [team]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.type === 'checkbox') {
      dispatch(
        setShiny({
          isShiny: event.target.checked,
          teamSlotNumber: props.slotNumber,
        })
      );
    } else {
      setInputNature(event.target.value);
    }
  }

  function handleLevelChange(event: ChangeEvent<HTMLInputElement>) {
    const inputLevel = +event.target.value;
    const validLevel =
      inputLevel <= +event.target.max && inputLevel >= +event.target.min;
    if (validLevel) {
      dispatch(
        setLevel({
          level: inputLevel,
          teamSlotNumber: props.slotNumber,
        })
      );
    }
  }

  function handleGenderChange(event: any) {
    dispatch(
      setGender({
        gender: event.target.value,
        teamSlotNumber: props.slotNumber,
      })
    );
  }

  function displayGenderOptions(genderRate: number) {
    if (genderRate === -1) {
      return <>Genderless</>;
    } else if (genderRate === 0) {
      return (
        <>
          <span style={{ color: 'blue' }}>♂</span> Male
        </>
      );
    } else if (genderRate === 8) {
      return (
        <>
          <span style={{ color: 'pink' }}>♀</span> Female
        </>
      );
    }

    return (
      <div onChange={handleGenderChange}>
        <input
          type="radio"
          value="Male"
          name="gender"
          checked={gender === 'Male' ? true : false}
        />
        <span style={{ color: 'blue' }}>♂</span> Male
        <input
          type="radio"
          value="Female"
          name="gender"
          checked={gender === 'Female' ? true : false}
        />
        <span style={{ color: 'pink' }}>♀</span> Female
      </div>
    );
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

  function displayEVSliders() {
    return (
      <>
        <h4>HP</h4>
        <EVSlider
          evStatValue={hpEV}
          evName={'hp'}
          teamSlotNumber={props.slotNumber}
        />
        <h4>Attack</h4>
        <EVSlider
          evStatValue={atkEV}
          evName={'atk'}
          teamSlotNumber={props.slotNumber}
        />
        <h4>Defence</h4>
        <EVSlider
          evStatValue={defEV}
          evName={'def'}
          teamSlotNumber={props.slotNumber}
        />
        <h4>Special Attack</h4>
        <EVSlider
          evStatValue={spAtkEV}
          evName={'spAtk'}
          teamSlotNumber={props.slotNumber}
        />
        <h4>Special Defence</h4>
        <EVSlider
          evStatValue={spDefEV}
          evName={'spDef'}
          teamSlotNumber={props.slotNumber}
        />
        <h4>Speed</h4>
        <EVSlider
          evStatValue={spdEV}
          evName={'spd'}
          teamSlotNumber={props.slotNumber}
        />
      </>
    );
  }

  function displayMoves() {
    if (selectedMoves === undefined) {
      return <Loader />;
    }

    return (
      <>
        <PokemonMove
          moveSlotNumber={0}
          selectedMoves={selectedMoves}
          teamSlotNumber={props.slotNumber}
        />
        <PokemonMove
          moveSlotNumber={1}
          selectedMoves={selectedMoves}
          teamSlotNumber={props.slotNumber}
        />
        <PokemonMove
          moveSlotNumber={2}
          selectedMoves={selectedMoves}
          teamSlotNumber={props.slotNumber}
        />
        <PokemonMove
          moveSlotNumber={3}
          selectedMoves={selectedMoves}
          teamSlotNumber={props.slotNumber}
        />
      </>
    );
  }

  return (
    <>
      <PokemonList slotNumber={props.slotNumber} />
      <label>
        Shiny:
        <input
          name="isShiny"
          type="checkbox"
          checked={isShiny}
          onChange={handleChange}
        />
      </label>
      <input
        type="number"
        min="1"
        max="100"
        value={level}
        onChange={handleLevelChange}
      />
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
      {displayList && displayListOfNatures(props.slotNumber)}
      {displayEVSliders()}
      {displayMoves()}
      {displayGenderOptions(genderRate)}
    </>
  );
}

export default PokemonSlot;
