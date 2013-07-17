function initGame() {
	me.core.init(["#gameArea","#bg"]);
	me.input.setKeys();
	var gameCanvas = me.core.canvas["#gameArea"],
		gameContext = me.core.layers["#gameArea"];
	var pLong = Math.floor(gameCanvas.height/5),
		pSpeed = 25,
		bSpeedX = bSpeedY = 3;
	var canvasWidth = gameCanvas.width,
		canvasHeight = gameCanvas.height;
	var bPos = new me.primitive.point(Math.floor(canvasWidth/2),Math.floor(canvasHeight/2)),
		bRadius = 30;
	var pFirstPos = new me.primitive.point(0,0),
		pFirstSize = new me.primitive.point(20,pLong);
	var pSecondPos = new me.primitive.point(canvasWidth-20,0),
		pSecondSize = new me.primitive.point(20,pLong);
	var pOneScoreCoord = new me.primitive.point(Math.floor(canvasWidth/2)-50,50),
		delimeterCoord = new me.primitive.point(Math.floor(canvasWidth/2),50),
		pTwoScoreCoord = new me.primitive.point(Math.floor(canvasWidth/2)+50,50);
	var pOneScore = pTwoScore = 0;
	var ballFunc = function() {
		bPos.X += bSpeedX;
		bPos.Y += bSpeedY;
		pOneScoreCoord.X = Math.floor(canvasWidth/2)-(50*pOneScore.toString.length);
		if (bPos.Y <= bRadius || bPos.Y+bRadius >= canvasHeight) {
			bSpeedY *= -1;
		}
		if (bPos.X <= bRadius) {
			pTwoScore++; bPos.X = Math.floor(canvasWidth/2); bPos.Y = Math.floor(canvasHeight/2);
		}
		if (bPos.X+bRadius >= canvasWidth) {
			pOneScore++; bPos.X = Math.floor(canvasWidth/2); bPos.Y = Math.floor(canvasHeight/2);
		}
		if ((bPos.X-Math.floor(bRadius/2) < pFirstSize.X && bPos.Y >= pFirstPos.Y - Math.floor(bRadius/2) && bPos.Y <= pFirstPos.Y+pFirstSize.Y + Math.floor(bRadius/2))||(bPos.X+bRadius >= pSecondPos.X && bPos.Y >= pSecondPos.Y - Math.floor(bRadius/2)&& bPos.Y <= pSecondPos.Y + pSecondSize.Y + Math.floor(bRadius/2))) {
			bSpeedX *= -1;
		}
	};
	var AIFunc = function() {
		pSecondPos.Y = bPos.Y-bRadius; // godlike =)
	};
	var moveToCanvas = function(aItem) {
		if (aItem.Y < 0) {
			aItem.Y = 0;
		}
		if (aItem.Y + pLong >= canvasHeight) {
			aItem.Y = canvasHeight - pLong;
		}
	};
	document.onkeydown = function (e) {
		if (e.keyCode === me.input.keys["w"]) {
			if(me.core.isOut(pFirstPos,"#gameArea"))
			{
				moveToCanvas(pFirstPos);
			} else {
				pFirstPos.Y -= pSpeed;
			}
		}
		if (e.keyCode === me.input.keys["s"]) {
			if(me.core.isOut(pFirstPos,"#gameArea"))
			{
				moveToCanvas(pFirstPos);
			} else {
				pFirstPos.Y += pSpeed;
			}
		}
	};
	function draw() {
		me.core.clear("#gameArea");
		AIFunc();
		ballFunc();
		me.primitive.drawTextStroke(gameContext,"bold 50pt Arial",pOneScore,pOneScoreCoord,"#66CD00");
		me.primitive.drawTextStroke(gameContext,"bold 50pt Arial",":",delimeterCoord,"#66CD00");
		me.primitive.drawTextStroke(gameContext,"bold 50pt Arial",pTwoScore,pTwoScoreCoord,"#66CD00");
		me.primitive.rectangle(gameContext,pFirstPos,pFirstSize,"#333","fill");
		me.primitive.rectangle(gameContext,pSecondPos,pSecondSize,"#333","fill");
		me.primitive.circle(gameContext,bPos,30);
		me.utils.rAF(draw);
	}
	draw();
}