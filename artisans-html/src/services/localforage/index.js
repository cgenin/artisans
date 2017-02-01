const initialize = () => {
  if (window.sessionStorage) {
    return window.sessionStorage;
  }
  const db = {};
  return {
    getItem(k){
      return db[k];
    },
    setItem(k, v){
      db[k] = v;
    }
  };
}

const store = initialize();

export default {
  initialize(key, defaultState){
    const v = store.getItem(key);
    if (!v) {
      this.setState(key, defaultState);
      return defaultState;
    }
    return JSON.parse(v);
  },
  setState(key, value){
    store.setItem(key, JSON.stringify(value));
    return value;
  }
}
