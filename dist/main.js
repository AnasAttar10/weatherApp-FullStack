let tempManager = new TempManager();
let render = new Renderer();

loadPage();

async function loadPage() {
  await tempManager.getDataFromDB();
  let cities = tempManager.cityData;
  render.render(cities);
}

async function handleSearch() {
  let input = $("#cityNameInput").val();
  await tempManager.getCityData(input);
  let cities = tempManager.cityData;
  cities[cities.length - 1]["newCity"] = true;
  $("#cityNameInput").val("");
  render.render(cities);
}

$("#cities-container").on("click", "#saveCity", async function () {
  let cityName = $(this).closest(".city-container").find("#cityName").text();
  await tempManager.saveCity(cityName);
  let cities = tempManager.cityData;
  $(this).toggleClass("active");
  $(this).siblings("#removeCity").toggleClass("active");
  render.render(cities);
  loadPage();
});

$("#cities-container").on("click", "#removeCity", function () {
  let cityName = $(this).closest(".city-container").find("#cityName").text();
  tempManager.removeCity(cityName);
  let cities = tempManager.cityData;
  render.render(cities);
  loadPage();
});

$("#cities-container").on("click", "#updateCity", function () {
  let cityName = $(this).closest(".city-container").find("#cityName").text();
  tempManager.updateCity(cityName);
  // let cities = tempManager.cityData;
  // render.render(cities);
  loadPage();
});
