import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSpeciesDetails } from '../../API/pokemon';
import { useAppSelector } from '../../hooks';
import { setGender } from '../../redux/teamBuilderSlice';

type PokemonGenderType = {
  teamSlotNumber: number;
};

function PokemonGender(props: PokemonGenderType) {
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
      <div onChange={handleChange}>
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

  return displayGenderOptions(genderRate);
}

export default PokemonGender;
