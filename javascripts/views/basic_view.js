function BasicView() {};

BasicView.prototype.render = function(params) {
  
  var mustache  = 'basic.mustache';
  var container = document.body;
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

BasicView.prototype.applyViewHandlers = function() {
  // Any action we want to make with this 
  // template should be run here, as this
  // method is executed once the HTML code
  // is been injected in the page.
  app.views.flagsView = new FlagsView();
  app.views.flagsView.render();
};

