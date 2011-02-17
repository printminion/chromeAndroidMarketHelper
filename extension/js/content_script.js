/*
 * The background page is asking us to find userpics on the page.
 */

chrome.extension.sendRequest({
	'action' : 'fetchTabInfo'
}, fetchTabInfo);

function fetchTabInfo(backgroundPage) {
	console.log('content_scripts.fetchTabInfo:' + backgroundPage);

}
