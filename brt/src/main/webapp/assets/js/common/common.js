function checkIe() {
	var ua = window.navigator.userAgent;
	
	if(ua.indexOf("MSIE ") > 0 || ua.indexOf("Trident/") > 0) {
		return true;
	} else {
		return false;
	}
}