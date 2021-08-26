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

class Word{
    static all = []

    static currentWord = {}

    constructor(wordObject){
        this.name = wordObject.name
        this.id = wordObject.id
        this.category = wordObject.category
        Word.all.push(this)

        Word.currentWord = wordObject;

        console.log('current word', JSON.stringify(wordObject,null,2))
        this.renderSpace()
        this.letterClick()
    }
   
    renderSpace(){
        this.appendLetterBoard()

        let wordContainer = document.querySelector("#word-container");
        wordContainer.innerHTML =""
   
        let word = Word.currentWord.name
        let categoryContainer = document.querySelector("#category-container")
        
        categoryContainer.innerText = this.category.toUpperCase()
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
            wordContainer.appendChild(letterContainer)
        }
            
    }

    findIndex(word,letter){
        console.log("word in find index", word)
        let repeatingLetterIndex =[]
        
        word.toLowerCase().split("").filter((l,index)=>{
            if(l===letter.toLowerCase()){
               repeatingLetterIndex.push(index)
            }
        })
    
        return repeatingLetterIndex;
        
    }

    displayLetter(indexArray,letter){
       
        let a= document.querySelectorAll("#word-container")[0].children
        console.log("in display letter",indexArray,letter)
        for(let i=0; i<indexArray.length; i++){
            a[indexArray[i]].innerText = letter
        }
    }     
    
    appendLetterBoard(){
        let letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
        let letterButtons = document.querySelector("#buttons")

        for(let i= 0; i<letters.length; i++){
            let button = document.createElement("button")
            button.classList.add("btn","btn-success","mr-3", "btn-lg")
            button.innerText = letters[i]
            letterButtons.appendChild(button)
        }
    }
    
    letterClick(){
        let letterButtons = document.querySelector("#buttons")
        for(let i=0; i<letterButtons.childElementCount; i++){
            letterButtons.children[i].addEventListener('click', (e) => {
                this.checkLetter(e);
            })
        }
    } 

    checkLetter(event) {
        let word = Word.currentWord.name
                console.log('WORD', JSON.stringify(word, null, 2))

                
                const len = word.split(" ").join("").length;

                event.target.disabled = true
                Player.displayScore(Word.calculateScore(),"200")
                let value = event.target.innerText
                  
                const indexArray = this.findIndex(word,value);

                this.displayLetter(indexArray,value)
                
                correctNumbers = correctNumbers + indexArray.length
                if(indexArray.length > 0){
                    score = correctNumbers * 10
                }
                Player.displayScore(Word.calculateScore(),"100")
                if(indexArray.length == 0){
                     
                    this.displayBody()  
                       
                }

                if (bodyParts.length == 0){
                    console.log("You lost");
                    this.disableAllButtons(); 
                    this.displayModal("Game Over", word)

                } else if(correctNumbers == len){
                    console.log("You win")
                    this.disableAllButtons();
        
                    score += bodyParts.length * 10 
                    Player.displayScore(score,"100")
                    this.displayModal("You Win!", null)
                }
    }


    disableAllButtons() {
        let letterButtons = document.querySelectorAll("#button");
        letterButtons.forEach(button => {
            button.disabled = true;
        });
    }


    displayBody(){
        let body = document.querySelector("#body-parts")
        let img = document.createElement("img")
        const image = bodyParts.shift()
        let css = cssBodyParts.shift()

        
        img.className = css
        img.src = image
        body.append(img)
        
    }

    displayModal(status,answer){
        let modalTitle = document.querySelector("#endTitle")
        let modalBody = document.querySelector("#endBody")
        modalTitle.innerText = status.toUpperCase()
        
        if(answer){
            modalBody.innerHTML = `The correct answer is <b>${this.name}<b>`

        }else{
            modalBody.innerText = "Congratulations"
        }
        
        $("#gameEnd").modal("show");
        Game.sendGameData()
        this.reset()
    }
   

    reset(){
        Word.currentWord ={}
        correctNumbers = 0;
        this.clearWordContainer()
        this.clearHangmanContainer()
        let letterButtons = document.querySelector("#buttons")
        letterButtons.innerHTML=""
        let modalButtons = document.querySelector("#modalButtons")
        
        for(let i=0; i<=modalButtons.childElementCount; i++){
            modalButtons.removeChild(modalButtons.firstChild)
        }
    
        const newWord = new WordAPI("http://localhost:3000/words")
        newWord.getWord()
        bodyParts = [
            "image/noose.png",
            "image/face.png",
            "image/shirt.png",
            "image/arms.png",
            "image/short.png",
            "image/legs.png",
        ]
        cssBodyParts = ["noose","face","shirt","arms","short","legs"]
        this.enableAllButtons()
        
    }

    clearWordContainer(){
        let wordContainer = document.querySelector("#word-container").children;
        Array.from(wordContainer).forEach(letterContainer => {
            letterContainer.innerHTML=""
            letterContainer.remove()
        })
    }
    clearHangmanContainer(){
        let body = document.querySelector("#body-parts")
        body.innerHTML =``
    }
    
    enableAllButtons() {
        let letterButtons = document.querySelectorAll("#button");
        letterButtons.forEach(button => {
            button.disabled = false;
        });
        
    }

    static calculateScore(){
        console.log("calculateScore value", score)
        return score 
    }
}


    



