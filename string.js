let data = "500+50"
// let operatorfound
// let numInput1
// let numberInput2
let operator1 = data.indexOf('+')
console.log(operator1)
let operator2 = data.indexOf('-')
let operator3 = data.indexOf('*')
let operator4 = data.indexOf('/')  
console.log(data.indexOf('+'))
let operatorfound
let numInput1
let numInput2
if(operator1!==-1){
    operatorfound = data.substring(operator1,4) 
    numInput1 = data.substring(0,operator1)
    numInput2 = data.substring(operator1+1)  
}
 else if (operator2!==-1) {
    operatorfound = data.substring(operator2,4) 
    numInput1 = data.substring(0,operator2)
    numInput2 = data.substring(operator2+1) 
 } else if (operator3!==-1) {
    operatorfound = data.substring(operator3,4)
    numInput1 = data.substring(0,operator3)
    numInput2 = data.substring(operator3+1) 
 } else {
    operatorfound = data.substring(operator4,4)
    numInput1 = data.substring(0,operator4)
    numInput2 = data.substring(operator4+1) 
 }
   console.log(operatorfound,numInput1,numInput2) 
  
 