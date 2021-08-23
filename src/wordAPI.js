class WordAPI{
    //baseURL = "http://localhost:3000/words"

    constructor (baseURL) {
        this.baseURL = baseURL
    }

     getWord() {
        let len = 0
        let rndIndex = 1;

        fetch(`
        ${this.baseURL}/${Utils.getRandomIndex(20)}`)
        .then(response => response.json()) 
        .then(word => {
            //len = words.length;
            //rndIndex = Utils.getRandomIndex(20);
            //new Word(words[rndIndex])//.renderSpace()
            new Word(word)
            //return words[rndIndex]
        });
    
    }
    

}



