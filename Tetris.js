$(document).ready(function(){	
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	canvas.height = 800;
	canvas.width = 400;
	var grid = {
		x: 20,
		y: 40,
		px: 20,
		occupied: []
	};
	var dir = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3, MIN: 0, MAX: 3 };
	var piece = {
		I: { blocks: [0x4444, 0x0F00, 0x2222, 0x00F0], color: 'cyan'   },
		J: { blocks: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'blue'   },
		L: { blocks: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'orange' },
		O: { blocks: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'yellow' },
		S: { blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'green'  },
		T: { blocks: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'purple' },
		Z: { blocks: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'red'    }
	};
	
	ctx.fillStyle = "red";
	ctx.fillRect(0,0,20,20);	
	ctx.fillRect(40,0,20,20);
	ctx.fillRect(80,0,20,20);
	ctx.fillRect(120,0,20,20);
	ctx.fillRect(160,0,20,20);
	ctx.fillRect(200,0,20,20);
	ctx.fillRect(240,0,20,20);
	ctx.fillRect(280,0,20,20);
	ctx.fillRect(320,0,20,20);
	ctx.fillRect(360,0,20,20);
	ctx.fillRect(400,0,20,20);
//alert(piece.I.blocks[0]);

//#####################################
//controls
//#####################################
 	window.onkeydown = function(event) {
		switch(event.keyCode){
			case 38://up
				alert("UP");
				break;
			case 40://down
				alert("DOWN");
				break;
			case 39://right
				alert("RIGHT");
				break;
			case 37://left
				alert("LEFT");
				break;
		}
	} 
});








