// Set new methods to the Date class :)

Date.prototype.getMonthName = function() {
  return app.locale["months"][new String(this.getMonth() + 1)];
}

Date.prototype.getDayName = function() {
  var d = ['Sunday','Monday','Tuesday','Wednesday',
  'Thursday','Friday','Saturday'];
  return d[this.getDay()];
}

function Locale(params) {
  this.localesUrl = params.localesUrl; 
}

Locale.prototype.load = function(locale, callback) {
  uri  = this.localesUrl + '/' + locale + '.locale';
  
  var success = function(d) {
    if(locale == 'dictionary') {
      app.dictionary = d;
    } else {
      app.locale = d;
    }
    callback();
  }

  Ajax.send({
    url: uri,
    type: 'GET',
    dataType: 'json',
    data: {},
    success: success,
    error: function(d) {console.log('error(' + d.status + '): ' + d.responseText)}
  });
};

function currencySymbol(currency) {
  if(currency) {
    for(var i in app.dictionary) {
      if(currency.toLowerCase() == app.dictionary[i].currency.toLowerCase()) {
        return app.dictionary[i].symbol;  
      }  
    }
  } else {
    return "$";  
  }
  // By default
  return "ERR";
}

function is_int(value){ 
  if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
    return true;
  } else { 
    return false;
  } 
};

function roundNumber(num, dec) {
  if(is_int(num) && dec > 0) {
    var result = parseInt(num) + '.00'; 
  } else {
    var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
  }
  return result;
};

function convertToCurrency(amount) {
  var aux = roundNumber(amount, 2);
  return aux;
};

function addCommas(nStr, dec) {
  if(dec == null) {
    // By default, two decimals :)
    dec = 2;  
  }
  if(dec >= 0) {
    nStr = roundNumber(nStr,dec);
  }
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}
