
$('#range_slider').ionRangeSlider({
    type: "double",
    grid: true,
    min: 10000,
    max: 1000000,
    from: 10000,
    to: 500000
});


var countEl = document.getElementById("quantity");
    function plus(){
       if(countEl.value < 10) {
          countEl.value = parseInt(countEl.value) +1;
       }
}
function minus(){

  if (countEl.value > 1) {

    countEl.value -= 1;
  }
}
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
