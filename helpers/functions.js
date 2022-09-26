'use strict';
let I;
const helper = require('@codeceptjs/helper');

class functions extends helper {
  _init() {
    I = actor();
  }; 

  async getList(data, key){
    var list = [];
    let value;
    for (var i = 0; i < data.length; i++){
      var _obj = data[i];
      value = _obj[`${key}`];
      list.push(value);
    }  
    return list;
  };

  async validateKeyInObject(data, key) {
    var obj = {};
    let isKeyPresent;
    let message;
    for (var i = 0; i < data.length; i++){
      var _obj = data[i];
      if (!_obj.hasOwnProperty(`${key}`)) {
        isKeyPresent = false;
        message = `Key: ${key} is missing from data: ${JSON.stringify(_obj)}`;
        obj["isValid"] = isKeyPresent;
        obj["message"] = message;
        break;
      } else{
        isKeyPresent = true;
        message = `Key: ${key} found!`;
        obj["isValid"] = isKeyPresent;
        obj["message"] = message
      };
    };    
    return obj;
  };

  async validateValueType(data, key, type) {
    var obj = {};
    let value;
    let isValidType;
    let message;
    for (var i = 0; i < data.length; i++){
      var _obj = data[i];
      value = _obj[`${key}`];
      if (!typeof value === type){
        isValidType = false;
        message = `Value for ${key} is not the expected type of: ${type} from data: ${JSON.stringify(_obj)}`;
        obj["isValid"] = isValidType;
        obj["message"] = message;
        break;
      } else {
        isValidType = true;
        message = `Value for ${key} is the expected type of: ${type} from data: ${JSON.stringify(_obj)}`;
        obj["isValid"] = isValidType;
        obj["message"] = message;
      }
    };
    return obj;
  };

}
module.exports = functions;
