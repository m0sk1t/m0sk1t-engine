function initGame() {
	var point = me.primitive.point, vect = me.primitive.vector;
	me.core.init(["#gameArea","#bg"]);
	me.input.setKeys();
	var pressed = {"w":false,"s":false};
	var startTime = new Date, currentTime = new Date, fps = 1;
	var	gameCanvas = me.core.canvas["#gameArea"],
		gameContext = me.core.layers["#gameArea"];
	var	canvasWidth = gameCanvas.width,
		canvasHeight = gameCanvas.height;
	var	platformLength = Math.floor(canvasHeight/5), platformSpeed = 2, shifty = coordinate = 1,
		ballRadius = 30, ballSpeedx = ballSpeedy = 5;
	var	Player = new me.primitive.rectangle(new point(0,0), new point(20,platformLength),"#077","fill"),
		Enemy = new me.primitive.rectangle(new point(canvasWidth-20,0), new point(20,platformLength),"#733","fill"),
		Ball = new me.primitive.circle(new point(Math.floor(canvasWidth/2),Math.floor(canvasHeight/2)),ballRadius,"fill","#337");
	var	PlayerOneScoreCoord = new point(Math.floor(canvasWidth/2)-50,50),
		DelimeterCoord = new point(Math.floor(canvasWidth/2),50),
		PlayerTwoScoreCoord = new point(Math.floor(canvasWidth/2)+50,50),
		fpsCoord = new point(canvasWidth-20,20);
		PlayerOneScore = PlayerTwoScore = 0;
	var left = new vect(new point(0,0),new point(0,canvasHeight)),
		right = new vect(new point(canvasWidth,0),new point(canvasWidth,canvasHeight)),
		top = new vect(new point(0,0),new point(canvasWidth,0)),
		bottom = new vect(new point(0,canvasHeight),new point(canvasWidth,canvasHeight));
	var	playerOneTxT = new me.primitive.TextFill, playerTwoTxT = new me.primitive.TextFill,
		delimeterTxT = new me.primitive.TextFill, fpsTxT = new me.primitive.TextFill;
	var ballFunc = function() {
		var	currentBallCoord = {},
			ballCoord = Ball.getCoord();
		fpsCoord.x = Math.floor(canvasWidth-(20*fps.toString.length));
		PlayerOneScoreCoord.x = Math.floor(canvasWidth/2)-(50*PlayerOneScore.toString.length);
		if (me.core.circleAndLineCollision(Ball,top) || me.core.circleAndLineCollision(Ball,bottom)) {
			ballSpeedy *= -1;
			currentBallCoord = {x:ballSpeedx + ballCoord.x,y:ballSpeedy + ballCoord.y};
		} else if (me.core.circleAndLineCollision(Ball,left)) {
			PlayerTwoScore++; currentBallCoord = {x:Math.floor(canvasWidth/2),y:Math.floor(canvasHeight/2)};
		} else if (me.core.circleAndLineCollision(Ball,right)) {
			PlayerOneScore++; currentBallCoord = {x:Math.floor(canvasWidth/2),y:Math.floor(canvasHeight/2)};
		} else if (me.core.circleAndRectangleCollision(Ball, Player) || me.core.circleAndRectangleCollision(Ball, Enemy)) {
			ballSpeedx *= -1;
			currentBallCoord = {x:ballSpeedx + ballCoord.x,y:ballSpeedy + ballCoord.y};
		} else {
			currentBallCoord = {x:ballSpeedx + ballCoord.x,y:ballSpeedy + ballCoord.y};
		}
		Ball.setCoord(currentBallCoord);
	};
	var AIFunc = function() {
		Enemy.setCoord({x:canvasWidth-20, y:Ball.getCoord().y-ballRadius}); // godlike =)
	};
	var moveToCanvas = function() {
		if (Player.getCoord().y < 0) {
			Player.setCoord(new point(0,1));
		}
		if (Player.getCoord().y + platformLength > canvasHeight) {
			Player.setCoord(new point(0,canvasHeight - platformLength - 1));
		}
	};
	window.onkeydown = function (event) {
		switch (event.keyCode) {
			case me.input.keys["w"]: pressed["w"] = true; break;
			case me.input.keys["s"]: pressed["s"] = true; break;
		}
	};
	window.onkeyup = function (event) {
		switch (event.keyCode) {
			case me.input.keys["w"]: pressed["w"] = false; break;
			case me.input.keys["s"]: pressed["s"] = false; break;
		}
	};
	(function gameLoop() {
		console.log('start');
		currentTime = new Date;
		var	playerPos = Player.getCoord(),
			playerSize = Player.getSize();
		if(playerPos.y < 0||playerPos.y+playerSize.y > canvasHeight) { moveToCanvas(); }
		AIFunc();
		ballFunc();
		playerOneTxT.draw(gameContext,["40","bold","Arial"],PlayerOneScore,PlayerOneScoreCoord,"#66CD00","#66CD00");
		delimeterTxT.draw(gameContext,["40","bold","Arial"],":",DelimeterCoord,"#66CD00","#66CD00");
		playerTwoTxT.draw(gameContext,["40","bold","Arial"],PlayerTwoScore,PlayerTwoScoreCoord,"#66CD00","#66CD00");
		shifty = Math.floor((currentTime-startTime) * platformSpeed);
		if (pressed["s"]) {
			Player.setCoord(new point(0,Player.getCoord().y+shifty));
		}
		if (pressed["w"]) {
			Player.setCoord(new point(0,Player.getCoord().y-shifty));
		}
		Player.draw(gameContext);
		Enemy.draw(gameContext);
		Ball.draw(gameContext);
		fps = 1000/(currentTime-startTime);
		startTime = currentTime;
		fpsTxT.draw(gameContext,["20","bold","Arial"],fps,fpsCoord,"#66CD00","#66CD00");
		window.rAF(gameLoop);
	}());
}