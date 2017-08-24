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
	
	$('input[data-placeholder]').each(function() {
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
	
	$('.achi h2').each(function() {
		$(this).attr('data-number', parseInt($(this).text()));
	});
	
	
	$('.achi').on('animateIn', function() {                          /* ***************************** */
		$(this).find('h2').each(function() {
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
			}, 100);
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

	var 	count1 = parseInt($('#result-img1').css('left'));
	var 	count2 = parseInt($('#result-img2').css('left'));
	var 	count3 = parseInt($('#result-img3').css('left'));
	var 	count4 = parseInt($('#result-img4').css('left'));
	var 	count5 = parseInt($('#result-img5').css('left'));
	var 	count6 = parseInt($('#result-img6').css('left'));	
	
	$('.achi').on('animateIn', function() {                                         /* ******************************* */
		var delay = 0;
		$(this).find('img').each(function() { 
			var $block = $(this);
			setTimeout(function() {
				$block.animate({left: '0'}, 500);				
			}, delay);
			delay += 250;
		});
		
	}).on('animateOut', function() {
		$(this).find('#result-img1').stop(true, true).animate({'left' : count1});
		
		$(this).find('#result-img2').stop(true, true).animate({'left' : count2});
		
		$(this).find('#result-img3').stop(true, true).animate({'left' : count3});
		
		$(this).find('#result-img4').stop(true, true).animate({'left' : count4});
		
		$(this).find('#result-img5').stop(true, true).animate({'left' : count5});
		
		$(this).find('#result-img6').stop(true, true).animate({'left' : count6});
	});


	var 	round1 = 127;
	var 	round2 = 158;
	var 	round3 = 193;
	var 	round4 = 238;
	var 	round5 = 282;
	var 	round6 = 327;	
	var 	round7 = 372;
	var 	round8 = 417;
	var 	round9 = 472;
	var 	round10 = 525;
	
	$('.how').on('animateIn', function() {
		$(this).find('#problems-block-main').stop(true, true).animate({opacity: 1}, 1000 );
		$(this).find('#problems-img1').stop(true, true).animate({'top' : round1}, 1000);
		
		$(this).find('#problems-img2').stop(true, true).animate({'top' : round2}, 1000);
		
		$(this).find('#problems-img3').stop(true, true).animate({'top' : round3}, 1000);
		
		$(this).find('#problems-img4').stop(true, true).animate({'top' : round4}, 1000);
		
		$(this).find('#problems-img5').stop(true, true).animate({'top' : round5}, 1000);
		
		$(this).find('#problems-img6').stop(true, true).animate({'top' : round6}, 1000);
		
		$(this).find('#problems-img7').stop(true, true).animate({'top' : round7}, 1000);
		
		$(this).find('#problems-img8').stop(true, true).animate({'top' : round8}, 1000);
		
		$(this).find('#problems-img9').stop(true, true).animate({'top' : round9}, 1000);
		
		$(this).find('#problems-img10').stop(true, true).animate({'top' : round10}, 1000);
		
	}).on('animateOut', function() {
		$(this).find('#problems-block-main').stop(true, true).animate({opacity: 0}, 500 );
		$(this).find('#problems-img1').stop(true, true).animate({top: '305'}, 1000);
		
		$(this).find('#problems-img2').stop(true, true).animate({top: '305'}, 1000);
		
		$(this).find('#problems-img3').stop(true, true).animate({top: '305'}, 1000);
		
		$(this).find('#problems-img4').stop(true, true).animate({top: '305'}, 1000);
		
		$(this).find('#problems-img5').stop(true, true).animate({top: '305'}, 1000);
		
		$(this).find('#problems-img6').stop(true, true).animate({top: '305'}, 1000);
		
		$(this).find('#problems-img7').stop(true, true).animate({top: '305'}, 1000);
		
		$(this).find('#problems-img8').stop(true, true).animate({top: '305'}, 1000);
		
		$(this).find('#problems-img9').stop(true, true).animate({top: '305'}, 1000);
		
		$(this).find('#problems-img10').stop(true, true).animate({top: '305'}, 1000);
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
	
	show_popup('.call a', '.popup .popup-call-back'); 
	
	show_popup('.quest a', '.popup .popup-quest');
	

	show_popup('#high, #minimal, #classic', '.popup .popup-mesurement');
	
	
	$('#high').click(function() {
		$('.popup-mesurement #form_name').val('РљР°С‚Р°Р»РѕРі РҐР°Р№-С‚РµРє');
	});
	$('#classic').click(function() {
		$('.popup-mesurement #form_name').val('РљР°С‚Р°Р»РѕРі РљР»Р°СЃСЃРёРєР°');
	});
	$('#minimal').click(function() {
		$('.popup-mesurement #form_name').val('РљР°С‚Р°Р»РѕРі РњРёРЅРёРјР°Р»РёР·Рј');
	});

  	
  	var set_scroll = function (scroll_from, scroll_to, offset) {
  		var target = $(scroll_to);
		$(scroll_from).click(function() {
			$('html, body').animate({
			    scrollTop: target.eq(0).offset().top-offset
			 }, 500);
		});
  	}
  	
  	set_scroll('.m1', '.errors h2', 68);
  	set_scroll('.m2', '.reasons h2', 68);
  	set_scroll('.m3', '.how h2', 68);
  	set_scroll('.m4', '.style h2', 68);
  	set_scroll('.m5', '.sert h2', 68);
  	set_scroll('.m6', '.tech', 68);
  	set_scroll('.m7', '.our-reasons h2', 68);
  	set_scroll('.m8', '.reviews h2', 68);



 $('.parallax-repeat').css({
         backgroundPosition:'center 0',
         backgroundRepeat:'repeat',
         backgroundAttachment:'fixed'
         });
         
         $('.parallax-norepeat').css({
         backgroundPosition:'center 0',
         backgroundRepeat:'no-repeat',
         backgroundAttachment:'fixed'
         });
         
    $('.parallax').each(function(){
        var $bgobj = $(this); // СЃРѕР·РґР°РµРј РѕР±СЉРµРєС‚
        $(window).scroll(function() {
            var yPos = -($window.scrollTop() / $bgobj.data('speed')); // РІС‹С‡РёСЃР»СЏРµРј РєРѕСЌС„С„РёС†РёРµРЅС‚ 
            // РџСЂРёСЃРІР°РёРІР°РµРј Р·РЅР°С‡РµРЅРёРµ background-position
            var coords = 'center '+ yPos + 'px';
            // РЎРѕР·РґР°РµРј СЌС„С„РµРєС‚ Parallax Scrolling
            $bgobj.css({ backgroundPosition: coords });
        });
    });
	
	
$('.our-client-blog-block-main').each(function (){
	})
	.mouseenter(function (){		
		$(this).children('.client-js').stop(true, true).animate({opacity: 0.4}, 500 );
		$(this).children('.client-js-p').stop(true, true).animate({opacity: 1}, 500 );
	})
	.mouseleave(function (){
		$(this).children('.client-js').stop(true, true).animate({opacity: 0}, 500 );
		$(this).children('.client-js-p').stop(true, true).animate({opacity: 0}, 500 );
	});
	
	$('.tech').on('animateIn', function() {
		$(this).find('.triangle1>div').addClass('triangle1-div1');
		$(this).find('.triangle1>img').addClass('triangle1-img');
		$(this).find('.triangle-1>div').addClass('triangle1-div2');
	
		setTimeout(function() {$('.triangls').find('.triangle-2').css('opacity', 0.2)}, 1300);
		setTimeout(function() {$('.triangls').find('.triangle2>div').addClass('triangle2-div1')}, 1300);
		setTimeout(function() {$('.triangls').find('.triangle2>img').addClass('triangle2-img')}, 1300);
		setTimeout(function() {$('.triangls').find('.triangle-2>div').addClass('triangle2-div2')}, 1300);
		
		setTimeout(function() {$('.triangls').find('.triangle-3').css('opacity', 0.2)}, 2600);
		setTimeout(function() {$('.triangls').find('.triangle3>div').addClass('triangle3-div1')}, 2600);
		setTimeout(function() {$('.triangls').find('.triangle3>img').addClass('triangle3-img')}, 2600);
		setTimeout(function() {$('.triangls').find('.triangle-3>div').addClass('triangle3-div2')}, 2600);
		
		setTimeout(function() {$('.triangls').find('.triangle4>img').css('opacity', 1)}, 3700);
		setTimeout(function() {$('.triangls').find('.triangle5>img').css('opacity', 1)}, 4200);

	}).on('animateOut', function() {
		$(this).find('.triangle1>div').removeClass('triangle1-div1');
		$(this).find('.triangle1>img').removeClass('triangle1-img');
		$(this).find('.triangle-1>div').removeClass('triangle1-div2');
	
		$(this).find('.triangle2>div').removeClass('triangle2-div1');
		$(this).find('.triangle2>img').removeClass('triangle2-img');
		$(this).find('.triangle-2>div').removeClass('triangle2-div2');
		
		$(this).find('.triangle3>div').removeClass('triangle3-div1');
		$(this).find('.triangle3>img').removeClass('triangle3-img');
		$(this).find('.triangle-3>div').removeClass('triangle3-div2');
		
		$(this).find('.triangle4>img').css('opacity', 0);
		$(this).find('.triangle5>img').css('opacity', 0);
	});
			
	$('.triangls').find('.triangle1').find('div>div').each(function() {
		var deg = Math.floor(Math.random()*360);
		var x_trans = Math.floor(200-Math.random()*400);
		var y_trans = Math.floor(200-Math.random()*400);
		$(this).css('transform', 'rotate('+deg+'deg) translate('+x_trans+'px, '+y_trans+'px)');
	});
	
	$('.triangls').find('.triangle2').find('div>div').each(function() {
		var deg = Math.floor(Math.random()*360);
		var x_trans = Math.floor(200-Math.random()*400);
		var y_trans = Math.floor(200-Math.random()*400);
		$(this).css('transform', 'rotate('+deg+'deg) translate('+x_trans+'px, '+y_trans+'px)');
	});
	
	$('.triangls').find('.triangle3').find('div>div').each(function() {
		var deg = Math.floor(Math.random()*360);
		var x_trans = Math.floor(200-Math.random()*400);
		var y_trans = Math.floor(200-Math.random()*400);
		$(this).css('transform', 'rotate('+deg+'deg) translate('+x_trans+'px, '+y_trans+'px)');
	});
	
});