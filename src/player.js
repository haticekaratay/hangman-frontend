class Player{
    constructor({name,id}){
        this.name = name
        this.id = id
        
    }

    static displayName(playerObject){
        let namePlate = document.querySelector("#username-container")
        namePlate.innerText = playerObject.name
        
    }

    static displayScore(currentScore){
        let score = document.querySelector("#score")
        score.innerText = "Score: " + currentScore
        //console.log(currentScore)
    }

    static displayBestScore(playerObj){
        //playerObj = {id: 1, name: "Haley", games: Array(1)}
        let best = document.querySelector("#best")
        let bestScore = playerObj.games[0].score
        let bestPlayer = playerObj.name
        //debugger
        //best.innerText = "BEST: " + bestScore 
        best.innerText=`BEST: ${bestScore} by ${bestPlayer}`
    }
    
}