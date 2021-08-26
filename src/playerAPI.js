class PlayerAPI{
    static baseURL = "http://localhost:3000"

    static createPlayer(playerData){
        console.log("player",playerData)
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
        .then(currentplayer => {
            console.log("currentPlayer", currentplayer)
            
            if(currentplayer.message){
                Game.errorMessage(currentplayer.message[0])
            }else{
                $("#welcome").modal("hide")
                Player.displayName(currentplayer)
                Player.displayScore(Word.calculateScore(),"100")
                new Game({player_id: currentplayer.id})
                
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



