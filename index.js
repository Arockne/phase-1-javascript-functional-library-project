
function myEach(collection, callback) {
  if (Array.isArray(collection)) {
    for (const element of collection) {
      callback(element);
    }
  } else if (typeof collection === 'object') {
    for (const key in collection) {
      callback(collection[key]);
    }
  }
  return collection;
}

function myMap(collection, callback) {
  const newArray = [];
  myEach(collection, element => {
    newArray.push(callback(element));
  })
  return newArray;
}

function myReduce(collection, callback, acc) {
  if (acc === undefined) {
    collection = Object.values(collection);
    acc = collection.shift();
  }
  myEach(collection, element => {
    acc = callback(acc, element)
  })
  return acc;
}

function myFind(collection, predicate) {
  collection = Object.values(collection);
  for (const element of collection) {
    if (predicate(element)) return element
  }
}

function myFilter(collection, predicate) {
  const filtered = [];
  myEach(collection, element => {
    if (predicate(element)) filtered.push(element);
  })
  return filtered;
}

function mySize(collection) {
  let length = 0;
  myEach(collection, () => length += 1);
  return length;
}

function myFirst(array, n) {
  if (n === undefined) {
    return array[0];
  }
  return array.slice(0, n);
}

function myLast(array, n) {
  if (n === undefined) {
    return array[mySize(array) - 1];
  }
  return array.slice(-n);
}

function mySortBy(array, callback) {
  const sorted = array.slice();
  return sorted.sort((a, b) => {
    a = callback(a);
    b = callback(b);
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  })
}

function myFlatten(array, shallow, newArr = []) {
  if (shallow) {
    myEach(array, element => {
      if (Array.isArray(element)) newArr.push(...element);
      else newArr.push(element);
    })
  } else {
    myEach(array, element => {
      if (Array.isArray(element)) myFlatten(element, false, newArr);
      else newArr.push(element);
    })
  }
  return newArr;
}

function myKeys(object) {
  const keys = [];
  for (const key in object) {
    keys.push(key);
  }
  return keys;
}

function myValues(object) {
  return myMap(object, value => value);
}