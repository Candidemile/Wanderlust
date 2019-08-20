// Foursquare API Info
const clientId = 'C2YWVVY10YXAKFG23QABNJRRBMNLJUEPSFKJDPDMM4NDFICC';
const clientSecret = 'ICLYDTTNQ13HOQEU25EBSHYQ3X23ZHR5G3YAVJH1D4QBFF5K';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// APIXU Info
const apiKey = '86eeef2a5da949e28ac175231191908';
const forecastUrl = 'https://api.apixu.com/v1/forecast.json?key=';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
	const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20190820`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      //console.log(response);
      const jsonResponse = await response.json();
      //console.log(jsonResponse);
      let venues = jsonResponse.response.groups[0].items;
      venues = venues.map(venue => venue.venue);
      console.log(venues);
      return venues
    }
  } catch(error) {
    console.log(error);
  }
}

const getForecast = async () => {
  const city = $input.val();
  const urlToFetch = `${forecastUrl}${apiKey}&q=${city}&days=4&hour=11`;
  console.log(urlToFetch);
	try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      //console.log(jsonResponse);
      let days = jsonResponse.forecast.forecastday;
      //console.log(days[0]);
      return days;
    }
  } catch(error) {
    console.log(error);
  }
}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
		const venue = venues[index];
		venueIcon = venue.categories[0].icon;
    venueImgSrc = venueIcon.prefix + 'bg_64' + venueIcon.suffix;
    let venueContent = `<h2>${venue.name}</h2>
		<img class="venueimage" src="${venueImgSrc}"/>
		<h3>Address:</h3>
		<p>${venue.location.address}</p>
		<p>${venue.location.city}</p>
		<p>${venue.location.country}</p>`;
    console.log(venue.address, venue.city);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (days) => {
  $weatherDivs.forEach(($day, index) => {
    // Add your code here:
		const currentDay = days[index];
    console.log('days: ',days);
    const weekDay = new Date(currentDay.date).getDay();
    const day = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][weekDay];
    let weatherContent = `<h2> High: ${currentDay.day.maxtemp_c}</h2>
		<h2> Low: ${currentDay.day.mintemp_c}</h2>
		<img src="http:${currentDay.day.condition.icon}" class="weathericon" />
		<h2>${day}</h2>`;
    $day.append(weatherContent);
  });
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)
