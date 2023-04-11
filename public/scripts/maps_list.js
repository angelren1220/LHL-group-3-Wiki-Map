let map;

//test data

const pinData = $.ajax({
  method: 'GET',
  url: '/pins'
})

const contentString = (pin) => {

  if (!pin.title && !pin.description && !pin.img) {
    return `<p> Anonymous Pin <p>`;
  }

  let outputBuffer = `<div class="pin-info"><div class="pin-text">`;

    if (pin.title) {
      outputBuffer += `<h1 class="pin-title"> ${pin.title} </h1>`;
    };
    if (pin.description) {
      outputBuffer += `<p class="pin-description"> ${pin.description}</p>`;
    };
  outputBuffer += "</div>"

    if (pin.img) {
      outputBuffer += `<img class="pin-img" src=${pin.img}>`;
    }
  outputBuffer += "</div>"
  return outputBuffer;
};

async function initMap() {
  // The location of Uluru
  const position1 = { lat: -25.344, lng: 131.031 };

  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { Marker } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 3,
    center: position1,
    mapId: "DEMO_MAP_ID",
    streetViewControl: false,
  });



  //pinData is an array of objects. Each pin object must have: title, position (lat, lng), description, img

  for (let i = 0; i < pinData.length; i++) {
    const infowindow = new google.maps.InfoWindow({
      content: contentString(pinData[i]),
      ariaLabel: pinData[i].title,
    });

    const marker = new google.maps.Marker({
      position: pinData[i].position,
      map,
      title: pinData[i].title,
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

initMap();

