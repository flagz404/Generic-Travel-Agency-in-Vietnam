const hto_btn_left = document.querySelector(".hto-btn-left");
const hto_btn_right = document.querySelector(".hto-btn-right");
const hottest_travel_offers = document.querySelector(".hottest-travel-offers");

let HTOslideIndex = 0;

function checkSignedinOrNot(){
    var LSSignedInStatus = localStorage.getItem("SignedInStatus");
    var SSSignedInStatus = sessionStorage.getItem("SignedInStatus");
  
    if (LSSignedInStatus === "true" || SSSignedInStatus === "true") {
      signedin.classList.toggle("hidden");
      signedout.classList.toggle("hidden");
    } else {};
  }

function HTOmoveSlides(){
  hottest_travel_offers.style.transform = `translateX(-${HTOslideIndex * 100}vw)`;
}

function HTOcheckSlides(){
  const HTOslidesArray = [...hottest_travel_offers.querySelectorAll(".hto-card")];
  if(HTOslideIndex === HTOslidesArray.length){
    hottest_travel_offers.style.transition = 'none';
    HTOslideIndex = 0;
    HTOmoveSlides()
  }
}

hto_btn_left.addEventListener