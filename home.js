let input = document.getElementById('input');
let display = document.getElementById('parent');

let arr = []

function todo (e) {
     e.preventDefault()
    let model = {
        todo : input.value,
        time : `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
    }
     
    arr.push(model)
    console.log(model, 'modeel');
    console.log(arr, 'arr');

    render()
    input.value = ""
}

function render(){
    display.innerHTML = ""; 
    for(var i=0; i < arr.length; i++){
        display.innerHTML += `<li> ${arr[i].todo} <br> <span> ${arr[i].time} </span> </li>`
    }
}