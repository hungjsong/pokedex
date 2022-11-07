import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSpeciesDetails } from '../../API/pokemon';
import { useAppSelector } from '../../hooks';
import { setGender } from '../../redux/teamBuilderSlice';
import styled from 'styled-components';

type PokemonGenderProps = {
  teamSlotNumber: number;
};

const MalePokemon = styled.span`
  color: blue;
`;

const FemalePokemon = styled.span`
  color: pink;
`;

function PokemonGender(props: PokemonGenderProps) {
  const team = useAppSelector((state) => state.teamBuilder.team);
  const gender = team[props.teamSlotNumber].gender;
  const [genderRate, setGenderRate] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (team[props.teamSlotNumber].id !== undefined) {
      getSpeciesDetails(team[props.teamSlotNumber].id!).then((response) => {
        setGenderRate(response.gender_rate);
      });
    }
  }, [team[props.teamSlotNumber]]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(
      setGender({
        gender: event.target.value,
        teamSlotNumber: props.teamSlotNumber,
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
          name="gender"
          checked={gender === 'Male' ? true : false}
        />
        <MalePokemon>♂</MalePokemon> Male
        <input
          type="radio"
          value="Female"
          name="gender"
          checked={gender === 'Female' ? true : false}
        />
        <FemalePokemon>♀</FemalePokemon> Female
      </div>
    );
  }

  return displayGenderOptions(genderRate);
}

export default PokemonGender;
