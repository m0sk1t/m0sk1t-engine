(function() {
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
/*		me.input.k[8] = "backspace";
		me.input.k[9] = "tab";
		me.input.k[13] = "enter";
		me.input.k[16] = "shift";
		me.input.k[17] = "ctrl";
		me.input.k[18] = "alt";
		me.input.k[19] = "pause";
		me.input.k[20] = "capslock";
		me.input.k[27] = "esc";
		me.input.k[32] = "space";
		me.input.k[33] = "pageup";
		me.input.k[34] = "pagedown";
		me.input.k[35] = "end";
		me.input.k[36] = "home";
		me.input.k[37] = "left";
		me.input.k[38] = "up";
		me.input.k[39] = "right";
		me.input.k[40] = "down";
		me.input.k[45] = "insert";
		me.input.k[46] = "delete";
		
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
		me.input.mX	= (e.pageX || e.clientX);
		me.input.mY	= (e.pageY || e.clientY);
	};
})();