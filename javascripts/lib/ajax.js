/*
 *  Class Ajax embedding the ajax call from jQuery.
 */

var Ajax = {
  send: function(params) {

    var url       = params.url;
    var type      = params.type;
    var data      = params.data;
    var success   = params.success;
    var errorf    = params.error ? params.error : function() {};
    var dataType  = params.dataType ? params.dataType : 'json';

    $.ajax({
      url: url,
      type: type,
      data: data,
      dataType: dataType,
      success: success,
      error: errorf
    });
  }
};
