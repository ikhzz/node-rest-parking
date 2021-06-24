class CarList {
  // set initial property
  #list = [{
    platNomor: "B 123 34",
    warna: "hitam",
    type : "SUV",
    dateIn : new Date("2021-06-24T06:24:36.288Z"),
    dateOut : null,
    parkAt : 'A1'
  },{
    platNomor: "B 234 56",
    warna: "putih",
    type : "MPV",
    dateIn : new Date("2021-06-24T06:30:36.288Z"),
    dateOut : null,
    parkAt : 'A2'
  },{
    platNomor: "B 345 67",
    warna: "merah",
    type : "MPV",
    dateIn : new Date("2021-06-24T06:40:36.288Z"),
    dateOut : null,
    parkAt : 'A3'
  }]
  // setter for new parking car
  set setCar(car){
    this.#list.push(car)
  }
  // getter helper to read data
  get readAll(){
    return this.#list
  }
  // method to get car that is out of park
  carOut = (platNomor) => {
    for (let i = 0; i < this.#list.length; i++) {
      if(this.#list[i].platNomor == platNomor){
        this.#list[i].dateOut = new Date();
        return this.#list[i]
      }
    }
    return false
  }
  // delete car data method
  deleteCar = (platNomor) => {
    this.#list = this.#list.filter(e => e.platNomor != platNomor)
  }
}

module.exports = CarList;