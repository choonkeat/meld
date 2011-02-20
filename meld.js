/*
  meld v0.1
  unobtrusive templating engine that runs on nodejs (jsdom+jquery) and browsers (jquery).
  prompted by weld.js; syntax by hquery

  Copyright Chew Choon Keat 2011
  Released under the MIT License
*/
(function(context, $) {
  /* find all elements matching object's attribute key
     and set each innerText with attribute value */
  function default_callback(index, ele, object) {
    if (typeof(object) == "string") {
      return ele.text(object);
    } else for (name in object) {
      if (!object.hasOwnProperty(name)) continue;
      var value = object[name];
      if (typeof(value) == "object") {
        ele.meld('.' + name, value);
      } else {
        ele.find('.' + name).text(value);
      }
    }
  }
  /* return meld function, optionally tied to a root element */
  function build_meld_fn(root) {
    return function(selector, data, callback) {
      var selected = $(selector, root||this);
      var ref = selected.first().clone(); if (ref.length == 0) return;
      if (!callback) callback = default_callback;
      var parents = selected.parent();
      selected.remove();
      return parents.each(function(pi, parent) {
        $.each(data, function(ri, object) {
          callback(ri, ref.clone().appendTo(parent), object);
        });
      });
    }
  }
  $.fn.meld    = build_meld_fn();
  context.meld = build_meld_fn(context.document);
})(window, jQuery);
