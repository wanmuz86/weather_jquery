
var weatherArray = [];
var savedWeathers = [];

$(function(){
	retrieveWeathers();
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			console.log(position)
			console.log(position.coords.latitude)
			console.log(position.coords.longitude)

			var url = "http://api.openweathermap.org/data/2.5/forecast/daily?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&cnt=10&appid=8131be7e3e6b2014b3af931e011bd730"

			$.get(url, 
				function(data, status){
					console.log(data);
					weatherArray = data.list
					$.each(data.list, function(index, value){
						console.log(new Date(value.dt*1000))
						$("#weathertablebody").append("<tr><td>"+new Date(value.dt*1000)+'</td><td><img src="https://openweathermap.org/img/w/'+value.weather[0].icon+'.png"></td><td>'+(value.temp.day-273).toFixed(2)+" &deg; C</td><td>"+value.pressure+"</td><td>"+value.humidity+'</td><td><button onclick="saveItem('+index+')">Save</button></td></tr>');

		})
				});

		})

	}
});

function retrieveWeathers(){

	savedWeathers = JSON.parse(localStorage.getItem("weathers"));
	if (!savedWeathers){
		savedWeathers = [];
	}

	console.log(savedWeathers);
	$.each(savedWeathers, function(index, value){
						console.log(new Date(value.dt*1000))
						$("#savedtablebody").append("<tr><td>"
							+new Date(value.dt*1000)+'</td><td><img src="https://openweathermap.org/img/w/'+value.weather[0].icon+'.png"></td><td>'+(value.temp.day-273).toFixed(2)+" &deg; C</td><td>"+value.pressure+"</td><td>"+value.humidity+'</td></tr>');
		})
}
function saveItem(item){
	var savedItem =  weatherArray[item]

	savedWeathers.push(savedItem);
	if (typeof(Storage) !== "undefined") {
    localStorage.setItem("weathers", 
    	JSON.stringify(savedWeathers));

    $("#savedtablebody").
    append("<tr><td>"+new Date(savedItem.dt*1000)+
	'</td><td><img src="https://openweathermap.org/img/w/'
	+savedItem.weather[0].icon+'.png"></td><td>'
	+(savedItem.temp.day-273).toFixed(2)+" &deg; C</td><td>"
	+savedItem.pressure+"</td><td>"+savedItem.humidity
	+'</td></tr>');
		

} else {
    alert("Sorry your browser does not support local storage.")
}


}

