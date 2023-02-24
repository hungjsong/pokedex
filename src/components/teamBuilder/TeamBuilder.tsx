import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { getTeamByID, saveTeam } from '../../API/teamBuilder';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addTeamPokemon, initializeTeam } from '../../redux/teamBuilderSlice';
import PokemonSlot from './PokemonSlot';

function TeamBuilder() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const team = useAppSelector((state) => state.teamBuilder.team);
  const { state } = useLocation();
  const { teamID } = state;

  useEffect(() => {
    const responseTeam = getTeamByID(teamID);
    responseTeam.then((response) => {
      dispatch(initializeTeam({ team: response.data }));
    });
  }, []);

  function saveBuiltTeam() {
    const savedTeam = saveTeam(team, teamID);
    savedTeam.then((response) => {
      dispatch(initializeTeam({ team: response.data }));
    });
  }

  function addPokemon() {
    dispatch(addTeamPokemon({}));
  }

  return (
    <div>
      <h1>{t('teamBuilder')}</h1>
      {team.map((pokemon, index) => {
        return <PokemonSlot teamSlotNumber={index} />;
      })}
      <button onClick={addPokemon}>Add Pokemon</button>
      {team.length > 0 && <button onClick={saveBuiltTeam}>Save Team</button>}
      <Link to="/TeamSelect">Return</Link>
    </div>
  );
}

export default TeamBuilder;
