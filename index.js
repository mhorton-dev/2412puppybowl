// === Constants ===
// Base URL for the Puppy Bowl API
const BASE = `https://fsa-puppy-bowl.herokuapp.com/api`;
const COHORT = `/2505-FTB-ET-WEB-FT`; // Make sure to change this!
const PLAYERS = `/players`
const TEAMS = `/teams`
const API = BASE + COHORT;
const state = {
    players: [],
    teams: [],
    selectedPlayer: {},
    selectedTeam: []
};
const appSection =document.querySelector("#app")

const callPlayers = async() => {
    try {
        const url = `${BASE}${COHORT}${PLAYERS}`
        const response = await fetch(url)
        const responseJSON = await response.json()
        console.log("response JSON", responseJSON)
        state.players = await responseJSON.data.players
        console.log("state.players from callPlayers", state.players)
    } catch(err) {
        error = new Error("callPlayers error", {cause: err})
        console.log(error)
    }
}

//fetch teams
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

//fetch individual player
const callIndivPlayer = async(id) => {
    const url = `${API}${PLAYERS}/${id}`
    console.log("Individual player url", url)
    const response = await fetch(url)
    let responseJSON = await respone.json()
    state.selectedPlayer = responseJSON
    }


//fetch individual team
const callIndivTeam = async(id) => {
    const url = `${API}${TEAMS}/${id}`
    console.log("Individual player url", url)
    const response = await fetch(url)
    let responseJSON = await respone.json()
    state.selectedTeam = responseJSON.data.teams
}

//invite new player
//If new player is not on a team, the teamid is null
const newPlayer = async (playerName, breed, playerstatus = "bench", imageUrl, teamId) => {
    const url = `${API}${TEAMS}`
    const response = await fetch(url, {
            body: JSON.stringify({
            name:playerName,
            breed:breed,
            playerstatus:playerstatus,
            imageUrl:imageUrl,
            teamid:teamId
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

//create and append puppy names main list elements

const puppyNames = async () =>{
    const nameSection = document.createElement("section")
    nameSection.setAttribute("class", "puppy-names")
    const detailSection = document.createElement("section")
    detailSection.setAttribute("class", "puppy-details")
    //if state.players is empty, repopulate it
    if (state.players.length < 1)
        callPlayers()
    console.log(state.players)
    state.players.forEach(puppy => {
    detailSection.setAttribute("class", "puppy-details")
    //if state.players is aray, go through forEach
    console.log("state.players.forEach()", state.players)
    
        if (state.players.length > 0) {
            const puppyPar = document.createElement("p")
            const puppyImg = document.createElement("img")
            puppyPar.setAttribute("id", puppy.id)
            puppyImg.setAttribute("class", "puppy_name_ing")
            puppyImg.setAttribute("alt", puppy.name)
            puppyImg.setAttribute("src", puppy.imageUrl)
            

            puppyPar.addEventListener("click", async () =>{
            state.selectedPlayer = puppy,
            puppyDetails(puppy)
            })


            //populate and append detailSection
            detailSection.appendChild(puppyImg)
            detailSection.appendChild(puppyPar)
            appSection.appendChild(detailSection)
        }
    })
}


//create and append puppy details.
const puppyDetails = async (puppy) => {
detailSection.querySelector(".puppy_details")
const  puppyImg = document.createElement("img")
puppyImg.setAttribute("class", "puppy_detail_img")
puppyImg.setAttribute("src", puppy.imageUrl)
puppyImg.setAttribute("alt", puppy.name)
const puppyPar = document.createElement("p")
puppyPar.innerHTML = `
    <strong>Name</strong> ${puppy.name}<br>
    <strong>ID</strong> ${puppy.id}<br>
    <strong>status</strong> ${await callIndivTeam(puppy.teamid)}
`


puppyPar.appendChild(puppyImg);
const buttonRemove = document.createElement("button")
buttonRemove.textContent = "Remove Player";
buttonRemove.addEventListener("click", async () => {
    await deletePlayer(puppy.id)
})
detailSection.appendChild(buttonRemove)
}


//init runs win page loads.
async function init() {
    await callPlayers()
    await callTeams()
    await puppyNames()
}

init()