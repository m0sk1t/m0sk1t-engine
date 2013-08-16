;(function() {
	if (window.me === undefined) {
		window.me = {};
		var vClassList = ["core","utils","primitive","assets","physics","input"];
		vClassList.forEach(function(key) { me[key]={}; });
	}
	me.core.canvas = [];
	me.core.layers = [];
	me.core.init = function(namesArray,width,height) {
		var tmp = me.utils.$(namesArray);
		for (var i = 0, len = tmp.length;i < len;i++) {
			me.core.canvas[namesArray[i]] = tmp.item(i);
			me.core.canvas[namesArray[i]].width = width  || document.width;
			me.core.canvas[namesArray[i]].height = height || document.height;
			if (me.core.isCanvas(me.core.canvas[namesArray[i]])) {
				me.core.layers[namesArray[i]] = me.core.canvas[namesArray[i]].getContext('2d');
			}
		};
	};
	me.core.clear = function(canvas) {
		me.core.canvas[canvas].width = me.core.canvas[canvas].width;
	};
	me.core.isOut = function(item, context) {
		return (item.x < 0 || item.y < 0 || item.x > me.core.canvas[context].width || item.y > me.core.canvas[context].height);
	};
	me.core.isCollide = function(firstObject,secondObject) {
		var coll=false;
		switch (firstObject.type) {
			case "circle": coll = me.core.circleCollision(firstObject,secondObject);	break;
			case "rectangle": coll = me.core.rectangleCollision(firstObject,secondObject);	break;
		}
		return coll;
	};
	me.core.circleCollision = function(firstObject,secondObject) {
		return ((firstObject.R+secondObject.R) > Math.sqrt(Math.pow(firstObject.X-secondObject.X,2)+Math.pow(firstObject.Y-secondObject.Y,2)));
	};
	me.core.rectangleCollision = function(firstObject,secondObject) {
		return
		((((firstObject.coord.x+firstObject.width) < secondObject.coord.x) || (firstObject.coord.x > (secondObject.coord.x+secondObject.width)))||
		(((firstObject.coord.y+firstObject.height) < secondObject.coord.y) || (firstObject.coord.y > (secondObject.coord.y+secondObject.height))));
	};
	me.core.isImage = function(object)  {
		return Object.prototype.toString.call(object) === "[object HTMLImageElement]";
	};
	me.core.isCanvas = function(object) {
		return Object.prototype.toString.call(object) === "[object HTMLCanvasElement]";
	};
	me.core.isDrawable = function(object) {
		return jaws.isImage(object) || jaws.isCanvas(object);
	};
	me.core.isString = function(object) {
		return (typeof object === "string");
	};
	me.core.isArray = function(object)  {
		if(object === undefined) { return false; }
		return !(object.constructor.toString().indexOf("Array") === -1);
	};
	me.core.isFunction = function(object) {
		return (Object.prototype.toString.call(object) === "[object Function]");
	};
})();