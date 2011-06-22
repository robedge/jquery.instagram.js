(function ($) {
    var settings = {
        authToken: "332178.5532830.304dcae9620749e086bac69712af2051", // replace with your token or pass a new value in the settings
        loadingMessage: "Finding and loading instagram stream...", // This can be any html you want to show for loading
        count: 10
    }
    var methods = {
        /**
         * Get images from your own stream
         */
        getStream: function (options) {
            if (options) {
                $.extend(settings, options);
            }

            var $e = this;
            var url = 'https://api.instagram.com/v1/users/self/media/recent?count=' + settings.count + '&access_token=' + settings.authToken;
            if (typeof(settings.user) != 'undefined') {
                url = 'https://api.instagram.com/v1/users/' + settings.user + '/media/recent?count=' + settings.count + '&access_token=' + settings.authToken
            }
            initLoad($e, function() {
                getInstagramFeed(
                    $e, 
                    settings, 
                    url);
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
                    'https://api.instagram.com/v1/users/self/media/liked?count=' + settings.count + '&access_token=' + settings.authToken
                );
            });
        },
        /**
          * Get the current most popular images
          */
        getPopularStream: function(options) {
            if (options) {
                $.extend(settings, options);
            }
            
            var $e = this;
            initLoad($e, function() {
                getInstagramFeed(
                    $e,
                    settings,
                    'https://api.instagram.com/v1/media/popular?count=' + settings.count + '&access_token=' + settings.authToken
                );
            });
        },
        getStreamByTag: function(options) {
            if (options) {
                $.extend(settings, options);
            }
            
            var $e = this;
            initLoad($e, function() {
                getInstagramFeed(
                    $e,
                    settings,
                    'https://api.instagram.com/v1/tags/' + settings.tag + '/media/recent?count=' + settings.count + '&access_token=' + settings.authToken
                );
            });
        },
    };

    function initLoad(e, callback) {
        e.html("<div id='instagramLoadingMessage'>" + settings.loadingMessage + "</div>");
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
                    e.append("<img style='display: none;' id='" + id + '_'  + i + "' class='instagramPhoto' src='" + settings.defaultImage + "' />");
                    
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
            $.error('Method ' + method + ' does not exist on jquery.instagram');
        }

    };

})(jQuery);
