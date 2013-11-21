define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'lang',
  'error',
  'views/BaseView',
  'text!templates/home.html'
], function($, _, Backbone, registry, lang, error, BaseView, HomeTemplate){

	var HomeView = BaseView.extend({

		template : _.template(HomeTemplate),

		el : $('#main'),

		events : {
			'click .primary-but' : 'eventWizardTrigger'
		},

		initialize : function(){
			this.render();
		},

		render : function(){
			$(this.el).html(this.template({
				online:registry.onLine,
				lang:lang.getLang().Template.home}
				)
			);
			this.controllerLocation();
			return this;
		},
		
		renderLoadingBar : function(){
			$('.pending').hide();
			$('.found').show();
		},
		
		controllerSetPosition : function(position){
			registry.location = position;
			registry.view.homeView.renderLoadingBar(); 
		},
		
		controllerLocation : function(){
			if(!_.has(registry,'location')){
				navigator.geolocation.getCurrentPosition(this.controllerSetPosition, error.serverError);
			}else{
				this.renderLoadingBar();
			}
		},
		
		eventWizardTrigger : function(){
			registry.wizard = true;
		}

	});

	return HomeView;

});