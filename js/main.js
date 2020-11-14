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

console.log(getNumber());