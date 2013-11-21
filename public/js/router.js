define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'lang',
  'views/NavView',
  'views/FooterView',
  'views/HomeView',
  'views/LocationView',
  'views/SettingsView',
  'views/DetailsView',
  'views/AssistanceView',
  'views/RequestView'
], function($, _, Backbone, registry, lang,
	NavView,
	FooterView,
	HomeView,
	LocationView,
	SettingsView,
	DetailsView,
	AssistanceView,
	RequestView){

	var Router = Backbone.Router.extend({

		routes: {
			'home' : 'home',
			'location' : 'location',
			'details' : 'details',
			'assistance' : 'assistance',
			'request/:type' : 'request',
			'': 'default',
			'*notFound': 'default'
		},

		initialize : function(){
			var that = this;
			this.navView = new NavView({});
			this.footerView = new FooterView({});
		},
		
		home : function(){
			registry.splashRemove();
			registry.zombieKiller();
			registry.view.homeView = new HomeView({
				model : registry.me
			});  
		},

		location : function(){
			registry.splashRemove();
			registry.zombieKiller();
			registry.view.locationView = new LocationView({});
		},

		details : function(){
			registry.splashRemove();
			registry.zombieKiller();
			registry.view.detailsView = new DetailsView({});
		},
		
		assistance : function(){
			registry.splashRemove();
			registry.zombieKiller();
			registry.view.assistanceView = new AssistanceView({});			
		},
		
		request : function(type){
			registry.splashRemove();
			registry.zombieKiller();
			registry.view.requestView = new RequestView({
				type : type
			});	
		},

		default: function() {
			if(registry.isPhoneGap()){
				navigator.splashscreen.hide();
			}
            registry.splashRemove();
			registry.App.navigate('home', true);
		}

	});

	return Router;


});
