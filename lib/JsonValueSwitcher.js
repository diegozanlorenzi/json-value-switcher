export default class JsonValueSwitcher {
  static switch(originalJson) {
    let switchedJson = {};
    Object.keys(originalJson).map(key => {
      let value = originalJson[key];
      if (Array.isArray(value)) {
        // keep the way it is or iterate the recursive function
        switchedJson[key] = this.switchArray(value);
      } else if (this.isObject(value)) {
        // recursive action
        switchedJson[key] = this.switch(value);
      } else {
        // sanitize key and set reversed value
        switchedJson[this.sanitizedKey(value)] = this.getReverseString(key);
      }
    });
    return switchedJson;
  }

  static switchArray(value) {
    let switchedArray = [];
    // checks if the value is an array before iterating
    if (Array.isArray(value) && value.length > 0) {
      value.map(obj => {
        if (Array.isArray(obj) && obj.length > 0) {
          // if it is another array iterates the recursive function
          return switchedArray.push(this.switchArray(obj));
        } else if (this.isObject(obj)) {
          // if it is an object, runs the json switch function
          switchedArray.push(this.switch(obj));
        } else {
          // if it is another type, just add it
          switchedArray.push(obj);
        }
      });
    }
    return switchedArray;
  }

  static sanitizedKey(value) {
    if (value === null) {
      return "null";
    }
    return value.toString();
  }

  static getReverseString(value) {
    let reverseString = "";
    let string = value.toString();
    string
      .split(reverseString)
      .map(char => (reverseString = char + reverseString));
    return reverseString;
  }

  static isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }
}
