import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PokemonList from './PokemonList';
import { capitalize } from '../../utilityFunctions';
import { getPokemonNatures, getSpeciesDetails } from '../../API/pokemon';
import { PokemonNature } from '../../types/pokemonTypes';
import {
  setGender,
  setHapppiness,
  setIV,
  setLevel,
  setNature,
  setShiny,
} from '../../redux/teamBuilderSlice';
import PokemonMove from './PokemonMove';
import { useAppSelector } from '../../hooks';
import Loader from '../common/Loader';
import ItemList from './ItemList';
import EVSliders from './EVSliders';

type PokemonSlotProps = {
  slotNumber: number;
};

function PokemonSlot(props: PokemonSlotProps) {
  const dispatch = useDispatch();
  const [pokemonNatures, setPokemonNatures] = useState<PokemonNature[]>([]);
  const [inputNature, setInputNature] = useState('');
  const [displayList, setDisplayList] = useState(false);
  const team = useAppSelector((state) => state.teamBuilder.team);
  const hpIV = team[props.slotNumber].iv!.hp;
  const atkIV = team[props.slotNumber].iv!.atk;
  const defIV = team[props.slotNumber].iv!.def;
  const spAtkIV = team[props.slotNumber].iv!.spAtk;
  const spDefIV = team[props.slotNumber].iv!.spDef;
  const spdIV = team[props.slotNumber].iv!.spd;
  const selectedMoves = team[props.slotNumber].moves;
  const isShiny = team[props.slotNumber].shiny;
  const gender = team[props.slotNumber].gender;
  const happiness = team[props.slotNumber].happiness;
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

  function handleGenderChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(
      setGender({
        gender: event.target.value,
        teamSlotNumber: props.slotNumber,
      })
    );
  }

  function handleIVChange(event: ChangeEvent<HTMLInputElement>) {
    const inputIV = +event.target.value;
    const validIV =
      inputIV <= +event.target.max && inputIV >= +event.target.min;
    if (validIV) {
      dispatch(
        setIV({
          ivInputValue: +event.target.value,
          teamSlotNumber: props.slotNumber,
          ivName: event.target.id,
        })
      );
    }
  }

  function handleHappinessChange(event: ChangeEvent<HTMLInputElement>) {
    const happiness = +event.target.value;
    const validHappinessEntered =
      happiness <= +event.target.max && happiness >= +event.target.min;
    if (validHappinessEntered) {
      dispatch(
        setHapppiness({
          happiness: happiness,
          teamSlotNumber: props.slotNumber,
        })
      );
    }
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

  function displayIVs() {
    return (
      <>
        <input
          id="hp"
          type="number"
          min="0"
          max="31"
          value={hpIV}
          onChange={handleIVChange}
        />
        <input
          id="atk"
          type="number"
          min="0"
          max="31"
          value={atkIV}
          onChange={handleIVChange}
        />
        <input
          id="def"
          type="number"
          min="0"
          max="31"
          value={defIV}
          onChange={handleIVChange}
        />
        <input
          id="spAtk"
          type="number"
          min="0"
          max="31"
          value={spAtkIV}
          onChange={handleIVChange}
        />
        <input
          id="spDef"
          type="number"
          min="0"
          max="31"
          value={spDefIV}
          onChange={handleIVChange}
        />
        <input
          id="spd"
          type="number"
          min="0"
          max="31"
          value={spdIV}
          onChange={handleIVChange}
        />
      </>
    );
  }

  return (
    <>
      <PokemonList slotNumber={props.slotNumber} />
      <ItemList slotNumber={props.slotNumber} />
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
      <label>
        Happiness:
        <input
          type="number"
          min="1"
          max="255"
          value={happiness}
          onChange={handleHappinessChange}
        />
      </label>
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
      <EVSliders teamSlotNumber={props.slotNumber} />
      {displayMoves()}
      {displayGenderOptions(genderRate)}
      {displayIVs()}
    </>
  );
}

export default PokemonSlot;
