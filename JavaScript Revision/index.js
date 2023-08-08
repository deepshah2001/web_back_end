// Product of 2 numbers using arrow functions

const a = 2;
const b = 7;

const product = (a, b) => (`Product of ${a} and ${b} is ${a*b}`);

console.log(product(a, b));

// Creating object for student

const student = {
    name: "Deep",
    age: 21,

    greet() {
        console.log("Hi, I am ", this.name);
    }
};

student.greet();