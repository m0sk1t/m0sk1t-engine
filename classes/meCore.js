(function (window) {
	if (!window.me) {
		window.me = {};
		var vClassList = ["core", "utils", "primitive", "assets", "input"];
		vClassList.forEach(function (key) { window.me[key] = {}; });
	}
	me.core = {
		canvas: {},
		layers: {},
		each: function (iterable, func) {
			if (iterable instanceof Array) for (var i = 0; i < iterable.length; i++) func.call(iterable, iterable[i]);
			else if (iterable instanceof Object) for (var field in iterable) if (iterable.hasOwnProperty(field)) func.call(iterable, iterable[field], field);
		},
		//298873
		Class: function (protoHash) {
			var Child = protoHash.init || function () {}, i;
			if (protoHash.parent) {
				Child.prototype = new protoHash.parent();
				Child.prototype.constructor = Child;
			}
			for (i in protoHash) if (protoHash.hasOwnProperty(i) && i !== 'init') {
				Child.prototype[i] = protoHash[i];
			}
			return Child;
		},
		init: function (namesArray, width, height) {
			var tmp = me.utils.find(namesArray);
			var i = 0, len = 0;
			if (tmp) {
				for (i = 0, len = tmp.length; i < len; i++) {
					me.core.canvas[namesArray[i]] = tmp[i];
					me.core.canvas[namesArray[i]].width  = (width	|| document.width)	|| document.documentElement.clientWidth;
					me.core.canvas[namesArray[i]].height = (height	|| document.height)	|| document.documentElement.clientHeight;
					if (me.core.isCanvas(me.core.canvas[namesArray[i]])) {
						me.core.layers[namesArray[i]] = me.core.canvas[namesArray[i]].getContext('2d');
					}
				}
			}
			else {
				for (i = 0, len = namesArray.length; i < len; i++) {
					me.core.canvas[namesArray[i]] = document.createElement('canvas');
					me.core.canvas[namesArray[i]].width  = (width	|| document.width)	|| document.documentElement.clientWidth;
					me.core.canvas[namesArray[i]].height = (height	|| document.height)	|| document.documentElement.clientHeight;
					me.core.layers[namesArray[i]] = me.core.canvas[namesArray[i]].getContext('2d');
				}
			}
		},
		clear: function (canvas) {
			me.core.canvas[canvas].width = me.core.canvas[canvas].width;
		},
		toStr: function(item) {
			return Object.prototype.toString.call(item);
		},
		isOut: function (item, context) {
			return (item.x < 0 || item.y < 0 || item.x > me.core.canvas[context].width || item.y > me.core.canvas[context].height);
		},
		distance: function (firstPoint, secondPoint) {
			return Math.sqrt(Math.pow(firstPoint.x-secondPoint.x,2)+Math.pow(firstPoint.y-secondPoint.y,2));
		},
		isCollide: function (firstObject,secondObject) {
			var coll = false;
			switch (firstObject.type) {
				case "Circle":{
					switch (secondObject.type) {
						case "Point":		coll = me.core.circleAndPointCollision(firstObject,secondObject);		break;
						case "Vector":		coll = me.core.circleAndLineCollision(firstObject,secondObject);		break;
						case "Circle":		coll = me.core.circleCollision(firstObject,secondObject);				break;
						case "Rectangle":   coll = me.core.circleAndRectangleCollision(firstObject,secondObject);	break;
					}
				}
			}
			return coll;
		},
		circleCollision: function (firstCircle, secondCircle) {
			return (Math.pow((firstCircle.r+secondCircle.r),2) > Math.pow(firstCircle.x-secondCircle.x,2)+Math.pow(firstCircle.y-secondCircle.y,2));
		},
		rectangleCollision: function (firstRect, secondRect) {
			return  ((((firstRect.x+firstRect.w) < secondRect.x) || (firstRect.x > (secondRect.x+secondRect.w)))||
					(((firstRect.y+firstRect.h) < secondRect.y) || (firstRect.y > (secondRect.y+secondRect.h))));
		},
		circleAndPointCollision: function (circle, point) {
			return (circle.r * circle.r > Math.pow(circle.x-point.x,2)+Math.pow(circle.y-point.y,2));
		},
		circleAndLineCollision: function (circle, vector) {
			var tmpPoint = {"x": 0, "y": 0};
			if (vector.start.x === vector.end.x) {
				tmpPoint.x = vector.start.x;
				tmpPoint.y = circle.y;
			} else if (vector.start.y === vector.end.y) {
				tmpPoint.x = circle.x;
				tmpPoint.y = vector.start.y;
			} else {
				var xA = vector.start.x,
					yA = vector.start.y,
					xB = vector.end.x,
					yB = vector.end.y,
					xP = circle.x,
					yP = circle.y;
				tmpPoint.x =	(xA * Math.pow(yB - yA, 2) + xP * Math.pow(xB -xA, 2) + (xB - xA) * (yB - yA) * (yP- yA))/
								(Math.pow(yB - yA, 2) + Math.pow(xB - xA, 2));
				tmpPoint.y = ((xB - xA) * (xP - tmpPoint.x)/(yB - yA)) + yP;
			}
			return (circle.r > me.core.distance({"x":circle.x, "y":circle.y},tmpPoint));
		},
		circleAndRectangleCollision: function (circle, rect) {
			return ((circle.x >= rect.x - circle.r)&&
					(circle.x <= rect.x + rect.w + circle.r)&&
					(circle.y >= rect.y - circle.r)&&
					(circle.y <= rect.y + rect.h + circle.r));
		},
		isImage: function (object)  {
			return me.core.toStr(object) === "[object HTMLImageElement]";
		},
		isCanvas: function (object) {
			return me.core.toStr(object) === "[object HTMLCanvasElement]";
		},
		isDrawable: function (object) {
			return me.core.isImage(object) || me.core.isCanvas(object);
		},
		isString: function (object) {
			return (typeof object === "string");
		},
		isArray: function (object)  {
			return (me.core.toStr(object) === "[object Array]");
		},
		isFunction: function (object) {
			return (me.core.toStr(object) === "[object Function]");
		},
		go: function (gameLoop) {
			gameLoop.init();
			(function loop() {
				gameLoop.update();
				gameLoop.draw();
				me.utils.rAF(loop);
			})();
		}
	};
})(window);