class GameAPI{
    static baseURL = "https://hangman-word-guess.herokuapp.com/games"

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
            new Game(currentGame)         
        })
        .catch(error=>console.log(error))
        
    }

}

