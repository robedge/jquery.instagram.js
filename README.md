jquery.instagram.js
===================

This is a basic jquery plugin that will allow you to pull in an instagram feed.



Alternate image sizes are available as well as caption data.  They are attached
to the image element that is created.



**Alternate image sizes: **

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var altImages = $('#image').data('altImageSizes');
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Caption:**

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var caption = $('#image').data('caption');
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Link to Instagram page:**

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var link = $('#image').data('instagramLink');
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 
-

Methods:
--------

### getMyStream**:**

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<div id="feed" />

<script type="text/javascript">
    $('#feed').instagram('getStream', {
        count: 4
        , getUser: true
        , callback: function() {
            // access pages count
            $page_count = $('#image').data('pages');
            
            // loop through images and link to instagram
            $.each($('#feed img'), function() {
                var $this= $(this);
                var url = $this.data('instagramLink');
                $this.click(function() {
                    window.open(url);
                });
            }
        }
    });
</script>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



### getUserStream**:**

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<div id="user" />

<script type="text/javascript">
    $(document).ready(function() {
        $('#user').instagram('getStream', {
            count: 5
            , user: 1574083
        }
    });
</script>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



### getMyLikes**:**

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<div id="myLikes" />

<script type="text/javascript">
    $(document).ready(function() {
        $('#myLikes').instagram('getMyLikes', {
            count: 5
        });
    });
</script>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



### getPopularStream**:**

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<div id="popular" />

<script type="text/javascript">
    $(document).ready(function() {
        $('#popular').instagram('getPopularStream', {
            count: 5
        });
    });
</script>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



### getStreamByTag**:**

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<div id="search" />

<script type="text/javascript">
    $(document).ready(function() {
        $('#search').instagram('getStreamByTag', {
            count: 5
            , tag: 'transformers'
        });
    });
</script>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



### searchForUserByName**:**

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<form id="search">
    <label for="username">Username:</label>
    <input type="text" name="username" id="username" />
    <input type="submit" value="Search" />
</form>
<div id="search_results"></div>

<script type="text/javascript">
    $('#search').submit(function() {
        e.preventDefault();
        var $search_results = $('#search_results');
        $search_results.instagram('searchForUserByName', {
            name: $('input[name=username]').val(),
            callback: function(result) {
                // callback with user search data
                // http://instagram.com/developer/endpoints/users/#get_users_search
            }
        });                    
    });
</script>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



### getUserData**:**

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<script type="text/javascript">
    $(document.createElement('div')).instagram('getUserData', {
        user: 12345, // user id
        callback: function(result) {
            // callback to run with user response data
            // http://instagram.com/developer/endpoints/users/#get_users
        }
</script>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


