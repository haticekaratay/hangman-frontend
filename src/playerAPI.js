class PlayerAPI{
    static baseURL = "http://localhost:3000"
    
    static createPlayer(playerData){
        let configObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(playerData)
        }
       

        fetch(`${this.baseURL}/players`,configObject)
        .then(response => response.json())
        .then(currentplayer => {
            
            if(currentplayer.message){
                Game.errorMessage(currentplayer.message[0])
            }else{
                $("#welcome").modal("hide")
                PlayerAPI.getBestScore()
                Player.displayName(currentplayer)
                Player.displayScore(Word.calculateScore())
                new Game({player_id: currentplayer.id})
            }
        })
        .catch(error => console.log(error))
        
    }


    static getBestScore(){
        fetch(`${this.baseURL}/best_score`)
        .then(response => response.json())
        .then(player =>{
            Player.displayBestScore(player)
            return player.games[0].score
        })
    }
}




