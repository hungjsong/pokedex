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
  const { isWild } = props;
  const { userPokemon, wildPokemon } = useAppSelector(
    (state) => state.catchingSimulator
  );
  const pokemon = isWild === true ? wildPokemon : userPokemon;
  const { gender, id: pokemonID } = pokemon;
  const [genderRate, setGenderRate] = useState(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pokemonID !== undefined) {
      getSpeciesDetails(pokemonID!).then((speciesDetails) => {
        const { gender_rate } = speciesDetails;
        setGenderRate(gender_rate);
        const gender =
          gender_rate === -1
            ? 'Genderless'
            : gender_rate === 8
            ? 'Female'
            : 'Male';

        dispatch(
          setGender({
            gender: gender,
            isWild: isWild,
          })
        );
      });
    }
  }, [pokemonID]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(
      setGender({
        gender: event.target.value,
        isWild: isWild,
      })
    );
  }

  function displayGenderOptions(genderRate: number) {
    if (genderRate === -1) {
      return <>Genderless</>;
    } else if (genderRate === 0) {
      return (
        <div>
          <MalePokemon>♂</MalePokemon> Male
        </div>
      );
    } else if (genderRate === 8) {
      return (
        <div>
          <FemalePokemon>♀</FemalePokemon> Female
        </div>
      );
    }

    return (
      <div>
        <input
          type="radio"
          value="Male"
          name={isWild === true ? 'wildPokemon' : 'userPokemon' + 'Gender'}
          checked={gender === 'Male' ? true : false}
          onChange={handleChange}
        />
        <MalePokemon>♂</MalePokemon> Male
        <input
          type="radio"
          value="Female"
          name={isWild === true ? 'wildPokemon' : 'userPokemon' + 'gender'}
          checked={gender === 'Female' ? true : false}
          onChange={handleChange}
        />
        <FemalePokemon>♀</FemalePokemon> Female
      </div>
    );
  }

  return <label>Gender: {displayGenderOptions(genderRate)}</label>;
}

export default SimulatorPokemonGender;
