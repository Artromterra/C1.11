function jQuery (selector, context = document){
  this.elements = Array.from(context.querySelectorAll(selector));
  return this
}

jQuery.prototype.each = function (fn){
  this.elements.forEach((element, index) => fn.call(element, element, index));
  return this;
}

jQuery.prototype.click = function(fn){
  this.each(element => element.addEventListener('click', fn))
  return this
}

jQuery.prototype.hide = function(){
  this.each(element => element.style.display = 'none')
  return this;
}


jQuery.prototype.html = function(html) {
  this.each(element => element.innerHTML = html);
  return this;
}

const $ = (e) => new jQuery(e);
const input_mins = document.input_area;

let countSec = 0;
let countMin = 0;
let letRun = false;

//циферблат, куда мы вводим значени минут и секунд
const updateText = () =>{	
  $('.minutes').html((0 + String(countMin)).slice(-2));
  $('.seconds').html((0 + String(countSec)).slice(-2));
}
updateText();
//Счетчик
const countDown = () => {	
	let total = countSec + countMin * 60;
  const timeinterval = setTimeout(countDown, 1000);
  if (total <= 0) {
    clearInterval(timeinterval);
    $('.countdown').hide();
    $('.input_area').hide();
    $('.butn').hide();
    $('.message').html('<p>I am done...</p>');
  }
  if (!letRun) clearInterval(timeinterval);
  if(countSec > 0) countSec--;
  else{
  	countSec = 59;
    countMin--;
  } 
  updateText();
}
//блок обработки ввода пользователя
$('.plus').click( () =>{
  if(countSec < 59) ++countSec;
  else{
  	countSec = 0;
  	++countMin;
  }
  updateText()
});

$('.minus').click( () =>{
	if(countMin <= 0 && countSec===0){
  	countSec = 0;
    countMin = 0;
    return;
  }
  if(countSec > 0) --countSec;
  else{
  	countSec = 59;
  	--countMin;
  }
  updateText();
});

$('.start').click( () => {
  if(!letRun) {
    letRun = true;
	countDown();
  }  
});

$('.pause').click( () => {
  if(letRun) letRun = false;
});

$('.reset').click( () => {
  location.reload();
});
//код таблички ввода минут
input_mins.addEventListener('submit', function(e) {
  e.preventDefault();
  countMin = this.mins.value;
  if(countMin > 60||isNaN(countMin)||countMin<=0) {
    alert("Не верное число! Попробуйте еще раз.");
    window.location.href = window.location.href;
  }
countSec = 0;
if(!letRun) {
  letRun = true;
  countDown();
}  
this.reset();
})

