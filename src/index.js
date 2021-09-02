let baseURL = "http://localhost:3000/words"
const newWord = new WordAPI(baseURL)

document.addEventListener("DOMContentLoaded", () => {
    Game.displayWelcome();
    newWord.getWord();
    PlayerAPI.getBestScore()
})
