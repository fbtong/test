/**
 * Copyright © 远信科技, All Rights Reserved.
 * 
 * 微博方式弹窗
 * @author yangkang
 */
(function($) {       
	
	var overlay = '<div class="overlay"></div>';
		   //constructor, typeof,
		   //instanceof 返回一个 Boolean 值，指出对象是否是特定类的一个实例。 
	var screenHeight = window.screen.availHeight - 180,
		   screenWeight = window.screen.availWidth;
	
	var settings = {
			width : 450,
			height : 'auto',
			overlay : false,
			screenFull : false,
			content : '',
			dialogClass : 'dialog'
	};
	
	var createEl = function(tag){
		var el = document.createElement(tag);
		return el;
	};
	
	$.fn.dialog = function(obj) {
			   
		var $body = $('body'),
			   $This = $(this),
			   elHeight = $This.outerHeight(),
			   elWidth = $This.outerWidth();
		var dialogEl = createEl('div');
		
		var dialogWidth= obj.width || settings.width;
		$(dialogEl).addClass(settings.dialogClass).css('width', dialogWidth);
		
		$This.click(function(e){
			e.preventDefault();
			e.stopPropagation();
			
			elOffset = $(this).offset();
			
			if(obj.overlay || settings.overlay) {
				$body.append(overlay);
				screenHeight = $('.overlay').outerHeight() - 60;
			}
			
			$body.append(dialogEl);
			
			if(obj.content && (obj.content.constructor===Function)){
				obj.content.call(dialogEl, $(this));
			}else{
				dialogEl.innerHTML = obj.content || settings.content;
			}
			
			var dialogHeight = obj.height || $(dialogEl).height();
			
			if(obj.screenFull || settings.screenFull){
				dialogElLeft = parseInt(screenWeight/2 - dialogWidth/2);
				dialogElTop = parseInt(screenHeight/2 -  dialogHeight/2);
				$(dialogEl).css('left', dialogElLeft+'px').css('top', dialogElTop+'px');
			}else{
				dialogElLeft = elOffset.left + parseInt(elWidth/2) - parseInt(dialogWidth/2);
				dialogElTop = elOffset.top + parseInt(elHeight);
				$(dialogEl).css('left', dialogElLeft+'px').css('top', dialogElTop+'px').css('position', 'absolute');
			}
			
			$(dialogEl).on('click', obj.close, function(e){
				$(dialogEl).remove();
				$('.overlay').remove();
				e.preventDefault();
				e.stopPropagation();
			});
			/*$('body').on('click', (function(e){
				$(dialogEl).remove();
				$('.overlay').remove();
			});*/
			$('.'+settings.dialogClass).click(function(e){
				e.stopPropagation();
			});
			
			/*$(window).scroll(function(){
				dialogElTop = parseInt(screenHeight/2 -  dialogHeight/2 + $(window).scrollTop());
				$(dialogEl).css('top', dialogElTop+'px');
			});*/
		});
		
	};
	
})(jQuery);
