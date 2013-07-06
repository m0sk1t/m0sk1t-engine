(function(){
    window.$ = me.utils.$ = function(aAttr){
	var obj = document.querySelectorAll(aAttr);
	if (obj.length === 1) {
	    return obj[0];
	} else {
	    return obj;
	}
    };
    me.utils.log = function(aMessage, aType){
	var vLoggingDiv = me.utils.$('#meLog')||false;
	if (vLoggingDiv) {
	    if (vLoggingDiv.innerHTML !== '') {
		switch (aType) {
		    case 'm':vLoggingDiv.innerHTML += '<span style="color:green;">'+aMessage+'</span><br />\n\r';    break;
		    case 'w':vLoggingDiv.innerHTML += '<span style="color:yellow;">'+aMessage+'</span><br />\n\r';   break;
		    case 'e':vLoggingDiv.innerHTML += '<span style="color:red;">'+aMessage+'</span><br />\n\r';      break;
		}
		} else {
		switch (aType) {
		    case 'm':vLoggingDiv.innerHTML = '<span style="color:green;">'+aMessage+'</span><br />\n\r';     break;
		    case 'w':vLoggingDiv.innerHTML = '<span style="color:yellow;">'+aMessage+'</span><br />\n\r';    break;
		    case 'e':vLoggingDiv.innerHTML = '<span style="color:red;">'+aMessage+'</span><br />\n\r';       break;
		}
	    }
	}
    };
    me.utils.rAF = function(aCallback) {
	var requestAnimationFrame =	window.requestAnimationFrame		||
					window.mozRequestAnimationFrame		||
					window.webkitRequestAnimationFrame	||
					window.msRequestAnimationFrame;
	return	requestAnimationFrame(aCallback)				||
		window.setTimeout(aCallback, 1000 / 60);
    };
    me.utils.tFS = function() {
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
})();