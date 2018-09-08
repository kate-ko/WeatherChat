/**
 * @class Responsible for storing info about city
 */

class WeatherBox {
    constructor(name) {
      this.name = name
      this.curr = {}
      this.forecastsNotEmpty = false
      this.forecasts = []
    }
}

export default WeatherBox

