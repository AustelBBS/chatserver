function getSeed () {
  var num = Math.floor(Math.random()*15) + 1; 
  num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; 
  return num;
}

function encrypt (inputString, shiftedpositions){
  var salida = "";
  var oldASCII; //donde se guarda el codigo ascii de una letra
  var newASCII;//codigo ascii resultante luego de sumarle shiftedpositions
  //por cada letra de la entrada
  for(var c = 0; c < inputString.length; c++){
    oldASCII = inputString[c].charCodeAt();//obtenemos su codigo
    newASCII = oldASCII + shiftedpositions;//desplazamos de lugar la letra al sumarle shiftedpositions
    salida = salida.concat(String.fromCharCode(newASCII));//convertimos el nuevo codigo a string y concatenamos
  }
  return salida;
}
