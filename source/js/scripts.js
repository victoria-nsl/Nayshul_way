'use strict';
const MASKED = '+7 (___) ___-__-__';

const body = document.body;

const navigationMain = document.querySelector('.main-navigation');
const navigationToggle = navigationMain.querySelector('.main-navigation__toggle');
const linksNavigationMain = navigationMain.querySelectorAll('.main-navigation__link');

const linksSlide = document.querySelectorAll('.places-visit__link');

const buttonsSlide = document.querySelectorAll('.countries__slider-button');
const sliderListCountries = document.querySelector('.countries__slider-list');
const imagesSlide = sliderListCountries.querySelectorAll('.countries__slider-item');

const pricesList = document.querySelector('.prices__list');

const formQuestions = document.querySelector('.questions__form');
const inputTelQuestions= formQuestions.querySelector('.questions__input--tel');
const inputEmailQuestions= formQuestions.querySelector('.questions__input--email');
const buttonQuestions= formQuestions.querySelector('.button--questions');

const overlayPopupBuy = document.querySelector('.modal-buy');
const popupBuy = overlayPopupBuy.querySelector('.modal-buy__card');
const buttonPopupBuyClose = popupBuy.querySelector('.modal-buy__close');

const overlayPopupSuccess = document.querySelector('.modal-success');
const popupSuccess = overlayPopupSuccess.querySelector('.modal-success__card');
const buttonPopupSuccessClose = popupSuccess.querySelector('.modal-success__close');

const formBuy = popupBuy.querySelector('.modal-buy__form');
const inputTelModal= formBuy.querySelector('.modal-buy__input--tel');
const inputEmailModal= formBuy.querySelector('.modal-buy__input--email');
const buttonModal= formQuestions.querySelector('.button--modal-buy');


const buttonWatchTour = document.querySelector('.button--travel-europe');
const buttonsBuy = document.querySelectorAll('[data-buy]');

/*==============ПЛАВНАЯ ПРОКРУТКА================*/
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


/*==============ОТКРЫТИЕ МЕНЮ /НАВИГАЦИИ/ В ПЛАНШЕТНОЙ И ДЕСКТОПНОЙ ВЕРСИИИ ================*/
navigationMain.classList.remove('main-navigation--nojs');


const closeMenu = () => {
  navigationMain.classList.add('main-navigation--closed');
  navigationMain.classList.remove('main-navigation--opened');
  body.classList.remove('page-body--no-scroll');
};

const openMenu = () => {
  navigationMain.classList.remove('main-navigation--closed');
  navigationMain.classList.add('main-navigation--opened');
  body.classList.add('page-body--no-scroll');
};

navigationToggle.addEventListener('click', () => {
  if (navigationMain.classList.contains('main-navigation--closed')) {
    openMenu();
    return
  }
  closeMenu();
});

/*=============ПЕРЕКЛЮЧЕНИЕ НА СЛАЙДЫ /ТАБЫ/ ПРИ НАЖАТИИ НА ССЫЛКИ В РАЗДЕЛЕ СТРАНЫ ============*/

const showSlide = (imageSlide, linkSlide) => {
  imagesSlide.forEach((image) => {
    if (image.classList.contains('countries__slider-item--current')) {
      image.classList.remove('countries__slider-item--current');
    }
  });

  linksSlide.forEach((link) => {
    if (link.classList.contains('places-visit__link--curent')) {
      link.classList.remove('places-visit__link--curent');
    }
  });

  imageSlide.classList.add('countries__slider-item--current');
  linkSlide.classList.add('places-visit__link--curent');
  scrollSmoothly(linkSlide);
};

linksSlide.forEach((linkSlide,index) => {
  linkSlide.addEventListener('click', (evt) => {
    evt.preventDefault();
    showSlide(imagesSlide[index],linkSlide);
  });
});


/*==========ПЕРЕКЛЮЧЕНИЕ СЛАЙДОВ /ТАБОВ/==============*/

sliderListCountries.classList.remove('countries__slider-list--nojs');

const changeSlide = (imageSlide, buttonSlide) => {

  imagesSlide.forEach((slide) => {
    if (slide.classList.contains('countries__slider-item--current')) {
      slide.classList.remove('countries__slider-item--current');
    }
  });

  buttonsSlide.forEach((button) => {
    if (button.classList.contains('countries__slider-button--current')) {
      button.classList.remove('countries__slider-button--current');
    }
  });

  imageSlide.classList.add('countries__slider-item--current');
  buttonSlide.classList.add('countries__slider-button--current');
};


buttonsSlide.forEach((buttonSlide,index) => {
  buttonSlide.addEventListener('click', () => {
    changeSlide(imagesSlide[index],buttonSlide);
  });
});



/*======ПРОВЕРКА LocalStorage============*/
let isStorageSupport = true;
let storageTel = '';
let storageEmail = '';

const setItemLocalStorage = (phone, email) => {
  try {
    storageTel = localStorage.getItem('tel');
    storageEmail = localStorage.getItem('email');
  } catch (err) {
    isStorageSupport = false;
  }

  if (storageTel || storageEmail) {
    phone.value = storageTel || '';
    email.value = storageEmail || '' ;
  }
};

setItemLocalStorage (inputTelQuestions, inputEmailQuestions);


/*========ОТКРЫТИЕ ФОРМЫ "КУПИТЬ ТУР"==========*/
const openPopup = () => {
  popupBuy.classList.add('modal-buy__show-card');
  overlayPopupBuy.classList.add('modal-buy__show-overlay');
  body.classList.add('page-body--no-scroll');
  inputTelModal.focus();
  setItemLocalStorage (inputTelModal, inputEmailModal);
};

buttonsBuy.forEach((buttonBuy) => {
  buttonBuy.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPopup();
  });
});

/*================ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН========================*/
const closePopup = () => {
  if (popupBuy.classList.contains('modal-buy__show-card')) {
    popupBuy.classList.remove('modal-buy__show-card');
  }

  if (popupSuccess.classList.contains('modal-success__show-card')) {
    popupSuccess.classList.remove('modal-success__show-card');
  }

  if (overlayPopupBuy.classList.contains('modal-buy__show-overlay')) {
    overlayPopupBuy.classList.remove('modal-buy__show-overlay');
    body.classList.remove('page-body--no-scroll');
  }

  if (overlayPopupSuccess.classList.contains('modal-success__show-overlay')) {
    overlayPopupSuccess.classList.remove('modal-success__show-overlay');
    body.classList.remove('page-body--no-scroll');
  }

  setItemLocalStorage (inputTelQuestions, inputEmailQuestions);
};

//закрытие окoн "КУПИТЬ ТУР", "ФОРМА ОТПРАВЛЕНА УСПЕШНО" через кнопку
const onButtonCloseClick = (evt) => {
  evt.preventDefault();
  closePopup();
}
buttonPopupBuyClose.addEventListener('click', onButtonCloseClick);
buttonPopupSuccessClose.addEventListener('click', onButtonCloseClick);

//закрытие окон "КУПИТЬ ТУР", "ФОРМА ОТПРАВЛЕНА УСПЕШНО" через Esc
const onDocumentEscKeydown = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    closePopup();
  }
};
document.addEventListener('keydown', onDocumentEscKeydown);


//закрытие окон "КУПИТЬ ТУР", "ФОРМА ОТПРАВЛЕНА УСПЕШНО" через overlay

const onOverlayClick = (evt) => {
  if (evt.target.matches('section')) { //останавливает погружение
    evt.stopPropagation(); //останавливает всплытие
    closePopup();
  }
};

overlayPopupBuy.addEventListener('click', onOverlayClick);
overlayPopupSuccess.addEventListener('click', onOverlayClick);

/*=========ОТПРАВКА ФОРМ==============*/

formQuestions.addEventListener('submit', (evt)  => {
  if (!inputTelQuestions.value || !inputEmailQuestions.value) {
    evt.preventDefault();
  } else {
    popupSuccess.classList.add('modal-success__show-card');
    overlayPopupSuccess.classList.add('modal-success__show-overlay');
    body.classList.add('page-body--no-scroll');

    if(isStorageSupport) {
      localStorage.setItem('tel', inputTelQuestions.value);
      localStorage.setItem('email', inputEmailQuestions.value);
    }
  }
});

formBuy.addEventListener('submit', (evt)  => {
  if (!inputTelModal.value || !inputEmailModal.value) {
    evt.preventDefault();
  } else {
    popupSuccess.classList.add('modal-success__show-card');
    overlayPopupSuccess.classList.add('modal-success__show-overlay');
    popupBuy.classList.remove('modal-buy__show-card');
    overlayPopupBuy.classList.remove('modal-buy__show-overlay');

    if(isStorageSupport) {
      localStorage.setItem('tel', inputTelModal.value);
      localStorage.setItem('email',  inputEmailModal.value);
    }
  }
});

/*======================МАСКА ДЛЯ ТЕЛЕФОНА=======================*/

const checkMask = (evt) => {

  const keyCode = evt.key;
  const template = MASKED;
  const templateNumbersValue = template.replace(/\D/g, '');
  const inputNumbersValue = evt.target.value.replace(/\D/g, '');

  let i = 0;
  let  newValue = template
    .replace(/[_\d]/g, (a) => i < inputNumbersValue.length ? inputNumbersValue.charAt(i++) ||  templateNumbersValue.charAt(i) : a);

  i = newValue.indexOf('_');

  if (i !== -1) {
    newValue = newValue.slice(0, i);
  }

  let reg = template.substring(0, evt.target.value.length)
    .replace(/_+/g, (a) => `\\d{1,${ a.length}}`)
    .replace(/[+()]/g, '\\$&'); reg = new RegExp(`^${reg}$`);

  if (!reg.test(evt.target.value) || evt.target.value.length < 5 || keyCode > 47 && keyCode < 58) {
    evt.target.value = newValue;
  }

  if (evt.type === 'blur' && evt.target.value.length < 5) {
    evt.target.value = '';
  }
}

inputTelQuestions.addEventListener('input', checkMask);
inputTelQuestions.addEventListener('focus', checkMask);
inputTelQuestions.addEventListener('blur', checkMask);

inputTelModal.addEventListener('input', checkMask);
inputTelModal.addEventListener('focus', checkMask);
inputTelModal.addEventListener('blur', checkMask);

/*======================ВАЛИДАЦИЯ=======================*/

const showError = (inputTel) => {
  if (inputTel.validity.tooShort) {
    inputTel.setCustomValidity(' Введите 10 цифр номера');
  } else if (inputTel.validity.valueMissing) {
    inputTel.setCustomValidity('Обязательное поле');
  } else {
    inputTel.setCustomValidity('');
  }
};

buttonQuestions.addEventListener('click', ()  => {
  showError(inputTelQuestions);
});

buttonModal.addEventListener('click', ()  => {
  showError(inputTelQuestions);
});
