const slide = document.querySelector('.img1_container')
const slide2 = document.querySelector('.img2_container')
const adj = document.querySelector('.adj_container')
const mute_stat = document.querySelector('.mute_status_true')
const mute = document.querySelector('.mute')
const video = document.querySelector('.video')
const plcards = document.querySelector('.p_l_content')
let cardIndex = 1;
let isMoving = false;
let slideIndex = 0;

function processImages(item){
    return `<img src="${item.url}" alt="${item.alt}">`;
}

function moveSlides(){
    slide.style.transform = `translateY(-${slideIndex * 50}vh)`;
    slide2.style.transform = `translateY(-${slideIndex * 100}vh)`;
    adj.style.transform = `translateY(-${slideIndex * 129}px)`;
}

async function fetchImages(){
    await fetch('./JSON/images1.json')
      .then((response) => {
        if(!response.ok){
          throw new Error('Network response is not okaying');
        }
        return response.json();
      })
      .then((data) => {
        data.push(data[0]);
        console.log(data)
        slide.innerHTML = data.map(processImages).join('');
      })
      .catch((error) => {
        console.error('Fetch operation is not fetching, might be a typo in the js script', error);
      })
      await fetch('./JSON/images2.json')
      .then((response) => {
        if(!response.ok){
          throw new Error('Network response is not okaying');
        }
        return response.json();
      })
      .then((data2) => {
        data2.push(data2[0]);
        console.log(data2)
        slide2.innerHTML = data2.map(processImages).join('');
      })
      .catch((error) => {
        console.error('Fetch operation is not fetching, might be a typo in the js script', error);
      })
  }
fetchImages()

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
  slide.style.transition = `transform 2000ms ease-in-out`;
  slide2.style.transition = `transform 2000ms ease-in-out`;
  adj.style.transition = `transform 2000ms ease-in-out`;
  moveSlides();
  checkSlides();
  console.log(slideIndex)
}, 10000);

mute.addEventListener('click', () => {
  video.muted = !video.muted;
  console.log(video.muted);
  mute_stat.classList.toggle('mute_status_false')
})

function processPLCards(item){
  return `<div class="p_l_card"><img src="${item.url}" alt="${item.alt}"><div><p>Photo by <a href="${item.artist}" class="credits2" target="_blank">${item.artist_name}</a></p></div><a href="${item.location_link}" class="p_l_link">${item.location}</a></div>`;
}

function moveCards(){
  plcards.style.transform = `translateX(-${cardIndex * 565}px)`;
}

function moveHandler(direction){
  isMoving = true;
  plcards.style.transition = `transform 400ms ease-in-out`;
  if(direction === 'right'){
    cardIndex += 1
  }
  else{
    cardIndex -=1
  }
  moveCards();
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
      console.log(data)
      plcards.innerHTML = data.map(processPLCards).join('');
    moveCards();
    })
    .catch((error) => {
      console.error('Fetch operation is not fetching, might be a typo in the js script', error);
    })
}
fetchPLCards()

window.addEventListener('keyup', e => {
  if(isMoving){
    return;
  }
  switch (e.key){
    case 'ArrowLeft':
      moveHandler()
      break;
    case 'ArrowRight':
      moveHandler('right')
      break;
    default:
      break;
  }
})

document.querySelector('.p_l_right').addEventListener('click', () => {
  if(isMoving){
    return;
  }
  moveHandler('right');
})

document.querySelector('.p_l_left').addEventListener('click', () => {
  if(isMoving){
    return;
  }
  moveHandler();
})

plcards.addEventListener('transitionend', () => {
  isMoving = false;
    const cardsArray = [...plcards.querySelectorAll('div.p_l_card')];
    if(cardIndex === 0){
      plcards.style.transition = 'none';
      cardIndex = cardsArray.length - 4;
      console.log(cardsArray)
      moveCards()
    }
    if(cardIndex === cardsArray.length - 3){
      plcards.style.transition = 'none';
      cardIndex = 1;
      moveCards()
    }
})