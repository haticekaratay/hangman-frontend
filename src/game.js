class Game{
    static all =[]
    //static players = [];
    constructor({id,player_id}){
        this.id = id
        this.player_id = player_id
        Game.all.push(this)
        //Game.players.push(player_id)
        
    }
  
    static displayWelcome(){

        let modalTitle = document.querySelector("#modalTitle")
        let modalBody = document.querySelector("#modalBodyText")
        let savePlayerButton = document.querySelector("#savePlayer")
        //let closeButton = document.querySelector("#close")
        modalTitle.innerText = "Welcome to our Game of Hangman, Choose your letters wisely, you have 6 lives for each word. If you guess a word correctly, you will regain your lives and guess the next word"
        let input = document.createElement("input")
    
        modalBody.innerText = "Please enter your name: "
        
        input.type = "text"
        input.placeholder ="Your Name"
        modalBody.append(input)
     
        $("#welcome").modal("show");

        savePlayerButton.addEventListener("click",(e)=>{
           e.preventDefault()
           if(input.value.length>0){
               PlayerAPI.createPlayer({name: input.value});
            }
         
        })
        
        
    }
    
    static errorMessage(message){
        let modalBodyText = document.querySelector("#error")
        modalBodyText.innerText = message
        modalBodyText.className = "error"
    }

    static sendGameData() {

        let modalButtons = document.querySelector("#modalButtons")
        let playAgainButton = document.createElement("button")
        let closeButton = document.createElement("button")
        closeButton.classList.add("btn","btn-secondary")
        closeButton.innerText = "Close"
        playAgainButton.classList.add("btn","btn-primary")
        playAgainButton.innerText="Play Again"
        modalButtons.append(closeButton,playAgainButton)
        

        playAgainButton.addEventListener("click", (e)=>{
            let gameData = {
                player_id: Game.all[Game.all.length-1].player_id,
                score: Word.calculateScore(),
                isFinished: false
            }
            GameAPI.createGame(gameData)
            
            $("#gameEnd").modal("hide")
        })

        // close.addEventListener("click",(e)=>{
        //     let gameData = {
        //         player_id: Game.all[Game.all.length-1].player_id,
        //         score: Word.calculateScore()

        //     }
        //     GameAPI.createGame(gameData)
            
        //     $("#gameEnd").modal("hide")
        // })
        
    }
   


}