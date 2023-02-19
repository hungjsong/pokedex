import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/*
 1 user  can have many teams
 A team belongs to only 1 user
 a team can have many Pokemon (max 6)
 a pokemon can only belong to one team
*/

function TeamSelect() {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    /*
        Check the DB to see if the user has any teams.
          If there are teams, set state value teams to the returned teams list.
      */
  }, []);

  function createNewTeam() {
    navigate('/TeamBuilder');
  }

  function selectedTeam() {
    /*
      Dispatch to teamBuilder store and initialize the team
    */
  }

  return (
    <div>
      <h1>All teams</h1>
      {teams.length === 0 && (
        <div>
          <p>Hey seems like you don't have any teams. Why not make one?</p>
        </div>
      )}
      <button onClick={createNewTeam}>Add New Team</button>
    </div>
  );
}

export default TeamSelect;
