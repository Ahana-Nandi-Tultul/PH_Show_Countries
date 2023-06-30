const loadCountries = async(code, filter) => {
    const url = `https://restcountries.com/v3.1/${code}/${filter}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    displayCountries(data);
    console.log(data);
}

const displayCountries = (countries) => {
    let displayCountriesDiv = document.getElementById('display-country');
    displayCountriesDiv.innerHTML = '';
    for(const country of countries){
        // console.log(country);
        const displayCountry = document.createElement('div');
        displayCountry.classList.add('col');
        displayCountry.innerHTML = `
        <div class="border border-2 p-3 m-2">
            <h4>Name: ${country.name.common ? country.name.common : 'NO Name Found'}</h4>
            <p>Capital: ${country.capital ? country.capital[0] : 'No capital Found'}</p>
            <button onclick="loadCountryDetails(${country.ccn3})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#displayCountryDetails">
            Details
            </button>
        </div>
        `;
        displayCountriesDiv.appendChild(displayCountry);
    }
}

const loadCountryDetails = async(id) =>{
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
    const data = await res.json();
    displayCountryDetails(data[0]);
}

const displayCountryDetails = (countryDetails) => {
    console.log(countryDetails);
    const title = document.getElementById('displayCountryDetailsLabel');
    title.innerText += countryDetails.name.common;
    const coutryDetailDiv = document.getElementById('coutry-detail-div');
    coutryDetailDiv.innerHTML =
    `<div class="card mb-3">
    <img src="${countryDetails.flags ? countryDetails.flags.png : "Not Found"}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Capital: ${countryDetails.capital}</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
  </div>
    `;

}

const allRegion = () => {
    const allRegions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
    const allRegionsSelect = document.getElementById('all-regions');
    for(const region of allRegions){
        const regionSelectOption = document.createElement('option');
        regionSelectOption.innerText = region;
        allRegionsSelect.appendChild(regionSelectOption);
    }
}
const allLanguages = () => {
    const allLanguages = ['spanish', 'english', 'chinese', 'hindi'];
    const allLanguagesSelect = document.getElementById('all-languages');
    for(const lan of allLanguages){
        const lanSelectOption = document.createElement('option');
        lanSelectOption.innerText = lan;
        allLanguagesSelect.appendChild(lanSelectOption);
    }
}

const selectOption = (code, event) => {
    const selectedIndex =  event.target.options.selectedIndex;
    let text = event.target[selectedIndex].text;
    text = text.toLowerCase();
    loadCountries(code, text);
}

document.getElementById('all-regions').addEventListener('change', function(event){
    selectOption('region', event);
})
document.getElementById('all-languages').addEventListener('change', function(event){
    selectOption('lang', event);
})

// function myNewFunction(sel) {
//     alert(sel.options[sel.selectedIndex].text);
// }

loadCountries('all', '');
allRegion();
allLanguages();