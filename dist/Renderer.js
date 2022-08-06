class Renderer {
  constructor() {}
  render(cities) {
    $("#cities-container").empty();
    const source = $("#cities-template").html();
    const citytemplate = Handlebars.compile(source);
    const newHTML = citytemplate({ cities });
    $("#cities-container").append(newHTML);
  }
}
