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
let currentWord = {}
class Word{
    static all = []

    static currentWord = {}

    constructor(wordObject){
        this.name = wordObject.name
        this.id = wordObject.id
        this.category = wordObject.category
        Word.all.push(this)
        //this.space = this.renderSpace()

        currentWord = wordObject;

        console.log('current word', JSON.stringify(wordObject,null,2))
        // console.log(Word.all)
        // debugger
        this.renderSpace()
        this.letterClick()
    }
   
    renderSpace(){
        let wordContainer = document.querySelector("#word-container");
        // let word = Word.all[Word.all.length-1].name
        //let word = Word.currentWord.name;
        let word = currentWord.name
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
                console.log(word)
                wordContainer.appendChild(letterContainer)
        }
            //this.letterClick()
            // debugger
            //return word
            
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
        // debugger
        let a= document.querySelectorAll("#word-container")[0].children
        console.log("in display letter",indexArray,letter)
        for(let i=0; i<indexArray.length; i++){
            a[indexArray[i]].innerText = letter
        }
        // debugger
    }        
    
    letterClick(){
        console.log("Letterclick: this" ,this)
        // let word;
        // if(word){
        //     word = Word.all[Word.all.length-1].name
        // }else{
        //     word = Word.all[Word.all.length-1].name
        // }

        //let word = Word.currentWord.name;
        let word = currentWord.name
       
        let letterButtons = document.querySelectorAll("#button");
        // let letterButtons = document.querySelectorAll("#button")
        const len = word.split(" ").join("").length;
        console.log("len:",len,"---correctanswer:", correctNumbers)

        letterButtons.forEach(button => {
            button.addEventListener("click", (e)=>{
                    e.target.disabled = true
                    Player.displayScore(Word.calculateScore(),"100")
                    let value = e.target.value
                    const indexArray = this.findIndex(word,value);
                    
                    console.log("in letter click - indexArray", indexArray)
                    this.displayLetter(indexArray,value)
                    correctNumbers = correctNumbers + indexArray.length
                    
                    if(indexArray.length>0){
                        score = correctNumbers * 10
                    }

                    console.log(score)
                    Player.displayScore(Word.calculateScore(),"200")
                    if(indexArray.length == 0){
                        this.displayBody()      
                    }

                    if(bodyParts.length==0){
                        console.log("You lost");
                        this.disableAllButtons(); 
                        this.displayModal("Game Over",word)

                    } else if(correctNumbers == len){
                       console.log("You win")
                       this.disableAllButtons();
                       score += bodyParts.length*10 
                       console.log("before modal score", score)
                       Player.displayScore(score,"100")
                       this.displayModal("You Win!")
                   }

                   
            })}); 
            

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
        //this.restart()
        
    }
   

    reset(){
        //Word.all.shift()
        correctNumbers = 0;
        // Game.clearWordContainer()
        this.clearWordContainer()
        //Game.createWordContainer()
        const newWord = new WordAPI("http://localhost:3000/words")
        newWord.getWord()
        //this.renderSpace()
        bodyParts = [
            "image/noose.png",
            "image/face.png",
            "image/shirt.png",
            "image/arms.png",
            "image/short.png",
            "image/legs.png",
        ]
        cssBodyParts = ["noose","face","shirt","arms","short","legs"]
       // this.letterClick()
        this.enableAllButtons()
        
    }

    clearWordContainer(){
        let wordContainer = document.querySelector("#word-container").children;
        Array.from(wordContainer).forEach(letterContainer => {
            letterContainer.innerText=""
            letterContainer.remove()
        })
        // wordContainer.remove()
        
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

    // restart(){
    //     //window reload
    //     //grab current_players score
    //     // location.reload();
    //     //$("#welcome").modal("hide");
    //     //return false;
        
    // }

}


    



