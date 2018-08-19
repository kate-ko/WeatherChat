
class dataManager {
  constructor() {
    this.STORAGE_ID = 'cities';
    this.cities = this.getFromLocalStorage();
    console.log(this.cities);
  }

  addCity(name) {
    fetch(this.cities, name);
    this.saveToLocalStorage();
  }

  getFromLocalStorage() {
    return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
  }

  saveToLocalStorage() {
    localStorage.setItem(this.STORAGE_ID, JSON.stringify(this.cities));
  }

  render() {
    renderCities(this.cities);
  }
}

class weatherBox {
  constructor(name, temper) {
    this.name = name;
    this.temperature = temper;
    this.comments = [];
    this.id = guid();
  }

  getUid() {
    return 'hfjgkdhfd';
  }

}

var fetch = function(cities, city) {
  let url = "http://api.apixu.com/v1/current.json?key=9a0b2842afce48889ca84836181908&q=" + city;

  $.ajax({
    method: "GET",
    url: url,
    success: function(data) {
      console.log("success");
      let temper = data.current.temp_c;
      let newCity = new weatherBox(city, temper);
      cities.unshift(newCity);
      dataApp.render();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  }); 
};

function renderCities(cities) {
  let source, template, newHTML;
  source = $('#cities-template').html();
  template = Handlebars.compile(source);
  newHTML = template(cities);
  $('.cities').html(newHTML);
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var dataApp = new dataManager();
dataApp.render();

$(".find-city").on("click", function() {
  var searchData = $("#cityToFind").val();
  dataApp.addCity(searchData);
});

$(document).ajaxStart(function () {
  $("#loading").show();
   }).ajaxStop(function () {
  $("#loading").hide();
});
