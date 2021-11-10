(function () {
  const FIRST_SYMBOLS ='+7 ';

  const body = document.body;

  const navigationMain = document.querySelector('.main-navigation');
  const navigationToggle = navigationMain.querySelector('.main-navigation__toggle');
  const linksNavigationMain = navigationMain.querySelectorAll('.main-navigation__link');

  const linksSlide = document.querySelectorAll('.places-visit__link');

  const sliderCountries = document.querySelector('.countries__slider');
  const buttonsSlide = sliderCountries.querySelectorAll('.countries__slider-button');
  const imagesSlide = sliderCountries.querySelectorAll('.countries__slider-item');

  const formQuestions = document.querySelector('.questions__form');
  const inputTelQuestions= formQuestions.querySelector('.questions__input--tel');
  const inputEmailQuestions= formQuestions.querySelector('.questions__input--email');
  const buttonQuestions= formQuestions.querySelector('.button--questions');

  const overlayPopupBuy = document.querySelector('.modal-buy');
  const buttonPopupBuyClose = overlayPopupBuy.querySelector('.modal-buy__close');

  const overlayPopupSuccess = document.querySelector('.modal-success');
  const buttonPopupSuccessClose = overlayPopupSuccess.querySelector('.modal-success__close');

  const formBuy = overlayPopupBuy.querySelector('.modal-buy__form');
  const inputTelModal= formBuy.querySelector('.modal-buy__input--tel');
  const inputEmailModal= formBuy.querySelector('.modal-buy__input--email');
  const buttonModal= formBuy.querySelector('.button--modal-buy');

  const buttonWatchTour = document.querySelector('.button--travel-europe');
  const buttonsBuy = document.querySelectorAll('[data-buy]');

  /*==============ОТКРЫТИЕ МЕНЮ /НАВИГАЦИИ/ В ПЛАНШЕТНОЙ И ДЕСКТОПНОЙ ВЕРСИИИ ================*/
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

  if (navigationMain) {
    navigationMain.classList.remove('main-navigation--nojs');

    navigationToggle.addEventListener('click', () => {
      if (navigationMain.classList.contains('main-navigation--closed')) {
        openMenu();
        return;
      }
      closeMenu();
    });
  }

  /*==============ПЛАВНАЯ ПРОКРУТКА================*/
  const scrollSmoothly = (anchorLink) => {
    const blockId = anchorLink.getAttribute('href').substring(1);

    document.getElementById(blockId).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  if (navigationMain) {
    linksNavigationMain.forEach((linkNavigationMain) => {
      linkNavigationMain.addEventListener('click', (evt) => {
        evt.preventDefault();
        scrollSmoothly(evt.target);
        if (navigationMain.classList.contains('main-navigation--opened')) {
          closeMenu();
        }
      });
    });
  }

  if (buttonWatchTour) {
    buttonWatchTour.addEventListener('click', (evt) => {
      evt.preventDefault();
      scrollSmoothly(evt.target);
    });
  }

  /*==========ПЕРЕКЛЮЧЕНИЕ СЛАЙДОВ /ТАБОВ/==============*/
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

  if (sliderCountries) {
    sliderCountries.classList.remove('countries__slider--nojs');

    buttonsSlide.forEach((buttonSlide,index) => {
      buttonSlide.addEventListener('click', () => {
        changeSlide(imagesSlide[index],buttonSlide);
      });
    });
  }

  /*=====ПЕРЕКЛЮЧЕНИЕ НА СЛАЙДЫ /ТАБЫ/ ПРИ НАЖАТИИ НА ССЫЛКИ В РАЗДЕЛЕ СТРАНЫ ============*/
  const showSlide = (imageSlide, linkSlide, buttonSlide) => {
    linksSlide.forEach((link) => {
      if (link.classList.contains('places-visit__link--curent')) {
        link.classList.remove('places-visit__link--curent');
      }
    });
    linkSlide.classList.add('places-visit__link--curent');
    changeSlide(imageSlide,buttonSlide);
    scrollSmoothly(linkSlide);
  };

  if (linksSlide && sliderCountries) {
    linksSlide.forEach((linkSlide,index) => {
      linkSlide.addEventListener('click', (evt) => {
        evt.preventDefault();
        showSlide(imagesSlide[index],linkSlide, buttonsSlide[index]);
      });
    });
  }

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

  if (inputTelQuestions && inputEmailQuestions) {
    setItemLocalStorage(inputTelQuestions, inputEmailQuestions);
  }

  /*================ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН========================*/
  const closePopup = () => {
    if (overlayPopupBuy.classList.contains('modal-buy__show-overlay')) {
      overlayPopupBuy.classList.remove('modal-buy__show-overlay');
    }
    if (overlayPopupSuccess.classList.contains('modal-success__show-overlay')) {
      overlayPopupSuccess.classList.remove('modal-success__show-overlay');
    }
    setItemLocalStorage (inputTelQuestions, inputEmailQuestions);
    body.classList.remove('page-body--no-scroll');
  };

  const onOverlayClick = (evt) => {
    if (evt.target.matches('section')) { //останавливает погружение
      evt.stopPropagation(); //останавливает всплытие
      closePopup();
    }
  };

  const onButtonCloseClick = (evt) => {
    evt.preventDefault();
    closePopup();
  };

  if (overlayPopupBuy) {
    overlayPopupBuy.addEventListener('click', onOverlayClick);
    buttonPopupBuyClose.addEventListener('click', onButtonCloseClick);
  }

  if (overlayPopupSuccess) {
    overlayPopupSuccess.addEventListener('click', onOverlayClick);
    buttonPopupSuccessClose.addEventListener('click', onButtonCloseClick);
  }

  /*========ОТКРЫТИЕ ФОРМЫ "КУПИТЬ ТУР"==========*/
  //ОБРАБОТЧИК ESC/
  const onDocumentEscKeydown = (evt) => {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      closePopup();
      document.removeEventListener('keydown', onDocumentEscKeydown);
    }
  };

  const openPopupBuy = () => {
    overlayPopupBuy.classList.add('modal-buy__show-overlay');
    body.classList.add('page-body--no-scroll');
    inputTelModal.focus();
    setItemLocalStorage (inputTelModal, inputEmailModal);
    document.addEventListener('keydown', onDocumentEscKeydown);
  };

  if (buttonsBuy) {
    buttonsBuy.forEach((buttonBuy) => {
      buttonBuy.addEventListener('click', (evt) => {
        evt.preventDefault();
        openPopupBuy();
      });
    });
  }

  /*======================ВАЛИДАЦИЯ=======================*/
  const showError = (inputTel, inputEmail) => {
    if (inputTel.value.length < 18) {
      inputTel.setCustomValidity(' Введите 10 цифр номера');
      inputTel.classList.add('page-main__input-error');
    } else {
      inputTel.setCustomValidity('');
      inputTel.classList.remove('page-main__input-error');
    }

    if (!inputEmail.validity.valid) {
      inputEmail.classList.add('page-main__input-error');
    } else {
      inputEmail.classList.remove('page-main__input-error');
    }
  };

  if (formQuestions) {
    buttonQuestions.addEventListener('click', ()  => {
      showError(inputTelQuestions,inputEmailQuestions );
    });
  }

  if (formBuy) {
    buttonModal.addEventListener('click', ()  => {
      showError(inputTelModal, inputEmailModal);
    });
  }


  /*=========ОТПРАВКА ФОРМ==============*/
  if (formQuestions) {
    formQuestions.addEventListener('submit', (evt)  => {
      if (inputTelQuestions.value.length < 18 || !inputEmailQuestions.value) {
        evt.preventDefault();
      } else {
        overlayPopupSuccess.classList.add('modal-success__show-overlay');
        body.classList.add('page-body--no-scroll');
        document.addEventListener('keydown', onDocumentEscKeydown);

        if(isStorageSupport) {
          localStorage.setItem('tel', inputTelQuestions.value);
          localStorage.setItem('email', inputEmailQuestions.value);
        }
      }
    });
  }

  if (formBuy) {
    formBuy.addEventListener('submit', (evt)  => {
      if (inputTelModal.value.length < 18 || !inputEmailModal.value) {
        evt.preventDefault();
      } else {
        overlayPopupSuccess.classList.add('modal-success__show-overlay');

        if(isStorageSupport) {
          localStorage.setItem('tel', inputTelModal.value);
          localStorage.setItem('email',  inputEmailModal.value);
        }
        overlayPopupBuy.classList.remove('modal-buy__show-overlay');
      }
    });
  }

  /*======================МАСКА ДЛЯ ТЕЛЕФОНА=======================*/
  const getInputNumbersValue = (input) => input.value.replace(/\D/g, '');

  const onPhoneFocus = (evt) =>  {
    if (!evt.target.value) {
      evt.target.value = FIRST_SYMBOLS;
    }
  };

  const onPhoneBlur = (evt) =>  {
    if (evt.target.value.length < 4 ) {
      evt.target.value = '';
    }
  };

  const onPhoneInput = (evt) => {
    const input = evt.target;
    const inputNumbersValue = getInputNumbersValue(input);
    let  formattedInputValue  = FIRST_SYMBOLS;
    if (!inputNumbersValue) {
      return input.value = '';
    }

    const selectionStart = input.selectionStart;

    if (input.value.length !== selectionStart) {
      if (evt.data && /\D/g.test(evt.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (inputNumbersValue.length > 1) {
      formattedInputValue +=  `(${inputNumbersValue.substring(1, 4)}`;
    }

    if (inputNumbersValue.length >= 5) {
      formattedInputValue += `) ${inputNumbersValue.substring(4, 7)}`;
    }

    if (inputNumbersValue.length >= 8) {
      formattedInputValue += `-${inputNumbersValue.substring(7, 9)}`;
    }

    if (inputNumbersValue.length >= 10) {
      formattedInputValue += `-${inputNumbersValue.substring(9, 11)}`;
    }

    input.value = formattedInputValue;
  };

  if (formQuestions) {
    inputTelQuestions.addEventListener('input', onPhoneInput);
    inputTelQuestions.addEventListener('focus', onPhoneFocus);
    inputTelQuestions.addEventListener('blur', onPhoneBlur);
  }

  if (formBuy) {
    inputTelModal.addEventListener('input', onPhoneInput);
    inputTelModal.addEventListener('focus', onPhoneFocus);
    inputTelModal.addEventListener('blur', onPhoneBlur);
  }
})();
