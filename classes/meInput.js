;(function (me) {
	me.input.mX = 0;
	me.input.mY = 0;
	me.input.keys = [];
	me.input.isPressed = [];
	me.input.setKeys = function() {
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
/*
		me.input.k[91] = "left_window_key leftwindowkey";
		me.input.k[92] = "right_window_key rightwindowkey";
		me.input.k[93] = "select_key selectkey";
		me.input.k[106] = "multiply *";
		me.input.k[107] = "add plus +";
		me.input.k[109] = "subtract minus -";
		me.input.k[110] = "decimalpoint";
		me.input.k[111] = "divide /";
		
		me.input.k[144] = "numlock";
		me.input.k[145] = "scrollock";
		me.input.k[186] = "semicolon ;";
		me.input.k[187] = "equalsign =";
		me.input.k[188] = "comma ,";
		me.input.k[189] = "dash -";
		me.input.k[190] = "period .";
		me.input.k[191] = "forwardslash /";
		me.input.k[192] = "graveaccent `";
		me.input.k[219] = "openbracket [";
		me.input.k[220] = "backslash \\";
		me.input.k[221] = "closebracket ]";
		me.input.k[222] = "singlequote '"; */
	};
	me.input.mPos = function(e) {
		e = e || window.event;
		me.input.mX	= (e.pageX || e.clientX);
		me.input.mY	= (e.pageY || e.clientY);
	};
}(window.me));