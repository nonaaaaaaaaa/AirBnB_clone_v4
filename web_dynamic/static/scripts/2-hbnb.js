$(document).ready(function () {
    let selectedAmenities = {};

    $('input[type="checkbox"]').change(function () {
        const id = $(this).data('id');
        const name = $(this).data('name');

        if (this.checked) {
            selectedAmenities[id] = name;
        } else {
            delete selectedAmenities[id];
        }

        updateAmenities();
    });

    function updateAmenities() {
        const names = Object.values(selectedAmenities).join(', ');
        $('.filters h4').text(`Amenities: ${names}`);
    }

    // Check API status
    $.get('http://0.0.0.0:5001/api/v1/status/', function (response) {
        if (response.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
});
