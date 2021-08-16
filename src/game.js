class Game{
    constructor({player_id,isFinished,score}){
        this.player_id = player_id
        this.isFinished = isFinished
        this.score = score
        this.word = new Word()
    }

}