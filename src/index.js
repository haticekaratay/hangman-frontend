let baseURL = "http://localhost:3000/words"
const newWord = new WordAPI(baseURL)

document.addEventListener("DOMContentLoaded", () => {
    Game.displayWelcome();
    newWord.getWord();
})
























// document.addEventListener("DOMContentLoaded", () => {
    
//     // PlayerAPI.currentplayer()
//     fetch("http://localhost:3000/current_player")
//         .then(response => response.json()) 
//         .then(player => {
//             console.log('game size', player)
//             if (player.games.length>0){
//                 if (player.games[player.games.length-1].isFinished) {
//                     console.log(JSON.stringify(player, null, 2))
//                     Game.displayWelcome();
//                     newWord.getWord();
//             }else {
//                 console.log('existing user');
//                 Game.displayExistingModal();
//             }
//         }})
//     .catch(error => console.log(error))
// })

// let letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
// let buttons = document.querySelector("#buttons")

// for(let i= 0; i<letters.length; i++){
//     let letterButton = document.createElement("button")
//     letterButton.classList.add("btn","btn-success","mr-3", "btn-lg")
//     letterButton.innerText = letters[i]
//     buttons.append(letterButton)
// }

