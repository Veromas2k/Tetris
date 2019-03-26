$(document).ready(function(){	
//###################################
//constants
//###################################

	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	canvas.height = 800;
	canvas.width = 400;
	ctx.scale(20,20);
	const arena = createMatrix(20,40);
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
	
	var piece = {
		pos: {x: 9, y: 0},
		matrix: matrix[3].blocks,
		color: matrix[3].color,
	}
	
//###################################
//functions
//###################################

	function createMatrix(w,h){
		const matrix = [];
		while (h--){
			matrix.push(new Array(w).fill(0));
		}
		return matrix;
	}
	
	function drawMatrix(matrix,px,py,color){
		matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value !== 0) {
					ctx.fillStyle =color;
					ctx.fillRect(px + x,  py + y, 1, 1);
					ctx.fillStyle = "black";
					ctx.lineWidth = 0.05;
					ctx.strokeRect(px + x,py + y, 1, 1);
				}
			});
		});
	}
	
	function checkDrop(matrix){
		matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if(value == 1){
					if((piece.pos.y + y)+1 == 40){
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
					if((piece.pos.x + x)-1 == -1){
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
					if((piece.pos.x + x)+1 == 20){
						rightStop = true;
					}
				}
			});
		});
	}
	
	function draw(){
		ctx.clearRect(0,0,40,80);
		drawMatrix(piece.matrix,piece.pos.x,piece.pos.y,piece.color);
	}
	
	function pieceDrop(){
		piece.pos.y++;
		dropCounter = 0;
	}
	
	function mergeArenaPiece(arena,piece,color){
		piece.matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if(value == 1){
					arena[y = piece.pos.y + 1];
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
				mergeArenaPiece(arena,piece.matrix,piece.color);
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
	//randomizePiece();
	update();


//#####################################
//controls
//#####################################
 	window.onkeydown = function(event) {
		switch(event.keyCode){
			case 32://space
				console.table(arena);
				break;
			case 38://up
				dropCounter =0;
				draw();
				break;
			case 40://down
				checkDrop(piece.matrix);
				if(stop == false){
					pieceDrop();
				}
					draw();
				break;
			case 39://right
				checkRight(piece.matrix);
				if(rightStop == false){
					piece.pos.x ++;
				}
				rightStop = false;
				draw();			
				break;
			case 37://left
				checkLeft(piece.matrix);
				if(leftStop == false){
					piece.pos.x --;
				}
				leftStop = false;
				draw();			
				break;
		}
	} 
});