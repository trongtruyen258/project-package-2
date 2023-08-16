// let numberOfElement = 300; //can change by input HTML
// let firstNum = 0;
// let secondNum = 0;
// let tempArr = [];
// for (let i = 0; i < numberOfElement; i++) {
//   const data = Math.floor(Math.random() * numberOfElement) + 1;
//   tempArr.push(data);
// }
// tempArr.forEach((element) => {
//   if (element > firstNum) {
//     secondNum = firstNum;
//     firstNum = element;
//   } else {
//     if (element > secondNum) {
//       secondNum = element;
//     }
//   }
// });
// console.log("2 so co tong lon nhat trong mang ", tempArr, " la:");
// console.log(firstNum, ", ", secondNum);
// console.log("tong la:", firstNum + secondNum);
let a = 5;
let b = 7;
b = a * b;
a = b / a;
b = b / a;
console.log(a, b);
