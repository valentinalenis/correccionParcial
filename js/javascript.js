

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
	document.getElementById('memory_board').innerHTML = output;
}
//funcion que recibe como parametro las cartas y sus valores para así comparar si son iguales controlando si se muestra o no
function memoryFlipTile(tile,val){
	if(tile.innerHTML == "" && valores_memoria.length < 2){
		tile.style.background = '#FFF';
		tile.innerHTML = val;
		if(valores_memoria.length == 0){
			valores_memoria.push(val);
			memoria_ids.push(tile.id);
		} else if(valores_memoria.length == 1){
			valores_memoria.push(val);
			memoria_ids.push(tile.id);
			if(valores_memoria[0] == valores_memoria[1]){
				tiles_flipped += 2;
				// Clear both arrays
				valores_memoria = [];
            	memoria_ids = [];
				// Check to see if the whole board is cleared
				if(tiles_flipped == arreglo_memoria.length){
					alert("Board cleared... generating new board");
					document.getElementById('memory_board').innerHTML = "";
					newBoard();
				}
			} else {
				function flip2Back(){
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(memoria_ids[0]);
				    var tile_2 = document.getElementById(memoria_ids[1]);
				    tile_1.style.background = 'url(tile_bg.jpg) no-repeat';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'url(tile_bg.jpg) no-repeat';
            	    tile_2.innerHTML = "";
				    // Clear both arrays
				    valores_memoria = [];
            	    memoria_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}
