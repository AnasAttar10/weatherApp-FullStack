class TempManager {
  constructor() {
    this.cityData = [];
  }
  getDataFromDB = async () => {
    await $.get("/cities", (cities) => {
      this.cityData = cities;
    });
  };
  getCityData = async (cityName) => {
    await $.get(`/city/${cityName}`, (cityInformation) => {
      this.cityData.push(cityInformation);
    });
  };

  fetchCityObject = (cityName) => {
    for (const city of this.cityData) {
      if (city.name == cityName) {
        return city;
      }
    }
  };

  capitalizingCityname = (cityName) => {
    return cityName[0].toUpperCase() + cityName.substring(1);
  };

  saveCity = (cityName) => {
    let newCityName = this.capitalizingCityname(cityName);
    let targetCity = this.fetchCityObject(newCityName);
    $.post("/city", targetCity, function (city) {
      console.log(`add ${city.name} insied the Database`);
    });
  };

  removeCity = (cityName) => {
    $.ajax({
      url: `/city/${cityName}`,
      type: "Delete",
      success: function (data) {
        console.log("Delete Item ");
      },
    });
  };

  updateCity = (cityName) => {
    $.ajax({
      url: `/city/${cityName}`,
      type: "put",
      success: function (data) {
        // console.log(`update ${data.name} Item `);
        console.log(data);
      },
    });
  };
}
