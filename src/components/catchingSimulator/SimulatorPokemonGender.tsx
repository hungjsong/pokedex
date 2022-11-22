import { ChangeEvent, useEffect, useState } from 'react';
import { getSpeciesDetails } from '../../API/pokemon';
import { setGender } from '../../redux/catchingSimulatorSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styled from 'styled-components';

type SimulatorPokemonGenderProps = {
  isWild: boolean;
};

const MalePokemon = styled.span`
  color: blue;
`;

const FemalePokemon = styled.span`
  color: pink;
`;

function SimulatorPokemonGender(props: SimulatorPokemonGenderProps) {
  const pokemon = useAppSelector((state) =>
    props.isWild === true
      ? state.catchingSimulator.wildPokemon
      : state.catchingSimulator.userPokemon
  );
  const gender = pokemon.gender;
  const pokemonID = pokemon.id;
  const [genderRate, setGenderRate] = useState(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pokemonID !== undefined) {
      getSpeciesDetails(pokemonID!).then((response) => {
        setGenderRate(response.gender_rate);
        const gender =
          response.gender_rate === -1
            ? 'Genderless'
            : response.gender_rate === 8
            ? 'Female'
            : 'Male';

        dispatch(
          setGender({
            gender: gender,
            isWild: props.isWild,
          })
        );
      });
    }
  }, [pokemonID]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(
      setGender({
        gender: event.target.value,
        isWild: props.isWild,
      })
    );
  }

  function displayGenderOptions(genderRate: number) {
    if (genderRate === -1) {
      return <>Genderless</>;
    } else if (genderRate === 0) {
      return (
        <>
          <MalePokemon>♂</MalePokemon> Male
        </>
      );
    } else if (genderRate === 8) {
      return (
        <>
          <FemalePokemon>♀</FemalePokemon> Female
        </>
      );
    }

    return (
      <div onChange={handleChange}>
        <input
          type="radio"
          value="Male"
          name={
            props.isWild === true ? 'wildPokemon' : 'userPokemon' + 'Gender'
          }
          checked={gender === 'Male' ? true : false}
        />
        <MalePokemon>♂</MalePokemon> Male
        <input
          type="radio"
          value="Female"
          name={
            props.isWild === true ? 'wildPokemon' : 'userPokemon' + 'gender'
          }
          checked={gender === 'Female' ? true : false}
        />
        <FemalePokemon>♀</FemalePokemon> Female
      </div>
    );
  }

  return <label>Gender: {displayGenderOptions(genderRate)}</label>;
}

export default SimulatorPokemonGender;
