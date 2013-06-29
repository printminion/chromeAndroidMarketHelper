$(document).ready(function() {
	var bkg = chrome.extension.getBackgroundPage();
	_gaq.push(['_trackPageview','/popup/' + bkg.selectedPacketName]);

	$('#title').html(bkg.selectedPacketName);
	$('#qrcode').attr('src', 'http://chart.apis.google.com/chart?cht=qr&chs=150x150&chl=market://search?q=pname:' + bkg.selectedPacketName);
	$('#qrcode_url').attr('href', 'http://chart.apis.google.com/chart?cht=qr&chs=150x150&chl=market://search?q=pname:' + bkg.selectedPacketName);
});