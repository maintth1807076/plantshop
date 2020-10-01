
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