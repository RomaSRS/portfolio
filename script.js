let education_btn = document.getElementById('education_btn');
let education_panel = document.getElementById('education_panel');

education_btn.addEventListener('click', function() {
  this.classList.toggle('active');
  education_panel.classList.toggle('show');
});

let sw_btn_1 = document.getElementById('sw_btn_1');
let descr_1 = document.getElementById('descr_1');

sw_btn_1.addEventListener('click', function() {
  console.log("kjsdhfkjsdhf");
  descr_1.classList.toggle('descr_show');
});

let sw_btn_2 = document.getElementById('sw_btn_2');
let descr_2 = document.getElementById('descr_2');

sw_btn_2.addEventListener('click', function() {
  descr_2.classList.toggle('descr_show');
});

let sw_btn_3 = document.getElementById('sw_btn_3');
let descr_3 = document.getElementById('descr_3');

sw_btn_3.addEventListener('click', function() {
  descr_3.classList.toggle('descr_show');
});

let sw_btn_4 = document.getElementById('sw_btn_4');
let descr_4 = document.getElementById('descr_4');

sw_btn_4.addEventListener('click', function() {
  descr_4.classList.toggle('descr_show');
});

// Slider with buttons
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName('proj-slider');
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
  }
  slides[slideIndex-1].style.display = 'flex';
}

function swipedetect(el, callback){
  let touchsurface = el,
      swipedir,
      startX,
      startY,
      distX,
      distY,
      threshold = 150,
      restraint = 100,
      allowedTime = 300,
      elapsedTime,
      startTime,
      handleswipe = callback || function(swipedir){};

  touchsurface.addEventListener('touchstart', function(e){
    let touchobj = e.changedTouches[0];
        swipedir = 'none';
        dist = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime();
  }, false);

  touchsurface.addEventListener('touchend', function(e){
    let touchobj = e.changedTouches[0];
    distX = touchobj.pageX - startX;
    distY = touchobj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
    if (elapsedTime <= allowedTime){
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ 
        swipedir = (distX < 0)? 'left' : 'right'; 
      }
      else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){
        swipedir = (distY < 0)? 'up' : 'down';
      }
    }
    handleswipe(swipedir);
  }, false);
}

let el = document.getElementById('swipezone');

swipedetect(el, function(swipedir) {
  if (swipedir === 'left') plusSlides(1);
  if (swipedir === 'right') plusSlides(-1);
});

let iwrap = document.getElementById('iwrap');
let iframe = document.getElementById('iframe');
let mode_btn = document.getElementById('mode-button');

const getBlock = (id, url) => {
  document.getElementById(id).addEventListener('click', () => {
    iwrap.style.display = 'flex';
    iframe.src = url;
    mode_btn.innerText = 'Mobile';
    iframe.style.width = '100%';
  });
};

getBlock('ce_btn', './assets/certificate.png');
getBlock('re_btn', './projects/repair-design-project/index.html');
getBlock('th_btn', './projects/theyalow/index.html');
getBlock('fa_btn', './projects/fancy-weather/index.html');
getBlock('pi_btn', './projects/simple-piskel-clone/dist/index.html');

let back_btn = document.getElementById('back-button');
back_btn.addEventListener('click', () => {
  iwrap.style.display = 'none';
});

mode_btn.addEventListener('click', () => {
  mode_btn.innerText = mode_btn.innerText === 'Desktop' ? 'Mobile' : 'Desktop';
  iframe.style.width = mode_btn.innerText === 'Mobile' ?  '100%' : '375px';
});