class Utils {
    static word = {}
    static getRandomIndex(end) {
        return Math.floor(Math.random() * end );
    }

    static fetchWord(){
        
        fetch("http://localhost:3000/words")
        .then(response => response.json()) 
        .then(words => {
           
            
           const len = words.length;
            const rndIndex = this.getRandomIndex(len-1);
           // debugger
           //this.word = words[rndIndex] 
            //new Word(word)
           
            return words[rndIndex]
        });
    }
}