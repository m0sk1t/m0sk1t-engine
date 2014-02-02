/**
 * Created by m0sk1t
 */

(function() {
	var butterfly = null, bg = null,
		butterflyDirection = null,
		left = false, right = false, up = false, down = false;

	me.core.init(["#main"], 500, 500);
	me.input.setKeys();
	me.assets.load('img/',['but.png', "star_sky.jpg"]);
	me.assets.callback(setup);

	function setup() {
		butterfly = new me.assets.Sprite('but.png', {"x": 0, "y": 0}, {"W": 80, "H": 80});
		bg = new me.assets.Tile('star_sky.jpg');
		loop();
	}

	document.onkeydown = function (e) {
		switch (e.keyCode) {
			case me.input.keys["w"]: up      = true; break;
			case me.input.keys["a"]: left    = true; break;
			case me.input.keys["s"]: down    = true; break;
			case me.input.keys["d"]: right   = true; break;
			default: break;
		}
	};

	document.onkeyup = function (e) {
		switch (e.keyCode) {
			case me.input.keys["w"]: up      = false; break;
			case me.input.keys["a"]: left    = false; break;
			case me.input.keys["s"]: down    = false; break;
			case me.input.keys["d"]: right   = false; break;
			case me.input.keys["enter"]: me.utils.tFS.call(window); break;
			default: break;
		}
	};

	function loop() {
		switch (true) {
			case ( up && (!left && !right && !down) ) : butterflyDirection = new me.primitive.Point(0, -10); break;
			case ( down && (!left && !right && !up) ) : butterflyDirection = new me.primitive.Point(0, 10); break;
			case ( left && (!down && !right && !up) ) : butterflyDirection = new me.primitive.Point(-10, 0); break;
			case ( right && (!left && !down && !up) ) : butterflyDirection = new me.primitive.Point(10, 0); break;
			case ( right && up ) : butterflyDirection = new me.primitive.Point(10, -10); break;
			case ( right && down ) : butterflyDirection = new me.primitive.Point(10, 10); break;
			case ( left && down ) : butterflyDirection = new me.primitive.Point(-10, 10); break;
			case ( left && up ) : butterflyDirection = new me.primitive.Point(-10, -10); break;
			default: butterflyDirection = new me.primitive.Point(0, 0); break;
		}
		butterfly.appendPos(butterflyDirection).draw(me.core.layers["#main"]);
		setTimeout(loop, 77);
		//rAF(loop);
	}
}());