;(function (me) {
	me.primitive.Point = me.core.Class({
		constructor: function(x, y) {
			this.type = "Point";
			this.x = x;
			this.y = y;
			return this;
		}
	});

	me.primitive.Vector = me.core.Class({
		constructor: function(startPoint, endPoint) {
			this.type = "Vector";
			this.start = startPoint;
			this.end = endPoint;
			return this;
		},
		setStart: function(Point) {
			this.start = Point;
			return this;
		},
		setEnd: function(Point) {
			this.end = Point;
			return this;
		},
		getStart: function() {
			return this.start;
		},
		getEnd: function() {
			return this.end;
		},
		draw: function (context) {
			context.beginPath();
			context.moveTo(this.start.x, this.start.y);
			context.lineTo(this.end.x, this.end.y);
			context.closePath();
			context.stroke();
			return this;
		}
	});

	me.primitive.Circle = me.core.Class({
		constructor: function (centerPoint, radius, method, color) {
			this.type = "Circle";
			this.color = color;
			this.prevcoord = centerPoint;
			this.coord = centerPoint;
			this.radius = radius;
			this.method = method;
			return this;
		},
		getCoord: function () {
			return this.coord;
		},
		setCoord: function (coordPoint) {
			this.prevcoord = this.coord;
			this.coord = coordPoint;
			return this;
		},
		setRadius: function (radius) {
			this.radius = radius;
			return this;
		},
		setColor: function (color) {
			this.color = color;
		},
		draw: function (context) {
			context.clearRect(this.prevcoord.x - this.radius, this.prevcoord.y - this.radius, this.radius * 2, this.radius * 2);
//			context.clearRect(this.coord.x - this.radius, this.coord.y - this.radius, this.radius * 2, this.radius * 2);
			context.beginPath();
			context.arc(this.coord.x, this.coord.y, this.radius, 0, Math.PI * 2, true);
			switch (this.method) {
                case "fill": {
                    context.fillStyle = this.color;
                    context.fill();
                } break;
                case "stroke": {
                    context.strokeStyle = this.color;
                    context.stroke();
                } break;
				default: me.utils.log('Unknown draw type "'+this.method+'" in class "'+this.type+'"','e');
			}
			return this;
		}
	});

	me.primitive.Rect = me.core.Class({
		constructor: function (coordPoint, sizePoint, color, method) {
			this.type = "Rect";
			this.color = color;
			this.prevcoord = coordPoint;
			this.coord = coordPoint;
			this.width = sizePoint.x;
			this.height = sizePoint.y;
			this.halfWidth = this.width/2;
			this.halfHeight = this.height/2;
			this.method = method;
			return this;
		},
		getCoord: function () {
			return this.coord;
		},
		getSize: function () {
			return {x: this.width, y: this.height};
		},
		setCoord: function (coordPoint) {
			this.prevcoord = this.coord;
			this.coord = coordPoint;
			return this;
		},
		setSize: function (sizePoint) {
			this.width = sizePoint.x;
			this.height = sizePoint.y;
			return this;
		},
		draw: function (context) {
			context.clearRect(this.prevcoord.x - (this.coord.x - this.prevcoord.x), this.prevcoord.y - (this.coord.y - this.prevcoord.y), this.width, this.height);
//			context.clearRect(this.coord.x, this.coord.y, this.width, this.height);
			switch (this.method) {
                case "fill": {
					context.fillStyle = this.color;
					context.fillRect(this.coord.x, this.coord.y, this.width, this.height);
                } break;
                case "stroke": {
                    context.strokeStyle = this.color;
                    context.strokeRect(this.coord.x, this.coord.y, this.width, this.height);
                } break;
				default: me.utils.log('Unknown draw type "'+this.method+'" in class "'+this.type+'"','e');
			}
			return this;
		}
	});

	me.primitive.Polygon = me.core.Class({
		constructor: function (context, pointSet, color, method) {
			this.type = "Polygon";
			this.pts = pointSet;
			this.method = method;
			context.fillStyle = color;
			context.beginPath();
			context.moveTo(this.pts[0].x, this.pts[0].y);
			for (var i = 1, len = this.pts.length; i < len; i++) {
				context.lineTo(this.pts[i].x, this.pts[i].y);
			}
			context.closePath();
			switch (this.method) {
				case "fill": context.fill(); break;
				case "stroke": context.stroke(); break;
			}
		}
	});

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