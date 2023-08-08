// Product of 2 numbers using arrow functions

const a = 2;
const b = 7;

const product = (a, b) => `Product of ${a} and ${b} is ${a * b}`;

console.log(product(a, b));

// Creating object for student

const student = {
  userName: "Deep",
  age: 21,

  greet() {
    console.log("Hi, I am ", this.name);
  },
};

student.greet();

// Arrays
const array = ["apple", "oranges", " ", "mango", " ", "lemon"];
// map
const newArray = array.map((a) => (a === " ") ? "empty string" : a);

console.log(array);
console.log(newArray);

// Spread operator
const arr1 = ['hello', 'world']
const arr2 = [...arr1];

console.log(arr1);
console.log(arr2);
console.log(arr1 == arr2);
console.log(arr1 === arr2);

// Rest operator
const arr3 = (...args) => {
    return args;
}

console.log(arr3(1, 2, 3, 4, 5, 6, 7));

// Destructuring
var {userName} = student;
userName = "Deep Shah";
console.log(student.userName);

// Async-await and promises
async function output() {

    console.log('a');
    console.log('b');
    
    await new Promise((resolve, reject) => setTimeout(() => { 
        console.log('c');
        resolve();
    }, 3000));
    
    await new Promise((resolve, reject) => setTimeout(() => { 
        console.log('d');
        resolve();
    }, 0));
    
    console.log('e');
}

output();