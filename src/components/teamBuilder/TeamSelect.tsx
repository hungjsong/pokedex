import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNewTeamReq, loadUserTeams } from '../../API/teamBuilder';

function TeamSelect() {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    if (userID !== null) {
      loadUserTeams(userID).then((teams) => setTeams(teams));
    }
  }, []);

  function createNewTeam() {
    if (userID !== null) {
      createNewTeamReq(userID);
    }
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
      {teams.length !== 0 && (
        <div>
          {teams.map((team, index) => {
            return <h1>team {index + 1}</h1>;
          })}
        </div>
      )}
      <button onClick={createNewTeam}>Add New Team</button>
    </div>
  );
}

export default TeamSelect;
