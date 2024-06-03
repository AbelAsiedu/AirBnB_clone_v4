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