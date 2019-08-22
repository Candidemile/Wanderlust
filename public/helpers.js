const createVenueHTML = (name, location, iconSource) => {
  return `<h2>${name}</h2>
  <img class="venueimage" src="${iconSource}"/>
  <h3>Address:</h3>
  <p>${location.address}</p>
  <p>${location.city}</p>
  <p>${location.country}</p>`;
}

const createWeatherHTML = (currentDay) => {
  return `<h2> High: ${currentDay.day.maxtemp_f}</h2>
    <h2> Low: ${currentDay.day.mintemp_f}</h2>
    <img src="https://${currentDay.day.condition.icon}" class="weathericon" />
    <h2>${weekDays[(new Date(currentDay.date)).getDay()]}</h2>`;
}

//this function takes array of elements and returns another with 4 random elements from input array
const getRandomArrayElem = (array) => {
  let randomArray = [];
  while (randomArray.length < 4) {
    let random = Math.floor(Math.random() * array.length);
    if (!randomArray.includes(array[random])) {
      randomArray.push(array[random]);
    }
  }
  return randomArray
}
//let testArray = ['a','b','d','z','e','f','g','k','l','m'];
//let test = getRandomArrayElem(testArray);

//evExplained takes uv radiation number and return string with level radiation explained
const uvExplained = (uv) => {
  const uvNumbers = {
    1: 'low',
    2: 'low',
    3: 'medium',
    4: 'medium',
    5: 'high',
    6: 'high',
    7: 'very high',
    8: 'very high',
    9: 'extra high',
    10: 'maximum'
  };
  return uvNumbers[Math.round(uv)]
}
