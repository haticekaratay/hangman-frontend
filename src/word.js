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
        let categoryContainer = document.createElement("div")
        categoryContainer.innerText = this.category
        wordContainer.appendChild(categoryContainer)

        for(let i=0; i<this.name.length; i++){
            console.log(this.name.length)
            let letterContainer = document.createElement("div");
            if(this.name[i]===""){
                letterContainer.innerText ="&nbsp"
            }
            else{
                letterContainer.classList.add("letter-container","mr-3");
                letterContainer.innerText =this.name[i].toUpperCase()
            }
            wordContainer.appendChild(letterContainer)
        }
        return wordContainer
    }

}

