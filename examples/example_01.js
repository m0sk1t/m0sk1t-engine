function initGame() {
	var point = me.primitive.point;
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
	var	playerOneTxT = new me.primitive.TextFill, playerTwoTxT = new me.primitive.TextFill,
		delimeterTxT = new me.primitive.TextFill, fpsTxT = new me.primitive.TextFill;
	var ballFunc = function() {
		var	ballCoord = Ball.getCoord(),
			PlayerOneSize = Player.getSize(),
			PlayerTwoSize = Enemy.getSize(),
			PlayerOnePos = Player.getCoord(),
			PlayerTwoPos = Enemy.getCoord();
		fpsCoord.x = Math.floor(canvasWidth-(20*fps.toString.length));
		PlayerOneScoreCoord.x = Math.floor(canvasWidth/2)-(50*PlayerOneScore.toString.length);
		if (ballCoord.y <= ballRadius || ballCoord.y+ballRadius >= canvasHeight) {
			ballSpeedy *= -1;
		}
		if (ballCoord.x <= ballRadius) {
			PlayerTwoScore++; Ball.setCoord({x:Math.floor(canvasWidth/2),y:Math.floor(canvasHeight/2)});
		}
		if (ballCoord.x+ballRadius >= canvasWidth) {
			PlayerOneScore++; Ball.setCoord({x:Math.floor(canvasWidth/2),y:Math.floor(canvasHeight/2)});
		}
		if ((ballCoord.x-ballRadius <= PlayerOneSize.x && ballCoord.y > PlayerOnePos.y - ballRadius && ballCoord.y < PlayerOnePos.y+PlayerOneSize.y + ballRadius)||
		    (ballCoord.x+ballRadius >= PlayerTwoPos.x && ballCoord.y > PlayerTwoPos.y - ballRadius&& ballCoord.y < PlayerTwoPos.y + PlayerTwoSize.y + ballRadius)) {
			ballSpeedx *= -1;
		}
		var currentBallCoord = {x:0,y:0};
		currentBallCoord.x = ballSpeedx + ballCoord.x;
		currentBallCoord.y = ballSpeedy + ballCoord.y;
		Ball.setCoord(currentBallCoord);
	};
	var AIFunc = function() {
		Enemy.setCoord({x:canvasWidth-20, y:Ball.getCoord().y-ballRadius}); // godlike =)
	};
	var moveToCanvas = function() {
		if (Player.getCoord().y < 0) {
			Player.setCoord(new point(0,3));
		}
		if (Player.getCoord().y + platformLength > canvasHeight) {
			Player.setCoord(new point(0,canvasHeight - platformLength - 3));
		}
	};
	document.onkeydown = function (e) {
		var	playerPos = Player.getCoord(),
			playerSize = Player.getSize();
		if (e.keyCode === me.input.keys["w"]) {
			if(playerPos.y < 0||playerPos.y+playerSize.y > canvasHeight)
			{
				moveToCanvas();
			}
			pressed["w"] = true;
		}
		if (e.keyCode === me.input.keys["s"]) {
			if(playerPos.y < 0||playerPos.y+playerSize.y > canvasHeight)
			{
				moveToCanvas();
			}
			pressed["s"] = true;
		}
	};
	document.onkeyup = function (e) {
		if (e.keyCode === me.input.keys["w"]) {
			pressed["w"] = false;
		}
		if (e.keyCode === me.input.keys["s"]) {
			pressed["s"] = false;
		}
	}
	function gameLoop() {
		//me.core.clear("#gameArea");
		currentTime = new Date;
		AIFunc();
		ballFunc();
		playerOneTxT.draw(gameContext,["40","bold","Arial"],PlayerOneScore,PlayerOneScoreCoord,"#66CD00","#66CD00");
		delimeterTxT.draw(gameContext,["40","bold","Arial"],":",DelimeterCoord,"#66CD00","#66CD00");
		playerTwoTxT.draw(gameContext,["40","bold","Arial"],PlayerTwoScore,PlayerTwoScoreCoord,"#66CD00","#66CD00");
		shifty = (currentTime-startTime)*platformSpeed;
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
		me.utils.rAF(gameLoop);
	}
	gameLoop();
}