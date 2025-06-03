// === Constants ===
const BASE = `https://fsa-puppy-bowl.herokuapp.com/api`;
const COHORT = `/2505-FTB-ET-WEB-FT`; // Make sure to change this!
const PLAYERS = `/players`
const TEAMS = `/teams`
const API = BASE + COHORT;
const state = {players:[], teams:[], selectedPlayer:{}, selectedTeam:[]}

const callPlayers = async() => {
    try {
        const url = API + PLAYERS
        const response = await fetch(url)
        let responseJSON = await response.json()
        console.log("response JSON", responseJSON)
        state.players = responseJSON.data
        console.log("state.players", responseJSON.data)
    } catch(err) {
        const error = new Error("callPlayers error", err.case, err)
        console.error
    }
}

//fetch players
const callTeams = async() => {
    try {
        const url = API + TEAMS
        const response = await fetch(url)
        let responseJSON = await response.json()
        console.log("response JSON", responseJSON)
        state.teams = responseJSON.data
        console.log("state.teams", responseJSON.data)
    } catch(err) {
        const error = new Error("callTeams error", err.case, err)
        console.error
    }
}

//fetch teams
window.onload = async function init() {
    await callPlayers()
    await callTeams()
}

//fetch individual player
const callIndivPlayer = async(id) => {
    const url = `${API}${TEAMS}/${id}`
    console.log("Individual player url", url)
    const respone = await fetch(url)
    let responseJSON = await respone.json()
    state.selectedPlayer = responseJSON
}

//invite new player
//If new player is not on a team, the teamid is null
const newPlayer = async (playerName, breed, playerstatus = "bench", imageUrl, teamId) => {
    const url = `${API}${TEAMS}`
    const response = await fetch(url, {
        method:"POST",
        body: JSON.stringify({
            name:playerName,
            breed:breed,
            playerstatus:playerstatus,
            imageUrl:imageUrl,
            teamid:null
        })
    });
    return response
}

const deletePlayer = async (id) => {
    const url = `${API}${TEAMS}/${id}`
    const response = await fetch(url, {
        method:"DELETE"
    });
    return response
}