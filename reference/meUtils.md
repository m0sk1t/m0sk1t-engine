#m0sk1t::engine#

The **meUtils.js** containing some utilities for common actions.

###Description:###

#####me.utils.$(['element'])#####
It's just a wrapper for **querySelector()** named **$()** like in jQuery library. Needed to provide fast finding DOM elements by _ID_, _ClassName_ or _TagName_.
Takes _[]_ of strings like _['#element']_. Returns an _Object #<NodeList>_. This is an using example:

```javascript
//you may do it by this method
var cnv = me.utils.$(['#gameCanvas']);
//canvas is now equal the first <canvas> element with ClassName equal gameCanvas
//or by the shorten way after calling me.utils.globalize(['$'])
var cnv = $(['.gameCanvas']);
```

#####me.utils.log(aMessage, aMessageType)#####
Simple logging to div with id equals **meLog**. aMessageType one of three: _"m" - message, "w" - warning, "e" - error_.
Takes a string _"message"_ and a string of message type like _"m"_. This is an using example:

```javascript
function gameUpdate() {
    //...
    if (something_wrong) {
	me.utils.log("Impossibru!!!","e");
	//or shorten way by using only log("Impossibru!!!","e") after calling me.utils.globalize(['log'])
    }
}
```

#####me.utils.rAF(aCallback)#####
Crossbrowser wrapper for _*requestAnimationFrame(aCallback)*_ function. Needed to provide recursive call of updating and drawing functions.
Takes a _callback_ function. Returns number of calls. This is an using example:

```javascript
function gameLoop() {
	updateGame();
	drawSprite();
	me.utils.rAF(gameLoop());
	//or shorten way by using only rAF(gameLoop()) after calling me.utils.globalize(['rAF'])
}
gameLoop();
```

#####me.utils.tFS()#####
Crossbrowser wrapper for _*toggleFullScreen()*_ function. Needed to provide switching to fullscreen mode and back.
Takes nothing. Return nothing. This is an using example:

```javascript
document.addEventListener('keyup',updateGame(e));
//...
var updateGame = function(e) {
	//...
	if (e.keyCode === 13) {
		me.utils.tFS();
		//or shorten way by using only tFS() after calling me.utils.globalize(['tFS'])
	}
}
```
#####me.utils.globalize(['function_name',...])#####
Adds utilss functions to global namespace. Needed for create shorthands to common functions.
Takes _[]_ of strings like _['rAF','tFS']_ or nothing (for make all functions global). This is an using example:

```javascript
me.utils.globalize(['$']);

//now we can use short name $() instead me.utils.$()
var cnv = $(['#gameCanvas']);
```
