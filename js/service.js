'use strict' 

const service = {
  createNumber() {
    let genNumber = '';
    for( i = 0; i < 4; i++ ) {
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

export {service};