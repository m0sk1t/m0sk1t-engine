(function() {
    me.primitive.point = function(aX,aY) {
	this.X = aX;
	this.Y = aY;
	return this;
    };
    me.primitive.vector = function(aVec) {
	this.sX = aVec[0].x;
	this.sY = aVec[0].y;
	this.eX = aVec[1].x;
	this.eY = aVec[1].y;
	return this;
    };
    me.primitive.circle = function(aPT,aR) {
	this.type = "circle";
	this.X = aPT.X;
	this.Y = aPT.Y;
	this.R = aR;
	ctx.beginPath();
	ctx.arc(this.X,this.Y,this.R,0,Math.PI*2,true);
	ctx.stroke();
	return this;
    };
    me.primitive.rectF = function(aPTC,aPTS,aColor) {
	this.type = "rectF";
	ctx.fillStyle=aColor;
	ctx.fillRect(aPTC.X,aPTC.Y,aPTS.X,aPTS.Y);
    };
    me.primitive.rectS = function(aPTC,aPTS,aColor) {
	this.type = "rectS";
	ctx.strokeStyle=aColor;
	ctx.strokeRect(aPTC.X,aPTC.Y,aPTS.X,aPTS.Y);
    };
    me.primitive.polyF = function(aPointSet,aColor) {
	this.type = "polyF";
	ctx.fillStyle = aColor;
	ctx.beginPath();
	ctx.moveTo(aPointSet[0].X, aPointSet[0].Y);
	for (var i=1, len = aPointSet.length; i < len; i++) {
		ctx.lineTo(aPointSet[i].X,aPointSet[i].Y);
	}
	ctx.closePath();
	ctx.fill();
    };
    me.primitive.polyS = function(aPointSet,aColor) {
	this.type = "polyS";
	ctx.strokeStyle = aColor;
	ctx.beginPath();
	ctx.moveTo(aPointSet[0].X, aPointSet[0].Y);
	for (var i=1, len = aPointSet.length; i < len; i++) {
		ctx.lineTo(aPointSet[i].X,aPointSet[i].Y);
	}
	ctx.closePath();
	ctx.stroke();
    };
})();