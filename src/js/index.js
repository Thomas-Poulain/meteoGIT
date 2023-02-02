const searchForm = document.querySelector('.search-location');
const cityValue = document.querySelector('.search-location input');
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const timeImage = document.querySelector('.card-top img');
const cardInfo = document.querySelector('.back-card');


const isDayTime = (icon) => {
    if (icon.includes('d')) { return true }
    else { return false }
}

updateWeatherApp = (city) => {

  const imageName = city.list[0].weather[0].icon;
  const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`
  cityName.textContent = city.city.name;
  cardBody.innerHTML = `
  <div class="card-mid row">
    <div class="col-8 text-center temp">
      <span>${city.list[0].main.temp}&deg;C</span>
    </div>
    <div class="col-4 condition-temp">
      <p class="condition">${city.list[0].weather[0].description}</p>
      <p class="high">${city.list[0].main.temp_max}&deg;C</p>
      <p class="low">${city.list[0].main.temp_min}&deg;C</p>
    </div>
  </div>

  <div class="icon-container card shadow mx-auto">
    <img src="${iconSrc}" alt="" />
  </div>
  <div class="card-bottom px-5 py-4 row">
    <div class="col text-center">
      <p>${city.list[0].main.feels_like}&deg;C</p>
      <span>Feels Like</span>
    </div>
    <div class="col text-center">
      <p>${city.list[0].main.humidity}%</p>
      <span>Humidity</span>
    </div>
  </div>`;

  if (isDayTime(imageName)) {
    console.log('day');
    timeImage.setAttribute('src', 'src/img/day_image.svg');
    if (cityName.classList.contains('text-white')) {
        cityName.classList.remove('text-white');
    } else {
        cityName.classList.add('text-black');
    }

  } else {
    console.log('night');
    timeImage.setAttribute('src', 'src/img/night_image.svg');
    if (cityName.classList.contains('text-black')) {
        cityName.classList.remove('text-black');
    } else {
        cityName.classList.add('text-white');
    }

  }

  cardInfo.classList.remove('d-none');
}



//add an event listner to the form
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const citySearched = cityValue.value.trim();
    console.log(citySearched);
    searchForm.reset();

    requestCity(citySearched)
        .then((data) => {
            updateWeatherApp(data);
        })
        .catch((error) => { console.log(error) })



})
