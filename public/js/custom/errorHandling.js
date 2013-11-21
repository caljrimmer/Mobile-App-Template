define([
  'jquery',
  'registry'
], function($,registry){

	var Error = {

		clean : function($main){
			$main.find('.error').removeClass('error');
			$main.find('.errorMsg').remove();
		},

		singleClean : function(e){
			$(e.target).removeClass('error');
			$(e.target).parent().find('.errorMsg').remove();
		},

		format : function(errorField,msg){
			errorField.parent().find('.success-span').hide();
			errorField.addClass('error');
			errorField.before($('<div class="errorMsg">'+msg+'</div>'));
			$(window).scrollTop($('.errorMsg').offset().top - 100);
		},
		
		serverClean : function(){
			$('.error-msg').remove(); 
			$('.errorMsg').remove();
		},
		
		serverError : function(xhr){
			if(registry.isPhoneGap()){
				navigator.notification.alert(JSON.stringify(xhr))
			}
			this.serverClean();
			$(window).scrollTop(0);
			$('#main').prepend('<div class="error-msg">'+xhr.responseText+'</div>');
			$('.error-msg').show()
			$('.error-msg').fadeOut(7000);      
		}
	 
	}   

	return Error;  

});

