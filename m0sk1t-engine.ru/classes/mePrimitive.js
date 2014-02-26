(function (me) {
	me.primitive.Point = me.core.Class({
		init: function(x, y) {
			this.type = "Point";
			this.x = x;
			this.y = y;
			return this;
		}
	});

	me.primitive.Vector = me.core.Class({
		init: function(startPoint, endPoint) {
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
			me.core.layers[context].beginPath();
			me.core.layers[context].moveTo(this.start.x, this.start.y);
			me.core.layers[context].lineTo(this.end.x, this.end.y);
			me.core.layers[context].closePath();
			me.core.layers[context].stroke();
			return this;
		}
	});

	me.primitive.Circle = me.core.Class({
		init: function (centerPoint, radius, method, color) {
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
			me.core.layers[context].clearRect(this.prevcoord.x - this.radius, this.prevcoord.y - this.radius, this.radius * 2, this.radius * 2);
//			context.clearRect(this.coord.x - this.radius, this.coord.y - this.radius, this.radius * 2, this.radius * 2);
			me.core.layers[context].beginPath();
			me.core.layers[context].arc(this.coord.x, this.coord.y, this.radius, 0, Math.PI * 2, true);
			switch (this.method) {
				case "fill":
					me.core.layers[context].fillStyle = this.color;
					me.core.layers[context].fill();
					break;
				case "stroke":
					me.core.layers[context].strokeStyle = this.color;
					me.core.layers[context].stroke();
					break;
				default: me.utils.log('Unknown draw type "'+this.method+'" in class "'+this.type+'"','e');
			}
			return this;
		}
	});

	me.primitive.Rect = me.core.Class({
		init: function (coordPoint, sizePoint, color, method) {
			this.type = "Rect";
			this.color = color;
			this.prevcoord = coordPoint;
			this.coord = coordPoint;
			this.width = sizePoint.x;
			this.height = sizePoint.y;
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
			me.core.layers[context].clearRect(this.prevcoord.x - (this.coord.x - this.prevcoord.x), this.prevcoord.y - (this.coord.y - this.prevcoord.y), this.width, this.height);
//			context.clearRect(this.coord.x, this.coord.y, this.width, this.height);
			switch (this.method) {
				case "fill":
					me.core.layers[context].fillStyle = this.color;
					me.core.layers[context].fillRect(this.coord.x, this.coord.y, this.width, this.height);
					break;
				case "stroke":
					me.core.layers[context].strokeStyle = this.color;
					me.core.layers[context].strokeRect(this.coord.x, this.coord.y, this.width, this.height);
					break;
				default: me.utils.log('Unknown draw type "'+this.method+'" in class "'+this.type+'"','e');
			}
			return this;
		}
	});

	me.primitive.Polygon = me.core.Class({
		init: function (context, pointSet, color, method) {
			this.type = "Polygon";
			this.pts = pointSet;
			this.method = method;
			me.core.layers[context].fillStyle = color;
			me.core.layers[context].beginPath();
			me.core.layers[context].moveTo(this.pts[0].x, this.pts[0].y);
			for (var i = 1, len = this.pts.length; i < len; i++) {
				me.core.layers[context].lineTo(this.pts[i].x, this.pts[i].y);
			}
			me.core.layers[context].closePath();
			switch (this.method) {
				case "fill": me.core.layers[context].fill(); break;
				case "stroke": me.core.layers[context].stroke(); break;
			}
		}
	});

	me.primitive.TextFill = function () {
		this.draw = function (context, fontArray, text, coordPoint, fillStyle, strokeStyle) {
			me.core.layers[context].fillStyle = fillStyle;
			me.core.layers[context].strokeStyle = strokeStyle;
			this.fontSize = Number(fontArray[0]);
			fontArray[0] += 'px';
			me.core.layers[context].font = fontArray.join(" ");
			me.core.layers[context].clearRect(coordPoint.x,coordPoint.y - this.fontSize, text.toString().length * this.fontSize, this.fontSize);
			me.core.layers[context].fillText(text, coordPoint.x, coordPoint.y);
			return this;
		};
		return this;
	};

	me.primitive.TextStroke = function () {
		this.draw = function (context, font, text, coordPoint, strokeStyle) {
			me.core.layers[context].strokeStyle = strokeStyle;
			me.core.layers[context].font = aFont;
			me.core.layers[context].strokeText(text, coordPoint.x, coordPoint.y);
			return this;
		};
		return this;
	};
}(window.me))