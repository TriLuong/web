/* eslint import/prefer-default-export: 0 */
export const loadState = () => getData('persistState') || {};

/* eslint no-return-assign:0 */
const whiteList = ['token'];
export const saveState = state => {
  try {
    const dupState = {};
    whiteList.map(key => (dupState[key] = state[key]));
    saveData('persistState', dupState);
  } catch (err) {
    console.log('saveState error', err);
  }
};

export const saveData = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (err) {
    console.log('saveState error', err);
  }
};

export const getData = key => {
  try {
    const data = localStorage.getItem(key);
    if (data == null) {
      return null;
    }
    return JSON.parse(data);
  } catch (err) {
    return undefined;
  }
};
