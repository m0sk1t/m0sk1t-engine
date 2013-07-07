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
    me.primitive.circle = function(aCtx,aPT,aR) {
	this.type = "circle";
	this.X = aPT.X;
	this.Y = aPT.Y;
	this.R = aR;
	aCtx.beginPath();
	aCtx.arc(this.X,this.Y,this.R,0,Math.PI*2,true);
	aCtx.stroke();
	return this;
    };
    me.primitive.rectF = function(aCtx,aPTC,aPTS,aColor) {
	this.type = "rectF";
	aCtx.fillStyle=aColor;
	aCtx.fillRect(aPTC.X,aPTC.Y,aPTS.X,aPTS.Y);
    };
    me.primitive.rectS = function(aCtx,aPTC,aPTS,aColor) {
	this.type = "rectS";
	aCtx.strokeStyle=aColor;
	aCtx.strokeRect(aPTC.X,aPTC.Y,aPTS.X,aPTS.Y);
    };
    me.primitive.polyF = function(aCtx,aPointSet,aColor) {
	this.type = "polyF";
	aCtx.fillStyle = aColor;
	aCtx.beginPath();
	aCtx.moveTo(aPointSet[0].X, aPointSet[0].Y);
	for (var i=1, len = aPointSet.length; i < len; i++) {
		aCtx.lineTo(aPointSet[i].X,aPointSet[i].Y);
	}
	aCtx.closePath();
	aCtx.fill();
    };
    me.primitive.polyS = function(aCtx,aPointSet,aColor) {
	this.type = "polyS";
	aCtx.strokeStyle = aColor;
	aCtx.beginPath();
	aCtx.moveTo(aPointSet[0].X, aPointSet[0].Y);
	for (var i=1, len = aPointSet.length; i < len; i++) {
		aCtx.lineTo(aPointSet[i].X,aPointSet[i].Y);
	}
	aCtx.closePath();
	aCtx.stroke();
    };
})();