// Page structure module
const PageStructure = () => {
  const body = document.querySelector('body');
  const container = document.createElement('div');
  const form = document.createElement('form');
  const input = document.createElement('input');
  const button = document.createElement('button');

  container.classList.add('container');
  form.classList.add('form');
  button.classList.add('searchButton');

  input.type = 'text';
  input.placeholder = 'Enter the location here...';
  button.textContent = 'Search!';

  container.appendChild(form);
  form.appendChild(input);
  form.appendChild(button);
  body.appendChild(container);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Clear the form after submitting
    form.reset();
  });
};

class Data {
  constructor(location, conditions, temperature) {
    this.location = location;
    this.conditions = conditions;
    this.temperature = temperature;
  }
}

// API module
const Api = () => {
  function displayApiData(displayLocation, displayConditions, displayTemperature) {
    const container = document.querySelector('.container');
    const displayLocationContainer = document.createElement('div');
    const displayConditionsContainer = document.createElement('div');
    const displayTemperatureContainer = document.createElement('div');

    displayLocationContainer.classList.add('location');
    displayConditionsContainer.classList.add('conditions');
    displayTemperatureContainer.classList.add('temperature');

    displayLocationContainer.textContent = displayLocation;
    displayConditionsContainer.textContent = displayConditions;
    displayTemperatureContainer.textContent = displayTemperature;

    container.appendChild(displayLocationContainer);
    container.appendChild(displayConditionsContainer);
    container.appendChild(displayTemperatureContainer);
  }

  function getApi(location) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=4965fb1d59ad4fc9875122900230112&q=${location}`;
    fetch(apiUrl, { mode: 'cors' })
      .then((response) => response.json())
      .then((response) => {
        const conditions = response.current.condition.text;
        const locations = response.location.name;
        const temperature = response.current.feelslike_c;

        const obj = new Data(locations, conditions, temperature);

        displayApiData(obj.location, obj.conditions, obj.temperature);
      });
  }

  const button = document.querySelector('button');
  const input = document.querySelector('input');
  button.addEventListener('click', () => {
    getApi(input.value);
  });
};

export { PageStructure, Api };
