define(['underscore','jquery'], function(_,$) {
	
    var registry = {
	    path : function(){        
	   		var path = ""; 
			if(this.lang === 'en') path = "/en" 
			if(this.isPhoneGap()){
                // PC - should this be put in a config somewhere?
				return 'https://test1.hellasdirect.gr' + path;
			}else{
				return 'https://test1.hellasdirect.gr' + path;
			}
		},
		isPhoneGap : function(){
			return (_.has(window,'cordova') || _.has(window,'PhoneGap') || _.has(window,'phonegap')) 
		    && /^file:\/{3}[^\/]/i.test(window.location.href) 
		    && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent)   
		},
		splashRemove : function(){
			$('.splash').fadeOut(500);
		},
		zombieKiller : function(){
			//Feedback needs to be in #canvas to cover all screen with mask.
			//This kills it cleaner to stop #main being destroyed             
			//This can be removed if we don't have the feeback modal fired from the nav link
			if(_.has(this.view,'feedbackView')) delete this.view.feedbackView;
			
			$.each(this.view,function(k,v){
				v.dispose();
			});
			this.view = {};
		},
		lang : 'en',
		wizard : false,
		model : {},
		collections : {},
		view : {},
		App : {}
	};
	  
    return registry;

});
