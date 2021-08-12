class Word{
    static all = []
    constructor(wordObject){
        this.name = wordObject.name
        this.id = wordObject.id
        this.category = wordObject.category
     
    }
   
    renderWord(){
        let wordContainer = document.querySelector("#word-container");

        let categoryContainer = document.querySelector("#category-container")
        
        categoryContainer.innerText = this.category.toUpperCase()
        categoryContainer.className = "title"
        

        for(let i=0; i<this.name.length; i++){
            
            let letterContainer = document.createElement("div");
            if(this.name[i]===""){
                letterContainer.innerText ="&nbsp"
            }
            else{
                letterContainer.classList.add("letter-container","mr-3");
                //letterContainer.innerText ="&nbsp"
                letterContainer.innerHTML = ` `
                letterContainer.innerHTML =`${this.name[i].toUpperCase()}`
            }
            wordContainer.appendChild(letterContainer)
        }
        wordContainer.classList.add("d-flex", "justify-content-center")
        
        return this.name
    }

    letterClick(){
        let letterButtons = document.querySelectorAll("#button")
        letterButtons.forEach(button => {
            button.addEventListener("click", (e)=>{
                    e.target.disabled = true
                    console.log(this.name)
             } )})
                
    }

    isMatched(letter){
        let letterButtons = document.querySelectorAll("#button")
        letterButtons.forEach(button=> {
           if(button.value === letter){
               return true
           }
        })
        return false
    }



}

    



