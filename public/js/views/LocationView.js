define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'lang',
  'error',
  'views/BaseView',
  'text!templates/location.html'
], function($, _, Backbone, registry, lang, error, BaseView, LocationTemplate){

	var LocationView = BaseView.extend({

		template : _.template(LocationTemplate),

		el : $('#main'),

		events : {},

		initialize : function(){
			this.render();
		},

		render : function(){
			
			$(this.el).find('.no-connection').hide();
			
			$(this.el).html(this.template({
				online:registry.onLine,
				lang:lang.getLang().Template.location}
				)
			);

			if(registry.onLine){
				if(!_.has(registry,'location')){
					navigator.geolocation.getCurrentPosition(this.controllerLocation, error.serverError);
				}else{
					this.controllerMap(registry.location);
				}   
			}else{
				$(this.el).find('.no-connection').show();
			}
			
			return this;
			
		},
		
		controllerMap : function(position){
			var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			
		    var map = new google.maps.Map(document.getElementById('map'), {
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				center: myLocation,
				zoom: 15   
		    });
		
			var marker = new google.maps.Marker({
			    position: myLocation,
			    title:"You are here!"
			});

			// To add the marker to the map, call setMap();
			marker.setMap(map);
		  
		},
		
		controllerLocation : function(position){
			registry.location = position;
			registry.view.locationView.controllerMap(position);
		},

	});

	return LocationView;

});