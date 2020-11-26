'use strict' 

import service from './service.js';

const loginPage = document.querySelector('.game-login'),
      loginMessage = document.querySelector('.game-login__input'),
      loginRember = document.querySelector('.check-form__input'),
      deletLogin = document.querySelector('.check-form_link'),
      infoButtonPage = document.querySelector('.before-block__btn-info'),
      infoPage = document.querySelector('.info-page'),
      nextButtonInfo = document.querySelector('.btn-info-next'),
      exitButtonInfo = document.querySelector('.btn-info-exit'),
      gamePage = document.querySelector('.game-page'),
      userInfo = document.querySelector('.game-wrapper__user'),
      startPage = document.querySelector('.game-start'),
      loginButton = document.querySelector('.game-login__btn'),
      startButton = document.querySelector('.before-block__btn-start');

const getNumber = document.querySelector('.header-start__start-input'),
      addNumber = document.querySelector('.header-start__start-btn'),
      gameListStep = document.querySelector('.game-main__list'),
      playerLogin = document.querySelector('.header-start__logout'),
      stepGame = document.querySelector('.header-start__step');

let numberRow = 0,
    arrLogins = [];

const showUserInfo = () => {
  const span = document.createElement('span'),
        btnOut = document.createElement('button');

  span.innerHTML = loginMessage.value;
  span.className = 'user-info';
  btnOut.className = 'btn game-wrapper__user-btn';
  userInfo.appendChild(span);
  userInfo.appendChild(btnOut);
  return userInfo;
};

const checkLogin = () => {
  if(loginMessage.value != ''){
    if (loginRember.checked) {
      setLocalStorage(loginMessage.value);
    }
    visibility(loginPage, gamePage);
    arrLogins.push({login: loginMessage.value });
    showUserInfo();
  } else {
    alert('Введите логин');
  }
};

const magicNumber = service.createNumber();

loginButton.addEventListener('click', () => checkLogin());
loginMessage.addEventListener('keydown', (e) => {
  if (e.keyCode == 13) {
    checkLogin();
  }
});

infoButtonPage.addEventListener('click', () => visibility(gamePage, infoPage));
nextButtonInfo.addEventListener('click', () => visibility(infoPage, startPage));
exitButtonInfo.addEventListener('click', () => visibility(infoPage, gamePage));

startButton.addEventListener('click', () => {
  pageHide(gamePage);
  pageShow(startPage);
  playerLogin.innerHTML = loginMessage.value;
});

const addStep = (options) => {
  const {bulls, cows} = options;
  const item = document.createElement('div'),
        numRow = document.createElement('span'),
        number = document.createElement('span'),
        bullsElem = document.createElement('span'),
        cowsElem = document.createElement('span');

  item.className = 'game-main__item';
  numRow.className = 'game-main__num-row main-title';
  numRow.innerHTML= numberRow += 1;
  number.className = 'game-main__number main-title';
  number.innerHTML = getNumber.value;
  bullsElem.className = 'game-main__bulls main-title';
  bullsElem.innerHTML = `Bulls: ${bulls}`;
  cowsElem.className = 'game-main__cows main-title';
  cowsElem.innerHTML = `Cows: ${cows}`;
  
  item.appendChild(numRow);
  item.appendChild(number);
  item.appendChild(bullsElem);
  item.appendChild(cowsElem);

  return item;
};

const createRow = (options) => {
  const row = addStep(options);
  gameListStep.appendChild(row);
};

const checkNumber = () => {
  startTimer(60);
  setTimeout(() => {
    if(getNumber.value && !isNaN(getNumber.value) && getNumber.value.length == 4){
      const options = service.getBullsCows(getNumber.value, magicNumber);
      createRow(options);
      stepGame.innerHTML = `Ходы: ${10 - gameListStep.childElementCount}`;
      getNumber.value = '';
      
    } else {
      alert('Введите число');
      getNumber.value = '';
    }
  }, 300);
};

addNumber.addEventListener('click', ()=> checkNumber());
getNumber.addEventListener('keydown', (e) => {
  if (e.keyCode == 13) {
    checkNumber();
  }
});

const setLocalStorage = (item) => localStorage.setItem('login', JSON.stringify(item));

const visibility = (hide, show) => {
  pageHide(hide);
  pageShow(show);
};

const pageHide = (element) => {
  setTimeout(() => {
    element.setAttribute('hidden', '');
  }, 1000);
};

const pageShow = (element) =>{
  setTimeout(() => {
    element.removeAttribute('hidden');
  }, 1000);
};


const startTimer = (i) => {
  const timerElem = document.querySelector('.timer_elem');   
  const timer = setInterval(() => {
      if (i <= 20) {
        timerElem.style.color = "red";
      }
      timerElem.innerHTML = `00:${i}`;
      if (i == 0) {
          clearInterval(timer);
          window.location.reload();
      }
      i = i - 1;  
  }, 1000);
};


