class Word{
    static all = []
    constructor({name,id,category}){
        this.name = name
        this.id = id
        this.category = category
        Word.all.push(this)
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
            button.addEventListener("click", (e)=>
                    e.target.disabled = true)})
                
    }

}

        



