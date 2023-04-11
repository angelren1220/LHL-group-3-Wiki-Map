// Initialize and add the map
let map;

//test data
const pinData = [
  {
    position: {
      lat: -25.344,
      lng: 131.031
    },
    map: map,
    title: "Uluru National Park",
    description: `Rising dramatically from the Central Australian desert, the huge red rock of Uluru is one of Australia’s most iconic attractions.

    Formerly known as Ayers Rock, Uluru is made of sandstone about half a billion years old. It stands 348 metres high and has a circumference of 9.4 km.

    Uluru is at its most stunning around sunrise and sunset, when the golden light makes the rock’s colours come alive.

    For the Anangu people, Uluru is inseparable from Tjukurpa, or traditional law. The actions of the creation ancestors are still visible around the rock, and their stories are passed on from generation to generation, just as they have been for thousands of years.

    Uluru is a spectacular panorama, but it’s real beauty can be found by looking closer. This ancient monolith is home to rare plants and animals, important spiritual sites and caves painted with remarkable rock art.`,
    img: "https://d3hne3c382ip58.cloudfront.net/files/uploads/bookmundi/resized/cmsfeatured/uluru-rock-1511763600-785X440.jpg"
  },
  {
    position: {
      lat: -20.344,
      lng: 120.031
    }
    ,
    map: map,
    title: "B",
    description: "bbbbbb"
  },
  {
    position: {
      lat: -35.344,
      lng: 140.031
    },
    map: map,
    // title: "C",
    // description: "cccccc"
  }
];

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

