if('serviceWorker' in navigator){
	window.addEventListener('load', function(){
		navigator.serviceWorker.register("serviceworker.js").then(function(registration){
			console.log("Service worker registration was successful!", registration);
		}, function(err){
			console.log("Service worker registration failed!", err);
		});
	});
}
