const loginPage = document.querySelector('.game-login'),
      loginMessage = document.querySelector('.game-login__input'),
      gamePage = document.querySelector('.game-page'),
      userInfo = document.querySelector('.game-wrapper__user'),
      startPage = document.querySelector('.game-start'),
      loginButton = document.querySelector('.game-login__btn'),
      startButton = document.querySelector('.before-block__btn-start');

let arrLogins = [];

const getNumber = () => {
  number = [];

  for(let i = 0; i < 4; i++) {
    let newNum = Math.floor(Math.random () * 10);
    if(number.indexOf(newNum) < 0) {
      number.push(newNum);
    }
  }
  return number;
};

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

loginButton.addEventListener('click', () => {
  if(loginMessage.value != ''){
    pageHide(loginPage);
    pageShow(gamePage);
    arrLogins.push({login: loginMessage.value });
    showUserInfo();
    
  } else {
    alert('Введите логин');
  }
});

startButton.addEventListener('click', () => {
  pageHide(gamePage);
  pageShow(startPage);
});

// btnOut.addEventListener('click', () => {
//   pageHide(startPage);
//   pageShow(gamePage);
//   arrLogins.shift();
// });

function pageHide(element) {
  setTimeout(() => {
    element.setAttribute('hidden', '');
  }, 1000);
};

function pageShow(element) {
  setTimeout(() => {
    element.removeAttribute('hidden');
  }, 1000);
};



