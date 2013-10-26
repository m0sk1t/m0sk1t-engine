;(function () {
	// simple crossbrowser id/class/tagname selector
	me.utils.find = function (attr) { 
		var obj = document.querySelectorAll(attr);
		if (obj.length === 0) {
			throw "Element(s) not found!";
		} else {
			return obj;
		}
	};
	
	// logging into <div> element with ID equals meLog
	me.utils.log = function (messageText, messageType) {
		var logDiv = me.utils.$(['#meLog']).item(0) || false;
		if (logDiv) {
			if (logDiv.innerHTML !== '') {
				switch (messageType) {
					case 'm': logDiv.innerHTML += '<span style="color:green;">' + messageText + '</span><br />\n\r';	break;
					case 'w': logDiv.innerHTML += '<span style="color:yellow;">' + messageText + '</span><br />\n\r';	break;
					case 'e': logDiv.innerHTML += '<span style="color:red;">' + messageText + '</span><br />\n\r';	break;
				}
			} else {
				switch (messageType) {
					case 'm': logDiv.innerHTML = '<span style="color:green;">' + messageText + '</span><br />\n\r';	break;
					case 'w': logDiv.innerHTML = '<span style="color:yellow;">' + messageText + '</span><br />\n\r';	break;
					case 'e': logDiv.innerHTML = '<span style="color:red;">' + messageText + '</span><br />\n\r';	break;
				}
			}
		}
	};
	
	// crossbrowser shorthand for requestAnimationFrame
	(function () {
		window.rAF = me.utils.rAF =
			window.webkitRequestAnimationFrame	||
			window.mozRequestAnimationFrame		||
			window.oRequestAnimationFrame		||
			window.msRequestAnimationFrame		||
			function (callback, element) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();
	
	// crossbrowser shorthand for toggleFullScreen
	me.utils.tFS = function () {
		if (!!document.fullscreenElement && !!document.mozFullScreenElement && !!document.webkitFullscreenElement)         {
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
	
	me.utils.globalize = function (functionName) {
		var utilsList = functionName || ["$", "log", "rAF", "tFS"];
		utilsList.forEach(function (key) {
			if (!!window[key]) {
				window[key] = me.utils[key];
			} else {
				console.log(key + ' already exists in global namespace');
			}
		});
	};
}());