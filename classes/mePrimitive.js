(function (me) {
	me.primitive ={
		Point: me.core.Class({
			init: function(x, y) {
				this.type = "Point";
				this.x = x || 0;
				this.y = y || 0;
				return this;
			}
		}),
		Vector: me.core.Class({
			init: function(startPoint, endPoint) {
				this.type = "Vector";
				this.start = startPoint || {"x": 0, "y": 0};
				this.end = endPoint || {"x": 0, "y": 0};
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
			getDistance: function() {
				return me.core.distance(this.start, this.end);
			},
			getAngle: function() {
				return Math.atan2((this.end.y - this.start.y), (this.end.x - this.start.x));
			},
			draw: function (context) {
				me.core.layers[context].beginPath();
				me.core.layers[context].moveTo(this.start.x, this.start.y);
				me.core.layers[context].lineTo(this.end.x, this.end.y);
				me.core.layers[context].closePath();
				me.core.layers[context].stroke();
				return this;
			}
		}),
		Circle: me.core.Class({
			init: function (params, method, color) {
				this.type = "Circle";
				this.color = color;
				this.method = method;
				this._x = ~~params[0];
				this._y = ~~params[1];
				this.x = ~~params[0];
				this.y = ~~params[1];
				this.r = ~~params[2];
				return this;
			},
			getCoord: function () {
				return new me.primitive.Point(this.x, this.y);
			},
			setCoord: function (coordArray) {
				this._x = this.x;
				this._y = this.y;
				this.x = ~~coordArray[0];
				this.y = ~~coordArray[1];
				return this;
			},
			appendCoord: function (coordArray) {
				this._x = this.x;
				this._y = this.y;
				this.x += ~~coordArray[0];
				this.y += ~~coordArray[1];
				return this;
			},
			setRadius: function (radius) {
				this.r = radius;
				return this;
			},
			setColor: function (color) {
				this.color = color;
			},
			draw: function (context) {
				me.core.layers[context].clearRect(this._x - this.r, this._y - this.r, this.r * 2, this.r * 2);
	//			context.clearRect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
				me.core.layers[context].beginPath();
				me.core.layers[context].arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
				switch (this.method) {
					case "fill": {
						me.core.layers[context].fillStyle = this.color;
						me.core.layers[context].fill();
					} break;
					case "stroke": {
						me.core.layers[context].strokeStyle = this.color;
						me.core.layers[context].stroke();
					} break;
					default: me.utils.log('Unknown draw type "'+this.method+'" in class "'+this.type+'"','e');
				}
				return this;
			}
		}),
		Rect: me.core.Class({
			init: function (params, color, method) {
				this.type = "Rect";
				this.color = color;
				this._x = ~~params[0];
				this._y = ~~params[1];
				this.x = ~~params[0];
				this.y = ~~params[1];
				this.w = ~~params[2];
				this.h = ~~params[3];
				this.hW = ~~(this.w/2);
				this.hH = ~~(this.h/2);
				this.method = method;
				this.left = this.x;
				this.right = this.x + this.w;
				this.top = this.y;
				this.bottom = this.y + this.h;
				return this;
			},
			getCoord: function () {
				return new me.primitive.Point(this.x, this.y);
			},
			getSize: function () {
				return new me.primitive.Point(this.w, this.h);
			},
			setCoord: function (coordArray) {
				this._x = this.x;
				this._y = this.y;
				this.x = ~~coordArray[0];
				this.y = ~~coordArray[1];
				return this;
			},
			appendCoord: function (coordArray) {
				this._x = this.x;
				this._y = this.y;
				this.x += ~~coordArray[0];
				this.y += ~~coordArray[1];
				return this;
			},
			setSize: function (sizeArray) {
				this.w = ~~sizeArray[0];
				this.h = ~~sizeArray[1];
				return this;
			},
			draw: function (context) {
				me.core.layers[context].clearRect(this._x - (this.x - this._x), this._y - (this.y - this._y), this.w, this.h);
	//			context.clearRect(this.x, this.y, this.w, this.h);
				switch (this.method) {
					case "fill": {
						me.core.layers[context].fillStyle = this.color;
						me.core.layers[context].fillRect(this.x, this.y, this.w, this.h);
					} break;
					case "stroke": {
						me.core.layers[context].strokeStyle = this.color;
						me.core.layers[context].strokeRect(this.x, this.y, this.w, this.h);
					} break;
					default: me.utils.log('Unknown draw type "'+this.method+'" in class "'+this.type+'"','e');
				}
				return this;
			}
		}),
		Polygon: me.core.Class({
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
					default: me.utils.log('Unknown draw type "'+this.method+'" in class "'+this.type+'"','e');
				}
			}
		}),
		TextFill: function () {
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
		},
		TextStroke: function () {
			this.draw = function (context, font, text, coordPoint, strokeStyle) {
				me.core.layers[context].strokeStyle = strokeStyle;
				me.core.layers[context].font = aFont;
				me.core.layers[context].strokeText(text, coordPoint.x, coordPoint.y);
				return this;
			};
			return this;
		}
	};
})(window.me);