class PlayerAPI{
    static baseURL = "http://localhost:3000/players"

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

        fetch(this.baseURL,configObject)
        .then(response => response.json())
        .then(currentplayer => {
           
            if(currentplayer.message){
                Game.errorMessage(currentplayer.message[0])
            }else{
                $("#gameEnd").modal("hide")
                Player.displayName(currentplayer)
                Player.displayScore("0","100")
            }
            })
        .catch(error => console.log(error))
    }
}



