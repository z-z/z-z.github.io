/* Old IE (<= 8) HTML5 tags */
document.createElement('HEADER');
document.createElement('FOOTER');
document.createElement('ASIDE');
document.createElement('ARTICLE');
document.createElement('MARK');

function preload(images) {
    if (document.images) {
        var i = 0;
        var imageArray = new Array();
        imageArray = images.split(',');
        var imageObj = new Image();
        for(i=0; i<=imageArray.length-1; i++) {
            imageObj.src=imageArray[i];
        }
    }
}

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
		$(this).find('input[data-placeholder], textarea[data-placeholder]').each(function() {
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

	show_popup('.call a, .questions a', '.popup .call-form');

  	var set_scroll = function (scroll_from, scroll_to, offset) {
  		var target = $(scroll_to);
		$(scroll_from).click(function() {
			$('html, body').animate({
			    scrollTop: target.eq(0).offset().top-offset
			 }, 500);
		});
  	}

	$('.subscribe-message a').click(function() {
		$(this).closest('.subscribe-message').fadeOut(function() {
			$(this).closest('.form-wrap').find('form').slideDown();
		});
		return false;
	});

	$('.call-form input[name="form_name"]').val('Обратный звонок');

});
