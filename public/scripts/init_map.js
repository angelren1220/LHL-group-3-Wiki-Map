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

//test data
  // const pinData = [
  //   {
  //     position: {
  //       lat: -25.344,
  //       lng: 131.031
  //     },
  //     map: map,
  //     title: "A"
  //   },
  //   {
  //     position: {
  //       lat: -20.344,
  //       lng: 120.031
  //     }
  //     ,
  //     map: map,
  //     title: "B"
  //   },
  //   {
  //     position: {
  //       lat: -35.344,
  //       lng: 140.031
  //     },
  //     map: map,
  //     title: "C"
  //   }
  // ];


  for (let i = 0; i < pinData.length; i++) {
    new google.maps.Marker({
      position: pinData[i].position,
      map,
      title: pinData[i].title,
    });
  };

};

initMap();

