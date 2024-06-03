$(document).ready(function () {
  const amenitiesHeading4 = $("div.amenities h4");
  const amenities = $("div.amenities .popover ul input:checkbox");
  const amenitiesDict = {};

  removeChecksOnReload(amenities);
  handleAmenityCheckboxClick(amenities, amenitiesHeading4, amenitiesDict);
  updateApiStatus();
  getAndDisplayPlaces();
  filterPlacesOnClick();

  function removeChecksOnReload(amenities) {
    amenities.each(function () {
      if ($(this).is(":checked")) {
        $(this).prop("checked", false);
      }
    });
  }

  function handleAmenityCheckboxClick(amenities, amenitiesHeading4, amenitiesDict) {
    amenities.on("click", function () {
      const dataId = $(this).attr("data-id");
      const dataName = $(this).attr("data-name");

      handleAmenityCheck(dataId, dataName, amenitiesDict);
      updateAmenitiesText(amenitiesHeading4, amenitiesDict);
      getAndDisplayPlaces({ amenities: Object.keys(amenitiesDict) });
    });
  }

  function handleAmenityCheck(dataId, dataName, amenitiesDict) {
    if ($(this).is(":checked")) {
      amenitiesDict[dataId.toString()] = dataName;
    } else {
      delete amenitiesDict[dataId];
    }
  }

  function updateAmenitiesText(amenitiesHeading4, amenitiesDict) {
    const maxAmenitiesToShow = 3;
    const displayedAmenities = Object.values(amenitiesDict).slice(0, maxAmenitiesToShow);
    const moreAmenitiesAvailable = Object.keys(amenitiesDict).length > maxAmenitiesToShow;
    const moreAmenitiesText = moreAmenitiesAvailable ? "..." : "";

    amenitiesHeading4.text(displayedAmenities.join(", ") + moreAmenitiesText);
  }

  function updateApiStatus() {
    $.get("http://localhost:5001/api/v1/status", function (data, status) {
      if (status === "success" && data.status === "OK") {
        $("#api_status").addClass("available");
      } else {
        $("#api_status").removeClass("available");
      }
    });
  }

  function getAndDisplayPlaces() {
    $.ajax({
      type: "POST",
      url: "http://localhost:5001/api/v1/places_search",
      data: JSON.stringify({}),
      contentType: "application/json",
      success: function (places_data) {
        displayPlaces(places_data);
      },
      error: function () {
        alert("Failed to retrieve data");
      },
    });
  }

  function displayPlaces(places_data) {
    const places = $("section.places");
    places.empty();
    places_data.forEach((place) => {
      const placeArticle = createPlaceArticle(place);
      places.append(placeArticle);
    });
  }

  function createPlaceArticle(place) {
    return $(`
      <article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? "s" : ""}</div>
          <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? "s" : ""}</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? "s" : ""}</div>
        </div>
        <div class="description">${place.description}</div>
      </article>
    `);
  }

  function filterPlacesOnClick() {
    $("button").on("click", function () {
      getAndDisplayPlaces({ amenities: Object.keys(amenitiesDict) });
    });
  }
});
