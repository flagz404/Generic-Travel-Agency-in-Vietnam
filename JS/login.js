const inputUsername = document.getElementById('username');
const inputPassword = document.getElementById('password');
const btnLogin = document.getElementById('btn-log');
const warning1 = document.getElementById('warning1');
const warning2 = document.getElementById('warning2');
const rememberme = document.getElementById('remembersession');
const gallery_container = document.querySelector('.gallery_container');

let galleryIndex = 0;

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


btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    if (inputUsername.value === "" || inputPassword.value === "") {
      warning1.classList.remove("hidden");
    } else {
      const credentials = JSON.parse(localStorage.getItem(inputUsername.value));
      warning1.classList.add("hidden")
      if (credentials.username === inputUsername.value && credentials.password === inputPassword.value) {
        if (rememberme.checked === true) {
          localStorage.setItem("SignedInStatus", true);
          sessionStorage.setItem("SignedInStatus", false);
          window.location.href = "../index.html";
        } else {
          sessionStorage.setItem("SignedInStatus", true);
          localStorage.setItem("SignedInStatus", false);
          window.location.href = "../index.html";
        }
      } else {
        warning2.classList.remove("hidden");
      }
    }
  });