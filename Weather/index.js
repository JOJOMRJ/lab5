const apikey = "591c1862176c8077ae0dcef88c025e82"
const weatherDataEl = document.getElementById('weather-data')
const cityInputEl = document.getElementById('city-input')
const formEl = document.querySelector('form')

const getWeatherData = async (cityValue) => {
  console.log('city', cityValue);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue},AU&appid=${apikey}&units=metric
`
  try {
    const response = await fetch(url)
    if(!response.ok) {
      throw new Error('NetWork response was not ok')
    }
    const data = await response.json()
    console.log(data);
    const temperature = Math.round(data.main.temp)
    const description = data.weather[0].description
    const icon = data.weather[0].icon
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`
    ]    
    weatherDataEl.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png
" alt="weather icon">`
    weatherDataEl.querySelector('.temperature').textContent = `${temperature}℃`
    weatherDataEl.querySelector('.description').textContent = description
    weatherDataEl.querySelector('.details').innerHTML = details.map(item => `<div>${item}</div>`).join("")
  } catch (error) {

  }
}

formEl.addEventListener('submit',(e)=>{
  e.preventDefault()
  const cityValue = cityInputEl.value
  getWeatherData(cityValue)
})