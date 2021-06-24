class ParkList {
  // setup slot property
  #slot = [];

  constructor(n) {
    // define property based on parameter on class constructor
    if(n < 0){
      n = 10
    }
    // set all slot name and property
    for (let i = 1; i < n+1; i++) {
      this.#slot.push({
        slotName: `A${i}`,
        isOccupied: false
      })
    }
    // set default property for dummy data
    for(let j = 0; j < 3; j++){
      this.#slot[j].isOccupied = true
    }
  }
  // get the first free park spot
  get freeList(){
    for(let i = 0; i < this.#slot.length; i++){
      if(this.#slot[i].isOccupied == false){
        return this.#slot[i].slotName
      }
    }
    return false
  }
  // free car parking slot
  set carOut(slot) {
    for(let i = 0; i < this.#slot.length; i++){
      if(slot == this.#slot[i].slotName){
        this.#slot[i].isOccupied = false
      }
    }
  }
  // get park list
  get allList(){
    return this.#slot
  }
}

module.exports = ParkList;