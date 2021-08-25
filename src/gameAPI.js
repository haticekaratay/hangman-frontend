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
            //new Game(currentGame)
            console.log("current game",currentGame) 
            //location.reload();  
                $("#gameEnd").modal("hide")
                Word.reset()  
                
        })
        .catch(error=>console.log(error))
        
    }
}

