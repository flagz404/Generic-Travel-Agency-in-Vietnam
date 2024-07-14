const hottest_travel_offers = document.querySelector(".hottest-travel-offers");
const hto_items = document.querySelectorAll(".hto-card");
const hto_dots = document.querySelectorAll(".hto-dots li");
const hto_btn_left = document.querySelector(".hto-btn-left");
const hto_btn_right = document.querySelector(".hto-btn-right");

let HTOactive = 0;
let lengthHTOItems = hto_items.length;

function debug(){console.log(hto_items);}

hto_btn_right.onclick = function () {
  if (HTOactive + 1 >= lengthHTOItems) {
    HTOactive = 0;
  } else {
    HTOactive = HTOactive + 1;
  }
  reloadHTOSlider();
};

hto_btn_left.onclick = function () {
  if (HTOactive - 1 < 0) {
    HTOactive = lengthHTOItems - 1;
  } else {
    HTOactive = HTOactive - 1;
  }
  reloadHTOSlider();
};

let refreshHTOSlider = setInterval(() => {
  hto_btn_right.click();
}, 3000);

function reloadHTOSlider() {
  hottest_travel_offers.style.transition = `transform 1s cubic-bezier(0.83, 0, 0.17, 1)`
  hottest_travel_offers.style.transform = `translateX(-${HTOactive * 100}vw)`;

  const lastActiveHTODot = document.querySelector(".hto-dots li.active");
  lastActiveHTODot.classList.remove("active");
  hto_dots[HTOactive].classList.add("active");

  clearInterval(refreshHTOSlider);
}

hto_dots.forEach((li, key) => {
  li.addEventListener("click", function () {
    HTOactive = key;
    reloadHTOSlider();
  });
});

