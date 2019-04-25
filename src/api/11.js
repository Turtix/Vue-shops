let arr = [1,2,3,4,5,6,7,8,9,10,11,12,12,14,15,16,1,2]
let  arr2 = []
const length = arr.length
for(let i=length;i>0;i=i-8) {
  if(arr.length>8){
    arr2.push(arr.splice(0,8))
  }else {
    arr2.push(arr)
  }
}
console.log(arr2)
