const header = document.querySelector('.header');
const sections = document.querySelectorAll('.section');
const aboutSection = document.querySelector('#section--about');

const nav = document.querySelector('.nav');
const navHeight = nav.getBoundingClientRect().height;

const contactModal = document.querySelector('.contactmodal');
const contactOverlay = document.querySelector('.contactmodal__overlay');
const sliderOverlay = document.querySelector('.slide__overlay');

const btnCloseContact = document.querySelector('.btn--close-modal');
const btnCloseSlider = document.querySelectorAll('.btn--close-slider');
const btnOpenContact = document.querySelectorAll('.btn--show-modal');
const btnsOpenSlider = document.querySelectorAll('.btn--show-slider');
const learnBtnScroll = document.querySelector('.btn--scroll-to');

const imgs = document.querySelectorAll('img[data-src]');

const openContactModal = function (e) {
  e.preventDefault();
  contactModal.classList.remove('hidden');
  contactOverlay.classList.remove('hidden');
};

const openSlider = function (event) {
  event.preventDefault();
  const sliderNum = event.target.dataset.project;
  const sliderModal = document.querySelector(`.modal__slider--${sliderNum}`);

  sliderOverlay.dataset.slider = `${sliderNum}`;
  sliderModal.classList.remove('hidden');
  sliderOverlay.classList.remove('hidden');
 
  slider(sliderModal);
};

const closeContactModal = function() {
  contactModal.classList.add('hidden');
  contactOverlay.classList.add('hidden');
};

const closeSlider = function (event) {
  let sliderNum;

  if(event.target.dataset.sliderModal)
    sliderNum = event.target.dataset.sliderModal;
  else {
    sliderNum = event.target.dataset.slider;
    event.target.dataset.slider = '';
  }

  const sliderModal = document.querySelector(`.modal__slider--${sliderNum}`);
  sliderModal.classList.add('hidden');
  sliderOverlay.classList.add('hidden');
};

// navigation fade on hover
const navHover = function (event) {
  if (event.target.classList.contains('nav__link')) {
    const navlink = event.target;
    const siblings = navlink.closest('.nav').querySelectorAll('.nav__link');
    const logo = navlink.closest('.nav').querySelector('img');

    siblings.forEach(element => {
      if (element !== navlink) element.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//sticky navigation
const stickyNav = function (entries) {
  const [entry] = entries;
  
  !entry.isIntersecting ? nav.classList.add('sticky') : nav.classList.remove('sticky');
};

// reveal on scroll
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

// Lazy loading images
const loadImgs = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

// Slider
const createDots = function (slides, dotContainer) {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const slider = function (parent) {
  const slides = parent.querySelectorAll('.slide');
  const btnLeft = parent.querySelector('.slider__btn--left');
  const btnRight = parent.querySelector('.slider__btn--right');
  const dotContainer = parent.querySelector('.dots');
  const dots = dotContainer.querySelector('.dots__dot');

  let currentSlide = 0;
  const maxSlide = slides.length;
  
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else 
      currentSlide++;

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  
  if(!dots)
    createDots(slides,dotContainer);
  goToSlide(0);
  activateDot(0);

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (event) {
    if (event.keventy === 'ArrowLeft') prevSlide();
    event.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('dots__dot')) {
      const { slide } = event.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

//Observers
//sticky navigation observer
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

//section reveal observer
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.19,
});

//lazy load observer
const imgObserver = new IntersectionObserver(loadImgs, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});


headerObserver.observe(header);

sections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

imgs.forEach(img => imgObserver.observe(img));

//EVENT LISTENERS
//navigation hover
nav.addEventListener('mouseover', navHover.bind(0.5));
nav.addEventListener('mouseout', navHover.bind(1));

//navigation smooth scroll
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//learn button scroll to about section
learnBtnScroll.addEventListener('click', function () {
  aboutSection.scrollIntoView({ behavior: 'smooth' });
});

//contact modal event
btnOpenContact.forEach(btn => btn.addEventListener('click', openContactModal));
btnCloseContact.addEventListener('click', closeContactModal);
contactOverlay.addEventListener('click', closeContactModal);

//slider modal events
btnsOpenSlider.forEach(btn => btn.addEventListener('click', openSlider));
btnCloseSlider.forEach(btn => btn.addEventListener('click',closeSlider));
sliderOverlay.addEventListener('click', closeSlider);





