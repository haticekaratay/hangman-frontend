class Word{
    constructor(str){
        this.str = str
    }

    renderWord(){
        let wordContainer = document.querySelector("#word-container");

        for(let i=0; i<this.str.length; i++){
            console.log(this.str.length)
            let letterContainer = document.createElement("div");
            if(this.str[i]===""){
                letterContainer.innerText ="&nbsp"
            }
            else{
                letterContainer.classList.add("letter-container");
                letterContainer.classList.add("mr-3")
                letterContainer.innerText =this.str[i].toUpperCase()
            }
            wordContainer.appendChild(letterContainer)
        }
        return wordContainer
    }
}
// console.log(renderWord("Helloo  Hatice"))
let word = new Word("Hello Hatice")
console.log(word.renderWord())