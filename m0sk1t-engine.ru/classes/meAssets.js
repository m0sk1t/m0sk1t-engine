;(function (me) {
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
	
	me.assets.isLoaded = function () {
		var loaded = true;
		for (var k in me.assets.cashe) {
			if(me.assets.cashe.hasOwnProperty(k) && !me.assets.cashe[k]) {
				loaded = false;
			}
		}
		return loaded;
	};
	
	me.assets.callback = function (callbacksArr) {
		me.assets.callbacks.push(callbacksArr);
	};
	
	me.assets.get = function (fileName) {
		return me.assets.cashe[fileName];
	};

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
			clear = (clear == undefined)?true:clear;
			if (clear) {
				//me.core.layers[context].clearRect(this.prevPos[0], this.prevPos[1], this.prevPos[2], this.prevPos[3]);
				me.core.layers[context].clearRect(this.destArea[0], this.destArea[1], this.destArea[2], this.destArea[3]);
			}
			me.core.layers[context].drawImage(me.assets.get(this.img), this.tileArea[0], this.tileArea[1], this.tileArea[2], this.tileArea[3], this.destArea[0], this.destArea[1], this.destArea[2], this.destArea[3]);
			return this;
		}
	});

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
		draw: function(context) {
			if (this.currentFrame >= this.maxFrames) {
				this.currentFrame = 0;
			}
			me.core.layers[context].clearRect(this.coord.x, this.coord.y, this.spriteSize.W*this.scale, this.spriteSize.H*this.scale);
			me.core.layers[context].drawImage(me.assets.get(this.img), this.currentFrame*this.spriteSize.W, this.offset.x*this.spriteSize.H, this.spriteSize.W, this.spriteSize.H, this.coord.x, this.coord.y, this.spriteSize.W*this.scale, this.spriteSize.H*this.scale);
			this.currentFrame++;
			return this;
		}
	});
}(window.me));