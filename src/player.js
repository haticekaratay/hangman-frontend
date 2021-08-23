class Player{
    constructor({name,id}){
        this.name = name
        this.id = id
        
    }

    static displayName(playerObject){
        let namePlate = document.querySelector("#username-container")
        namePlate.innerText = playerObject.name
        
    }

    static displayScore(currentScore,bestScore){
        let score = document.querySelector("#score")
        let best = document.querySelector("#best")
        score.innerText = "Score: " + currentScore
        best.innerText = "Highest: " + bestScore
        console.log(currentScore)
       
    }
    
}