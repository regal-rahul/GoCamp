mapboxgl.accessToken = mapToken;
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: campground.geometry.coordinates,
        zoom: 7
    });

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset:25})
        .setHTML(
            `<h5>${campground.title}</h5><P>${campground.location}</p>`
        )
    )
    .addTo(map)