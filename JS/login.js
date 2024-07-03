const inputUsername = document.getElementById('username');
const inputPassword = document.getElementById('password');
const btnLogin = document.getElementById('btn-log');
const warning1 = document.getElementById('warning1');
const warning2 = document.getElementById('warning2');

function reset(){
    warning1.classList.remove("hidden");
    warning2.classList.remove("hidden");
    warning1.classList.add("hidden");
    warning2.classList.add("hidden");
}

btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    if (inputUsername.value === "" || inputPassword.value === "") {
      warning1.classList.remove("hidden");
    } else {
      const user = JSON.parse(localStorage.getItem(inputUsername.value));
      warning1.classList.add("hidden")
      if (
        user.username === inputUsername.value &&
        user.password === inputPassword.value
      ) {
        window.location.href = "../index.html";
      } else {
        warning2.classList.remove("hidden");
      }
    }
  });

// btnLogin.addEventListener("click", () => {
//     warning1.classList.toggle("hidden");
//     warning2.classList.toggle("hidden");
// })