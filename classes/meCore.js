(function() {
	if (window.me === undefined) {
		window.me = {};
		var vClassList = ["core","utils","primitive","assets","physics","input"];
		vClassList.forEach(function(key) { me[key]={}; });
	}
	me.core.canvas = [];
	me.core.layers = [];
	me.core.init = function(aName,aW,aH) {
		var tmp = me.utils.$(aName);
		for (var i = 0, len = tmp.length;i < len;i++) {
			me.core.canvas[aName[i]] = tmp.item(i);
			me.core.canvas[aName[i]].width = aW  || document.width;
			me.core.canvas[aName[i]].height = aH || document.height;
			if (me.core.isCanvas(me.core.canvas[aName[i]])) {
				me.core.layers[aName[i]] = me.core.canvas[aName[i]].getContext('2d');
			}
		};
	};
	me.core.clear = function(aCnv) {
		me.core.canvas[aCnv].width = me.core.canvas[aCnv].width;
	};
	me.core.isOut = function(aItem, aCtx) {
		return (aItem.X < 0 || aItem.Y < 0 || aItem.X > me.core.canvas[aCtx].width || aItem.Y > me.core.canvas[aCtx].height);
	};
	me.core.collision = function(aFirst,aSecond) {
		var coll=false;
		switch (aFirst.type) {
			case "circle": coll = me.core.circleCollision(aFirst,aSecond);	break;
		}
		return coll;
	};
	me.core.circleCollision = function(aFirst,aSecond) {
		return ((aFirst.R+aSecond.R) > Math.sqrt(Math.pow(aFirst.X-aSecond.X,2)+Math.pow(aFirst.Y-aSecond.Y,2)));
	};
	me.core.isImage = function(aObj)  {
		return Object.prototype.toString.call(aObj) === "[object HTMLImageElement]";
	};
	me.core.isCanvas = function(aObj) {
		return Object.prototype.toString.call(aObj) === "[object HTMLCanvasElement]";
	};
	me.core.isDrawable = function(aObj) {
		return jaws.isImage(aObj) || jaws.isCanvas(aObj);
	};
	me.core.isString = function(aObj) {
		return (typeof aObj === "string");
	};
	me.core.isArray = function(aObj)  {
		if(aObj === undefined) { return false; }
		return !(aObj.constructor.toString().indexOf("Array") === -1);
	};
	me.core.isFunction = function(aObj) {
		return (Object.prototype.toString.call(aObj) === "[object Function]");
	};
})();