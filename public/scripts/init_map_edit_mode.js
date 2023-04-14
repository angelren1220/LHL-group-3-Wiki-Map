// Initialize and add the map
console.log('🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕');
let map;
let markers = [];


//calculate average pin location
const avgPinLocation = (pinData) => {
  let totalLat = 0;
  let totalLng = 0;
  for (let i = 0; i < pinData.length; i++) {
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
  console.log('🏈', pin)

  let outputBuffer =
    `<div class="pin-form">
    <h3>Add a new pin</h3>
    <form action="/maps/pins/edit/${pin.id}" method="POST" class="new-pin-form">
      <div class="add-pin">
        <label class="pin-label">Latitude</label>
        <input
          type="number"
          name="lat"
          step=".01"
          placeholder="${pin.lat}"
          class="pin-input"
        />
      </div>
      <div class="add-pin">
        <label class="pin-label">Longitude</label>
        <input
          type="number"
          name="lng"
          step=".01"
          placeholder="${pin.lng}"
          class="pin-input"
        />
      </div>
      <div class="add-pin">
        <label class="pin-label">Pin Name</label>
        <input
          type="text"
          name="name"
          placeholder="${pin.name}"
          class="pin-input"
        />
      </div>
      <div class="add-pin description">
        <label class="pin-label">Description</label>
        <textarea placeholder="${pin.description}" name="description" cols="30" rows="10"></textarea>
      </div>
      <div class="add-pin">
        <label class="pin-label">Image URL</label>
        <input
          type="text"
          name="image_url"
          placeholder="${pin.image_url})"
          class="pin-input"
        />
      </div>
      <button type="submit" class="submit">Update</button>
    </form>
    </div>`;

  return outputBuffer;
};

//use range of pin position values to calculate map zoom level
const calcZoomFactor = (pinData) => {
  let minLat = pinData[0].lat;
  let maxLat = pinData[0].lat;
  let minLng = pinData[0].lng;
  let maxLng = pinData[0].lng;

  for (let i = 1; i < pinData.length; i++) {
    if (pinData[i].lat > maxLat) {
      maxLat = pinData[i].lat;
    }
    if (pinData[i].lat < minLat) {
      minLat = pinData[i].lat;
    }
    if (pinData[i].lng > maxLng) {
      maxLng = pinData[i].lng;
    }
    if (pinData[i].lng < minLng) {
      minLng = pinData[i].lng;
    }
  };

  let latRange = maxLat - minLat;
  if (latRange > 180) {
    latRange = 180 - (latRange - 180);
  };
  const lngRange = maxLng - minLng;

  const largestRange = Math.sqrt(Math.pow(latRange, 2) + Math.pow(lngRange, 2));

  const zoomLevel = -1.40698 * Math.log(0.00243162 * largestRange);
  if (zoomLevel < 1.8) {
    return 1.8;
  };
  return zoomLevel;
};

//adds pin and map objects to the map div in the linking HTML page
async function initMap(mapPinData, avgPinLocation, zoom, isPindataEditable) {
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { Marker } = await google.maps.importLibrary("marker");


  // mapId in Map refers to a style sheet provided by google
  map = new Map(document.getElementById("map"), {
    zoom: zoom,
    center: avgPinLocation,
    mapId: "a73be9ed69e46d38",
    streetViewControl: false,
  });


  // creates each marker on the map, and attaches infoWindow and event listeners to the markers
  for (let i = 0; i < mapPinData.length; i++) {
    const infowindow = new google.maps.InfoWindow({
      content: contentString(mapPinData[i]),
      ariaLabel: mapPinData[i].name || "anon",
    });

    const marker = new google.maps.Marker({
      position: { lat: mapPinData[i].lat, lng: mapPinData[i].lng },
      map,
      title: mapPinData[i].name,
      label: String(i + 1),
    });

    markers.push(marker);

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
  let myUrl = window.location.pathname.split('/');
  let myUrl1 = myUrl[2];
  let myUrl2 = myUrl[3];

  console.log('🫐', myUrl);

  //get pin data from given map_id
  $.ajax({
    url: `/maps/pins/${myUrl2}`,
    success: function(data) {
      let pinData = data.templateVars.data;
      let currentUser = data.templateVars.user;
      console.log('🍓', pinData[0].user_id, currentUser.userId);
      const mapCreatorId = pinData[0].user_id;
      const userId = currentUser.userId;
      console.log('🥨', pinData);

      let isPindataEditable = false;
      if (mapCreatorId === userId) {
        isPindataEditable = true;
      };
      //create a map and load pins - load info windows and event listeners for each pin
      //pinData is an array of objects. Each pin object must have: lat and lng, and can optionally have: name, description, image_url
      initMap(pinData, avgPinLocation(pinData), calcZoomFactor(pinData), isPindataEditable);
    },
  });

  $('#finishEditing').append(`<a href="/maps/${myUrl2}" class="close_edit">Close Edit Mode</a>`);

  $.ajax({
    url: `/maps/mapdata/${myUrl2}`,
    success: function(data) {
      const mapdata = data.data;
      console.log("🎃", mapdata.name);
      $('#mapname').append(`<h3> Edit ${mapdata.name}</h3>`);
    }
  }).then((data) => {
    console.log("🐶", data);
  });

});

// Get a reference to the map element
var mapElement = document.getElementById("map");

// Add a new class to the map element
mapElement.classList.add("edit-map-size");
