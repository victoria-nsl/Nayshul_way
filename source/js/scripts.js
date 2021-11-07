(function () {
  const MASKED = '+7 (___) ___-__-__';

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
      setItemLocalStorage (inputTelQuestions, inputEmailQuestions);
    }
    if (overlayPopupSuccess.classList.contains('modal-success__show-overlay')) {
      overlayPopupSuccess.classList.remove('modal-success__show-overlay');
    }
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

  /*=========ОТПРАВКА ФОРМ==============*/
  if (formQuestions) {
    formQuestions.addEventListener('submit', (evt)  => {
      if (!inputTelQuestions.value || !inputEmailQuestions.value) {
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
      if (!inputTelModal.value || !inputEmailModal.value) {
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
  };

  if (formQuestions) {
    inputTelQuestions.addEventListener('input', checkMask);
    inputTelQuestions.addEventListener('focus', checkMask);
    inputTelQuestions.addEventListener('blur', checkMask);
  }

  if (formBuy) {
    inputTelModal.addEventListener('input', checkMask);
    inputTelModal.addEventListener('focus', checkMask);
    inputTelModal.addEventListener('blur', checkMask);
  }

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

  if (formQuestions) {
    buttonQuestions.addEventListener('click', ()  => {
      showError(inputTelQuestions);
    });
  }

  if (formBuy) {
    buttonModal.addEventListener('click', ()  => {
      showError(inputTelModal);
    });
  }
})();
