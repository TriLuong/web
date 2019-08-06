import csc from 'country-state-city';

const getAllCountries = csc.getAllCountries();
const searchCountry = name => getAllCountries.find(country => country.name === name);

let statesName = [];

const searchState = name => statesName.find(state => state.name === name);

export const getStatesOfCountry = name => {
  const country = searchCountry(name);
  statesName = csc.getStatesOfCountry(country.id);
  STATES_NAME = statesName.map(state => ({
    stateID: state.id,
    value: state.name,
    label: state.name,
  }));
};

export const getCitiesOfState = name => {
  const state = searchState(name);
  const citiesName = csc.getCitiesOfState(state.id);
  CITIES_NAME = citiesName.map(city => ({
    cityID: city.id,
    value: city.name,
    label: city.name,
  }));
};

export const CONTRIES_NAME = getAllCountries.map(country => ({
  countryID: country.id,
  value: country.name,
  label: country.name,
}));

/* eslint import/no-mutable-exports: 0 */
export let STATES_NAME;

export let CITIES_NAME;

export default {};
