function FlagsView() {};

FlagsView.prototype.render = function(params) {
  
  var mustache  = 'flags.mustache';
  var container = $('.flags');
  var content   = {};
  var that      = this;

  // Add the propper Locale from the locale file
  for(var i in app.locale[mustache]) {
    content['template_' + i] = app.locale[mustache][i];  
  }

  // Include the Template in the Web Page inside the
  // container we have specified.
  Templates.to_html(
    mustache, 
    content, 
    container, 
    function() {
      that.applyViewHandlers();  
    }
  );
};

FlagsView.prototype.applyViewHandlers = function() {
  // Any action we want to make with this 
  // template should be run here, as this
  // method is executed once the HTML code
  // is been injected in the page.
  $('#spanish').click(function() {
    console.log('Changing to Spanish!');
    app.setSessionLocale('es-ES');  
    app.initNewLocale();
  });

  $('#english').click(function() {
    console.log('Changing to English!');
    app.setSessionLocale('en-US');  
    app.initNewLocale();
  });
};

