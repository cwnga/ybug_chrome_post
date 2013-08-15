chrome.extension.onMessage.addListener(function(request, sender) {
	if (request.action == "getSource") {
		message.innerText = request.source;
	}
});

function onWindowLoad() {

	var message = document.querySelector('#message');
/*
	chrome.tabs.executeScript(null, {
		file: "getPagesSource.js"
	},
	function() {
		// If you try and inject into an extensions page or the webstore/NTP you'll get an error
		if (chrome.extension.lastError) {
			message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
		}
            });
            */

	chrome.windows.getCurrent(function(win) {
		chrome.tabs.captureVisibleTab(win.id, {
			"format": "jpeg",
			//"quality": 10
		},
		function(imgUrl) {

			node_canvas = document.createElement("canvas");
			var ctx = node_canvas.getContext('2d');
			var img = new Image;
			img.onload = function() {
				ctx.drawImage(img, 0, 0); // Or at whatever offset you like
			};
			img.src = imgUrl;
			//document.write('aaa');
			ctx.width = img.width;
			document.body.appendChild(img);
			///cwnga add test
			var input_image = document.createElement("textarea");
			input_image.id = 'comment';
			input_image.name = 'comment';
			input_image.value = '<img src="' + imgUrl + '">';
			input_image.rows = 10;
			input_image.cols = 50;
			//alert(imgUrl.length);
			//alert(imgUrl);
			//
			var bugzilla_form = document.getElementById('bugzilla_form');
			bugzilla_form.appendChild(input_image);

		});
	});

}

window.onload = onWindowLoad;

