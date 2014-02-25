;(function (window) {
	if (!window.me) {
		window.me = {};
		var vClassList = ["core", "utils", "primitive", "assets", "input"];
		vClassList.forEach(function (key) { window.me[key] = {}; });
	}
	
	me.core.each = function (iterable, func) {
		if (iterable instanceof Array) for (var i = 0; i < iterable.length; i++) func.call(iterable, iterable[i]);
		else if (iterable instanceof Object) for (var field in iterable) if (iterable.hasOwnProperty(field)) func.call(iterable, iterable[field], field);
	};
	//298873
	me.core.Class = function (protoHash) {
		var Child = protoHash.init || function () {}, i;
		if (protoHash.parent) {
			Child.prototype = new protoHash.parent();
			Child.prototype.constructor = Child;
		}
		for (i in protoHash) if (protoHash.hasOwnProperty(i) && i !== 'init') {
			Child.prototype[i] = protoHash[i];
		}
		return Child;
	};
	
	me.core.canvas = {};
	me.core.layers = {};

	me.core.init = function (namesArray, width, height) {
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
	};
	
	me.core.clear = function (canvas) {
		me.core.canvas[canvas].width = me.core.canvas[canvas].width;
	};

	me.core.toStr = function(item) {
		return Object.prototype.toString.call(item);
	};

	me.core.isOut = function (item, context) {
		return (item.x < 0 || item.y < 0 || item.x > me.core.canvas[context].width || item.y > me.core.canvas[context].height);
	};
	
	me.core.distance = function (firstPoint, secondPoint) {
		return Math.sqrt(Math.pow(firstPoint.x-secondPoint.x,2)+Math.pow(firstPoint.y-secondPoint.y,2));
	};
	
	me.core.isCollide = function (firstObject,secondObject) {
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
	};

	me.core.circleCollision = function (firstCircle, secondCircle) {
		return (Math.pow((firstCircle.radius+secondCircle.radius),2) > Math.pow(firstCircle.coord.x-secondCircle.coord.x,2)+Math.pow(firstCircle.coord.y-secondCircle.coord.y,2));
	};

	me.core.rectangleCollision = function (firstRect, secondRect) {
		return  ((((firstRect.coord.x+firstRect.width) < secondRect.coord.x) || (firstRect.coord.x > (secondRect.coord.x+secondRect.width)))||
				(((firstRect.coord.y+firstRect.height) < secondRect.coord.y) || (firstRect.coord.y > (secondRect.coord.y+secondRect.height))));
	};

	me.core.circleAndPointCollision = function (circle, point) {
		return (circle.radius > Math.sqrt(Math.pow(circle.coord.x-point.x,2)+Math.pow(circle.coord.y-point.y,2)));
	};

	me.core.circleAndLineCollision = function (circle, vector) {
		var tmpPoint = {"x": 0, "y": 0};
		if (vector.start.x === vector.end.x) {
			tmpPoint.x = vector.start.x;
			tmpPoint.y = circle.coord.y;
		} else if (vector.start.y === vector.end.y) {
			tmpPoint.x = circle.coord.x;
			tmpPoint.y = vector.start.y;
		} else {
			var xA = vector.start.x,
				yA = vector.start.y,
				xB = vector.end.x,
				yB = vector.end.y,
				xP = circle.coord.x,
				yP = circle.coord.y;
			tmpPoint.x =	(xA * Math.pow(yB - yA, 2) + xP * Math.pow(xB -xA, 2) + (xB - xA) * (yB - yA) * (yP- yA))/
							(Math.pow(yB - yA, 2) + Math.pow(xB - xA, 2));
			tmpPoint.y = ((xB - xA) * (xP - tmpPoint.x)/(yB - yA)) + yP;			
		}
		return (circle.radius > me.core.distance(circle.coord,tmpPoint));
	};
	
	me.core.circleAndRectangleCollision = function (circle, rect) {
		return ((circle.coord.x >= rect.coord.x - circle.radius)&&
				(circle.coord.x <= rect.coord.x + rect.width + circle.radius)&&
				(circle.coord.y >= rect.coord.y - circle.radius)&&
				(circle.coord.y <= rect.coord.y + rect.height + circle.radius));
	};
	
	me.core.isImage = function (object)  {
		return me.core.toStr(object) === "[object HTMLImageElement]";
	};
	
	me.core.isCanvas = function (object) {
		return me.core.toStr(object) === "[object HTMLCanvasElement]";
	};
	
	me.core.isDrawable = function (object) {
		return me.core.isImage(object) || me.core.isCanvas(object);
	};
	
	me.core.isString = function (object) {
		return (typeof object === "string");
	};
	
	me.core.isArray = function (object)  {
		return (me.core.toStr(object) === "[object Array]");
	};
	
	me.core.isFunction = function (object) {
		return (me.core.toStr(object) === "[object Function]");
	};
}(window));