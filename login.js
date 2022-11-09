let email = document.getElementById('email');
let password = document.getElementById('password');

let model = []

function signup(e) {
    e.preventDefault()
    let arr = {
        Email : email.value,
        Password : password.value,
    }
    model.push(arr)
    console.log(arr, 'arr');
    console.log(model, 'model');
}