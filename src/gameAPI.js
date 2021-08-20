class GameAPI{
    static baseURL = "http://localhost:3000/games"

    static createGame(gameData){
        let configObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(gameData)
        }

        fetch(this.baseURL,configObject)
        .then(response => response.json())
        .then(currentGame=> {
            console.log("Current Game in game fetch", currentGame)
            new Game(currentGame.id, currentGame.player_id, currentGame.score)
            
        })
        .catch(error=>console.log(error))
    }
}