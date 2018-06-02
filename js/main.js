//declare variables and select elements
var ROOT_URL = 'http://api.openweathermap.org/data/2.5/weather?zip='
var API_KEY = 'c3fa490bd922e3631c0d517cc4ee34c8'
//GRAB THE CITYTITLE, ZIP INPUT BAR, WEATHER DIV, IMG WITH CLASS ICON, SPAN WITH CLASS TEMP, SPAN WITH THE CLASS HUMID, SELECT THE SPAn WITH THE CLASS DEGREE
var cityTitle = document.querySelector(".cityTitle")
var zip = document.querySelector(".zip")
var weather = document.querySelector(".weather")
var icon = document.querySelector(".icon")
var temp = document.querySelector(".temp")
var humid = document.querySelector(".humid")
var deg = document.querySelector(".deg")
var convert = document.querySelector(".convert")
var fc

var icons = {
    "Clouds": "img/cloudy.png",
    "Clear": "img/sun.png",
    "Thunderstorm": "img/thunderstorm.png",
    "Rain": "img/rain.png",
    "Snow": "img/snow.png",
    "Partly cloudy": "img/partly-cloudy.png"
}


//define functions
function iconSelector(weather){
    return icons[weather]
}
function celsToFaren(cels){
    return Math.round((cels * (9/5)) + 32)
}
function farenToCelsius(far){
    return  Math.round((far - 32) * (5/9))
}
function kelvinToFaren(kelvin){
    return Math.round(kelvin * 9/5 - 459.67)
}
function getWeather(zipCode){
console.log(zipCode)
$.ajax({
    type: 'GET',
    url: `${ROOT_URL}${zipCode},us&appid=${API_KEY}`,
    dataType: 'json',
    success: function(data){
        console.log(data)
        cityTitle.textContent = data.name
        weather.textContent = data.weather[0].main
        icon.src = iconSelector(data.weather[0].main)
        temp.textContent = kelvinToFaren(data.main.temp)
        humid.textContent = data.main.humidity
        fc= "f"
    },
    error: function(data){
        console.log(data)
    }
})
}

getWeather('33166')




//call functions and/or add Event Listeners
zip.addEventListener('keypress', function(event){
    if (event.key === 'Enter'){
        getWeather(zip.value)
    }
})

convert.addEventListener('click', function (e){
    if (fc === "f"){
        temp.textContent = farenToCelsius(temp.textContent)
        deg.innerHTML = "&deg; C"
        convert.textContent = "Convert to F"
        fc = "c"
    } else {
        temp.textContent = celsToFaren(temp.textContent)
        deg.innerHTML = "&deg; F"
        convert.textContent = "Convert to C"
        fc = "f"
        
    }

})
