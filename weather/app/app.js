import cities from '../data/data.json' assert { type: "json" };
const pageContainer = document.querySelector("#page-container")
const urlWeather = "https://api.openweathermap.org/data/2.5/"
const urlGeo = "http://api.openweathermap.org/geo/1.0/"
const urlKey = "7ca5c4d68df903807d8ef0cb752f0257"
let container = document.createElement("div")
let latitude
let longitude 
let htmlPage
let temperatures = [] , feltTemps = [] , humidityPercentage = [] , windSpeeds = [], tomorrowTemperatures = [],tomorrowFeltTemps = [], tomorrowHumudity = [], tomorrowWindSpeed = []
setTheMainPage()
const citiesContainer = document.querySelector("#cities-part")
const textInput = document.querySelector("#seacher")
const alertBox = document.querySelector("#alertBox")
const resetBtn = document.querySelector("#alert-reset-button")
let citiesInput
let clickedCity
let listedItems
let cityCounter = 0
citiesTableCreatorStart()
addClicker()
textInput.addEventListener(("input"),()=>{
    cityCounter = 0
    citiesTableDeleter()
    citiesTableCreator()
    alertChecker()
    addClicker()
})
resetBtn.addEventListener(("click"),()=>{
    textInput.value = ""
    alertBox.style.opacity = "0"
    alertBox.style.visibility = "hidden"
    alertBox.style.zIndex = "-99"
    citiesTableCreatorStart()
    addClicker()
})
function alertChecker(){
    if(cityCounter == 0 ){
        alertBox.style.opacity = "1"
        alertBox.style.visibility = "visible"
        alertBox.style.zIndex = "10"
    }
    else{
        alertBox.style.opacity = "0"
        alertBox.style.visibility = "hidden"
        alertBox.style.zIndex = "-99"
    }
}
function citiesTableDeleter(){
    const citiesBox = document.querySelectorAll("#cities-part a")
    citiesBox.forEach((cityBox)=>{
        cityBox.remove()
    })
}
function citiesTableCreator(){
    const inputVal = textInput.value.toLowerCase()
    cities.forEach((cityInfos)=>{
        if(cityInfos["name"].startsWith(inputVal)){
            let html = ""
            html = 
            `
            <a>
                <div class="city-container">
                    <div class="cities-plate">${cityInfos["plate"]}</div>
                    <div class="cities-name">${cityInfos["name"]}</div>
                </div>
            </a>
            `
            citiesContainer.innerHTML += html
            cityCounter++
        }
    })



}
function citiesTableCreatorStart(){
    for(let i = 0 ; i < cities.length ; i++){
        let html = ""
        html = 
        `
        <a>
            <div class="city-container">
                <div class="cities-plate">${cities[i]["plate"]}</div>
                <div class="cities-name">${cities[i]["name"]}</div>
            </div>
        </a>
        `
        citiesContainer.innerHTML += html
    }
}
function setTheMainPage(){
    container = document.createElement("div")
    container.setAttribute("id","container")
    pageContainer.append(container)
    htmlPage =
    `
        <div id="title-container">
            <div style="--delay:2200ms" class="title-letter">W</div>
            <div style="--delay:2400ms" class="title-letter">E</div>
            <div style="--delay:2600ms" class="title-letter">A</div>
            <div style="--delay:2800ms" class="title-letter">T</div>
            <div style="--delay:3000ms" class="title-letter">H</div>
            <div style="--delay:3200ms" class="title-letter">E</div>
            <div style="--delay:3400ms" class="title-letter">R</div>
            <div style="--delay:3600ms" class="title-letter">&nbsp;</div>
            <div style="--delay:3800ms" class="title-letter">A</div>
            <div style="--delay:4000ms" class="title-letter">P</div>
            <div style="--delay:4200ms" class="title-letter">P</div>
        </div>
        <div id="input-box">
            <label for="seacher">Seacher</label>
            <input type="text" name="seacher" placeholder="Enter the city" id="seacher">
        </div>
        <div id="cities-part"></div>
        <div id="alertBox">
            <div id="alertTitle">Nothing matched with your criterias</div>
            <div id="alert-reset-button">Reset Criterias</div>
        </div>
    `
    container.innerHTML = htmlPage
}
function addClicker(){
    const citiesBox = document.querySelectorAll("#cities-part a div")
    citiesBox.forEach((cityBox)=>{
        cityBox.addEventListener(("click"),()=>{
            clickedCity = cityBox.children[1].textContent
            container.remove()
            setWeatherPage()
            inputChangedMainToWeather()
        })
    })
}
function setWeatherPage(){
    container = document.createElement("div")
    container.setAttribute("id","container")
    pageContainer.append(container)
    htmlPage =
    `
    <div id="navbar-container">
        <a href="">
            <div id="index-button-container">
                <p>Go Back</p>
                <div id="navbar-arrow"></div>
            </div>
        </a>
        <div id="scroll-container">
            <label for="weatheredCity"></label>
            <input id="weatheredCity" value="" list="cities">
            <datalist id="cities"></datalist>
        </div>
    </div>
    <div id="mainInfos-container">
        <div id="celciusPart">
            <div id="weatherLogo"></div>
            <div id="celcius"></div>
        </div>
        <div id="cityInfoPart">
            <div id="cityName"></div>
            <div id="date-Infos">
                <div id="dayName"></div>
                <div id="hourInfo"></div>
            </div>
            <div id="weatherName"></div>
        </div>
    </div>
    <div id="tableChanger">
        <ul>
            <li class="clicked">Temperature</li>
            <li>Felt</li>
            <li>Humidity</li>
            <li>Wind</li>
        </ul>
    </div>
    <div id="table-container">
        <div id="table">
            <canvas id="weatherTable" style="width:100%;max-width:900px"></canvas>
        </div>
    </div>
    <div id="daysCart-container">
        <div class="dayCart">
            <div class="dayName">SUNDAY</div>
            <div class="weatherIcon">
                <i class="fa-solid fa-cloud"></i>
            </div>
            <div class="tempsPart">
                <div class="maxTemp">25<sup>o</sup></div>
                <div class="minTemp">15<sup>o</sup></div>
            </div>
        </div>
        <div class="dayCart">
            <div class="dayName">MONDAY</div>
            <div class="weatherIcon">
                <i class="fa-solid fa-cloud"></i>
            </div>
            <div class="tempsPart">
                <div class="maxTemp">25<sup>o</sup></div>
                <div class="minTemp">15<sup>o</sup></div>
            </div>
        </div>
        <div class="dayCart">
            <div class="dayName">TUESDAY</div>
            <div class="weatherIcon">
                <i class="fa-solid fa-cloud"></i>
            </div>
            <div class="tempsPart">
                <div class="maxTemp">25<sup>o</sup></div>
                <div class="minTemp">15<sup>o</sup></div>
            </div>
        </div>
        <div class="dayCart">
            <div class="dayName">WEDNESDAY</div>
            <div class="weatherIcon">
                <i class="fa-solid fa-cloud"></i>
            </div>
            <div class="tempsPart">
                <div class="maxTemp">25<sup>o</sup></div>
                <div class="minTemp">15<sup>o</sup></div>
            </div>
        </div>
        <div class="dayCart">
            <div class="dayName">THURSDAY</div>
            <div class="weatherIcon">
                <i class="fa-solid fa-cloud"></i>
            </div>
            <div class="tempsPart">
                <div class="maxTemp">25<sup>o</sup></div>
                <div class="minTemp">15<sup>o</sup></div>
            </div>
        </div>
        <div class="dayCart">
            <div class="dayName">FRIDAY</div>
            <div class="weatherIcon">
                <i class="fa-solid fa-cloud"></i>
            </div>
            <div class="tempsPart">
                <div class="maxTemp">25<sup>o</sup></div>
                <div class="minTemp">15<sup>o</sup></div>
            </div>
        </div>
        <div class="dayCart">
            <div class="dayName">SATURDAY</div>
            <div class="weatherIcon">
                <i class="fa-solid fa-cloud"></i>
            </div>
            <div class="tempsPart">
                <div class="maxTemp">25<sup>o</sup></div>
                <div class="minTemp">15<sup>o</sup></div>
            </div>
        </div>
    </div>
    `
    container.innerHTML = htmlPage
    citiesInput = document.querySelector("#cities")
    fetchAPI()
    inputCreator()
    tableDecider()
    weatherPageCityDisplayer()
    date()
    inputController()
}
function weatherPageCityDisplayer(){
    let weatherPageCityDisplay = document.querySelector("#cityName")     
    weatherPageCityDisplay.textContent = clickedCity.toUpperCase()
}
function inputCreator(){
    for(let i = 0 ; i < cities.length ; i++){
        let html = ""
        html = 
        `
        <option value"${cities[i]["name"]}">${cities[i]["name"].toUpperCase()}</option>
        `
        citiesInput.innerHTML += html
    }
}
function inputChangedMainToWeather(){
    citiesInput = document.querySelector("#weatheredCity")
    citiesInput.value = clickedCity.toUpperCase()
}
function tableDecider(){
    listedItems = document.querySelectorAll("#tableChanger ul li")
    listedItems.forEach((graficInfo)=>{
        graficInfo.addEventListener(("click"),()=>{
            listedItems.forEach((deleted)=>{
                deleted.classList.remove("clicked")
            })
            graficInfo.classList.add("clicked")
            createTable()
        })
    })
}
function fetchAPI(){
    let queryCordination = `${urlGeo}direct?q=${clickedCity}&limit=1&appid=${urlKey}`
    fetch(queryCordination)
    .then(cordination =>{
        return cordination.json()
    })
    .then(displayCordination)
}
function displayWeather(result){
    let weatherIconName = result.current.weather[0].main
    let tempature = Math.round(parseInt(result.current.temp))
    tomorrowHumudity = [],tomorrowTemperatures = [],tomorrowWindSpeed = [],tomorrowFeltTemps = [],temperatures = [] , feltTemps = [] , humidityPercentage = [] , windSpeeds = []
    tempatureDisplayer(tempature)
    weatherConditionDisplay(weatherIconName)
    weeklyDisplayer(result)
    createTable(weatherIconName)
    for(let i = 0 ; i <= 6 ; i++){
        temperatures.push(Math.round(parseInt(result.hourly[ 4 * i]["temp"])))
        tomorrowTemperatures.push(Math.round(parseInt(result.hourly[ 4 * i + 23]["temp"])))
        feltTemps.push(Math.round(parseInt(result.hourly[ 4 * i]["feels_like"])))
        tomorrowFeltTemps.push(Math.round(parseInt(result.hourly[ 4 * i + 23]["feels_like"])))
        humidityPercentage.push(Math.round(parseInt(result.hourly[ 4 * i]["humidity"])))
        tomorrowHumudity.push(Math.round(parseInt(result.hourly[ 4 * i + 23]["humidity"])))
        windSpeeds.push((parseInt(result.hourly[ 4 * i ]["wind_speed"])))
        tomorrowWindSpeed.push((parseInt(result.hourly[ 4 * i + 23]["wind_speed"])))
    }

}
function displayCordination(cordination){
    latitude = cordination[0].lat
    longitude = cordination[0].lon
    let queryWeather = `${urlWeather}onecall?lat=${latitude}&lon=${longitude}&exclude=weekly&appid=${urlKey}&units=metric&lang=tr`
    fetch(queryWeather)
    .then(weather =>{
        return weather.json()
    })
    .then(displayWeather)
    .then(createTable)
}
function tempatureDisplayer(tempature){
    const tempatureBox = document.querySelector("#celcius")
    tempatureBox.innerHTML = `<div id="celcius">${tempature}<sup>o</sup></div>`
}
function weatherConditionDisplay(weatherIconName){
    const weatherConditionBox = document.querySelector("#weatherName")
    weatherConditionBox.innerHTML = `<div id="weatherName">${weatherIconName}</div>`
    weatherIconDisplay(weatherIconName)
}
function weatherIconDisplay(weatherIconName){
    const weatherLogoBox = document.querySelector("#weatherLogo")
    switch (weatherIconName){
        case "Clouds":
            weatherLogoBox.innerHTML = `<i class="fa-solid fa-cloud"></i>`
            weatherLogoBox.style.color = "white"
        break;
        case "Clear":
            weatherLogoBox.innerHTML = `<i class="fa-solid fa-sun"></i>`
            weatherLogoBox.style.color = "yellow"
        break
        case "Rain":
            weatherLogoBox.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`
            weatherLogoBox.style.color = "lightblue"
        break
    }
}
function date(){
    const fullDate = new Date()
    let hour = fullDate.getHours()
    let min = fullDate.getMinutes()
    if(min < 10){
        min = "0" + min
    }
    if(hour < 10){
        hour = "0" + hour
    }
    let day = fullDate.getDay()
    switch (day){
        case 0:
            day = "Sunday"
        break;
        case 1:
            day = "Monday"
        break;
        case 2:
            day = "Tuesday"
        break;
        case 3:
            day = "Wednesday"
        break;
        case 4:
            day = "Thursday"
        break;
        case 5:
            day = "Friday"
        break;
        case 6:
            day = "Saturday"
        break;
    }
    const weatherPageDayName = document.querySelector("#dayName")
    const hourInfo = document.querySelector("#hourInfo")
    weatherPageDayName.innerHTML = `<div id="dayName">${day}</div>`
    hourInfo.innerHTML = `<div id="hourInfo">${hour}:${min}</div>`
}
function weeklyDisplayer(result){
    console.log()
    let weekArr
    let dayCarts = document.querySelectorAll(".dayCart")
    let weeklyIcons = []
    let weeklyTemps = []
    const fullDate = new Date()
    let day = fullDate.getDay()
    switch (day){
        case 0:
            weekArr = "0123456"
        break;
        case 1:
            weekArr = "1234560"
        break;
        case 2:
            weekArr = "2345601"
        break;
        case 3:
            weekArr = "3456012"
        break;
        case 4:
            weekArr = "4560123"
        break;
        case 5:
            weekArr = "5601234"
        break;
        case 6:
            weekArr = "6012345"
        break;
    }
    weekArr = weekArr.split("")
    for(let i = 0 ; i < weekArr.length ; i++){
        weeklyIcons.push(dayCarts[weekArr[i]].children[1])
        weeklyTemps.push(dayCarts[weekArr[i]].children[2])
        switch(result.daily[i]["weather"][0]["main"]){
            case "Clouds":
                weeklyIcons[i].innerHTML = `<i class="fa-solid fa-cloud"></i>`
                weeklyIcons[i].style.color = "black"
            break;
            case "Clear":
                weeklyIcons[i].innerHTML = `<i class="fa-solid fa-sun"></i>`
                weeklyIcons[i].style.color = "yellow"
            break
            case "Rain":
                weeklyIcons[i].innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`
                weeklyIcons[i].style.color = "lightblue"
            break
        }
        weeklyTemps[i].innerHTML =
        `
            <div class="maxTemp">${Math.round(parseInt(result.daily[i]["temp"]["max"]))}<sup>o</sup></div>
            <div class="minTemp">${Math.round(parseInt(result.daily[i]["temp"]["min"]))}<sup>o</sup></div>
        `
    }
}
function inputController(){
    const weatherInput = document.querySelector("#weatheredCity")
    weatherInput.addEventListener(("input"),()=>{
        for(let i = 0 ; i < cities.length ; i++){
            if(cities[i]["name"].toUpperCase() == weatherInput.value.toUpperCase()){
                clickedCity = cities[i]["name"]
                fetchAPI()
                inputCreator()
                tableDecider()
                weatherPageCityDisplayer()
                date()
                createTable()
            }
        }
    })
}
function createTable(){
    const table = document.querySelector("#table")
    const cityName = document.querySelector("#cityName")
    table.innerHTML = `<canvas id="weatherTable" style="width:100%;max-width:900px">`
    var xValues = [];
    var yValues = [];
    var yValuesTomorrow = []
    let min = 0
    let max = 0
    let lineColor
    let tableClicked
    const selector = document.querySelectorAll("#tableChanger ul li")
    const chart = document.getElementById('weatherTable').getContext('2d');
    let gradient = chart.createLinearGradient(0,0,0,400)
    const date = new Date()
    const hour = date.getHours()
    let pushed
    for(let i = 0 ; i < 7 ; i++){
        pushed = (i*4) + hour
        if(pushed < 10 ){
            pushed = "0" + pushed + ":00"
        }
        else if(pushed > 24){
            pushed -= 24
            if(pushed < 10){
                pushed = "0" + pushed + ":00"
            }
            else{
                pushed = pushed + ":00"
            }
        }
        else{
            pushed = pushed + ":00"
        }
        xValues.push(pushed)
    } 
    if(selector[0].classList.contains("clicked")){
        lineColor = "orange"
        for(let i = 0 ; i <= 6 ; i++){
            yValues.push(temperatures[i])
            yValuesTomorrow.push(tomorrowTemperatures[i])
        }
        gradient.addColorStop(0,"rgba(255,255,0,1)")
        gradient.addColorStop(1,"rgba(255,100,0,0.3)")
        min = -20
        max = 60
        tableClicked = "Celcius"
    }
    else if(selector[1].classList.contains("clicked")){
        gradient.addColorStop(0,"rgba(255,50,0,1)")
        gradient.addColorStop(1,"rgba(255,100,0,0.3)")
        lineColor = "rgb(167, 7, 7)"
        for(let i = 0 ; i <= 6 ; i++){
            yValues.push(feltTemps[i])
            yValuesTomorrow.push(tomorrowFeltTemps[i])
        }
        min = -15
        max = 70
        tableClicked = "Celcius"

    }
    else if(selector[2].classList.contains("clicked")){
        gradient.addColorStop(0,"rgba(255,255,255,1)")
        gradient.addColorStop(1,"rgba(255,255,255,0.3)")
        lineColor = "white"
        for(let i = 0 ; i <= 6 ; i++){
            yValues.push(humidityPercentage[i])
            yValuesTomorrow.push(tomorrowHumudity[i])

        }
        min = 0
        max = 100
        tableClicked = "Percentage"

    }
    else if(selector[3].classList.contains("clicked")){
        gradient.addColorStop(0,"rgba(0,0,0,1)")
        gradient.addColorStop(1,"rgba(0,0,0,0.3)")
        lineColor = "blue"
        for(let i = 0 ; i <= 6 ; i++){
            yValues.push(windSpeeds[i])
            yValuesTomorrow.push(tomorrowWindSpeed[i])
        }
        min = 0
        max = 40
        tableClicked = "km/h"
    }
    Chart.defaults.font.size = 19;
    Chart.defaults.font.weight = 100;
    Chart.defaults.color = "black"
    Chart.defaults.font.family = "cursive"
    const myChart = new Chart(chart, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                lineTension: 0.4,
                pointBackgroundColor: lineColor,
                fill: true,
                label: 'TODAY',
                data: yValues,
                backgroundColor: gradient,
                borderWidth: 3,
                radius: 3,
                hitRadius: 20,
                hoverRadius: 15,
                borderColor: lineColor,
            },
            {
                lineTension: 0.4,
                pointBackgroundColor: "darkgreen",
                fill: true,
                label: 'TOMORROW',
                data: yValuesTomorrow,
                backgroundColor: [
                    "rgba(0,250,120,0.3)",
                    "rgba(0,100,80,0.3)"
                ],
                borderWidth: 3,
                radius: 3,
                hitRadius: 20,
                hoverRadius: 15,
                borderColor: "darkgreen",
            },
            ],
            hoverOffset: 4
        },
        options: {
            responsive: true,
            plugins: {
                subtitle: {
                    display: true,
                    text: tableClicked
                },
                title: {
                    display: true,
                    text: cityName.textContent,
                    padding: {
                        top: 0,
                        bottom: 10
                    },
                    font:{
                        size: 23,
                    },
                    color: "black"
                }
            },
            showLine: false,
            layout: {
                padding: 20
            },
            scales: {
                x:{
                    title:{
                        display: true,
                        text : "Hours",
                        font:{
                            size: 40,
                        }
                    }
                },
                y: {
                    type: 'linear',
                    min: min,
                    max: max
                }
            }
        }
    });
}