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
      const teamID = createNewTeamReq(userID);
      teamID.then(function (result) {
        navigate('/TeamBuilder', { state: { teamID: result.data } });
      });
    } else {
      navigate('/TeamBuilder');
    }
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
          {teams.map((team: { id: number; userID: number }, index) => {
            return (
              <h1
                onClick={() => {
                  navigate('/TeamBuilder', { state: { teamID: team.id } });
                }}
              >
                team {index + 1}
              </h1>
            );
          })}
        </div>
      )}
      <button onClick={createNewTeam}>Add New Team</button>
    </div>
  );
}

export default TeamSelect;
