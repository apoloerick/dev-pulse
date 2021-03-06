    var x = document.getElementById("demo");
//Get curent locaiton of user==================================
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
            navigator.geolocation.getCurrentPosition(getJobs);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function getJobsLength(latitude, longitude, software) {

        var toReturn = '';

        var queryURL = "https://jobs.github.com/positions.json?lat=" + latitude + "&long=" + longitude + "&search=" + software;
        $.ajax({url: queryURL, method: 'GET', dataType: 'jsonp'}).done(function(data) {
//        console.log(data);
//        console.log(data.length);
            toReturn = data.length;
        });

        return toReturn;
    }

    function getJobs(latitude, longitude, software) {
//        https://jobs.github.com/positions.json?lat=37.3229978&long=-122.0321823&description=react

        var queryURL = "https://jobs.github.com/positions.json?lat=" + latitude + "&long=" + longitude + "&search=" + software;
        $.ajax({url: queryURL, method: 'GET', dataType: 'jsonp'}).done(function(data) {

            console.log(data.length);

            console.log(data);

//
            $.each( data, function( key, value ) {
                console.log( key + ": " + value );
                var gig = '<li class="collection-item"><a href="' + value.url + '">' + value.company + ': ' + value.title + '<i class="material-icons">send</i></a></li>';
                $('#joblist').append(gig);
            });



        });

    }
    function showPosition(position) {
        x.innerHTML = "Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude;

        var javaJobs = getJobsLength(position.coords.latitude, position.coords.longitude, 'java');
        console.log(javaJobs);

        var phpJobs = getJobsLength(position.coords.latitude, position.coords.longitude, 'php');
        console.log(phpJobs);

        var rubyJobs = getJobsLength(position.coords.latitude, position.coords.longitude, 'ruby');
        console.log(rubyJobs);

        var pythonJobs = getJobsLength(position.coords.latitude, position.coords.longitude, 'python');
        console.log(pythonJobs);

        var javascriptJobs = getJobsLength(position.coords.latitude, position.coords.longitude, 'javascript');
        console.log(javascriptJobs);



        var directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer();
        var city = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var mapOptions = { zoom:7, mapTypeId: google.maps.MapTypeId.ROADMAP, center: city }
        map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        directionsDisplay.setMap(map);


        var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&sensor=true";
        $.ajax({url: queryURL, method: 'GET'}).done(function(data) {
            console.log(data);
            console.log(data.results[0].formatted_address);

            $("#address").text(data.results[0].formatted_address);


            var myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: 'Hello World!'
            });


        });



    }

$(document).ready(function(){

$('#getlocation').on('click', function () {

//
//    $("#address").html('<div class="preloader-wrapper big active"> <div class="spinner-layer spinner-blue-only">  <div class="circle-clipper left">  <div class="circle"></div> </div><div class="gap-patch">  <div class="circle"></div>  </div><div class="circle-clipper right"> <div class="circle"></div> </div> </div> </div>');

    $("#address").html('<div class="progress"><div class="indeterminate"></div></div>');


            getLocation();
})

});