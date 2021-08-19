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
        .then(playerObject => {
           
            if(playerObject.message){
                Game.errorMessage(playerObject.message[0])
            }else{
                console.log("close modal")
            }
            })
        .catch(error => console.log(error))
    }
}

