'use strict';
const imagesSlide = document.querySelectorAll(".countries__slider-item");
const buttonsSlide = document.querySelectorAll(".countries__slider-button");
const linksSlide = document.querySelectorAll(".places-visit__link");

const navigationMain = document.querySelector(".main-navigation");
const navigationToggle = navigationMain.querySelector(".main-navigation__toggle");

const formQuestions = document.querySelector(".questions__form");
const buttonsPrices = document.querySelectorAll(".button--prices");
const buttonsCountries = document.querySelectorAll(".button--countries");

const overlayPopup = document.querySelector(".modal__overlay");

const popupBuy = document.querySelector(".modal-buy__card");
const buttonPopupBuyClose = popupBuy.querySelector(".modal-buy__close");
const formBuy = popupBuy.querySelector(".modal-buy__form");
const inputTel= formBuy.querySelector(".modal-buy__input--tel");

const popupSuccess = document.querySelector(".modal-success__card");
const buttonPopupSuccessClose = popupSuccess.querySelector(".modal-success__close");

//Cлайдер для табов
const changeSlide = (imageSlide, buttonSlide) => {

  imagesSlide.forEach((slide) => {
    if (slide.classList.contains("countries__slider-item--current")) {
      slide.classList.remove("countries__slider-item--current");
    }
  });

  buttonsSlide.forEach((button) => {
    if (button.classList.contains("countries__slider-button--current")) {
      button.classList.remove("countries__slider-button--current");
    }
  });

  imageSlide.classList.add("countries__slider-item--current");
  buttonSlide.classList.add("countries__slider-button--current");
};


buttonsSlide.forEach((buttonSlide,index) => {
  buttonSlide.addEventListener("click", () => {
    changeSlide(imagesSlide[index],buttonSlide);
  });
});


//Ссылки на табы
const showSlide = (imageSlide, linkSlide) => {
  imagesSlide.forEach((image) => {
    if (image.classList.contains("countries__slider-item--current")) {
      image.classList.remove("countries__slider-item--current");
    }
  });

  linksSlide.forEach((link) => {
    if (link.classList.contains("places-visit__link--curent")) {
      link.classList.remove("places-visit__link--curent");
    }
  });

  imageSlide.classList.add("countries__slider-item--current");
  linkSlide.classList.add("places-visit__link--curent");
};

linksSlide.forEach((linkSlide,index) => {
  linkSlide.addEventListener("click", () => {
    showSlide(imagesSlide[index],linkSlide);
  });
});


// Кнопка, навигация в планшетной, мобильной версии
navigationMain.classList.remove("main-navigation--nojs");

navigationToggle.addEventListener("click", () => {
  if (navigationMain.classList.contains("main-navigation--closed")) {
    navigationMain.classList.remove("main-navigation--closed");
    navigationMain.classList.add("main-navigation--opened");
  } else {
    navigationMain.classList.add("main-navigation--closed");
    navigationMain.classList.remove("main-navigation--opened");
  }
});


//ФОРМА "У ВАС ОСТАЛИСЬ ВОПРОСЫ"

formQuestions.addEventListener('submit', (evt) => {
  evt.preventDefault();
    popupSuccess.classList.add("modal-success__show");
    overlayPopup.classList.add("modal__show");
});


//ФОРМА "КУПИТЬ ТУР"
buttonsPrices.forEach((buttonPrices) => {
  buttonPrices.addEventListener("click", (evt) => {
  evt.preventDefault();
  popupBuy.classList.add("modal-buy__show");
  overlayPopup.classList.add("modal__show");
  inputTel.focus();
  });
});

buttonsCountries.forEach((buttonCountries) => {
  buttonCountries.addEventListener("click", (evt) => {
    evt.preventDefault();
    popupBuy.classList.add("modal-buy__show");
    overlayPopup.classList.add("modal__show");
    inputTel.focus();
  });
});

formBuy.addEventListener('submit', (evt) => {
  evt.preventDefault();
    popupSuccess.classList.add("modal-success__show");
});


//закрытие окна "КУПИТЬ ТУР" через кнопку
buttonPopupBuyClose.addEventListener("click", () => {
  popupBuy.classList.remove("modal-buy__show");
  overlayPopup.classList.remove("modal__show");
});

//закрытие окна "ФОРМА ОТПРАВЛЕНА УСПЕШНО" через кнопку
buttonPopupSuccessClose.addEventListener("click", () => {

  if (popupSuccess.classList.contains("modal-success__show")) {
    popupSuccess.classList.remove("modal-success__show");
  }

  if (popupBuy.classList.contains("modal-buy__show")) {
    popupBuy.classList.remove("modal-buy__show");
  }

  if (overlayPopup.classList.contains("modal__show")) {
    overlayPopup.classList.remove("modal__show");
  }
});

//закрытие окон "КУПИТЬ ТУР", "ФОРМА ОТПРАВЛЕНА УСПЕШНО" через Esc
window.addEventListener("keydown", (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();

    if (popupSuccess.classList.contains("modal-success__show")) {
      popupSuccess.classList.remove("modal-success__show");
    }

    if (popupBuy.classList.contains("modal-buy__show")) {
      popupBuy.classList.remove("modal-buy__show");
    }

    if ( overlayPopup.classList.contains("modal__show")) {
      overlayPopup.classList.remove("modal__show");
    }
  }
});

//закрытие окон "КУПИТЬ ТУР", "ФОРМА ОТПРАВЛЕНА УСПЕШНО" через overlay
overlayPopup.addEventListener("click", () => {
  if (popupSuccess.classList.contains("modal-success__show")) {
    popupSuccess.classList.remove("modal-success__show");
  }

  if (popupBuy.classList.contains("modal-buy__show")) {
    popupBuy.classList.remove("modal-buy__show");
  }

  if (overlayPopup.classList.contains("modal__show")) {
    overlayPopup.classList.remove("modal__show");
  }
});
