$(document).ready(function () {
    const amenities = $('.amenities .popover ul input:checkbox');
    const amenitiesHeading4 = $('.amenities h4');
  
    amenities.on('click', function () {
      const dataId = $(this).data('id');
      const dataName = $(this).data('name');
  
      if (this.checked) {
        amenitiesDict[dataId] = dataName;
      } else {
        delete amenitiesDict[dataId];
      }
  
      amenitiesHeading4.text(Object.values(amenitiesDict).join(', '));
    });
  });

  $.get('http://localhost:5001/api/v1/status', function (data, status) {
    if (status === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
});

$.ajax({
  type: 'POST',
  url: 'http://localhost:5001/api/v1/places_search',
  data: JSON.stringify({}),
  contentType: 'application/json',
  success: (places_data) => {
    const places = $('section.places');
    places.empty();
    places_data.forEach((place) => {
      const $article = $(`<article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">
            $${place.price_by_night}
          </div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
          <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
        </div>
        <div class="user">
          <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
        </div>
        <div class="description">${place.description}</div>
      </article>`);
      places.append($article);
    });
  },
  error: () => {
    alert('Failed to retrieve data');
  }
});
