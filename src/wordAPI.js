class WordAPI{
    static baseURL = "http://localhost:3000/words"

    static getWord() {
        let len = 0
        let rndIndex = 1;

        fetch(this.baseURL)
        .then(response => response.json()) 
        .then(words => {
            len = words.length;
            rndIndex = Utils.getRandomIndex(len);
            new Word(words[rndIndex]).renderWord()
            new Word(words[rndIndex]).letterClick()
        });
    }

}



