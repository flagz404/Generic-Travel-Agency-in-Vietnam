const slide = document.querySelector('.img1_container')
const slide2 = document.querySelector('.img2_container')
const adj = document.querySelector('.adj_container')
const mute_stat = document.querySelector('.mute_status_true')
const mute = document.querySelector('.mute')
const video = document.querySelector('.video')
const plcards = document.querySelector('.p_l_content')
const pecards = document.querySelector('.p_e_content')
const pacards = document.querySelector('.p_a_content')
const signedin = document.getElementById('signedin')
const signedout = document.getElementById('signedout')
let PLcardIndex = 1;
let PAcardIndex = 1;
let PEcardIndex = 1;
let isPLMoving = false;
let isPAMoving = false;
let isPEMoving = false;
let slideIndex = 0;

function checkSignedinOrNot(){
  var LSSignedInStatus = localStorage.getItem("SignedInStatus");
  var SSSignedInStatus = sessionStorage.getItem("SignedInStatus");

  if (LSSignedInStatus === "true" || SSSignedInStatus === "true") {
    signedin.classList.toggle("hidden");
    signedout.classList.toggle("hidden");
  } else {};
}

function moveSlides(){
    slide.style.transform = `translateY(-${slideIndex * 50}vh)`;
    slide2.style.transform = `translateY(-${slideIndex * 100}vh)`;
    adj.style.transform = `translateY(-${slideIndex * 129}px)`;
}

function checkSlides(){
  const slidesArray1 = [...slide.querySelectorAll('img')];
  if(slideIndex === slidesArray1.length){
    slide.style.transition = 'none';
    slide2.style.transition = 'none';
    adj.style.transition = 'none';
    slideIndex = 0;
    moveSlides()
  }
}

setInterval(() => {
  slideIndex += 1;
  slide.style.transition = `transform 2s cubic-bezier(0.83, 0, 0.17, 1)`;
  slide2.style.transition = `transform 2s cubic-bezier(0.83, 0, 0.17, 1)`;
  adj.style.transition = `transform 2s cubic-bezier(0.83, 0, 0.17, 1)`;
  moveSlides();
  checkSlides();
}, 5000);

mute.addEventListener('click', () => {
  video.muted = !video.muted;
  mute_stat.classList.toggle('mute_status_false')
})

function processPLCards(item){
  return `<div class="p_l_card silder_card"><img src="${item.url}" alt="${item.alt}"><div><p>Photo by <a href="${item.artist}" class="credits2" target="_blank">${item.artist_name}</a></p></div><a href="${item.location_link}" class="slider_link">${item.location}</a></div>`;
}

function movePLCards(){
  plcards.style.transform = `translateX(-${PLcardIndex * 565}px)`;
}

function movePLHandler(direction){
  isPLMoving = true;
  plcards.style.transition = `transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)`;
  if(direction === 'right'){
    PLcardIndex += 1
  }
  else{
    PLcardIndex -=1
  }
  movePLCards();
}

async function fetchPLCards(){
  await fetch('./JSON/plcards.json')
    .then((response) => {
      if(!response.ok){
        throw new Error('Network response is not okaying');
      }
      return response.json();
    })
    .then((data) => {
      data.push(data[0]);
      data.push(data[1]);
      data.push(data[2]);
      data.unshift(data[data.length - 4]);
      plcards.innerHTML = data.map(processPLCards).join('');
    movePLCards();
    })
    .catch((error) => {
      console.error('Fetch operation is not fetching, might be a typo in the js script', error);
    })
}
fetchPLCards()

window.addEventListener('keyup', e => {
  if(isPLMoving){
    return;
  }
  switch (e.key){
    case 'ArrowLeft':
      movePLHandler()
      break;
    case 'ArrowRight':
      movePLHandler('right')
      break;
    default:
      break;
  }
})

document.querySelector('.p_l_right').addEventListener('click', () => {
  if(isPLMoving){
    return;
  }
  movePLHandler('right');
})

document.querySelector('.p_l_left').addEventListener('click', () => {
  if(isPLMoving){
    return;
  }
  movePLHandler();
})

plcards.addEventListener('transitionend', () => {
  isPLMoving = false;
    const PLcardsArray = [...plcards.querySelectorAll('div.p_l_card')];
    if(PLcardIndex === 0){
      plcards.style.transition = 'none';
      PLcardIndex = PLcardsArray.length - 4;
      movePLCards()
    }
    if(PLcardIndex === PLcardsArray.length - 3){
      plcards.style.transition = 'none';
      PLcardIndex = 1;
      movePLCards()
    }
})

function processPECards(item){
  return `<div class="p_e_card"><img src="${item.img_src}" alt="${item.img_alt}"><div class="slider_card_desc"><div class="div1"><a href="${item.exp_link}" class="slider_link">${item.exp_name}</a><ul class="p_e_li"><li>${item.exp_item1}</li><li>${item.exp_item2}</li><li>${item.exp_item3}</li><li>${item.exp_item4}</li></ul></div><div class="div2"><div class="p_e_price"><label><label>${item.exp_price}$</label> / night</label></div><button><p>Book</p></button></div></div></div>`;
}

function movePECards(){
  pecards.style.transform = `translateX(-${PEcardIndex * 565}px)`;
}

function movePEHandler(direction){
  isPEMoving = true;
  pecards.style.transition = `transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)`;
  if(direction === 'right'){
    PEcardIndex += 1
  }
  else{
    PEcardIndex -=1
  }
  movePECards();
}

async function fetchPECards(){
  await fetch('./JSON/pecards.json')
    .then((response) => {
      if(!response.ok){
        throw new Error('Network response is not okaying');
      }
      return response.json();
    })
    .then((data) => {
      data.push(data[0]);
      data.push(data[1]);
      data.push(data[2]);
      data.unshift(data[data.length - 4]);
      pecards.innerHTML = data.map(processPECards).join('');
    movePECards();
    })
    .catch((error) => {
      console.error('Fetch operation is not fetching, might be a typo in the js script', error);
    })
}
fetchPECards()

window.addEventListener('keyup', e => {
  if(isPEMoving){
    return;
  }
  switch (e.key){
    case 'ArrowLeft':
      movePEHandler()
      break;
    case 'ArrowRight':
      movePEHandler('right')
      break;
    default:
      break;
  }
})

document.querySelector('.p_e_right').addEventListener('click', () => {
  if(isPEMoving){
    return;
  }
  movePEHandler('right');
})

document.querySelector('.p_e_left').addEventListener('click', () => {
  if(isPEMoving){
    return;
  }
  movePEHandler();
})

pecards.addEventListener('transitionend', () => {
  isPEMoving = false;
    const PEcardsArray = [...pecards.querySelectorAll('div.p_e_card')];
    if(PEcardIndex === 0){
      pecards.style.transition = 'none';
      PEcardIndex = PEcardsArray.length - 4;
      movePECards()
    }
    if(PEcardIndex === PEcardsArray.length - 3){
      pecards.style.transition = 'none';
      PEcardIndex = 1;
      movePECards()
    }
})

function processPACards(item){
  return `<div class="p_a_card"><img src="${item.img_src}" alt="${item.img_alt}"><div class="slider_card_desc"><div class="div1"><a href="#" class="slider_link">${item.accommodation_name}</a><p class="acm_tag">${item.type} | <label class="acm_stars">${item.star_count}</label></p><ul class="p_e_li"><li>${item.item1}</li><li>${item.item2}</li><li>${item.item3}</li><li>${item.item4}</li></ul></div><div class="div2"><p class="p_e_price"><label>${item.price}</label> $ / night</p><button><p>Book</p></button></div></div></div>`;
}

function movePACards(){
  pacards.style.transform = `translateX(-${PAcardIndex * 565}px)`;
}

function movePAHandler(direction){
  isPAMoving = true;
  pacards.style.transition = `transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)`;
  if(direction === 'right'){
    PAcardIndex += 1
  }
  else{
    PAcardIndex -=1
  }
  movePACards();
}

async function fetchPACards(){
  await fetch('./JSON/pacards.json')
    .then((response) => {
      if(!response.ok){
        throw new Error('Network response is not okaying');
      }
      return response.json();
    })
    .then((data) => {
      data.push(data[0]);
      data.push(data[1]);
      data.push(data[2]);
      data.unshift(data[data.length - 4]);
      pacards.innerHTML = data.map(processPACards).join('');
    movePACards();
    })
    .catch((error) => {
      console.error('Fetch operation is not fetching, might be a typo in the js script', error);
    })
}
fetchPACards()

window.addEventListener('keyup', e => {
  if(isPAMoving){
    return;
  }
  switch (e.key){
    case 'ArrowLeft':
      movePAHandler()
      break;
    case 'ArrowRight':
      movePAHandler('right')
      break;
    default:
      break;
  }
})

document.querySelector('.p_a_right').addEventListener('click', () => {
  if(isPAMoving){
    return;
  }
  movePAHandler('right');
})

document.querySelector('.p_a_left').addEventListener('click', () => {
  if(isPAMoving){
    return;
  }
  movePAHandler();
})

pacards.addEventListener('transitionend', () => {
  isPAMoving = false;
    const PAcardsArray = [...pacards.querySelectorAll('div.p_a_card')];
    if(PAcardIndex === 0){
      pacards.style.transition = 'none';
      PAcardIndex = PAcardsArray.length - 4;
      movePACards()
    }
    if(PAcardIndex === PAcardsArray.length - 3){
      pacards.style.transition = 'none';
      PAcardIndex = 1;
      movePACards()
    }
})