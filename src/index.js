let baseURL = "https://hangman-word-guess.herokuapp.com/words"
const newWord = new WordAPI(baseURL)

document.addEventListener("DOMContentLoaded", () => {
    Game.displayWelcome();
    newWord.getWord();
    PlayerAPI.getBestScore()
})
