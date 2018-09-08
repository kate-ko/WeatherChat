// Handlebar setting
let source = $('#cities-template').html();
let template = Handlebars.compile(source);

class dataManager {
  constructor() {
    this.STORAGE_ID = 'cities';
    this.cities = this.getFromLocalStorage();
  }

  addCity(name) {
    let index = this.findCityByName(name);
    let city
    if (index === -1) {  //if didn't exist before
      city = new weatherBox(name);
    }
    else {
      city = this.cities.splice(index, 1)[0]
    }
    this.cities.unshift(city); // push city to the top of an array
    this.saveToLocalStorage();
    this.refresh();
  }

  getFromLocalStorage() {
    return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
  }

  saveToLocalStorage() {
    localStorage.setItem(this.STORAGE_ID, JSON.stringify(this.cities));
  }

  render() {
    let newHTML = template(this.cities);
    $('.cities').html(newHTML);
  }

  findCityByName(name) {
    for (let index in this.cities) {
      if (this.cities[index].name === name) {
        return index;
      }
    }
    return -1;
  }

  removeCity(name) {
    let index = this.findCityByName(name);
    if (index != -1) {
      this.cities.splice(index, 1);
      this.saveToLocalStorage();
    }
    else {
      console.log("doesn't exist");
    }
  }

  removeCityByID(id) {
    this.cities.splice(id, 1);
    this.saveToLocalStorage();
    if (id === 0) {
      this.render()
    }
  }

  refresh() {
    this.cities.forEach(city => fetch(city))
  }

  addForecast(city, temp) {
    let date = moment().format('MMMM Do YYYY, h:mm:ss a');
    city.forecasts.push({temp, date})
  }
}

function fetch(city) {
  let url = "http://api.apixu.com/v1/current.json?key=9a0b2842afce48889ca84836181908&q=" + city.name;

  $.ajax({
    method: "GET",
    url: url,
    success: function (data) {
      city.temperature = data.current.temp_c;
      dataApp.addForecast(city, data.current.temp_c);
      dataApp.render();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};

var dataApp = new dataManager();
dataApp.refresh();
console.log(dataApp.cities)

function trimString(str) {
  str = str.trim().toUpperCase();
  return str;
}

$(".find-city").on("click", function () {
  let searchData = $("#cityToFind").val();
  searchData = trimString(searchData);
  dataApp.addCity(searchData);
});

$(".cities").on("click", ".remove-city", function () {
  let index = $(this).closest(".city").index();
  console.log(index)
  dataApp.removeCityByID(index)
  dataApp.refresh();
});

