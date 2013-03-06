(function($){
	
	//Staffpage Effects -- /staff
	Drupal.behaviors.staffPage = {
		attach: function (context, settings) {
			Drupal.behaviors.staffPage.watch(context);
		},
		watch: function (context){
			//-------------
			//IE 7 is ghey. This if statement corrects z-indexes by rewriting the page element values.
			//This will only hit the IE7 browser.
			//Kid tested, mom approved. (Admiral Ackbar)!!Its a trap.
			if ($.browser.msie  && parseInt($.browser.version, 10) === 7){
       			var zIndexNumber = 10000;
       		
	       		// Put your target element(s) in the selector below!
	       		$('div').each(function(){
	               $(this).css('zIndex',zIndexNumber);
	               zIndexNumber -= 10;
	       		});
			}
			//-------------

			//Hide content if javascript is enabled.
			$('.staff-content').hide();

			$('.staff-shadow').click(function(){
				var findContent = $(this).parent().find('.staff-content');
				var contentOpen = $('.staff-content.open', '.view-staff-page');
				var clickTarget = $('.staff-shadow', '.view-staff-page');

				//If the content is not viewable.
				if(!findContent.hasClass('open')){
						//Set other open content closed.
						contentOpen.removeClass('open').css({'z-index' : '1'}).slideToggle();
						clickTarget.css({'z-index' : '10'});

						//Elevate current elements to be above other view rows.
						$(this).css({'z-index' : '250'});
						findContent.css({'z-index' : '240'}).slideToggle(400, function(){
							$(this).addClass('open');
						});
				}else{
					//If the content is viewable, shut and remove open class. Set Z-indexes to normal via reZ().
					//Done this way so that other view rows do not pop-up through the content as it slides shut.
					contentOpen.removeClass('open').slideToggle();
					setTimeout('Drupal.behaviors.staffPage.reZindex', 500);
				}
			});
		},
		//This sets z-index values bak to normal when content is viewable.
		reZindex: function (context){
			$(this).css({'z-index' : '1'});
			clickTarget.css({'z-index' : '10'});
		}
	}

	Drupal.behaviors.mailchimpForm = {
		attach: function (context, settings){
			Drupal.behaviors.mailchimpForm.watch(context);
		},
		watch: function (context){
			var form = $('#mc_embed_signup');
			var tab = $('#mail-tab');

			//Hide the form, show the tab.
			form.hide();
			tab.show();

			tab.click(function(){
				form.slideToggle();
			});
		}
	}

}(jQuery));