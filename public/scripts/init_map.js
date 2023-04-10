// Initialize and add the map
let map;
let markers = [];

//test data
const pinData = [
  {
    position: {
      lat: -25.344,
      lng: 131.031
    },
    map: map,
    title: "A",
    description: "aaaaaa",
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
    title: "C",
    description: "cccccc"
  }
];

const contentString = function(pin) {
  let outputBuffer = "";
  if (pin.title) {
    outputBuffer += `<h1> ${pin.title} </h1>`;
  };
  if (pin.description) {
    outputBuffer += `<p> ${pin.description}</p>`;
  };
  if (pin.img) {
    outputBuffer += `<img src=${pin.img}>`;
  }
  if (!outputBuffer) {
    outputBuffer = `<h1> Anonymous Pin <h1>`;
  }
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

