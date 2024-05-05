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

    // Fetch places from the API
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {
            for (const place of data) {
                const article = `
                    <article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guests</div>
                            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>
                `;
                $('.places').append(article);
            }
        }
    });
});
