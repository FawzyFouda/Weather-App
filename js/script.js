let myLocation = document.getElementById('search'),
    locationBtn = document.getElementById('submit'),
    forecast = document.querySelectorAll('.forecast');

if(myLocation.value === ''){
    getDefultCurrentLoction()
}
// ----------------------------Get current location automatic default-------------- 
function getDefultCurrentLoction(){
    function navigate(){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    function showPosition(position) {
        let lat = position.coords.latitude ,
            long = position.coords.longitude;
            async function currentLocation(){
                try{
                    let result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d99f6b524928406ebb3183909241301&q=${lat},${long}&days=3`)
                    let data =await result.json()
                    displayData(data)
                }catch (error){
                    console.log('Error fetching data:', error );
                    
                }
        }
        currentLocation()
    }
    navigate()
}
// ----------------------------Get current location-------------- 
    async function getApi(searchedCountry){
        try{
            if(myLocation.value !==''){
                let result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d99f6b524928406ebb3183909241301&q=${myLocation.value || searchedCountry}&days=3`)
                let data =await result.json()
                // getDays(data)
                displayData(data)
            }
        }catch (error){
            console.log('Error fetching data:', error );
            
        }
}
// ----------------------------Display Data-------------- 
function displayData(data){
        const allDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const allMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let day1 = new Date(`${data.forecast.forecastday[0].date}`),
        day2 = new Date(`${data.forecast.forecastday[1].date}`),
        day3 = new Date(`${data.forecast.forecastday[2].date}`); 
            let today = allDays[day1.getDay()],
                tomorrow = allDays[day2.getDay()],
                afterTomorrow = allDays[day3.getDay()],
                currentMonth =  allMonths[day1.getMonth()]
            forecast[0].innerHTML = `
                        <div class="forecast-header" id="today">
                            <div class="day">${today}</div>
                            <div class="date">${new Date().getDate()} ${currentMonth}</div>
                        </div>
                        <div class="forecast-content" id="current">
                            <div class="location" id="country">${data.location.name }</div>
                            <div class="degree d-flex justify-content-between">
                            <div class="temp">${data.current.temp_c}<sup>o</sup>C</div>
                            <div class="forecast-icon">
                            <img src="${data.current.condition.icon }" alt="" width="90"/>
                        </div>
                        </div>
                            <div class="custom">${data.current.condition.text}</div>
                            <span><img src="images/icon-umberella.png" alt="" />${data.current.humidity}%</span>
                            <span><img src="images/icon-wind.png" alt="" />${data.current.wind_mph} m/h</span>
                            <span><img src="images/icon-compass.png" alt="" />East</span>
                        </div>
        `
        forecast[1].innerHTML = `
        <div class="forecast-header">
            <div class="day">${tomorrow}</div>
        </div>
            <div class="forecast-content">
            <div class="forecast-icon">
                <img src="${data.forecast.forecastday[1].day.condition.icon}" alt="" width="48"/>
            </div>
            <div class="degree">${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</div>
            <small>${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C</small>
            <div class="custom">${data.forecast.forecastday[1].day.condition.text}</div>
        `
        forecast[2].innerHTML = `
        <div class="forecast-header">
                <div class="day">${afterTomorrow}</div>
            </div>
            <div class="forecast-content">
            <div class="forecast-icon">
                <img src="${data.forecast.forecastday[2].day.condition.icon}" alt="" width="48"/>
            </div>
            <div class="degree">${data.forecast.forecastday[2].day.maxtemp_c }<sup>o</sup>C</div>
            <small>${data.forecast.forecastday[2].day.mintemp_c }<sup>o</sup>C</small>
            <div class="custom">${data.forecast.forecastday[2].day.condition.text}</div>
        `
}
// ----------------------------Get location when submit------------------
locationBtn.addEventListener('click',function(){
    getApi()
})
// ----------------------------Get location autocomplete input when keyup-------------- 
myLocation.addEventListener('keyup',async function(e){
    try{
        if(e.target.value !==''){
            let result = await fetch(`https://api.weatherapi.com/v1/search.json?key=d99f6b524928406ebb3183909241301&q=${e.target.value}`),
                data = await result.json(),
                allSearchArray = [...data];
            if(allSearchArray[0] !== undefined){
                searchedCountry = allSearchArray[0].name
                console.log(searchedCountry)
                getApi(searchedCountry)
            }
        }else if(e.target.value ===''){
            getDefultCurrentLoction()
        }
    }catch (error){
    console.log('Error fetching data:', error );
    }
})


