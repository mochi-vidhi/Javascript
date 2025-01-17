const  passwordBox = document.getElementById("password");
let btn = document.getElementById('btn');
let copyImg = document.getElementById('img-copy');
const length = 12;

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowerCase = upperCase.toLowerCase();
const number = "0123456789";
const symbol = "@#$%^&*()_+|/}{[]><-=";
const allChars = upperCase + lowerCase + number + symbol;
btn.addEventListener("click",createPassword);


function createPassword(){
    let password = "";
    password += upperCase[Math.floor(Math.random()*upperCase.length)];
    password += lowerCase[Math.floor(Math.random()*lowerCase.length)];
    password += number[Math.floor(Math.random()*number.length)]
    password += symbol[Math.floor(Math.random()*symbol.length)]
    while(length>password.length){
        password += allChars[Math.floor(Math.random()*allChars.length)]
    } 
    passwordBox.value = password;
}

copyImg.addEventListener("click",copyPassword);

function copyPassword(){
    if(passwordBox.value){
        passwordBox.select(); 
        navigator.clipboard
        .writeText(passwordBox.value)
        .then(()=>{
            alert('Password is copied!!');
        })
        .catch((err)=>{
            alert(`Failed to copy password: ${err}`);
        })
    }
    else{
        alert('first generate the password!!');
    }
}

