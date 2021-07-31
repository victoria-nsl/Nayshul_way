//Cлайдер для табов

const imagesSlide = document.querySelectorAll(".countries__slider-item");
const buttonsSlide = document.querySelectorAll(".countries__slider-button");
const linksSlide = document.querySelectorAll(".places-visit__link");

const changeSlide = function (imagesSlide, buttonsSlide, index) {
  for (let i = 0; i < imagesSlide.length; i++) {
    if (imagesSlide[i].classList.contains("countries__slider-item--current")) {
      imagesSlide[i].classList.remove("countries__slider-item--current");
    }
  }
  imagesSlide[index].classList.add("countries__slider-item--current");

  for (let q = 0; q < buttonsSlide.length; q++) {
    if (buttonsSlide[q].classList.contains("countries__slider-button--current")) {
      buttonsSlide[q].classList.remove("countries__slider-button--current");
    }
  }
  buttonsSlide[index].classList.add("countries__slider-button--current");
};

for (let counter = 0; counter < buttonsSlide.length; counter++) {
  buttonsSlide[counter].addEventListener("click", function () {
    changeSlide(imagesSlide,buttonsSlide, counter);
  });
}

//Ссылки на табы

const showSlide = function (imagesSlide, linksSlide, index) {
  for (let i = 0; i < imagesSlide.length; i++) {
    if (imagesSlide[i].classList.contains("countries__slider-item--current")) {
      imagesSlide[i].classList.remove("countries__slider-item--current");
    }
  }
  imagesSlide[index].classList.add("countries__slider-item--current");

  for (let q = 0; q < linksSlide.length; q++) {
    if (linksSlide[q].classList.contains("places-visit__link--curent")) {
      linksSlide[q].classList.remove("places-visit__link--curent");
    }
  }
  linksSlide[index].classList.add("places-visit__link--curent");
};

for (let counter = 0; counter < linksSlide.length; counter++) {
  linksSlide[counter].addEventListener("click", function () {
    showSlide(imagesSlide,linksSlide, counter);
  });
}

// Кнопка, навигация в планшетной, десктопной версии

const navMain = document.querySelector(".main-navigation");
const navToggle = navMain.querySelector(".main-navigation__toggle");

navMain.classList.remove("main-navigation--nojs");

navToggle.addEventListener("click", function() {
  if (navMain.classList.contains("main-navigation--closed")) {
    navMain.classList.remove("main-navigation--closed");
    navMain.classList.add("main-navigation--opened");
  } else {
    navMain.classList.add("main-navigation--closed");
    navMain.classList.remove("main-navigation--opened");
  }
});
