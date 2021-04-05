import TestService from './service/test-service.js'

$(document).ready(function() {

    $('.checkbox').click(function(){
        const checked = document.getElementById('checkbox').checked
        if(checked === true) {
            document.body.style.backgroundColor = '#292C35'
            document.querySelector('html').style.backgroundColor = '#292C35'
        } else {
            document.body.style.backgroundColor = '#2e5077'
            document.querySelector('html').style.backgroundColor = '#2e5077'
        }
    })

    let city = undefined
    let apiKey = undefined
    $('#city, #key').keypress(function (e) {
        if (e.which === 13) {
            city = document.querySelector('#city').value
            apiKey = document.querySelector('#key').value
            TestService.getData(city, apiKey).then(
                (data) => {
                    console.log(data.name)
                    document.querySelector('h1').textContent = data.name
                    let weather = data.weather[0].description
                    weather = weather.replace(/\w+/g, function(w){
                        return w[0].toUpperCase() + w.slice(1).toLowerCase();
                    })
                    document.querySelector('h2').textContent = weather
                    document.querySelector('h3').textContent = Math.round(data.main.temp) + '°'
                }
            )

            let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            let day = (new Date()).getDay()
            TestService.getForecast(city, apiKey).then(
                (data) => {
                    const temp = document.querySelector('#next-days')
                    const main = document.querySelector('main')
                    $(main).empty()
                    for (let i = 0, j = 0; i < 5; j++) {
                        const clone = temp.content.cloneNode(true)
                        const date = new Date(data.list[j].dt_txt)
                        if (date.getDay() === day) {
                            clone.querySelector('.day').textContent = week[day]
                            clone.querySelector('.high').textContent = Math.ceil(data.list[j].main.temp_max) + '°'
                            clone.querySelector('.low').textContent = Math.floor(data.list[j].main.temp_min) + '°'
                            let icon = document.querySelector('#weather-icon').content.cloneNode(true)
                            let i = icon.querySelector('img')
                            $(i).attr('src', `https://openweathermap.org/img/wn/${data.list[j].weather[0].icon.slice(0,2)}d@2x.png`)
                            clone.querySelector('.weather').appendChild(icon)
                            main.appendChild(clone)

                            day++
                            if (day > 6) {
                                day = 0
                            }
                            i++;
                        }
                    }
                }
            )
            return false    //<---- Add this line
        }
    })
})