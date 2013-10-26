;(function () {
	me.assets.cashe = {};
	me.assets.callbacks = [];
	
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
	
	me.assets.load = function (path, resourceArray, ext) {
		resourceArray.forEach(function (key) {
			me.assets.loadImage(path + key + '.' + ext, key);
		});
	};
	
	me.assets.isLoaded = function () {
		var loaded = true;
		for (var k in me.assets.cashe) {
			if(me.assets.cashe.hasOwnProperty(k) && !me.assets.cashe[k]) {
				loaded = false;
			}
		}
		return loaded;
	}
	
	me.assets.call = function (callbacksArr) {
		me.assets.callbacks.push(callbacksArr);
	}
	
	me.assets.get = function (fileName) {
		return me.assets.cashe[fileName];
	}

	me.assets.count = function () {
		return me.assets.cashe.length;
	}

	me.assets.tile = function (image, tileArea, destArea) {
		this.tileArea = tileArea;
		this.prevPos = [0, 0, destArea[2], destArea[3]];
		this.destArea = destArea;
		this.setPos = function (coordPoint) {
			var tmp = this.getPos();
			this.prevPos[0] = tmp.x;
			this.prevPos[1] = tmp.y;
			this.destArea[0] = coordPoint.x;
			this.destArea[1] = coordPoint.y;
		}
		this.getPos = function (coordPoint) {
			return {x: this.destArea[0], y: this.destArea[1]};
		}
		this.draw = function (context) {
			context.clearRect(this.prevPos[0], this.prevPos[1], this.prevPos[2], this.prevPos[3]);
			context.clearRect(this.destArea[0], this.destArea[1], this.destArea[2], this.destArea[3]);
			context.drawImage(me.assets.get(image), this.tileArea[0], this.tileArea[1], this.tileArea[2], this.tileArea[3], this.destArea[0], this.destArea[1], this.destArea[2], this.destArea[3]);
		};
	}
})();