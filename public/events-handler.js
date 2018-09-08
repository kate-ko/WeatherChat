class EventsHandler {
    constructor(dataManager) {
        this.dataManager = dataManager
    }

    registerCheckCity() {     
        $("#check-city").submit((event) => {
            event.preventDefault()
            let $cityToCheck = $("#cityToCheck")
            let city = $cityToCheck.val()
            city = city.trim().toUpperCase()

            if (city === "") {
                alert("Please enter city!")
            }
            else {
                this.dataManager.checkCity(city)
                $cityToCheck.val("")
            }
        });
    }

    registerRemoveCity() {
        $(".cities").on("click", ".remove-city", (event) => {
            let index = $(event.currentTarget).closest(".city").index()
            this.dataManager.removeCityByID(index)
            this.dataManager.refresh()
        });
    }

    registerToggleForecasts() {
        $(".cities").on('click', '.toggle-forecasts', (event) => {
            let $clickedCity = $(event.currentTarget).closest('.city')
            $clickedCity.find('.forecasts-container').toggleClass('show')
        });
    }

    registerSort() {
        $(".sort").on('click', () => {
            this.dataManager.sort()
        })
    }

    init() {
        this.dataManager.refresh()
    }
}

export default EventsHandler