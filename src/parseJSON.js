// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
var  at = 0,
    ch = json.charAt(at);

var next = function(){
  at++
  ch = json.charAt(at);
  return ch;
};

var error = function(message){
  console.log(message);
  throw undefined;
};

var value = function(){
  if(ch === '{'){
    return object();
  }
  if(ch === '['){
    return array();
  }
  if(ch === 't'){
      at = at +4;
      return true;
  }
  if(ch === 'f'){
    at = at +5;
    return false;
  }
  if(ch === 'n'){
    at = at +4;
    return null;
  }
  if(ch === '-' || (ch && ch >= 0 && ch <= 9)){
    return num();
  }
  if(ch === '\"'){
    return string();
  }
};

function nully(){
  if(ch === 'n' && ch+1 === 'u' && ch+2 === 'l' && ch+3 === 'l'){
    ch = ch +4;
    return null;
  } else {
    error('bad null');
  }
};

function num(){
  var number = '';
  if(ch === '-'){
    number += '-';
    next();
  }
  while((ch >= 0 && ch <= 9) || ch === '.'){
    number += ch;
    next();
  }
  if(!isNaN(Number(number))){
    return Number(number);
  } else {
    error('bad number');
  }
};

function string(){
  var str = "";
  var escapes =
{'b': '\b',
'n': '\n',
'f': '\f',
'r': '\r',
't': '\t',
'\"': '\"',
'\\': '\\',
'\v': '\v'};

if(ch !== '\"') error('should start with \"');
next();

while(ch){
  if(ch === '\"'){

    return str;
  }
  if(ch === '\\'){
    next();
    if(escapes.hasOwnProperty(ch)){
      str += escapes[ch];
    }
  } else {
    str += ch;
  }
  next();
}
};

function array(){
  var test1;
  var test2;
  var doNothing = [',',' '];
  var ar = [];
  if(ch !== '[') error('array should start with [');
  next();
 for(at; at < json.length; next()){
  if(doNothing.indexOf(ch) === -1){
    if(ch === ']'){
      next();
      return ar;
    } else {
      ar.push(value());
      if(ch === ']'){
        at--;
        }
    }
  }
 }

   if(ar === undefined || ch !== ']'){
      error('array didnt work or was not correct');
   }


 return ar;
};

function object(){
  var exceptions = [':', ',', ' '];
  var obj = {};
  var lastKey;
  if(ch !== '{') error('object should start with {');
  next();

  for(at; at < json.length; next()){
  if(exceptions.indexOf(ch) === -1){
    if(ch === '}'){
    next();
    return obj;
  }
   if(!lastKey){
    lastKey = value();
    obj[lastKey];
  } else {
    obj[lastKey] = value();
    lastKey = undefined;
    if(ch === '}'){
    next();
    return obj;
  }
  }
}

  }
  return obj;
};

return value();
};

console.log(parseJSON('["foo", "bar"'));
console.log(parseJSON('["foo", "bar\\"]'));
  // console.log(JSON.parse('["foo", "bar"'));
  // console.log(parseJSON('["foo", "bar"'));
// console.log(parseJSON('["and you can\'t escape thi\s"]'));
// console.log(parseJSON('[{"genre":"comedy","movies":[{"name":"Elf","score":8.7}]}]'));
// console.log(parseJSON('[]'));
// console.log(parseJSON('{"foo": ""}'));
// console.log(parseJSON('{}'));
// console.log(parseJSON('{"foo": "bar"}'));
// console.log(parseJSON('["one", "two", "falty"]'));
// console.log(parseJSON('{"a": "b", "c": "d"}'));
// console.log(parseJSON('[null,false,true]'));
// console.log(parseJSON('{"foo": true, "bar": false, "baz": null}'));
// console.log(parseJSON('[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]'));
// console.log(parseJSON('{"boolean, true": true, "boolean, false": false, "null": null }'));
//
// console.log(parseJSON('{"a":{"b":"c"}}'));
// console.log(parseJSON('{"a":["b", "c"]}'));
// console.log(parseJSON('[{"a":"b"}, {"c":"d"}]'));
// console.log(parseJSON('{"a":[],"c": {}, "b": true}'));
// console.log(parseJSON('[[[["foo"]]]]'));

// escaping
// '["\\\\\\"\\"a\\""]',
// '["and you can\'t escape thi\s"]';
