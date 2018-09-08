/**
 * @class Responsible for storing info about city
 */

class WeatherBox {
    constructor(name) {
      this.name = name
      this.tempC
      this.tempF
      this.date
      this.time
      this.comments = []
      this.forecastsNotEmpty = false
      this.forecasts = []
    }
}

export default WeatherBox

