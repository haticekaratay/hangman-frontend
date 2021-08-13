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
            
    
    letterClick(){
        let letterButtons = document.querySelectorAll("#button")
        letterButtons.forEach(button => {
            button.addEventListener("click", (e)=>{
                    e.target.disabled = true
                    let value = e.target.value
                    const indexArray = this.findIndex(this.name,value)
                    console.log(indexArray)
                    this.displayLetter(indexArray,value)

            })})     
    }

    isMatched(letter, value){
        
        if(value === letter){
               return true
           }
        return false
    }



}

    



