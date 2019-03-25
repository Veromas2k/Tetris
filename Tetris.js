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
	
	];
	
	var piece = {
		pos: {x: 9, y: 0},
		matrix: matrix[2].blocks,
		color: matrix[2].color,
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
	
	function draw(){
		ctx.clearRect(0,0,40,80);
		drawMatrix(piece.matrix,piece.pos.x,piece.pos.y,piece.color);
	}
	
	function pieceDrop(){
		piece.pos.y++;
		dropCounter = 0;
	}
	
	function update(time = 0){
		const deltaTime = time - lastTime;
		lastTime = time;
		dropCounter += deltaTime;
		if (dropCounter > dropInterval){
			checkDrop(piece.matrix);
			if(stop == true){
				//alert("!");
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
	
	update();


//#####################################
//controls
//#####################################
 	window.onkeydown = function(event) {
		switch(event.keyCode){
			case 32://space
				
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
				piece.pos.x ++;
				dropCounter = 0;
				draw();			
				break;
			case 37://left
				piece.pos.x --;
				dropCounter = 0;
				draw();			
				break;
		}
	} 
});