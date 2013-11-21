define([
  'jquery',
  'underscore',
  'backbone',
  'registry', 
  'lang',
  'views/BaseView',
  'text!templates/modals/feedback.html'
], function($, _, Backbone, registry, lang, BaseView, FeedbackTemplate){
	
	var FeedbackView = BaseView.extend({

		template : _.template(FeedbackTemplate),
		
		el : $('#canvas'),        
		
		events : {
			'click a.close' : 'eventDestroy',
			'click #sendFeedback' : 'eventSendFeedback'
		},
	
		initialize : function(){
			registry.App.navView.afterRenderNavState(true);
			this.render();
			this.afterRenderResize();
		},
		
		render : function(){
			$(this.el).append(this.template({lang : lang.Template.feedback}));
			return this;
		},
		
		afterRenderResize : function(){
			
			var top, left,
				height = $(this.el).height(),
				width = $(this.el).width();
			
			if($(window).height() > $(this.el).height()){
				height = $(window).height();
			}
			
			$(this.el).find('.mask').css({
				height : height,
				width : width,
			});

		    $(this.el).find('.modal').css({
		        top: 100, 
		        left : Math.max(width - $(this.el).find('.modal').outerWidth(), 0) / 2
		    });
			
		}, 
		
		controllerDispose : function(){
			this.dispose();
			if(Backbone.history.fragment === "feedback"){
				window.history.back();
			}
		},
		
		eventSendFeedback : function(e){
			e.preventDefault();

			var that = this,
				value = $(this.el).find('#message').val(),
				feedback = new Feedback(),
				params = {
					message : value
				};
				
			if(value === ""){
				return false;
			}
			
			$(this.el).find('.mask .feedback').replaceWith('<div class="success-msg push"><p>Sending Feedback...</p></div>');
			$(this.el).find('.success-msg').last().css({
				margin: '15px',
				width: 'auto'
			}).show();

			feedback.save(params,
			{success : function(model, response, options){ 
				that.controllerDispose();
			}});
                                      
		},
		
		eventDestroy : function(e){
			e.preventDefault();
			this.controllerDispose();
		}
	  
	});
	
	return FeedbackView;

});