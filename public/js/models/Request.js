define([
  'jquery',
  'underscore',
  'backbone',
  'registry'
], function($, _, Backbone, registry){
		
	var Request = Backbone.Model.extend({
		urlRoot : registry.path() + '/roadAssistance/request'
	});

	return Request; 
		
});