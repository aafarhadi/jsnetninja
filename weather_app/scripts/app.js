const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();





const updateUI = (data) => {
    console.log(data );
    //const cityDets = data.cityDets;
    //const weather = data.weather;

    //destructure properties
    const { cityDets, weather } = data;

    // update detail template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // update night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    } else {
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);

    // remove d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update ui with new city
    forecast.updateCity(city)
    .then( data => {updateUI(data);})
    .catch( err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}

