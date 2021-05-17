var options = {
	"title": "Save image to #Tags",
	"contexts": ["image"],
	"onclick" : onClickHandler 
	};
var cid = chrome.contextMenus.create(options);


function onClickHandler(info, tab) {
	var url = info.srcUrl;
	let win = chrome.windows.create({'url': 'addImage.html?url='+url, 'type': 'popup','height':350,'width':235}, function(window) {


	});
};

