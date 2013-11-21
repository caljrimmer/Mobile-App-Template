define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'lang',
  'views/BaseView',
  'text!templates/nav.html'
], function($, _, Backbone, registry, lang, BaseView, navTemplate){
	
	var NavView = BaseView.extend({

		template : _.template(navTemplate),
	   
		el : $('#nav'),             
		
		events : {
			'click ul li.menu' : 'eventMenu',
			'click ul ul li a' : 'eventLink',
			'click ul li.shim' : 'eventClose'
		},
	
		initialize : function(){
			this.render();
			$(this.el).find('ul li.shim').css({
				height : $(window).height()
			});
		},
		
		render : function(){
			$(this.el).html(this.template({lang:lang.getLang().Template.nav}));
			if(!_.has(window.localStorage,'details')){
				$(this.el).find('.assistance').hide();
			}
			return this;
		},
		
		afterRenderNavState : function(state){
			if(state){
				$(this.el).find('ul li.shim').hide(); 
				$(this.el).find('ul li.menu').removeClass('on');
				$(this.el).find('ul ul').animate({
					opacity: 0
				}, 300, "linear", 	
				function() {
					$(this).removeClass('on');
			    });   
			}else{
				$(this.el).find('ul li.shim').show();
				$(this.el).find('ul li.menu').addClass('on');
				$(this.el).find('ul ul').addClass('on'); 
				$(this.el).find('ul ul').animate({
					opacity: 1
				}, 300); 
			}
		},
		
		eventClose : function(){
			this.afterRenderNavState(true);
		},
		
		eventLink : function(e){
			this.afterRenderNavState(true);
		},
		
		eventMenu : function(e){
			e.preventDefault();
			this.afterRenderNavState($(this.el).find('ul li.menu').hasClass('on'));
		}
	  
	});
	
	return NavView;

});