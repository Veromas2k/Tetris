$(document).ready(function(){	

//###################################
//variables
//###################################

	var gameCanvas = document.getElementById("gameCanvas");
	var ctxG = gameCanvas.getContext("2d");		
	ctxG.scale(33.3333,32);
	var previewCanvas = document.getElementById("previewCanvas");
	var ctxP = previewCanvas.getContext("2d");
	var arena;
	var maxHeight = 25;
	var maxWidth = 12;
	var dropCounter = 0;
	var dropInterval = 1000; //ms
	var lastTime = 0;
	var stop = false;
	var currentPiece;
	var dir = 1;
	
	var piece = [
		{matrix: [// T = 0
			[0, 1, 0],
			[1, 1, 1,],
			[0, 0, 0],
		],color: "purple"},
		{matrix: [//J = 1
			[1, 1, 1],
			[0, 0, 1],
			[0, 0, 0],
		], color: "blue"},
		{matrix: [//L = 2
			[1, 1, 1],
			[1, 0, 0],
			[0, 0, 0],
		], color: "orange"},
		{matrix: [// Z = 3
			[1, 1, 0],
			[0, 1, 1],
			[0, 0, 0],
		], color: "red"},
		{matrix: [// S = 4
			[0, 1, 1],
			[1, 1, 0],
			[0, 0, 0],
		], color: "green"},
		{matrix: [// O = 5
			[1, 1],
			[1, 1],
		], color: "yellow"},
		{matrix: [// I = 6
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
		], color: "DeepSkyBlue"},
	];

//###################################
//functions
//###################################

	function createMatrix(w,h){
		const matrix = [];
		while (h--){
			matrix.push(new Array(w).fill(7));
		}
		return matrix;
	}

	function pickPiece(number){
		currentPiece = {
			pos: {x: 5, y: 0},
			matrix: piece[number].matrix
		};
	}
	
	function rowClear(matrix){
	}

	function rotate(matrix,dir){
		for (let y = 0; y < matrix.length; ++y){
			for (let x = 0; x < y; ++x){
				[
					matrix[x][y],
					matrix[y][x],
				] = [ 
					matrix[y][x],
					matrix[x][y],
				];
			}
		} 
		if(dir > 0){
			matrix.forEach(row => row.reverse());
		}else{
			matrix.reverse();
		}
	} 
	
	function checkDrop(matrix){
		matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if(value !== 7){
					if((currentPiece.pos.y + y)+1 == maxHeight){
						stop = true;
					}else if(arena[y + (currentPiece.pos.y) + 1][x + (currentPiece.pos.x)] !== 7){
						stop = true;
					}
				}
			});
		});
	}
		
	function pieceDrop(){
		currentPiece.pos.y++;
		dropCounter = 0;
	}
	
	function mergeArenaPiece(arena,px,py,piece){
		currentPiece.matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if(value !== 7){
					arena[y + py][x + px] = value;
				}
			});
		});		
	}	
	
	function update(time = 0){
		const deltaTime = time - lastTime;
		lastTime = time;
		dropCounter += deltaTime;
		if (dropCounter > dropInterval){
			checkDrop(currentPiece.matrix);
			if(stop == true){
				mergeArenaPiece(arena,currentPiece.pos.x,currentPiece.pos.y,currentPiece);
				pickPiece(Math.floor(Math.random() * (7)));
				stop = false;
			}else{
				pieceDrop();
			}
		rowClear(arena);
		}
		draw();
		if(arena[2][6] !== 7){
			alert("GAME OVER");
			start.style.display = "block";
		}else{
			requestAnimationFrame(update);
		}
	}
	
	function draw(){
		ctxG.clearRect(0,0,maxWidth,maxHeight);
		drawArena(arena);
		drawMatrix(currentPiece.matrix,currentPiece.pos.x,currentPiece.pos.y);
	}
	
	function drawArena(field){
		field.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value !== 7) {	
					getFillstyleColor(value);
					ctxG.fillRect(x, y, 1, 1);
					ctxG.fillStyle = "black";
					ctxG.lineWidth = 0.08;
					ctxG.strokeRect(x, y, 1, 1);
				}
			});
		});
	}	
	
	function drawMatrix(matrix,px,py,color){
		matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value !== 7) {
					getFillstyleColor(value);
					ctxG.fillRect(px + x,  py + y, 1, 1);
					ctxG.fillStyle = "black";
					ctxG.lineWidth = 0.08;
					ctxG.strokeRect(px + x,py + y, 1, 1);
				}
			});
		});
	}
	
	function getFillstyleColor(value){
		switch(value){
			case 0:
				ctxG.fillStyle = piece[0].color;
				break;
			case 1:
				ctxG.fillStyle = piece[1].color;
				break;
			case 2:
				ctxG.fillStyle = piece[2].color;
				break;
			case 3:
				ctxG.fillStyle = piece[3].color;
				break;
			case 4:
				ctxG.fillStyle = piece[4].color;
				break;
			case 5:
				ctxG.fillStyle = piece[5].color;
				break;						
			case 6:
				ctxG.fillStyle = piece[6].color;
				break;
		}
	}
//####################################
//game
//####################################

start.addEventListener("click",startScript);
function startScript(){
	arena = createMatrix(maxWidth,maxHeight);
	start.style.display = "none";
	pickPiece(Math.floor(Math.random() * (7)));
	update();
};

//#####################################
//controls
//#####################################

 	window.onkeydown = function(event) {
		switch(event.keyCode){
			case 32://space
				//DEBUG VISUALS
				console.table(arena);
				break;
			case 38://up
				dir++;
				if(dir>3){
					dir = 1;
				}
				rotate(currentPiece.matrix,dir);
				draw();
				break;
			case 40://down
				checkDrop(currentPiece.matrix);
				if(stop == false){
					pieceDrop();
				}
				if(stop == true){
					mergeArenaPiece(arena,currentPiece.pos.x,currentPiece.pos.y,currentPiece);
					stop = false;
				}
				break;
			case 39://right
				currentPiece.pos.x ++;
				dropCounter = dropCounter - 22;		
				break;
			case 37://left
				currentPiece.pos.x --;
				dropCounter = dropCounter - 22;		
				break;
		}
	} 
});