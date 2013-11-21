define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'lang',
  'views/BaseView',
  'text!templates/assistance.html'
], function($, _, Backbone, registry, lang, BaseView, AssistanceTemplate){

	var AssistanceView = BaseView.extend({

		template : _.template(AssistanceTemplate),

		el : $('#main'),

		events : {},

		initialize : function(){
			this.render();
			if(registry.wizard){
				$(this.el).find('.secondary-but').show();
			}   
		},

		render : function(){
			
			$(this.el).html(this.template({
				online:registry.onLine,
				lang:lang.getLang().Template.assistance}
				)
			);
			
			return this;
			
		}

	});

	return AssistanceView;

});