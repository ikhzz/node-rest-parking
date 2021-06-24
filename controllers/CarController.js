const CarList = require("../models/CarList");
const ParkList = require("../models/ParkList");
const History = require('../models/History')

class CarController {
  // car controller property
  #carlist;
  #parklist;
  #history;
  // constructor of another class
  constructor(){
    this.#carlist = new CarList();
    this.#parklist = new ParkList(10);
    this.#history = new History();
  }
  // register car in method
  carIn = (req, res) => {
    const free = this.#parklist.freeList
    if(!free){
      return res.status(404).json({
        message: "No Parking Slot Available Go park somewhere else",
        response
      })
    }
    // set response for user
    const response = {
      platnomor: req.body.platnomor,
      dateIn: new Date(),
      parkAt: free
    }
    // setter object to example database, object
    this.#carlist.setCar = {
      ...response,
      warna: req.body.warna,
      type: req.body.type,
      dateOut: null,
    }
    // set park slot occupied to true
    this.#parklist.parkSlot = free
    return res.status(200).json({
      message: "Success",
      response
    })
  }
  // set out car data
  carOut = (req, res) => {
    // get data with req.body
    const carOut = this.#carlist.carOut(req.body.platnomor)
    // if car data is not found
    if(!carOut) {
      return res.status(404).json({
        message: "Data Not Found",
      })  
    }
    // set payment based on car type
    let pay = carOut.type == 'SUV' ? 25000 : 35000
    // get parking time
    const result = Math.floor((carOut.dateOut - carOut.dateIn) / 60 / 1000)
    // if parking more than 2 hours
    if((result /60) >= 2){
      pay = pay + (pay * 0.2) * Math.floor((result /60)-1)
      console.log('insde', pay)
    }
    // delete car from list car
    this.#history.setHistory = {...carOut, jumlahBayar: pay}
    this.#carlist.deleteCar(req.body.platnomor)
    // set parking slot to free
    this.#parklist.carOut = carOut.parkAt
    return res.status(200).json({
      message: "Success",
      platnomor: carOut.platNomor,
      tanggalMasuk : carOut.dateIn,
      tanggalKeluar : carOut.dateOut,
      jumlahBayar : pay
    })
  }
  getCar = (req, res) => {
    let get = {'All car': this.#carlist.getAll}
    if(req.query.type){
      get = {"Jumlah Kendaraan" : this.#carlist.getType(req.query.type)}
    }
    if(req.query.color){
      get = {platNomor: this.#carlist.getColor(req.query.color)}
    }
    return res.status(200).json({
      message: "Success",
      ...get
    })
  }
  // read all method
  readCarList = (req, res) => {
    const a = this.#carlist.getAll
    const b = this.#parklist.allList
    const c = this.#history.getHistory
    return res.status(200).json({
      message: "Success",
      car : a,
      park: b,
      history: c
    })
  }
}

module.exports = new CarController();