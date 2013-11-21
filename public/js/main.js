require.config({
    paths: {
        'jquery' : 'vendor/jquery-1.10.1.min',
		'color' : 'vendor/jquery.color',
		'fastclick' : 'vendor/fastclick',
        'underscore' : 'vendor/underscore',
        'backbone' : 'vendor/backbone',
		'backboneStorage' : 'vendor/backbone.localstorage',
		'text' : 'vendor/text',
		'test' : 'custom/test',
		'ga' : 'custom/googleAnalytics',
		'regex' : 'custom/regex',
		'error' : 'custom/errorHandling',
		'lang' : 'custom/lang'
    },
	shim: {
		underscore: {
			exports: '_'
		},
		color : {
			deps: ["jquery"],
			exports: "color" 
		},
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}  
	 } 
});
	
require([
  'registry'
], function(registry){
	
	if(registry.isPhoneGap()){
		document.addEventListener("deviceready", onDeviceReady, false);
		function onDeviceReady() {
			require([
			  'app',
			  'fastclick'
			], function(app,fastclick){
				window.app = app;
				fastclick.attach(document.body);
				Backbone.history.start();
			}); 
		}
	}else{
		require([
		  'app',
		  'fastclick'
		], function(app,fastclick){
			window.app = app;
			fastclick.attach(document.body);
			Backbone.history.start(); 
		});
	}

});  
