define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'lang',
  'views/BaseView',
  'text!templates/settings.html'
], function($, _, Backbone, registry, lang, BaseView, settingsTemplate){
	
	var settingsView = BaseView.extend({

		template : _.template(settingsTemplate),
	   
		el : $('#main'),             
		
		events : {
			'click .switch p' : 'eventSwitch'
		},
	
		initialize : function(){
			this.render();
		},
		
		render : function(){
			$(this.el).html(this.template({lang:lang.Template.settings}));
			return this;
		},
		
		eventSwitch : function(e){
			var setting = $(e.target).parent();
			if(setting.hasClass('on')){
				setting.removeClass('on');
			}else{
				setting.addClass('on');
			}
		}
	  
	});
	
	return settingsView;

});