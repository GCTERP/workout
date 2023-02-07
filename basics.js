// Initialize information
const data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

// Return TRUE if any one element matches target

data.some(elem => 5 == elem) // returns TRUE

// Return TRUE if all elements matches target

data.some(elem => 15 == elem) // returns FALSE

// Return array of elements that match a certain condition

let even = data.filter(elem => elem % 2 == 0) // returns [ 2, 4, 6, 8, 10 ]

// Convert or map elements from one to another and replace original

let tens = data.map(elem => elem * 10) // returns [ 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 ]

// A complex example: 
// Make an object with id and value of each element greater than 5

let result = data.filter(elem => elem < 5).map((elem, idx) => ({ id: idx, value: elem }))

// return [ { id: 0, value: 1 }, { id: 1, value: 2 }, ...  ]