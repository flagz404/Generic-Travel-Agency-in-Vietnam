const hottest_travel_offers = document.querySelector(".hottest-travel-offers");
const hto_items = document.querySelectorAll(".hto-card");
const hto_dots = document.querySelectorAll(".hto-dots li");
const hto_btn_left = document.querySelector(".hto-btn-left");
const hto_btn_right = document.querySelector(".hto-btn-right");

let HTOactive = 0;
let lengthHTOItems = hto_items.length;


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

const hotelOffers = document.getElementById("hoteloffers");
const hOcards = document.querySelectorAll(".hOcards");
const hOprev = document.getElementById("hOprev");
const hOnext = document.getElementById("hOnext");

let hOactive = 0;
let hOItemsLength = hOcards.length;

hOnext.onclick = function () {
  if (hOactive + 1 >= hOItemsLength) {
    hOactive = 0;
  } else {
    hOactive = hOactive + 1;
  }
  reloadhOSlider();
};

hOprev.onclick = function () {
  if (hOactive - 1 < 0) {
    hOactive = hOItemsLength - 1;
  } else {
    hOactive = hOactive - 1;
  }
  reloadhOSlider();
};

function reloadhOSlider() {
  hotelOffers.style.transition = `transform 1s cubic-bezier(0.83, 0, 0.17, 1)`
  hotelOffers.style.transform = `translateX(-${hOactive * (3 * 29.43)}vw)`;
}