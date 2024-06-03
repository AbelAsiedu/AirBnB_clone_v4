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

$(document).ready(function () {
  $.get('http://localhost:5001/api/v1/status', function (data, status) {
    if (status === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
});

