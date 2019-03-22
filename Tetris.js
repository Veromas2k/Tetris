$(document).ready(function(){	
//###################################
//								constants
//###################################

	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	canvas.height = 800;
	canvas.width = 400;
	ctx.scale(20,20);
	ctx.fillStyle = "black";

	

	
//###################################
//								Variables
//###################################

	var matrix = [
		[0, 0, 0],
		[1, 1, 1,],
		[0, 1, 0],
	];
	
	function drawMatrix(matrix){
		matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value !== 0) {
					ctx.fillStyle ="purple";
					ctx.fillRect(x, y, 1, 1);
					ctx.fillStyle = "black";
					ctx.lineWidth = 0.05;
					ctx.strokeRect(x, y, 1, 1);
				}
			});
		});
	}
	
	drawMatrix(matrix);
//####################################
//									game
//####################################


/* 	ctx.fillStyle = "black";
	ctx.lineWidth = 0.1;
	ctx.strokeRect(6,6,4,2); */

//#####################################
//controls
//#####################################
 	window.onkeydown = function(event) {
		switch(event.keyCode){
			case 32://space
				
			break;
			case 38://up

				break;
			case 40://down
	
				break;
			case 39://right
			
				break;
			case 37://left
			
				break;
		}
	} 
});