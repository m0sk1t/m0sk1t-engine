function initGame() {
	var game = jPGE;
	game.init('#gameArea');
	//var image = game.assetLdr.load([{"name":"hl","path":"hl.png"}]);
	document.onmousemove = function (e) {
		game.getMousePos(e);
	};
	function draw() {
		game.cls();
		game.primitive.circle({X:game.mouseX,Y:game.mouseY},30);
		rAF(draw);
	}
	draw();
/*
	var gameMain = jPGE;
	var gameInner = jPGE;
	gameMain.init('#gameArea');
	gameInner.init('#inner', 200, 200);
	function draw() {
		gameMain.primitive.rectF({X:0,Y:0},{X:cnv.width,Y:cnv.height},'#000000');
		gameInner.primitive.polyF([{X:50,Y:50},{X:100,Y:100},{X:50,Y:100}],'#FFFFFF');
	}
	draw();
*/}