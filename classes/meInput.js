;(function (me, d) {
	me.input.mX = 0;
	me.input.mY = 0;
	me.input.keys = [];
	me.input.pressedKeys = [];

	(function() {
		me.input.keys["left"] = 37;
		me.input.keys["up"] = 38;
		me.input.keys["right"] = 39;
		me.input.keys["down"] = 40;

		me.input.keys["w"] = 87;
		me.input.keys["a"] = 65;
		me.input.keys["s"] = 83;
		me.input.keys["d"] = 68;

		me.input.keys["bs"] = 8;
		me.input.keys["tab"] = 9;
		me.input.keys["enter"] = 13;
		me.input.keys["shift"] = 16;
		me.input.keys["ctrl"] = 17;
		me.input.keys["alt"] = 18;
		me.input.keys["pause"] = 19;
		me.input.keys["capslock"] = 20;
		me.input.keys["esc"] = 27;
		me.input.keys["space"] = 32;
		me.input.keys["pageup"] = 33;
		me.input.keys["pagedown"] = 34;
		me.input.keys["end"] = 35;
		me.input.keys["home"] = 36;
		me.input.keys["insert"] = 45;
		me.input.keys["delete"] = 46;
		me.input.keys["leftwnd"] = 91;
		me.input.keys["rightwnd"] = 92;
		me.input.keys["select"] = 93;
		me.input.keys["mul"] = 106;
		me.input.keys["plus"] = 107;
		me.input.keys["minus"] = 109;
		me.input.keys["point"] = 110;
		me.input.keys["/"] = 111;
		me.input.keys["num"] = 144;
		me.input.keys["scroll"] = 145;
		me.input.keys[";"] = 186;
		me.input.keys["="] = 187;
		me.input.keys[","] = 188;
		me.input.keys["-"] = 189;
		me.input.keys["."] = 190;
		me.input.keys["/"] = 191;
		me.input.keys["`"] = 192;
		me.input.keys["["] = 219;
		me.input.keys["\\"] = 220;
		me.input.keys["]"] = 221;
		me.input.keys["\'"] = 222;
		for (var key in me.input.keys) if (me.input.keys.hasOwnProperty(key)) { me.input.pressedKeys[me.input.keys[key]] = false; }
	})();

	me.input.isPressed = function (key) {
		return me.input.pressedKeys[me.input.keys[key]];
	};

	me.input.setKey = function(keyCode, status) {
		me.input.pressedKeys[keyCode] = Boolean(status);
	};

	document.addEventListener('keydown', function(e) {
		me.input.setKey(e.keyCode, true);
	});

	document.addEventListener('keyup', function(e) {
		me.input.setKey(e.keyCode, false);
	});

	me.input.mPos = function(e) {
		e = e || window.event;
		me.input.mX	= (e.pageX || e.clientX);
		me.input.mY	= (e.pageY || e.clientY);
	};
}(window.me, document));