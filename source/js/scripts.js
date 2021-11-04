'use strict';
const imagesSlide = document.querySelectorAll(".countries__slider-item");
const buttonsSlide = document.querySelectorAll(".countries__slider-button");
const linksSlide = document.querySelectorAll(".places-visit__link");

const overlayNavigationMain = document.querySelector(".page-header__overlay");
const navigationMain = document.querySelector(".main-navigation");
const navigationToggle = navigationMain.querySelector(".main-navigation__toggle");
const linksNavigationMain = navigationMain.querySelectorAll('.main-navigation__link');

const sliderListCountries = document.querySelector(".countries__slider-list");
const pricesList = document.querySelector(".prices__list");

const body = document.body;
const overlayPopup = document.querySelector(".modal__overlay");

const popupBuy = document.querySelector(".modal-buy__card");
const buttonPopupBuyClose = popupBuy.querySelector(".modal-buy__close");

const popupSuccess = document.querySelector(".modal-success__card");
const buttonPopupSuccessClose = popupSuccess.querySelector(".modal-success__close");

const formBuy = popupBuy.querySelector(".modal-buy__form");
const inputTelModal= formBuy.querySelector(".modal-buy__input--tel");
const inputEmailModal= formBuy.querySelector(".modal-buy__input--email");

const formQuestions = document.querySelector(".questions__form");
const inputTelQuestions= formQuestions.querySelector(".questions__input--tel");
const inputEmailQuestions= formQuestions.querySelector(".questions__input--email");

const buttonWatchTour = document.querySelector(".button--travel-europe");

/*==========ПЕРЕКЛЮЧЕНИЕ СЛАЙДОВ /ТАБОВ/==============*/

sliderListCountries.classList.remove("countries__slider-list--nojs");

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


/*=============ПЕРЕКЛЮЧЕНИЕ НА СЛАЙДЫ /ТАБЫ/ ПРИ НАЖАТИИ НА ССЫЛКИ В РАЗДЕЛЕ СТРАНЫ ============*/

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


/*==============ОТКРЫТИЕ МЕНЮ /НАВИГАЦИИ/ В ПЛАНШЕТНОЙ И ДЕСКТОПНОЙ ВЕРСИИИ ================*/

navigationMain.classList.remove("main-navigation--nojs");


const closeMenu = () => {
  navigationMain.classList.add('main-navigation--closed');
  navigationMain.classList.remove('main-navigation--opened');
  overlayNavigationMain.classList.remove('page-header__overlay--show');
  body.classList.remove('page-body--no-scroll');
};

const openMenu = () => {
  navigationMain.classList.remove('main-navigation--closed');
  navigationMain.classList.add('main-navigation--opened');
  overlayNavigationMain.classList.add('page-header__overlay--show');
  body.classList.add('page-body--no-scroll');
};

navigationToggle.addEventListener("click", () => {
  if (navigationMain.classList.contains("main-navigation--closed")) {
    openMenu();
    return
  }
  closeMenu();
});


//Плавная прокрутка

const scrollSmoothly = (anchorLink) => {
  const blockId = anchorLink.getAttribute('href').substring(1);

  document.getElementById(blockId).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

linksNavigationMain.forEach((linkNavigationMain) => {
  linkNavigationMain.addEventListener('click', (evt) => {
    evt.preventDefault();
    scrollSmoothly(evt.target);
    if (navigationMain.classList.contains('main-navigation--opened')) {
      closeMenu();
    }
  });
});

buttonWatchTour.addEventListener('click', (evt) => {
  evt.preventDefault();
  scrollSmoothly(evt.target);
});



/*======ПРОВЕРКА LocalStorage============*/
let isStorageSupport = true;
let storageTel = "";
let storageEmail = "";

try {
  storageTel = localStorage.getItem("tel");
  storageEmail = localStorage.getItem("email");

} catch (err) {
    isStorageSupport = false;
}

/*========ОТКРЫТИЕ ФОРМЫ "КУПИТЬ ТУР"==========*/

const onButtonOpenClick = (evt) => {
  if(evt.target.matches("a")) {
    evt.preventDefault();
    popupBuy.classList.add("modal-buy__show");
    overlayPopup.classList.add("modal__show");
    body.classList.add("page-body--no-scroll");

    if(storageTel && storageEmail) {
      inputTelModal.value = storageTel;
      inputEmailModal.value = storageEmail;
      inputTelModal.focus();
    } else {
      inputTelModal.focus();
    }
  }
};

sliderListCountries.addEventListener("click",onButtonOpenClick);
pricesList.addEventListener("click",onButtonOpenClick);

/*=========ОТПРАВКА ФОРМ==============*/

formBuy.addEventListener('submit', (evt)  => {
  if (!inputTelModal.value) {
    evt.preventDefault();
  } else {

    if(isStorageSupport) {
      localStorage.setItem("tel",  inputTelModal.value);
      localStorage.setItem("email", inputEmailModal.value);
    }

    popupSuccess.classList.add("modal-success__show");
    popupBuy.classList.remove("modal-buy__show");
    body.classList.add("page-body--no-scroll");
  }
});


formQuestions.addEventListener('submit', (evt)  => {
  if (!inputTelQuestions.value) {
    evt.preventDefault();
  } else {

    if(isStorageSupport) {
      localStorage.setItem("tel",  inputTelQuestions.value);
      localStorage.setItem("email", inputEmailQuestions.value);
    }

    popupSuccess.classList.add("modal-success__show");
    overlayPopup.classList.add("modal__show");
    body.classList.add("page-body--no-scroll");
  }
});

/*================ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН========================*/

const closePopup = () => {
  if (popupBuy.classList.contains("modal-buy__show")) {
    popupBuy.classList.remove("modal-buy__show");
  }

  if (popupSuccess.classList.contains("modal-success__show")) {
    popupSuccess.classList.remove("modal-success__show");
  }

  if (overlayPopup.classList.contains("modal__show")) {
    overlayPopup.classList.remove("modal__show");
    body.classList.remove("page-body--no-scroll");
  }
};

//закрытие окoн "КУПИТЬ ТУР", "ФОРМА ОТПРАВЛЕНА УСПЕШНО" через кнопку
const onButtonCloseClick = (evt) => {
  evt.preventDefault();
  closePopup();
}
buttonPopupBuyClose.addEventListener("click", onButtonCloseClick);
buttonPopupSuccessClose.addEventListener("click", onButtonCloseClick);

//закрытие окон "КУПИТЬ ТУР", "ФОРМА ОТПРАВЛЕНА УСПЕШНО" через Esc

const onDocumentEscKeydown = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    closePopup();
  }
};
document.addEventListener("keydown", onDocumentEscKeydown);


//закрытие окон "КУПИТЬ ТУР", "ФОРМА ОТПРАВЛЕНА УСПЕШНО" через overlay
const onOverlayClick = (evt) => {
  evt.preventDefault();
  closePopup();
};

overlayPopup.addEventListener("click", onOverlayClick);
