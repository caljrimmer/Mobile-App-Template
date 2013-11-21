define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'lang',
  'views/BaseView',
  'views/NavView',
  'text!templates/footer.html'
], function($, _, Backbone, registry, lang, BaseView, NavView, FooterTemplate){
	
	var NavView = BaseView.extend({

		template : _.template(FooterTemplate),
	   
		el : $('#footer'),             
		
		events : {
			'click .lang' : 'eventLang'
		},
	
		initialize : function(){
			this.render();
		},
		
		render : function(){
			$(this.el).html(this.template({lang:lang.getLang().Template.footer}));
			return this;
		},
		
		eventLang : function(e){
			e.preventDefault();
			var selected = $(e.target).attr('id');
			lang.setLang(selected);
			registry.App.navView.render();
			registry.App.footerView.render();
			registry.App.navigate('home',true);
			registry.view.homeView.render();
		}
	  
	});
	
	return NavView;

});