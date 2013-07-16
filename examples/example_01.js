function initGame() {
	me.core.init(["#gameArea","#bg"]);
	me.input.setKeys();
	var pLong = Math.floor(me.core.cnv["#gameArea"].height/5);
	var pSpeed = 10.5, bSpeedX = 5.5, bSpeedY = 5.5;
	var cW = me.core.cnv["#gameArea"].width, cH = me.core.cnv["#gameArea"].height;
	var bPos = new me.primitive.point(Math.floor(cW/2),Math.floor(cH/2));
	var pFirstPos = new me.primitive.point(0,0),pFirstSize = new me.primitive.point(20,pLong);
	var pSecondPos = new me.primitive.point(cW-20,0),pSecondSize = new me.primitive.point(20,pLong);
	var pOneScoreCoord = new me.primitive.point(Math.floor(cW/2)-30,30);
	var delimeterCoord = new me.primitive.point(Math.floor(cW/2),30);
	var pTwoScoreCoord = new me.primitive.point(Math.floor(cW/2)+30,30);
	var pOneScore = pTwoScore = 0;
	var ballFunc = function() {
		bPos.X += bSpeedX;
		bPos.Y += bSpeedY;
		if (bPos.X+30 <= pFirstSize.X && bPos.Y >= pFirstPos.Y && bPos.Y <= pFirstPos.Y + pFirstSize.Y) {
			bSpeedX *= -1;
			bSpeedY = Math.floor((bPos.Y - pFirstPos.Y + pFirstSize.Y / 2)/((pFirstSize.Y / 2)) * 3.0);
		}// else { pOneScore++; bPos.X = Math.floor(cW/2); bPos.Y = Math.floor(cH/2); }
		if (bPos.X+30 <= pSecondSize.X && bPos.Y >= pSecondPos.Y && bPos.Y <= pSecondPos.Y + pSecondSize.Y) {
			bSpeedX *= -1;
			bSpeedY = Math.floor((bPos.Y - pSecondPos.Y + pSecondSize.Y / 2)/((pSecondSize.Y / 2)) * 3.0);
		}// else { pTwoScore++; bPos.X = Math.floor(cW/2); bPos.Y = Math.floor(cH/2); }
	};
	var AIFunc = function() {
		pSecondPos.Y = bPos.Y; // godlike =)
	};
	var moveToCanvas = function(aItem) {
		if (aItem.Y < 0) { aItem.Y = 0; }
		if (aItem.Y + pLong > cH) { aItem.Y = cH - pLong; }
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
		me.primitive.drawTextS(me.core.layers["#gameArea"],"bold 30pt Arial",pOneScore,pOneScoreCoord,"#66CD00");
		me.primitive.drawTextS(me.core.layers["#gameArea"],"bold 30pt Arial",":",delimeterCoord,"#66CD00");
		me.primitive.drawTextS(me.core.layers["#gameArea"],"bold 30pt Arial",pTwoScore,pTwoScoreCoord,"#66CD00");
		me.primitive.rectF(me.core.layers["#gameArea"],pFirstPos,pFirstSize,"#333");
		me.primitive.rectF(me.core.layers["#gameArea"],pSecondPos,pSecondSize,"#333");
		me.primitive.circle(me.core.layers["#gameArea"],bPos,30);
		me.utils.rAF(draw);
	}
	draw();
}