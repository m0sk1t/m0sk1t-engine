(function (window) {
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
})(window);(function (me) {
	// simple crossbrowser id/class/tagname selector
	me.utils.find = function (attr) {
		var obj = document.querySelectorAll(attr);
		if (obj.length === 0) {
			me.utils.log('Element(s) not found!','e');
			return null;
		}
		else {
			return obj;
		}
	};

	// logging into <div> element with ID equals meLog
	me.utils.log = function (messageText, messageType) {
		var logDiv = me.utils.find(['#meLog']).item(0);
		if (logDiv) {
			if (logDiv.innerHTML !== '') {
				switch (messageType) {
					case 'm': logDiv.innerHTML += '<span style="color:green;">' + messageText + '</span><br />\n\r';    break;
					case 'w': logDiv.innerHTML += '<span style="color:yellow;">' + messageText + '</span><br />\n\r';   break;
					case 'e': logDiv.innerHTML += '<span style="color:red;">' + messageText + '</span><br />\n\r';      break;
					default : logDiv.innerHTML += '<span style="color:red;">INVALID MESSAGE TYPE!</span><br />\n\r';    break;
				}
			}
			else {
				switch (messageType) {
					case 'm': logDiv.innerHTML = '<span style="color:green;">' + messageText + '</span><br />\n\r';     break;
					case 'w': logDiv.innerHTML = '<span style="color:yellow;">' + messageText + '</span><br />\n\r';    break;
					case 'e': logDiv.innerHTML = '<span style="color:red;">' + messageText + '</span><br />\n\r';       break;
					default : logDiv.innerHTML = '<span style="color:red;">INVALID MESSAGE TYPE!</span><br />\n\r';     break;
				}
			}
		}
	};

	// crossbrowser shorthand for requestAnimationFrame
	(function (window) {
		window.rAF = me.utils.rAF =
			window.webkitRequestAnimationFrame	||
			window.mozRequestAnimationFrame		||
			window.oRequestAnimationFrame		||
			window.msRequestAnimationFrame		||
			function (callback) {
				window.setTimeout(callback, 1000 / 60);
			};
	})(window);

	// crossbrowser shorthand for toggleFullScreen
	me.utils.tFS = function () {
		if (!!document.fullscreenElement && !!document.mozFullScreenElement && !!document.webkitFullscreenElement)         {
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			}
			else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			}
			else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		}
		else {
			if (document.cancelFullScreen) {
				document.cancelFullScreen();
			}
			else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			}
			else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}
		}
	};

	me.utils.globalize = function (functionName) {
		var utilsList = functionName || ["find", "log", "rAF", "tFS"];
		utilsList.forEach(function (key) {
			if (!!window[key]) {
				window[key] = me.utils[key];
			}
			else {
				console.log(key + ' already exists in global namespace');
			}
		});
	};
})(window.me);(function (me) {
	me.assets.cashe = {};
	me.assets.callbacks = [];
	//298874
	me.assets.loadImage = function (resourceUrl, fileName) {
		if (!me.assets.cashe[fileName]) {
			var img = new Image();
			img.onload = function () {
				me.assets.cashe[fileName] = img;
				if (me.assets.isLoaded()) {
					me.assets.callbacks.forEach(function (fn) {
						fn();
					});
				}
			};
			me.assets.cashe[fileName] = false;
			img.src = resourceUrl;
		}
	};
	
	me.assets.load = function (path, resourceArray) {
		resourceArray.forEach(function (key) {
			me.assets.loadImage(path + key, key);
			console.log(path + key + ' loaded');
		});
	};
	//303767
	me.assets.isLoaded = function () {
		var loaded = true;
		for (var k in me.assets.cashe) {
			if(me.assets.cashe.hasOwnProperty(k) && !me.assets.cashe[k]) {
				loaded = false;
			}
		}
		return loaded;
	};
	//304006
	me.assets.callback = function (callbacksArr) {
		me.assets.callbacks.push(callbacksArr);
	};
	//303964
	me.assets.get = function (fileName) {
		return me.assets.cashe[fileName];
	};
	//302871
	me.assets.count = function () {
		return me.assets.cashe.length;
	};
	//294948
	me.assets.Tile = me.core.Class({
		init: function (imageName, tileArea, destinationArea) {
			this.tileArea = tileArea;
			this.img = imageName;
			this.prevPos = [0, 0, destinationArea[2], destinationArea[3]];
			this.destArea = destinationArea;
			return this;
		},
		setPos: function (coordPoint) {
			var tmp = this.getPos();
			this.prevPos[0] = tmp.x;
			this.prevPos[1] = tmp.y;
			this.destArea[0] = coordPoint.x;
			this.destArea[1] = coordPoint.y;
			return this;
		},
		getPos: function () {
			return {x: this.destArea[0], y: this.destArea[1]};
		},
		draw: function (context, clear) {
			clear = (clear === undefined)?true:clear;
			if (clear) {
				//me.core.layers[context].clearRect(this.prevPos[0], this.prevPos[1], this.prevPos[2], this.prevPos[3]);
				me.core.layers[context].clearRect(this.destArea[0], this.destArea[1], this.destArea[2], this.destArea[3]);
			}
			me.core.layers[context].drawImage(me.assets.get(this.img), this.tileArea[0], this.tileArea[1], this.tileArea[2], this.tileArea[3], this.destArea[0], this.destArea[1], this.destArea[2], this.destArea[3]);
			return this;
		}
	});
	//303328
	me.assets.Sprite = me.core.Class({
		init: function(imageName, spriteSize, offset, coord, scale) {
			this.img = imageName;
			this.prevcoord = coord;
			this.offset = offset;
			this.coord = coord;
			this.spriteSize = spriteSize;
			this.maxFrames = me.assets.get(this.img).width / this.spriteSize.W;
			this.currentFrame = 0;
			this.scale = scale || 1;
			return this;
		},
		getCoord: function() {
			return {"x": this.coord.x, "y": this.coord.y};
		},
		appendPos: function(pt) {
			this.prevcoord = this.getCoord();
			this.coord.x += pt.x;
			this.coord.y += pt.y;
			return this;
		},
		setPos: function(pt) {
			this.prevcoord = this.coord;
			this.coord = pt;
			return this;
		},
		draw: function(context, clear) {
			clear = (clear === undefined)?true:clear;
			if (this.currentFrame >= this.maxFrames) {
				this.currentFrame = 0;
			}
			if (clear) {
				me.core.layers[context].clearRect(this.coord.x, this.coord.y, this.spriteSize.W*this.scale, this.spriteSize.H*this.scale);
			}
			me.core.layers[context].drawImage(me.assets.get(this.img), this.currentFrame*this.spriteSize.W, this.offset.x*this.spriteSize.H, this.spriteSize.W, this.spriteSize.H, this.coord.x, this.coord.y, this.spriteSize.W*this.scale, this.spriteSize.H*this.scale);
			this.currentFrame++;
			return this;
		}
	});
})(window.me);(function (me) {
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
	});

	me.primitive.Rect = me.core.Class({
		init: function (coordPoint, sizePoint, color, method) {
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
			me.core.layers[context].clearRect(this.prevcoord.x - (this.coord.x - this.prevcoord.x), this.prevcoord.y - (this.coord.y - this.prevcoord.y), this.width, this.height);
//			context.clearRect(this.coord.x, this.coord.y, this.width, this.height);
			switch (this.method) {
				case "fill": {
					me.core.layers[context].fillStyle = this.color;
					me.core.layers[context].fillRect(this.coord.x, this.coord.y, this.width, this.height);
				} break;
				case "stroke": {
					me.core.layers[context].strokeStyle = this.color;
					me.core.layers[context].strokeRect(this.coord.x, this.coord.y, this.width, this.height);
				} break;
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
})(window.me);(function (me, d) {
	me.input.mX = 0;
	me.input.mY = 0;
	me.input.keys = [];
	me.input.pressedKeys = [];

	(function() {
		me.input.keys["left"] = 37;
		me.input.keys["up"] = 38;
		me.input.keys["right"] = 39;
		me.input.keys["down"] = 40;

		me.input.keys["w"] = 87;
		me.input.keys["a"] = 65;
		me.input.keys["s"] = 83;
		me.input.keys["d"] = 68;

		me.input.keys["bs"] = 8;
		me.input.keys["tab"] = 9;
		me.input.keys["enter"] = 13;
		me.input.keys["shift"] = 16;
		me.input.keys["ctrl"] = 17;
		me.input.keys["alt"] = 18;
		me.input.keys["pause"] = 19;
		me.input.keys["capslock"] = 20;
		me.input.keys["esc"] = 27;
		me.input.keys["space"] = 32;
		me.input.keys["pageup"] = 33;
		me.input.keys["pagedown"] = 34;
		me.input.keys["end"] = 35;
		me.input.keys["home"] = 36;
		me.input.keys["insert"] = 45;
		me.input.keys["delete"] = 46;
		me.input.keys["leftwnd"] = 91;
		me.input.keys["rightwnd"] = 92;
		me.input.keys["select"] = 93;
		me.input.keys["mul"] = 106;
		me.input.keys["plus"] = 107;
		me.input.keys["minus"] = 109;
		me.input.keys["point"] = 110;
		me.input.keys["/"] = 111;
		me.input.keys["num"] = 144;
		me.input.keys["scroll"] = 145;
		me.input.keys[";"] = 186;
		me.input.keys["="] = 187;
		me.input.keys[","] = 188;
		me.input.keys["-"] = 189;
		me.input.keys["."] = 190;
		me.input.keys["/"] = 191;
		me.input.keys["`"] = 192;
		me.input.keys["["] = 219;
		me.input.keys["\\"] = 220;
		me.input.keys["]"] = 221;
		me.input.keys["\'"] = 222;
		for (var key in me.input.keys) if (me.input.keys.hasOwnProperty(key)) { me.input.pressedKeys[me.input.keys[key]] = false; }
	})();

	me.input.isPressed = function (key) {
		return me.input.pressedKeys[me.input.keys[key]];
	};

	me.input.setKey = function(keyCode, status) {
		me.input.pressedKeys[keyCode] = Boolean(status);
	};

	document.addEventListener('keydown', function(e) {
		me.input.setKey(e.keyCode, true);
	});

	document.addEventListener('keyup', function(e) {
		me.input.setKey(e.keyCode, false);
	});

	me.input.mPos = function(e) {
		e = e || window.event;
		me.input.mX	= (e.pageX || e.clientX);
		me.input.mY	= (e.pageY || e.clientY);
	};
})(window.me, document);