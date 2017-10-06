$(function(){
	console.log("here 1");
	if (navigator.geolocation){
	
		navigator.geolocation.getCurrentPosition(function(position){
			console.log(position)
			console.log(position.coords.latitude)
			console.log(position.coords.longitude)

			var url = "http://api.openweathermap.org/data/2.5/forecast/daily?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&cnt=10&appid=8131be7e3e6b2014b3af931e011bd730"

			$.get(url, 
				function(data, status){
					console.log(data);
					$.each(data.list, function(index, value){
						console.log(new Date(value.dt*1000))
						$("#weathertablebody").append("<tr><td>"+new Date(value.dt*1000)+'</td><td><img src="https://openweathermap.org/img/w/'+value.weather[0].icon+'.png"></td><td>'+(value.temp.day-273).toFixed(2)+" &deg; C</td><td>"+value.pressure+"</td><td>"+value.humidity+'</td><td><button onclick="saveItem('+index+')">Save</button></td></tr>');

		})
				});

		})

	}
});
function saveItem(item){
	console.log(item);

}

