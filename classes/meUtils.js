(function(){
	// simple crossbrowser id/class/tagname selector
	me.util.$ = function(aAttr){
		var obj = document.querySelectorAll(aAttr);
		if (obj.length === 1) {
			return obj[0];
		} else {
			return obj;
		}
	};
	// logging into <div> element with ID equal meLog
	me.util.log = function(aMessage, aType){
		var vLogDiv = me.util.$('#meLog')||false;
		if (vLogDiv) {
			if (vLogDiv.innerHTML !== '') {
				switch (aType) {
					case 'm':vLogDiv.innerHTML += '<span style="color:green;">'+aMessage+'</span><br />\n\r';	break;
					case 'w':vLogDiv.innerHTML += '<span style="color:yellow;">'+aMessage+'</span><br />\n\r';	break;
					case 'e':vLogDiv.innerHTML += '<span style="color:red;">'+aMessage+'</span><br />\n\r';		break;
				}
			} else {
				switch (aType) {
					case 'm':vLogDiv.innerHTML = '<span style="color:green;">'+aMessage+'</span><br />\n\r';	break;
					case 'w':vLogDiv.innerHTML = '<span style="color:yellow;">'+aMessage+'</span><br />\n\r';	break;
					case 'e':vLogDiv.innerHTML = '<span style="color:red;">'+aMessage+'</span><br />\n\r';		break;
				}
			}
		}
	};
	// crossbrowser shorthand for requestAnimationFrame
	me.util.rAF = function(aCallback) {
		var requestAnimationFrame =	window.requestAnimationFrame		||
						window.mozRequestAnimationFrame		||
						window.webkitRequestAnimationFrame	||
						window.msRequestAnimationFrame;
		return	requestAnimationFrame(aCallback)				||
			window.setTimeout(aCallback, 1000 / 60);
	};
	// crossbrowser shorthand for toggleFullscreen
	me.util.tFS = function() {
		if (!document.fullscreenElement &&
			!document.mozFullScreenElement && !document.webkitFullscreenElement) {
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		} else {
			if (document.cancelFullScreen) {
				document.cancelFullScreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}
		}
	};
	me.util.globalize = function() {
		var vClassList = ["$","rAF","tFS"];
		vClassList.forEach(function(key) {
			if (!window[key]) {
				window[key] = me.util[key];
			} else {
				console.log(key+' already exist');
			}
		});
	};
})();
