define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'error',
  'custom/regex',
  'custom/sanitise',
  'lang',
  'models/Details',
  'views/BaseView',
  'text!templates/details.html'
], function($, _, Backbone, registry, error, regex, sanitiser, lang, Details, BaseView, DetailsTemplate){

	var DetailsView = BaseView.extend({

		template : _.template(DetailsTemplate),

		el : $('#main'),

		events : {
			'click #getDetails' : 'eventSaveDetails',
			'focus [data-val]' : 'eventFocus'
		},

		initialize : function(){
			this.render();
			if(registry.wizard){
				$(this.el).find('.secondary-but').show();
			}
		},

		render : function(){           
			
			var details = {};
			
			if(_.has(window.localStorage,'details')){
				details = JSON.parse(window.localStorage.details);
			}else{
				details.phoneNumber = "";
				details.contactName = "";
				details.policyNumber = "";
				details.vehicleRegistration = "";
				details.deviceDescription = navigator.userAgent;
			}
			
			$(this.el).html(this.template({
				details : details,
				online : registry.onLine,
				lang : lang.getLang().Template.details
				})
			);
			
			return this;
			
		},
		
		eventFocus : function(e){
			error.singleClean(e)
		},
		
		eventSaveDetails : function(e){
			e.preventDefault();
			var valid = true,
				that = this;
			
			$(this.el).find('[name]:visible').each(function(){
				
				var value = sanitiser[$(this).attr('data-san')].sanitise($(this).val())
				
				if(!regex[$(this).attr('data-val')].test(value)){
					error.format($(this),lang.getLang().Template.validation[$(this).attr('name')]);
					valid = false;
				}else{
					if(!($(this).attr('name') === "policy" || $(this).attr('name') === "reg")){
						$(this).parent().find('.success-span').show();
					}
				}
				
				$(this).val(sanitiser[$(this).attr('data-san')].formatForDisplay(value))
				
			});
			
			if(valid){
				
				var details = {
					phoneNumber : $(this.el).find('[name="mobile"]').val(),
					contactName : $(this.el).find('[name="name"]').val(),
					policyNumber : $(this.el).find('[name="policy"]').val(),
					vehicleRegistration : $(this.el).find('[name="reg"]').val(),
					deviceDescription : navigator.userAgent 
				}

				var model = new Details(); 
				model.save(details,{
					complete: function(xhr){ 
						
						console.log(xhr.status)
						
						if(xhr.status === 200){
							$(that.el).find('.afterService').show();
							error.clean($(that.el)) 
							$('.assistance').css({
								display : 'inline-block'
							});
							if(registry.wizard){
								registry.App.navigate('assistance',true)
							}  
						}
						
						if(xhr.status === 404){
							xhr.responseText = lang.getLang().Template.validation.serviceCheck;
							error.serverError(xhr);
							details.vehicleRegistration = "";
							details.policyNumber = "";   
						} 
						
						if(xhr.status === 0){
							xhr.responseText = 'Failing as not going through VPN';
							error.serverError(xhr);
							details.vehicleRegistration = "";
							details.policyNumber = "";   
						}
						
						window.localStorage.setItem('details',JSON.stringify(details));
						  
					}
				});

			
			}
			
		}

	});

	return DetailsView;

});