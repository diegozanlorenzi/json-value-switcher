import JsonValueSwitcher from '../lib/JsonValueSwitcher.js';  

test('switch: Expects strings, booleans, nulls and numbers to be switched correctly', () => {
    let  originalJson = {
        "zero": 0,
        "number": 1234,
        "decimal": 0.15,
        "empty": "",
        "dot": ".",
        "hire": "me",
        "employee": "DiegoCarreiro",
        "boolTrue":true,
        "boolFalse":false,
        "array": [],
        "object": {},
        "void": null
    };

    let switchedJson = {
        "0": "orez",
        "1234": "rebmun",
        "0.15": "lamiced",
        "": "ytpme",
        ".": "tod",
        "me": "erih",
        "DiegoCarreiro": "eeyolpme",
        "true": "eurTloob",
        "false": "eslaFloob",
        "array": [],
        "object": {},
        "null": "diov",
     }

    expect(JsonValueSwitcher.switch(originalJson)).toMatchObject(switchedJson);

});

test('switch: Expects arrays and leaf objects not to be switched', () => {
    let  originalJson = {
        "array": [1,"hey",null,[],[123],{},],
        "object": {
            "string":"yes",
            "number":0.75
        }
    };

    let switchedJson = {
        "array": [],
        "object": {}
     }

    expect(JsonValueSwitcher.switch(originalJson)).toMatchObject(switchedJson);
});

/*
test('switch: Expects value colision to overide the content', () => {
});
*/

test('switch: Expects empty JSON to return empty', () => {
    expect(JsonValueSwitcher.switch({})).toMatchObject({});
});

test('getReverseString: Expects strings to be reverted correctly', () => {
  expect(JsonValueSwitcher.getReverseString('')).toBe('');
  expect(JsonValueSwitcher.getReverseString(1234)).toBe('4321');
  expect(JsonValueSwitcher.getReverseString(0.15)).toBe('51.0');
  expect(JsonValueSwitcher.getReverseString(false)).toBe('eslaf');
  expect(JsonValueSwitcher.getReverseString(true)).toBe('eurt');
  expect(JsonValueSwitcher.getReverseString('veryLong-Text123')).toBe('321txeT-gnoLyrev');
});

test('isObject: Expects to confirm the object type', () => {
    expect(JsonValueSwitcher.isObject(123)).toBeFalsy();
    expect(JsonValueSwitcher.isObject(1.52)).toBeFalsy();
    expect(JsonValueSwitcher.isObject(0)).toBeFalsy();
    expect(JsonValueSwitcher.isObject('')).toBeFalsy();
    expect(JsonValueSwitcher.isObject('text')).toBeFalsy();
    expect(JsonValueSwitcher.isObject(true)).toBeFalsy();
    expect(JsonValueSwitcher.isObject(false)).toBeFalsy();
    expect(JsonValueSwitcher.isObject(null)).toBeFalsy();
    expect(JsonValueSwitcher.isObject([])).toBeFalsy();
    expect(JsonValueSwitcher.isObject({})).toBeTruthy();
    expect(JsonValueSwitcher.isObject({
        key:'value',
        array:[],
        object:{}
    })).toBeTruthy();
});

test('sanitizedKey: Expects to confirm the treatment for null keys', () => {
    expect(JsonValueSwitcher.sanitizedKey('')).toBe('');
    expect(JsonValueSwitcher.sanitizedKey('keyName')).toBe('keyName');
    expect(JsonValueSwitcher.sanitizedKey(1234)).toBe('1234');
    expect(JsonValueSwitcher.sanitizedKey(0.12)).toBe('0.12');
    expect(JsonValueSwitcher.sanitizedKey(null)).toBe('null');
    expect(JsonValueSwitcher.sanitizedKey(null)).not.toBeNull();
});