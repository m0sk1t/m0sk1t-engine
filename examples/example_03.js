/**
 * Created by m0sk1t
 */

(function() {
	var man = null, bg = null,
		manDir = null,
		left = false, right = false, up = false, down = false;

	me.core.init(["#main"], 500, 500);
	me.input.setKeys();
	me.assets.load('img/',['spritemap.png', 'star_sky.jpg']);
	me.assets.callback(setup);

	function setup() {
		man = new me.assets.Sprite('spritemap.png', {"W": 50, "H": 50}, {"x": 0, "y": 0}, {"x": 0, "y": 0});
		bg = new me.assets.Tile('star_sky.jpg', [0,0,500,500], [0,0,500,500]);
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
			case ( up && (!left && !right && !down) ) : manDir = new me.primitive.Point(0, -10); break;
			case ( down && (!left && !right && !up) ) : manDir = new me.primitive.Point(0, 10); break;
			case ( left && (!down && !right && !up) ) : manDir = new me.primitive.Point(-10, 0); break;
			case ( right && (!left && !down && !up) ) : manDir = new me.primitive.Point(10, 0); break;
			case ( right && up ) : manDir = new me.primitive.Point(10, -10); break;
			case ( right && down ) : manDir = new me.primitive.Point(10, 10); break;
			case ( left && down ) : manDir = new me.primitive.Point(-10, 10); break;
			case ( left && up ) : manDir = new me.primitive.Point(-10, -10); break;
			default: manDir = new me.primitive.Point(0, 0); break;
		}
		bg.draw(me.core.layers["#main"]);
		man.appendPos(manDir).draw(me.core.layers["#main"]);
		//setTimeout(loop, 77);
		rAF(loop);
	}
}());