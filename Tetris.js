$(document).ready(function(){	
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	canvas.height = 800;
	canvas.width = 400;
	var currentPiece = [
		{ state:"" , x: 0 , y: 0},
		{ state:"" , x: 20 , y: 0},
		{ state:"" , x: 40 , y: 0},
		{ state:"" , x: 60 , y: 0},
		{ state:"" , x: 0 , y: 20},
		{ state:"" , x: 20 , y: 20},
		{ state:"" , x: 40 , y: 20},
		{ state:"" , x: 60 , y: 20},
		{ state:"" , x: 0 , y: 40},
		{ state:"" , x: 20 , y: 40},
		{ state:"" , x: 40 , y: 40},
		{ state:"" , x: 60 , y: 40},
		{ state:"" , x: 0 , y: 60},
		{ state:"" , x: 20 , y: 60},
		{ state:"" , x: 40 , y: 60},
		{ state:"" , x: 60 , y: 60}]
	var PieceString;
	var PieceStringCheck;
	var varPiece;
	var varPieceCheck;
	var varPos;
	var lastKey;
	var move;
	var border = {minX: 0, maxX: 380, minY: 0, maxY: 780};
	var grid = {
		x: 20,
		y: 40,
		px: 20,
		occupied: []
	};
	var dir = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3};
	var piece = {
		I: { blocks: [0x4444, 0x0F00, 0x2222, 0x00F0], color: 'cyan'   },
		J: { blocks: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'blue'   },
		L: { blocks: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'orange' },
		O: { blocks: [0x0660, 0x0660, 0x0660, 0x0660], color: 'yellow' },
		S: { blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'green'  },
		T: { blocks: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'purple' },
		Z: { blocks: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'red'    }
	};
	var Position = {x: 160,y: 0};
	var PieceRandom = 0;
	var PieceVarR = [piece.I,piece.J,piece.L,piece.O,piece.S,piece.T,piece.Z];
	var PieceVar = PieceVarR[PieceRandom];
	var PiecePos = 0;
	var PiecePosCheck;
	
//#########################################	
//										functions
//#########################################
	function drawCurrentPiece(varPiece,PieceColor){
		PieceString = varPiece.toString(2);
		while (PieceString.length < 16) {
			PieceString = "0" + PieceString;
		}
		var count = 0;
		while (count < 16){
			currentPiece[count].state = PieceString.slice(count,count+1);
				if(currentPiece[count].state == 1){
					switch(currentPiece[count].x + Position.x){
						case -20:
							Position.x = Position.x + 20;
							break;
						case -40:
							Position.x = Position.x + 40;
							break;
						case 400:
							Position.x = Position.x - 20;
							break;
						case 420:
							Position.x = Position.x - 40;
							break;
					}
					if(lastKey == 0){
					}
					if(lastKey == 3){
					ctx.clearRect(0,0,400,800);
						if(currentPiece[count].x - 20 + Position.x < 0){
							move = false;
						}
					}
					if(lastKey == 1){
					ctx.clearRect(0,0,400,800);
						if(currentPiece[count].x + 20 + Position.x > 380){
							move = false;
						}
					}		
				}
			count++; 
		}
		if(lastKey == 3 && move == true){
			Position.x = Position.x - 20;
		}
		if(lastKey == 1 && move == true){
			Position.x = Position.x + 20;
		}		
		if(Position.x > 380){
			Position.x = Position.x - (Position.x - 380);
		}
		count = 0;
		while(count < 16){
			if(currentPiece[count].state == 1){
				
				ctx.fillStyle = PieceColor;
				ctx.fillRect(Position.x + currentPiece[count].x,Position.y + currentPiece[count].y,20,20);
				ctx.fillStyle = "black";
				ctx.strokeRect(Position.x + currentPiece[count].x,Position.y + currentPiece[count].y,19,19);
			}
		count++;
		}
	move = true;
	lastKey = "";
	}
	
	function  PieceTurn(varPieceCheck){
		PieceStringCheck = varPieceCheck.toString(2);
		while (PieceStringCheck.length < 16) {
			PieceStringCheck = "0" + PieceStringCheck;
		}
		alert(PieceStringCheck);
		var count = 0;
		while (count < 16){
			currentPiece[count].state = PieceStringCheck.slice(count,count+1);
			if(currentPiece[count].state == 1){
				alert(PieceStringCheck.slice(count, count+1);
			}
		count++;	
		}
		
		//###################
		PiecePos = PiecePos +1;
		if(PiecePos > 3){
			PiecePos = 0;
		}
	}
	function Redraw(){
		ctx.clearRect(0,0,400,800);
		drawCurrentPiece((PieceVar).blocks[PiecePos],(PieceVar).color);
	}
	
//####################################
//									game
//####################################

	drawCurrentPiece((PieceVar).blocks[PiecePos],(PieceVar).color);
	ctx.fillStyle = "black";
	ctx.strokeRect(160,0,80,80);

//#####################################
//controls
//#####################################
 	window.onkeydown = function(event) {
		switch(event.keyCode){
			case 32://space ########REMOVE############
				PieceRandom = PieceRandom + 1;															
				if(PieceRandom > 6){
					PieceRandom = 0;
				}
				PieceVar = PieceVarR[PieceRandom];
				Redraw();
			break;
			case 38://up
				lastKey = 0;
				PiecePosCheck = PiecePos +1;
				if(PiecePosCheck > 3){
					PiecePosCheck = 0;
				}
				PieceTurn((PieceVar).blocks[PiecePosCheck]);
				Redraw();
				//alert(PieceString);
				break;
			case 40://down
			lastKey = 2;
				Redraw();
				break;
			case 39://right
				lastKey = 1;
				Redraw();
				break;
			case 37://left
				lastKey = 3;
				Redraw();
				break;
		}
	} 
});