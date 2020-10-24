var $range = $("#range_slider"),
  from = 100000,
  to = 1000000;
var BASE_URL = 'http://' + $(location).attr('host');
var saveResult = function (data) {
  from = data.from;
  to = data.to;
};

$range.ionRangeSlider({
  type: "double",
  min: 10000,
  max: 2000000,
  from: from,
  to: to,
  onStart: function (data) {
    saveResult(data);
  },
  onChange: saveResult,
  onFinish: saveResult
});

$('#btn-filter-price').on("click", function () {
  location.href = `${BASE_URL}/shop?startPrice=${from}&endPrice=${to}`;
});
// $('#range_slider').ionRangeSlider({
//     type: "double",
//     grid: true,
//     min: 10000,
//     max: 1000000,
//     from: 10000,
//     to: 500000
// });
// var low = $('#range_slider').data().from;
// var high = $('#range_slider').data().to;
// console.log(low, high)
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
$('.minus').click(function () {
  var $input = $(this).closest('td').find("input[name = 'quantity']");
  var value = parseInt($input.val());
  if (value > 1) {
    value = value - 1;
  } else {
    value = 1;
  }
  $input.val(value);
  // $unit = $(this).closest('tr').find('td[data-price]').attr('data-price');
  // $(this).closest('tr').find('td[data-total]').text(format_money($unit * value) + ' VNĐ');
  // changeQuantity();
  // calculateTotalPrice();
});
$('.plus').click(function () {
  var $input = $(this).closest('td').find("input[name = 'quantity']");
  var value = parseInt($input.val());
  if (value < 10) {
    value = value + 1;
  } else {
    value = 10;
  }
  $input.val(value);
  // $unit = $(this).closest('tr').find('td[data-price]').attr('data-price');
  // $(this).closest('tr').find('td[data-total]').text(format_money($unit * value) + ' VNĐ');
  // changeQuantity();
  // calculateTotalPrice();
});
