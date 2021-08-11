class WordAPI{
    constructor(baseURL){
        this.baseURL = baseURL;
    };

    getWords(){
        console.log(this.baseURL)
        fetch(this.baseURL)
        .then(response => response.json())
        .then(words => {
            words.forEach(wordObject => {
              new Word(wordObject)
            })
        })  
    }

    getWord(id=4){
        //console.log("in get word")
        fetch(`${this.baseURL}/${id}`)
        .then(response => response.json())
        .then(wordObject => {
           new Word(wordObject).renderWord()
        })
    }

}



