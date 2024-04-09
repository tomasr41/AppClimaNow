const $temperaturaValor = document.querySelector('#temperature-value');
const $temperatureDescription = document.querySelector('#temperature-description');
const $body = document.querySelector('body')

const $ubication = document.querySelector('#ubication');
const $animatedIcon = document.querySelector('#animated-icon')

const $windSpeed = document.querySelector('#wind-speed');

let lon;
let lat;

window.addEventListener('load', () => {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {               // Pedir permiso al usuario para acceder a su ubicacion.
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=d4bc2238703e10281e0422e093d41550` // posicion actual del usuario
            //const url =  `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=d4bc2238703e10281e0422e093d41550` // cambiar la palabra "London" del url por cualquier ciudad para ver
             
             
             fetch (url)
             .then( response => { return response.json() }) // fetch para traer informacion de la api
             .then (data => {
                //console.log(data);
                let temp = Math.round(data.main.temp) // redondeo de la temperatura 
                
                $temperaturaValor.textContent = `${temp}ºC`;
                
                let desc = data.weather[0].description;
                $temperatureDescription.textContent = desc.toUpperCase();                // establecer con la data de la api los valores que necesitamos

                let ubic = data.name;
                $ubication.textContent = ubic;
               
                $windSpeed.textContent = `${data.wind.speed}m/s`
                
                switch (data.weather[0].main) {                                                  // data.weather[0] es el estado del clima, basandonos en los diferentes estados posibles cambiamos el icono
                    case 'Clear':                                                                // y el background con CSS. 
                        $animatedIcon.src = 'animated/day.svg';
                        $body.classList.add('clear-background');
                        break;
                    case 'Clouds':
                        $animatedIcon.src = 'animated/cloudy-day-1.svg';
                        $body.classList.add('clouds-background');
                        break;
                    case 'Thunderstorm':
                        iconoAnimado.src = 'animated/thunder.svg';
                        $body.classList.add('thunderstorm-background');
                        break;
                    case 'Drizzle':
                        iconoAnimado.src='animated/rainy-2.svg'
                        $body.classList.add('rain-background');
                        break
                          
                    case 'Rain':
                        iconoAnimado.src = 'animated/rainy-7.svg';
                        $body.classList.add('rain-background');
                        console.log('LLUVIA');
                        break;
                    case 'Snow':
                        iconoAnimado.src = 'animated/snowy-6.svg';
                        $body.classList.add('snow-background');
                        console.log('NIEVE');
                        break;
                    case 'Atmosphere':
                        iconoAnimado.src = 'animated/weather.svg';
                        $body.classList.add('snow-background');
                        console.log('ATMOSFERA');
                        break;
                    default:
                        iconoAnimado.src = 'animated/cloudy-day-1.svg';
                        $body.classList.add('default-background');
                        console.log('por defecto');
                }

             })
             .catch(error => {
                console.log(error);
             })
        });
    }
}) 