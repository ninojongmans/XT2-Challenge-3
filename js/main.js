// init map
var myMap, preview;
var clicks = 0; 

function getClicks() {
    clicks += 1;
    console.log(clicks);
    return clicks;
}


function getLat() {
    var latitude = 0;
    
    if (clicks == 0) {
        latitude = 52.067514882683064;
        document.getElementById('plaatsnaam').innerHTML = 'test 0';
    }
    else if (clicks == 1) {
        latitude = 52.077165;
        document.getElementById('plaatsnaam').innerHTML = 'test 1';
    }
    else if (clicks == 2) {
        latitude = 64.422531;
        document.getElementById('plaatsnaam').innerHTML = 'test 2';
    }
    else if (clicks == 3) {
        latitude = 64.422531;
        document.getElementById('plaatsnaam').innerHTML = 'test 2';
    }
    else if (clicks == 4) {
        latitude = 64.422531;
        document.getElementById('plaatsnaam').innerHTML = 'test 2';
    }
    else if (clicks == 5) {
        latitude = 0;
        document.getElementById('plaatsnaam').innerHTML = 'test 2';
    }
    
    return latitude;
}

function getLng() {
    var longitude = 0;
//    var clicks = 0;
//    
//    if (document.getElementById('btn-zoek').onclick) {
//        clicks += 1;
//    }
    
    if (clicks == 0){
        longitude = 4.3238686164587;
    }
    else if (clicks == 1) {
        longitude = 5.956826;
    }
    else if (clicks == 2) {
        longitude = -50.218348;
    }
    else if (clicks == 3) {
        
    }
    else if (clicks == 4) {
        
    }
    else if (clicks == 5) {
        
    }
    
    
    return longitude;
}


function initMap() {
	// set style for the map
	var myStyles =[
		 {
		 	featureType: "poi",
		 	elementType: "labels",
		 	stylers: [{ visibility: "off" }]
		 },
		 {
		 	featureType: 'transit',
		 	elementType: 'labels',
		 	stylers: [{visibility: 'off'}]
		 }
	];

	// set options for map 
	var mapOptions = {
		center: {
			lat: getLat(), 
			lng: getLng()
		},
		zoom: 17,
		clickableIcons: false,
		styles: myStyles,
        zoomControl: true,
		mapTypeControl: false,
		streetViewControl: false,
		scaleControl: false,
	};
    var mapOptions2 = {
		center: {
			lat: getLat(), 
			lng: getLng()
		},
		zoom: 17,
		clickableIcons: false,
		styles: myStyles,
        draggable: false,
        scrollwheel: false,
        disableDefaultUI: true,
        mapTypeId: 'satellite'
	};

	// create map and add to page
	myMap = new google.maps.Map(document.getElementById('maps'), mapOptions);
    
    preview = new google.maps.Map(document.getElementById('preview'), mapOptions2)
	
}




//      ---------------------- Weer ----------------------



function getAPIdata() {
	var url = 'https://api.openweathermap.org/data/2.5/onecall?lat=';
    var lat = getLat();
    var lon = getLng();
	var apiKey ='b1f538a469a6b6f9fd103cda1db6e9ef';

	// construct request
	var request = url + lat + '&lon=' + lon + '&appid=' + apiKey;
	
	// get weather forecast
	fetch(request)

	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		console.log(response);
		// render weatherCondition
		onAPISucces(response);
	})
	
	// catch error
	.catch(function (error) {
		// onAPIError();
		console.error('Request failed', error);
	});
}


function onAPISucces(response) {

	var weatherList = response.daily;
	var weatherBox = document.getElementById('weerbericht');

	for(var i=0; i< weatherList.length; i++){
        
        
		var dateTime = new Date(weatherList[i].dt*1000);
		var date = formDate(dateTime);
        
		var temp = Math.floor(weatherList[i].temp.day - 273.15);
		var iconUrl = 'http://openweathermap.org/img/w/'+weatherList[i].weather[0].icon+'.png';

//        if (document.getElementById('btn-zoek').onclick) {
//            continue;
//        }
		forecastMessage =  '<div class="forecastMoment">';
		forecastMessage +=   '<div class="date"> '+date+' </div>';
		forecastMessage +=	 '<div class="temp"> '+temp+'&#176;C </div>';
		forecastMessage +=	 '<div class="icon"> <img src="'+iconUrl+'"> </div>';
		forecastMessage += '</div>';

		weatherBox.innerHTML += forecastMessage;
	}
}

/**
 * Error
 */
function updateUIError() {
	var weatherBox = document.getElementById('weerbericht');
	weatherBox.className = 'hidden'; 
}

/**
 * Format date
 */
function formDate(date) {
	var day = date.getDate();
	var month = date.getMonth() + 1;
	return day +'/'+ month;
}

// init data stream














































