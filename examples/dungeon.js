/**
 * Created by m0sk1t on 2/19/14.
 */
(function(){
	me.core.init(['#main']);
	me.assets.load('img/',['spritemap.png', 'map.png']);
	me.assets.callback(setup);
	
	function setup() {
		var map = [
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,0,0,0,0,0,0,1,1,1,0,1,1,1,1,1,1],
			[1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1],
			[1,1,0,0,0,1,1,1,1,0,1,1,1,0,1,0,0,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
		],
		player = new me.assets.Sprite('spritemap.png', {"W": 50, "H": 50}, {"x": 0, "y": 0}, {"x": 0, "y": 0}, 0.4),
		pass = new me.assets.Tile('map.png',[0,0,20,20], [0,0,20,20]),
		stop = new me.assets.Tile('map.png',[20,0,20,20], [0,0,20,20]),
		f = Math.floor;
		player.setPos({x:18*20, y:18*20}).draw('#main');
		function drawMap() {
			for (var i = 0, l1 = map.length; i < l1; i++) {
				for(var j = 0, l2 = map[i].length; j < l2; j++) {
					if (map[j][i]) {
						pass.setPos({x:i*20,y:j*20}).draw('#main');
					}
					else {
						stop.setPos({x:i*20,y:j*20}).draw('#main');
					}
				}
			}
		}
		//304342
		function collisionDetector(dir) {
			var x = player.getCoord().x,
				y = player.getCoord().y;
			switch (dir) {
				case 'up': return Boolean(map[f((y-20)/20)][f(x/20)]);

				case 'down': return Boolean(map[f((y+20)/20)][f(x/20)]);

				case 'left': return Boolean(map[f(y/20)][f((x-20)/20)]);

				case 'right': return Boolean(map[f(y/20)][f((x+20)/20)]);

				default: return false;
			}
		}
		//304334
		function draw() {
			drawMap();
			switch (true) {
				case me.input.isPressed('w'): !collisionDetector('up') && player.appendPos({x:0,y:-20}).draw('#main'); break;
				case me.input.isPressed('a'): !collisionDetector('left') && player.appendPos({x:-20,y:0}).draw('#main'); break;
				case me.input.isPressed('s'): !collisionDetector('down') && player.appendPos({x:0,y:+20}).draw('#main'); break;
				case me.input.isPressed('d'): !collisionDetector('right') && player.appendPos({x:+20,y:0}).draw('#main'); break;
				default: player.draw('#main'); break;
			}
			setTimeout(draw, 33);
		}
		draw();
	}
})();