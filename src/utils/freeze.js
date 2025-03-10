function deepFreeze(object) {
  if (object === null || typeof object !== 'object') {
    return object;
  }

  Object.getOwnPropertyNames(object).forEach(propName => {
    const obj = object[propName];
    deepFreeze(obj);
  });

  return Object.freeze(object);
}

export default deepFreeze;
