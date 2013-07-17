(function() {
    me.primitive.point = function(aX,aY) {
		this.X = aX;
		this.Y = aY;
		return this;
    };
    me.primitive.vector = function(aFirstPoint,aSecondPoint) {
		this.first = aFirstPoint;
		this.second = aSecondPoint;
		return this;
    };
    me.primitive.circle = function(aCtx,aPTCenter,aRadius) {
		this.type = "circle";
		this.coord = aPTCenter;
		this.radius = aRadius;
		aCtx.beginPath();
		aCtx.arc(this.coord.X,this.coord.Y,this.radius,0,Math.PI*2,true);
		aCtx.stroke();
		return this;
    };
    me.primitive.rectangle = function(aCtx,aPTCoord,aPTSize,aColor,aMethod) {
		this.type = "rect";
		this.coord = aPTCoord;
		this.width = aPTSize.X;
		this.height = aPTSize.Y;
		switch (aMethod) {
			case "fill": {
				aCtx.fillStyle=aColor;
				aCtx.fillRect(this.coord.X,this.coord.Y,this.width,this.height);
			}; break;
			case "stroke": {
				aCtx.strokeStyle=aColor;
				aCtx.strokeRect(this.coord.X,this.coord.Y,this.width,this.height);
			}; break;
		}
		return this;
    };
    me.primitive.polygon = function(aCtx,aPointSet,aColor,aMethod) {
		this.type = "polygon";
		this.points = aPointSet;
		aCtx.fillStyle = aColor;
		aCtx.beginPath();
		aCtx.moveTo(aPointSet[0].X, aPointSet[0].Y);
		for (var i=1, len = aPointSet.length; i < len; i++) {
			aCtx.lineTo(aPointSet[i].X,aPointSet[i].Y);
		}
		aCtx.closePath();
		switch (aMethod) {
			case "fill": {
				aCtx.fill();
			};  break;
			case "stroke": {
				aCtx.stroke();
			};  break;
		}
    };
	me.primitive.drawTextFill = function(aCtx,aFont,aText,aPTCoord,aFillStyle,aStrokeStyle) {
		aCtx.fillStyle = aFillStyle;
		aCtx.strokeStyle = aStrokeStyle;
		aCtx.font = aFont;
		aCtx.fillText(aText, aPTCoord.X, aPTCoord.Y);
	};
	me.primitive.drawTextStroke = function(aCtx,aFont,aText,aPTCoord,aStrokeStyle) {
		aCtx.strokeStyle = aStrokeStyle;
		aCtx.font = aFont;
		aCtx.strokeText(aText, aPTCoord.X, aPTCoord.Y);
	};
})();