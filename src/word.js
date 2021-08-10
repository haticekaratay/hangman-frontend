function renderWord(str){
    let wordContainer = document.querySelector("#word-container");

    for(let i=0; i<str.length; i++){
        let letterContainer = document.createElement("div");
        if(str[i]=""){
            letterContainer.innerText ="&nbsp"
        }
        else{

            letterContainer.classList.add("letter-container");
            letterContainer.classList.add("mr-3")
            letterContainer.innerText =str[i].toUpperCase()
        }
        wordContainer.appendChild(letterContainer)
    }
    return wordContainer
}
console.log(renderWord("Helloo  Hatice"))