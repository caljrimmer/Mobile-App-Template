define([
  'jquery',
  'underscore',
  'backbone',
  'registry'
], function($, _, Backbone, registry){
		
	var Details = Backbone.Model.extend({
		urlRoot : registry.path() + '/roadAssistance/registration'
	});

	return Details; 
		
});