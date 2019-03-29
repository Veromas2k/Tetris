$(document).ready(function(){	
//###################################
//constants
//###################################

	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	canvas.height = 800;
	canvas.width = 400;
	ctx.scale(33.3333,32);
	const arena = createMatrix(12,25);
	const colorBlock = createMatrix(12,25);
	console.table(arena);

	

	
//###################################
//Variables
//###################################
	var dropCounter = 0;
	var dropInterval = 1000; //ms
	var lastTime = 0;
	var stop = false;
	var leftStop = false;
	var rightStop = false;
	var piece;
	var dir = 1;
	
	var matrix 
	= [{blocks: [// T = 0
		[0, 0, 0],
		[1, 1, 1,],
		[0, 1, 0],
	],color: "purple"},
	{blocks: [//J = 1
		[0, 0, 0],
		[1, 0, 0],
		[1, 1, 1],
	], color: "blue"},
	{blocks: [//L = 2
		[0, 0, 0],
		[0, 0, 1],
		[1, 1, 1,],
	], color: "orange"},
	{blocks: [// Z = 3
		[0, 0, 0],
		[1, 1, 0],
		[0, 1, 1],
	], color: "red"},
	{blocks: [// S = 4
		[0, 0, 0],
		[0, 1, 1],
		[1, 1, 0],
	], color: "green"},
	{blocks: [// O = 5
		[1, 1],
		[1, 1],
	], color: "yellow"},
	{blocks: [// I = 6
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
	], color: "DeepSkyBlue"},
	];

//###################################
//functions
//###################################

	function pickPiece(number){
		piece = {
			pos: {x: 5, y: 0},
			matrix: matrix[number].blocks,
			color: matrix[number].color,
		};
	}
	
	function createMatrix(w,h){
		const matrix = [];
		while (h--){
			matrix.push(new Array(w).fill(0));
		}
		return matrix;
	}
	
	function drawArena(matrix){
		matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value !== 0) {	
					ctx.fillStyle = colorBlock[y][x];
					ctx.fillRect(x, y, 1, 1);
					ctx.fillStyle = "black";
					ctx.lineWidth = 0.08;
					ctx.strokeRect(x, y, 1, 1);
				}
			});
		});
	}	
	
	function drawMatrix(matrix,px,py,color){
		matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value !== 0) {
					ctx.fillStyle =color;
					ctx.fillRect(px + x,  py + y, 1, 1);
					ctx.fillStyle = "black";
					ctx.lineWidth = 0.08;
					ctx.strokeRect(px + x,py + y, 1, 1);
				}
			});
		});
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
		alert([matrix]);
		if(dir > 0){
			matrix.forEach(row => row.reverse());
		}else{
			matrix.reverse();
		}
	} 
	
	function checkDrop(matrix){
		matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if(value == 1){
					if((piece.pos.y + y)+1 == 25){
						stop = true;
					}else if(arena[y + (piece.pos.y) + 1][x + (piece.pos.x)] == 1){
						stop = true;
					}
				}
			});
		});
	}
	
	function checkLeft(matrix){
		matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if(value == 1){
					if((piece.pos.x + x)-1 == -1 | arena[y + piece.pos.y][x + (piece.pos.x) - 1] == 1){
						leftStop = true;
					}
				}
			});
		});
	}
	
	function checkRight(matrix){
		matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if(value == 1){
					if((piece.pos.x + x)+1 == 12 | arena[y + piece.pos.y][x + (piece.pos.x)+1] == 1){
						rightStop = true;
					}
				}
			});
		});
	}
	
	function draw(){
		ctx.clearRect(0,0,12,25);
		drawArena(arena);
		drawMatrix(piece.matrix,piece.pos.x,piece.pos.y,piece.color);
		
	}
	
	function pieceDrop(){
		piece.pos.y++;
		dropCounter = 0;
	}
	
	function mergeArenaPiece(arena,px,py,piece,color){
		piece.matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if(value == 1){
					arena[y + py][x + px] = value;
					colorBlock[y + py][x + px] = color;
				}
			});
		});		
	}	
	
	alert(arena);
	function update(time = 0){
		const deltaTime = time - lastTime;
		lastTime = time;
		dropCounter += deltaTime;
		if (dropCounter > dropInterval){
			checkDrop(piece.matrix);
			if(stop == true){
				mergeArenaPiece(arena,piece.pos.x,piece.pos.y,piece,piece.color);
				pickPiece(Math.floor(Math.random() * (7)));
				stop = false;
			}else{
				pieceDrop();
			}
		}
		draw();
		requestAnimationFrame(update);
	}
	
	
//####################################
//game
//####################################
	pickPiece(Math.floor(Math.random() * (7)));
	update();


//#####################################
//controls
//#####################################
 	window.onkeydown = function(event) {
		switch(event.keyCode){
			case 32://space
				//pickPiece(Math.floor(Math.random() * (7)));
				console.table(arena);
				break;
			case 38://up
				dir++;
				if(dir>3){
					dir = 1;
				}
				rotate(piece.matrix,dir);
				draw();
				break;
			case 40://down
				checkDrop(piece.matrix);
				if(stop == false){
					pieceDrop();
				}
				if(stop == true){
					mergeArenaPiece(arena,piece.pos.x,piece.pos.y,piece,piece.color);
					stop = false;
				}
					//draw();
				break;
			case 39://right
				checkRight(piece.matrix);
				if(rightStop == false){
					piece.pos.x ++;
				}
				rightStop = false;
				dropCounter = dropCounter - 22;
				//draw();			
				break;
			case 37://left
				checkLeft(piece.matrix);
				if(leftStop == false){
					piece.pos.x --;
				}
				leftStop = false;
				dropCounter = dropCounter - 22;
				//draw();			
				break;
		}
	} 
});