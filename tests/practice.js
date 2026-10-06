//duplicate char from string o/p is abc

let str = "aabbccdef";
let uniquechar =new Set()
let seen = new Set()
//console.log(...uniquec)
for(let uniquec of str){
    if(seen.has(uniquec)){
        uniquechar.add(uniquec)
    }else{
        seen.add(uniquec)
    }
}
  console.log(...uniquechar)

  //Question 4 — Two arrays मधले common elements using Set

let arr1 = [10, 20, 30, 40, 50];
let arr2 = [30, 40, 50, 60, 70];
let common = new Set();
let seenn = new Set(arr2);
for (let array of arr1 ){
    if(seenn.has(array)){
        common.add(array)
    }
}
console.log(`common number from ${[...common]}`)


//Union of Two Arrays using Set
let arrr1 = [10, 20, 30, 40];
let arrr2 = [30, 40, 50, 60];
//  let result =
let final = new Set([...arrr1, ...arrr2])
console.log(...final)
