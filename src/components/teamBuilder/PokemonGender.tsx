import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getSpeciesDetails } from '../../API/pokemon';
import { setGender } from '../../redux/teamBuilderSlice';
import { useAppSelector } from '../../hooks';

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
  const { teamSlotNumber } = props;
  const { gender, id } = team[teamSlotNumber];
  const [genderRate, setGenderRate] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== undefined) {
      getSpeciesDetails(id).then((response) => {
        setGenderRate(response.gender_rate);
      });
    }
  }, [team[teamSlotNumber]]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(
      setGender({
        gender: event.target.value,
        teamSlotNumber: teamSlotNumber,
      })
    );
  }

  function displayGenderOptions(genderRate: number) {
    if (genderRate === -1) {
      return <p>Genderless</p>;
    } else if (genderRate === 0) {
      return (
        <p>
          <MalePokemon>♂</MalePokemon> Male
        </p>
      );
    } else if (genderRate === 8) {
      return (
        <p>
          <FemalePokemon>♀</FemalePokemon> Female
        </p>
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
