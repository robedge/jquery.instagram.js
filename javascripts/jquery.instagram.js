/*
    Copyright Rob Edgell <redgell [at] gmail [dot] com>
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
(function ($) {
    var settings = {
        authToken: "332178.5532830.304dcae9620749e086bac69712af2051", // replace with your token or pass a new value in the settings
        loadingMessage: "Finding and loading instagram stream...", // This can be any html you want to show for loading
        count: 10,
        moreText: 'More',
        resetText: 'Reset',
        callback: ''
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
                    url,
                    settings.callback
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
                    'https://api.instagram.com/v1/users/self/media/liked?count=' + settings.count + '&access_token=' + settings.authToken,
                    settings.callback
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
                    'https://api.instagram.com/v1/media/popular?count=' + settings.count + '&access_token=' + settings.authToken,
                    settings.callback
                );
            });
        },
        /**
          * Get the stream by a tag search
          */
        getStreamByTag: function(options) {
            if (options) {
                $.extend(settings, options);
            }
            
            var $e = this;
            initLoad($e, function() {
                getInstagramFeed(
                    $e,
                    settings,
                    'https://api.instagram.com/v1/tags/' + settings.tag + '/media/recent?count=' + settings.count + '&access_token=' + settings.authToken,
                    settings.callback
                );
            });
        }
    };

    function initLoad(e, callback) {
        e.html("<div id='instagramLoadingMessage'>" + settings.loadingMessage + "</div>");
        if (typeof(callback) == 'function') {
            callback();
        }
    }
    
    function getInstagramFeed(e, settings, url, callback) {
        var id = e.attr('id');
        if (typeof(e.data('baseUrl')) == 'undefined') {
            e.data('baseUrl', url);
        }
        
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function (result) {
                e.empty();
				if ( (result.meta && result.meta.code) != 200 ) {
					e.html("<span class='instagramError'>" + result.meta.error_message + "</span>");
					return;
				}
                $.each(result.data, function (i) {
                    e.append("<img style='display: none;' id='" + id + '_'  + i + "' class='instagramPhoto' />");
                    
                    var $item = $('#' + id + '_' + i);
                    $item.data('user', this.user);
                    $item.data('altImageSizes', this.images);
                    $item.data('caption', this.caption);
                    $item.data('instagramLink', this.link);
                    
                    $item.load(function () {
                        $(this).fadeIn('fast');
                    }).attr('src', this.images.thumbnail.url);
                });
                
                if (!$.isEmptyObject(result.pagination)) {
                    var next = $('<a class="more" href="#">' + settings.moreText + '</a>').click(function() {
                        initLoad(e, function() {
                            getInstagramFeed(
                                e,
                                settings,
                                result.pagination.next_url,
                                settings.callback
                            );
                        });
                        
                        return false;
                    });
                    e.append(next);
                } else {
                    var reset = $('<a class="reset" href="#">' + settings.resetText + '</a>').click(function() {
                        initLoad(e, function() {
                            getInstagramFeed(
                                e,
                                settings,
                                e.data('baseUrl'),
                                settings.callback
                            );
                        });
                        
                        return false;
                    });
                    e.append(reset);
                }
                
                if (typeof(callback) == 'function') {
                    callback();
                }
                
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
