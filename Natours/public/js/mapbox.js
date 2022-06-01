/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoidWJleWRlb3pkbXIiLCJhIjoiY2wzdzBzY2s3MDR6MDNrbnIyaHFlZ2xsNyJ9.ToDsi63x3i6hoO6mf4qalA';

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/ubeydeozdmr/cl3w25du7001o14s4jiy4r3pa', // style URL
  scrollZoom: false
  // center: [-118.113491, 34.111745], // starting position [lng, lat]
  // zoom: 10, // starting zoom
  // interactive: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extend app bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100
  }
});
