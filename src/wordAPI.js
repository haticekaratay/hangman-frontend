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

}



