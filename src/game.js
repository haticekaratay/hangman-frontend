class Game{

    constructor({player_id, score}){
        this.player_id = player_id
        this.score = score
        this.word = new Word()
    }

    static displayWelcome(){
        let modalTitle = document.querySelector("#modalTitle")
        let modalBody = document.querySelector("#modalBodyText")
        let savePlayerButton = document.querySelector("#savePlayer")
        let closeButton = document.querySelector("#close")
        modalTitle.innerText = "Welcome to our Game of Hangman, Choose your letters wisely, you have 6 lives for each word. If you guess a word correctly, you will regain your lives and guess the next word"
        let input = document.createElement("input")
    
        modalBody.innerText = "Please enter your name: "
        
        input.type = "text"
        input.placeholder ="Your Name"
        modalBody.append(input)
     
        $("#gameEnd").modal("show");

        savePlayerButton.addEventListener("click",(e)=>{
           e.preventDefault()
           if(input.value.length>0){
               PlayerAPI.createPlayer({name: input.value});
            }
         
        })
    }

  

}