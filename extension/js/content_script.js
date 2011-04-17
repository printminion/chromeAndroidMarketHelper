/*
 * The background page is asking us to find userpics on the page.
 */

chrome.extension.sendRequest({
	'action' : 'fetchTabInfo'
}, fetchTabInfo);

function fetchTabInfo(backgroundPage) {
	console.log('content_scripts.fetchTabInfo:' + backgroundPage);
	
    var placeholderObj = document.querySelector("#details-tab-1 div div");
    
	if (placeholderObj) {
		var img = document.createElement("img");
		img.src = 'http://chart.apis.google.com/chart?chs=110x110&cht=qr&chld=M|1&chl=' + encodeURIComponent('market://search?q=pname:' + selectedPacketName);
		img.alt = 'Scan me';
			
		placeholderObj.appendChild(img);
	}
	
}
