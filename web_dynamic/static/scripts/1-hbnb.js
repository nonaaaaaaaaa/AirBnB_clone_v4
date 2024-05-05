// Wait for the DOM to be fully loaded
$(document).ready(function () {
  const selectedAmenities = {}; // Dictionary to store selected amenities

  // Function to update the h4 tag with the list of selected amenities
  function updateAmenitiesList() {
    const amenitiesDiv = $('.amenities div');
    const amenityIds = Object.keys(selectedAmenities);
    if (amenityIds.length === 0) {
      amenitiesDiv.text('\u00A0'); // Display a non-breaking space if no amenities are selected
    } else {
      amenitiesDiv.text(amenityIds.join(', '));
    }
  }

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('amenity-id');
    const isChecked = $(this).prop('checked');

    if (isChecked) {
      // If the checkbox is checked, store the Amenity ID
      selectedAmenities[amenityId] = true;
    } else {
      // If the checkbox is unchecked, remove the Amenity ID
      delete selectedAmenities[amenityId];
    }

    // Update the h4 tag with the list of selected amenities
    updateAmenitiesList();
  });
});