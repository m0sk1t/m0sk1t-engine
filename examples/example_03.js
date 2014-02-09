(function() {
	var g = {
		"man":      null,
		"bg":       null,
		"manDir":   null,
		"left":     false,
		"right":    false,
		"up":       false,
		"down":     false
	};

	me.core.init(["#main"], 500, 500);
	me.input.setKeys();
	me.assets.load('img/',['spritemap.png', 'star_sky.jpg']);
	me.assets.callback(setup);

	function setup() {
		g.man = new me.assets.Sprite('spritemap.png', {"W": 50, "H": 50}, {"x": 0, "y": 0}, {"x": 0, "y": 0});
		g.bg = new me.assets.Tile('star_sky.jpg', [0,0,500,500], [0,0,500,500]);
		loop();
	}

	document.onkeydown = function (e) {
		switch (e.keyCode) {
			case me.input.keys["w"]:    g.up      = true; break;
			case me.input.keys["a"]:    g.left    = true; break;
			case me.input.keys["s"]:    g.down    = true; break;
			case me.input.keys["d"]:    g.right   = true; break;
			default: break;
		}
	};

	document.onkeyup = function (e) {
		switch (e.keyCode) {
			case me.input.keys["w"]:    g.up      = false; break;
			case me.input.keys["a"]:    g.left    = false; break;
			case me.input.keys["s"]:    g.down    = false; break;
			case me.input.keys["d"]:    g.right   = false; break;
			default: break;
		}
	};

	function loop() {
		switch (true) {
			case ( g.up && (!g.left && !g.right && !g.down) ) : g.manDir = new me.primitive.Point(0, -10); break;
			case ( g.down && (!g.left && !g.right && !g.up) ) : g.manDir = new me.primitive.Point(0, 10); break;
			case ( g.left && (!g.down && !g.right && !g.up) ) : g.manDir = new me.primitive.Point(-10, 0); break;
			case ( g.right && (!g.left && !g.down && !g.up) ) : g.manDir = new me.primitive.Point(10, 0); break;
			case ( g.right && g.up ) : g.manDir = new me.primitive.Point(10, -10); break;
			case ( g.right && g.down ) : g.manDir = new me.primitive.Point(10, 10); break;
			case ( g.left && g.down ) : g.manDir = new me.primitive.Point(-10, 10); break;
			case ( g.left && g.up ) : g.manDir = new me.primitive.Point(-10, -10); break;
			default: g.manDir = new me.primitive.Point(0, 0); break;
		}
		g.bg.draw("#main");
		g.man.appendPos(g.manDir).draw("#main");
		//setTimeout(loop, 77);
		rAF(loop);
	}
}());