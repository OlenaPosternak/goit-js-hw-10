import './css/styles.css';
import {findCountry} from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputForm = document.getElementById(`search-box`);
const list = document.querySelector(`.country-list`);
inputForm.addEventListener(`input`, debounce(searchCountry, DEBOUNCE_DELAY));

// function fetchCountries(country) {
//   fetch(
//     `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,languages,flags`
//   )
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//         if(data.status ===404){
//         Notiflix.Notify.failure(`Oops, there is no country with that name`)
//       }
   
//       renderMarkUp(data);
//     })
//     .catch(error => {
//         Notiflix.Notify.failure(error)
//     });
// }


function searchCountry(event) {
  const country = event.target.value.trim();

  if (!country || country === ``) {
    list.innerHTML = ``;
  }
  findCountry(country)
  .then(data => {
    if(data.status ===404){
    Notiflix.Notify.failure(`Oops, there is no country with that name`)
  }

  renderMarkUp(data);
})
.catch(error => {
    Notiflix.Notify.failure(error)
});

}

function renderMarkUp(listOfCountries) {
  if (listOfCountries.length > 10) {
    Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
    return;
  }
  if (listOfCountries.length < 10 && listOfCountries.length >= 2) {
    list.innerHTML = ``;

    const fullListOfCountries = listOfCountries
      .map(
        country =>
          `
 <li>
 <img src="${country.flags.svg}" alt="" width ="20">
 <span>${country.name.official}</span>
 `
      )
      .join('');

    list.insertAdjacentHTML(`afterbegin`, fullListOfCountries);
  }
  if (listOfCountries.length === 1) {
    list.innerHTML = ``;
    const newCountry = listOfCountries
      .map(
        country =>
          `
 <li>
 <img src="${country.flags.svg}" alt="" width ="20">
 <span> ${country.name.official}</span>
 <p>Capital: ${country.capital}</p>
 <p>Population: ${country.population}</p>
 <p>Languages: ${Object.values(country.languages)}</p>
 </li>
 `
      )
      .join('');

    list.insertAdjacentHTML(`afterbegin`, newCountry);
  }
}
