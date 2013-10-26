function initGame() {
	var point = me.primitive.point, rect = me.primitive.rectangle;
	me.core.init(["#gameArea","#bg"]);
	me.input.setKeys();
	var startTime = new Date, currentTime = new Date, fps = 1;
	var	gameCanvas = me.core.canvas["#gameArea"],
		gameContext = me.core.layers["#gameArea"],
		backgroundContext = me.core.layers["#bg"];
	var	canvasWidth = gameCanvas.width,
		canvasHeight = gameCanvas.height;
	var	platformLength = Math.floor(canvasWidth/10), platformSpeed = 50, delta = coordinate = 1,
		ballRadius = 5, ballSpeedx = ballSpeedy = 5;
	var	Player = new rect(new point(Math.floor((canvasWidth/2)-(platformLength/2)),canvasHeight-20), new point(platformLength,20),"#099","fill"),
		Bricks = [],
		Ball = new me.primitive.circle(new point(Math.floor(canvasWidth/2),Math.floor(canvasHeight/2)),ballRadius,"fill","#337");
	var	PlayerScoreCoord = new point(Math.floor(canvasWidth/2)-50,50),
		fpsCoord = new point(canvasWidth-20,20);
		PlayerScore = 0;
	var	playerTxT = new me.primitive.TextFill, fpsTxT = new me.primitive.TextFill;
	var ballFunc = function() {
		var	ballCoord = Ball.getCoord(),
			PlayerSize = Player.getSize(),
			PlayerPos = Player.getCoord();
		fpsCoord.x = Math.floor(canvasWidth-(20*fps.toString.length));
		PlayerScoreCoord.x = Math.floor(canvasWidth/2)-(50*PlayerScore.toString.length);
		if (ballCoord.y <= ballRadius || ballCoord.y+ballRadius >= canvasHeight) {
			ballSpeedy *= -1;
		}
		if (ballCoord.x <= ballRadius) {
			ballCoord.x = Math.floor(canvasWidth/2); ballCoord.y = Math.floor(canvasHeight/2);
		}
		if (ballCoord.x+ballRadius >= canvasWidth) {
			ballCoord.x = Math.floor(canvasWidth/2); ballCoord.y = Math.floor(canvasHeight/2);
		}
		if (ballCoord.x-ballRadius <= PlayerSize.x && ballCoord.y > PlayerPos.y - ballRadius && ballCoord.y < PlayerPos.y+PlayerSize.y + ballRadius) {
			ballSpeedx *= -1;
		}
		var currentBallCoord = {x:0,y:0};
		currentBallCoord.x = ballSpeedx + ballCoord.x;
		currentBallCoord.y = ballSpeedy + ballCoord.y;
		Ball.setCoord(currentBallCoord);
	};
	var BricksFunc = function() {
		
		Bricks.push(new rect(new point(canvasWidth-20,0), new point(20,platformLength),"#733","fill"));
	};
	var moveToCanvas = function() {
		if (Player.getCoord().x < 0) {
			Player.setCoord(new point(1,1));
		}
		if (Player.getCoord().x + platformLength > canvasHeight) {
			Player.setCoord(new point(0,canvasHeight - platformLength - 1));
		}
	};
	document.onkeydown = function (e) {
		var	playerPos = Player.getCoord(),
			playerSize = Player.getSize();
		if (e.keyCode === me.input.keys["w"]) {
			if(playerPos.y < 0||playerPos.y+playerSize.y > canvasHeight)
			{
				moveToCanvas();
			} else {
				delta -= platformSpeed;
			}
		}
		if (e.keyCode === me.input.keys["s"]) {
			if(playerPos.y < 0||playerPos.y+playerSize.y > canvasHeight)
			{
				moveToCanvas();
			} else {
				delta += platformSpeed;
			}
		}
	};
	function gameLoop() {
		//me.core.clear("#gameArea");
		currentTime = new Date;
		ballFunc();
		playerTxT.draw(gameContext,["50","bold","Arial"],PlayerScore,PlayerScoreCoord,"#66CD00","#66CD00");
		var shifty = delta / fps * 10 ;
		Player.setCoord(new point(0,Player.getCoord().y+shifty));
		delta -= shifty;
		Player.draw(gameContext);
		Ball.draw(gameContext);
		fps = 1000/(currentTime-startTime);
		startTime = currentTime;
		fpsTxT.draw(gameContext,["20","bold","Arial"],fps,fpsCoord,"#66CD00","#66CD00");
		me.utils.rAF(gameLoop);
	}
	gameLoop();
}