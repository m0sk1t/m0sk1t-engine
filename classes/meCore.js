(function() {
	if (window.me === undefined) {
		window.me = {};
		var vClassList = ["core","utils","primitive","assets","physics","input"];
		vClassList.forEach(function(key) { me[key]={}; });
	}
	me.core.cnv = [];
	me.core.layers = [];
	me.core.init = function(aName, aW, aH) {
		aName.forEach(function(key){
			me.core.cnv[key] = me.utils.$(key);
			me.core.cnv[key].width = aW  || document.width;
			me.core.cnv[key].height = aH || document.height;
			me.core.layers[key] = me.core.cnv[key].getContext('2d');
		});
	};
	me.core.cls = function(aCnv) {
		me.core.cnv[aCnv].width = me.core.cnv[aCnv].width;
	};
	me.core.ifOut = function(aItem, aCtx) {
		return (aItem.X < 0 || aItem.Y < 0 || aItem.X > me.core.cnv[aCtx].width || aItem.Y > me.core.cnv[aCtx].height);
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