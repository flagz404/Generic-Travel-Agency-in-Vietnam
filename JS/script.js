const slide = document.querySelector('.img1_container')
const slide2 = document.querySelector('.img2_container')
const adj = document.querySelector('.adj_container')
let slideIndex = 1;

function processImages(item){
    return `<img src="${item.url}" alt="${item.alt}">`;
}

function moveSlides(){
    slide.style.transform = `translateY(-${slideIndex * 50}vh)`;
    slide2.style.transform = `translateY(-${slideIndex * 100}vh)`;
    adj.style.transform = `translateY(-${slideIndex * 113}%)`;
}

function animateSlides(){
  slide.style.transition = `transform 2000ms ease-in-out`;
  slide2.style.transition = `transform 2000ms ease-in-out`;
  adj.style.transition = `transform 2000ms ease-in-out`;
  slideIndex += 1;
  moveSlides();
}

async function fetchImages(){
    await fetch('images1.json')
      .then((response) => {
        if(!response.ok){
          throw new Error('Network response is not okaying');
        }
        return response.json();
      })
      .then((data) => {
        data.push(data[0]);
        data.unshift(data[data.length - 2]);
        console.log(data)
        slide.innerHTML = data.map(processImages).join('');
      moveSlides();
      })
      .catch((error) => {
        console.error('Fetch operation is not fetching, might be a typo in the js script', error);
      })
      await fetch('images2.json')
      .then((response) => {
        if(!response.ok){
          throw new Error('Network response is not okaying');
        }
        return response.json();
      })
      .then((data2) => {
        data2.push(data2[0]);
        data2.unshift(data2[data2.length - 2]);
        console.log(data2)
        slide2.innerHTML = data2.map(processImages).join('');
      moveSlides();
      })
      .catch((error) => {
        console.error('Fetch operation is not fetching, might be a typo in the js script', error);
      })
  }
fetchImages()

function checkSlides(){
  const slidesArray1 = [...slide.querySelectorAll('img')];
  const slidesArray2 = [...slide2.querySelectorAll('img')];
  const slidesArray3 = [...adj.querySelectorAll('p')];
  if(slideIndex === 0){
    slide.style.transition = 'none';
    slide2.style.transition = 'none';
    adj.style.transition = 'none';
    slideIndex = slidesArray1.length - 2;
    moveSlides()
  }
  if(slideIndex === slidesArray1.length -1){
    slide.style.transition = 'none';
    slide2.style.transition = 'none';
    adj.style.transition = 'none';
    slideIndex = 1;
    moveSlides()
  }
}

setInterval(() => {
  animateSlides();
  checkSlides();
}, 10000);