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
  	show_popup('a.quest', '.popup .question')
  	
  	
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


/* *** slider + select_style + img-transition-.c11 artservice.consiratio.ru *** */

$('.c2 .checker li:first, .c2 .slider li:first').addClass('active');

$('.c2 .checker li').click(function(){
	if( !$(this).hasClass("active")){
		$('.c2 .checker li').removeClass('active');
		$(this).addClass('active');
		var n = $(this).index();
		$('.c2 .slider li.active').fadeOut(500, function(){
			$(this).removeClass('active');
			$('.c2 .slider li').eq(n).addClass('active').fadeIn(500);
		})
	}
})



$(".c3 .block").each(function(){
	var c3BlockTumbler = 0;
	$(this).mouseenter(function(){
		c3BlockTumbler = 1;
		var margin = parseInt($(this).find('li').eq(0).css("margin-top"));       //значение, котооре будем менять
		var len = $(this).find("li").size()*$(this).find('li').eq(0).height() - $(this).find('li').eq(0).height(); //максимальный маргин
		var minus = $(this).find('li').eq(0).height();                          //вычитаемое значение - высота одного li
		var $block = $(this);
		setTimeout(function(){
			if( margin != -len && c3BlockTumbler == 1){
				margin -=  minus;
				$block.find('h3, p').css("opacity", 0);
			} else {
				margin = 0;
			}
			$block.find('li').animate({'opacity': 0.3}, 150, function() {
				$block.find('li').eq(0).css("margin-top", margin+"px");
				$block.find('li').animate({'opacity': 1}, 150);
			});
			
			if(c3BlockTumbler == 1) setTimeout(arguments.callee, 1000);
		}, 100);
	});
	$(this).mouseleave(function(){
		c3BlockTumbler = 0;
		$(this).find('h3, p').css("opacity", 1);
		$(this).find('li').eq(0).css("margin-top", 0);
	});
});



$('select').styler();


$(".c11 div[data-class='img']").mouseenter(function(){
	$(this).toggleClass('i1').toggleClass('i2');
	$(this).siblings().toggleClass('i1').toggleClass('i2');
})



	var cx1, cx2, c = -1.2, delta = $("#canv1").height()  + 200 - (($(window).height()-$("#canv1").height())/2);

	var canvas = document.getElementById('canv1');
	var context = canvas.getContext('2d');
	
	var canvTop = $("#canv1").offset().top-$(window).height();
    var yNew = (($(window).scrollTop()-canvTop) / c) + delta;

	var imageObj = new Image();
	imageObj.src = './static/a/img/art2.jpg';

	imageObj.onload = function() {
		var pattern = context.createPattern(imageObj, 'repeat');
		var t1w = context.measureText("АРТ");
		var textWidth1 = t1w.width;
		cx1 = (canvas.width / 2) - (textWidth1 / 2);
		var t2w = context.measureText("СЕРВИС");
		var textWidth2 = t2w.width;
		cx2 = (canvas.width / 2) - (textWidth2 / 2);
		context.font = '200px "Playfair Display"';
		context.textAlign = "center";
		context.fillStyle = pattern;
		context.fillText("АРТ", cx1, yNew+300);
		context.fillText("СЕРВИС", cx2, yNew + 450);
		context.fill();
	};
	
	$(window).scroll(function(e){
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		var canvTop = $("#canv1").offset().top-$(window).height();
        var yNew = (($(window).scrollTop()-canvTop) / c) + delta;
		
		context.fillText("АРТ", cx1, yNew+300);
		context.fillText("СЕРВИС", cx2, yNew+450);
		
	});
	
	
	
	
	/*var f = function(){

		R = 0;
		x1 = .1;
		y1 = .05;
		x2 = .25;
		y2 = .24;
		x3 = 1.6;
		y3 = .24;
		x4 = 300;
		y4 = 200;
		x5 = 300;
		y5 = 200;
		DI = document.getElementsByTagName("img");
		DIL = DI.length;
		function A() {
			for ( i = 0; i - DIL; i++) {
				DIS = DI[i].style;
				DIS.position = 'absolute';
				DIS.left = (Math.sin(R * x1 + i * x2 + x3) * x4 + x5) + "px";
				DIS.top = (Math.cos(R * y1 + i * y2 + y3) * y4 + y5) + "px"
			}
			R++
		}

		setInterval(A, 5);

	}
	
	$("img").on('dblclick', function(){f();});*/
	
	



/* *** slider + select_style + img-transition-.c11 artservice.consiratio.ru *** */



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

	 
	