(function(){
	if (window.me === undefined) {
		window.me = {};
		var vClassList = ["core","util","primitive","assets","physics"];
		vClassList.forEach(function(key) { me[key]={}; });
	}
	me.core.getMousePos = function(e) {
		this.mouseX		= (e.pageX || e.clientX);
		this.mouseY		= (e.pageY || e.clientY);
		return this;
	};
	me.core.isImage = function(aObj)  {
		return Object.prototype.toString.call(aObj) === "[object HTMLImageElement]"
	};

	me.core.isCanvas = function(aObj) {
		return Object.prototype.toString.call(aObj) === "[object HTMLCanvasElement]"
	};

	me.core.isDrawable = function(aObj) {
		return jaws.isImage(aObj) || jaws.isCanvas(aObj)
	};

	me.core.isString = function(aObj) {
		return (typeof aObj == "string")
	};

	me.core.isArray = function(aObj)  {
		if(aObj === undefined) return false;
		return !(aObj.constructor.toString().indexOf("Array") == -1);
	};

	me.core.isFunction = function(aObj) {
		return (Object.prototype.toString.call(aObj) === "[object Function]")
	};
})();