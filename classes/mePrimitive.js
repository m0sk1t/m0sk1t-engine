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
    me.primitive.circle = function(aCtx,aPTCenter,aR) {
		this.type = "circle";
		this.X = aPTCenter.X;
		this.Y = aPTCenter.Y;
		this.R = aR;
		aCtx.beginPath();
		aCtx.arc(this.X,this.Y,this.R,0,Math.PI*2,true);
		aCtx.stroke();
		return this;
    };
    me.primitive.rectF = function(aCtx,aPTCoord,aPTSize,aColor) {
		this.type = "rectF";
		this.X = aPTCoord.X;
		this.Y = aPTCoord.Y;
		this.W = aPTSize.X;
		this.H = aPTSize.Y;
		aCtx.fillStyle=aColor;
		aCtx.fillRect(aPTCoord.X,aPTCoord.Y,aPTSize.X,aPTSize.Y);
		return this;
    };
    me.primitive.rectS = function(aCtx,aPTCoord,aPTSize,aColor) {
		this.X = aPTCoord.X;
		this.Y = aPTCoord.Y;
		this.W = aPTSize.X;
		this.H = aPTSize.Y;
		this.type = "rectS";
		aCtx.strokeStyle=aColor;
		aCtx.strokeRect(aPTC.X,aPTC.Y,aPTS.X,aPTS.Y);
		return this;
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
	me.primitive.drawTextF = function(aCtx,aFont,aText,aPTCoord,aFillStyle,aStrokeStyle) {
		aCtx.fillStyle = aFillStyle;
		aCtx.strokeStyle = aStrokeStyle;
		aCtx.font = aFont;
		aCtx.fillText(aText, aPTCoord.X, aPTCoord.Y);
	};
	me.primitive.drawTextS = function(aCtx,aFont,aText,aPTCoord,aStrokeStyle) {
		aCtx.strokeStyle = aStrokeStyle;
		aCtx.font = aFont;
		aCtx.strokeText(aText, aPTCoord.X, aPTCoord.Y);
	};
})();