(function ($) {
    var settings = {
        auth_token: "", // replace with your token or pass a new value in the settings
        loading_message: "Finding and loading instagram stream...", // This can be any html you want to show for loading
        default_image: "#", // this will load a place holder image for until the instagram photo is loaded
        count: 10
    }
    var methods = {
        /**
         * Get images from your own stream
         */
        getMyStream: function (options) {
            if (options) {
                $.extend(settings, options);
            }

            var $e = this;
            initLoad($e, function() {
                getInstagramFeed(
                    $e, 
                    settings, 
                    'https://api.instagram.com/v1/users/self/media/recent?count=' + settings.count + '&access_token=' + settings.auth_token);
            });
        },
        /**
         * Get images from your own stream
         */
        getUserStream: function(options) {
            if (options) {
                $.extend(settings, options);
            }

            var $e = this;
            initLoad($e, function() {
                getInstagramFeed(
                    $e, 
                    settings, 
                    'https://api.instagram.com/v1/users/' + settings.user + '/media/recent?count=' + settings.count + '&access_token=' + settings.auth_token
                );
            });
        },
        /**
          * Get images I have liked
          */
        getMyLikes: function(options) {
            if (options) {
                $.extend(settings, options);
            }
            
            var $e = this;
            initLoad($e, function() {
                getInstagramFeed(
                    $e,
                    settings,
                    'https://api.instagram.com/v1/users/self/media/liked?count=' + settings.count + '&access_token=' + settings.auth_token
                );
            });
        }
    };

    function initLoad(e, callback) {
        e.html("<div id='instagramLoadingMessage'>" + settings.loading_message + "</div>");
        if (typeof(callback) == 'function') {
            callback();
        }
    }

    function getInstagramFeed(e, settings, url) {
        var id = e.attr('id');
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function (result) {
                e.html("");
                $.each(result.data, function (i) {
                    e.append("<img style='display: none;' id='" + id + '_'  + i + "' class='instagramPhoto' src='" + settings.default_image + "' />");
                    
                    $('#' + id + '_' + i).load(function () {
                        $(this).fadeIn('fast');
                    }).attr('src', this.images.thumbnail.url);
                });
            }
        });
    }

    $.fn.instagram = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.instagram');
        }

    };

})(jQuery);