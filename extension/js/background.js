
//console.log('background.js');

// Global accessor that the popup uses.
var selectedPacketName = null;
var selectedTabId = null;
var selectedWindowId = null;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	console.log('extension.onRequest');

	if (request.action == 'fetchTabInfo') {
		fetchTabInfo(sendResponse);
	}

});

function fetchTabInfo(callback){


	chrome.tabs.get(selectedTabId, function(tab){
		console.log('chrome.tabs.getCurrent:');
		console.log(tab);

		/*
		* check if we are in the market
		*/
		var result = tab.url.search(/play.google.com/);
		if (result != -1){
			callback(updateQRCode(tab.id, tab.url));
		}

	});

}

/*
chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
if (change.status == "complete") {
console.log('backgrounds.tabs.onUpdated');
updateQRCode(tab.id, tab.url);
}
});
*/


function updateQRCode(tabId, tabUrl) {
	console.log('updateQRCode(' + tabId + ':' + tabUrl + ')');
	selectedPacketName = null;

	console.log('tabs.sendRequest');

	var splitted = tabUrl.split('id=', 3);

	if (splitted === undefined || splitted.length <= 0) {
		chrome.pageAction.hide(tabId);
		return null;
	}

	selectedPacketName = splitted[1];


	// remove & part
	var splitted2 = selectedPacketName.split('&', 3);
	if(splitted2 !== undefined && splitted2.length > 0){
		selectedPacketName = splitted2[0];
	}


	chrome.pageAction.setTitle({
		tabId : tabId,
		title : selectedPacketName
	});

	chrome.pageAction.show(tabId);

	chrome.pageAction.setPopup({tabId: tabId, popup: 'popup.html'});
	return selectedPacketName;
}


chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
	console.log('chrome.tabs.onSelectionChanged.addListener');

	selectedTabId = tabId;
	selectedWindowId = selectInfo;
	fetchTabInfo();
});


