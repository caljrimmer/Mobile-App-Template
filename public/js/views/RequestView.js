define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'lang',
  'error',
  'models/Request',
  'views/BaseView',
  'text!templates/request.html'
], function($, _, Backbone, registry, lang, error, Request, BaseView, RequestTemplate){

	var RequestView = BaseView.extend({

		template : _.template(RequestTemplate),

		el : $('#main'),

		events : {
			'click #request' : 'eventRequest'
		},

		initialize : function(){
			this.render();
			this.type = this.options.type;
			return this;
			
		},

		render : function(){
			
		    $(this.el).find('.no-connection').hide(); 
			
			$(this.el).html(this.template({
				type : this.type,
				online:registry.onLine,
			    details : JSON.parse(window.localStorage.details),
				lang:lang.getLang().Template.request}
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
			
			if(registry.wizard){
				$(this.el).find('.secondary-but').show();
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
			
			$(this.el).find('.lat').text(registry.location.coords.latitude);
			$(this.el).find('.long').text(registry.location.coords.longitude);

		},
		
		controllerLocation : function(position){
			registry.location = position;
			registry.view.requestView.controllerMap(position);
		},
		
		eventRequest : function(e){
			e.preventDefault();

			var type,
				that = this;

			if(this.type === "help"){
				type = "ROAD_ASSISTANCE"
			}else{
				type = "ACCIDENT_CARE"
			}
			
			var details = {
				registration : JSON.parse(window.localStorage.details),
				coordinates : {
					latitude : registry.location.coords.latitude,
					longitude : registry.location.coords.longitude   
				},
				type : type   
			}
			
			var model = new Request();
			model.save(details,{
				
				complete : function(xhr){
					
					if(xhr.status === 200){
						$(that.el).find('#successfulRequest').show();
						$(that.el).find('#initialRequest').hide();
						
					}

					if(xhr.status === 404){
						window.scrollTo(0,0);
						xhr.responseText = lang.getLang().Template.validation.serviceError;
						error.serverError(xhr);
					}
				}
				
			});

		}

	});

	return RequestView;

});