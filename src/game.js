 let baseURL = "http://localhost:3000/words"
 let bodyParts = [
    "image/noose.png",
    "image/face.png",
    "image/shirt.png",
    "image/arms.png",
    "image/short.png",
    "image/legs.png",
]

let cssBodyParts = ["noose","face","shirt","arms","short","legs"]

let score = 0
let correctNumbers = 0;

class Game{

    static all =[]
    static player_id = 0;
   
    constructor({id,player_id}){
       // const newWord = Utils.fetchWord()


        this.id = id // undefined
        Game.player_id = player_id
        
       
        // Game.all.push(this) // 
        // this.renderSpace()
        // this.letterClick()

      
    }
    startGame(){
        console.log('inside start game');
        // Game.fetchWord();
        Game.constructWordArray()
    }

    static constructWordArray() {
        fetch(baseURL)
            .then(response => response.json()) 
            .then(words => {
                for(let w of words){
                    Game.all.push(w)
                }

                const wordObj = Game.getRandomWord(Game.all).word;
                const index = Game.getRandomWord(Game.all).index;
                Game.all.splice(index, 1);
                
                console.log('wordObj', JSON.stringify(wordObj, null, 2));

                Game.renderSpace(wordObj);
                Game.letterClick(wordObj);
        });
    }

    static getRandomWord(words) {
        const len = words.length;
        const rndIndex = Utils.getRandomIndex(len-1);
        return { word: words[rndIndex], index: rndIndex};
    }

    static fetchWord(){
        fetch(baseURL)
        .then(response => response.json()) 
        .then(words => {
            for(let w of words){
                Game.all.push(w)
            }

           const len = Game.all.length;
            const rndIndex = Utils.getRandomIndex(len-1);
            const wordObj = Game.all[rndIndex];

            console.log('wordObj', JSON.stringify(wordObj, null, 2))

            Game.renderSpace(wordObj);
            Game.letterClick(wordObj);
        });
    }

    static renderSpace(wordObj){
        let wordContainer = document.querySelector("#word-container");
        //wordContainer.innerHTML =""
      
        let word = wordObj.name
        console.log("render space", wordObj.name)
        let categoryContainer = document.querySelector("#category-container")
        
        categoryContainer.innerText = wordObj.category.toUpperCase()
        categoryContainer.className = "title"
        

        for(let i=0; i<word.length; i++){
            
            let letterContainer = document.createElement("div");
           
            wordContainer.classList.add("d-flex", "justify-content-center");
                if(word[i]===" "){
                    letterContainer.className = "empty-space"
                }else{
                    letterContainer.classList.add("letter-container","mr-3")
                    letterContainer.innerText =" "
                }
                //console.log(word)
                wordContainer.appendChild(letterContainer)
        }
            
    }

    static letterClick(wordObj){
        let letterButtons = document.querySelectorAll("#button");

        letterButtons.forEach(button => {
            button.addEventListener('click',Game.checkLetter.bind('', wordObj, event), false);
        }); 
    }




    static checkLetter(wordObj, b, event) {
        // check the word object.
                console.log('WORD', JSON.stringify(wordObj, null, 2))

                let word = wordObj.name
                const len = word.split(" ").join("").length;

                event.target.disabled = true
                Player.displayScore(Game.calculateScore(),"200")
                let value = event.target.value
                  
                const indexArray = Game.findIndex(word,value);

                Game.displayLetter(indexArray,value)
                    
                correctNumbers = correctNumbers + indexArray.length
                if(indexArray.length > 0){
                    score = correctNumbers * 10
                }
        
                if(indexArray.length == 0){
                    Game.displayBody()      
                }

                if (bodyParts.length == 0){
                    console.log("You lost");
                    Game.disableAllButtons(); 
                    Game.displayModal("Game Over", word, wordObj)

                } else if(correctNumbers == len){
                    console.log("You win")
                    Game.disableAllButtons();
                    // Game.removeEvents();
                    score += bodyParts.length * 10 
                    Game.displayModal("You Win!", word, wordObj)

                }

                // event.target.removeEventListener("click", Game.checkLetter);
                event.target.removeEventListener('click',Game.checkLetter.bind('', wordObj, event), false);
    }
    

    static findIndex(word, letter){
        console.log("word in find index", word)
        let repeatingLetterIndex =[]
        
        word.toLowerCase().split("").filter((l,index)=>{
            if(l===letter.toLowerCase()){
               repeatingLetterIndex.push(index)
            }
        })
    
        return repeatingLetterIndex;
        
    }

    static displayLetter(indexArray, letter){
        let letterDiv= document.querySelectorAll("#word-container")[0].children
        console.log("in display letter",indexArray,letter)
        for(let i=0; i<indexArray.length; i++){
            letterDiv[indexArray[i]].innerText = letter
        }

    }  

    static disableAllButtons() {
        let letterButtons = document.querySelectorAll("#button");
        letterButtons.forEach(button => {
            button.disabled = true;
        });
    }

    static removeEvents() {
        let letterButtons = document.querySelectorAll("#button");
        letterButtons.forEach(button => {
            button.removeEventListener("click", (e) => {
                console.log('event is cleared')
            }, false)
        })
    }

    static displayBody(){
        let body = document.querySelector("#body-parts")
        let img = document.createElement("img")
        const image = bodyParts.shift()
        let css = cssBodyParts.shift()
        
        img.className = css
        img.src = image
        body.append(img)
    }

    static calculateScore(){
        console.log("calculateScore value", score)
        return score 
    }

    static errorMessage(message){
        let modalBodyText = document.querySelector("#error")
        modalBodyText.innerText = message
        modalBodyText.className = "error"
    }

    static displayModal(status, answer, wordObj){
        let modalTitle = document.querySelector("#endTitle")
        let modalBody = document.querySelector("#endBody")
        modalTitle.innerText = status.toUpperCase()

        if(answer){
            modalBody.innerHTML = `The correct answer is <b>${answer}<b>`

        }else{
            modalBody.innerText = "Congratulations"
        }
        
        $("#gameEnd").modal("show");
        Game.sendGameData(wordObj)
    }
 
    static sendGameData(wordObj) {
        let playAgain = document.querySelector("#playAgain")
        let close = document.querySelector("#close")
        console.log("Player id:", Game.player_id)

        playAgain.addEventListener("click", (e)=>{
            let gameData = {
                player_id: Game.player_id,
                score: Game.calculateScore(),
                //isFinished: false
            }
            console.log("Game.sendGameData- gameDate:",JSON.stringify(gameData, null, 2))
            Game.createGame(gameData, wordObj)
        })
    }

    static createGame(gameData, wordObj) {
        console.log('game Data', gameData)
        console.log('wordObj', wordObj);

        const baseURL = "http://localhost:3000/games"

        let configObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(gameData)
        }

        fetch(baseURL,configObject)
            .then(response => response.json())
            .then(currentGame => {

                // close the modal
                $("#gameEnd").modal("hide")

                // send game data to the database
                console.log("posted game", currentGame) 
                
                 // clear the word.
                wordObj = {}
               
                // call the reset button.
                Game.reset(wordObj);
            })
            .catch(error=>console.log(error))
    }







    static reset(wordObj){
        wordObj = {};
        console.log('wordObject', JSON.stringify(wordObj, null, 2));

        correctNumbers = 0;
        Game.clearWordContainer()
        Game.clearHangmanContainer()
        
        bodyParts = [
            "image/noose.png",
            "image/face.png",
            "image/shirt.png",
            "image/arms.png",
            "image/short.png",
            "image/legs.png",
        ]
        cssBodyParts = ["noose","face","shirt","arms","short","legs"]
        Game.enableAllButtons() 

        delete wordObj.category
        delete wordObj.id
        delete wordObj.name

        console.log('wo after deletion', wordObj)
        new Game(140).startGame();
    }

    static clearWordContainer(){
        let wordContainer = document.querySelector("#word-container").children;
        Array.from(wordContainer).forEach(letterContainer => {
            letterContainer.innerHTML=""
            letterContainer.remove()
        })
    }
    
    static clearHangmanContainer(){
        let body = document.querySelector("#body-parts")
        body.innerHTML =``
    }
    
    static enableAllButtons() {
        let letterButtons = document.querySelectorAll("#button");
        letterButtons.forEach(button => {
            button.disabled = false;
        });
        
    }
   


    // static createWordContainer(){
        

    //     let container = document.querySelector(".container").parentNode
    //     let wordContainer = document.createElement("div")
    //     wordContainer.className ="row"
    //     wordContainer.id = "word-container"
        
    //     container.insertBefore(wordContainer,container.children[1])
        
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
    //     Array.from(wordContainer.children).forEach(letterContainer=>{
    //         letterContainer.innerText =""
    //         letterContainer.remove()
    //     })
        
    // }

}