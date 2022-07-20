/* eslint-disable */
export const displayMap = (location) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibGljYW44MTYiLCJhIjoiY2twN2FkZnViMDVibzJwcXM0MnRxZWViYiJ9.CM9wK6BXCpYP6W8ZvGxi3w';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    scrollZoom: false,
    center: [location[0], location[1]],
    zoom: 11
  });

  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(location)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(location)
    .addTo(map);
};
