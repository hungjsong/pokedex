import axios from 'axios';
import { Pokemon } from '../types/pokemonTypes';

export const createNewTeamReq = async (userID: string) => {
  return await axios
    .post('http://localhost:5000/api/pokemon/createNewTeam/', {
      userID: userID,
    })
    .then((response) => {
      return response.data;
    });
};

export const loadUserTeams = async (userID: string) => {
  return await axios
    .post('http://localhost:5000/api/pokemon/getUserTeams/', {
      userID: userID,
    })
    .then((response) => {
      return response.data;
    });
};

export const saveTeam = async (team: Pokemon[], teamID: number) => {
  return await axios
    .post('http://localhost:5000/api/pokemon/saveTeam/', {
      team: team,
      teamID: teamID,
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};

export const getTeamByID = async (teamID: number) => {
  return await axios
    .post('http://localhost:5000/api/pokemon/getTeamByID/', {
      teamID: teamID,
    })
    .then((response) => {
      return response.data;
    });
};
