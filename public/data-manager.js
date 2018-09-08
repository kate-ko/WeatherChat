/**
 * @class Responsible for storing array of cities
 */
import WeatherBox from './weather-box.js'

class DataManager {
    constructor() {
        this.STORAGE_ID = 'cities'
        this.cities = this.getFromLocalStorage()
        this.order = 1 // for sorting
        this.template = Handlebars.compile($('#cities-template').html()) 
    }

    checkCity(name) {
        let cities = this.cities
        let index = cities.findIndex(el => el.name === name)

        if (index === -1) { //if city is not in the list
            this.addNewCity(name)
        }
        else { //if the city was in the list before
            if (index > 0) { // if the city is not on the 0 place
                let city = this.cities.splice(index, 1)[0]
                this.cities.unshift(city)
                this.saveToLocalStorage()
            }
            this.refresh()
        }
    }

    addNewCity(name) {
        let city = new WeatherBox(name)
        this.fetch(city).then((data) => {
            if (data !== undefined) {
                this.cities.unshift(city) // push city to the top of an array
                this.saveToLocalStorage()
                this.refresh()
            }
            else {
                alert("no data for this city")
            }
        })
    }

    getFromLocalStorage() {
        return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]')
    }

    saveToLocalStorage() {
        localStorage.setItem(this.STORAGE_ID, JSON.stringify(this.cities))
    }

    render() {
        let newHTML = this.template(this.cities);
        $('.cities').html(newHTML)
    }

    removeCityByID(id) {
        this.cities.splice(id, 1)
        this.saveToLocalStorage()
        if (this.cities.length === 0) {
            this.render()
        }
    }

    refresh() {
        this.cities.forEach(city => this.fetch(city).then((data) => {
            if (city.curr.tempC !== undefined) {
                city.forecasts.unshift(city.curr)
                city.forecastsNotEmpty = true
            }
            city.curr = this.getCityCurr(data)
            this.saveToLocalStorage()
            this.render()
        }))
    }

    getCityCurr(data) {
        let tempC = data.current.temp_c
        let tempF = tempC * 9 / 5 + 32
        let date = moment().format('MMMM Do YYYY')
        let time = moment().format('HH:mm:ss')
        return {tempC, tempF, date, time}
    }

    sort() {
        this.cities.sort((a, b) => a.name !== b.name ? a.name < b.name ?
                                        -1 * this.order : this.order : 0)
        this.order *= -1
        this.saveToLocalStorage()
        this.render()
    }

    fetch(city) {
        const APIURL = "http://api.apixu.com/v1/current.json?key=9a0b2842afce48889ca84836181908&q="
        let url = APIURL + city.name;

        return $.ajax({
            method: "GET",
            url: url,
            dataType: "json"
        }).catch(function (error) {
            console.log("error returned");
        })
    }
}

export default DataManager