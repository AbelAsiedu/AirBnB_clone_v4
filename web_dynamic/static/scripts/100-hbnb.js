const amenities = $("div.amenities .popover ul input:checkbox");
const amenitiesHeading4 = $("div.amenities h4");
const amenitiesDict = {};

amenities.on("click", function () {
  const dataId = $(this).attr("data-id");
  const dataName = $(this).attr("data-name");

  if (this.checked) {
    amenitiesDict[dataId] = dataName;
  } else {
    delete amenitiesDict[dataId];
  }
  updateAmenitiesText(amenitiesHeading4, amenitiesDict);
});

const locations = $("div.locations .popover ul input:checkbox");
const locationsHeading4 = $("div.locations h4");
const locationsDict = {};

locations.on("click", function () {
  const dataId = $(this).attr("data-id");
  const dataName = $(this).attr("data-name");

  if (this.checked) {
    locationsDict[dataId] = dataName;
  } else {
    delete locationsDict[dataId];
  }
  updateLocationsText(locationsHeading4, locationsDict);
});

function updateLocationsText(heading4, locationsDict) {
  heading4.text(Object.values(locationsDict).join(', '));
}

function updateAmenitiesText(heading4, amenitiesDict) {
  heading4.text(Object.values(amenitiesDict).join(', '));
}

function getAndDisplayPlaces() {
  $.ajax({
    type: "POST",
    url: "http://localhost:5001/api/v1/places_search",
    data: JSON.stringify({
      amenities: Object.keys(amenitiesDict),
      cities: Object.keys(locationsDict),
      states: Object.keys(locationsDict),
    }),
    contentType: "application/json",
    success: function (places_data) {
      displayPlaces(places_data);
    },
    error: function () {
      alert("Failed to retrieve data");
    },
  });
}

