function initGame() {
	var point = me.primitive.Point, vect = me.primitive.Vector;
	me.core.init(["#gameArea","#bg"]);
	var startTime = new Date(), currentTime = new Date(), fps = 1;
	var	canvasWidth = me.core.canvas["#gameArea"].width,
		canvasHeight = me.core.canvas["#gameArea"].height;
	var	platformLength = Math.floor(canvasHeight/5), platformSpeed = 2, shifty = 1, ballRadius = 30, ballSpeedx = 5, ballSpeedy = 5;
	var	Player = new me.primitive.Rect(new point(0,0), new point(20,platformLength),"#077","fill"),
		Enemy = new me.primitive.Rect(new point(canvasWidth-20,0), new point(20,platformLength),"#733","fill"),
		Ball = new me.primitive.Circle(new point(Math.floor(canvasWidth/2),Math.floor(canvasHeight/2)),ballRadius,"fill","#337");
	var	PlayerOneScoreCoord = new point(Math.floor(canvasWidth/2)-50,50),
		DelimeterCoord = new point(Math.floor(canvasWidth/2),50),
		PlayerTwoScoreCoord = new point(Math.floor(canvasWidth/2)+50,50),
		fpsCoord = new point(canvasWidth-20,20),
		PlayerOneScore = 0, PlayerTwoScore = 0;
	var left = new vect(new point(0,0),new point(0,canvasHeight)),
		right = new vect(new point(canvasWidth,0),new point(canvasWidth,canvasHeight)),
		top = new vect(new point(0,0),new point(canvasWidth,0)),
		bottom = new vect(new point(0,canvasHeight),new point(canvasWidth,canvasHeight));
	var	playerOneTxT = new me.primitive.TextFill(), playerTwoTxT = new me.primitive.TextFill(),
		delimeterTxT = new me.primitive.TextFill(), fpsTxT = new me.primitive.TextFill();
	var ballFunc = function() {
		var	currentBallCoord = {}, ballCoord = Ball.getCoord();
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
		if (Player.getCoord().y < 0) { Player.setCoord(new point(0,1)); }
		if (Player.getCoord().y + platformLength > canvasHeight) { Player.setCoord(new point(0,canvasHeight - platformLength - 1)); }
	};
	(function gameLoop() {
		console.log('start');
		currentTime = new Date;
		var	playerPos = Player.getCoord(),
			playerSize = Player.getSize();
		if(playerPos.y < 0||playerPos.y+playerSize.y > canvasHeight) { moveToCanvas(); }
		AIFunc();
		ballFunc();
		playerOneTxT.draw("#gameArea",["40","bold","Arial"],PlayerOneScore,PlayerOneScoreCoord,"#66CD00","#66CD00");
		delimeterTxT.draw("#gameArea",["40","bold","Arial"],":",DelimeterCoord,"#66CD00","#66CD00");
		playerTwoTxT.draw("#gameArea",["40","bold","Arial"],PlayerTwoScore,PlayerTwoScoreCoord,"#66CD00","#66CD00");
		shifty = Math.floor((currentTime-startTime) * platformSpeed);
		if (me.input.isPressed("s")) { Player.setCoord(new point(0,Player.getCoord().y+shifty)); }
		if (me.input.isPressed("w")) { Player.setCoord(new point(0,Player.getCoord().y-shifty)); }
		Player.draw("#gameArea");
		Enemy.draw("#gameArea");
		Ball.draw("#gameArea");
		fps = 1000/(currentTime-startTime);
		startTime = currentTime;
		fpsTxT.draw("#gameArea",["20","bold","Arial"],fps,fpsCoord,"#66CD00","#66CD00");
		window.rAF(gameLoop);
	}());
}