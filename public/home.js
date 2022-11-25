//Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onChildAdded,
  remove
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnbjCGPgoR8oVKE110hqNI7U1_iqv4rPo",
  authDomain: "fir-modulea-cc5b9.firebaseapp.com",
  projectId: "fir-modulea-cc5b9",
  storageBucket: "fir-modulea-cc5b9.appspot.com",
  messagingSenderId: "569272878944",
  appId: "1:569272878944:web:b1753d298862a86f820005",
  measurementId: "G-C06VTDY3KQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase();

let input = document.getElementById("input");
let display = document.getElementById("parent");

let arr = [];

window.sendData = function () {
  let model = {
    todo: input.value,
    time: `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`,
  };

  const key = ref(database, "todos/");
  model.id = push(key).key;

  const reference = ref(database, `todos/${model.id}/`);
  set(reference, model);

  arr.push(model);
  // render();

  input.value = "";
};

let todoData = [];

window.sendAllData = function () {
  render();
  console.log(todoData);
  const reference = ref(database, `todos`);
  onChildAdded(reference, function (event) {
    const data = event.val();
    const status = event.exists();
    if (status) {
      todoData.push(data);
    }
    render();
  });
};
window.render = function () {
  display.innerHTML = "";
  for (var i = 0; i < todoData.length; i++) {
    display.innerHTML += `<li style="text-decoration: none; list-style: none"> ${todoData[i].todo} <br> 
    <span> ${todoData[i].time} </span> 
    <button class='btn' onclick="editEvent('${todoData[i].id}')"> edit </button> 
    <button class='btn' onclick="deleteEvent('${todoData[i].id}')"> Delete </button> 
    </li>`;
  }
};

render();

window.editEvent = function (todoid) {
  let editData = prompt("Enter todo here");
  // console.log(editData, 'editDaaata');
  let model = {
    todo: editData,
    time: `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`,
    id : todoid
  };
  // arr.push(model);
  const reference = ref(database, `todos/${todoid}/`);
  set(reference, model);
}

window.deleteEvent = function (id) {
  const reference = ref(database, `todos/${id}`);
  remove(reference)
};

window.logout = function () {
  signOut(auth)
    .then(function () {
      console.log("Logout Successfully");
      window.location.href = "login.html";
    })
    .catch(function (err) {
      console.log(err);
    });
};

function checkAuthentication() {
  onAuthStateChanged(auth, function (user) {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(uid);
      // ...
    } else {
      // User is signed out
      // ...
      window.location.href = "login.html";
    }
  });
}
checkAuthentication();
