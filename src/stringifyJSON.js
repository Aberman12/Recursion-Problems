// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
var type = typeof(obj);

if(type === 'string'){
  return '\"' + obj + '\"';
}
if(obj ===null){
  return 'null';
}

if(type === 'number' || type === 'boolean'){
  return obj.toString();
}

if(Array.isArray(obj)){
  var str = '';
  for(var i = 0; i < obj.length; i++){
          str += stringifyJSON(obj[i]) + ',';
  }
  str = str.slice(0,str.length-1);
  return '[' + str + ']';
}

if(type === 'object' && !Array.isArray(obj)){
  var objStr = '';
  var count = 1;
  var tooAr = [];

  for(var key in obj){
    if(typeof obj[key] === 'function' || typeof obj[key] === undefined){
      return '{}';
    }
      objStr += stringifyJSON(key) + ':' + stringifyJSON(obj[key]) + ',';
  }

  objStr = objStr.slice(0, objStr.length-1);
  return '{' + objStr + '}';
}

};
