// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position1 = { lat: -25.344, lng: 131.031 };
  const position2 = { lat: -23.344, lng: 120.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { Marker } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 3,
    center: position1,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker1 = new google.maps.Marker({
    position: position1,
    map,
    title: "Hello World!",
  });

  const marker2 = new google.maps.Marker({
    position: position2,
    map,
    title: "Hi!",
  });
}


initMap()
