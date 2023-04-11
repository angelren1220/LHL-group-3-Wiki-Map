//test data
// const pinData = [
//   {
//     position: {
//       lat: -25.344,
//       lng: 131.031
//     },
//     map: map,
//     title: "Uluru National Park",
//     description: `Rising dramatically from the Central Australian desert, the huge red rock of Uluru is one of Australia’s most iconic attractions.

//     Formerly known as Ayers Rock, Uluru is made of sandstone about half a billion years old. It stands 348 metres high and has a circumference of 9.4 km.

//     Uluru is at its most stunning around sunrise and sunset, when the golden light makes the rock’s colours come alive.

//     For the Anangu people, Uluru is inseparable from Tjukurpa, or traditional law. The actions of the creation ancestors are still visible around the rock, and their stories are passed on from generation to generation, just as they have been for thousands of years.

//     Uluru is a spectacular panorama, but it’s real beauty can be found by looking closer. This ancient monolith is home to rare plants and animals, important spiritual sites and caves painted with remarkable rock art.`,
//     img: "https://d3hne3c382ip58.cloudfront.net/files/uploads/bookmundi/resized/cmsfeatured/uluru-rock-1511763600-785X440.jpg"
//   },
//   {
//     position: {
//       lat: -20.344,
//       lng: 120.031
//     }
//     ,
//     map: map,
//     title: "B",
//     description: "bbbbbb"
//   },
//   {
//     position: {
//       lat: -35.344,
//       lng: 140.031
//     },
//     map: map,
//     // title: "C",
//     // description: "cccccc"
//   }
// ];

// Initialize and add the map
let map;

//calculate average pin location
const avgPinLocation = (pinData) => {
  let totalLat = 0;
  let totalLng = 0;
  for (let i = 0;i < pinData.length; i++) {
    totalLat += pinData[i].lat;
    totalLng += pinData[i].lng;
  };
  const avgLat = totalLat / pinData.length;
  const avgLng = totalLng / pinData.length;
  return { lat: avgLat, lng: avgLng };
};

//html for pin info window
const contentString = (pin) => {

  if (!pin.name && !pin.description && !pin.image_url) {
    return `<p> Anonymous Pin <p>`;
  }

  let outputBuffer = `<div class="pin-info"><div class="pin-text">`;

  if (pin.name) {
    outputBuffer += `<h1 class="pin-title"> ${pin.name} </h1>`;
  };
  if (pin.description) {
    outputBuffer += `<p class="pin-description"> ${pin.description}</p>`;
  };
  outputBuffer += "</div>";

  if (pin.image_url) {
    outputBuffer += `<img class="pin-img" src=${pin.image_url}>`;
  }
  outputBuffer += "</div>";
  return outputBuffer;
};

async function initMap(mapPinData, avgPinLocation) {
  // The location of Uluru National Park in Australia
  // const position1 = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { Marker } = await google.maps.importLibrary("marker");


  // mapId in Map refers to a style sheet provided by google
  map = new Map(document.getElementById("map"), {
    zoom: 3,
    center: avgPinLocation,
    mapId: "DEMO_MAP_ID",
    streetViewControl: false,
  });


  // creates each marker on the map, and attaches infoWindow and event listeners to  the markers
  for (let i = 0; i < mapPinData.length; i++) {
    const infowindow = new google.maps.InfoWindow({
      content: contentString(mapPinData[i]),
      ariaLabel: mapPinData[i].name || "anon",
    });

    const marker = new google.maps.Marker({
      position: {lat: mapPinData[i].lat, lng:  mapPinData[i].lng },
      map,
      title: mapPinData[i].name,
      label: String(i + 1),
    });

    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
      });
    });
    map.addListener(("click"), () => {
      infowindow.close();
    });
  };

};

$(document).ready(function() {
  //get map_id from url
  const myUrl = window.location.pathname.split('/')[2];
  //get pin data from given map_id
  $.ajax({
    url: `/maps/pins/${myUrl}`,
    success: function( data ) {
      const pinData = data.templateVars
      //create a map and load pins - load info windows and event listeners for each pin
      //pinData is an array of objects. Each pin object must have: lat and lng, and can optionally have: name, description, image_url
      initMap(pinData, avgPinLocation(pinData));
    },
  });

});
