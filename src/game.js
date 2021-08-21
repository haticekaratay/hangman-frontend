class Game{
    static all =[]
    constructor({id, player_id}){
        this.id = id
        this.player_id = player_id
        Game.all.push(this)
        
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

    // static computeScore(){
        
    //     return 90
        
    // }

    static sendGameData() {
        let playAgain = document.querySelector("#playAgain")
        playAgain.addEventListener("click", (e)=>{
            let gameData = {
                player_id: Game.all[Game.all.length-1].player_id,
                score: Word.calculateScore()
            }
            GameAPI.createGame(gameData)
            
            $("#gameEnd").modal("hide")
        })
        
    }
   

    // enableAllButtons() {
    //     let letterButtons = document.querySelectorAll("#button");
    //     letterButtons.forEach(button => {
    //         button.disabled = false;
    //     });
        
    // }

    // static cleanLetterClickEvent() {
    //     let letterButtons = document.querySelectorAll("#button");
    //     letterButtons.forEach(button=>{
            
    //         button.removeEventListener("click", (e)=> {
    //             console.log('removed')
    //         })
    //     }) 
         
    // }

    // static clearWordContainer(){
    //     let wordContainer = document.querySelector("#word-container");
    //     wordContainer.remove()
        
    // }

    // static createWordContainer(){
        

    //     let container = document.querySelector(".container").parentNode
    //     let wordContainer = document.createElement("div")
    //     wordContainer.className ="row"
    //     wordContainer.id = "word-container"
        
    //     container.insertBefore(wordContainer,container.children[1])
        
    // }
//     restart(){
        
//         //get another word
//         //this.clearWordContainer();
//         //this.cleanLetterClickEvent();
//        // this.createWordContainer();
//         //new WordAPI().postWord();
//         new WordAPI().getWord()
        
//        //restart
//         this.enableAllButtons();
//         // clean the button click event
        
//         debugger
        
        
//     }
// }

}