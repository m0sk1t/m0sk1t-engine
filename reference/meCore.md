#m0sk1t::engine#

The **meCore.js** containing functions for basic initialisation, stores _<canvas>_ elements and it's contexts.

###Description:###

#####me.core.init(["id_of_canvas",...],width,height)#####
This function defines _me.core.canvas[]_ and _me.core.layers[]_ arrays by finding it's id's.
Also sets width and height for each canvas if defined, instead set it equals document.width and document.height.
Takes _[]_ of strings like _['#element']_, initial width and height. Returns nothing but defines _me.core.canvas[]_ and _me.core.layers[]_.
This is an using example:

```javascript
me.core.init(["#gameArea","#bg"]);
//now me.core.canvas[] containing 2 canvases
//and me.core.layers[] containing it's contexts
```

#####me.core.clear("id_of_canvas")#####
This function simply clearing _me.core.canvas_ element which id passed into function.
Takes string like _"#element"_. Returns nothing but fully clears _me.core.canvas['#element']_.
This is an using example:

```javascript
me.core.init(["#gameArea","#bg"]);
me.core.clear("#gameArea");
```
#####me.core.isOut(aItem,"id_of_canvas")#####
This function simply checks is the aItem outside a canvas _me.core.canvas["id_of_canvas"]_.
Takes _me.primitive.point_ object and string like _"#element"_. Returns nothing.
This is an using example:

```javascript
me.core.init(["#gameArea","#bg"],100,100);
var PlayerCoord = new me.primitive.point(0,0);
if (me.core.isOut(PlayerCoord,"#gameArea")) {
    me.utils.log('Impossibru!!!','e');
}
```
