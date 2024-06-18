let names;
let container = document.querySelector('.container');
let results = []; 

async function data() {
    names = prompt('Enter Your City Name');

    if (/\d/.test(names) || names.trim() === '') {
        alert('Numbers or empty value not allowed');
    } else {
        await fetchWeather();
    }
}

async function fetchWeather() {
    showSpinner(); 
    try {
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=4ed0daa1d98b49eb8ea51816241406&q=${names}&aqi=no`);

        if (!response.ok) {
            throw new Error('Weather data not found');
        }

        let data = await response.json();
        console.log(data);

        let current = data.current;
        let location = data.location;

        results.push({ current, location });

        displayResults();

    } catch (error) {
        console.error('Error fetching weather data:', error);
    } finally {
        hideSpinner(); 
    }
}

function showSpinner() {
    document.querySelector('.spinner-container').style.display = 'flex';
}

function hideSpinner() {
    document.querySelector('.spinner-container').style.display = 'none';
}

function displayResults() {
    container.innerHTML = ''; 

    results.forEach(result => {
        const { current, location } = result;

       
        const card = document.createElement('div');
        card.classList.add('weather-card');
        card.innerHTML = `
         <div class="card">
            <div class="card_top">
                <img class="icon_img" src="${current.condition.icon}" alt="Weather Icon">
                <div class="temp_div">
                    <h2>${current.temp_c}°C</h2>
                </div>
            </div>
            <div class="container_content">
               
                    <h2>${location.name}, ${location.country}</h2>
                    <p>Condition: ${current.condition.text}</p>
              
            </div>
            </div>
        `;

        container.appendChild(card); 
    });
}

showSpinner();
setTimeout(hideSpinner, 3000);
