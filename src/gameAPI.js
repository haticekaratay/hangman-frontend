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
            console.log("current game",currentGame) 
            new Game(currentGame)         
        })
        .catch(error=>console.log(error))
        
    }
}

