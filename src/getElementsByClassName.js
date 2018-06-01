// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
var ar = [];
var body = document.body;
var check = (element)=>{
  if(element.classList && element.classList.contains(className)){
    ar.push(element);
  }
}

function iterate(node, test){
  test(node);
  node = node.firstChild;

  while(node){
    iterate(node,test);
    node = node.nextSibling;
  }
}
iterate(body,check);
return ar;

};
