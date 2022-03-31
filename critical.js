let arr1 = [1,2,3,4,5,6,7,8,9,10]
let arr2 = [3,7,9,]
let matched = []
let missmatched = []
let array = false
for(let i=0;i<arr1.length;i++){
    array = false
for(let j=0;j<arr2.length;j++){
  
        if(arr1[i]==arr2[j]){
         array=true
    }
     
}
if(array === false){
    missmatched.push(arr1[i])
}
if(array === true){
    matched.push(arr1[i])
}
}console.log(matched)
console.log(missmatched)
