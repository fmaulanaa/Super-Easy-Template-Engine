var Templates = {
  templates: {},

  timerTemplate: $('<div class="timer">Loading...</div>'),

  get: function(name, callback) {
    Ajax.send({
        url: app.templatesUrl + '/' + name,
        dataType: 'text/html',
        data: {},
        success: function(d) {
            Templates.templates[name] = d;
            callback(d);
          },
        error: function(d) { throw "Error when requesting a template: " + name; }
      });
  },

  to_html: function(name, data, c, cb) {
    var container = c ? $(c) : $($('.main')[0]); 
    var callback  = cb ? cb : function() {};

    if(!iphoneTemplates) {
      var iphoneTemplates = false;  
    }
    if(!androidTemplates) {
      var androidTemplates = false;  
    }
    if(!blackberryTemplates) {
      var blackberryTemplates = false;  
    }

    if(iphoneTemplates) {
      Templates.templates = iphoneTemplates;
    } else if(androidTemplates) {
      Templates.templates = andriodTemplates;  
    } else if(blackberryTemplates) {
      Templates.templates = blackberryTemplates;  
    }

    if(Templates.templates[name]) {
      var html = $(Mustache.to_html(Templates.templates[name], data));
      container.append(html);
      callback();
    } else {
      Templates.get(name, function(d) {
        var html = $(Mustache.to_html(d, data));
        container.append(html);
        callback();
      });
    }
  }
};


