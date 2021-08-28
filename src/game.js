class Game{
    static all =[]
    constructor({id,player_id}){
        this.id = id
        this.player_id = player_id
        Game.all.push(this)
        
    }
  
    static displayWelcome(){
        let modalFooter = document.querySelector("#footer")
        if(modalFooter.children.length>0){
            for(let i=0; i<modalFooter.childElementCount; i++){
                modalFooter.children[i].remove()
            }
        }
        

        let modalTitle = document.querySelector("#modalTitle")
        let modalBody = document.querySelector("#modalBodyText")
        let savePlayerButton = document.createElement("button")
        savePlayerButton.classList.add("btn","btn-dark")
        savePlayerButton.innerText = "Save"
        modalFooter.append(savePlayerButton)

        modalTitle.innerText = "Welcome to our Game of Hangman, Choose your letters wisely, you have 6 lives for each word. If you guess a word correctly, you will regain your lives and guess the next word"
        let input = document.createElement("input")
    
        modalBody.innerText = "Please enter your name: "
        
        input.type = "text"
        input.placeholder ="Your Name"
        modalBody.append(input)
        $('#modalForm').modal({ backdrop: 'static', keyboard: false })
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
        let quitButton = document.createElement("button")
        quitButton.classList.add("btn","btn-secondary")
        quitButton.innerText = "Quit"
        playAgainButton.classList.add("btn","btn-dark")
        playAgainButton.innerText="Play Again"
        modalButtons.append(quitButton,playAgainButton)
        

        playAgainButton.addEventListener("click", (e)=>{
            let gameData = {
                player_id: Game.all[Game.all.length-1].player_id,
                score: Word.calculateScore(),
                isFinished: false
            }
            GameAPI.createGame(gameData)
            
            $("#gameEnd").modal("hide")
        })

        quitButton.addEventListener("click",(e)=>{
            let gameData = {
                player_id: Game.all[Game.all.length-1].player_id,
                score: Word.calculateScore()
            }
            GameAPI.createGame(gameData)
            // if user quits
            //hide the modal
            $("#gameEnd").modal("hide")
            //clear user name container
            let score = document.querySelector("#username-container")
            score.innerHTML =``
           
            //display welcome modal again
            this.displayWelcome()


        })
        
    }

    static correctSound(){
        let soundPlay = document.getElementById("correctAnswer")
        soundPlay.play()
    }

    static wrongSound(){
        let soundPlay = document.getElementById("wrongAnswer")
        soundPlay.play()
    }

    static gameoverSound(){
        let soundPlay = document.getElementById("gameover")
        soundPlay.play()
    }

    static winningSound(){
        let soundPlay = document.getElementById("win")
        soundPlay.play()
    }
   


}