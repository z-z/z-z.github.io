/* Old IE (<= 8) HTML5 tags */
document.createElement('HEADER');
document.createElement('FOOTER');
document.createElement('ASIDE');
document.createElement('ARTICLE');
document.createElement('MARK');
Function.prototype.clone = function() {
    var that = this;
    var temp = function temporary() { return that.apply(this, arguments); };
    for( key in this ) {
        temp[key] = this[key];
    }
    return temp;
};

/* Adding blocks, transform blocks, only for correct display */
$(document).ready(function() {
	
	
	
	
	
	
	
	//Add wrap to any block with .wrap
	$('.wrap').each(function() {
		if ($(this).parents('.wrap-outer').length == 0) {
			var cloned_tree = $('<div class="wrap-outer"></div>');
			$(this).removeClass('wrap');
			cloned_tree.addClass($(this).attr('class'));
			$(this).clone().attr('class', 'wrap').appendTo(cloned_tree);
			$(this).replaceWith(cloned_tree);
		}
	});
	//Replace HR with DIV with class HR
	$('hr').each(function() {
		var replace = $('<div class="hr"></div>');
		replace.addClass($(this).attr('class'));
		$(this).replaceWith(replace);
	});
	
	$('input[data-placeholder], textarea[data-placeholder]').each(function() {
		var placeholder = $(this).attr('data-placeholder');
		if ((($(this).val() !== undefined) && ($(this).val().length > 0)) && ($(this).val() != placeholder)) {
			$(this).removeClass('placeholder');
		} else {
			$(this).val(placeholder);
			$(this).addClass('placeholder');
		}
		$(this).focusin(function() {
			$(this).removeClass('placeholder');
			if (($(this).val() === undefined) || ($(this).val() == placeholder)) {
				$(this).val('');
			}
		});
		$(this).focusout(function() {
			if (($(this).val() === undefined) || ($(this).val() == '') || ($(this).val() == placeholder)) {
				$(this).val(placeholder);
				$(this).addClass('placeholder');		
			}
		});		
	});
	
	$('form').submit(function() {
		$(this).find('input[data-placeholder]').each(function() {
			var placeholder = $(this).attr('data-placeholder');
			$(this).removeClass('placeholder');
			if (($(this).val() === undefined) || ($(this).val() == placeholder)) {
				$(this).val('');
			}	
		});
	});
	
  	var set_slide = function(selector, slide) {
      	$(selector).each(function() {
      		var position = slide*400+300;
      		var block = $(this);
      		var shift = function() {
      			block.css('background-position', '0 '+position+'px');
      			position -= 100;
      		}
      		setTimeout(shift, 60);
      		setTimeout(shift, 120);
      		setTimeout(shift, 180);
      		setTimeout(shift, 240);
      	});
  	}
  	
  	var time = new Date();
	var target_time = new Date(time.getFullYear(), time.getMonth(), time.getDate());
	target_time = target_time.valueOf()+1000*60*60*24;
	
	
    
	var tick = function(init) {
    	if (init == undefined) {
    		init = false;
    	}
    	var current_time = new Date();
    	current_time = current_time.valueOf();
    	if (current_time > target_time) {
    	  	var time = new Date();
    		target_time = new Date(time.getFullYear(), time.getMonth(), time.getDate());
    		target_time = target_time.valueOf()+1000*60*60*24;    		
    	}
    	var time_diff = Math.floor((target_time - current_time)/1000);	
    	var second_2 = time_diff % 10; time_diff = Math.floor(time_diff/10);
    	var second_1 = time_diff % 6; time_diff = Math.floor(time_diff/6);
    	var minute_2 = time_diff % 10; time_diff = Math.floor(time_diff/10);
    	var minute_1 = time_diff % 6; time_diff = Math.floor(time_diff/6);
    	var hour_2 = Math.floor(time_diff/10);
    	var hour_1 = time_diff % 10;
      	set_slide('div.secondPlay', second_2);
      	if ((second_2 == 9) || init) {set_slide('div.second6Play', second_1);
      	if ((second_1 == 5) || init) {set_slide('div.minutePlay', minute_2);
      	if ((minute_2 == 9) || init) {set_slide('div.minute6Play', minute_1);
      	if ((minute_1 == 5) || init) {set_slide('div.hourPlay', hour_1);
      	if ((hour_2 == 9) || init) {set_slide('div.hour2Play', hour_2);}}}}}
      }
    tick(true);
	setInterval(tick, 1000);
	
	(function() {
		if ($('.menu').length == 1) {
		var form_top = $('.menu').offset().top;
			$(window).scroll(function() {
				var scroll_top = $(this).scrollTop();
				if (scroll_top > form_top) {
					$('.menu').css('top', 0).css('position', 'fixed');
				} else {
					$('.menu').css('top', '').css('position', '');
				}
			});
		}
	})();
	
	
	
    $('.scroll-animate').each(function () {
		var block = $(this);
		$(window).scroll(function() {
			var top = block.offset().top;
			var bottom = block.height()+top;
			top = top - $(window).height();
			var scroll_top = $(this).scrollTop();
			if ((scroll_top > top) && (scroll_top < bottom)) {
				if (!block.hasClass('animate')) {
					block.addClass('animate');
					block.trigger('animateIn');
				}
			} else {
				block.removeClass('animate');
				block.trigger('animateOut');
			}
		});				
	
	});
	
	$('.achi em').each(function() {
		$(this).attr('data-number', parseInt($(this).text()));
	});
	
	$('.achi').on('animateIn', function() {
		$(this).find('em').each(function() {
			var count =  parseInt($(this).attr('data-number'));
			var block = $(this);
			var timeout = null;
			var step = 1;
			timeout = setInterval(function() {
				if (step == 17) {
					block.text(count.toString());
					clearInterval(timeout);
				} else {
					block.text((Math.floor(count*step/17)).toString());
					step++;
				}
			}, 60);
		});
	});
	
	$('.reasons, .how').on('animateIn', function() {
		var inter = 0;
		$(this).find('li').each(function() {
			var block = $(this);
			setTimeout(function() {
				block.css('opacity', 1);
				block.css('transform', 'scale(1.0, 1.0)');
			}, inter*100);
			inter++;
		});
	}).on('animateOut', function() {
		$(this).find('li').each(function() {
			$(this).css('opacity', 0.01);
			$(this).css('transform', 'scale(1.5, 1.5)');
		});
	});
	
	var show_popup = function(element, popup) {
	  	$(element).click(function() {
	  		$(popup).show();
	  		$('.popup').fadeIn();
	  		return false;
	  	});		
	}
	
  	$('.popup .popup-shadow').click(function() {
  		$('.popup').fadeOut(function() {
  			$('.popup-content>*').hide();
  		});
  		return false;
  	});
	
	show_popup('.call a', '.popup .callback')
	show_popup('#ves', '.popup .ves')
  	show_popup('a.quest', '.popup .question')
  	
  	
  	var set_scroll = function (scroll_from, scroll_to, offset) {
  		var target = $(scroll_to);
		$(scroll_from).click(function() {
			$('html, body').animate({
			    scrollTop: target.eq(0).offset().top-offset
			 }, 500);
		});
  	}
  	
setTimeout(function() {
	$('.wrap-outer.success, .wrap-outer.error').fadeOut();
}, 5000);




	  	$('.parallax').css({
      
         backgroundAttachment:'fixed'
         })
    $('.parallax').each(function(){
        var $bgobj = $(this); // создаем объект
        $(window).scroll(function() {
            var $offtop = $bgobj.offset().top-$(window).height();
            
            var yPos = (($(window).scrollTop()-$offtop) / $bgobj.data('speed')); // вычисляем коэффициент 
            // Присваиваем значение background-position
            var coords = 'center '+ yPos + 'px';
            // Создаем эффект Parallax Scrolling
            $bgobj.css({ backgroundPosition: coords });
        });
    });
          
(function() {
var counter = 0;
$("#clickplease").click(function() {
	counter = counter + 1;
	if (counter == 3)
	{
       $('div').addClass('hahaha');		
	}

 

});
})();







/* * ***noUISlider*** * */

$('.age').noUiSlider({
	range: [20, 80]
   ,start: 20
   ,step: 1
   ,handles: 1
   ,serialization: {
  		to: [$("#age")]
  		,resolution: 1
	}
});

$('.height').noUiSlider({
	range: [100, 220]
   ,start: 170
   ,step: 1
   ,handles: 1
   ,serialization: {
  		to: [$("#height")]
  		,resolution: 1
	}
});

$('.weight').noUiSlider({
	range: [40, 220]
   ,start: 70
   ,step: 1
   ,handles: 1
   ,serialization: {
  		to: [$("#weight")]
  		,resolution: 1
	}
});

/* * ***noUISlider*** * */


/* ***calc_ves*** */
$('#ves').click(function(){
	var sex = $("#sex").prop("checked") ? 'мужчина' : 'женщина';
	var age = $('.age').val()
	var height = $('.height').val()
	var weight = $('.weight').val()
	var ideal_weight = 0;
	
	var info = sex + ', ' + age + ' лет, рост ' + height + 'см, вес ' + weight + 'кг';
	
	if($(':radio:checked').length > 0) var type = $(':radio:checked').attr('id');
	else alert('выберите телосложение');
	
	
	
    // рост
    if (height <= 165) {
        var ideal_weight = Math.round(height - 100)
    } else if (height >= 165 && height <= 175) {
        var ideal_weight = Math.round(height - 105)
    } else if (height > 175) {
        var ideal_weight = Math.round(height - 110)
    }

    // телосложение +/- 10%
    if (type == 'thin') {
        ideal_weight = ideal_weight - ((ideal_weight * 0.1))
    } else if (type == 'normal') {
        ideal_weight = ideal_weight
    } else if (type == 'thick') {
        ideal_weight = ideal_weight + ((ideal_weight * 0.1))
    } /*else if (type == 'choice_dot4') {
        ideal_ves_new = ideal_ves + ((ideal_ves * 0.1))
    } else if (type == 'choice_dot5') {
        ideal_ves_new = ideal_ves + ((ideal_ves * 0.2))
    } else if (type == 'choice_dot6') {
        ideal_ves_new = ideal_ves + ((ideal_ves * 0.3))
    }*/
	

    /* поправки по возрасту
  20-30 -11%
  30-40 -03%
  40-50 -
   > 50 +06%
  */
    if (age >= 20 && age <= 30) {
        ideal_weight = ideal_weight - ((ideal_weight * 0.11))
    } else if (age > 30 && age <= 40) {
        ideal_weight = ideal_weight - ((ideal_weight * 0.03))
    } else if (age > 40 && age <= 50) {
        ideal_weight = ideal_weight
    } else if (age > 50) {
        ideal_weight = ideal_weight + ((ideal_weight * 0.06))
    }

    // Вам необходимо
    var you_need = weight - ideal_weight.toFixed(0);
    if (you_need >= 0) {
        //$('.b_params_result__text_value').text('похудеть на ' + you_need)
        var s = 'похудеть на ' + you_need
    } else if (you_need < 0) {
        //$('.b_params_result__text_value').text('набрать ' + you_need * -1)
        var s = 'набрать ' + you_need * -1;
    } 
    
	
	$('.popup .ves .number').html(ideal_weight.toFixed(0) + ' кг');
	$('.popup .ves .delta').html(s);
	$(".popup .call-back-calc input[name='form_name']").val(info)
	
})
/* ***calc_ves*** */





// **********
$('.popup .ves :button').click(function(){
	$('.popup .popup-shadow').click();
	setTimeout(function(){ 
		$('.popup .call-back-calc').show();
	  	$('.popup').fadeIn();
	  	return false; 
	  }, 700)
})
// **********



});


(function ($) {
var SlideSpeed = 700;
var TimeOut = 3000;
 
$(document).ready(function(e) {
	$('.page').css(
		{"position" : "absolute",
		 "top":'150px', "left": '-30px'}).hide().eq(0).show();
	var slideNum = 0;
	var slideTime;
	slideCount = $(".book .page").size();
	var animSlide = function(arrow){
		clearTimeout(slideTime);
		$('.page').eq(slideNum).fadeOut(SlideSpeed);
		if(arrow == "next"){
			if(slideNum == (slideCount-1)){slideNum=0;}
			else{slideNum++}
			}
		else if(arrow == "prew")
		{
			if(slideNum == 0){slideNum=slideCount-1;}
			else{slideNum-=1}
		}
		else{
			slideNum = arrow;
			}
		$('.page').eq(slideNum).fadeIn(SlideSpeed, rotator);
		$(".control-slide.active").removeClass("active");
		$('.control-slide').eq(slideNum).addClass('active');
		}
		
	$('.next').click(function(){
		animSlide("next");
		return false;
		})
	$('.prew').click(function(){
		animSlide("prew");
		return false;
		})
	var $adderSpan = '';
	$('.book').each(function(index) {
			$adderSpan += '<span class = "control-slide">' + index + '</span>';
		});
	$('<div class ="slider-controls">' + $adderSpan +'</div>').appendTo('.history .wrap');
	$(".control-slide:first").addClass("active");
	$('.control-slide').click(function(){
	var goToNum = parseFloat($(this).text());
	animSlide(goToNum);
	});
	var pause = false;
	var rotator = function(){
			if(!pause){slideTime = setTimeout(function(){animSlide('next')}, TimeOut);}
			}
	$('.history .wrap').hover(	
		function(){clearTimeout(slideTime); pause = true;},
		function(){pause = false; rotator();
		});
	rotator();
});
})(jQuery);

	 
	