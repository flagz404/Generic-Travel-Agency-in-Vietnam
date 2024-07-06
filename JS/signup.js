const inputUsername = document.getElementById('username');
const inputPassword = document.getElementById('password');
const btnRegister = document.getElementById('btn-reg');
const warning = document.getElementById('warning');
const gallery_container = document.querySelector('.gallery_container');
const timer = document.getElementById('timer');
const form = document.getElementById('form');
const notify = document.querySelector('.notify');

let galleryIndex = 0;
let timerLength = 10;

function moveSlides(){
  gallery_container.style.transform = `translateY(-${galleryIndex * 100}vh)`;
}

function checkSlides(){
  const galleryArray = [...gallery_container.querySelectorAll('img')];
  if(galleryIndex === galleryArray.length){
    gallery_container.style.transition = 'none';
    galleryIndex = 0;
    moveSlides();
  }
}

setInterval(() => {
  galleryIndex += 1;
  gallery_container.style.transition = "transform 2s cubic-bezier(0.83, 0, 0.17, 1)";
  moveSlides();
  checkSlides();
}, 5000)

btnRegister.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputUsername.value === "" || inputPassword.value === "") {
    warning.classList.remove("hidden");
  }
  else {
    const credentials = {username: inputUsername.value, password: inputPassword.value,};
    let json = JSON.stringify(credentials);
    localStorage.setItem(inputUsername.value, json);
    form.classList.add("hidden");
    notify.classList.remove("hidden");
    var x = setInterval(function() {
      timer.innerHTML = timerLength;
      timerLength -= 1;
      if (timerLength = 0) {
        clearInterval(x);
        window.location.href = "../HTML/login.html";
      }
    }, 1000)
  }
});