function initGame() {
	me.core.init(["#gameArea","#bg"]);
	me.input.setKeys();
	var gameCanvas = me.core.cnv["#gameArea"], gameContext = me.core.layers["#gameArea"];
	var pLong = Math.floor(gameCanvas.height/5), pSpeed = 20.5, bSpeedX = 1.5, bSpeedY = 1.5;
	var cW = gameCanvas.width, cH = gameCanvas.height;
	var bPos = new me.primitive.point(Math.floor(cW/2),Math.floor(cH/2)), bRadius = 30;
	var pFirstPos = new me.primitive.point(0,0),pFirstSize = new me.primitive.point(20,pLong);
	var pSecondPos = new me.primitive.point(cW-20,0),pSecondSize = new me.primitive.point(20,pLong);
	var pOneScoreCoord = new me.primitive.point(Math.floor(cW/2)-50,50),delimeterCoord = new me.primitive.point(Math.floor(cW/2),50),pTwoScoreCoord = new me.primitive.point(Math.floor(cW/2)+50,50);
	var pOneScore = pTwoScore = 0;
	var ballFunc = function() {
		bPos.X += bSpeedX;
		bPos.Y += bSpeedY;
		if (bPos.Y <= bRadius || bPos.Y+bRadius >= cH) {
			bSpeedY *= -1;
		}
		if (bPos.X <= bRadius) {
			pTwoScore++; bPos.X = Math.floor(cW/2); bPos.Y = Math.floor(cH/2);
		}
		if (bPos.X+bRadius >= cW) {
			pOneScore++; bPos.X = Math.floor(cW/2); bPos.Y = Math.floor(cH/2);
		}
		if ((bPos.X+bRadius <= pFirstPos.X+pFirstSize.X && bPos.Y >= pFirstPos.Y && bPos.Y <= pFirstPos.Y + pFirstSize.Y)||(bPos.X+bRadius >= pSecondPos.X && bPos.Y >= pSecondPos.Y && bPos.Y <= pSecondPos.Y + pSecondSize.Y)) {
			bSpeedX *= -1;
		}
	};
	var AIFunc = function() {
		pSecondPos.Y = bPos.Y; // godlike =)
	};
	var moveToCanvas = function(aItem) {
		if (aItem.Y <= 0) { aItem.Y = 0; }
		if (aItem.Y + pLong >= cH) { aItem.Y = cH - pLong; }
	};
	document.onkeydown = function (e) {
		switch(e.keyCode) {
			case me.input.k["w"]:	if(me.core.ifOut(pFirstPos,"#gameArea"))
				{ moveToCanvas(pFirstPos); } else { pFirstPos.Y -= pSpeed;} break;
			case me.input.k["s"]:	if(me.core.ifOut(pFirstPos,"#gameArea"))
				{ moveToCanvas(pFirstPos); } else { pFirstPos.Y += pSpeed; } break;
		}
	};
	function draw() {
		me.core.cls("#gameArea");
		AIFunc();
		ballFunc();
		me.primitive.drawTextS(gameContext,"bold 50pt Arial",pOneScore,pOneScoreCoord,"#66CD00");
		me.primitive.drawTextS(gameContext,"bold 50pt Arial",":",delimeterCoord,"#66CD00");
		me.primitive.drawTextS(gameContext,"bold 50pt Arial",pTwoScore,pTwoScoreCoord,"#66CD00");
		me.primitive.rectF(gameContext,pFirstPos,pFirstSize,"#333");
		me.primitive.rectF(gameContext,pSecondPos,pSecondSize,"#333");
		me.primitive.circle(gameContext,bPos,30);
		me.utils.rAF(draw);
	}
	draw();
}