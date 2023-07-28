// Lesson 8: Dave tutorial
// TS idea is to define strict types for typesafe development  as much detailed as possible

// derive more general function?
const stringEcho = (arg: string): string => arg
const echo = <T>(arg: T): T => arg // Generic is type placeholder
// Useful in utility functions, we don't known type in advance

const isObj = <T>(arg: T): boolean => {
  return (typeof arg === 'object' && !Array.isArray(arg) && arg !== null);
}

const isTrue = <T>(arg: T): {arg: T, is: boolean} => {
  if (Array.isArray(arg) && !arg.length) {
    return { arg, is: false };
  }

  if (isObj(arg) && !Object.keys(arg as keyof T).length) { // why keyof here?
    return { arg, is: false };
  }

  return { arg, is: !!arg }; // !! - double bang operator
}

interface BoolCheck<T> {
  value: T,
  is: boolean,
}

const checkBoolValue = <T>(arg: T): BoolCheck<T>=> {
  if (Array.isArray(arg) && !arg.length) {
    return { value: arg, is: false };
  }

  if (isObj(arg) && !Object.keys(arg as keyof T).length) {
    // why keyof here?
    return { value: arg, is: false };
  }

  return { value: arg, is: !!arg }; // !! - double bang operator
};

interface HasId {
  id: number
}

const processUser = <T extends HasId>(user: T): T => {
  // we narrowed T type to HasId
  return user;
}

console.log(processUser({ id: 223, name: 'Dave' }));
// console.log(processUser({ name: 'Dave'}));

const getUserProperty = <T extends HasId, K extends keyof T> (users: T[], key: K): T[K][] => {
  return users.map(user => user[key]);
}

///////////////////////////// EXAMPLE https://blog.logrocket.com/how-to-use-keyof-operator-typescript/
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
/////////////////////////////

class StateObject<T> {
  private data: T

  constructor(value: T) {
    this.data = value;
  }

  get state(): T {
    return this.data;
  }

  set state(value: T) {
    this.data = value;
  }
}

// const store = new StateObject(); 
const store = new StateObject("John");
console.log(store.state);
store.state = "Dave"
// store.state = 121

const myState = new StateObject<(string|number|boolean)[]>([12]);
myState.state = (['Dave', 11, false]);