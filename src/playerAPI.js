class PlayerAPI{
    static baseURL = "http://localhost:3000"

    static createPlayer(playerData){
        console.log("player",playerData)
        //let fetchedWord = Game.fetchWord()
        let configObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(playerData)
        }
        console.log("config",configObject)

        fetch(`${this.baseURL}/players`,configObject)
        .then(response => response.json())
        .then(currentPlayer => {
            //let fetchedWord = Utils.word
            
            console.log("currentPlayer", currentPlayer)
            //debugger
            if(currentPlayer.message){
                Game.errorMessage(currentPlayer.message[0])
            }else{
                $("#welcome").modal("hide")
                Player.displayName(currentPlayer)
                Player.displayScore(Game.calculateScore(),"100")

               
               // new Game({player_id: currentPlayer.id, word: Utils.word.name, category: Utils.word.category})
                new Game({player_id: currentPlayer.id}).startGame()
            }
            })
        .catch(error => console.log(error))
        
    }

    static currentplayer(){
        fetch(`
        ${this.baseURL}/current_player`)
        .then(response => response.json()) 
        .then(player => {
            console.log('user created')
            //Game.displayModals();
            //len = words.length;
            //rndIndex = Utils.getRandomIndex(20);
            //new Word(words[rndIndex])//.renderSpace()
            //new Game({player_id: player.id})
            //return player
        })
        .catch(error => console.log(error))
    }

    
}



