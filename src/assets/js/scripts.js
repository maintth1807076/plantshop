/*!
    * Start Bootstrap - SB Admin v6.0.1 (https://startbootstrap.com/templates/sb-admin)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    (function($) {
    "use strict";

    // Add active state to sidbar nav links
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
        $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
            if (this.href === path) {
                $(this).addClass("active");
            }
        });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });
})(jQuery);
$.fn.select2.amd.require([
  "select2/core",
  "select2/utils"
], function (Select2, Utils, oldMatcher) {
  var $basicSingle = $(".js-example-basic-single");
  var $basicMultiple = $(".js-example-basic-multiple");

  $.fn.select2.defaults.set("width", "100%");

  $basicSingle.select2();
  $basicMultiple.select2();

  function formatState (state) {
    if (!state.id) {
      return state.text;
    }
    var $state = $(
      '<span>' +
      '<img src="vendor/images/flags/' +
      state.element.value.toLowerCase() +
      '.png" class="img-flag" /> ' +
      state.text +
      '</span>'
    );
    return $state;
  };
});

