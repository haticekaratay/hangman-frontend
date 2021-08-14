let bodyParts = [
    "image/noose.png",
    "image/face.png",
    "image/shirt.png",
    "image/arms.png",
    "image/short.png",
    "image/legs.png",
]

let cssBodyParts = ["noose","face","shirt","arms","short","legs"]

let correctNumbers = 0;
class Word{
    static all = []
    constructor(wordObject){
        this.name = wordObject.name
        this.id = wordObject.id
        this.category = wordObject.category
        this.space = this.renderSpace()
        
    }
   
    renderSpace(){
        let wordContainer = document.querySelector("#word-container");

        let categoryContainer = document.querySelector("#category-container")
        
        categoryContainer.innerText = this.category.toUpperCase()
        categoryContainer.className = "title"
        

        for(let i=0; i<this.name.length; i++){
            
            let letterContainer = document.createElement("div");
           
            wordContainer.classList.add("d-flex", "justify-content-center");
                //letterContainer.innerText ="&nbsp"
                if(this.name[i]===" "){
                    // letterContainer.classList.add("letter-container","mr-3")
                    //letterContainer.innerText =this.name[i]
                    letterContainer.className = "empty-space"
                }else{
                    letterContainer.classList.add("letter-container","mr-3")
                    //letterContainer.innerText =this.name[i].toUpperCase()
                    letterContainer.innerText =" "
                }
                //letterContainer.style.display = "block"
                console.log(this.name)
                wordContainer.appendChild(letterContainer)
        }
            
            return this.name
        }

    findIndex(word,letter){

        let repeatingLetterIndex =[]
        
        word.toLowerCase().split("").filter((l,index)=>{
            if(l===letter.toLowerCase()){
               repeatingLetterIndex.push(index)
            }
        })
        console.log("repeating letters", repeatingLetterIndex)
        return repeatingLetterIndex;
    }

    displayLetter(indexArray,letter){
        let a= document.querySelectorAll("#word-container")[0].children
        for(let i=0; i<indexArray.length; i++){
            a[indexArray[i]].innerText = letter
        }
    }        
    
    letterClick(){
        let letterButtons = document.querySelectorAll("#button")
        
        letterButtons.forEach(button => {
            button.addEventListener("click", (e)=>{
                    e.target.disabled = true
                    let value = e.target.value
                    const indexArray = this.findIndex(this.name,value)
                    

                    if(indexArray.length == 0){
                        this.displayBody()      
                    }
                    if(bodyParts.length==0){
                        console.log("You lost")
                       
                    }
                    this.displayLetter(indexArray,value)
                    correctNumbers = correctNumbers + indexArray.length
                    const len = this.name.split(" ").join("").length
                    
                    console.log("score", correctNumbers)
                    console.log("len /w", this.name.length)
                    console.log("len /wo", len)
                    
                   
                   if(correctNumbers == len){
                       console.log("You win")
                   }
                   
            })})     
    }


    displayBody(){
        let body = document.querySelector("#body-parts")
        let img = document.createElement("img")
        const image = bodyParts.shift()
        // if(image == undefined){
        //     return false
        // }else{
            let css = cssBodyParts.shift()
            console.log(image)
            img.className = css
            img.src = image
            body.append(img)
        
        
    }




    isMatched(letter, value){
        
        if(value === letter){
               return true
           }
        return false
    }



}

    



