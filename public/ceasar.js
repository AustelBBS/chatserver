function encrypt (inputString, shiftedpositions, direction){
  if(direction === '>'){
    //encriptar normal, nada que hacer
    shiftedpositions = shiftedpositions
  } else if (direction === '<') {
    //desencriptar, lo mismo pero con - shiftedpositions
    shiftedpositions = (-1) * shiftedpositions
  }
  else {
    return "Error, direction can be either > or <.";
  }
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




/*Depreciated:- Contains bugs
function encrypt(inputString, shiftedpositions, direction) {
  //Abecedario
  var ABC = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];
  //Si va hacia la derecha
  if(direction === ">") {
    
    var newString = "";
    var shiftedCharArray = [];
    //Obtiene cada caracter en la cadena a encriptar
    for (var i = 0; i < inputString.length; i++) {
      
      var tempChar = inputString.charAt(i);
      
      for(var j = 0; j < ABC.length; j++) {
        //mientras la posicion actual más el numero de movida sea menor que el largo
        //del arreglo 
        if(tempChar == ABC[j] && (j+shiftedpositions) < ABC.length) {
            shiftedCharArray.push(ABC[j+shiftedpositions]);
        }
        //si no calcula la nueva posicion
        else if(tempChar == ABC[j]) {
          var pos = (j + shiftedpositions) - ABC.length;
          shiftedCharArray.push(ABC[pos]);
        }  else if (tempChar == ' ') {
          shiftedCharArray.push(' ');
          j = ABC.length;
        }
      
      }
    
      
    }
    //junta el arreglo que se ha estado creando en un solo string
    newString = shiftedCharArray.join('');
    
    return newString;
    
  } 
  //basicamente lo mismo pero hacia la izquierda
  else if(direction === "<") {
    var newString = "";
    var shiftedCharArray = [];
    for (var i = 0; i < inputString.length; i++) {
      var tempChar = inputString.charAt(i);
      
      for(var j = 0; j < ABC.length; j++) {
        if(tempChar == ABC[j] && (j-shiftedpositions) >= 0) {
            shiftedCharArray.push(ABC[j-shiftedpositions]);
        }
        else if(tempChar == ABC[j]) {
          var pos = (j - shiftedpositions)+ABC.length;
          shiftedCharArray.push(ABC[pos]);
        } else if (tempChar === ' ') {
          shiftedCharArray.push(' ');
          j = ABC.length;
        }
      }
    }
    newString = shiftedCharArray.join('');
    return newString;
  }
  //si se le envia una ¨direccion¨ incorecta aqui se maneja esos errores
  else {
    //excepciones aqui
    return "Parametro incorrecto";
  }
}*/