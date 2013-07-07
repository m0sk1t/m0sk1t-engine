#m0sk1t::engine#

Hello there! This is a yet another flexible library for HTML5 ```<canvas>``` tag manipilation 
(which also containing framework for fast development of 2d platformer games) named **m0sk1t::engine**.

###Description:###
_*m0sk1t::engine*_ consist of one base class named _*core*_ and several helper classes.
The _*util*_ class containing some utils for common actions.

#####me.util.$()#####
It's just a wrapper for _*querySelector()*_ named _*$()*_ as in jQuery library. Needed to provide fast finding DOM elements by _ID_, _ClassName_ or _TagName_.
So, this is an using example:

```javascript
//you may do it by this method
var cnv = me.util.$('.gameCanvas');
//canvas is now equal the first <canvas> element with ClassName equal gameCanvas
//or by the shorten way after calling me.util.globalize()
var cnv = $('.gameCanvas');
```

#####me.util.rAF()#####
Crossbrowser wrapper for _*requestAnimationFrame(aCallback)*_ function. Needed to provide recursive call of updating and drawing functions.
So, this is an using example:

```javascript
var gameLoop = function() {
	updateGame();
	drawSprite();
	me.util.rAF(gameLoop());
	//or shorten way by using only rAF(gameLoop()) after calling me.util.globalize()
}
gameLoop();
```

#####me.util.tFS()#####
Crossbrowser wrapper for _*toggleFullScreen()*_ function. Needed to provide switching to fullscreen mode and back.
So, this is an using example:

```javascript
document.addEventListener('keyup',updateGame(ee));
//...
var updateGame = function(e) {
	//...
	if (e.keyCode == 13) {
		me.util.tFS();
		//or shorten way by using only tFS() after calling me.util.globalize()
	}
}
```
#####me.util.globalize()#####
Adds utils functions to global namespace. Needed for create shorthands to common functions.
So, this is an using example:

```javascript
me.util.globalize();

//now we can use short name $() instead me.util.$()
var cnv = $('.gameCanvas');
```
