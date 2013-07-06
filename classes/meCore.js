(function(){
	if (window.me === undefined) {
		window.me = {};
		var vClassList = ["core","utils","primitive","assets","physics"];
		vClassList.forEach(function(key) { me[key]={}; });
	}
})();