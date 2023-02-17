// // var place = document.getElementById("location");
// function getWeather(){
//     var place = document.getElementById("location").value;
//     fetch(`https://api.weatherapi.com/v1/current.json?key=55abcd02053e4c45804112932231402&q=${place}`).then(ans => ans.json().then(output =>{
//         document.getElementById("name").innerHTML=output.location.name.toUpperCase();
//         document.getElementById("region").innerHTML=output.location.region+ ",";
//         document.getElementById("country").innerHTML=output.location.country;
//         document.getElementById("temp-in-c").innerHTML=output.current.temp_c + "\u00B0"+"C"+"  /";
//         document.getElementById("temp-in-f").innerHTML=output.current.temp_f + "\u00B0"+"F";
//         document.getElementById("local-time").innerHTML=output.location.localtime;
//         document.getElementById("humidity").innerHTML=output.current.humidity;
//         document.getElementById("wind-dir").innerHTML=output.current.wind_dir;
//         document.getElementById("wind-speed").innerHTML=output.current.wind_kph;
//         document.getElementById("lat-lon").innerHTML=output.location.lat,output.location.lon;
//     }))
    
// }
// navigator.geolocation.getCurrentPosition(location => {
//     fetch("https://api.weatherapi.com/v1/forecast.json?key=55abcd02053e4c45804112932231402&q=" + location.coords.latitude + "," + location.coords.longitude + "&aqi=yes&days=7")
//         .then(res => res.json())
//         .then(data => 
//             // Displaycurweather(data)
//             console.log(data)
//         );
// })
// document.querySelector("#location")
//   .addEventListener("keypress", function (event) {
//     if (event.key == "Enter") {
//       fetchWeather();
//     }
// });

const fetchWeather = () => {
    var city = document.getElementById("loc").value;

    console.log("city", city);
    navigator.geolocation.getCurrentPosition(async (location) => {
      var response;
      try {
        if (city === "") {
          response = await fetch(
            "https://api.weatherapi.com/v1/forecast.json?key=55abcd02053e4c45804112932231402&q=" +
              location.coords.latitude +
              "," +
              location.coords.longitude +
              "&aqi=no&days=7"
          );
        } else {
          response = await fetch(
            "https://api.weatherapi.com/v1/forecast.json?key=55abcd02053e4c45804112932231402&q=" +
              city +
              "&aqi=no&days=7"
          );
        }
        let data = await response.json();
        console.log(data,"data")
        document.getElementById("temp").innerHTML = data?.current?.temp_c +"°C";
        // document.getElementById("temp").innerHTML = data?.current?.temp_c +"°C / " + data?.current?.temp_f +"°F";
        // document.getElementById("country").innerHTML = data?.location?.country;
        console.log(data?.location.localtime,"local-time")
        document.getElementById("text").innerHTML=data.current.condition.text;
        document.getElementById("name").innerHTML=data.location.name.toUpperCase();
        document.getElementById("country").innerHTML = data?.location?.region.toUpperCase()+" , "+data.location.country.toUpperCase();
        document.getElementById("humidity").innerHTML=data.current.humidity;
        document.getElementById("chance-rain").innerHTML=data.forecast.forecastday[0].day.daily_chance_of_rain;
        document.getElementById("uv").innerHTML=data.forecast.forecastday[0].day.uv;
        console.log(data.forecast.forecastday[0].day.uv,"uv")
        document.getElementById("pressure").innerHTML=data.current.pressure_in;
        document.getElementById("wind-dir").innerHTML=data.current.wind_dir;
        document.getElementById("wind-speed").innerHTML=data.current.wind_kph;
        // console.log(data.location.name.toUpperCase());
        // document.getElementById("temp").innerHTML = data?.current?.temp_c +"°C / " + data?.current?.temp_f +"°F";
        
        // console.log(data.current.cloud);
        // console.log(data?.current?.temp_c +"°C / " + data?.current?.temp_f +"°F")
        // document.getElementById("humidity").innerHTML=data.current.humidity;
        // document.getElementById("wind-dir").innerHTML=data.current.wind_dir;
        // document.getElementById("wind-speed").innerHTML=data.current.wind_kph;
        // document.getElementById("lat-lon").innerHTML=data.location.lat+"°" +" / "+  data.location.lon+"°";
        // document.getElementById("pressure").innerHTML=data.current.pressure_in;
        
        document.getElementById("icon").src=(data.current.condition.icon)
        document.getElementById("sunrise").innerHTML=data.forecast.forecastday[0].astro.sunrise;
        document.getElementById("sunset").innerHTML=data.forecast.forecastday[0].astro.sunset;
        console.log(data.forecast.forecastday);
        const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let daily_weather = "";
        data.forecast.forecastday.map(weather => {
          const d = weather.date;
          let date = new Date(d);
          let day = weekday[date.getDay()];
          console.log(day);
          daily_weather = daily_weather + `
          <div class="card" >
            <p id="date1">${date.toString().slice(0,10)}</p>
            <img class="icon2" src="https://${weather.day.condition.icon}" />
            <span id="day1tempc">${weather.day.avgtemp_c}°C</span>
          </div>`
        })
        console.log(daily_weather);
        document.getElementById("daily-weather").innerHTML = daily_weather;
      } catch (error) {
        // console.log(error)
      }
    });
  };

  fetchWeather()

const kp = (event) => {
    console.log(event)
    if (event.key === "Enter") {
        fetchWeather();        
      }
}

// function getWeather(){
//     var place = document.getElementById("loc").value
//     console.log("fetch",place);
//     fetch(`https://api.weatherapi.com/v1/forecast.json ?key=55abcd02053e4c45804112932231402&q=${place}`).then(ans => ans.json().then(output => console.log(output)))
    
// }     
// getWeather();