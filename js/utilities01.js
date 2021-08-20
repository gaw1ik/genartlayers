
// this files includes utility funtions
// for the most part, these are functions for handling frequent calculations like picking random values from an array or a range of integers
// also contains functions for handy operations like converting between degrees and radians, solving linear functions, etc.

// UTILITY FUNCTIONS
function getRandomInt(min, max) {
    return Math.floor(myrng() * (max - min + 1) + min);
}
function getRandomFloat(min, max) {
  return (myrng() * (max - min) + min);
}
function chooseFromArray(array) {
  return array[Math.floor(myrng() * array.length)];
}
function randomSign() {
  return Math.round(myrng()) * 2 - 1;
}




// function plusOrMinus(amount) {
//   return (Math.round(myrng()) * 2 - 1) * amount;
// }

// function plusOrMinusRange(centerValue, maxAmount) {
//   // var max = amount*value;
//   var newValue = centerValue + randomSign()*getRandomFloat(0,maxAmount);
//   // var sign = (Math.round(myrng()) * 2 - 1) * amount;
//   return newValue;
// }

// function plusOrMinusMax(max) {
//   var randInt = getRandomInt(0,max);
//   return (Math.round(myrng()) * 2 - 1) * randInt;
// }

function plusOrMinus(centerValue, maxAmount) {

  var newValue = centerValue + randomSign()*getRandomFloat(0,maxAmount);

  return newValue;
}



/////////////////////// vary functions
function vary(parameter, perc) {
  var min = 1-perc/100;
  var max = 1+perc/100;
  var newValue = parameter*getRandomFloat(min, max);
  return newValue;
}

function varyAbove(parameter, perc) {
  var min = 1;
  var max = 1+perc/100;
  var newValue = parameter*getRandomFloat(min, max);
  return newValue;
}

function varyUnder(parameter, perc) {
  var min = 1-perc/100;
  var max = 1;
  var newValue = parameter*getRandomFloat(min, max);
  return newValue;
}






function overunder(perc) {
  return myrng() * (2 * perc / 100) + (1 - perc / 100);
}
function under(perc) {
  return 1.0 - myrng()*(perc/100);
}
function makeChoiceArray(rarity) {
  a = Array(100-rarity).fill(0);
  if (rarity==0){
    c = a;
  } else {
    b = Array(rarity).fill(1);
    c = a.concat(b);
  }
  return c;
}
function makeRandel(rarity) {
  return myrng()<(rarity/100);
}

function makeChoice(rarity) {
  return myrng()<(rarity/100);
}

function deg2rad(thetad) {
  return thetad * Math.PI/180;
}
function rad2deg(thetar) {
  return thetar * 180/Math.PI;
}
function linSolve(x1,y1,x2,y2) {
  m = (y2-y1)/(x2-x1);
  b = y1-m*x1;
  return [b,m];
}

// linear solver given two points
function linSolve ( [x1,y1], [x2,y2] ) {
  var m = (y2-y1)/(x2-x1);
  var b = y1-m*x1;
    let coeffs = [b,m];
    return coeffs;
}
  
  
  
// RANDOM FUNCTIONS
// Make some arrays of random numbers
function createRandomNums(){
  let oneNumList = [];
  var count = 0;
  for (i=0;i<nSeeds;i++) {
      oneNumList = [];
      for (j=0;j<nNums;j++) {
          count += 1;        
          oneNumList.push(Math.random()); 
      }
      randomNums.push(oneNumList);
  }
  return randomNums;
}
// custom random function that is seedable (pulls numbers from randomNums)
function myRandom(seed) {
  randomNumber = randomNums[seed][randCount];
  if(randCount<nNums-1){
    randCount += 1;//add one
  } else {
    randCount = 0;//reset it
  }
  return randomNumber;
}
// function makeTreeSeeds() {
//   for(i=0;i<100;i++) {
//     treeSeed = Math.floor( Math.random()*nSeeds );
//     treeSeeds[i] = treeSeed;
//   }
//   return treeSeeds;
// }

function normal2range(nValue,min,max) {
  return nValue * (max-min) + min;
}

function range2normal(rValue,min,max) {
  return (rValue - min) / (max-min);
}



function makeRandomSegmentation(nDivisions, min, max) {

  var divisionsArray = [];

  for(let k=0; k<nDivisions; k++) {
    divisionsArray.push( getRandomFloat(min,max) );
  }

  divisionsArray.sort();

  return divisionsArray;


}


function sortArrayOfObjectsByKey(array, key, direction) {

  // this function sorts an array of objects (key/value pairs) according to the value of a particular key.
  // can either be ascending or descending. 
  // the value to sort by needs to be numeric.

  if(direction=="ascending") {

      array.sort(function (a, b) {
          return a[key] - b[key];
      });

  } else if (direction=="descending") {

      array.sort(function (a, b) {
          return b[key] - a[key];
      });

  }

  return array;

}