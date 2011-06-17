(function( $ ){
  var settings = {
    auth_token: "332178.5532830.304dcae9620749e086bac69712af2051", // replace with your token or pass a new value in the settings
    loading_message: "Finding and loading instagram stream...", // This can be any html you want to show for loading
    default_image: "#", // this will load a place holder image for until the instagram photo is loaded
  	count: 10
  }
  var methods = {
    /**
      * Get images from your own stream
      */
    getMyStream : function( options ) {
    	if(options) {
    		$.extend(settings, options);
    	}
    	
    	var e = this;
    	
    	$(e).html("<div id='instagramLoadingMessage'>" + settings.loading_message + "</div>");
		getInstagramFeed(e, settings, 'self');
    },
    /**
  	  * Show the content
  	  */
    show : function( ) {
    	$(this).slideDown();
    },
    /**
  	  * Hide the content
  	  */
    hide : function( ) {
    	$(this).slideUp();
    }
  };
  
  function getInstagramFeed(e, settings, user) {
  	$.ajax({
		url: 'https://api.instagram.com/v1/users/'+ user +'/media/recent?count='+ settings.count +'&access_token=' + settings.auth_token,
		dataType: 'jsonp',
		success: function(result) {
			$(e).html("");
			$.each(result.data, function(i) {
			$(e).append("<img style='display: none;' id='instagramPhoto" + i + "' class='instagramPhoto' src='" + settings.default_image + "' />");
				
				$('#instagramPhoto'+i).load(function() {
					$(this).fadeIn('fast');
				}).attr('src', this.images.thumbnail.url);
			});
			
			
		}
	});
  }
  
  $.fn.instagram = function( method ) {
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }    
  
  };

})( jQuery );