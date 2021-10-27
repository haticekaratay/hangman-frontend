class WordAPI{
    static baseURL = "https://hangman-word-guess.herokuapp.com/words"

    constructor (baseURL) {
        this.baseURL = baseURL
    }

     getWord() {
        fetch(WordAPI.baseURL)
        .then(response => response.json()) 
        .then(words => {
            let len = words.length;
            let rndIndex = Utils.getRandomIndex(len-1);
            new Word(words[rndIndex])
        });
    }
    
}



