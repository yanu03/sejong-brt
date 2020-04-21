function checkIe() {
	var ua = window.navigator.userAgent;
	
	if(ua.indexOf("MSIE ") > 0 || ua.indexOf("Trident/") > 0) {
		return true;
	} else {
		return false;
	}
}

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
}

function secondToTime(seconds) {
	var date = new Date(seconds * 1000);
	var hh = date.getUTCHours();
	var mm = date.getUTCMinutes();
	var ss = date.getSeconds();

	if (hh < 10) {hh = "0"+hh;}
	if (mm < 10) {mm = "0"+mm;}
	if (ss < 10) {ss = "0"+ss;}
	
	return hh+":"+mm+":"+ss;
}

function arrayMove(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
    	new_index = 0;
    	/*
        var k = new_index - arr.length;
        console.log(k);
        while ((k--) + 1) {
            arr.push(undefined);
        }
        //*/
    }
     arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);  
   return arr;
}