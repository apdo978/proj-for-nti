// console.log("hello")
// In JavaScript, objects are collections of key-value pairs,
//  where keys are strings (or Symbols) and values can be any data type .
// let Car = {
//     Name:"ford",
//     Color:"red",
//     year:"1995",
//     "model name":"speed"
// }

// console.log(Car.Name)
// console.log(Car.Color)
// console.log(Car.year)
// console.log(Car["model name"])
// this define

let Car = {
    Name:"ford",
    Color:"red",
    year:"1995",
    "model name":"speed",
speed:function(){ 
    console.log(Name)
    console.log(this.Name)
 }
}
// input or button example for this


//constractor before oop 


// let car1 =  Object.create(Car)
// console.log(car1.Name)
// console.log(car1.Color)
// console.log(car1.year)

//In JavaScript, a constructor is a special function used to create and initialize objects.
// Constructor functions are typically used in combination with the new keyword to create object instances.

// function MakeCar (name, color, year){
// this.n = name
// this.c = color
// this.y = year
// this.arg = function(){
//     console.log(`your car is ${this.n} and its color is ${this.c}`)
// }
// }
// let Car1 = new MakeCar("jeep","black","2016")
// Car1.arg()

//E C new feature Class
// class Cars {

//     constructor(name, color, year){
// this.n = name
// this.c = color
// this.y = year
//     }
//     //no need to func key word 
//     arg(){
//         return `name ${this.n},color ${this.c}, year ${this.y}`
//     }
// }
// let Carr = new Cars ("hunda", "green", "2020")

// console.log(Carr.n)
// console.log(Carr.c)
// console.log(Carr.y)

// console.log(Carr.arg)








