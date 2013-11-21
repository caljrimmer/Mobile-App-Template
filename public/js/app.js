define([
  'jquery',  
  'underscore',  
  'backbone',
  'router',
  'registry',
  'error'
], function($,_,Backbone,router, registry, errorHandler, Me){
   
    registry.App = new router();
	registry.onLine = navigator.onLine;
	registry.userAgent = navigator.userAgent.toLowerCase();
	 
	if(!registry.isPhoneGap()){ 
		//Adds class to html tag
		//We can then add different experiences for supported and not supported
		if(registry.userAgent.indexOf('firefox') !== -1) $('html').addClass('firefox'); 
		if(registry.userAgent.indexOf('webkit') !== -1) $('html').addClass('webkit');
		if(registry.userAgent.indexOf('msie') !== -1) $('html').addClass('msie'); 
	}

	return registry;
	 
});