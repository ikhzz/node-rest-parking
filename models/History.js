class History {
  #history = []
  set setHistory(set){
    this.#history.push(set)
  }
  get getHistory(){
    return this.#history
  }
}
module.exports = History;