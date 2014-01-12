;(function (me) {
	me.primitive.point = function (x, y) {
		this.type = "point";
		this.x = x;
		this.y = y;
		return this;
	};
	
	me.primitive.vector = function (firstPoint, secondPoint) {
		this.type = "vector";
		this.first = firstPoint;
		this.second = secondPoint;
		return this;
	};
	
	me.primitive.circle = function (centerPoint, radius, method, color) {
		this.type = "circle";
		this.color = color;
		this.prevcoord = centerPoint;
		this.coord = centerPoint;
		this.radius = radius;
		this.method = method;
		this.getCoord = function () {
			return this.coord;
		};
		this.setCoord = function (coordPoint) {
			this.prevcoord = this.coord;
			this.coord = coordPoint;
			return this;
		};
		this.setRadius = function (radius) {
			this.radius = radius;
			return this;
		};
		this.draw = function (context) {
			context.clearRect(this.prevcoord.x - this.radius, this.prevcoord.y - this.radius, this.radius * 2, this.radius * 2);
			context.clearRect(this.coord.x - this.radius, this.coord.y - this.radius, this.radius * 2, this.radius * 2);
			context.beginPath();
			context.arc(this.coord.x, this.coord.y, this.radius, 0, Math.PI * 2, true);
			switch (this.method) {
                case "fill": {
                    context.fillStyle = this.color;
                    context.fill();
                }; break;
                case "stroke": {
                    context.strokeStyle = this.color;
                    context.stroke();
                }; break;
			}
			return this;
		};
		return this;
	};
	
	me.primitive.rectangle = function (coordPoint, sizePoint, color, method) {
		this.type = "rectangle";
		this.color = color;
		this.prevcoord = coordPoint;
		this.coord = coordPoint;
		this.width = sizePoint.x;
		this.height = sizePoint.y;
		this.halfWidth = this.width/2;
		this.halfHeight = this.height/2;
		this.method = method;
		this.getCoord = function () {
			return this.coord;
		};
		this.getSize = function () {
			return {x: this.width, y: this.height};
		};
		this.setCoord = function (coordPoint) {
			this.prevcoord = this.coord;
			this.coord = coordPoint;
			return this;
		};
		this.setSize = function (sizePoint) {
			this.width = sizePoint.x;
			this.height = sizePoint.y;
			return this;
		};
		this.draw = function (context) {
			context.clearRect(this.prevcoord.x - (this.coord.x - this.prevcoord.x), this.prevcoord.y - (this.coord.y - this.prevcoord.y), this.width, this.height);
			context.clearRect(this.coord.x, this.coord.y, this.width, this.height);
			switch (this.method) {
                case "fill": {
					context.fillStyle = this.color;
					context.fillRect(this.coord.x, this.coord.y, this.width, this.height);
                }; break;
                case "stroke": {
                    context.strokeStyle = this.color;
                    context.strokeRect(this.coord.x, this.coord.y, this.width, this.height);
                }; break;
			}
			return this;
		};
		return this;
	};
	
	me.primitive.polygon = function (context, pointSet, color, method) {
		this.type = "polygon";
		this.points = pointSet;
		this.method = method;
		context.fillStyle = color;
		context.beginPath();
		context.moveTo(pointSet[0].x, pointSet[0].y);
		for (var i = 1, len = pointSet.length; i < len; i++) {
			context.lineTo(pointSet[i].x, pointSet[i].y);
		}
		context.closePath();
		switch (this.method) {
			case "fill": context.fill(); break;
			case "stroke": context.stroke(); break;
		}
	};
	
	me.primitive.TextFill = function () {
		this.draw = function (context, fontArray, text, coordPoint, fillStyle, strokeStyle) {
			context.fillStyle = fillStyle;
			context.strokeStyle = strokeStyle;
			this.fontSize = Number(fontArray[0]);
			fontArray[0] += 'px';
			context.font = fontArray.join(" ");
			context.clearRect(coordPoint.x,coordPoint.y - this.fontSize, text.toString().length * this.fontSize, this.fontSize);
			context.fillText(text, coordPoint.x, coordPoint.y);
			return this;
		};
		return this;
	};
	
	me.primitive.TextStroke = function () {
		this.draw = function (context, font, text, coordPoint, strokeStyle) {
			context.strokeStyle = strokeStyle;
			context.font = aFont;
			context.strokeText(text, coordPoint.x, coordPoint.y);
			return this;
		};
		return this;
	};
})(window.me);