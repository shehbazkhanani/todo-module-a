//Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
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
  measurementId: "G-C06VTDY3KQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
let email = document.getElementById('email');
let password = document.getElementById('password');


window.login = function(e) {
    e.preventDefault()
    let model = {
        Email : email.value,
        Password : password.value,
    }

    signInWithEmailAndPassword(auth, model.Email, model.Password).
    then(function(succ){
        console.log(succ.user.uid);
        window.location.replace('home.html')
    }).catch(function(err){
        console.log(err);
    })

}