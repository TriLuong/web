export const loadState = () => getData('redux-persist') || {};

const whiteList = ['token', 'user'];
export const saveState = state => {
  if (!state) return;
  try {
    const dupState = {};
    whiteList.map(key => {
      dupState[key] = state[key];
      return null;
    });
    saveData('redux-persist', dupState);
  } catch (err) {
    // console.log('saveState error', err);
  }
};

export const saveData = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (err) {
    return undefined;
  }
  return null;
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
