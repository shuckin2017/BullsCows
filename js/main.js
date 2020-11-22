'use strict' 
// import {service} from "./service.js";

const service = {
  createNumber() {
    let genNumber = '';
    for(let i = 0; i < 4; i++ ) {
      let newNum = Math.floor(Math.random() * 9) + 1;
      if(!genNumber.includes(newNum)) {
        genNumber += newNum; 
      } else {
        i--;
      }
    }
    console.log(genNumber);
    return genNumber;
  },

  getBullsCows(strNumberUser, strNumberRandom) {
    const arrayNumberRandom = [...strNumberRandom];
    const arrayNumberUser = [...strNumberUser];
    let bulls = 0,
        cows = 0;
    
    arrayNumberUser.forEach((symbol, index) => {
      const indexInNumberRandom = arrayNumberRandom.indexOf(symbol);
      if(indexInNumberRandom !== -1) {
        bulls += 1;
        if( index == indexInNumberRandom) {
              cows += 1;
        }
      }
    }); 
    return {bulls, cows};
  }
};
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


let arrLogins = [],
    numberRow = 0;

let bulls = 0,
    cows = 0;


// Validation Login
// const checkLogin = () => {
//   const login = localStorage.getItem('login');
//   if(login) {

//   }
// };
// checkLogin();



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


// for(var i = 0;i < str.length;i++){    
//   num = str[i];   
//   numPos = str.indexOf(num);  
//   if(~str.indexOf(num, numPos + 1)){
//     inputCheck.style.borderColor = "red";
//     return
//   }
// }


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

// const test = () => {
// getNumber.value.split('').forEach((symbol, index) => {
//   if(getNumber.value.indexOf(symbol) !== -1) {
//       bulls += 1;
//          if( index == getNumber.value.indexOf(symbol)) {
//           cows += 1;
//          }
//      }
//  });
// };
// test()



// getNumber.value.split('').forEach((symbol, index) => {
//   if(getNumber.value.indexOf(symbol) !== -1) {
//          console.log(`${symbol} есть`)
//          if( index == getNumber.value.indexOf(symbol)) {
//              console.log(`${symbol} разряд есть`)
//          }
//      }
//  });