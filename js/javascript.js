

var arreglo_memoria = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var valores_memoria = [];
var memoria_ids = [];
var tiles_flipped = 0;

//funcion que define un arreglo el cual maneja el orden.
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

//función qie realiza la carga de un nuevo tablero
function newBoard(){
	tiles_flipped = 0;
	var output = '';
    arreglo_memoria.memory_tile_shuffle();
	for(var i = 0; i < arreglo_memoria.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+arreglo_memoria[i]+'\')"></div>';
	}
	document.getElementById('tablero_memoria').innerHTML = output;
}
//funcion que recibe como parametro las cartas y sus valores para así comparar si son iguales controlando si se muestra o no la carta
function memoryFlipTile(carta,val){
	if(carta.innerHTML == "" && valores_memoria.length < 2){
		carta.style.background = '#FFF';
		carta.innerHTML = val;
		if(valores_memoria.length == 0){
			valores_memoria.push(val);
			memoria_ids.push(carta.id);
		} else if(valores_memoria.length == 1){
			valores_memoria.push(val);
			memoria_ids.push(carta.id);
			if(valores_memoria[0] == valores_memoria[1]){
				tiles_flipped += 2;
				// vacia los arreglos
				valores_memoria = [];
            	memoria_ids = [];
				// se fija que ya no haya cartas disponibles para girar
				if(tiles_flipped == arreglo_memoria.length){
					alert("Terminaste!");
					document.getElementById('tablero_memoria').innerHTML = "";
					newBoard();
				}
			} else {
				function flip2Back(){
				    // voltea las dos cartas
				    var carta_1 = document.getElementById(memoria_ids[0]);
				    var carta_2 = document.getElementById(memoria_ids[1]);
				    carta_1.style.background = 'url(tile_bg.jpg) no-repeat';
            	    carta_1.innerHTML = "";
				    carta_2.style.background = 'url(tile_bg.jpg) no-repeat';
            	    carta_2.innerHTML = "";
				    // restaura los valores de los arreglos
				    valores_memoria = [];
            	    memoria_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}
